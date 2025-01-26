import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // TODO: Add your newsletter service integration here
        // Example: Mailchimp, ConvertKit, etc.
        console.log('Newsletter signup:', email);

        // For now, we'll simulate a successful subscription
        return NextResponse.json(
            { message: 'Successfully subscribed to newsletter' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Newsletter signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 