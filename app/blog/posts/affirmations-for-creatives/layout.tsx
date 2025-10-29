import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affirmations for Creatives: Unlocking Your Artistic Potential | Daily Affirmations',
    description: 'Discover powerful affirmations designed for artists, writers, musicians, and creatives to overcome creative blocks, build artistic confidence, and unlock their full creative potential.',
    keywords: 'creative affirmations, artist affirmations, creative block affirmations, artistic confidence, creativity affirmations, writer affirmations, musician affirmations, creative potential, artistic inspiration',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Affirmations for Creatives: Unlocking Your Artistic Potential',
        description: 'Powerful affirmations designed for artists and creatives to unlock their potential.',
        images: ['/blog/creative-affirmations.jpg'],
        type: 'article',
        publishedTime: '2025-11-05T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Creativity', 'Art', 'Guides', 'Self-Expression', 'Personal Growth'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affirmations for Creatives: Unlocking Your Artistic Potential',
        description: 'Powerful affirmations for creatives to unlock their artistic potential.',
        images: ['/blog/creative-affirmations.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/affirmations-for-creatives',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
