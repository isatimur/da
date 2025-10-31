import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'The Science Behind Daily Affirmations | Daily Affirmations',
        description: 'Psychology and neuroscience of affirmations: mechanisms and practical application.',
        keywords: 'affirmations science, neuroscience, psychology, neuroplasticity',
    },
    ru: {
        title: 'Наука за ежедневными аффирмациями | Daily Affirmations',
        description: 'Психология и нейронаука аффирмаций: механизмы и практическое применение.',
        keywords: 'наука аффирмаций, нейронаука, психология, нейропластичность',
    },
    zh: {
        title: '每日肯定语的科学 | Daily Affirmations',
        description: '肯定语的心理与神经科学基础及其实践。',
        keywords: '肯定语 科学, 神经科学, 心理学, 神经可塑性',
    },
    ar: {
        title: 'العلم وراء التأكيدات اليومية | Daily Affirmations',
        description: 'أسس نفسية وعصبية للتأكيدات وكيفية تطبيقها عملياً.',
        keywords: 'علم التأكيدات, علم الأعصاب, علم النفس, اللدونة العصبية',
    },
    pt: {
        title: 'A Ciência por Trás das Afirmações Diárias | Daily Affirmations',
        description: 'Psicologia e neurociência das afirmações e sua aplicação prática.',
        keywords: 'ciência das afirmações, neurociência, psicologia, neuroplasticidade',
    },
    hi: {
        title: 'दैनिक पुष्टिकरण के पीछे का विज्ञान | Daily Affirmations',
        description: 'पुष्टिकरण का मनोवैज्ञानिक और न्यूरोसाइंटिफिक आधार और व्यावहारिक उपयोग।',
        keywords: 'पुष्टिकरण विज्ञान, न्यूरोसाइंस, मनोविज्ञान, न्यूरोप्लास्टिसिटी',
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
            images: ['https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-01-22T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/science-of-daily-affirmations`,
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
