
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vehicle from '@/models/Vehicle';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const user = await getAdminSession();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get status filter from query params
        const { searchParams } = new URL(request.url);
        const statusFilter = searchParams.get('status') || 'published'; // default to published

        let query: any = {};
        if (statusFilter === 'all') {
            // no filter, show all
        } else {
            query.status = statusFilter;
        }

        const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });
        return NextResponse.json(vehicles);
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const user = await getAdminSession();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { status = 'published', ...vehicleData } = body;

        // Validation: If publishing, ensure required fields are present
        if (status === 'published') {
            const requiredFields = ['make', 'vehicleModel', 'year', 'price', 'mileage', 'images'];
            for (const field of requiredFields) {
                if (!vehicleData[field] || (field === 'images' && vehicleData[field].length < 4)) {
                    return NextResponse.json({
                        error: `Missing or invalid required field: ${field}`,
                        field
                    }, { status: 400 });
                }
            }
        }

        // Add metadata
        const vehicleWithMeta = {
            ...vehicleData,
            status,
            lastEditedBy: user.email || user.id,
        };

        const newVehicle = await Vehicle.create(vehicleWithMeta);
        return NextResponse.json(newVehicle);
    } catch (error) {
        console.error("Error creating vehicle:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
