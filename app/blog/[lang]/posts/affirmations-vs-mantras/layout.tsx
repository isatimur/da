import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: "Affirmations vs. Mantras: What's the Difference? | Daily Affirmations",
        description: 'Understand when to use affirmations or mantras and how they differ.',
        keywords: 'affirmations vs mantras, mantras meaning, affirmations meaning, meditation',
    },
    ru: {
        title: 'Аффирмации vs мантры: в чём разница? | Daily Affirmations',
        description: 'Когда использовать аффирмации или мантры и чем они отличаются.',
        keywords: 'аффирмации мантры разница, медитация, осознанность',
    },
    zh: {
        title: '肯定语 vs. 咒语：有什么不同？ | Daily Affirmations',
        description: '何时用肯定语或咒语及其差异。',
        keywords: '肯定语 咒语 区别, 冥想, 正念',
    },
    ar: {
        title: 'التأكيدات مقابل التعاويذ: ما الفرق؟ | Daily Affirmations',
        description: 'متى نستخدم التأكيدات أو التعاويذ وكيف يختلفان.',
        keywords: 'التأكيدات, التعاويذ, الفرق, التأمل',
    },
    pt: {
        title: 'Afirmações vs. Mantras: Qual a Diferença? | Daily Affirmations',
        description: 'Quando usar afirmações ou mantras e como diferem.',
        keywords: 'afirmações vs mantras, meditação, atenção plena',
    },
    hi: {
        title: 'पुष्टिकरण बनाम मंत्र: अंतर क्या है? | Daily Affirmations',
        description: 'कब पुष्टिकरण या मंत्र का उपयोग करें और उनका अंतर।',
        keywords: 'पुष्टिकरण मंत्र अंतर, ध्यान, माइंडफुलनेस',
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
            images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-09-05T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/affirmations-vs-mantras`,
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
