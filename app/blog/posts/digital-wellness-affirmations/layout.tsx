import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Digital Wellness: Using Technology for Positive Mindset | Daily Affirmations',
    description: 'Discover how to use technology mindfully for positive mental health. Learn how digital tools like affirmation apps can support well-being while maintaining healthy tech boundaries.',
    keywords: 'digital wellness, technology and mental health, digital mindfulness, tech wellness, healthy technology use, digital affirmations, mindful technology, tech balance, digital self-care',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Digital Wellness: Using Technology for Positive Mindset',
        description: 'Learn how to use technology mindfully for positive mental health and wellness.',
        images: ['/blog/digital-wellness.jpg'],
        type: 'article',
        publishedTime: '2026-01-15T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Digital Wellness', 'Technology', 'Mental Health', 'Mindfulness', 'Self-Care'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Digital Wellness: Using Technology for Positive Mindset',
        description: 'Learn how to use technology mindfully for positive mental health.',
        images: ['/blog/digital-wellness.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/digital-wellness-affirmations',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
