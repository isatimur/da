import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '5 Ways to Build a Consistent Mindfulness Practice',
    description: 'Practical tips and strategies to incorporate mindfulness into your daily routine, using Daily Affirmations as your companion.',
    openGraph: {
        title: '5 Ways to Build a Consistent Mindfulness Practice',
        description: 'Transform your daily routine with proven mindfulness strategies.',
        images: ['/blog/mindfulness-practice.jpg'],
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 