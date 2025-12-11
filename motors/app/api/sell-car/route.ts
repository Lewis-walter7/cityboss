import { NextRequest, NextResponse } from 'next/server';
import { SellCarFormData } from '@/lib/types';

export async function POST(request: NextRequest) {
    try {
        const body: SellCarFormData = await request.json();

        if (!body.make || !body.model || !body.year || !body.ownerEmail) {
            return NextResponse.json(
                { error: 'Make, model, year, and owner email are required' },
                { status: 400 }
            );
        }

        console.log('Sell car form submission:', body);

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
