'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/manifestation-vs-affirmations',
        title: 'Manifestation vs. Affirmations: Separating Fact from Fiction',
        description: 'Understand the real differences between manifestation and affirmations. Learn what science says about each practice and how to use them effectively together.',
        date: '2025-08-13',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: 'August 13, 2025',
        h1: 'Manifestation vs. Affirmations: Separating Fact from Fiction',
        intro: 'Both practices aim to shift mindset, but they work differently. Understanding the distinction helps you use each more effectively.',
        alt: 'Abstract visualization of thought and intention',
        comparison: [
            { aspect: 'Focus', affirmations: 'Behavioral change and belief reinforcement', manifestation: 'Attracting specific outcomes through intention' },
            { aspect: 'Mechanism', affirmations: 'Cognitive restructuring and habit formation', manifestation: 'Visualization and energy alignment' },
            { aspect: 'Timeframe', affirmations: 'Gradual, measurable shifts over weeks/months', manifestation: 'Outcome-focused, variable timeline' },
            { aspect: 'Evidence Base', affirmations: 'Strong research in psychology and neuroscience', manifestation: 'Mixed evidence, some anecdotal success' },
        ],
        tip: 'Use affirmations for daily mindset work and behavior change. Add manifestation techniques (visualization, goal-setting) for specific outcomes. The Daily Affirmations extension supports both approaches.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/manifestation-vs-affirmations',
        title: 'Манифестация vs аффирмации: отделение фактов от вымысла',
        description: 'Реальные различия между манифестацией и аффирмациями. Что говорит наука и как эффективно использовать обе практики.',
        date: '2025-08-13',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: '13 августа 2025',
        h1: 'Манифестация vs аффирмации: отделение фактов от вымысла',
        intro: 'Обе практики меняют мышление, но работают по-разному. Понимание различий помогает эффективнее использовать каждую.',
        alt: 'Абстрактная визуализация мысли и намерения',
        comparison: [
            { aspect: 'Фокус', affirmations: 'Изменение поведения и укрепление убеждений', manifestation: 'Привлечение конкретных результатов через намерение' },
            { aspect: 'Механизм', affirmations: 'Когнитивная реструктуризация и формирование привычек', manifestation: 'Визуализация и выравнивание энергии' },
            { aspect: 'Временные рамки', affirmations: 'Постепенные измеримые сдвиги за недели/месяцы', manifestation: 'Ориентировано на результат, переменный срок' },
            { aspect: 'Доказательная база', affirmations: 'Сильная база в психологии и нейронауке', manifestation: 'Смешанные данные, некоторые анекдотические успехи' },
        ],
        tip: 'Используйте аффирмации для ежедневной работы с мышлением и изменения поведения. Добавьте техники манифестации (визуализация, постановка целей) для конкретных результатов. Расширение Daily Affirmations поддерживает оба подхода.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/manifestation-vs-affirmations',
        title: '显化 vs. 肯定语：区分事实与虚构',
        description: '理解显化与肯定语的真正差异。了解科学对每种实践的看法以及如何有效结合使用。',
        date: '2025-08-13',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: '2025年8月13日',
        h1: '显化 vs. 肯定语：区分事实与虚构',
        intro: '两种实践都旨在改变心态，但运作方式不同。理解差异有助于更有效地使用每种方法。',
        alt: '思想与意图的抽象可视化',
        comparison: [
            { aspect: '焦点', affirmations: '行为改变与信念强化', manifestation: '通过意图吸引特定结果' },
            { aspect: '机制', affirmations: '认知重构与习惯养成', manifestation: '可视化与能量对齐' },
            { aspect: '时间框架', affirmations: '数周/数月内的渐进、可衡量转变', manifestation: '以结果为导向，时间线可变' },
            { aspect: '证据基础', affirmations: '心理学与神经科学的强研究基础', manifestation: '证据混杂，部分经验性成功' },
        ],
        tip: '将肯定语用于日常心态与行为改变。为特定结果添加显化技巧（可视化、目标设定）。Daily Affirmations 扩展支持这两种方法。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/manifestation-vs-affirmations',
        title: 'التجلي مقابل التأكيدات: فصل الحقائق عن الخيال',
        description: 'افهم الاختلافات الحقيقية بين التجلي والتأكيدات. تعلم ما يقوله العلم عن كل ممارسة وكيفية استخدامها معاً.',
        date: '2025-08-13',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: '13 أغسطس 2025',
        h1: 'التجلي مقابل التأكيدات: فصل الحقائق عن الخيال',
        intro: 'كلتا الممارستين تهدفان لتحويل الذهنية، لكنهما تعملان بشكل مختلف. فهم الفرق يساعد على استخدام كل منهما بفعالية أكبر.',
        alt: 'تصوير مجرد للفكر والنية',
        comparison: [
            { aspect: 'التركيز', affirmations: 'تغيير السلوك وتعزيز المعتقدات', manifestation: 'جذب نتائج محددة عبر النية' },
            { aspect: 'الآلية', affirmations: 'إعادة هيكلة المعرف وتكوين العادات', manifestation: 'التخيل ومحاذاة الطاقة' },
            { aspect: 'الإطار الزمني', affirmations: 'تحولات تدريجية قابلة للقياس على مدى أسابيع/أشهر', manifestation: 'مركز على النتائج، جدول زمني متغير' },
            { aspect: 'الأساس الأدبي', affirmations: 'بحث قوي في علم النفس والأعصاب', manifestation: 'أدلة مختلطة، بعض النجاحات القصصية' },
        ],
        tip: 'استخدم التأكيدات للعمل اليومي مع الذهنية وتغيير السلوك. أضف تقنيات التجلي (التخيل، تحديد الأهداف) للنتائج المحددة. الامتداد يدعم كلا النهجين.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/manifestation-vs-affirmations',
        title: 'Manifestação vs. Afirmações: Separando Fato de Ficção',
        description: 'Entenda as verdadeiras diferenças entre manifestação e afirmações. Aprenda o que a ciência diz sobre cada prática.',
        date: '2025-08-13',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: '13 de agosto de 2025',
        h1: 'Manifestação vs. Afirmações: Separando Fato de Ficção',
        intro: 'Ambas as práticas visam mudar mentalidade, mas funcionam de forma diferente. Entender a distinção ajuda a usar cada uma com mais eficácia.',
        alt: 'Visualização abstrata de pensamento e intenção',
        comparison: [
            { aspect: 'Foco', affirmations: 'Mudança comportamental e reforço de crenças', manifestation: 'Atrair resultados específicos através da intenção' },
            { aspect: 'Mecanismo', affirmations: 'Reestruturação cognitiva e formação de hábitos', manifestation: 'Visualização e alinhamento de energia' },
            { aspect: 'Prazo', affirmations: 'Mudanças graduais e mensuráveis ao longo de semanas/meses', manifestation: 'Focado em resultado, prazo variável' },
            { aspect: 'Base de Evidências', affirmations: 'Pesquisa sólida em psicologia e neurociência', manifestation: 'Evidências mistas, alguns sucessos anedóticos' },
        ],
        tip: 'Use afirmações para trabalho diário de mentalidade e mudança de comportamento. Adicione técnicas de manifestação (visualização, definição de objetivos) para resultados específicos. A extensão Daily Affirmations suporta ambas as abordagens.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/manifestation-vs-affirmations',
        title: 'मैनिफेस्टेशन बनाम पुष्टिकरण: तथ्य को कल्पना से अलग करना',
        description: 'मैनिफेस्टेशन और पुष्टिकरण के बीच वास्तविक अंतर को समझें। जानें कि विज्ञान प्रत्येक अभ्यास के बारे में क्या कहता है।',
        date: '2025-08-13',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: '13 अगस्त 2025',
        h1: 'मैनिफेस्टेशन बनाम पुष्टिकरण: तथ्य को कल्पना से अलग करना',
        intro: 'दोनों प्रथाएँ मानसिकता बदलने का लक्ष्य रखती हैं, लेकिन अलग-अलग काम करती हैं। अंतर समझना हर एक को अधिक प्रभावी ढंग से उपयोग करने में मदद करता है।',
        alt: 'विचार और इरादे की अमूर्त विज़ुअलाइज़ेशन',
        comparison: [
            { aspect: 'फोकस', affirmations: 'व्यवहार परिवर्तन और विश्वास सुदृढ़ीकरण', manifestation: 'इरादे के माध्यम से विशिष्ट परिणाम आकर्षित करना' },
            { aspect: 'तंत्र', affirmations: 'संज्ञानात्मक पुनर्गठन और आदत निर्माण', manifestation: 'विज़ुअलाइज़ेशन और ऊर्जा संरेखण' },
            { aspect: 'समयसीमा', affirmations: 'सप्ताह/महीनों में क्रमिक, मापने योग्य बदलाव', manifestation: 'परिणाम-केंद्रित, परिवर्तनशील समयसीमा' },
            { aspect: 'साक्ष्य आधार', affirmations: 'मनोविज्ञान और न्यूरोसाइंस में मजबूत शोध', manifestation: 'मिश्रित साक्ष्य, कुछ उदाहरण सफलताएँ' },
        ],
        tip: 'दैनिक मानसिकता कार्य और व्यवहार परिवर्तन के लिए पुष्टिकरण का उपयोग करें। विशिष्ट परिणामों के लिए मैनिफेस्टेशन तकनीकें (विज़ुअलाइज़ेशन, लक्ष्य-निर्धारण) जोड़ें। Daily Affirmations एक्सटेंशन दोनों दृष्टिकोणों का समर्थन करता है।'
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
                        <section className="mb-8">
                            <h2>{lang === 'ru' ? 'Сравнение практик' : lang === 'zh' ? '实践对比' : lang === 'ar' ? 'مقارنة الممارسات' : lang === 'pt' ? 'Comparação de práticas' : lang === 'hi' ? 'प्रथाओं की तुलना' : 'Practice Comparison'}</h2>
                            <div className="overflow-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-neutral-800">
                                            <th className="py-2 pr-4 font-semibold text-neutral-200">{lang === 'ru' ? 'Аспект' : lang === 'zh' ? '方面' : lang === 'ar' ? 'الجانب' : lang === 'pt' ? 'Aspecto' : lang === 'hi' ? 'पहलू' : 'Aspect'}</th>
                                            <th className="py-2 pr-4 font-semibold text-neutral-200">{lang === 'ru' ? 'Аффирмации' : lang === 'zh' ? '肯定语' : lang === 'ar' ? 'التأكيدات' : lang === 'pt' ? 'Afirmações' : lang === 'hi' ? 'पुष्टिकरण' : 'Affirmations'}</th>
                                            <th className="py-2 font-semibold text-neutral-200">{lang === 'ru' ? 'Манифестация' : lang === 'zh' ? '显化' : lang === 'ar' ? 'التجلي' : lang === 'pt' ? 'Manifestação' : lang === 'hi' ? 'मैनिफेस्टेशन' : 'Manifestation'}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {t.comparison.map((c: any, i: number) => (
                                            <tr key={i} className="border-b border-neutral-800">
                                                <td className="py-2 pr-4 font-semibold text-neutral-200">{c.aspect}</td>
                                                <td className="py-2 pr-4 text-neutral-300">{c.affirmations}</td>
                                                <td className="py-2 text-neutral-300">{c.manifestation}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🔮 {lang === 'ru' ? 'Комбинированный подход' : lang === 'zh' ? '组合方法' : lang === 'ar' ? 'نهج مجمع' : lang === 'pt' ? 'Abordagem combinada' : lang === 'hi' ? 'संयुक्त दृष्टिकोण' : 'Combined approach'}</h3>
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

