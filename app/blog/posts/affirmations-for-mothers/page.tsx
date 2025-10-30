'use client'

import { Header } from '../../../components/Header';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { SocialShare } from '../../../components/SocialShare';
import { BlogJsonLd } from '../../../components/BlogJsonLd';
import Image from 'next/image';

export default function BlogPost() {
    const url = 'https://daily-affirmation.today/blog/posts/affirmations-for-mothers';
    const title = 'Affirmations for Mothers: Self-Care Through Positive Thinking';
    const description = 'Discover powerful affirmations designed specifically for mothers to promote self-care, reduce mom guilt, build confidence, and maintain balance while parenting.';
    const date = '2025-09-19';
    const category = 'Guides';
    const image = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=630&fit=crop';

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
                            September 19, 2025
                        </time>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            {category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            Affirmations for Mothers: Self-Care Through Positive Thinking
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Navigate motherhood with confidence and grace. Learn how affirmations help mothers reduce guilt, prioritize self-care, and find balance in the beautiful chaos of parenting.
                        </p>
                        <SocialShare url={url} title={title} description={description} />
                    </header>

                    <figure className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={image}
                            alt="Mother with child, representing motherhood, self-care, and positive parenting"
                            fill
                            className="object-cover"
                            priority
                        />
                    </figure>

                    <div className="prose prose-invert max-w-none">
                        <section>
                            <h2>Why Mothers Need Affirmations</h2>
                            <p>
                                Motherhood brings incredible joy alongside challenges: self-doubt, mom guilt, exhaustion, and the pressure to be perfect. Affirmations help mothers reframe negative self-talk, build confidence in their parenting, and prioritize their own well-being.
                            </p>
                            <p>
                                When mothers practice affirmations, they model positive self-talk for their children, reduce stress, and create a more balanced, joyful parenting experience.
                            </p>
                        </section>

                        <section>
                            <h2>Motherhood Affirmations by Need</h2>
                            
                            <h3>Reducing Mom Guilt</h3>
                            <ul>
                                <li>"I am doing my best, and that is enough."</li>
                                <li>"I release perfectionism and embrace being good enough."</li>
                                <li>"I am a good mother, even on hard days."</li>
                                <li>"Taking care of myself makes me a better mother."</li>
                                <li>"I forgive myself for mistakes and learn from them."</li>
                            </ul>

                            <h3>Self-Care and Boundaries</h3>
                            <ul>
                                <li>"I prioritize my well-being without guilt."</li>
                                <li>"Self-care is essential, not selfish."</li>
                                <li>"I set healthy boundaries that honor my needs."</li>
                                <li>"I am worthy of rest, support, and personal time."</li>
                                <li>"Taking breaks makes me a better parent."</li>
                            </ul>

                            <h3>Parenting Confidence</h3>
                            <ul>
                                <li>"I trust my parenting instincts and decisions."</li>
                                <li>"I am capable of handling parenting challenges."</li>
                                <li>"I am patient, loving, and present with my children."</li>
                                <li>"I raise my children with love, wisdom, and care."</li>
                                <li>"I make the best decisions I can with the information I have."</li>
                            </ul>

                            <h3>Balance and Patience</h3>
                            <ul>
                                <li>"I find balance between motherhood and my own needs."</li>
                                <li>"I practice patience with myself and my children."</li>
                                <li>"I release the need to control everything."</li>
                                <li>"I create harmony in our home through calm presence."</li>
                                <li>"I handle chaos with grace and flexibility."</li>
                            </ul>

                            <h3>Strength and Resilience</h3>
                            <ul>
                                <li>"I am strong, resilient, and capable."</li>
                                <li>"I handle parenting challenges with grace."</li>
                                <li>"I adapt and grow through every parenting experience."</li>
                                <li>"I am powerful in my role as a mother."</li>
                                <li>"I create a loving, supportive home environment."</li>
                            </ul>
                        </section>

                        <section>
                            <h2>When to Use Motherhood Affirmations</h2>
                            
                            <h3>Morning Routine</h3>
                            <p>Start your day with confidence:</p>
                            <ul>
                                <li>"I am ready for today's parenting challenges."</li>
                                <li>"I choose patience and presence today."</li>
                                <li>"I balance motherhood and self-care beautifully."</li>
                            </ul>

                            <h3>During Stressful Moments</h3>
                            <p>Calm yourself in chaos:</p>
                            <ul>
                                <li>"I breathe, stay calm, and handle this with grace."</li>
                                <li>"I am capable of managing this situation."</li>
                                <li>"This moment will pass, and I am handling it well."</li>
                            </ul>

                            <h3>When Feeling Overwhelmed</h3>
                            <p>Release pressure:</p>
                            <ul>
                                <li>"I don't have to be perfect—I just need to be present."</li>
                                <li>"I am enough, exactly as I am right now."</li>
                                <li>"I ask for help when I need it, without shame."</li>
                            </ul>

                            <h3>Before Self-Care Time</h3>
                            <p>Affirm your right to care for yourself:</p>
                            <ul>
                                <li>"I deserve this time for myself."</li>
                                <li>"Self-care makes me a better mother."</li>
                                <li>"I honor my needs without guilt."</li>
                            </ul>
                        </section>

                        <section>
                            <h2>Special Situations</h2>
                            
                            <h3>For New Mothers</h3>
                            <ul>
                                <li>"I am learning and growing into motherhood."</li>
                                <li>"I trust my instincts and bond with my baby."</li>
                                <li>"It's okay to ask for help and not know everything."</li>
                            </ul>

                            <h3>For Working Mothers</h3>
                            <ul>
                                <li>"I balance career and motherhood successfully."</li>
                                <li>"My work benefits my family and my personal growth."</li>
                                <li>"I am present in both my work and my parenting."</li>
                            </ul>

                            <h3>For Single Mothers</h3>
                            <ul>
                                <li>"I am strong and capable of raising my children alone."</li>
                                <li>"I build a supportive network and ask for help when needed."</li>
                                <li>"I am enough for my children, exactly as I am."</li>
                            </ul>

                            <h3>For Mothers with Multiple Children</h3>
                            <ul>
                                <li>"I give each child love and attention they need."</li>
                                <li>"I manage multiple needs with grace and efficiency."</li>
                                <li>"I create harmony among my children."</li>
                            </ul>
                        </section>

                        <section>
                            <h2>Building Your Motherhood Affirmation Practice</h2>
                            <ol>
                                <li><strong>Identify your biggest challenges:</strong> Guilt, exhaustion, self-doubt, perfectionism?</li>
                                <li><strong>Choose 3-5 affirmations:</strong> Focus on what you struggle with most</li>
                                <li><strong>Practice during quiet moments:</strong> Morning coffee, nap time, evening routine</li>
                                <li><strong>Use affirmations as needed:</strong> During stress, before self-care, when feeling overwhelmed</li>
                                <li><strong>Share with other mothers:</strong> Build community and normalize self-care</li>
                            </ol>
                        </section>

                        <section>
                            <h2>Modeling Positive Self-Talk for Children</h2>
                            <p>
                                When you practice affirmations, you model healthy self-talk for your children. They learn that:
                            </p>
                            <ul>
                                <li>Self-care is important and normal</li>
                                <li>It's okay to make mistakes and learn from them</li>
                                <li>Positive self-talk helps navigate challenges</li>
                                <li>They are worthy of self-compassion</li>
                            </ul>
                        </section>

                        <section>
                            <h2>Additional Resources</h2>
                            <p>
                                Enhance your motherhood journey with <a href="/blog/posts/building-self-confidence-affirmations" className="text-yellow-500 hover:text-yellow-400">confidence-building affirmations</a>, learn about <a href="/blog/posts/morning-affirmations-transform-your-day" className="text-yellow-500 hover:text-yellow-400">morning routines</a> for busy mothers, or explore <a href="/blog/posts/affirmations-for-anxiety" className="text-yellow-500 hover:text-yellow-400">affirmations for managing stress and anxiety</a>.
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

