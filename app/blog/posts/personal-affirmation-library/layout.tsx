import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Creating Your Personal Affirmation Library',
    description: 'Learn how to write powerful, personalized affirmations and organize them effectively using our Pro features.',
    openGraph: {
        title: 'Building Your Personal Affirmation Library: A Complete Guide',
        description: 'Master the art of creating and organizing powerful, personalized affirmations.',
        images: ['/blog/affirmation-library.jpg'],
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 