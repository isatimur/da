'use client'

import { useState } from 'react';

export function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to subscribe');
            }

            setStatus('success');
            setMessage('Thanks for subscribing! Check your email to confirm.');
            setEmail('');
        } catch {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
            <p className="text-neutral-400 mb-6">
                Get the latest mindfulness tips and feature updates delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                        placeholder="Enter your email"
                        disabled={status === 'loading'}
                    />
                </div>
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full px-6 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-neutral-900 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
                {message && (
                    <p className={`text-sm ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
} 