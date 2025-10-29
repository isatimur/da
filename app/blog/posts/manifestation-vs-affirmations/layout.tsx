import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manifestation vs. Affirmations: Separating Fact from Fiction | Daily Affirmations',
    description: 'Understand the real differences between manifestation and affirmations. Learn what science says about each practice and how to use them effectively together.',
    keywords: 'manifestation vs affirmations, law of attraction, manifestation techniques, affirmation vs manifestation, manifestation practice, positive thinking, law of attraction science',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Manifestation vs. Affirmations: Separating Fact from Fiction',
        description: 'Understand the real differences between manifestation and affirmations.',
        images: ['/blog/manifestation-affirmations.jpg'],
        type: 'article',
        publishedTime: '2025-08-13T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Spirituality', 'Mindfulness', 'Guides', 'Personal Growth', 'Self-Help'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Manifestation vs. Affirmations: Separating Fact from Fiction',
        description: 'Understand the differences between manifestation and affirmations.',
        images: ['/blog/manifestation-affirmations.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/manifestation-vs-affirmations',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
