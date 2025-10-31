import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Common Mistakes When Writing Affirmations: What to Avoid | Daily Affirmations',
        description: 'Learn the most common mistakes people make when writing affirmations and how to avoid them.',
        keywords: 'affirmation mistakes, writing affirmations, effective affirmations, affirmation tips',
    },
    ru: {
        title: 'Частые ошибки при написании аффирмаций: чего избегать | Daily Affirmations',
        description: 'Узнайте самые частые ошибки при написании аффирмаций и как их избежать.',
        keywords: 'ошибки аффирмаций, написание аффирмаций, эффективные аффирмации, советы по аффирмациям',
    },
    zh: {
        title: '写肯定语时的常见错误：要避免什么 | Daily Affirmations',
        description: '了解写肯定语时最常见的错误以及如何避免。',
        keywords: '肯定语错误, 写肯定语, 有效肯定语, 肯定语技巧',
    },
    ar: {
        title: 'الأخطاء الشائعة عند كتابة التأكيدات: ما يجب تجنبه | Daily Affirmations',
        description: 'تعلم الأخطاء الأكثر شيوعاً عند كتابة التأكيدات وكيفية تجنبها.',
        keywords: 'أخطاء التأكيدات, كتابة التأكيدات, تأكيدات فعالة, نصائح التأكيدات',
    },
    pt: {
        title: 'Erros Comuns ao Escrever Afirmações: O que Evitar | Daily Affirmations',
        description: 'Aprenda os erros mais comuns ao escrever afirmações e como evitá-los.',
        keywords: 'erros afirmações, escrever afirmações, afirmações eficazes, dicas afirmações',
    },
    hi: {
        title: 'पुष्टिकरण लिखते समय सामान्य गलतियाँ: क्या बचना है | Daily Affirmations',
        description: 'पुष्टिकरण लिखते समय सबसे आम गलतियों और उनसे कैसे बचें, यह सीखें।',
        keywords: 'पुष्टिकरण गलतियाँ, पुष्टिकरण लिखना, प्रभावी पुष्टिकरण, पुष्टिकरण सुझाव',
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
            images: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-02-20T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/common-mistakes-when-writing-affirmations`,
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

