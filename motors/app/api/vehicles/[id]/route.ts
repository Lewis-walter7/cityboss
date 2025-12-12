import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import Vehicle from '@/models/Vehicle';
import mongoose from 'mongoose';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json(
                { error: 'Invalid vehicle ID' },
                { status: 400 }
            );
        }

        await connectToDB();

        const vehicle = await Vehicle.findById(id);

        if (!vehicle) {
            return NextResponse.json(
                { error: 'Vehicle not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(vehicle);
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return NextResponse.json(
            { error: 'Failed to fetch vehicle' },
            { status: 500 }
        );
    }
}
