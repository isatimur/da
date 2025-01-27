import Link from 'next/link';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="text-neutral-400 hover:text-white mb-8 inline-block">
                    ← Back to Home
                </Link>
                
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                
                <div className="space-y-8 text-neutral-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing and using Daily Affirmations, you agree to be bound by these Terms of Service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Use of Service</h2>
                        <p>Daily Affirmations is provided as-is. We reserve the right to modify or discontinue the service at any time.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. User Content</h2>
                        <p>Users retain ownership of any content they create using our service. By using our service, you grant us a license to use this content for service-related purposes.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Premium Features</h2>
                        <p>Premium features are available through subscription. Cancellations and refunds are subject to our refund policy.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
                        <p>Daily Affirmations is not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
                    </section>
                </div>
            </div>
        </main>
    );
} 