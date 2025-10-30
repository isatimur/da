import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Neuroscience of Affirmations: How They Rewire Your Brain | Daily Affirmations',
    description: 'Explore the neuroscience behind affirmations and discover how they physically rewire your brain. Learn about neuroplasticity, neural pathways, and the science of positive self-talk.',
    keywords: 'neuroscience affirmations, neuroplasticity, brain rewiring, neural pathways, affirmation science, brain science, positive thinking neuroscience, cognitive neuroscience, brain change',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'The Neuroscience of Affirmations: How They Rewire Your Brain',
        description: 'Discover how affirmations physically rewire your brain through neuroplasticity.',
        images: ['https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=630&fit=crop'],
        type: 'article',
        publishedTime: '2025-02-18T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Science', 'Neuroscience', 'Research', 'Mindfulness', 'Brain Health'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'The Neuroscience of Affirmations: How They Rewire Your Brain',
        description: 'Discover how affirmations physically rewire your brain.',
        images: ['https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/the-neuroscience-of-affirmations',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
