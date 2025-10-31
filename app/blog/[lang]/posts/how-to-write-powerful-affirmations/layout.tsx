import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'How to Write Powerful Daily Affirmations That Actually Work | Daily Affirmations',
        description: 'Learn the proven techniques for crafting effective daily affirmations that create real change. Discover writing strategies, examples, and practices that make affirmations work.',
        keywords: 'daily affirmations, how to write affirmations, positive affirmations, affirmation writing, self-affirmation, personal growth',
    },
    ru: {
        title: 'Как писать эффективные ежедневные аффирмации, которые действительно работают | Daily Affirmations',
        description: 'Проверенные техники написания аффирмаций, которые реально меняют мышление и поведение. Стратегии, примеры и практика.',
        keywords: 'ежедневные аффирмации, как писать аффирмации, позитивные аффирмации, личностный рост',
    },
    zh: {
        title: '如何撰写真正有效的每日肯定语 | Daily Affirmations',
        description: '经过验证的写作技巧，打造有效的每日肯定语。写作策略、示例与实践。',
        keywords: '每日肯定语, 写作肯定语, 积极肯定语, 正念',
    },
    ar: {
        title: 'كيفية كتابة التأكيدات اليومية القوية التي تعمل بالفعل | Daily Affirmations',
        description: 'تقنيات كتابة مثبتة لصياغة التأكيدات الفعالة التي تُحدث تغييراً حقيقياً.',
        keywords: 'تأكيدات يومية, كيفية كتابة التأكيدات, تأكيدات إيجابية',
    },
    pt: {
        title: 'Como Escrever Afirmações Diárias Poderosas que Realmente Funcionam | Daily Affirmations',
        description: 'Técnicas comprovadas para escrever afirmações eficazes que geram mudança real.',
        keywords: 'afirmações diárias, como escrever afirmações, afirmações positivas',
    },
    hi: {
        title: 'शक्तिशाली दैनिक पुष्टिकरण कैसे लिखें जो वास्तव में काम करते हैं | Daily Affirmations',
        description: 'प्रमाणित लेखन तकनीकों से प्रभावी पुष्टिकरण लिखना सीखें।',
        keywords: 'दैनिक पुष्टिकरण, पुष्टिकरण लिखना, सकारात्मक पुष्टिकरण',
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
            images: ['https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-03-15T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/how-to-write-powerful-affirmations`,
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
