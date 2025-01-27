import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: 'Daily Affirmations <updates@daily-affirmation.today>',
            to: email,
            subject: 'Welcome to Daily Affirmations!',
            html: `
                <h1>Welcome to Daily Affirmations!</h1>
                <p>Thank you for subscribing to our updates. You'll be the first to know about new features and mindfulness tips.</p>
                <p>Stay mindful,<br>Daily Affirmations Team</p>
            `,
        });

        return NextResponse.json(
            { message: 'Successfully subscribed!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe' },
            { status: 500 }
        );
    }
} 