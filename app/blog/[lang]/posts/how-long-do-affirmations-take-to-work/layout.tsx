import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'How Long Do Affirmations Take to Work? Realistic Timelines | Daily Affirmations',
        description: 'Discover realistic timelines for seeing results from affirmations and factors that affect effectiveness.',
        keywords: 'affirmation timeline, how long affirmations work, affirmation results, effectiveness',
    },
    ru: {
        title: 'Сколько времени нужно аффирмациям, чтобы работать? Реалистичные сроки | Daily Affirmations',
        description: 'Реалистичные сроки для результатов от аффирмаций и факторы эффективности.',
        keywords: 'сроки аффирмаций, сколько работают аффирмации, результаты аффирмаций, эффективность',
    },
    zh: {
        title: '肯定语需要多长时间才见效？现实的时间线 | Daily Affirmations',
        description: '了解肯定语产生结果的现实时间线以及影响效果的因素。',
        keywords: '肯定语时间线, 肯定语需要多长时间, 肯定语结果, 有效性',
    },
    ar: {
        title: 'كم من الوقت تستغرق التأكيدات لتعمل؟ الجداول الزمنية الواقعية | Daily Affirmations',
        description: 'اكتشف الجداول الزمنية الواقعية لرؤية النتائج من التأكيدات والعوامل المؤثرة.',
        keywords: 'جدول زمني التأكيدات, كم تستغرق التأكيدات, نتائج التأكيدات, الفعالية',
    },
    pt: {
        title: 'Quanto Tempo Leva para Afirmações Funcionarem? Prazos Realistas | Daily Affirmations',
        description: 'Descubra prazos realistas para ver resultados de afirmações e fatores que afetam eficácia.',
        keywords: 'prazo afirmações, quanto tempo afirmações, resultados afirmações, eficácia',
    },
    hi: {
        title: 'पुष्टिकरण को काम करने में कितना समय लगता है? यथार्थवादी समयसीमा | Daily Affirmations',
        description: 'पुष्टिकरण से परिणाम देखने के लिए यथार्थवादी समयसीमा और प्रभावशीलता को प्रभावित करने वाले कारकों का अन्वेषण करें।',
        keywords: 'पुष्टिकरण समयसीमा, पुष्टिकरण कितने समय, पुष्टिकरण परिणाम, प्रभावशीलता',
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
            images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-03-27T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/how-long-do-affirmations-take-to-work`,
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

