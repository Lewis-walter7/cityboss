
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getAdminSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const admins = await Admin.find({})
            .select('-password -inviteToken -resetToken')
            .sort({ createdAt: -1 });

        return NextResponse.json({ admins });
    } catch (error) {
        console.error('Fetch admins error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
