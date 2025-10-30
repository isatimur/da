import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Creating Affirmations That Resonate: The Personal Touch | Daily Affirmations',
    description: 'Learn how to create deeply personal affirmations that truly resonate with your values, goals, and authentic self. Discover techniques for crafting affirmations that feel genuine and powerful.',
    keywords: 'personal affirmations, custom affirmations, personalized affirmations, creating affirmations, writing affirmations, personal growth affirmations, authentic affirmations, meaningful affirmations',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Creating Affirmations That Resonate: The Personal Touch',
        description: 'Learn to create deeply personal affirmations that truly resonate with you.',
        images: ['https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop'],
        type: 'article',
        publishedTime: '2025-03-12T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Personal Development', 'Guides', 'Self-Improvement', 'Customization', 'Writing'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Creating Affirmations That Resonate: The Personal Touch',
        description: 'Learn to create deeply personal affirmations that truly resonate.',
        images: ['https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/creating-affirmations-that-resonate',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
