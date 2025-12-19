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

        const query: any = {};

        const search = url.searchParams.get('search');
        if (search) {
            const searchRegex = { $regex: search, $options: 'i' };
            const isNumber = !isNaN(Number(search));

            const orConditions = [
                { make: searchRegex },
                { vehicleModel: searchRegex },
            ];

            if (isNumber) {
                // strict match for year if search is a number
                orConditions.push({ year: Number(search) } as any);
            }

            query.$or = orConditions;
        }

        const make = url.searchParams.get('make');
        if (make && make !== 'All') query.make = make;

        const bodyType = url.searchParams.get('bodyType');
        if (bodyType && bodyType !== 'All') query.bodyType = bodyType;

        const transmission = url.searchParams.get('transmission');
        if (transmission && transmission !== 'All') query.transmission = transmission;

        const fuelType = url.searchParams.get('fuelType');
        if (fuelType && fuelType !== 'All') query.fuelType = fuelType;

        const minPrice = url.searchParams.get('minPrice');
        const maxPrice = url.searchParams.get('maxPrice');
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Fetch vehicles from MongoDB
        const [vehicles, total] = await Promise.all([
            Vehicle.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            Vehicle.countDocuments(query)
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            vehicles,
            total,
            page,
            totalPages,
            debug: { query, params: { search, make, bodyType } }
        });
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch vehicles' },
            { status: 500 }
        );
    }
}
