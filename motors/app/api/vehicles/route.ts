import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Vehicle, VehicleFilters } from '@/lib/types';

// GET /api/vehicles - Fetch all vehicles with filters
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Extract filter parameters
        const filters: VehicleFilters = {
            make: searchParams.get('make') || undefined,
            model: searchParams.get('model') || undefined,
            bodyType: searchParams.get('bodyType') || undefined,
            minYear: searchParams.get('minYear') ? parseInt(searchParams.get('minYear')!) : undefined,
            maxYear: searchParams.get('maxYear') ? parseInt(searchParams.get('maxYear')!) : undefined,
            minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
            maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
            transmission: searchParams.get('transmission') || undefined,
            fuelType: searchParams.get('fuelType') || undefined,
            search: searchParams.get('search') || undefined,
        };

        // Pagination
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const skip = (page - 1) * limit;

        // Build MongoDB query
        const query: any = { isAvailable: true };

        if (filters.make) query.make = filters.make;
        if (filters.model) query.model = new RegExp(filters.model, 'i');
        if (filters.bodyType) query.bodyType = filters.bodyType;
        if (filters.transmission) query.transmission = filters.transmission;
        if (filters.fuelType) query.fuelType = filters.fuelType;

        if (filters.minYear || filters.maxYear) {
            query.year = {};
            if (filters.minYear) query.year.$gte = filters.minYear;
            if (filters.maxYear) query.year.$lte = filters.maxYear;
        }

        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = filters.minPrice;
            if (filters.maxPrice) query.price.$lte = filters.maxPrice;
        }

        if (filters.search) {
            query.$or = [
                { make: new RegExp(filters.search, 'i') },
                { model: new RegExp(filters.search, 'i') },
                { description: new RegExp(filters.search, 'i') },
            ];
        }

        const db = await getDatabase();
        const collection = db.collection<Vehicle>('vehicles');

        // Get total count
        const total = await collection.countDocuments(query);

        // Get vehicles
        const vehicles = await collection
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();

        return NextResponse.json({
            vehicles,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch vehicles' },
            { status: 500 }
        );
    }
}

// POST /api/vehicles - Create a new vehicle (for seeding/testing)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const db = await getDatabase();
        const collection = db.collection<Vehicle>('vehicles');

        const vehicle = {
            ...body,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(vehicle as any);

        return NextResponse.json(
            { message: 'Vehicle created', id: result.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating vehicle:', error);
        return NextResponse.json(
            { error: 'Failed to create vehicle' },
            { status: 500 }
        );
    }
}
