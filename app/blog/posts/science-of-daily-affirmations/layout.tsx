import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Science Behind Daily Affirmations',
    description: 'Explore the psychological research and neuroscience behind positive affirmations, and learn how they can rewire your brain for success and well-being.',
    openGraph: {
        title: 'The Science Behind Daily Affirmations',
        description: 'Discover how affirmations change your brain for success and well-being.',
        images: ['brain-neurons.jpg'],
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 