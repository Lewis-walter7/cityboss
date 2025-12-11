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

        const vehicle = await collection.findOne({ _id: new ObjectId(id) });

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
