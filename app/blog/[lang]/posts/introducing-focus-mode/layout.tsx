import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Introducing Focus Mode: Your Gateway to Mindful Moments | Daily Affirmations',
        description: 'Transform your new tab into a serene sanctuary with Focus Mode. Remove distractions and create a perfect environment for mindfulness.',
        keywords: 'focus mode, mindfulness, distraction-free, browser extension',
    },
    ru: {
        title: 'Режим концентрации: Ваш путь к осознанным моментам | Daily Affirmations',
        description: 'Превратите новую вкладку в безмятежное убежище с Режимом концентрации. Убирает отвлечения и создаёт идеальную среду для осознанности.',
        keywords: 'режим концентрации, осознанность, без отвлечений, расширение браузера',
    },
    zh: {
        title: '专注模式：通往正念时刻的大门 | Daily Affirmations',
        description: '用专注模式将新标签页转变为宁静的圣地。移除干扰，为正念创造完美环境。',
        keywords: '专注模式, 正念, 无干扰, 浏览器扩展',
    },
    ar: {
        title: 'وضع التركيز: بوابتك إلى لحظات اليقظة | Daily Affirmations',
        description: 'حوّل لسان التبويب الجديد إلى ملاذ هادئ مع وضع التركيز. يزيل الانحرافات وينشئ بيئة مثالية لليقظة.',
        keywords: 'وضع التركيز, اليقظة, خالي من الانحرافات, امتداد المتصفح',
    },
    pt: {
        title: 'Modo Foco: Sua Porta de Entrada para Momentos de Atenção Plena | Daily Affirmations',
        description: 'Transforme sua nova aba em um santuário sereno com o Modo Foco. Remove distrações e cria ambiente perfeito para atenção plena.',
        keywords: 'modo foco, atenção plena, sem distrações, extensão navegador',
    },
    hi: {
        title: 'फोकस मोड: माइंडफुल क्षणों के लिए आपका प्रवेश द्वार | Daily Affirmations',
        description: 'फोकस मोड के साथ अपने नए टैब को शांत आश्रम में बदलें। विचलन हटाता है और माइंडफुलनेस के लिए आदर्श वातावरण बनाता है।',
        keywords: 'फोकस मोड, माइंडफुलनेस, विचलन-मुक्त, ब्राउज़र एक्सटेंशन',
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
            images: ['https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-01-23T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/introducing-focus-mode`,
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

