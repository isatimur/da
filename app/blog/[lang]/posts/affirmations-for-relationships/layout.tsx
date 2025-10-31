import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Affirmations for Relationships: Strengthening Connections | Daily Affirmations',
        description: 'Powerful affirmations to strengthen relationships and improve communication.',
        keywords: 'relationship affirmations, communication, connection, love',
    },
    ru: {
        title: 'Аффирмации для отношений: укрепление связей | Daily Affirmations',
        description: 'Сильные аффирмации для укрепления отношений и улучшения коммуникации.',
        keywords: 'аффирмации отношения, коммуникация, связь, любовь',
    },
    zh: {
        title: '关系肯定语：加强连接 | Daily Affirmations',
        description: '用于加强关系和改善沟通的肯定语。',
        keywords: '关系 肯定语, 沟通, 连接, 爱',
    },
    ar: {
        title: 'تأكيدات للعلاقات: تقوية الروابط | Daily Affirmations',
        description: 'تأكيدات قوية لتقوية العلاقات وتحسين التواصل.',
        keywords: 'تأكيدات العلاقات, التواصل, الاتصال, الحب',
    },
    pt: {
        title: 'Afirmações para Relacionamentos: Fortalecendo Conexões | Daily Affirmations',
        description: 'Afirmações poderosas para fortalecer relacionamentos e melhorar comunicação.',
        keywords: 'afirmações relacionamentos, comunicação, conexão, amor',
    },
    hi: {
        title: 'रिश्तों के लिए पुष्टिकरण: कनेक्शन को मजबूत करना | Daily Affirmations',
        description: 'रिश्तों को मजबूत करने और संचार सुधारने के लिए शक्तिशाली पुष्टिकरण।',
        keywords: 'रिश्ते पुष्टिकरण, संचार, कनेक्शन, प्रेम',
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
            images: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-01-14T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/affirmations-for-relationships`,
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

