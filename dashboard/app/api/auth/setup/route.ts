
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { hashPassword, signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { token, password, name } = await request.json(); // Name might be updated optionally

        if (!token || !password) {
            return NextResponse.json({ error: 'Token and Password are required' }, { status: 400 });
        }

        await dbConnect();

        const admin = await Admin.findOne({
            inviteToken: token,
            inviteTokenExpiry: { $gt: new Date() }
        });

        if (!admin) {
            return NextResponse.json({ error: 'Invalid or expired invite token' }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);

        admin.password = hashedPassword;
        admin.inviteToken = undefined;
        admin.inviteTokenExpiry = undefined;
        if (name) admin.name = name;

        await admin.save();

        // Auto login
        const sessionToken = await signToken({ id: admin._id, email: admin.email, role: admin.role, name: admin.name });

        const cookieStore = await cookies();
        cookieStore.set('admin_token', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return NextResponse.json({ success: true, admin: { name: admin.name, email: admin.email, role: admin.role } });

    } catch (error) {
        console.error('Setup error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
