import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: '30 Day Affirmation Challenge: A Complete Guide | Daily Affirmations',
        description: 'A structured 30-day affirmation plan with daily prompts and simple exercises to transform your mindset.',
        keywords: '30 day challenge, affirmations, daily affirmations, mindset, personal growth',
    },
    ru: {
        title: '30-дневный челлендж аффирмаций: полное руководство | Daily Affirmations',
        description: 'Структурированный план на 30 дней с ежедневными аффирмациями и простыми упражнениями.',
        keywords: '30 дней, аффирмации, ежедневные аффирмации, мышление, личностный рост',
    },
    zh: {
        title: '30天肯定语挑战：完整指南 | Daily Affirmations',
        description: '结构化30天肯定语计划，每日提示与简短练习，转变心态。',
        keywords: '30天挑战, 肯定语, 每日肯定语, 心态, 成长',
    },
    ar: {
        title: 'تحدي التأكيدات لمدة 30 يوماً: دليل كامل | Daily Affirmations',
        description: 'خطة مؤكدة لمدة 30 يوماً مع تلميحات يومية وتمارين بسيطة.',
        keywords: '30 يوماً, تأكيدات, يومية, ذهنية, نمو شخصي',
    },
    pt: {
        title: 'Desafio de 30 Dias de Afirmações: Guia Completo | Daily Affirmations',
        description: 'Plano estruturado de 30 dias com afirmações diárias e exercícios simples.',
        keywords: '30 dias, afirmações, diárias, mentalidade, crescimento pessoal',
    },
    hi: {
        title: '30-दिवसीय पुष्टिकरण चैलेंज: संपूर्ण गाइड | Daily Affirmations',
        description: '30 दिनों का संरचित प्लान: दैनिक पुष्टिकरण और सरल अभ्यास।',
        keywords: '30 दिन, पुष्टिकरण, दैनिक, मानसिकता, व्यक्तिगत विकास',
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
            images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-06-18T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/30-day-affirmation-challenge`,
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
