import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Affirmations for Creatives: Unlocking Your Artistic Potential | Daily Affirmations',
        description: 'Powerful affirmations for artists, writers, musicians, and creatives to overcome creative blocks and build confidence.',
        keywords: 'creative affirmations, artist affirmations, writer affirmations, creative blocks',
    },
    ru: {
        title: 'Аффирмации для творческих людей: раскрытие художественного потенциала | Daily Affirmations',
        description: 'Сильные аффирмации для художников, писателей, музыкантов и творческих людей: преодоление блоков и укрепление уверенности.',
        keywords: 'творческие аффирмации, аффирмации для художников, аффирмации для писателей, творческие блоки',
    },
    zh: {
        title: '给创作者的肯定语：释放你的艺术潜能 | Daily Affirmations',
        description: '专为艺术家、作家、音乐家和创作者设计的肯定语，克服创作障碍并建立信心。',
        keywords: '创作肯定语, 艺术家肯定语, 作家肯定语, 创作阻碍',
    },
    ar: {
        title: 'تأكيدات للمبدعين: إطلاق إمكاناتك الفنية | Daily Affirmations',
        description: 'تأكيدات قوية للفنانين والكتاب والموسيقيين والمبدعين للتغلب على العقبات الإبداعية وبناء الثقة.',
        keywords: 'تأكيدات إبداعية, تأكيدات الفنانين, تأكيدات الكتّاب, العقبات الإبداعية',
    },
    pt: {
        title: 'Afirmações para Criativos: Desbloqueando seu Potencial Artístico | Daily Affirmations',
        description: 'Afirmações para artistas, escritores, músicos e criativos superarem bloqueios criativos e construírem confiança.',
        keywords: 'afirmações criativas, afirmações artistas, afirmações escritores, bloqueios criativos',
    },
    hi: {
        title: 'रचनात्मक लोगों के लिए पुष्टिकरण: अपनी कलात्मक क्षमता को अनलॉक करना | Daily Affirmations',
        description: 'रचनात्मक ब्लॉकों को दूर करने और कलात्मक आत्मविश्वास बनाने के लिए कलाकारों, लेखकों, संगीतकारों और रचनात्मक लोगों के लिए शक्तिशाली पुष्टिकरण।',
        keywords: 'रचनात्मक पुष्टिकरण, कलाकार पुष्टिकरण, लेखक पुष्टिकरण, रचनात्मक ब्लॉक',
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
            images: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-11-05T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/affirmations-for-creatives`,
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

