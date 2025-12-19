import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { comparePassword, signToken, setTokenCookie } from '@/lib/auth';

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
        if (!admin || !admin.password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Verify password
        const isValid = await comparePassword(password, admin.password);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Sign JWT
        const token = await signToken({
            id: admin._id.toString(),
            email: admin.email,
            role: admin.role,
            name: admin.name,
        });

        // Create response
        const responseData = {
            success: true,
            admin: { name: admin.name, email: admin.email, role: admin.role },
        };
        const res = NextResponse.json(responseData);

        // Set cookie using helper (passing the response)
        await setTokenCookie(token, res);

        return res;
    } catch (error) {
        console.error('Login error:', error);
        const errorMessage =
            process.env.NODE_ENV === 'development' && error instanceof Error
                ? error.message
                : 'Internal Server Error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
