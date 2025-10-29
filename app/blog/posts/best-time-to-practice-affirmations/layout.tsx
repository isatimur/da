import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Best Time to Practice Affirmations: Timing Your Positivity | Daily Affirmations',
    description: 'Discover when and how often to practice affirmations for maximum effectiveness. Learn about optimal timing, frequency, and how different times of day affect affirmation impact.',
    keywords: 'when to practice affirmations, best time for affirmations, affirmation timing, how often to do affirmations, morning affirmations, evening affirmations, affirmation schedule, affirmation frequency',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'The Best Time to Practice Affirmations: Timing Your Positivity',
        description: 'Discover optimal timing and frequency for practicing affirmations effectively.',
        images: ['/blog/affirmation-timing.jpg'],
        type: 'article',
        publishedTime: '2025-10-08T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Guides', 'Timing', 'Best Practices', 'Mindfulness', 'Routine'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'The Best Time to Practice Affirmations: Timing Your Positivity',
        description: 'Discover optimal timing for practicing affirmations effectively.',
        images: ['/blog/affirmation-timing.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/best-time-to-practice-affirmations',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
