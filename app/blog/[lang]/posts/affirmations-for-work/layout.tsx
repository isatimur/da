import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Affirmations for Work: Boosting Professional Success | Daily Affirmations',
        description: 'Work affirmations for confidence, productivity, leadership, and balance. Practical phrases and usage tips.',
        keywords: 'work affirmations, productivity, leadership, confidence, career',
    },
    ru: {
        title: 'Аффирмации для работы: путь к профессиональному успеху | Daily Affirmations',
        description: 'Аффирмации для уверенности, продуктивности, лидерства и баланса. Практичные формулировки и советы.',
        keywords: 'аффирмации для работы, продуктивность, лидерство, уверенность, карьера',
    },
    zh: {
        title: '工作肯定语：提升职业成功 | Daily Affirmations',
        description: '用于自信、效率、领导力与平衡的工作肯定语与使用建议。',
        keywords: '工作肯定语, 生产力, 领导力, 自信, 职业',
    },
    ar: {
        title: 'تأكيدات للعمل: تعزيز النجاح المهني | Daily Affirmations',
        description: 'تأكيدات للعمل للثقة والإنتاجية والقيادة والتوازن.',
        keywords: 'تأكيدات العمل, الإنتاجية, القيادة, الثقة, المسيرة المهنية',
    },
    pt: {
        title: 'Afirmações para o Trabalho: Impulsionando o Sucesso Profissional | Daily Affirmations',
        description: 'Afirmações para confiança, produtividade, liderança e equilíbrio no trabalho.',
        keywords: 'afirmações de trabalho, produtividade, liderança, confiança, carreira',
    },
    hi: {
        title: 'काम के लिए पुष्टिकरण: पेशेवर सफलता | Daily Affirmations',
        description: 'कार्यस्थल पर आत्मविश्वास, उत्पादकता, नेतृत्व और संतुलन के लिए पुष्टिकरण।',
        keywords: 'कार्य पुष्टिकरण, उत्पादकता, नेतृत्व, आत्मविश्वास, करियर',
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
            images: ['https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-11-08T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/affirmations-for-work`,
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
