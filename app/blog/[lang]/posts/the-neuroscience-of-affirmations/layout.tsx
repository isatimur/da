import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'The Neuroscience of Affirmations: How They Rewire Your Brain | Daily Affirmations',
        description: 'Explore the neuroscience behind affirmations and discover how they physically rewire your brain.',
        keywords: 'neuroscience, affirmations, neuroplasticity, brain rewiring',
    },
    ru: {
        title: 'Нейронаука аффирмаций: как они перепрограммируют мозг | Daily Affirmations',
        description: 'Изучите нейронауку, стоящую за аффирмациями, и узнайте, как они физически меняют мозг.',
        keywords: 'нейронаука, аффирмации, нейропластичность, перепрограммирование мозга',
    },
    zh: {
        title: '肯定语的神经科学：它们如何重塑大脑 | Daily Affirmations',
        description: '探索肯定语背后的神经科学，了解它们如何物理重塑大脑。',
        keywords: '神经科学, 肯定语, 神经可塑性, 大脑重塑',
    },
    ar: {
        title: 'علم الأعصاب للتأكيدات: كيف تعيد توصيل دماغك | Daily Affirmations',
        description: 'استكشف علم الأعصاب وراء التأكيدات واكتشف كيف تعيد توصيل دماغك جسدياً.',
        keywords: 'علم الأعصاب, التأكيدات, اللدونة العصبية, إعادة توصيل الدماغ',
    },
    pt: {
        title: 'A Neurociência das Afirmações: Como Elas Reconfiguram seu Cérebro | Daily Affirmations',
        description: 'Explore a neurociência por trás das afirmações e descubra como elas reconfiguram seu cérebro fisicamente.',
        keywords: 'neurociência, afirmações, neuroplasticidade, reconfiguração cerebral',
    },
    hi: {
        title: 'पुष्टिकरण का न्यूरोसाइंस: वे आपके मस्तिष्क को कैसे फिर से जोड़ते हैं | Daily Affirmations',
        description: 'पुष्टिकरण के पीछे न्यूरोसाइंस का अन्वेषण करें और जानें कि वे शारीरिक रूप से मस्तिष्क को कैसे फिर से जोड़ते हैं।',
        keywords: 'न्यूरोसाइंस, पुष्टिकरण, न्यूरोप्लास्टिसिटी, मस्तिष्क पुनःसंयोजन',
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
            images: ['https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2025-02-18T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/the-neuroscience-of-affirmations`,
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

