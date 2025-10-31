import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Affirmations for Athletes: Mental Training for Peak Performance | Daily Affirmations',
        description: 'Powerful affirmations for athletes to enhance performance and build confidence.',
        keywords: 'athlete affirmations, sports psychology, mental training, peak performance',
    },
    ru: {
        title: 'Аффирмации для спортсменов: ментальная подготовка для пика | Daily Affirmations',
        description: 'Сильные аффирмации для спортсменов: улучшение производительности и укрепление уверенности.',
        keywords: 'аффирмации спортсмены, спортивная психология, ментальная подготовка, пиковая производительность',
    },
    zh: {
        title: '运动员肯定语：巅峰表现的心理训练 | Daily Affirmations',
        description: '专为运动员设计的肯定语，提升表现并建立信心。',
        keywords: '运动员肯定语, 运动心理学, 心理训练, 巅峰表现',
    },
    ar: {
        title: 'تأكيدات للرياضيين: التدريب العقلي للأداء القمة | Daily Affirmations',
        description: 'تأكيدات قوية للرياضيين لتعزيز الأداء وبناء الثقة.',
        keywords: 'تأكيدات الرياضيين, علم النفس الرياضي, التدريب العقلي, الأداء القمة',
    },
    pt: {
        title: 'Afirmações para Atletas: Treinamento Mental para Desempenho de Pico | Daily Affirmations',
        description: 'Afirmações poderosas para atletas melhorarem desempenho e construírem confiança.',
        keywords: 'afirmações atletas, psicologia esportiva, treinamento mental, desempenho de pico',
    },
    hi: {
        title: 'एथलीटों के लिए पुष्टिकरण: शीर्ष प्रदर्शन के लिए मानसिक प्रशिक्षण | Daily Affirmations',
        description: 'एथलीटों के लिए प्रदर्शन बढ़ाने और आत्मविश्वास बनाने के लिए शक्तिशाली पुष्टिकरण।',
        keywords: 'एथलीट पुष्टिकरण, खेल मनोविज्ञान, मानसिक प्रशिक्षण, शीर्ष प्रदर्शन',
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
            images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-06-17T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/affirmations-for-athletes`,
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

