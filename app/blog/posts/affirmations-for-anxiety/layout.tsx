import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affirmations for Anxiety: Calming Your Mind with Words | Daily Affirmations',
    description: 'Discover powerful affirmations specifically designed to calm anxiety and reduce stress. Learn science-backed techniques for using affirmations to manage anxious thoughts and find inner peace.',
    keywords: 'anxiety affirmations, affirmations for anxiety relief, calm anxiety, stress reduction, anxiety management, mental health, coping with anxiety, anxiety treatment, positive affirmations anxiety, self-soothing',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Affirmations for Anxiety: Calming Your Mind with Words',
        description: 'Powerful affirmations and techniques to calm anxiety and reduce stress naturally.',
        images: ['/blog/anxiety-affirmations.jpg'],
        type: 'article',
        publishedTime: '2024-07-25T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Mental Health', 'Anxiety', 'Guides', 'Self-Care', 'Wellness'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affirmations for Anxiety: Calming Your Mind with Words',
        description: 'Powerful affirmations and techniques to calm anxiety naturally.',
        images: ['/blog/anxiety-affirmations.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/affirmations-for-anxiety',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
