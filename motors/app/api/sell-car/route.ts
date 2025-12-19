import { NextRequest, NextResponse } from 'next/server';
import { SellCarFormData } from '@/lib/types';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body: SellCarFormData = await request.json();

        if (!body.make || !body.vehicleModel || !body.year || !body.ownerEmail) {
            return NextResponse.json(
                { error: 'Make, model, year, and owner email are required' },
                { status: 400 }
            );
        }

        // Send email via Resend
        const adminEmail = process.env.ADMIN_EMAIL;
        const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

        if (!adminEmail) {
            console.error('ADMIN_EMAIL is not defined');
            return NextResponse.json(
                {
                    message: 'Submission received (Admin email not configured).',
                    submissionId: `SUBMIT-${Date.now()}`
                },
                { status: 200 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: adminEmail,
            subject: `New Sell Car Inquiry: ${body.year} ${body.make} ${body.vehicleModel}`,
            html: `
                <h2>New Vehicle Selling Inquiry</h2>
                <p><strong>Owner:</strong> ${body.ownerName}</p>
                <p><strong>Email:</strong> ${body.ownerEmail}</p>
                <p><strong>Phone:</strong> ${body.ownerPhone || 'N/A'}</p>
                
                <h3>Vehicle Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Make</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.make}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Model</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.vehicleModel}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Year</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.year}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Mileage</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.mileage} km</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Expected Price</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.price ? 'KSH ' + body.price.toLocaleString() : 'N/A'}</td></tr>
                </table>

                <p><strong>Additional Details:</strong></p>
                <p>${body.condition ? body.condition.replace(/\n/g, '<br>') : 'None provided'}</p>
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
            {
                message: 'Thank you for submitting your vehicle! Our team will review your submission and contact you within 24-48 hours.',
                submissionId: `SUBMIT-${Date.now()}`
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing sell car form:', error);
        return NextResponse.json(
            { error: 'Failed to submit vehicle' },
            { status: 500 }
        );
    }
}
