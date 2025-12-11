import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Vehicle } from '@/lib/types';

export async function GET() {
    try {
        const db = await getDatabase();
        const collection = db.collection<Vehicle>('vehicles');

        const vehicles = await collection
            .find({ isFeatured: true, isAvailable: true })
            .sort({ createdAt: -1 })
            .limit(6)
            .toArray();

        return NextResponse.json(vehicles);
    } catch (error) {
        console.error('Error fetching featured vehicles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch featured vehicles' },
            { status: 500 }
        );
    }
}
