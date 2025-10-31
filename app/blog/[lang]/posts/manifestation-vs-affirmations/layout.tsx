import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Manifestation vs. Affirmations: Separating Fact from Fiction | Daily Affirmations',
        description: 'Understand the real differences between manifestation and affirmations and how to use them effectively.',
        keywords: 'manifestation, affirmations, law of attraction, visualization',
    },
    ru: {
        title: 'Манифестация vs аффирмации: отделение фактов от вымысла | Daily Affirmations',
        description: 'Реальные различия между манифестацией и аффирмациями и как эффективно использовать обе.',
        keywords: 'манифестация, аффирмации, закон притяжения, визуализация',
    },
    zh: {
        title: '显化 vs. 肯定语：区分事实与虚构 | Daily Affirmations',
        description: '理解显化与肯定语的真正差异以及如何有效使用它们。',
        keywords: '显化, 肯定语, 吸引力法则, 可视化',
    },
    ar: {
        title: 'التجلي مقابل التأكيدات: فصل الحقائق عن الخيال | Daily Affirmations',
        description: 'افهم الاختلافات الحقيقية بين التجلي والتأكيدات وكيفية استخدامها بفعالية.',
        keywords: 'التجلي, التأكيدات, قانون الجذب, التخيل',
    },
    pt: {
        title: 'Manifestação vs. Afirmações: Separando Fato de Ficção | Daily Affirmations',
        description: 'Entenda as verdadeiras diferenças entre manifestação e afirmações e como usá-las efetivamente.',
        keywords: 'manifestação, afirmações, lei da atração, visualização',
    },
    hi: {
        title: 'मैनिफेस्टेशन बनाम पुष्टिकरण: तथ्य को कल्पना से अलग करना | Daily Affirmations',
        description: 'मैनिफेस्टेशन और पुष्टिकरण के बीच वास्तविक अंतर और उन्हें प्रभावी ढंग से उपयोग करना सीखें।',
        keywords: 'मैनिफेस्टेशन, पुष्टिकरण, आकर्षण का नियम, विज़ुअलाइज़ेशन',
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
            images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-08-13T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/manifestation-vs-affirmations`,
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

