import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData } from '@/lib/types';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

        // Send email via Resend
        const adminEmail = process.env.ADMIN_EMAIL;
        const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

        if (!adminEmail) {
            console.error('ADMIN_EMAIL is not defined in environment variables');
            // Fallback for dev/demo if keys missing, effectively "simulating" success but logging error
            return NextResponse.json(
                { message: 'Message received (Admin email not configured).' },
                { status: 200 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: adminEmail,
            subject: `New Contact Form Submission from ${body.name}`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Phone:</strong> ${body.phone || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
                    ${body.message.replace(/\n/g, '<br>')}
                </blockquote>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Failed to send email via provider' },
                { status: 500 }
            );
        }

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
