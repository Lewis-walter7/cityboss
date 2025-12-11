import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData } from '@/lib/types';

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();

        // Validate required fields
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // In production, you would send an email or save to database
        console.log('Contact form submission:', body);

        // Simulate email sending
        return NextResponse.json(
            { message: 'Your message has been sent successfully. We will get back to you soon!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
