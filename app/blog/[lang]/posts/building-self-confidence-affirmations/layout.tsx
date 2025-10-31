import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Building Self-Confidence Through Daily Affirmations | Daily Affirmations',
        description: 'Confidence-focused affirmations and practice steps to build steady self-belief.',
        keywords: 'self confidence affirmations, self belief, confidence practice',
    },
    ru: {
        title: 'Построение уверенности с помощью ежедневных аффирмаций | Daily Affirmations',
        description: 'Аффирмации и шаги практики для устойчивой веры в себя.',
        keywords: 'уверенность аффирмации, вера в себя, практика уверенности',
    },
    zh: {
        title: '通过每日肯定语建立自信 | Daily Affirmations',
        description: '以自信为核心的肯定语与练习步骤，稳步建立自信。',
        keywords: '自信 肯定语, 自我信念, 自信练习',
    },
    ar: {
        title: 'بناء الثقة بالنفس عبر التأكيدات اليومية | Daily Affirmations',
        description: 'تأكيدات وخطوات عملية لبناء ثقة راسخة.',
        keywords: 'تأكيدات الثقة بالنفس, الإيمان بالذات, ممارسة الثقة',
    },
    pt: {
        title: 'Construindo Autoconfiança com Afirmações Diárias | Daily Affirmations',
        description: 'Afirmações e passos práticos para uma autoconfiança constante.',
        keywords: 'afirmações confiança, autoconfiança, prática de confiança',
    },
    hi: {
        title: 'दैनिक पुष्टिकरण से आत्मविश्वास बनाना | Daily Affirmations',
        description: 'स्थिर आत्म-विश्वास के लिए पुष्टिकरण और व्यावहारिक कदम।',
        keywords: 'आत्मविश्वास पुष्टिकरण, आत्म-विश्वास, आत्मविश्वास अभ्यास',
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
            images: ['https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-10-11T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/building-self-confidence-affirmations`,
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
