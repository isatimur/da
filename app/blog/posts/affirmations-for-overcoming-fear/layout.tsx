import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affirmations for Overcoming Fear and Self-Doubt | Daily Affirmations',
    description: 'Discover powerful affirmations to overcome fear, self-doubt, and limiting beliefs. Learn proven techniques for using affirmations to build courage and move past fears.',
    keywords: 'affirmations for fear, overcoming fear, self-doubt affirmations, courage affirmations, fear management, conquering fear, self-doubt help, fear and anxiety, personal courage',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Affirmations for Overcoming Fear and Self-Doubt',
        description: 'Powerful affirmations and techniques to overcome fear and build courage.',
        images: ['/blog/fear-affirmations.jpg'],
        type: 'article',
        publishedTime: '2025-04-09T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Mental Health', 'Guides', 'Courage', 'Self-Improvement', 'Overcoming Challenges'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affirmations for Overcoming Fear and Self-Doubt',
        description: 'Powerful affirmations to overcome fear and build courage.',
        images: ['/blog/fear-affirmations.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/affirmations-for-overcoming-fear',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
