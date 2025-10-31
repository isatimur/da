import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Mindfulness and Affirmations: A Perfect Pair | Daily Affirmations',
        description: 'How mindfulness and affirmations work together for deeper transformation.',
        keywords: 'mindfulness, affirmations, meditation, awareness',
    },
    ru: {
        title: 'Осознанность и аффирмации: идеальная пара | Daily Affirmations',
        description: 'Как осознанность и аффирмации работают вместе для глубокой трансформации.',
        keywords: 'осознанность, аффирмации, медитация, внимательность',
    },
    zh: {
        title: '正念与肯定语：完美搭配 | Daily Affirmations',
        description: '正念与肯定语如何共同作用实现更深层转化。',
        keywords: '正念, 肯定语, 冥想, 觉知',
    },
    ar: {
        title: 'اليقظة والتأكيدات: ثنائي مثالي | Daily Affirmations',
        description: 'كيف تعمل اليقظة والتأكيدات معاً للتحول الأعمق.',
        keywords: 'اليقظة, التأكيدات, التأمل, الوعي',
    },
    pt: {
        title: 'Atenção Plena e Afirmações: Um Par Perfeito | Daily Affirmations',
        description: 'Como atenção plena e afirmações trabalham juntas para transformação mais profunda.',
        keywords: 'atenção plena, afirmações, meditação, consciência',
    },
    hi: {
        title: 'माइंडफुलनेस और पुष्टिकरण: एक सही जोड़ी | Daily Affirmations',
        description: 'माइंडफुलनेस और पुष्टिकरण कैसे गहरे बदलाव के लिए एक साथ काम करते हैं।',
        keywords: 'माइंडफुलनेस, पुष्टिकरण, ध्यान, जागरूकता',
    },
};

export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const lang = resolvedParams?.lang || 'en';
    const m = metadataByLang[lang] || metadataByLang.en;

    return {
        ...m,
        openGraph: {
            title: m.title!,
            description: m.description!,
            images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-12-03T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/mindfulness-and-affirmations`,
        },
    };
}

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

