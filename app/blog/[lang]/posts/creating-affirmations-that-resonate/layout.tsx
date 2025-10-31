import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Creating Affirmations That Resonate: The Personal Touch | Daily Affirmations',
        description: 'Learn how to create deeply personal affirmations that truly resonate with your values and goals.',
        keywords: 'personal affirmations, custom affirmations, writing affirmations, authentic affirmations',
    },
    ru: {
        title: 'Создание резонирующих аффирмаций: личный подход | Daily Affirmations',
        description: 'Как создавать глубоко личные аффирмации, которые реально резонируют с вашими ценностями и целями.',
        keywords: 'личные аффирмации, кастомные аффирмации, написание аффирмаций, аутентичные аффирмации',
    },
    zh: {
        title: '创建产生共鸣的肯定语：个人化方法 | Daily Affirmations',
        description: '学习如何创建真正与你的价值观和目标产生共鸣的深度个人化肯定语。',
        keywords: '个人肯定语, 自定义肯定语, 写肯定语, 真实肯定语',
    },
    ar: {
        title: 'إنشاء التأكيدات التي تتردد صداها: اللمسة الشخصية | Daily Affirmations',
        description: 'تعلم كيفية إنشاء تأكيدات شخصية عميقة تتردد صدى حقاً مع قيمك وأهدافك.',
        keywords: 'تأكيدات شخصية, تأكيدات مخصصة, كتابة التأكيدات, تأكيدات أصيلة',
    },
    pt: {
        title: 'Criando Afirmações que Ressonam: O Toque Pessoal | Daily Affirmations',
        description: 'Aprenda como criar afirmações profundamente pessoais que realmente ressoam com seus valores e objetivos.',
        keywords: 'afirmações pessoais, afirmações personalizadas, escrever afirmações, afirmações autênticas',
    },
    hi: {
        title: 'प्रतिध्वनित पुष्टिकरण बनाना: व्यक्तिगत स्पर्श | Daily Affirmations',
        description: 'गहरे व्यक्तिगत पुष्टिकरण बनाना सीखें जो वास्तव में आपके मूल्यों और लक्ष्यों के साथ प्रतिध्वनित होते हैं।',
        keywords: 'व्यक्तिगत पुष्टिकरण, कस्टम पुष्टिकरण, पुष्टिकरण लिखना, प्रामाणिक पुष्टिकरण',
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
            images: ['https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-03-12T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/creating-affirmations-that-resonate`,
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

