
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { comparePassword, signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        // Parse request body
        let body;
        try {
            body = await request.json();
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }

        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Connect to database
        try {
            await dbConnect();
        } catch (dbError) {
            console.error('Database connection error:', dbError);
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        // Find admin
        const admin = await Admin.findOne({ email });

        if (!admin || !admin.password) { // Check if password exists (could be invite pending)
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Verify password
        const isValid = await comparePassword(password, admin.password);

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Sign Token
        const token = await signToken({ id: admin._id.toString(), email: admin.email, role: admin.role, name: admin.name });

        const cookieStore = await cookies();
        cookieStore.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return NextResponse.json({ success: true, admin: { name: admin.name, email: admin.email, role: admin.role } });
    } catch (error) {
        console.error('Login error:', error);
        // Return more specific error in development
        const errorMessage = process.env.NODE_ENV === 'development' && error instanceof Error
            ? error.message
            : 'Internal Server Error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
