import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affirmations for Work: Boosting Professional Success | Daily Affirmations',
    description: 'Discover powerful workplace affirmations to enhance your career, boost productivity, and achieve professional success. Learn how to use affirmations for confidence, leadership, and work-life balance.',
    keywords: 'work affirmations, career affirmations, professional success, workplace confidence, productivity affirmations, career growth, work motivation, professional development, success affirmations, leadership affirmations',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Affirmations for Work: Boosting Professional Success',
        description: 'Powerful affirmations to enhance your career and achieve professional success.',
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop'],
        type: 'article',
        publishedTime: '2024-11-08T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Career', 'Guides', 'Productivity', 'Professional Growth', 'Success'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affirmations for Work: Boosting Professional Success',
        description: 'Powerful affirmations to enhance your career and professional success.',
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/affirmations-for-work',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
