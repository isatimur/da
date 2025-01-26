import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Introducing Focus Mode - A New Way to Practice Mindfulness | Daily Affirmations',
    description: 'Discover how our new Focus Mode helps you create a distraction-free environment for your daily affirmations practice. Learn about features, benefits, and how to get started.',
    keywords: 'focus mode, mindfulness, daily affirmations, meditation, distraction-free, mental health, productivity, mindful practice, concentration, digital wellness',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Introducing Focus Mode - A New Way to Practice Mindfulness',
        description: 'Create a distraction-free environment for your daily affirmations.',
        images: ['/blog/focus-mode.jpg'],
        type: 'article',
        publishedTime: '2024-01-23T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Focus Mode', 'Mindfulness', 'Feature Update', 'Mental Health', 'Productivity'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Introducing Focus Mode - A New Way to Practice Mindfulness',
        description: 'Create a distraction-free environment for your daily affirmations.',
        images: ['/blog/focus-mode.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/introducing-focus-mode',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 