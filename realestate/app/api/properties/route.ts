
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');

        let query: any = {};
        if (category && category !== 'All') {
            query.category = category;
        }
        if (featured === 'true') {
            query.isFeatured = true;
        }

        const properties = await Property.find(query).sort({ createdAt: -1 });
        return NextResponse.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
    }
}
