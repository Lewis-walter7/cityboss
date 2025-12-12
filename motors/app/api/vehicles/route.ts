import { NextResponse } from 'next/server';
import Vehicle from '@/models/Vehicle'; // adjust path to your Vehicle model
import { connectToDB } from '@/lib/mongoose';

export async function GET(request: Request) {
    try {
        await connectToDB();

        // Optional: read query params for pagination
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '20');
        const skip = (page - 1) * limit;

        // Fetch vehicles from MongoDB
        const [vehicles, total] = await Promise.all([
            Vehicle.find().skip(skip).limit(limit).lean(),
            Vehicle.countDocuments()
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            vehicles,
            total,
            page,
            totalPages
        });
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch vehicles' },
            { status: 500 }
        );
    }
}
