import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Psychology of Positive Affirmations: What Science Tells Us | Daily Affirmations',
    description: 'Explore the psychological research and scientific evidence behind positive affirmations. Learn how they work, why they\'re effective, and how to maximize their impact.',
    keywords: 'psychology of affirmations, positive affirmations science, self-affirmation theory, cognitive psychology, affirmation research, mental health, neuroscience, positive psychology, behavioral change, mind-body connection',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'The Psychology of Positive Affirmations: What Science Tells Us',
        description: 'Scientific research reveals how positive affirmations create real psychological and neurological changes.',
        images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=630&fit=crop'],
        type: 'article',
        publishedTime: '2024-05-10T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Psychology', 'Mindfulness', 'Research', 'Mental Health', 'Science'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'The Psychology of Positive Affirmations: What Science Tells Us',
        description: 'Scientific research reveals how positive affirmations create real psychological changes.',
        images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/the-psychology-of-positive-affirmations',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
