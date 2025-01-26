import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// This should be a secure, randomly generated string stored in environment variables
const EXTENSION_SECRET_KEY = process.env.EXTENSION_SECRET_KEY;

export async function POST(request: NextRequest) {
    try {
        // Verify the request is coming from our Chrome extension
        const extensionId = headers().get('X-Extension-Id');
        const extensionKey = headers().get('X-Extension-Key');

        if (!EXTENSION_SECRET_KEY) {
            console.error('EXTENSION_SECRET_KEY not configured');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        if (!extensionId || !extensionKey || extensionKey !== EXTENSION_SECRET_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Here you can generate temporary access tokens or handle other auth logic
        const temporaryAccessToken = generateTemporaryToken();

        return NextResponse.json({
            accessToken: temporaryAccessToken,
            expiresIn: 3600 // 1 hour
        });
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

function generateTemporaryToken(): string {
    // In production, use a proper JWT or similar token system
    return Buffer.from(Date.now().toString() + Math.random()).toString('base64');
} 