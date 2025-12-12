
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

        const vehicles = await Vehicle.find({}).sort({ createdAt: -1 });
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

        // Basic validation could go here

        const newVehicle = await Vehicle.create(body);
        return NextResponse.json(newVehicle);
    } catch (error) {
        console.error("Error creating vehicle:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
