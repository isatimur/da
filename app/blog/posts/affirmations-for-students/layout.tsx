import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affirmations for Students: Enhancing Focus and Learning | Daily Affirmations',
    description: 'Discover powerful affirmations designed for students to enhance focus, improve learning, boost academic confidence, and manage exam stress. Learn student-specific affirmation practices.',
    keywords: 'student affirmations, academic affirmations, study affirmations, learning affirmations, exam affirmations, student success, academic performance, study motivation, student confidence',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Affirmations for Students: Enhancing Focus and Learning',
        description: 'Powerful affirmations designed specifically for student success and academic performance.',
        images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=630&fit=crop'],
        type: 'article',
        publishedTime: '2025-07-24T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Education', 'Students', 'Learning', 'Academic Success', 'Guides'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affirmations for Students: Enhancing Focus and Learning',
        description: 'Powerful affirmations for student success and academic performance.',
        images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/affirmations-for-students',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
