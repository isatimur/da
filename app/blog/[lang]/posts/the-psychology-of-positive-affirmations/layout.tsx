import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'The Psychology of Positive Affirmations: What Science Tells Us | Daily Affirmations',
        description: 'Explore psychological research and scientific evidence behind positive affirmations.',
        keywords: 'psychology, affirmations, self-affirmation theory, cognitive restructuring',
    },
    ru: {
        title: 'Психология позитивных аффирмаций: что говорит наука | Daily Affirmations',
        description: 'Исследования психологии и научные доказательства эффективности позитивных аффирмаций.',
        keywords: 'психология, аффирмации, теория самоутверждения, когнитивная реструктуризация',
    },
    zh: {
        title: '积极肯定语的心理学：科学告诉我们什么 | Daily Affirmations',
        description: '探索积极肯定语背后的心理学研究与科学证据。',
        keywords: '心理学, 肯定语, 自我肯定理论, 认知重构',
    },
    ar: {
        title: 'علم نفس التأكيدات الإيجابية: ما يقوله العلم | Daily Affirmations',
        description: 'استكشف الأبحاث النفسية والأدلة العلمية وراء التأكيدات الإيجابية.',
        keywords: 'علم النفس, التأكيدات, نظرية التأكيد الذاتي, إعادة هيكلة المعرف',
    },
    pt: {
        title: 'A Psicologia das Afirmações Positivas: O que a Ciência nos Diz | Daily Affirmations',
        description: 'Explore pesquisa psicológica e evidências científicas por trás das afirmações positivas.',
        keywords: 'psicologia, afirmações, teoria da autoafirmação, reestruturação cognitiva',
    },
    hi: {
        title: 'सकारात्मक पुष्टिकरण का मनोविज्ञान: विज्ञान हमें क्या बताता है | Daily Affirmations',
        description: 'सकारात्मक पुष्टिकरण के पीछे मनोवैज्ञानिक अनुसंधान और वैज्ञानिक साक्ष्य का अन्वेषण करें।',
        keywords: 'मनोविज्ञान, पुष्टिकरण, स्व-पुष्टि सिद्धांत, संज्ञानात्मक पुनर्गठन',
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
            publishedTime: '2024-05-10T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/the-psychology-of-positive-affirmations`,
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

