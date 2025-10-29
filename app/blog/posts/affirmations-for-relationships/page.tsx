'use client'

import { Header } from '../../../components/Header';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { SocialShare } from '../../../components/SocialShare';
import { BlogJsonLd } from '../../../components/BlogJsonLd';
import Image from 'next/image';

export default function BlogPost() {
    const url = 'https://daily-affirmation.today/blog/posts/affirmations-for-relationships';
    const title = 'Affirmations for Relationships: Strengthening Connections';
    const description = 'Discover powerful affirmations to strengthen relationships, improve communication, and deepen connections with partners, family, and friends. Learn relationship-focused affirmation practices.';
    const date = '2025-01-14';
    const category = 'Guides';
    const image = '/blog/relationship-affirmations.jpg';

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
                            January 14, 2025
                        </time>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            {category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            Affirmations for Relationships: Strengthening Connections
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Deepen your relationships through powerful affirmation practices. Discover how positive self-talk about relationships transforms the way you connect, communicate, and care for the people who matter most.
                        </p>
                        <SocialShare url={url} title={title} description={description} />
                    </header>

                    <figure className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={image}
                            alt="Happy couple and family representing healthy relationships and connection"
                            fill
                            className="object-cover"
                            priority
                        />
                    </figure>

                    <div className="prose prose-invert max-w-none">
                        <section>
                            <h2>How Affirmations Transform Relationships</h2>
                            <p>
                                Our relationships are deeply influenced by how we think about them. Affirmations focused on relationships help you shift from negative patterns—fear of rejection, communication struggles, conflict avoidance—to positive frameworks that support healthy, loving connections.
                            </p>
                            <p>
                                When you affirm positive beliefs about relationships, you change how you show up in them. You become more open to connection, better at communication, and more capable of giving and receiving love.
                            </p>
                        </section>

                        <section>
                            <h2>Relationship Affirmations by Category</h2>
                            
                            <h3>Romantic Relationships</h3>
                            <ul>
                                <li>"I attract and maintain a loving, supportive romantic relationship."</li>
                                <li>"I communicate openly and honestly with my partner, creating deeper intimacy."</li>
                                <li>"I am worthy of love and capable of giving love freely."</li>
                                <li>"I resolve conflicts with respect, understanding, and a desire for connection."</li>
                                <li>"My relationship grows stronger through challenges and shared joy."</li>
                            </ul>

                            <h3>Family Relationships</h3>
                            <ul>
                                <li>"I create warmth, understanding, and love within my family."</li>
                                <li>"I honor family relationships while maintaining healthy boundaries."</li>
                                <li>"I communicate with family members with compassion and patience."</li>
                                <li>"I build stronger family connections through presence and care."</li>
                            </ul>

                            <h3>Friendships</h3>
                            <ul>
                                <li>"I attract and nurture friendships based on mutual respect and support."</li>
                                <li>"I am a loyal, caring friend who shows up for those I love."</li>
                                <li>"I build friendships that uplift both me and my friends."</li>
                                <li>"I communicate authentically and create deep, meaningful connections."</li>
                            </ul>

                            <h3>Self-Relationship</h3>
                            <ul>
                                <li>"I treat myself with the same love and compassion I extend to others."</li>
                                <li>"I am complete and whole on my own, while also open to connection."</li>
                                <li>"I set healthy boundaries that honor both my needs and others'."</li>
                            </ul>
                        </section>

                        <section>
                            <h2>Using Affirmations in Relationship Practice</h2>
                            <p>
                                Practice relationship affirmations daily to shift your internal dialogue about connection. As you repeat these affirmations, you'll notice changes in how you show up—more open, more present, more loving.
                            </p>
                        </section>

                        <section>
                            <h2>Resources</h2>
                            <p>
                                Explore <a href="/blog/posts/how-to-write-powerful-affirmations" className="text-yellow-500 hover:text-yellow-400">writing effective affirmations</a> or learn about <a href="/blog/posts/building-self-confidence-affirmations" className="text-yellow-500 hover:text-yellow-400">building confidence</a> in relationships.
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
