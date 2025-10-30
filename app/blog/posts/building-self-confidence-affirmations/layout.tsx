import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Building Self-Confidence Through Daily Affirmations | Daily Affirmations',
    description: 'Learn how daily affirmations can transform your self-confidence. Discover powerful confidence-building affirmations and proven techniques for overcoming self-doubt and building genuine self-belief.',
    keywords: 'self-confidence affirmations, confidence building, self-esteem, overcoming self-doubt, building confidence, positive self-talk, self-belief, self-worth, confidence exercises, personal development',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Building Self-Confidence Through Daily Affirmations',
        description: 'Transform your self-confidence with proven affirmation techniques and practices.',
        images: ['https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&h=630&fit=crop'],
        type: 'article',
        publishedTime: '2024-10-11T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Self-Improvement', 'Guides', 'Confidence', 'Personal Growth', 'Mindfulness'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Building Self-Confidence Through Daily Affirmations',
        description: 'Transform your self-confidence with proven affirmation techniques.',
        images: ['https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/building-self-confidence-affirmations',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
