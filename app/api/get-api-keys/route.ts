import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
    const headersList = headers();
    const origin = headersList.get('origin');
    
    // These should be in your .env.local file
    const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
    const weatherKey = process.env.WEATHER_API_KEY;
    
    if (!unsplashKey || !weatherKey) {
        return NextResponse.json(
            { error: 'API keys not configured' },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': origin || '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            }
        );
    }
    
    return NextResponse.json(
        {
            unsplash: unsplashKey,
            weather: weatherKey
        },
        {
            headers: {
                'Access-Control-Allow-Origin': origin || '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        }
    );
}

export async function OPTIONS(request: Request) {
    const headersList = headers();
    const origin = headersList.get('origin');

    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
    });
} 