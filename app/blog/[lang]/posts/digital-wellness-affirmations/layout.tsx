import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Digital Wellness: Using Technology for Positive Mindset | Daily Affirmations',
        description: 'Mindful tech habits with affirmations. Reduce noise, keep focus, and use tools that support well-being.',
        keywords: 'digital wellness, mindfulness, technology, focus, notifications',
    },
    ru: {
        title: 'Цифровое благополучие: технологии для позитивного мышления | Daily Affirmations',
        description: 'Осознанные цифровые привычки и аффирмации: меньше шума, больше фокуса и поддержка благополучия.',
        keywords: 'цифровое благополучие, осознанность, технологии, фокус, уведомления',
    },
    zh: {
        title: '数字健康：用技术支持积极心态 | Daily Affirmations',
        description: '结合肯定语的正念用机习惯。减少噪音、保持专注、选择支持幸福感的工具。',
        keywords: '数字健康, 正念, 科技, 专注, 通知',
    },
    ar: {
        title: 'العافية الرقمية: استخدام التكنولوجيا لعقلية إيجابية | Daily Affirmations',
        description: 'عادات تقنية واعية مع التأكيدات. قلل الضوضاء، حافظ على التركيز، واستخدم أدوات تدعم الرفاهية.',
        keywords: 'العافية الرقمية, اليقظة, التكنولوجيا, التركيز, الإشعارات',
    },
    pt: {
        title: 'Bem-estar Digital: Usando Tecnologia para uma Mente Positiva | Daily Affirmations',
        description: 'Hábitos tecnológicos conscientes com afirmações: menos ruído, mais foco e ferramentas para o bem-estar.',
        keywords: 'bem-estar digital, atenção plena, tecnologia, foco, notificações',
    },
    hi: {
        title: 'डिजिटल वेलनेस: सकारात्मक मानसिकता के लिए तकनीक | Daily Affirmations',
        description: 'पुष्टिकरण के साथ सचेत डिजिटल आदतें: कम शोर, अधिक फोकस और कल्याण समर्थक उपकरण।',
        keywords: 'डिजिटल वेलनेस, माइंडफुलनेस, तकनीक, फोकस, नोटिफिकेशन',
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
            images: ['https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2026-01-15T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/digital-wellness-affirmations`,
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
