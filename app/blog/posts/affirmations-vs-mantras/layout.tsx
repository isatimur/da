import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affirmations vs. Mantras: What\'s the Difference? | Daily Affirmations',
    description: 'Understand the key differences between affirmations and mantras. Learn when to use each, how they work differently, and how to choose the right practice for your goals.',
    keywords: 'affirmations vs mantras, mantras meaning, affirmations meaning, meditation mantras, positive affirmations, mantra practice, affirmation practice, mindfulness practices, spiritual practices, meditation',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Affirmations vs. Mantras: What\'s the Difference?',
        description: 'Understanding the differences between affirmations and mantras to choose the right practice.',
        images: ['/blog/affirmations-vs-mantras.jpg'],
        type: 'article',
        publishedTime: '2024-09-05T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Mindfulness', 'Guides', 'Meditation', 'Spiritual Practice', 'Wellness'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affirmations vs. Mantras: What\'s the Difference?',
        description: 'Understanding the differences between affirmations and mantras.',
        images: ['/blog/affirmations-vs-mantras.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/affirmations-vs-mantras',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
