import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: "Daily Affirmations - Transform Your New Tab with Mindful Inspiration",
        description: "Enhance your daily browsing with personalized affirmations, beautiful backgrounds, and mindful moments. A Chrome extension for daily inspiration, personal growth, and mental well-being.",
        keywords: ["daily affirmations", "chrome extension", "personal growth", "mindfulness", "new tab", "productivity", "mental health", "positive thinking", "self improvement", "meditation", "daily inspiration"],
    },
    ru: {
        title: "Daily Affirmations - Преобразуйте новую вкладку с осознанным вдохновением",
        description: "Улучшите ежедневный просмотр с персонализированными аффирмациями, красивыми фонами и осознанными моментами. Расширение Chrome для ежедневного вдохновения, личностного роста и ментального благополучия.",
        keywords: ["ежедневные аффирмации", "расширение chrome", "личностный рост", "осознанность", "новая вкладка", "продуктивность", "ментальное здоровье", "позитивное мышление", "саморазвитие", "медитация", "ежедневное вдохновение"],
    },
    zh: {
        title: "Daily Affirmations - 用正念灵感转变你的新标签页",
        description: "通过个性化肯定语、精美背景和正念时刻增强你的每日浏览体验。Chrome 扩展，提供每日灵感、个人成长和心理健康。",
        keywords: ["每日肯定语", "chrome扩展", "个人成长", "正念", "新标签页", "生产力", "心理健康", "积极思考", "自我提升", "冥想", "每日灵感"],
    },
    ar: {
        title: "Daily Affirmations - حوّل لسان التبويب الجديد بإلهام يقظ",
        description: "عزز تصفحك اليومي بتأكيدات مخصصة وخلفيات جميلة ولحظات يقظة. امتداد Chrome للإلهام اليومي والنمو الشخصي والرفاه العقلي.",
        keywords: ["التأكيدات اليومية", "امتداد chrome", "النمو الشخصي", "اليقظة", "لسان تبويب جديد", "الإنتاجية", "الصحة العقلية", "التفكير الإيجابي", "تحسين الذات", "التأمل", "الإلهام اليومي"],
    },
    pt: {
        title: "Daily Affirmations - Transforme Sua Nova Aba com Inspiração Consciente",
        description: "Aprimore sua navegação diária com afirmações personalizadas, belos fundos e momentos de atenção plena. Uma extensão Chrome para inspiração diária, crescimento pessoal e bem-estar mental.",
        keywords: ["afirmações diárias", "extensão chrome", "crescimento pessoal", "atenção plena", "nova aba", "produtividade", "saúde mental", "pensamento positivo", "auto melhoria", "meditação", "inspiração diária"],
    },
    hi: {
        title: "Daily Affirmations - माइंडफुल प्रेरणा के साथ अपना नया टैब बदलें",
        description: "व्यक्तिगत पुष्टिकरण, सुंदर पृष्ठभूमि और माइंडफुल क्षणों के साथ अपने दैनिक ब्राउज़िंग को बढ़ाएं। दैनिक प्रेरणा, व्यक्तिगत विकास और मानसिक कल्याण के लिए Chrome एक्सटेंशन।",
        keywords: ["दैनिक पुष्टिकरण", "chrome एक्सटेंशन", "व्यक्तिगत विकास", "माइंडफुलनेस", "नया टैब", "उत्पादकता", "मानसिक स्वास्थ्य", "सकारात्मक सोच", "स्व-सुधार", "ध्यान", "दैनिक प्रेरणा"],
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
            images: ["/og-image.png"],
            type: "website",
            url: `https://daily-affirmation.today/${lang === 'en' ? '' : lang}`,
            siteName: "Daily Affirmations",
        },
        twitter: {
            card: "summary_large_image",
            title: m.title!,
            description: m.description!,
            images: ["/og-image.png"],
            site: "@DailyAffirm",
            creator: "@DailyAffirm"
        },
        alternates: {
            canonical: `https://daily-affirmation.today/${lang === 'en' ? '' : lang}`,
        },
    };
}

export default async function LangLayout({
    children,
    params: _params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang?: string }>;
}) {
    return children;
}

