import { NextResponse } from 'next/server';
import { z } from 'zod';

// Feedback schema validation
const feedbackSchema = z.object({
    type: z.enum(['suggestion', 'bug', 'other']),
    email: z.string().email().optional(),
    message: z.string().min(1),
    subscribe: z.boolean(),
    source: z.string(),
    version: z.string()
});

export async function POST(request: Request) {
    try {
        // Parse request body
        const body = await request.json();
        
        // Validate request data
        const validatedData = feedbackSchema.parse(body);

        // TODO: Store feedback in database
        console.log('Received feedback:', validatedData);

        // If user wants to subscribe, add them to newsletter
        if (validatedData.subscribe && validatedData.email) {
            try {
                await fetch('https://daily-affirmation.today/api/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: validatedData.email,
                        source: 'feedback_form'
                    })
                });
            } catch (error) {
                console.error('Failed to subscribe user:', error);
                // Don't fail the whole request if newsletter subscription fails
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Feedback received successfully' 
        });
    } catch (error) {
        console.error('Error processing feedback:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to process feedback',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 400 }
        );
    }
} 