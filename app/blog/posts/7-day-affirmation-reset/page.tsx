'use client'

import { Header } from '../../../components/Header';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { SocialShare } from '../../../components/SocialShare';
import { BlogJsonLd } from '../../../components/BlogJsonLd';
import Image from 'next/image';

export default function BlogPost() {
    const url = 'https://daily-affirmation.today/blog/posts/7-day-affirmation-reset';
    const title = 'The 7-Day Affirmation Reset: Your Quick Start Guide';
    const description = 'Jumpstart your affirmation practice with this comprehensive 7-day program. Get daily affirmations, exercises, and guidance to transform your mindset in just one week.';
    const date = '2025-05-21';
    const category = 'Guides';
    const image = 'https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?w=1200&h=630&fit=crop';

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
                            May 21, 2025
                        </time>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            {category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            The 7-Day Affirmation Reset: Your Quick Start Guide
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Transform your mindset in just one week. This proven 7-day program gives you everything you need to establish a powerful affirmation practice.
                        </p>
                        <SocialShare url={url} title={title} description={description} />
                    </header>

                    <figure className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={image}
                            alt="Calendar showing 7 days, representing a 7-day affirmation challenge and quick start program"
                            fill
                            className="object-cover"
                            priority
                        />
                    </figure>

                    <div className="prose prose-invert max-w-none">
                        <section>
                            <h2>Why 7 Days?</h2>
                            <p>
                                Seven days is the perfect timeframe to build momentum. It's long enough to see real changes but short enough to stay motivated. Research shows that consistent practice for a week creates neural pathways that make positive thinking feel more natural.
                            </p>
                        </section>

                        <section>
                            <h2>Your 7-Day Program</h2>
                            
                            <h3>Day 1: Foundation</h3>
                            <p><strong>Theme:</strong> Self-Awareness</p>
                            <p><strong>Affirmations:</strong></p>
                            <ul>
                                <li>"I am open to positive change."</li>
                                <li>"I commit to my personal growth."</li>
                                <li>"I choose thoughts that serve me."</li>
                            </ul>
                            <p><strong>Practice:</strong> Write each affirmation 5 times, then say them out loud with conviction.</p>

                            <h3>Day 2: Confidence</h3>
                            <p><strong>Theme:</strong> Building Self-Belief</p>
                            <p><strong>Affirmations:</strong></p>
                            <ul>
                                <li>"I am capable and competent."</li>
                                <li>"I trust my abilities and decisions."</li>
                                <li>"I am worthy of success and happiness."</li>
                            </ul>
                            <p><strong>Practice:</strong> Repeat affirmations while looking in the mirror. Notice any resistance and breathe through it.</p>

                            <h3>Day 3: Gratitude</h3>
                            <p><strong>Theme:</strong> Appreciation</p>
                            <p><strong>Affirmations:</strong></p>
                            <ul>
                                <li>"I am grateful for all the good in my life."</li>
                                <li>"I attract abundance through gratitude."</li>
                                <li>"I appreciate myself and others."</li>
                            </ul>
                            <p><strong>Practice:</strong> Write down 3 things you're grateful for, then say the affirmations.</p>

                            <h3>Day 4: Resilience</h3>
                            <p><strong>Theme:</strong> Overcoming Challenges</p>
                            <p><strong>Affirmations:</strong></p>
                            <ul>
                                <li>"I am resilient and bounce back quickly."</li>
                                <li>"I learn from every experience."</li>
                                <li>"Challenges make me stronger."</li>
                            </ul>
                            <p><strong>Practice:</strong> Use affirmations when facing any difficulty today. Notice how they shift your perspective.</p>

                            <h3>Day 5: Relationships</h3>
                            <p><strong>Theme:</strong> Connection</p>
                            <p><strong>Affirmations:</strong></p>
                            <ul>
                                <li>"I attract positive, supportive relationships."</li>
                                <li>"I communicate with clarity and compassion."</li>
                                <li>"I am a source of love and kindness."</li>
                            </ul>
                            <p><strong>Practice:</strong> Apply affirmations to one interaction today. Notice the difference in how you show up.</p>

                            <h3>Day 6: Purpose</h3>
                            <p><strong>Theme:</strong> Direction and Meaning</p>
                            <p><strong>Affirmations:</strong></p>
                            <ul>
                                <li>"I am aligned with my purpose."</li>
                                <li>"I take action toward my goals."</li>
                                <li>"I create the life I want."</li>
                            </ul>
                            <p><strong>Practice:</strong> Write one actionable step toward a goal, then repeat affirmations.</p>

                            <h3>Day 7: Integration</h3>
                            <p><strong>Theme:</strong> Mastery</p>
                            <p><strong>Affirmations:</strong></p>
                            <ul>
                                <li>"Positive thinking is natural to me."</li>
                                <li>"I am transformed by this practice."</li>
                                <li>"I continue growing every day."</li>
                            </ul>
                            <p><strong>Practice:</strong> Review the week. What shifted? What affirmations resonated most? Create your personalized set for ongoing practice.</p>
                        </section>

                        <section>
                            <h2>Daily Structure (5-10 minutes)</h2>
                            <ol>
                                <li><strong>Morning (5 min):</strong> Read affirmations slowly, feel their meaning</li>
                                <li><strong>Midday (2 min):</strong> Quick mental review of today's affirmations</li>
                                <li><strong>Evening (3 min):</strong> Reflect on how affirmations showed up in your day</li>
                            </ol>
                        </section>

                        <section>
                            <h2>Tips for Success</h2>
                            <ul>
                                <li><strong>Consistency beats perfection:</strong> Missing one session doesn't ruin your progress</li>
                                <li><strong>Feel, don't just say:</strong> Engage emotions while repeating affirmations</li>
                                <li><strong>Customize:</strong> Adjust words to match your authentic voice</li>
                                <li><strong>Track progress:</strong> Note small shifts in thinking or behavior</li>
                                <li><strong>Stay patient:</strong> Real change takes time, but you'll notice improvements quickly</li>
                            </ul>
                        </section>

                        <section>
                            <h2>After Day 7: What's Next?</h2>
                            <p>
                                Continue with affirmations that resonated most. You can repeat the 7-day program with new themes, create a 30-day practice, or integrate affirmations into specific areas of your life.
                            </p>
                            <p>
                                For deeper practice, explore our <a href="/blog/posts/30-day-affirmation-challenge" className="text-yellow-500 hover:text-yellow-400">30-day challenge</a> or learn <a href="/blog/posts/how-to-write-powerful-affirmations" className="text-yellow-500 hover:text-yellow-400">how to write your own powerful affirmations</a>.
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

