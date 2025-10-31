import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Affirmations for Overcoming Fear and Self-Doubt | Daily Affirmations',
        description: 'Powerful affirmations to overcome fear, self-doubt, and limiting beliefs.',
        keywords: 'fear affirmations, self-doubt, courage, overcoming fear',
    },
    ru: {
        title: 'Аффирмации для преодоления страха и сомнений | Daily Affirmations',
        description: 'Сильные аффирмации для преодоления страха, сомнений и ограничивающих убеждений.',
        keywords: 'аффирмации страх, самооценка, смелость, преодоление страха',
    },
    zh: {
        title: '克服恐惧和自我怀疑的肯定语 | Daily Affirmations',
        description: '克服恐惧、自我怀疑和限制性信念的肯定语。',
        keywords: '恐惧 肯定语, 自我怀疑, 勇气, 克服恐惧',
    },
    ar: {
        title: 'تأكيدات للتغلب على الخوف والشك الذاتي | Daily Affirmations',
        description: 'تأكيدات قوية للتغلب على الخوف والشك الذاتي والمعتقدات المحدودة.',
        keywords: 'تأكيدات الخوف, الشك الذاتي, الشجاعة, التغلب على الخوف',
    },
    pt: {
        title: 'Afirmações para Superar Medo e Autodúvida | Daily Affirmations',
        description: 'Afirmações poderosas para superar medo, autodúvida e crenças limitantes.',
        keywords: 'afirmações medo, autodúvida, coragem, superar medo',
    },
    hi: {
        title: 'भय और आत्मसंदेह को दूर करने के लिए पुष्टिकरण | Daily Affirmations',
        description: 'भय, आत्मसंदेह और सीमित विश्वासों को दूर करने के लिए शक्तिशाली पुष्टिकरण।',
        keywords: 'भय पुष्टिकरण, आत्मसंदेह, साहस, भय पर काबू',
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
            images: ['https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-04-09T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/affirmations-for-overcoming-fear`,
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

