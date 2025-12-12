
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { project } = await request.json();

        if (project !== 'motors' && project !== 'realestate') {
            return NextResponse.json({ error: 'Invalid project' }, { status: 400 });
        }

        const cookieStore = await cookies();
        cookieStore.set('project_mode', project, {
            httpOnly: false, // Accessed by client components if needed, or keep httpOnly and use server components
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
