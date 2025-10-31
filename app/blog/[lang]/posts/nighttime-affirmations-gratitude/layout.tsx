import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Nighttime Affirmations: Ending Your Day with Gratitude | Daily Affirmations',
        description: 'Evening affirmations to release tension, reflect with gratitude, and prepare for restful sleep.',
        keywords: 'night affirmations, gratitude, sleep, evening routine',
    },
    ru: {
        title: 'Вечерние аффирмации: завершайте день с благодарностью | Daily Affirmations',
        description: 'Вечерние аффирмации для отпускания напряжения и настроя на спокойный сон.',
        keywords: 'вечерние аффирмации, благодарность, сон, вечерний ритуал',
    },
    zh: {
        title: '夜间肯定语：以感恩结束一天 | Daily Affirmations',
        description: '通过晚间肯定语释放紧张、心怀感恩并准备安稳睡眠。',
        keywords: '夜间肯定语, 感恩, 睡眠, 晚间习惯',
    },
    ar: {
        title: 'تأكيدات المساء: إنهاء يومك بالامتنان | Daily Affirmations',
        description: 'تأكيدات مسائية لإطلاق التوتر والامتنان والاستعداد لنوم مريح.',
        keywords: 'تأكيدات المساء, امتنان, نوم, روتين مسائي',
    },
    pt: {
        title: 'Afirmações Noturnas: Terminando o Dia com Gratidão | Daily Affirmations',
        description: 'Afirmações da noite para liberar tensão e preparar um sono reparador.',
        keywords: 'afirmações noturnas, gratidão, sono, rotina noturna',
    },
    hi: {
        title: 'रात्रि पुष्टिकरण: कृतज्ञता के साथ दिन का समापन | Daily Affirmations',
        description: 'शाम के पुष्टिकरण: तनाव छोड़ें और आरामदायक नींद की तैयारी करें।',
        keywords: 'रात्रि पुष्टिकरण, कृतज्ञता, नींद, शाम की दिनचर्या',
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
            images: ['https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-08-14T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/nighttime-affirmations-gratitude`,
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
