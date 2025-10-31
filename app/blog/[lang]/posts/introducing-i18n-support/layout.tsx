import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Introducing Multi-Language Support: Daily Affirmations Now Available in 6 Languages | Daily Affirmations',
        description: 'Daily Affirmations Chrome extension now supports English, Russian, Chinese, Arabic, Portuguese, and Hindi. Experience affirmations in your native language.',
        keywords: 'multi-language support, internationalization, i18n, multilingual affirmations, Chrome extension languages, Daily Affirmations languages',
    },
    ru: {
        title: 'Введение поддержки нескольких языков: Daily Affirmations теперь доступно на 6 языках | Daily Affirmations',
        description: 'Расширение Daily Affirmations для Chrome теперь поддерживает английский, русский, китайский, арабский, португальский и хинди. Испытайте аффирмации на вашем родном языке.',
        keywords: 'поддержка нескольких языков, интернационализация, i18n, многоязычные аффирмации, языки расширения Chrome, языки Daily Affirmations',
    },
    zh: {
        title: '引入多语言支持：Daily Affirmations 现提供 6 种语言版本 | Daily Affirmations',
        description: 'Daily Affirmations Chrome 扩展现在支持英语、俄语、中文、阿拉伯语、葡萄牙语和印地语。用您的母语体验肯定语。',
        keywords: '多语言支持, 国际化, i18n, 多语言肯定语, Chrome 扩展语言, Daily Affirmations 语言',
    },
    ar: {
        title: 'إدخال دعم متعدد اللغات: Daily Affirmations متاح الآن بـ 6 لغات | Daily Affirmations',
        description: 'امتداد Daily Affirmations لـ Chrome يدعم الآن الإنجليزية والروسية والصينية والعربية والبرتغالية والهندية. جرب التأكيدات بلغتك الأم.',
        keywords: 'دعم متعدد اللغات, العولمة, i18n, التأكيدات متعددة اللغات, لغات امتداد Chrome, لغات Daily Affirmations',
    },
    pt: {
        title: 'Apresentando Suporte Multilíngue: Daily Affirmations Agora Disponível em 6 Idiomas | Daily Affirmations',
        description: 'A extensão Daily Affirmations do Chrome agora suporta inglês, russo, chinês, árabe, português e hindi. Experimente afirmações no seu idioma nativo.',
        keywords: 'suporte multilíngue, internacionalização, i18n, afirmações multilíngues, idiomas da extensão Chrome, idiomas Daily Affirmations',
    },
    hi: {
        title: 'बहुभाषी समर्थन की शुरुआत: Daily Affirmations अब 6 भाषाओं में उपलब्ध | Daily Affirmations',
        description: 'Daily Affirmations Chrome एक्सटेंशन अब अंग्रेजी, रूसी, चीनी, अरबी, पुर्तगाली और हिंदी का समर्थन करता है। अपनी मूल भाषा में पुष्टिकरण का अनुभव करें।',
        keywords: 'बहुभाषी समर्थन, अंतर्राष्ट्रीयकरण, i18n, बहुभाषी पुष्टिकरण, Chrome एक्सटेंशन भाषाएं, Daily Affirmations भाषाएं',
    },
};

export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const lang = resolvedParams?.lang || 'en';
    const metadata = metadataByLang[lang] || metadataByLang.en;
    
    return {
        ...metadata,
        openGraph: {
            title: metadata.title!,
            description: metadata.description!,
            images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-01-25T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/introducing-i18n-support`,
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

