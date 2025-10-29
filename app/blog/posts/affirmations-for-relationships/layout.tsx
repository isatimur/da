import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affirmations for Relationships: Strengthening Connections | Daily Affirmations',
    description: 'Discover powerful affirmations to strengthen relationships, improve communication, and deepen connections with partners, family, and friends. Learn relationship-focused affirmation practices.',
    keywords: 'relationship affirmations, love affirmations, relationship communication, healthy relationships, partner affirmations, family affirmations, friendship affirmations, relationship improvement, love and relationships',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Affirmations for Relationships: Strengthening Connections',
        description: 'Powerful affirmations to strengthen relationships and improve communication.',
        images: ['/blog/relationship-affirmations.jpg'],
        type: 'article',
        publishedTime: '2025-01-14T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Relationships', 'Guides', 'Communication', 'Wellness', 'Love'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affirmations for Relationships: Strengthening Connections',
        description: 'Powerful affirmations to strengthen relationships and communication.',
        images: ['/blog/relationship-affirmations.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/affirmations-for-relationships',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
