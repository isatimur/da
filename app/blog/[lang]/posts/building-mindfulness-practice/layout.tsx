import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: '5 Ways to Build a Consistent Mindfulness Practice | Daily Affirmations',
        description: 'Practical tips and strategies to incorporate mindfulness into your daily routine.',
        keywords: 'mindfulness practice, meditation, daily routine, mindfulness tips',
    },
    ru: {
        title: '5 способов построить последовательную практику осознанности | Daily Affirmations',
        description: 'Практические советы и стратегии для включения осознанности в вашу ежедневную рутину.',
        keywords: 'практика осознанности, медитация, ежедневная рутина, советы по осознанности',
    },
    zh: {
        title: '建立持续正念实践的5种方法 | Daily Affirmations',
        description: '将正念融入日常生活的实用技巧和策略。',
        keywords: '正念实践, 冥想, 日常习惯, 正念技巧',
    },
    ar: {
        title: '5 طرق لبناء ممارسة اليقظة المتسقة | Daily Affirmations',
        description: 'نصائح واستراتيجيات عملية لدمج اليقظة في روتينك اليومي.',
        keywords: 'ممارسة اليقظة, التأمل, الروتين اليومي, نصائح اليقظة',
    },
    pt: {
        title: '5 Maneiras de Construir uma Prática Consistente de Atenção Plena | Daily Affirmations',
        description: 'Dicas práticas e estratégias para incorporar atenção plena em sua rotina diária.',
        keywords: 'prática atenção plena, meditação, rotina diária, dicas atenção plena',
    },
    hi: {
        title: 'एक सुसंगत माइंडफुलनेस अभ्यास बनाने के 5 तरीके | Daily Affirmations',
        description: 'अपनी दैनिक दिनचर्या में माइंडफुलनेस को शामिल करने के लिए व्यावहारिक सुझाव और रणनीतियाँ।',
        keywords: 'माइंडफुलनेस अभ्यास, ध्यान, दैनिक दिनचर्या, माइंडफुलनेस सुझाव',
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
            images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-01-20T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/building-mindfulness-practice`,
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

