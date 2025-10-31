import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are a helpful support assistant for Daily Affirmations, a Chrome extension that provides daily positive affirmations, beautiful backgrounds, and mindfulness features.

Your role:
- Help users with questions about the extension
- Provide guidance on using features (Focus Mode, Custom Affirmations, Cloud Sync, etc.)
- Answer questions about mindfulness, affirmations, and personal growth
- Troubleshoot common issues
- Be friendly, supportive, and encouraging

Keep responses concise, helpful, and aligned with the app's mission of promoting mindfulness and positive thinking.`;

export async function POST(request: Request) {
    try {
        const { message, lang, history } = await request.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        if (!process.env.OPENAI_API_KEY) {
            console.error('OPENAI_API_KEY is not set');
            return NextResponse.json(
                { error: 'Service configuration error' },
                { status: 500 }
            );
        }

        // Build conversation history
        const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: 'system',
                content: systemPrompt,
            },
        ];

        // Add recent history (last 5 messages for context)
        if (Array.isArray(history)) {
            history.forEach((msg: { role: string; content: string }) => {
                if (msg.role === 'user' || msg.role === 'assistant') {
                    messages.push({
                        role: msg.role as 'user' | 'assistant',
                        content: msg.content,
                    });
                }
            });
        }

        // Add current message
        messages.push({
            role: 'user',
            content: message,
        });

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Using efficient model
            messages,
            max_tokens: 500,
            temperature: 0.7,
        });

        const response = completion.choices[0]?.message?.content || 'I apologize, but I cannot process that request right now.';

        return NextResponse.json(
            { response },
            { status: 200 }
        );
    } catch (error) {
        console.error('Support chat error:', error);
        
        if (error instanceof OpenAI.APIError) {
            return NextResponse.json(
                { error: 'AI service error', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

