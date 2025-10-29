import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affirmations for Mothers: Self-Care Through Positive Thinking | Daily Affirmations',
    description: 'Discover powerful affirmations designed specifically for mothers to promote self-care, reduce mom guilt, build confidence, and maintain balance while parenting.',
    keywords: 'mother affirmations, mom affirmations, parenting affirmations, mother self-care, mom guilt, mother wellness, parenting confidence, mother balance, self-care for moms',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Affirmations for Mothers: Self-Care Through Positive Thinking',
        description: 'Powerful affirmations designed specifically for mothers to promote self-care and balance.',
        images: ['/blog/mother-affirmations.jpg'],
        type: 'article',
        publishedTime: '2025-09-19T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Parenting', 'Self-Care', 'Guides', 'Wellness', 'Motherhood'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affirmations for Mothers: Self-Care Through Positive Thinking',
        description: 'Powerful affirmations for mothers to promote self-care and balance.',
        images: ['/blog/mother-affirmations.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/affirmations-for-mothers',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
