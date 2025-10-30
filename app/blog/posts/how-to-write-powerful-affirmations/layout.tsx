import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'How to Write Powerful Daily Affirmations That Actually Work | Daily Affirmations',
    description: 'Learn the proven techniques for crafting effective daily affirmations that create real change. Discover writing strategies, examples, and practices that make affirmations work.',
    keywords: 'daily affirmations, how to write affirmations, positive affirmations, affirmation writing, self-affirmation, personal growth, mental wellness, positive thinking, manifestation, self-improvement',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'How to Write Powerful Daily Affirmations That Actually Work',
        description: 'Master the art of writing effective daily affirmations with proven techniques and examples.',
        images: ['https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=630&fit=crop'],
        type: 'article',
        publishedTime: '2024-03-15T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Affirmations', 'Guides', 'Self-Improvement', 'Mental Health', 'Personal Growth'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How to Write Powerful Daily Affirmations That Actually Work',
        description: 'Master the art of writing effective daily affirmations with proven techniques.',
        images: ['https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/how-to-write-powerful-affirmations',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
