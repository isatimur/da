import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mindfulness and Affirmations: A Perfect Pair | Daily Affirmations',
    description: 'Discover how mindfulness and affirmations work together to create deeper transformation. Learn techniques for combining these powerful practices for enhanced well-being and personal growth.',
    keywords: 'mindfulness affirmations, mindful practice, meditation and affirmations, present moment awareness, mindful living, meditation practice, awareness practice, mindfulness techniques, conscious living',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Mindfulness and Affirmations: A Perfect Pair',
        description: 'Combine mindfulness and affirmations for deeper transformation and well-being.',
        images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop'],
        type: 'article',
        publishedTime: '2024-12-03T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Mindfulness', 'Meditation', 'Guides', 'Wellness', 'Self-Improvement'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mindfulness and Affirmations: A Perfect Pair',
        description: 'Combine mindfulness and affirmations for deeper transformation.',
        images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/mindfulness-and-affirmations',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
