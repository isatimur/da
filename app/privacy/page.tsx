import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="text-neutral-400 hover:text-white mb-8 inline-block">
                    ← Back to Home
                </Link>
                
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                
                <div className="space-y-8 text-neutral-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                        <p>We collect minimal information necessary for the operation of Daily Affirmations:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Email address (for premium users)</li>
                            <li>Custom affirmations (stored locally)</li>
                            <li>Preferences and settings</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                        <p>Your information is used solely for:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Providing the Daily Affirmations service</li>
                            <li>Processing premium subscriptions</li>
                            <li>Service improvements and updates</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Data Storage</h2>
                        <p>Your data is stored securely and never shared with third parties. Premium users' data is encrypted and backed up regularly.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Access your personal data</li>
                            <li>Request data deletion</li>
                            <li>Export your data</li>
                            <li>Opt-out of communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
                        <p>For privacy-related concerns, contact us at: privacy@dailyaffirmations.com</p>
                    </section>
                </div>
            </div>
        </main>
    );
} 