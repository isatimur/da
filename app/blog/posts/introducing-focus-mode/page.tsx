'use client'

import { Header } from '../../../components/Header';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { SocialShare } from '../../../components/SocialShare';
import { BlogJsonLd } from '../../../components/BlogJsonLd';
import Image from 'next/image';

export default function BlogPost() {
    const url = 'https://daily-affirmation.today/blog/posts/introducing-focus-mode';
    const title = 'Introducing Focus Mode - A New Way to Practice Mindfulness';
    const description = 'Discover how our new Focus Mode helps you create a distraction-free environment for your daily affirmations practice.';
    const date = '2024-01-23';
    const category = 'Feature Update';
    const image = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop';

    return (
        <>
            <BlogJsonLd
                url={url}
                title={title}
                description={description}
                date={date}
                image={image}
                category={category}
            />
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 pt-24">
                <article className="container mx-auto px-4 max-w-4xl">
                    <header className="mb-8">
                        <time dateTime={date} className="text-sm text-neutral-400 mb-2">
                            January 23, 2024
                        </time>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            {category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            {title}
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Transform your new tab into a serene sanctuary with our most requested feature. Focus Mode removes distractions and creates a perfect environment for mindfulness.
                        </p>
                        <SocialShare url={url} title={title} description={description} />
                    </header>

                    <figure className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={image}
                            alt="Focus Mode Preview - A serene interface for mindful practice"
                            fill
                            className="object-cover"
                            priority
                        />
                    </figure>

                    <div className="prose prose-invert max-w-none">
                        <section>
                            <h2>The Power of Focused Mindfulness</h2>
                            <p>
                                In today's fast-paced digital world, finding moments of peace can be challenging. Our new Focus Mode is designed to transform your daily affirmation practice into a truly immersive experience, helping you connect deeper with your intentions and mindfulness goals.
                            </p>
                        </section>

                        <section>
                            <h2>Key Features of Focus Mode</h2>
                            <ul>
                                <li><strong>Distraction-Free Interface:</strong> All peripheral elements gracefully fade away, leaving only your chosen affirmation</li>
                                <li><strong>Calming Backgrounds:</strong> Curated collection of serene nature scenes that promote tranquility</li>
                                <li><strong>Elegant Transitions:</strong> Smooth animations that help maintain your peaceful state of mind</li>
                                <li><strong>Quick Toggle:</strong> Easily switch between normal and focus modes with a single click</li>
                                <li><strong>Customizable Experience:</strong> Adjust text size, opacity, and animation speed to your preference</li>
                            </ul>
                        </section>

                        <aside className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">Pro Tip: Morning Ritual</h3>
                            <p>
                                Start your day with a 5-minute Focus Mode session. Open a new tab first thing in the morning, enable Focus Mode, and spend a few mindful moments with your daily affirmation. This simple practice can set a positive tone for your entire day.
                            </p>
                        </aside>

                        <section>
                            <h2>How to Use Focus Mode</h2>
                            <ol>
                                <li><strong>Enable Focus Mode:</strong> Click the focus icon in the top-right corner of your new tab</li>
                                <li><strong>Customize Your View:</strong> Adjust the settings to your preference</li>
                                <li><strong>Practice Mindfully:</strong> Take deep breaths and connect with your affirmation</li>
                                <li><strong>Exit When Ready:</strong> Click the icon again to return to normal mode</li>
                            </ol>
                        </section>

                        <section>
                            <h2>Focus Mode in Daily Affirmations Pro</h2>
                            <p>
                                While basic Focus Mode is available to all users, Daily Affirmations Pro unlocks advanced features:
                            </p>
                            <ul>
                                <li>Custom background collections</li>
                                <li>Advanced typography options</li>
                                <li>Timed focus sessions</li>
                                <li>Progress tracking</li>
                                <li>Breathing exercise integration</li>
                            </ul>
                        </section>

                        <aside className="bg-gradient-to-r from-neutral-900/50 to-neutral-800/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🌟 Special Launch Offer</h3>
                            <p>
                                For a limited time, upgrade to Pro for just $2.99/month and unlock all advanced Focus Mode features plus everything else Daily Affirmations Pro has to offer.
                            </p>
                        </aside>

                        <section>
                            <h2>Coming Soon</h2>
                            <p>
                                We're already working on enhancing Focus Mode with more features:
                            </p>
                            <ul>
                                <li>Guided meditation integration</li>
                                <li>Focus session statistics</li>
                                <li>Custom soundscapes</li>
                                <li>Focus mode scheduling</li>
                            </ul>
                        </section>

                        <section>
                            <h2>Your Feedback Matters</h2>
                            <p>
                                Focus Mode was developed based on your feedback and requests. We'd love to hear your thoughts and suggestions for making it even better. Share your experience or feature requests through our feedback form or social media channels.
                            </p>
                        </section>
                    </div>

                    <footer className="mt-16">
                        <div className="border-t border-neutral-800 pt-16">
                            <NewsletterSignup />
                        </div>

                        <div className="mt-8 pt-8 border-t border-neutral-800">
                            <SocialShare url={url} title={title} description={description} />
                        </div>
                    </footer>
                </article>
            </main>
        </>
    );
} 