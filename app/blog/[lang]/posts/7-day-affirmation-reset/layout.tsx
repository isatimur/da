import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'The 7-Day Affirmation Reset: Your Quick Start Guide | Daily Affirmations',
        description: 'Jumpstart your affirmation practice with this comprehensive 7-day program to transform your mindset.',
        keywords: '7 day challenge, affirmation reset, quick start, affirmation program',
    },
    ru: {
        title: '7-дневный сброс аффирмаций: ваше руководство по быстрому старту | Daily Affirmations',
        description: 'Запустите свою практику аффирмаций с помощью этой комплексной 7-дневной программы.',
        keywords: '7 дней челлендж, сброс аффирмаций, быстрый старт, программа аффирмаций',
    },
    zh: {
        title: '7天肯定语重置：快速入门指南 | Daily Affirmations',
        description: '通过这个全面的7天计划快速启动你的肯定语练习，转变你的思维方式。',
        keywords: '7天挑战, 肯定语重置, 快速开始, 肯定语计划',
    },
    ar: {
        title: 'إعادة تعيين التأكيدات لمدة 7 أيام: دليل البدء السريع | Daily Affirmations',
        description: 'ابدأ ممارسة التأكيدات مع هذا البرنامج الشامل لمدة 7 أيام.',
        keywords: 'تحدي 7 أيام, إعادة تعيين التأكيدات, البدء السريع, برنامج التأكيدات',
    },
    pt: {
        title: 'O Reset de Afirmações de 7 Dias: Seu Guia de Início Rápido | Daily Affirmations',
        description: 'Inicie sua prática de afirmações com este programa abrangente de 7 dias.',
        keywords: 'desafio 7 dias, reset afirmações, início rápido, programa afirmações',
    },
    hi: {
        title: '7-दिवसीय पुष्टिकरण रीसेट: आपका त्वरित स्टार्ट गाइड | Daily Affirmations',
        description: 'इस व्यापक 7-दिवसीय कार्यक्रम के साथ अपने पुष्टिकरण अभ्यास को शुरू करें।',
        keywords: '7 दिन चुनौती, पुष्टिकरण रीसेट, त्वरित स्टार्ट, पुष्टिकरण कार्यक्रम',
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
            images: ['https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-05-21T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/7-day-affirmation-reset`,
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

