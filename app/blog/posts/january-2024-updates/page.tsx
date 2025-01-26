'use client'

import { Header } from '../../../components/Header';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { SocialShare } from '../../../components/SocialShare';
import Image from 'next/image';

export default function BlogPost() {
    const url = 'https://daily-affirmation.today/blog/posts/january-2024-updates';
    const title = 'January 2024 Product Updates';
    const description = 'A roundup of all the new features and improvements we\'ve added this month, including Focus Mode, Cloud Sync, and more.';

    return (
        <>
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 pt-24">
                <article className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <div className="text-sm text-neutral-400 mb-2">January 19, 2024</div>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            Updates
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            January 2024: A Month of Mindful Innovation
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Explore all the new features and improvements we've introduced this month to enhance your mindfulness journey.
                        </p>
                        <SocialShare url={url} title={title} description={description} />
                    </div>

                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src="/blog/january-updates.jpg"
                            alt="January Updates Overview"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <h2>Major Feature Releases</h2>
                        <p>
                            January has been an exciting month of growth and innovation. Here's everything new in Daily Affirmations:
                        </p>

                        <h3>1. Focus Mode</h3>
                        <ul>
                            <li>Distraction-free affirmation experience</li>
                            <li>Customizable backgrounds and typography</li>
                            <li>Smooth transitions and animations</li>
                            <li>Quick toggle access</li>
                        </ul>

                        <h3>2. Cloud Sync</h3>
                        <ul>
                            <li>Cross-device synchronization</li>
                            <li>Secure data backup</li>
                            <li>Version history</li>
                            <li>Offline support</li>
                        </ul>

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">Pro Features Highlight</h3>
                            <p>
                                Pro users now have access to advanced features in both Focus Mode and Cloud Sync, including custom backgrounds, advanced typography, and enhanced sync options.
                            </p>
                        </div>

                        <h2>Performance Improvements</h2>
                        <ul>
                            <li><strong>Faster Loading:</strong> 50% reduction in initial load time</li>
                            <li><strong>Better Memory Usage:</strong> Optimized background processes</li>
                            <li><strong>Smoother Animations:</strong> Enhanced transition effects</li>
                            <li><strong>Reduced CPU Usage:</strong> More efficient background operations</li>
                        </ul>

                        <h2>User Experience Updates</h2>
                        <ol>
                            <li><strong>New Navigation:</strong> Streamlined menu structure</li>
                            <li><strong>Enhanced Settings:</strong> More customization options</li>
                            <li><strong>Improved Notifications:</strong> Better timing and relevance</li>
                            <li><strong>Updated Themes:</strong> New color schemes and patterns</li>
                        </ol>

                        <div className="bg-gradient-to-r from-neutral-900/50 to-neutral-800/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">📊 Usage Statistics</h3>
                            <p>
                                This month, our community spent over 1 million minutes in mindful practice. Thank you for being part of this journey!
                            </p>
                        </div>

                        <h2>Bug Fixes</h2>
                        <ul>
                            <li>Resolved notification timing issues</li>
                            <li>Fixed theme switching glitches</li>
                            <li>Improved offline mode reliability</li>
                            <li>Enhanced cross-browser compatibility</li>
                        </ul>

                        <h2>Coming in February</h2>
                        <p>
                            Here's what we're working on next:
                        </p>
                        <ul>
                            <li>Community features and sharing</li>
                            <li>Advanced statistics and insights</li>
                            <li>More customization options</li>
                            <li>Integration with popular mindfulness apps</li>
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