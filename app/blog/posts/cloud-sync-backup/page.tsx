'use client'

import { Header } from '../../../components/Header';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { SocialShare } from '../../../components/SocialShare';
import Image from 'next/image';

export default function BlogPost() {
    const url = 'https://daily-affirmation.today/blog/posts/cloud-sync-backup';
    const title = 'Introducing Cloud Sync & Backup';
    const description = 'Never lose your personalized affirmations again. Our new cloud sync feature keeps your data safe and accessible across all your devices.';

    return (
        <>
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 pt-24">
                <article className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <div className="text-sm text-neutral-400 mb-2">January 21, 2024</div>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            Feature Update
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            Cloud Sync & Backup: Your Affirmations, Everywhere
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Keep your personalized affirmations safe and accessible across all your devices with our new cloud synchronization feature.
                        </p>
                        <SocialShare url={url} title={title} description={description} />
                    </div>

                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src="/blog/cloud-sync.jpg"
                            alt="Cloud Sync Illustration"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <h2>Why Cloud Sync Matters</h2>
                        <p>
                            Your affirmations are personal and valuable. With our new cloud sync feature, they're also protected and portable. Access your carefully crafted affirmations from any device, anytime.
                        </p>

                        <h2>Key Features</h2>
                        <ul>
                            <li><strong>Automatic Sync:</strong> Changes sync instantly across all your devices</li>
                            <li><strong>Secure Backup:</strong> Your data is encrypted and safely stored</li>
                            <li><strong>Cross-Device Access:</strong> Use on multiple browsers and devices</li>
                            <li><strong>Version History:</strong> Restore previous versions of your affirmations</li>
                            <li><strong>Offline Support:</strong> Continue working even without internet</li>
                        </ul>

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">Pro Feature Highlight</h3>
                            <p>
                                Cloud sync is available to all Pro users, ensuring your mindfulness practice remains consistent across all your devices.
                            </p>
                        </div>

                        <h2>Getting Started with Cloud Sync</h2>
                        <ol>
                            <li><strong>Enable Sync:</strong> Toggle on cloud sync in your settings</li>
                            <li><strong>Sign In:</strong> Use your Daily Affirmations account</li>
                            <li><strong>Initial Sync:</strong> Your data will automatically upload</li>
                            <li><strong>Add Devices:</strong> Sign in on other devices to sync</li>
                        </ol>

                        <h2>Security & Privacy</h2>
                        <p>
                            We take your privacy seriously:
                        </p>
                        <ul>
                            <li>End-to-end encryption for all data</li>
                            <li>Regular security audits</li>
                            <li>GDPR compliant data handling</li>
                            <li>Option to export or delete your data anytime</li>
                        </ul>

                        <div className="bg-gradient-to-r from-neutral-900/50 to-neutral-800/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🔐 Pro Tip: Two-Factor Authentication</h3>
                            <p>
                                Enable two-factor authentication in your account settings for an extra layer of security for your synced affirmations.
                            </p>
                        </div>

                        <h2>Coming Soon</h2>
                        <p>
                            We're working on additional cloud features:
                        </p>
                        <ul>
                            <li>Shared affirmation collections</li>
                            <li>Team collaboration tools</li>
                            <li>Advanced backup options</li>
                            <li>Integration with other mindfulness apps</li>
                        </ul>

                        <h2>Your Data, Your Control</h2>
                        <p>
                            We believe in giving you complete control over your data. You can export, delete, or modify your synced content at any time through your account settings.
                        </p>
                    </div>

                    <div className="mt-16 border-t border-neutral-800 pt-16">
                        <NewsletterSignup />
                    </div>

                    <div className="mt-8 pt-8 border-t border-neutral-800">
                        <SocialShare url={url} title={title} description={description} />
                    </div>
                </article>
            </main>
        </>
    );
} 