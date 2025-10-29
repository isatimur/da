import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Morning Affirmations: Transform Your Day in 5 Minutes | Daily Affirmations',
    description: 'Discover powerful morning affirmation routines that set a positive tone for your entire day. Learn proven techniques and specific affirmations for morning success.',
    keywords: 'morning affirmations, morning routine, daily affirmations, positive morning mindset, morning meditation, morning success, daily routine, morning motivation, start your day right, positive thinking',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Morning Affirmations: Transform Your Day in 5 Minutes',
        description: 'Powerful morning affirmation routines that create lasting positive change.',
        images: ['/blog/morning-affirmations.jpg'],
        type: 'article',
        publishedTime: '2024-04-22T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Morning Routines', 'Mindfulness', 'Guides', 'Productivity', 'Self-Improvement'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Morning Affirmations: Transform Your Day in 5 Minutes',
        description: 'Powerful morning affirmation routines that create lasting positive change.',
        images: ['/blog/morning-affirmations.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/morning-affirmations-transform-your-day',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
