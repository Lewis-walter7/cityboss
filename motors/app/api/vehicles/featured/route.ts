import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import Vehicle from '@/models/Vehicle';

export async function GET() {
    try {
        await connectToDB();

        const vehicles = await Vehicle.find({ isFeatured: true, isAvailable: true })
            .sort({ createdAt: -1 })
            .limit(6);

        return NextResponse.json(vehicles);
    } catch (error) {
        console.error('Error fetching featured vehicles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch featured vehicles' },
            { status: 500 }
        );
    }
}
