
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin, { AdminRole } from '@/models/Admin';
import { getAdminSession } from '@/lib/auth';
import { nanoid } from 'nanoid';

// We need nanoid, or we can just use crypto for random string
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const session = await getAdminSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Only allow Admins to invite (or restrict to SUPER_ADMIN if needed)
        // For now, any admin can invite.

        const { email, name, role } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ error: 'Email and Name are required' }, { status: 400 });
        }

        await dbConnect();

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return NextResponse.json({ error: 'Admin with this email already exists' }, { status: 400 });
        }

        const inviteToken = crypto.randomBytes(32).toString('hex');
        const inviteTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        const newAdmin = await Admin.create({
            email,
            name,
            role: role || AdminRole.ADMIN,
            inviteToken,
            inviteTokenExpiry,
        });

        // In a real app, we would send an email here.
        // For now, we return the link.
        const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/invite/${inviteToken}`;

        return NextResponse.json({ success: true, inviteUrl });

    } catch (error) {
        console.error('Invite error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
