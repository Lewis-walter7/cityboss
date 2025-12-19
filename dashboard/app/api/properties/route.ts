
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Property from '@/models/Property';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const user = await getAdminSession();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const properties = await Property.find({}).sort({ createdAt: -1 });
        return NextResponse.json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const user = await getAdminSession();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Basic validation: ensures minimal fields are present
        if (!body.title || !body.location || !body.price) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newProperty = await Property.create(body);
        return NextResponse.json(newProperty);
    } catch (error) {
        console.error("Error creating property:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
