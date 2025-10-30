import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affirmations for Athletes: Mental Training for Peak Performance | Daily Affirmations',
    description: 'Discover powerful affirmations designed specifically for athletes. Learn how mental training through affirmations enhances performance, builds confidence, and helps achieve athletic goals.',
    keywords: 'athlete affirmations, sports affirmations, athletic performance, mental training, sports psychology, athlete mindset, peak performance, sports confidence, athletic goals, sports motivation',
    authors: [{ name: 'Daily Affirmations Team' }],
    openGraph: {
        title: 'Affirmations for Athletes: Mental Training for Peak Performance',
        description: 'Mental training affirmations designed specifically for athletic performance.',
        images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop'],
        type: 'article',
        publishedTime: '2025-06-17T00:00:00.000Z',
        authors: ['Daily Affirmations Team'],
        tags: ['Sports', 'Athletics', 'Performance', 'Mental Training', 'Guides'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affirmations for Athletes: Mental Training for Peak Performance',
        description: 'Mental training affirmations for peak athletic performance.',
        images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop'],
    },
    alternates: {
        canonical: 'https://daily-affirmation.today/blog/posts/affirmations-for-athletes',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
