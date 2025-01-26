import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'January 2024 Product Updates',
    description: 'A roundup of all the new features and improvements we\'ve added this month, including Focus Mode, Cloud Sync, and more.',
    openGraph: {
        title: 'January 2024: A Month of Mindful Innovation',
        description: 'Explore our latest features and improvements for a better mindfulness experience.',
        images: ['/blog/january-updates.jpg'],
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 