'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/the-psychology-of-positive-affirmations',
        title: 'The Psychology of Positive Affirmations: What Science Tells Us',
        description: 'Explore psychological research and scientific evidence behind positive affirmations. Learn how they work, why they\'re effective, and how to maximize their impact.',
        date: '2024-05-10',
        category: 'Mindfulness',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop',
        dateDisplay: 'May 10, 2024',
        h1: 'The Psychology of Positive Affirmations: What Science Tells Us',
        intro: 'Research shows affirmations work through self-affirmation theory, cognitive restructuring, and behavioral priming. Here\'s what matters most.',
        alt: 'Abstract psychology and neuroscience illustration',
        insights: [
            { h: 'Self-Affirmation Theory', p: 'Affirming core values reduces defensive responses and opens the mind to change. This makes you more receptive to growth.' },
            { h: 'Cognitive Restructuring', p: 'Repeated positive statements gradually replace limiting beliefs. Over time, new thought patterns become automatic.' },
            { h: 'Behavioral Priming', p: 'Affirmations activate identity-consistent behaviors. When you affirm "I am confident," you\'re more likely to act confidently.' },
            { h: 'Stress Buffering', p: 'Regular affirmations reduce cortisol and improve emotional regulation, making you more resilient under pressure.' },
        ],
        tip: 'For best results, write affirmations that align with your values and practice them consistently. The Daily Affirmations extension makes this easy by keeping your phrases visible.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/the-psychology-of-positive-affirmations',
        title: 'Психология позитивных аффирмаций: что говорит наука',
        description: 'Исследования психологии и научные доказательства эффективности позитивных аффирмаций. Как они работают и почему эффективны.',
        date: '2024-05-10',
        category: 'Осознанность',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop',
        dateDisplay: '10 мая 2024',
        h1: 'Психология позитивных аффирмаций: что говорит наука',
        intro: 'Исследования показывают: аффирмации работают через теорию самоутверждения, когнитивную реструктуризацию и поведенческий прайминг. Вот что важно.',
        alt: 'Абстрактная иллюстрация психологии и нейронауки',
        insights: [
            { h: 'Теория самоутверждения', p: 'Подтверждение основных ценностей снижает защитные реакции и открывает ум для изменений. Это делает вас более открытым для роста.' },
            { h: 'Когнитивная реструктуризация', p: 'Повторяющиеся позитивные утверждения постепенно заменяют ограничивающие убеждения. Со временем новые паттерны мышления становятся автоматическими.' },
            { h: 'Поведенческий прайминг', p: 'Аффирмации активируют поведение, согласованное с идентичностью. Когда вы утверждаете "Я уверен(а)", вы с большей вероятностью действуете уверенно.' },
            { h: 'Буферизация стресса', p: 'Регулярные аффирмации снижают кортизол и улучшают регуляцию эмоций, делая вас более устойчивыми под давлением.' },
        ],
        tip: 'Для лучших результатов пишите аффирмации, согласованные с вашими ценностями, и практикуйте их последовательно. Расширение Daily Affirmations упрощает это, делая фразы всегда видимыми.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/the-psychology-of-positive-affirmations',
        title: '积极肯定语的心理学：科学告诉我们什么',
        description: '探索积极肯定语背后的心理学研究与科学证据。了解它们如何工作、为何有效以及如何最大化影响。',
        date: '2024-05-10',
        category: '正念',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop',
        dateDisplay: '2024年5月10日',
        h1: '积极肯定语的心理学：科学告诉我们什么',
        intro: '研究表明，肯定语通过自我肯定理论、认知重构和行为启动起作用。以下是关键点。',
        alt: '心理学与神经科学抽象插图',
        insights: [
            { h: '自我肯定理论', p: '肯定核心价值观能减少防御反应，打开改变的大门，让你对成长更开放。' },
            { h: '认知重构', p: '重复的积极陈述逐步替代限制性信念。久而久之，新的思维模式会自动化。' },
            { h: '行为启动', p: '肯定语激活与身份一致的行为。当你肯定“我自信”时，你更可能自信地行动。' },
            { h: '压力缓冲', p: '定期肯定语降低皮质醇并改善情绪调节，使你在压力下更具韧性。' },
        ],
        tip: '为获得最佳效果，撰写与你价值观一致的肯定语并持续练习。Daily Affirmations 扩展让这更简单，保持语句始终可见。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/the-psychology-of-positive-affirmations',
        title: 'علم نفس التأكيدات الإيجابية: ما يقوله العلم',
        description: 'استكشف الأبحاث النفسية والأدلة العلمية وراء التأكيدات الإيجابية. تعلم كيف تعمل ولماذا تكون فعالة.',
        date: '2024-05-10',
        category: 'اليقظة',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop',
        dateDisplay: '10 مايو 2024',
        h1: 'علم نفس التأكيدات الإيجابية: ما يقوله العلم',
        intro: 'تُظهر الأبحاث أن التأكيدات تعمل عبر نظرية التأكيد الذاتي وإعادة هيكلة المعرف والتحضير السلوكي. هذا ما يهم.',
        alt: 'رسم توضيحي مجرد لعلم النفس والأعصاب',
        insights: [
            { h: 'نظرية التأكيد الذاتي', p: 'تأكيد القيم الأساسية يقلل الاستجابات الدفاعية ويفتح العقل للتغيير. هذا يجعلك أكثر انفتاحاً للنمو.' },
            { h: 'إعادة هيكلة المعرف', p: 'البيانات الإيجابية المتكررة تحل تدريجياً محل المعتقدات المحدودة. بمرور الوقت، تصبح أنماط التفكير الجديدة تلقائية.' },
            { h: 'التحضير السلوكي', p: 'التأكيدات تُفعّل السلوك المتسق مع الهوية. عند تأكيد "أنا واثق"، من المرجح أن تتصرف بثقة.' },
            { h: 'تخميد الإجهاد', p: 'التأكيدات المنتظمة تقلل الكورتيزول وتحسّن التنظيم العاطفي، مما يجعلك أكثر مرونة تحت الضغط.' },
        ],
        tip: 'للنتائج الأفضل، اكتب تأكيدات تتماشى مع قيمك ومارسها باستمرار. الامتداد يجعل هذا سهلاً بإبقاء العبارات مرئية.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/the-psychology-of-positive-affirmations',
        title: 'A Psicologia das Afirmações Positivas: O que a Ciência nos Diz',
        description: 'Explore pesquisa psicológica e evidências científicas por trás das afirmações positivas. Aprenda como funcionam e por que são eficazes.',
        date: '2024-05-10',
        category: 'Atenção Plena',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop',
        dateDisplay: '10 de maio de 2024',
        h1: 'A Psicologia das Afirmações Positivas: O que a Ciência nos Diz',
        intro: 'A pesquisa mostra que afirmações funcionam através da teoria da autoafirmação, reestruturação cognitiva e priming comportamental. Aqui está o que importa.',
        alt: 'Ilustração abstrata de psicologia e neurociência',
        insights: [
            { h: 'Teoria da Autoafirmação', p: 'Afirmar valores centrais reduz respostas defensivas e abre a mente para mudanças. Isso te torna mais receptivo ao crescimento.' },
            { h: 'Reestruturação Cognitiva', p: 'Declarações positivas repetidas gradualmente substituem crenças limitantes. Com o tempo, novos padrões de pensamento se tornam automáticos.' },
            { h: 'Priming Comportamental', p: 'Afirmações ativam comportamentos consistentes com a identidade. Ao afirmar "Sou confiante", é mais provável que você aja com confiança.' },
            { h: 'Amortecimento de Estresse', p: 'Afirmações regulares reduzem cortisol e melhoram regulação emocional, tornando você mais resiliente sob pressão.' },
        ],
        tip: 'Para melhores resultados, escreva afirmações alinhadas com seus valores e pratique-as consistentemente. A extensão Daily Affirmations facilita isso mantendo suas frases visíveis.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/the-psychology-of-positive-affirmations',
        title: 'सकारात्मक पुष्टिकरण का मनोविज्ञान: विज्ञान हमें क्या बताता है',
        description: 'सकारात्मक पुष्टिकरण के पीछे मनोवैज्ञानिक अनुसंधान और वैज्ञानिक साक्ष्य का अन्वेषण करें। जानें कि वे कैसे काम करते हैं और क्यों प्रभावी हैं।',
        date: '2024-05-10',
        category: 'माइंडफुलनेस',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop',
        dateDisplay: '10 मई 2024',
        h1: 'सकारात्मक पुष्टिकरण का मनोविज्ञान: विज्ञान हमें क्या बताता है',
        intro: 'अनुसंधान दिखाता है कि पुष्टिकरण स्व-पुष्टि सिद्धांत, संज्ञानात्मक पुनर्गठन और व्यवहारिक प्राइमिंग के माध्यम से काम करते हैं। यहाँ जो मायने रखता है।',
        alt: 'मनोविज्ञान और न्यूरोसाइंस का अमूर्त चित्रण',
        insights: [
            { h: 'स्व-पुष्टि सिद्धांत', p: 'मूल मूल्यों की पुष्टि रक्षात्मक प्रतिक्रियाओं को कम करती है और मन को परिवर्तन के लिए खोलती है। यह आपको विकास के लिए अधिक ग्रहणशील बनाता है।' },
            { h: 'संज्ञानात्मक पुनर्गठन', p: 'दोहराए जाने वाले सकारात्मक कथन धीरे-धीरे सीमित मान्यताओं को प्रतिस्थापित करते हैं। समय के साथ, नए विचार पैटर्न स्वचालित हो जाते हैं।' },
            { h: 'व्यवहारिक प्राइमिंग', p: 'पुष्टिकरण पहचान-संगत व्यवहार सक्रिय करते हैं। जब आप "मैं आत्मविश्वासी हूँ" की पुष्टि करते हैं, तो आप आत्मविश्वास से कार्य करने की अधिक संभावना रखते हैं।' },
            { h: 'तनाव बफ़रिंग', p: 'नियमित पुष्टिकरण कोर्टिसोल कम करते हैं और भावनात्मक नियमन में सुधार करते हैं, जिससे आप दबाव में अधिक लचीले होते हैं।' },
        ],
        tip: 'सर्वोत्तम परिणामों के लिए, अपने मूल्यों के अनुरूप पुष्टिकरण लिखें और उनका लगातार अभ्यास करें। Daily Affirmations एक्सटेंशन इसे आसान बनाता है — आपकी पंक्तियाँ हमेशा दृश्यमान रहती हैं।'
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
                        {t.insights.map((ins: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{ins.h}</h2>
                                <p>{ins.p}</p>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🔬 {lang === 'ru' ? 'Применяйте на практике' : lang === 'zh' ? '实践应用' : lang === 'ar' ? 'التطبيق العملي' : lang === 'pt' ? 'Aplicação prática' : lang === 'hi' ? 'व्यावहारिक अनुप्रयोग' : 'Apply in practice'}</h3>
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

