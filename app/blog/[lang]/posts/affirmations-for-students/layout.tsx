import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Affirmations for Students: Enhancing Focus and Learning | Daily Affirmations',
        description: 'Powerful affirmations for students to enhance focus, improve learning, and manage exam stress.',
        keywords: 'student affirmations, study affirmations, academic success, exam stress',
    },
    ru: {
        title: 'Аффирмации для студентов: улучшение фокуса и обучения | Daily Affirmations',
        description: 'Сильные аффирмации для студентов: усиление концентрации, улучшение обучения и управление стрессом.',
        keywords: 'аффирмации для студентов, учебные аффирмации, академический успех, экзаменационный стресс',
    },
    zh: {
        title: '学生肯定语：提升专注与学习 | Daily Affirmations',
        description: '专为学生设计的肯定语，提升专注、改善学习、应对考试压力。',
        keywords: '学生肯定语, 学习肯定语, 学术成功, 考试压力',
    },
    ar: {
        title: 'تأكيدات للطلاب: تعزيز التركيز والتعلم | Daily Affirmations',
        description: 'تأكيدات قوية للطلاب لتعزيز التركيز وتحسين التعلم وإدارة ضغط الامتحانات.',
        keywords: 'تأكيدات الطلاب, تأكيدات الدراسة, النجاح الأكاديمي, ضغط الامتحان',
    },
    pt: {
        title: 'Afirmações para Estudantes: Melhorando Foco e Aprendizado | Daily Affirmations',
        description: 'Afirmações para estudantes melhorarem foco, aprendizado e gerenciarem estresse de exames.',
        keywords: 'afirmações estudantes, afirmações estudo, sucesso acadêmico, estresse exames',
    },
    hi: {
        title: 'छात्रों के लिए पुष्टिकरण: फोकस और सीखने को बढ़ाना | Daily Affirmations',
        description: 'छात्रों के लिए फोकस बढ़ाने, सीखने में सुधार और परीक्षा के तनाव को प्रबंधित करने के लिए शक्तिशाली पुष्टिकरण।',
        keywords: 'छात्र पुष्टिकरण, अध्ययन पुष्टिकरण, शैक्षणिक सफलता, परीक्षा तनाव',
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
            images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-07-24T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/affirmations-for-students`,
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

