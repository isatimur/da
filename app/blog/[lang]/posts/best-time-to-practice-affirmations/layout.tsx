import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Best Time to Practice Affirmations: Timing Your Positivity | Daily Affirmations',
        description: 'Discover when and how often to practice affirmations for maximum effectiveness.',
        keywords: 'affirmation timing, best time affirmations, frequency, daily practice',
    },
    ru: {
        title: 'Лучшее время для практики аффирмаций: тайминг позитивности | Daily Affirmations',
        description: 'Когда и как часто практиковать аффирмации для максимальной эффективности.',
        keywords: 'тайминг аффирмаций, лучшее время, частота, ежедневная практика',
    },
    zh: {
        title: '练习肯定语的最佳时间：把握积极时机 | Daily Affirmations',
        description: '何时以及多久练习肯定语以达到最佳效果。',
        keywords: '肯定语时机, 最佳时间, 频率, 每日练习',
    },
    ar: {
        title: 'أفضل وقت لممارسة التأكيدات: توقيت إيجابيتك | Daily Affirmations',
        description: 'اكتشف متى وكم مرة تمارس التأكيدات للحصول على أقصى فعالية.',
        keywords: 'توقيت التأكيدات, أفضل وقت, التكرار, الممارسة اليومية',
    },
    pt: {
        title: 'Melhor Momento para Praticar Afirmações: Cronometrando sua Positividade | Daily Affirmations',
        description: 'Descubra quando e com que frequência praticar afirmações para máxima eficácia.',
        keywords: 'timing afirmações, melhor momento, frequência, prática diária',
    },
    hi: {
        title: 'पुष्टिकरण का अभ्यास करने का सबसे अच्छा समय: अपनी सकारात्मकता को समय देना | Daily Affirmations',
        description: 'अधिकतम प्रभावशीलता के लिए पुष्टिकरण का अभ्यास कब और कितनी बार करना है, यह खोजें।',
        keywords: 'पुष्टिकरण समय, सबसे अच्छा समय, आवृत्ति, दैनिक अभ्यास',
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
            images: ['https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-10-08T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/best-time-to-practice-affirmations`,
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

