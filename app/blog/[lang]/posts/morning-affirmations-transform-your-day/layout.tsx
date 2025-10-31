import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Morning Affirmations: Transform Your Day in 5 Minutes | Daily Affirmations',
        description: 'Discover powerful morning affirmation routines that set a positive tone for your entire day. Learn proven techniques and specific affirmations for morning success.',
        keywords: 'morning affirmations, daily affirmations, morning routine, positive affirmations, mindfulness, personal growth, morning ritual, daily practice',
    },
    ru: {
        title: 'Утренние аффирмации: Преобразуйте свой день за 5 минут | Daily Affirmations',
        description: 'Откройте для себя мощные утренние ритуалы аффирмаций, которые задают позитивный тон всему вашему дню. Изучите проверенные техники и конкретные аффирмации для утреннего успеха.',
        keywords: 'утренние аффирмации, ежедневные аффирмации, утренняя рутина, позитивные аффирмации, осознанность, личностный рост, утренний ритуал, ежедневная практика',
    },
    zh: {
        title: '晨间肯定语：5分钟内改变您的一天 | Daily Affirmations',
        description: '发现强大的晨间肯定语例行程序，为您的全天设定积极的基调。学习经过验证的技巧和晨间成功的具体肯定语。',
        keywords: '晨间肯定语, 每日肯定语, 晨间例行程序, 积极肯定语, 正念, 个人成长, 晨间仪式, 日常练习',
    },
    ar: {
        title: 'تأكيدات الصباح: حول يومك في 5 دقائق | Daily Affirmations',
        description: 'اكتشف روتينات تأكيدات الصباح القوية التي تحدد نغمة إيجابية ليومك بالكامل. تعلم التقنيات المجربة والتأكيدات المحددة لنجاح الصباح.',
        keywords: 'تأكيدات الصباح, التأكيدات اليومية, الروتين الصباحي, التأكيدات الإيجابية, اليقظة, النمو الشخصي, الطقوس الصباحية, الممارسة اليومية',
    },
    pt: {
        title: 'Afirmações Matinais: Transforme Seu Dia em 5 Minutos | Daily Affirmations',
        description: 'Descubra rotinas poderosas de afirmações matinais que definem um tom positivo para todo o seu dia. Aprenda técnicas comprovadas e afirmações específicas para o sucesso matinal.',
        keywords: 'afirmações matinais, afirmações diárias, rotina matinal, afirmações positivas, atenção plena, crescimento pessoal, ritual matinal, prática diária',
    },
    hi: {
        title: 'सुबह के पुष्टिकरण: 5 मिनट में अपना दिन बदलें | Daily Affirmations',
        description: 'शक्तिशाली सुबह के पुष्टिकरण दिनचर्या खोजें जो आपके पूरे दिन के लिए सकारात्मक स्वर निर्धारित करते हैं। सिद्ध तकनीक और सुबह की सफलता के लिए विशिष्ट पुष्टिकरण सीखें।',
        keywords: 'सुबह के पुष्टिकरण, दैनिक पुष्टिकरण, सुबह की दिनचर्या, सकारात्मक पुष्टिकरण, माइंडफुलनेस, व्यक्तिगत विकास, सुबह की रस्म, दैनिक अभ्यास',
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
            images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-04-22T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/morning-affirmations-transform-your-day`,
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

