'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/creating-affirmations-that-resonate',
        title: 'Creating Affirmations That Resonate: The Personal Touch',
        description: 'Learn how to create deeply personal affirmations that truly resonate with your values, goals, and authentic self.',
        date: '2025-03-12',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop',
        dateDisplay: 'March 12, 2025',
        h1: 'Creating Affirmations That Resonate: The Personal Touch',
        intro: 'Generic affirmations feel empty. Personal ones that match your values and current reality create lasting change.',
        alt: 'Handwriting in journal representing personal affirmations',
        steps: [
            { h: 'Start with Your Values', p: 'List 3–5 core values (e.g., honesty, growth, connection). Your affirmations should reflect these authentically.' },
            { h: 'Acknowledge Where You Are', p: 'Begin from your current truth, not where you wish to be. "I am learning to trust myself" works better than "I always trust myself" if trust is new.' },
            { h: 'Use Your Own Language', p: 'Write as you speak. If you wouldn\'t say "I am abundant" in real life, use "I have enough for what I need."' },
            { h: 'Make It Action-Oriented', p: 'Link affirmations to small, concrete actions. "I take one step toward my goal each day" beats vague statements.' },
        ],
        tip: 'Save your personalized affirmations in the Daily Affirmations extension. Update them monthly as you grow and your values evolve.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/creating-affirmations-that-resonate',
        title: 'Создание резонирующих аффирмаций: личный подход',
        description: 'Как создавать глубоко личные аффирмации, которые реально резонируют с вашими ценностями, целями и подлинным "я".',
        date: '2025-03-12',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop',
        dateDisplay: '12 марта 2025',
        h1: 'Создание резонирующих аффирмаций: личный подход',
        intro: 'Общие аффирмации кажутся пустыми. Личные, соответствующие вашим ценностям и текущей реальности, создают устойчивые изменения.',
        alt: 'Рукопись в дневнике — символ личных аффирмаций',
        steps: [
            { h: 'Начните с ваших ценностей', p: 'Перечислите 3–5 ключевых ценностей (например, честность, рост, связь). Ваши аффирмации должны их отражать аутентично.' },
            { h: 'Признайте, где вы сейчас', p: 'Начинайте с текущей правды, а не с желаемого. "Я учусь доверять себе" лучше, чем "Я всегда доверяю себе", если доверие ново.' },
            { h: 'Используйте свой язык', p: 'Пишите так, как говорите. Если вы не сказали бы "Я изобилен(а)" в реальной жизни, используйте "У меня достаточно для того, что мне нужно."' },
            { h: 'Свяжите с действием', p: 'Привяжите аффирмации к небольшим конкретным действиям. "Я делаю один шаг к своей цели каждый день" лучше расплывчатых формулировок.' },
        ],
        tip: 'Сохраните персонализированные аффирмации в расширении Daily Affirmations. Обновляйте их ежемесячно по мере роста и эволюции ценностей.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/creating-affirmations-that-resonate',
        title: '创建产生共鸣的肯定语：个人化方法',
        description: '学习如何创建真正与你的价值观、目标和真实自我产生共鸣的深度个人化肯定语。',
        date: '2025-03-12',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop',
        dateDisplay: '2025年3月12日',
        h1: '创建产生共鸣的肯定语：个人化方法',
        intro: '通用肯定语感觉空洞。与你的价值观和当前现实匹配的个人化肯定语能带来持久改变。',
        alt: '日记手写，代表个人肯定语',
        steps: [
            { h: '从你的价值观开始', p: '列出3–5个核心价值观（如诚实、成长、连接）。你的肯定语应真实地反映它们。' },
            { h: '承认你的现状', p: '从当前的真实开始，而非你希望的理想状态。若信任是新课题，"我在学习信任自己"比"我总是信任自己"更有效。' },
            { h: '使用你自己的语言', p: '用你说话的方式写。若你平时不会说"我富足"，用"我拥有所需的一切"更合适。' },
            { h: '让它与行动相关', p: '将肯定语与小的具体行动链接。"我每天朝着目标迈一步"比模糊表述更有力。' },
        ],
        tip: '在 Daily Affirmations 扩展中保存你的个性化肯定语。随成长和价值观变化，每月更新。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/creating-affirmations-that-resonate',
        title: 'إنشاء التأكيدات التي تتردد صداها: اللمسة الشخصية',
        description: 'تعلم كيفية إنشاء تأكيدات شخصية عميقة تتردد صدى حقاً مع قيمك وأهدافك وذاتك الأصيلة.',
        date: '2025-03-12',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop',
        dateDisplay: '12 مارس 2025',
        h1: 'إنشاء التأكيدات التي تتردد صداها: اللمسة الشخصية',
        intro: 'التأكيدات العامة تبدو فارغة. الشخصية المطابقة لقيمك وواقعك الحالي تُحدث تحولات دائمة.',
        alt: 'كتابة يدوية في دفتر ترمز للتأكيدات الشخصية',
        steps: [
            { h: 'ابدأ بقيمك', p: 'اذكر 3–5 قيماً أساسية (مثل الصدق، النمو، الاتصال). يجب أن تعكس تأكيداتك هذه بصدق.' },
            { h: 'اعترف بمكانك الحالي', p: 'ابدأ من حقيقتك الحالية، لا من حيث تتمنى. "أنا أتعلم الثقة بنفسي" أفضل من "أنا دائماً أثق بنفسي" إذا كانت الثقة جديدة.' },
            { h: 'استخدم لغتك الخاصة', p: 'اكتب كما تتحدث. إذا لم تقل "أنا غني" في الحياة الواقعية، استخدم "لدي ما يكفي لما أحتاجه."' },
            { h: 'اجعله موجهاً للفعل', p: 'اربط التأكيدات بإجراءات صغيرة ملموسة. "أتخذ خطوة واحدة نحو هدفي كل يوم" أفضل من العبارات الفضفاضة.' },
        ],
        tip: 'احفظ تأكيداتك المخصصة في الامتداد. حدّثها شهرياً مع نموك وتطور قيمك.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/creating-affirmations-that-resonate',
        title: 'Criando Afirmações que Ressonam: O Toque Pessoal',
        description: 'Aprenda como criar afirmações profundamente pessoais que realmente ressoam com seus valores, objetivos e autenticidade.',
        date: '2025-03-12',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop',
        dateDisplay: '12 de março de 2025',
        h1: 'Criando Afirmações que Ressonam: O Toque Pessoal',
        intro: 'Afirmações genéricas parecem vazias. Pessoais que correspondem aos seus valores e realidade atual criam mudanças duradouras.',
        alt: 'Escrita à mão em diário representando afirmações pessoais',
        steps: [
            { h: 'Comece com Seus Valores', p: 'Liste 3–5 valores centrais (ex.: honestidade, crescimento, conexão). Suas afirmações devem refletir isso autenticamente.' },
            { h: 'Reconheça Onde Você Está', p: 'Comece de sua verdade atual, não de onde deseja estar. "Estou aprendendo a confiar em mim" funciona melhor que "Sempre confio em mim" se a confiança é nova.' },
            { h: 'Use Sua Própria Linguagem', p: 'Escreva como você fala. Se não diria "Sou abundante" na vida real, use "Tenho o suficiente para o que preciso."' },
            { h: 'Torne Orientado à Ação', p: 'Ligue afirmações a ações pequenas e concretas. "Dou um passo em direção ao meu objetivo cada dia" supera declarações vagas.' },
        ],
        tip: 'Salve suas afirmações personalizadas na extensão Daily Affirmations. Atualize-as mensalmente conforme você cresce e seus valores evoluem.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/creating-affirmations-that-resonate',
        title: 'प्रतिध्वनित पुष्टिकरण बनाना: व्यक्तिगत स्पर्श',
        description: 'गहरे व्यक्तिगत पुष्टिकरण बनाना सीखें जो वास्तव में आपके मूल्यों, लक्ष्यों और प्रामाणिक स्व के साथ प्रतिध्वनित होते हैं।',
        date: '2025-03-12',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop',
        dateDisplay: '12 मार्च 2025',
        h1: 'प्रतिध्वनित पुष्टिकरण बनाना: व्यक्तिगत स्पर्श',
        intro: 'सामान्य पुष्टिकरण खाली लगते हैं। आपके मूल्यों और वर्तमान वास्तविकता से मेल खाने वाले व्यक्तिगत पुष्टिकरण स्थायी बदलाव बनाते हैं।',
        alt: 'डायरी में हस्तलेख — व्यक्तिगत पुष्टिकरण का प्रतीक',
        steps: [
            { h: 'अपने मूल्यों से शुरू करें', p: '3–5 मूल मूल्य सूचीबद्ध करें (जैसे ईमानदारी, विकास, जुड़ाव)। आपके पुष्टिकरण इन्हें प्रामाणिक रूप से दर्शाते हों।' },
            { h: 'जहाँ हैं वहाँ स्वीकार करें', p: 'वर्तमान सच्चाई से शुरू करें, इच्छित स्थान से नहीं। अगर विश्वास नया है, तो "मैं खुद पर भरोसा करना सीख रहा/रही हूँ" "मैं हमेशा खुद पर भरोसा करता/करती हूँ" से बेहतर काम करता है।' },
            { h: 'अपनी भाषा का उपयोग करें', p: 'जैसा बोलते हैं वैसा लिखें। अगर आप वास्तविक जीवन में "मैं समृद्ध हूँ" नहीं कहेंगे, तो "मेरे पास ज़रूरी चीज़ों के लिए पर्याप्त है" उपयोग करें।' },
            { h: 'इसे कार्रवाई-उन्मुख बनाएं', p: 'पुष्टिकरण को छोटे, ठोस कार्यों से जोड़ें। "मैं हर दिन अपने लक्ष्य की ओर एक कदम उठाता/उठाती हूँ" अस्पष्ट कथनों से बेहतर है।' },
        ],
        tip: 'Daily Affirmations एक्सटेंशन में अपने व्यक्तिगत पुष्टिकरण सहेजें। जैसे-जैसे आप बढ़ते हैं और आपके मूल्य विकसित होते हैं, हर महीने अपडेट करें।'
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
                        {t.steps.map((s: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{s.h}</h2>
                                <p>{s.p}</p>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">✨ {lang === 'ru' ? 'Персонализация' : lang === 'zh' ? '个性化' : lang === 'ar' ? 'التخصيص' : lang === 'pt' ? 'Personalização' : lang === 'hi' ? 'व्यक्तिगतकरण' : 'Personalization'}</h3>
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

