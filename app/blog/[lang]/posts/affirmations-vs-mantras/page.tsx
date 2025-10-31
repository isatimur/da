'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/affirmations-vs-mantras',
        title: "Affirmations vs. Mantras: What's the Difference?",
        description: 'Understand when to use affirmations or mantras, how they work differently, and how to pick the right practice.',
        date: '2024-09-05',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop',
        dateDisplay: 'September 5, 2024',
        h1: "Affirmations vs. Mantras: What's the Difference?",
        intro: 'Affirmations shape conscious beliefs; mantras shape attention through sound. Both help—use them intentionally.',
        alt: 'Meditative scene contrasting words and sound',
        parts: [
            { h: 'Purpose', rows: [['Affirmations', 'Reprogram beliefs and behavior'], ['Mantras', 'Stabilize attention and access deeper calm']] },
            { h: 'Language', rows: [['Affirmations', 'Native language, clear meaning'], ['Mantras', 'Sacred syllables; sound over meaning']] },
            { h: 'Flexibility', rows: [['Affirmations', 'Personal, adjustable'], ['Mantras', 'Traditional, kept consistent']] },
            { h: 'Practice', rows: [['Affirmations', 'Write and repeat with feeling'], ['Mantras', 'Chant or repeat silently with breath']] },
        ],
        tip: 'Not either/or. Use affirmations for specific goals; use mantras to calm the mind before practice.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/affirmations-vs-mantras',
        title: 'Аффирмации vs мантры: в чём разница?',
        description: 'Когда использовать аффирмации или мантры, как они работают по‑разному и как выбрать практику.',
        date: '2024-09-05',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop',
        dateDisplay: '5 сентября 2024',
        h1: 'Аффирмации vs мантры: в чём разница?',
        intro: 'Аффирмации меняют сознательные убеждения; мантры — внимание через звук. Обе помогают — используйте осознанно.',
        alt: 'Медитативная сцена — контраст слова и звука',
        parts: [
            { h: 'Назначение', rows: [['Аффирмации', 'Перепрошивка убеждений и поведения'], ['Мантры', 'Стабилизация внимания, доступ к спокойствию']] },
            { h: 'Язык', rows: [['Аффирмации', 'Родной язык, ясный смысл'], ['Мантры', 'Священные слоги; важнее звук']] },
            { h: 'Гибкость', rows: [['Аффирмации', 'Персональные, изменяемые'], ['Мантры', 'Традиционные, сохраняются неизменно']] },
            { h: 'Практика', rows: [['Аффирмации', 'Писать и проговаривать с чувством'], ['Мантры', 'Петь/повторять с дыханием']] },
        ],
        tip: 'Это не «или/или». Для целей — аффирмации; для тишины ума — мантры перед практикой.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/affirmations-vs-mantras',
        title: '肯定语 vs. 咒语：有什么不同？',
        description: '何时使用肯定语或咒语、它们的差异，以及如何选择合适的练习。',
        date: '2024-09-05',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop',
        dateDisplay: '2024年9月5日',
        h1: '肯定语 vs. 咒语：有什么不同？',
        intro: '肯定语调整信念；咒语以声音稳心。两者皆有益，关键在于有意使用。',
        alt: '冥想场景，文字与声音的对比',
        parts: [
            { h: '目的', rows: [['肯定语', '重塑信念与行为'], ['咒语', '稳定注意并进入深层平静']] },
            { h: '语言', rows: [['肯定语', '母语、意义清晰'], ['咒语', '神圣音节，重音不重义']] },
            { h: '灵活性', rows: [['肯定语', '个性化、可调整'], ['咒语', '传统固定、保持一致']] },
            { h: '方法', rows: [['肯定语', '书写并带情感重复'], ['咒语', '随呼吸吟唱/默念']] },
        ],
        tip: '不是非此即彼。目标具体用肯定语；平静心绪用咒语作为前奏。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/affirmations-vs-mantras',
        title: 'التأكيدات مقابل التعاويذ: ما الفرق؟',
        description: 'متى نستخدم التأكيدات أو التعاويذ وكيف تعملان بشكل مختلف وكيف تختار الممارسة المناسبة.',
        date: '2024-09-05',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop',
        dateDisplay: '5 سبتمبر 2024',
        h1: 'التأكيدات مقابل التعاويذ: ما الفرق؟',
        intro: 'التأكيدات تصوغ المعتقدات الواعية؛ التعاويذ تضبط الانتباه بالصوت. كلاهما مفيد — استخدمهما بوعي.',
        alt: 'مشهد تأملي يبرز التباين بين الكلمة والصوت',
        parts: [
            { h: 'الغرض', rows: [['التأكيدات', 'إعادة تشكيل المعتقدات والسلوك'], ['التعاويذ', 'تثبيت الانتباه وبلوغ سكينة أعمق']] },
            { h: 'اللغة', rows: [['التأكيدات', 'لغة مفهومة ومعنى واضح'], ['التعاويذ', 'مقاطع مقدسة؛ أهمية للصوت أكثر من المعنى']] },
            { h: 'المرونة', rows: [['التأكيدات', 'شخصية وقابلة للتعديل'], ['التعاويذ', 'تقليدية وتحافظ على الثبات']] },
            { h: 'الطريقة', rows: [['التأكيدات', 'تُكتب وتُكرر بإحساس'], ['التعاويذ', 'تُرتّل/تُكرر مع التنفس']] },
        ],
        tip: 'ليست مفاضلة. استخدم التأكيدات للأهداف المحددة، والتعاويذ لتهدئة العقل قبل الممارسة.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/affirmations-vs-mantras',
        title: 'Afirmações vs. Mantras: Qual a Diferença?',
        description: 'Quando usar afirmações ou mantras, como funcionam diferente e como escolher a prática certa.',
        date: '2024-09-05',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop',
        dateDisplay: '5 de setembro de 2024',
        h1: 'Afirmações vs. Mantras: Qual a Diferença?',
        intro: 'Afirmações moldam crenças conscientes; mantras moldam a atenção pelo som. Ambos ajudam — use com intenção.',
        alt: 'Cenário meditativo contrastando palavra e som',
        parts: [
            { h: 'Propósito', rows: [['Afirmações', 'Reprogramar crenças e comportamentos'], ['Mantras', 'Estabilizar a atenção e acessar calma profunda']] },
            { h: 'Linguagem', rows: [['Afirmações', 'Idioma nativo, significado claro'], ['Mantras', 'Sons sagrados; o som importa mais que o significado']] },
            { h: 'Flexibilidade', rows: [['Afirmações', 'Pessoais e ajustáveis'], ['Mantras', 'Tradicionais e consistentes']] },
            { h: 'Prática', rows: [['Afirmações', 'Escrever e repetir com emoção'], ['Mantras', 'Entoar ou repetir em silêncio com a respiração']] },
        ],
        tip: 'Não é “ou/ou”. Use afirmações para metas; mantras para acalmar a mente antes da prática.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/affirmations-vs-mantras',
        title: 'पुष्टिकरण बनाम मंत्र: अंतर क्या है?',
        description: 'कब पुष्टिकरण या मंत्र का उपयोग करें, वे कैसे भिन्न काम करते हैं और सही अभ्यास कैसे चुनें।',
        date: '2024-09-05',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop',
        dateDisplay: '5 सितम्बर 2024',
        h1: 'पुष्टिकरण बनाम मंत्र: अंतर क्या है?',
        intro: 'पुष्टिकरण सचेत मान्यताएँ गढ़ते हैं; मंत्र ध्वनि से ध्यान स्थिर करते हैं। दोनों उपयोगी हैं—उद्देश्यपूर्ण उपयोग करें।',
        alt: 'ध्यान दृश्य — शब्द और ध्वनि का अंतर',
        parts: [
            { h: 'उद्देश्य', rows: [['पुष्टिकरण', 'मान्यताएँ और व्यवहार पुनर्गढ़ना'], ['मंत्र', 'ध्यान स्थिर करना, गहरी शांति तक पहुँचना']] },
            { h: 'भाषा', rows: [['पुष्टिकरण', 'मातृभाषा, स्पष्ट अर्थ'], ['मंत्र', 'पवित्र ध्वनियाँ; अर्थ से अधिक ध्वनि'] ] },
            { h: 'लचीलापन', rows: [['पुष्टिकरण', 'व्यक्तिगत, समायोज्य'], ['मंत्र', 'पारंपरिक, सुसंगत'] ] },
            { h: 'अभ्यास', rows: [['पुष्टिकरण', 'लिखें और भावनाओं के साथ दोहराएँ'], ['मंत्र', 'श्वास के साथ जप/मौन जप'] ] },
        ],
        tip: 'यह “या/या” नहीं है। लक्ष्यों के लिए पुष्टिकरण; मन शांत करने को अभ्यास से पहले मंत्र।'
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
                        {t.parts.map((p: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{p.h}</h2>
                                <div className="overflow-auto">
                                    <table className="w-full text-left border-collapse">
                                        <tbody>
                                            {p.rows.map((row: [string, string], j: number) => (
                                                <tr key={j} className="border-b border-neutral-800">
                                                    <td className="py-2 pr-4 font-semibold text-neutral-200">{row[0]}</td>
                                                    <td className="py-2 text-neutral-300">{row[1]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🧭 {lang === 'ru' ? 'Как выбрать' : lang === 'zh' ? '如何选择' : lang === 'ar' ? 'كيفية الاختيار' : lang === 'pt' ? 'Como escolher' : lang === 'hi' ? 'कैसे चुनें' : 'How to choose'}</h3>
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
