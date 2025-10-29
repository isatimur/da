import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nighttime Affirmations: Ending Your Day with Gratitude | Daily Affirmations',
    description: 'Learn how nighttime affirmations improve sleep quality and promote gratitude. Discover evening affirmation routines that help you reflect, release, and prepare for restful sleep.',
    keywords: 'nighttime affirmations, evening affirmations, sleep affirmations, bedtime affirmations, gratitude practice, better sleep, evening routine, sleep quality, night routine, restful sleep',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Nighttime Affirmations: Ending Your Day with Gratitude',
        description: 'Evening affirmation routines that promote gratitude and improve sleep quality.',
        images: ['/blog/nighttime-affirmations.jpg'],
        type: 'article',
        publishedTime: '2024-08-14T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Sleep', 'Mindfulness', 'Guides', 'Wellness', 'Evening Routine'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nighttime Affirmations: Ending Your Day with Gratitude',
        description: 'Evening affirmation routines that promote gratitude and improve sleep.',
        images: ['/blog/nighttime-affirmations.jpg'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/nighttime-affirmations-gratitude',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
