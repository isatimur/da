'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/personal-affirmation-library',
        title: 'Creating Your Personal Affirmation Library',
        description: 'Write powerful, personal affirmations and organize them for daily use. Categories, tags, and simple routines.',
        date: '2024-01-18',
        category: 'Guides',
        image: '/blog/affirmation-library.jpg',
        dateDisplay: 'January 18, 2024',
        h1: 'Creating Your Personal Affirmation Library',
        intro: 'A tidy, personal set beats a long random list. Start small, refine weekly, keep what resonates.',
        alt: 'Personal affirmation library journal on a desk',
        sections: [
            { h: 'Write What You Can Believe', p: 'Start from a believable stretch. Add emotion and present tense. E.g., “I speak clearly and calmly under pressure.”' },
            { h: 'Organize to Use', p: 'Use 4–6 categories (Work, Health, Relationships, Growth). Add a few tags for quick filtering.' },
            { h: 'Keep It Fresh', p: 'Review weekly. Archive what became true; promote what still matters.' },
        ],
        tip: 'Use the Daily Affirmations extension to rotate selected sets by time of day.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/personal-affirmation-library',
        title: 'Создание личной библиотеки аффирмаций',
        description: 'Пишите мощные личные аффирмации и организуйте их для ежедневного применения. Категории, теги и простые рутины.',
        date: '2024-01-18',
        category: 'Руководства',
        image: '/blog/affirmation-library.jpg',
        dateDisplay: '18 января 2024',
        h1: 'Создание личной библиотеки аффирмаций',
        intro: 'Аккуратный персональный набор лучше длинного случайного списка. Начните с малого, обновляйте раз в неделю, оставляйте то, что действительно резонирует.',
        alt: 'Дневник с аффирмациями на столе',
        sections: [
            { h: 'Пишите то, во что верите', p: 'Начинайте с правдоподобного шага. Эмоции и настоящее время. Например: «Я говорю ясно и спокойно под давлением».' },
            { h: 'Организуйте для использования', p: '4–6 категорий (Работа, Здоровье, Отношения, Рост). Несколько тегов для быстрого фильтра.' },
            { h: 'Держите актуальность', p: 'Еженедельный обзор. Архивируйте то, что стало истиной; поднимайте то, что важно сейчас.' },
        ],
        tip: 'Используйте расширение Daily Affirmations для ротации наборов по времени суток.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/personal-affirmation-library',
        title: '创建您的个人肯定语库',
        description: '撰写有力、个性的肯定语，并为日常使用进行组织。分类、标签与简单例行。',
        date: '2024-01-18',
        category: '指南',
        image: '/blog/affirmation-library.jpg',
        dateDisplay: '2024年1月18日',
        h1: '创建您的个人肯定语库',
        intro: '精炼、个性化的集合优于冗长随机列表。从小开始，按周优化，保留“有感觉”的内容。',
        alt: '书桌上的个人肯定语笔记本',
        sections: [
            { h: '写你能相信的', p: '从可信的进阶开始。加入情感与现在时。例如：“我在压力下也能清晰平静地表达。”' },
            { h: '为使用而组织', p: '4–6 类（工作、健康、关系、成长）。再加少量标签方便筛选。' },
            { h: '保持新鲜', p: '每周回顾。已成现实的归档；重要的提升优先级。' },
        ],
        tip: '用 Daily Affirmations 扩展按时段轮换你选择的集合。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/personal-affirmation-library',
        title: 'إنشاء مكتبتك الشخصية من التأكيدات',
        description: 'اكتب تأكيدات شخصية قوية ونظمها للاستخدام اليومي. فئات وعلامات وروتين بسيط.',
        date: '2024-01-18',
        category: 'أدلة',
        image: '/blog/affirmation-library.jpg',
        dateDisplay: '18 يناير 2024',
        h1: 'إنشاء مكتبتك الشخصية من التأكيدات',
        intro: 'مجموعة شخصية مرتبة أفضل من قائمة طويلة عشوائية. ابدأ صغيراً، حدّث أسبوعياً، واحتفظ بما يلامسك.',
        alt: 'دفتر تأكيدات على مكتب',
        sections: [
            { h: 'اكتب ما تصدّقه', p: 'ابدأ بخطوة قابلة للتصديق. أضف العاطفة والزمن الحاضر. مثال: “أتحدث بوضوح وهدوء تحت الضغط.”' },
            { h: 'نظّم للاستخدام', p: '4–6 فئات (العمل، الصحة، العلاقات، النمو). علامات قليلة للتصفية السريعة.' },
            { h: 'حافظ على الحداثة', p: 'مراجعة أسبوعية. أرشِف ما أصبح واقعاً؛ وقدّم ما يهم الآن.' },
        ],
        tip: 'استخدم امتداد Daily Affirmations لتدوير المجموعات حسب وقت اليوم.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/personal-affirmation-library',
        title: 'Criando Sua Biblioteca Pessoal de Afirmações',
        description: 'Escreva afirmações pessoais poderosas e organize-as para uso diário. Categorias, tags e rotinas simples.',
        date: '2024-01-18',
        category: 'Guias',
        image: '/blog/affirmation-library.jpg',
        dateDisplay: '18 de janeiro de 2024',
        h1: 'Criando Sua Biblioteca Pessoal de Afirmações',
        intro: 'Um conjunto pessoal e enxuto supera uma lista longa e aleatória. Comece pequeno, refine semanalmente e mantenha o que ressoa.',
        alt: 'Caderno de afirmações pessoais sobre a mesa',
        sections: [
            { h: 'Escreva o que você acredita', p: 'Comece com um passo crível. Adicione emoção e presente. Ex.: “Falo com clareza e calma sob pressão.”' },
            { h: 'Organize para usar', p: '4–6 categorias (Trabalho, Saúde, Relações, Crescimento). Poucas tags para filtragem rápida.' },
            { h: 'Mantenha atual', p: 'Revisão semanal. Arquive o que virou realidade; priorize o que importa agora.' },
        ],
        tip: 'Use a extensão Daily Affirmations para alternar conjuntos por horário do dia.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/personal-affirmation-library',
        title: 'अपनी व्यक्तिगत पुष्टिकरण लाइब्रेरी बनाना',
        description: 'शक्तिशाली, व्यक्तिगत पुष्टिकरण लिखें और उन्हें दैनिक उपयोग के लिए व्यवस्थित करें। श्रेणियाँ, टैग और सरल रूटीन।',
        date: '2024-01-18',
        category: 'गाइड',
        image: '/blog/affirmation-library.jpg',
        dateDisplay: '18 जनवरी 2024',
        h1: 'अपनी व्यक्तिगत पुष्टिकरण लाइब्रेरी बनाना',
        intro: 'सुसंगठित व्यक्तिगत सेट एक लंबी यादृच्छिक सूची से बेहतर है। छोटा शुरू करें, साप्ताहिक सुधारें, और वही रखें जो वास्तव में प्रतिध्वनित होता है।',
        alt: 'टेबल पर व्यक्तिगत पुष्टिकरण जर्नल',
        sections: [
            { h: 'वही लिखें जिस पर विश्वास हो', p: 'विश्वसनीय स्ट्रेच से शुरू करें। भावना और वर्तमान काल जोड़ें। उदाहरण: “मैं दबाव में भी स्पष्ट और शांत बोलता/बोलती हूँ।”' },
            { h: 'उपयोग के लिए व्यवस्थित करें', p: '4–6 श्रेणियाँ (काम, स्वास्थ्य, रिश्ते, विकास)। तेज़ फ़िल्टर के लिए कुछ टैग।' },
            { h: 'इसे ताज़ा रखें', p: 'साप्ताहिक समीक्षा करें। जो सच हो गया उसे आर्काइव करें; जो आवश्यक है उसे ऊपर लाएँ।' },
        ],
        tip: 'Daily Affirmations एक्सटेंशन से समय के अनुसार चयनित सेट रोटेट करें।'
    }
};

export default function BlogPost() {
    const params = useParams();
    const lang = (params?.lang as string) || 'en';
    const t = (content as any)[lang] || content.en;

    return (
        <>
            <BlogJsonLd
                url={t.url}
                title={t.title}
                description={t.description}
                date={t.date}
                image={t.image}
                category={t.category}
            />
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 pt-24">
                <article className="container mx-auto px-4 max-w-4xl">
                    <header className="mb-8">
                        <time dateTime={t.date} className="text-sm text-neutral-400 mb-2">
                            {t.dateDisplay}
                        </time>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            {t.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            {t.h1}
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            {t.intro}
                        </p>
                        <SocialShare url={t.url} title={t.title} description={t.description} />
                    </header>

                    <figure className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={t.image}
                            alt={t.alt}
                            fill
                            className="object-cover"
                            priority
                        />
                    </figure>

                    <div className="prose prose-invert max-w-none">
                        {t.sections.map((s: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{s.h}</h2>
                                <p>{s.p}</p>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">📚 {lang === 'ru' ? 'Практика' : lang === 'zh' ? '实操' : lang === 'ar' ? 'تطبيق' : lang === 'pt' ? 'Prática' : lang === 'hi' ? 'अभ्यास' : 'Practice'}</h3>
                            <p>{t.tip}</p>
                        </div>
                    </div>

                    <footer className="mt-16">
                        <div className="border-t border-neutral-800 pt-16">
                            <NewsletterSignup />
                        </div>
                        <div className="mt-8 pt-8 border-t border-neutral-800">
                            <SocialShare url={t.url} title={t.title} description={t.description} />
                        </div>
                    </footer>
                </article>
            </main>
        </>
    );
}
