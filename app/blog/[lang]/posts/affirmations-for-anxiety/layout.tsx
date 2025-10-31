import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Affirmations for Anxiety: Calming Your Mind with Words | Daily Affirmations',
        description: 'Science-backed affirmations to soothe anxiety and regain steadiness.',
        keywords: 'anxiety affirmations, calm, breathing, mental health',
    },
    ru: {
        title: 'Аффирмации от тревоги: успокоение разума словами | Daily Affirmations',
        description: 'Научно обоснованные аффирмации для успокоения тревоги и устойчивости.',
        keywords: 'аффирмации тревога, спокойствие, дыхание, психическое здоровье',
    },
    zh: {
        title: '焦虑肯定语：用言语安抚内心 | Daily Affirmations',
        description: '经科学支持的肯定语，舒缓焦虑，恢复稳定。',
        keywords: '焦虑 肯定语, 平静, 呼吸, 心理健康',
    },
    ar: {
        title: 'تأكيدات للقلق: تهدئة العقل بالكلمات | Daily Affirmations',
        description: 'تأكيدات مدعومة علمياً لتهدئة القلق واستعادة الثبات.',
        keywords: 'تأكيدات القلق, الهدوء, التنفس, الصحة العقلية',
    },
    pt: {
        title: 'Afirmações para Ansiedade: Acalmando a Mente | Daily Affirmations',
        description: 'Afirmações com base científica para acalmar a ansiedade e estabilizar.',
        keywords: 'afirmações ansiedade, calma, respiração, saúde mental',
    },
    hi: {
        title: 'चिंता के लिए पुष्टिकरण: शब्दों से शांति | Daily Affirmations',
        description: 'वैज्ञानिक आधार वाले पुष्टिकरण जो चिंता शांत कर स्थिरता लौटाएँ।',
        keywords: 'चिंता पुष्टिकरण, शांति, श्वास, मानसिक स्वास्थ्य',
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
            images: ['https://images.unsplash.com/photo-1505483531331-8640e66c4a52?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-07-25T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/affirmations-for-anxiety`,
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
