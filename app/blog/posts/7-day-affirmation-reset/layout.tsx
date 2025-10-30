import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The 7-Day Affirmation Reset: Your Quick Start Guide | Daily Affirmations',
    description: 'Jumpstart your affirmation practice with this comprehensive 7-day program. Get daily affirmations, exercises, and guidance to transform your mindset in just one week.',
    keywords: '7 day challenge, affirmation reset, quick start affirmations, one week challenge, affirmation beginner guide, fast affirmation results, 7 days of affirmations, affirmation jumpstart',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'The 7-Day Affirmation Reset: Your Quick Start Guide',
        description: 'Transform your mindset in just 7 days with this comprehensive affirmation program.',
        images: ['https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?w=1200&h=630&fit=crop'],
        type: 'article',
        publishedTime: '2025-05-21T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Challenge', 'Guides', 'Quick Start', 'Beginner Friendly', 'Mindfulness'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'The 7-Day Affirmation Reset: Your Quick Start Guide',
        description: 'Transform your mindset in just 7 days with this affirmation program.',
        images: ['https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/7-day-affirmation-reset',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
