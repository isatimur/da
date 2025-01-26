import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../components/Header';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { Rss } from 'lucide-react';
import { blogPosts } from './posts/data';

export const metadata: Metadata = {
    title: 'Blog - Daily Affirmations Updates and Insights',
    description: 'Stay updated with the latest features, mindfulness tips, and development updates for the Daily Affirmations Chrome extension.',
};

export default function BlogPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 pt-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
                            Latest Updates
                        </h1>
                        <a
                            href="/api/rss"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-neutral-200"
                        >
                            <Rss className="w-4 h-4" />
                            <span>RSS Feed</span>
                        </a>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {blogPosts.map((post) => (
                            <article
                                key={post.slug}
                                className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900/80 transition-colors"
                            >
                                <div className="text-sm text-neutral-400 mb-2">{post.date}</div>
                                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                                    {post.category}
                                </div>
                                <h2 className="text-xl font-semibold mb-3">
                                    <Link
                                        href={`/blog/posts/${post.slug}`}
                                        className="hover:text-yellow-500 transition-colors"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-neutral-400 mb-4">{post.excerpt}</p>
                                <Link
                                    href={`/blog/posts/${post.slug}`}
                                    className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
                                >
                                    Read more
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </article>
                        ))}
                    </div>

                    <div className="mt-20">
                        <NewsletterSignup />
                    </div>
                </div>
            </main>
        </>
    );
} 