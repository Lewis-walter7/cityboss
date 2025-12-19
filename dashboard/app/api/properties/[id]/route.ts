
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Property from '@/models/Property';
import { getAdminSession } from '@/lib/auth';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const user = await getAdminSession();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const property = await Property.findById(id);
        if (!property) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json(property);
    } catch (error) {
        console.error("Error fetching property:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const user = await getAdminSession();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const property = await Property.findByIdAndUpdate(id, body, { new: true });

        if (!property) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json(property);
    } catch (error) {
        console.error("Error updating property:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const user = await getAdminSession();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const property = await Property.findByIdAndDelete(id);
        if (!property) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Property deleted' });
    } catch (error) {
        console.error("Error deleting property:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
