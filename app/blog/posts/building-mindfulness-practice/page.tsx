'use client'

import { Header } from '../../../components/Header';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { SocialShare } from '../../../components/SocialShare';
import Image from 'next/image';

export default function BlogPost() {
    const url = 'https://daily-affirmation.today/blog/posts/building-mindfulness-practice';
    const title = '5 Ways to Build a Consistent Mindfulness Practice';
    const description = 'Practical tips and strategies to incorporate mindfulness into your daily routine, using Daily Affirmations as your companion.';

    return (
        <>
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 pt-24">
                <article className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <div className="text-sm text-neutral-400 mb-2">January 20, 2024</div>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            Guides
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            5 Proven Ways to Build a Lasting Mindfulness Practice
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Transform your daily routine with these practical strategies for maintaining a consistent mindfulness practice.
                        </p>
                        <SocialShare url={url} title={title} description={description} />
                    </div>

                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src="/blog/mindfulness-practice.jpg"
                            alt="Peaceful Meditation Scene"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <h2>The Challenge of Consistency</h2>
                        <p>
                            Building a consistent mindfulness practice can be challenging in our busy lives. Here are five proven strategies to help you maintain a regular practice using Daily Affirmations as your companion.
                        </p>

                        <h2>1. Start Your Day Right</h2>
                        <p>
                            The morning sets the tone for your entire day:
                        </p>
                        <ul>
                            <li>Set your new tab page to Daily Affirmations</li>
                            <li>Practice mindfulness before checking emails</li>
                            <li>Create a morning ritual around your affirmations</li>
                            <li>Use Focus Mode for deeper concentration</li>
                        </ul>

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">Pro Tip: Morning Routine</h3>
                            <p>
                                Use our scheduling feature to automatically open your affirmations at your preferred morning time, making it easier to maintain consistency.
                            </p>
                        </div>

                        <h2>2. Create Mindful Triggers</h2>
                        <p>
                            Link your practice to existing habits:
                        </p>
                        <ul>
                            <li>Before your first coffee</li>
                            <li>After closing a major task</li>
                            <li>During lunch breaks</li>
                            <li>When switching between work modes</li>
                        </ul>

                        <h2>3. Track Your Progress</h2>
                        <p>
                            Monitoring your practice helps maintain motivation:
                        </p>
                        <ul>
                            <li>Use our built-in streak counter</li>
                            <li>Set weekly mindfulness goals</li>
                            <li>Review your practice statistics</li>
                            <li>Celebrate milestones</li>
                        </ul>

                        <h2>4. Customize Your Experience</h2>
                        <ol>
                            <li><strong>Personal Affirmations:</strong> Create affirmations that resonate with you</li>
                            <li><strong>Visual Elements:</strong> Choose calming backgrounds</li>
                            <li><strong>Timing:</strong> Adjust notification frequency</li>
                            <li><strong>Environment:</strong> Set up your ideal mindfulness space</li>
                        </ol>

                        <div className="bg-gradient-to-r from-neutral-900/50 to-neutral-800/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🎯 Achievement Unlocked</h3>
                            <p>
                                Pro users can earn special badges and rewards for maintaining consistent practice streaks. Start your journey today!
                            </p>
                        </div>

                        <h2>5. Join the Community</h2>
                        <p>
                            Connect with fellow practitioners:
                        </p>
                        <ul>
                            <li>Share your progress on social media</li>
                            <li>Join our weekly mindfulness challenges</li>
                            <li>Participate in group discussions</li>
                            <li>Find an accountability partner</li>
                        </ul>

                        <h2>Common Obstacles and Solutions</h2>
                        <p>
                            Address these common challenges:
                        </p>
                        <ul>
                            <li><strong>Time Constraints:</strong> Start with just 2 minutes</li>
                            <li><strong>Forgetfulness:</strong> Use our reminder system</li>
                            <li><strong>Lack of Motivation:</strong> Track your mood improvements</li>
                            <li><strong>Distractions:</strong> Utilize Focus Mode</li>
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