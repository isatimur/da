'use client'

import { Header } from '../../../components/Header';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { SocialShare } from '../../../components/SocialShare';
import Image from 'next/image';

export default function BlogPost() {
    const url = 'https://daily-affirmation.today/blog/posts/science-of-daily-affirmations';
    const title = 'The Science Behind Daily Affirmations';
    const description = 'Explore the psychological research and neuroscience behind positive affirmations, and learn how they can rewire your brain for success and well-being.';

    return (
        <>
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 pt-24">
                <article className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <div className="text-sm text-neutral-400 mb-2">January 22, 2024</div>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            Mindfulness
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            The Science Behind Daily Affirmations: How Positive Self-Talk Transforms Your Brain
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Discover the fascinating neuroscience and psychological research that explains why daily affirmations are so powerful for personal growth and mental well-being.
                        </p>
                        <SocialShare url={url} title={title} description={description} />
                    </div>

                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src="/blog/brain-neurons.jpg"
                            alt="Neural Network Visualization"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <h2>The Neuroscience of Positive Affirmations</h2>
                        <p>
                            Recent neuroscientific research has shown that positive affirmations can actually change the way our brains work. When we consistently practice positive self-talk, we strengthen neural pathways associated with self-worth and optimism.
                        </p>

                        <h2>Key Research Findings</h2>
                        <ul>
                            <li><strong>Neural Plasticity:</strong> Our brains can form new neural connections throughout our lives</li>
                            <li><strong>Stress Reduction:</strong> Regular affirmations lower cortisol levels</li>
                            <li><strong>Improved Performance:</strong> Studies show enhanced problem-solving abilities</li>
                            <li><strong>Emotional Regulation:</strong> Better control over negative thought patterns</li>
                            <li><strong>Long-term Changes:</strong> Consistent practice leads to lasting neural modifications</li>
                        </ul>

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">Research Highlight</h3>
                            <p>
                                A 2016 study published in Social Cognitive and Affective Neuroscience found that self-affirmation activities engaged the reward centers in the brain, specifically the ventral striatum and ventral medial prefrontal cortex.
                            </p>
                        </div>

                        <h2>Psychological Mechanisms</h2>
                        <p>
                            Affirmations work through several psychological mechanisms:
                        </p>
                        <ul>
                            <li><strong>Self-Perception Theory:</strong> We internalize the statements we repeatedly tell ourselves</li>
                            <li><strong>Cognitive Restructuring:</strong> Replacing negative thought patterns with positive ones</li>
                            <li><strong>Confirmation Bias:</strong> Training our minds to notice evidence supporting our positive beliefs</li>
                            <li><strong>Self-Fulfilling Prophecy:</strong> Positive expectations leading to positive outcomes</li>
                        </ul>

                        <h2>Making Affirmations More Effective</h2>
                        <ol>
                            <li><strong>Consistency:</strong> Practice daily for optimal neural pathway formation</li>
                            <li><strong>Personalization:</strong> Create affirmations that resonate with your specific goals</li>
                            <li><strong>Emotional Connection:</strong> Include feelings and sensations in your affirmations</li>
                            <li><strong>Present Tense:</strong> Frame affirmations as current reality rather than future goals</li>
                        </ol>

                        <div className="bg-gradient-to-r from-neutral-900/50 to-neutral-800/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🧠 Pro Tip: The 21-Day Rule</h3>
                            <p>
                                Research suggests it takes about 21 days to form a new habit. Start with our 21-day affirmation challenge to establish a consistent practice and experience the benefits firsthand.
                            </p>
                        </div>

                        <h2>Future Research Directions</h2>
                        <p>
                            Scientists continue to explore:
                        </p>
                        <ul>
                            <li>Long-term neuroplastic changes from affirmation practice</li>
                            <li>Optimal timing and frequency of affirmations</li>
                            <li>Integration with other mindfulness practices</li>
                            <li>Individual differences in affirmation effectiveness</li>
                        </ul>

                        <h2>Join Our Research</h2>
                        <p>
                            We're collaborating with researchers to study the effectiveness of digital affirmation practices. Sign up for our newsletter to participate in upcoming studies and contribute to this growing field of research.
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