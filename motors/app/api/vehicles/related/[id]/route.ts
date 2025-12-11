import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Vehicle } from '@/lib/types';
import { ObjectId } from 'mongodb';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid vehicle ID' },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const collection = db.collection<Vehicle>('vehicles');

        // Get the source vehicle to get make and bodyType
        const sourceVehicle = await collection.findOne({ _id: new ObjectId(id) });

        if (!sourceVehicle) {
            return NextResponse.json(
                { error: 'Vehicle not found' },
                { status: 404 }
            );
        }

        // Find related vehicles (same make or bodyType, excluding the source vehicle)
        const vehicles = await collection
            .find({
                $or: [
                    { make: sourceVehicle.make },
                    { bodyType: sourceVehicle.bodyType },
                ],
                _id: { $ne: new ObjectId(id) },
                isAvailable: true,
            })
            .limit(4)
            .toArray();

        return NextResponse.json(vehicles);
    } catch (error) {
        console.error('Error fetching related vehicles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch related vehicles' },
            { status: 500 }
        );
    }
}
