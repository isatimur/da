import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '30 Day Affirmation Challenge: A Complete Guide | Daily Affirmations',
    description: 'Join our comprehensive 30-day affirmation challenge. Get daily affirmations, track your progress, and transform your mindset with this proven month-long program.',
    keywords: '30 day challenge, affirmation challenge, daily affirmation practice, 30 days of affirmations, personal growth challenge, mindset transformation, habit formation, self-improvement challenge, positive thinking challenge',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: '30 Day Affirmation Challenge: A Complete Guide',
        description: 'Transform your mindset in 30 days with our comprehensive affirmation challenge program.',
        images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop'],
        type: 'article',
        publishedTime: '2024-06-18T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Challenge', 'Guides', 'Self-Improvement', 'Mindfulness', 'Habit Formation'],
    },
    twitter: {
        card: 'summary_large_image',
        title: '30 Day Affirmation Challenge: A Complete Guide',
        description: 'Transform your mindset in 30 days with our comprehensive affirmation challenge.',
        images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/30-day-affirmation-challenge',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
