import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Creating Your Personal Affirmation Library | Daily Affirmations',
        description: 'Write powerful, personal affirmations and organize them for daily use.',
        keywords: 'affirmation library, personal affirmations, organization, tags, categories',
    },
    ru: {
        title: 'Создание личной библиотеки аффирмаций | Daily Affirmations',
        description: 'Пишите мощные личные аффирмации и организуйте их для ежедневного применения.',
        keywords: 'библиотека аффирмаций, личные аффирмации, организация, теги, категории',
    },
    zh: {
        title: '创建您的个人肯定语库 | Daily Affirmations',
        description: '撰写强大的个人肯定语并进行日常组织使用。',
        keywords: '肯定语库, 个人肯定语, 组织, 标签, 分类',
    },
    ar: {
        title: 'إنشاء مكتبتك الشخصية من التأكيدات | Daily Affirmations',
        description: 'اكتب تأكيدات شخصية قوية ونظمها للاستخدام اليومي.',
        keywords: 'مكتبة التأكيدات, التأكيدات الشخصية, التنظيم, العلامات, الفئات',
    },
    pt: {
        title: 'Criando Sua Biblioteca Pessoal de Afirmações | Daily Affirmations',
        description: 'Escreva afirmações pessoais poderosas e organize-as para uso diário.',
        keywords: 'biblioteca de afirmações, afirmações pessoais, organização, tags, categorias',
    },
    hi: {
        title: 'अपनी व्यक्तिगत पुष्टिकरण लाइब्रेरी बनाना | Daily Affirmations',
        description: 'शक्तिशाली, व्यक्तिगत पुष्टिकरण लिखें और उन्हें दैनिक उपयोग के लिए व्यवस्थित करें।',
        keywords: 'पुष्टिकरण लाइब्रेरी, व्यक्तिगत पुष्टिकरण, संगठन, टैग, श्रेणियाँ',
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
            images: ['/blog/affirmation-library.jpg'],
            type: 'article',
            publishedTime: '2024-01-18T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/personal-affirmation-library`,
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
