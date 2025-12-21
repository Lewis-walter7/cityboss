import { NextResponse } from 'next/server';
import Vehicle from '@/models/Vehicle'; // adjust path to your Vehicle model
import { connectToDB } from '@/lib/mongoose';

// Enable ISR with 60 second revalidation
export const revalidate = 60;

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

        // Enhanced search with prefix matching support
        if (search) {
            const isNumber = !isNaN(Number(search));

            if (!isNumber) {
                // For text searches, use regex for prefix matching on make
                // and text search for vehicleModel to support partial matches like "toyo" -> "toyota"
                const searchRegex = new RegExp(`^${search}`, 'i'); // Prefix match, case-insensitive

                query.$or = [
                    { make: searchRegex },
                    { vehicleModel: { $regex: search, $options: 'i' } }
                ];
            } else {
                // For numeric searches, check year and price
                query.$or = [
                    { year: Number(search) },
                    { price: Number(search) }
                ];
            }
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


        // Select only necessary fields to reduce data transfer
        // Exclude large fields like full description and features for list view
        const projection = {
            make: 1,
            vehicleModel: 1,
            year: 1,
            price: 1,
            mileage: 1,
            bodyType: 1,
            transmission: 1,
            fuelType: 1,
            drivetrain: 1,
            images: 1,
            isFeatured: 1,
            exteriorColor: 1,
            horsepower: 1,
            createdAt: 1
        };

        // Fetch vehicles from MongoDB with optimizations
        const [vehicles, total] = await Promise.all([
            Vehicle.find(query)
                .select(projection)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Vehicle.countDocuments(query)
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
