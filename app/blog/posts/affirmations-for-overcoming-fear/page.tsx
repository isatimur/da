'use client'

import { Header } from '../../../components/Header';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { SocialShare } from '../../../components/SocialShare';
import { BlogJsonLd } from '../../../components/BlogJsonLd';
import Image from 'next/image';

export default function BlogPost() {
    const url = 'https://daily-affirmation.today/blog/posts/affirmations-for-overcoming-fear';
    const title = 'Affirmations for Overcoming Fear and Self-Doubt';
    const description = 'Discover powerful affirmations to overcome fear, self-doubt, and limiting beliefs. Learn proven techniques for using affirmations to build courage and move past fears.';
    const date = '2025-04-09';
    const category = 'Guides';
    const image = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop';

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
                            April 9, 2025
                        </time>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            {category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            Affirmations for Overcoming Fear and Self-Doubt
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Build courage and move past fear. Discover how affirmations help you face fears, overcome self-doubt, and take action despite uncertainty.
                        </p>
                        <SocialShare url={url} title={title} description={description} />
                    </header>

                    <figure className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={image}
                            alt="Person standing on mountain peak with arms raised, representing overcoming fear and conquering challenges"
                            fill
                            className="object-cover"
                            priority
                        />
                    </figure>

                    <div className="prose prose-invert max-w-none">
                        <section>
                            <h2>Understanding Fear and Self-Doubt</h2>
                            <p>
                                Fear and self-doubt are natural responses that can protect us, but they can also hold us back from growth and achievement. Affirmations help reprogram fearful thoughts and build courage to take action despite fear.
                            </p>
                            <p>
                                The key isn't eliminating fear—it's learning to move forward anyway. Affirmations build the mental strength to act courageously even when you feel afraid.
                            </p>
                        </section>

                        <section>
                            <h2>Fear-Fighting Affirmations</h2>
                            
                            <h3>General Fear and Uncertainty</h3>
                            <ul>
                                <li>"I am courageous and face my fears with strength."</li>
                                <li>"I trust myself to handle whatever comes my way."</li>
                                <li>"Fear doesn't control me—I choose courage."</li>
                                <li>"I move forward despite fear and uncertainty."</li>
                                <li>"I am stronger than my fears."</li>
                            </ul>

                            <h3>Fear of Failure</h3>
                            <ul>
                                <li>"I learn and grow from every experience, including failures."</li>
                                <li>"Failure is feedback, not final judgment."</li>
                                <li>"I take action despite fear of failure."</li>
                                <li>"I am capable of handling setbacks and bouncing back."</li>
                                <li>"Courage means acting despite fear, not without it."</li>
                            </ul>

                            <h3>Fear of Rejection</h3>
                            <ul>
                                <li>"I am worthy regardless of others' opinions."</li>
                                <li>"Rejection is redirection toward what's right for me."</li>
                                <li>"I show up authentically and accept the outcome."</li>
                                <li>"My value isn't determined by others' acceptance."</li>
                                <li>"I am enough, exactly as I am."</li>
                            </ul>

                            <h3>Fear of Judgment</h3>
                            <ul>
                                <li>"I release the need for others' approval."</li>
                                <li>"I live authentically, regardless of judgment."</li>
                                <li>"Other people's opinions don't define me."</li>
                                <li>"I am confident in my choices and actions."</li>
                                <li>"I honor my truth over others' expectations."</li>
                            </ul>

                            <h3>Self-Doubt</h3>
                            <ul>
                                <li>"I trust my abilities and decisions."</li>
                                <li>"I am capable and competent."</li>
                                <li>"Self-doubt is temporary—my strength is real."</li>
                                <li>"I silence my inner critic and trust myself."</li>
                                <li>"I have everything I need to succeed."</li>
                            </ul>
                        </section>

                        <section>
                            <h2>When to Use Fear-Fighting Affirmations</h2>
                            
                            <h3>Before Taking Action</h3>
                            <p>Build courage:</p>
                            <ul>
                                <li>"I am ready, capable, and courageous."</li>
                                <li>"I trust myself to handle this."</li>
                                <li>"I act despite fear and move forward."</li>
                            </ul>

                            <h3>During Fearful Moments</h3>
                            <p>Calm and refocus:</p>
                            <ul>
                                <li>"I breathe through fear and choose courage."</li>
                                <li>"This fear is temporary, my strength is constant."</li>
                                <li>"I am safe and capable of handling this."</li>
                            </ul>

                            <h3>When Self-Doubt Arises</h3>
                            <p>Reaffirm your capabilities:</p>
                            <ul>
                                <li>"I trust my abilities and instincts."</li>
                                <li>"I am competent and capable."</li>
                                <li>"Self-doubt doesn't define my reality."</li>
                            </ul>

                            <h3>After Setbacks</h3>
                            <p>Rebuild confidence:</p>
                            <ul>
                                <li>"I learn from this and move forward stronger."</li>
                                <li>"Setbacks don't define me—my resilience does."</li>
                                <li>"I bounce back quickly and keep going."</li>
                            </ul>
                        </section>

                        <section>
                            <h2>Combining Affirmations with Action</h2>
                            <p>
                                Affirmations work best when paired with courageous action:
                            </p>
                            <ol>
                                <li><strong>Identify the fear:</strong> What exactly are you afraid of?</li>
                                <li><strong>Choose your affirmation:</strong> What do you need to hear?</li>
                                <li><strong>Repeat and feel:</strong> Say the affirmation until you feel courage</li>
                                <li><strong>Take small action:</strong> Do one thing that moves you forward</li>
                                <li><strong>Celebrate courage:</strong> Acknowledge that you acted despite fear</li>
                            </ol>
                        </section>

                        <section>
                            <h2>Specific Fear Scenarios</h2>
                            
                            <h3>Public Speaking</h3>
                            <ul>
                                <li>"I communicate clearly and confidently."</li>
                                <li>"My message is valuable and I share it with courage."</li>
                                <li>"I am prepared and speak with authenticity."</li>
                            </ul>

                            <h3>Starting Something New</h3>
                            <ul>
                                <li>"I embrace the unknown with curiosity and courage."</li>
                                <li>"I am capable of learning and adapting."</li>
                                <li>"I trust the process and my ability to succeed."</li>
                            </ul>

                            <h3>Making Big Decisions</h3>
                            <ul>
                                <li>"I trust my judgment and make decisions confidently."</li>
                                <li>"I have all the information I need to choose wisely."</li>
                                <li>"I am capable of handling the outcomes of my decisions."</li>
                            </ul>

                            <h3>Setting Boundaries</h3>
                            <ul>
                                <li>"I honor my needs and set boundaries with confidence."</li>
                                <li>"My boundaries are valid and necessary."</li>
                                <li>"I communicate my limits clearly and without guilt."</li>
                            </ul>
                        </section>

                        <section>
                            <h2>Building Your Fear-Fighting Practice</h2>
                            <ol>
                                <li><strong>Identify your fears:</strong> What holds you back most?</li>
                                <li><strong>Choose 3-5 affirmations:</strong> Focus on your biggest fears</li>
                                <li><strong>Practice daily:</strong> Build courage muscle with regular practice</li>
                                <li><strong>Use before challenges:</strong> Prepare mentally before facing fears</li>
                                <li><strong>Track progress:</strong> Notice when you act courageously despite fear</li>
                            </ol>
                        </section>

                        <section>
                            <h2>Additional Resources</h2>
                            <p>
                                Build courage with <a href="/blog/posts/building-self-confidence-affirmations" className="text-yellow-500 hover:text-yellow-400">confidence-building affirmations</a>, learn <a href="/blog/posts/how-to-write-powerful-affirmations" className="text-yellow-500 hover:text-yellow-400">how to write personalized affirmations</a>, or explore <a href="/blog/posts/affirmations-for-anxiety" className="text-yellow-500 hover:text-yellow-400">affirmations for managing anxiety</a>.
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

