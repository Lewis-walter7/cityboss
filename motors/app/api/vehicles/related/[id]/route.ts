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

        // Get the source vehicle to get make and bodyType
        const sourceVehicle = await Vehicle.findById(id);

        if (!sourceVehicle) {
            return NextResponse.json(
                { error: 'Vehicle not found' },
                { status: 404 }
            );
        }

        // Find related vehicles (same make or bodyType, excluding the source vehicle)
        const vehicles = await Vehicle.find({
            $or: [
                { make: sourceVehicle.make },
                { bodyType: sourceVehicle.bodyType },
            ],
            _id: { $ne: id },
            isAvailable: true,
        }).limit(4);

        return NextResponse.json(vehicles);
    } catch (error) {
        console.error('Error fetching related vehicles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch related vehicles' },
            { status: 500 }
        );
    }
}
