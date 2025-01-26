'use client'

import { Header } from '../../../components/Header';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { SocialShare } from '../../../components/SocialShare';
import Image from 'next/image';

export default function BlogPost() {
    const url = 'https://daily-affirmation.today/blog/posts/personal-affirmation-library';
    const title = 'Creating Your Personal Affirmation Library';
    const description = 'Learn how to write powerful, personalized affirmations and organize them effectively using our Pro features.';

    return (
        <>
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 pt-24">
                <article className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <div className="text-sm text-neutral-400 mb-2">January 18, 2024</div>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            Guides
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            Building Your Personal Affirmation Library: A Complete Guide
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Master the art of creating and organizing powerful, personalized affirmations that resonate with your goals and values.
                        </p>
                        <SocialShare url={url} title={title} description={description} />
                    </div>

                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src="/blog/affirmation-library.jpg"
                            alt="Personal Affirmation Library"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <h2>The Power of Personal Affirmations</h2>
                        <p>
                            While our curated affirmations are a great starting point, creating your own personal affirmation library can significantly enhance your mindfulness practice. Here's your complete guide to crafting and organizing meaningful affirmations.
                        </p>

                        <h2>Writing Effective Affirmations</h2>
                        <p>
                            Follow these principles for powerful affirmations:
                        </p>
                        <ul>
                            <li><strong>Present Tense:</strong> Write as if it's already true</li>
                            <li><strong>Positive Language:</strong> Focus on what you want, not what you don't</li>
                            <li><strong>Personal Connection:</strong> Use "I" statements</li>
                            <li><strong>Emotional Impact:</strong> Include feelings and sensations</li>
                            <li><strong>Specificity:</strong> Be clear and precise</li>
                        </ul>

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">Example Transformation</h3>
                            <p>
                                Instead of: "I want to be less stressed"<br />
                                Write: "I am calm and centered, breathing deeply and feeling peaceful in my body"
                            </p>
                        </div>

                        <h2>Organizing Your Library</h2>
                        <p>
                            Pro features help you structure your affirmations:
                        </p>
                        <ul>
                            <li><strong>Categories:</strong> Group by life areas (Career, Health, Relationships)</li>
                            <li><strong>Tags:</strong> Add multiple labels for easy filtering</li>
                            <li><strong>Collections:</strong> Create themed sets for different purposes</li>
                            <li><strong>Favorites:</strong> Mark your most impactful affirmations</li>
                        </ul>

                        <h2>Advanced Pro Features</h2>
                        <ol>
                            <li><strong>Smart Rotation:</strong> Set frequency and timing for each affirmation</li>
                            <li><strong>Mood Tracking:</strong> Monitor how affirmations affect your state</li>
                            <li><strong>Custom Visuals:</strong> Add personal images to affirmations</li>
                            <li><strong>Voice Recording:</strong> Record affirmations in your own voice</li>
                        </ol>

                        <div className="bg-gradient-to-r from-neutral-900/50 to-neutral-800/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">✨ Pro Tip: Theme-Based Collections</h3>
                            <p>
                                Create different collections for morning energy, work focus, evening relaxation, and special challenges. Pro users can schedule these to appear at optimal times.
                            </p>
                        </div>

                        <h2>Maintaining Your Library</h2>
                        <p>
                            Keep your library fresh and effective:
                        </p>
                        <ul>
                            <li>Review and update regularly</li>
                            <li>Archive achieved goals</li>
                            <li>Track effectiveness with our analytics</li>
                            <li>Share and collaborate with trusted friends</li>
                        </ul>

                        <h2>Integration with Daily Practice</h2>
                        <p>
                            Make the most of your library:
                        </p>
                        <ul>
                            <li><strong>Morning Review:</strong> Start with energy-focused affirmations</li>
                            <li><strong>Work Sessions:</strong> Use performance-related statements</li>
                            <li><strong>Evening Wind-down:</strong> Focus on gratitude and peace</li>
                            <li><strong>Challenge Moments:</strong> Access situation-specific support</li>
                        </ul>
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