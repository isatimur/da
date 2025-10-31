import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Affirmations for Mothers: Self-Care Through Positive Thinking | Daily Affirmations',
        description: 'Powerful affirmations for mothers to promote self-care, reduce guilt, and maintain balance.',
        keywords: 'mother affirmations, mom self-care, parenting affirmations, motherhood',
    },
    ru: {
        title: 'Аффирмации для матерей: самозабота через позитивное мышление | Daily Affirmations',
        description: 'Сильные аффирмации для матерей, способствующие самозаботе, снижению вины и балансу.',
        keywords: 'аффирмации для матерей, самозабота мамы, родительские аффирмации, материнство',
    },
    zh: {
        title: '给母亲的肯定语：通过积极思维实现自我关怀 | Daily Affirmations',
        description: '专为母亲设计的肯定语，促进自我关怀、减少内疚并保持平衡。',
        keywords: '母亲肯定语, 妈妈自我关怀, 育儿肯定语, 母性',
    },
    ar: {
        title: 'تأكيدات للأمهات: الرعاية الذاتية من خلال التفكير الإيجابي | Daily Affirmations',
        description: 'تأكيدات قوية للأمهات لتعزيز الرعاية الذاتية وتقليل الذنب والحفاظ على التوازن.',
        keywords: 'تأكيدات الأمهات, رعاية الأم الذاتية, تأكيدات الأبوة, الأمومة',
    },
    pt: {
        title: 'Afirmações para Mães: Autocuidado Através do Pensamento Positivo | Daily Affirmations',
        description: 'Afirmações poderosas para mães promoverem autocuidado, reduzirem culpa e manterem equilíbrio.',
        keywords: 'afirmações mães, autocuidado mãe, afirmações parentalidade, maternidade',
    },
    hi: {
        title: 'माताओं के लिए पुष्टिकरण: सकारात्मक सोच के माध्यम से स्व-देखभाल | Daily Affirmations',
        description: 'माताओं के लिए शक्तिशाली पुष्टिकरण: स्व-देखभाल को बढ़ावा, अपराध कम करना और संतुलन बनाए रखना।',
        keywords: 'माँ पुष्टिकरण, माँ स्व-देखभाल, पालन-पोषण पुष्टिकरण, मातृत्व',
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
            images: ['https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-09-19T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/affirmations-for-mothers`,
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

