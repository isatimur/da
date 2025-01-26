import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Introducing Cloud Sync & Backup',
    description: 'Never lose your personalized affirmations again. Our new cloud sync feature keeps your data safe and accessible across all your devices.',
    openGraph: {
        title: 'Introducing Cloud Sync & Backup',
        description: 'Keep your affirmations safe and synced across all devices.',
        images: ['/blog/cloud-sync.jpg'],
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 