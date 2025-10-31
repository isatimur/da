'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/science-of-daily-affirmations',
        title: 'The Science Behind Daily Affirmations',
        description: 'What psychology and neuroscience reveal about affirmations: why they work and how to use them effectively.',
        date: '2024-01-22',
        category: 'Mindfulness',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: 'January 22, 2024',
        h1: 'The Science Behind Daily Affirmations',
        intro: 'Affirmations shape attention and behavior through expectancy, self-schema priming, and neuroplasticity. Here is the practical view.',
        alt: 'Neural network abstract image representing neuroplasticity',
        points: [
            { h: 'Expectancy & Attention', p: 'Stating a desired state increases salience for related cues. You notice more opportunities that fit your wording.' },
            { h: 'Self-Schema Priming', p: 'First-person present-tense statements prime identity-consistent behavior. Repetition lowers friction to act accordingly.' },
            { h: 'Affect Regulation', p: 'Emotionally loaded wording recruits limbic circuits, improving motivation and memory consolidation.' },
            { h: 'Neuroplasticity', p: 'Repeated focus strengthens useful pathways. Consistency beats intensity.' },
        ],
        tip: 'Pair brief affirmations with a daily cue (new tab, coffee, commute) to leverage habit stacking.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/science-of-daily-affirmations',
        title: 'Наука за ежедневными аффирмациями',
        description: 'Что говорят психология и нейронаука: почему аффирмации работают и как применять их эффективно.',
        date: '2024-01-22',
        category: 'Осознанность',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: '22 января 2024',
        h1: 'Наука за ежедневными аффирмациями',
        intro: 'Аффирмации влияют на внимание и поведение через ожидания, прайминг идентичности и нейропластичность. Практический взгляд.',
        alt: 'Абстрактное изображение нейросети — нейропластичность',
        points: [
            { h: 'Ожидания и внимание', p: 'Формулировка желаемого повышает заметность связанных сигналов. Вы чаще замечаете соответствующие возможности.' },
            { h: 'Прайминг «я»-схем', p: 'Фразы в первом лице и настоящем времени активируют поведение, согласованное с идентичностью. Повторы снижают трение.' },
            { h: 'Регуляция эмоций', p: 'Эмоциональная лексика активирует лимбические контуры, усиливая мотивацию и закрепление памяти.' },
            { h: 'Нейропластичность', p: 'Повторный фокус укрепляет полезные пути. Важна регулярность, а не разовые всплески.' },
        ],
        tip: 'Свяжите короткие аффирмации с ежедневным триггером (новая вкладка, кофе, дорога), чтобы усилить привычку.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/science-of-daily-affirmations',
        title: '每日肯定语的科学',
        description: '心理学与神经科学如何解释肯定语：为何有效、如何更好使用。',
        date: '2024-01-22',
        category: '正念',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: '2024年1月22日',
        h1: '每日肯定语的科学',
        intro: '通过期待、身份图式启动和神经可塑性影响注意与行为。以下是实用视角。',
        alt: '代表神经可塑性的抽象神经网络图',
        points: [
            { h: '期待与注意', p: '陈述期望状态会提升相关线索的显著性。你更易注意到与措辞匹配的机会。' },
            { h: '自我图式启动', p: '第一人称现在时会启动与身份一致的行为。重复可降低相应行动摩擦。' },
            { h: '情感调节', p: '富情感措辞激活边缘系统，提高动机与记忆稳固。' },
            { h: '神经可塑性', p: '重复聚焦会强化有益通路。重在稳定持续。' },
        ],
        tip: '将简短肯定语与每日线索绑定（新标签、咖啡、通勤），利用习惯叠加。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/science-of-daily-affirmations',
        title: 'العلم وراء التأكيدات اليومية',
        description: 'ماذا تكشف النفس والأعصاب عن التأكيدات: لماذا تعمل وكيف نُحسن استخدامها.',
        date: '2024-01-22',
        category: 'اليقظة',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: '22 يناير 2024',
        h1: 'العلم وراء التأكيدات اليومية',
        intro: 'تُشكل التأكيدات الانتباه والسلوك عبر التوقع، تهيئة مخطط الذات، واللدونة العصبية. منظور عملي.',
        alt: 'شبكة عصبية مجردة ترمز لللدونة العصبية',
        points: [
            { h: 'التوقع والانتباه', p: 'ذكر الحالة المرغوبة يزيد بروز الإشارات ذات الصلة، فتلاحظ فرصاً أكثر ملاءمة.' },
            { h: 'تهيئة مخطط الذات', p: 'الصياغة بالمضارع وضمير المتكلم تُفعّل سلوكاً متسقاً مع الهوية. التكرار يقلل الاحتكاك.' },
            { h: 'تنظيم الانفعال', p: 'المفردات العاطفية تُنشط الدوائر الحوفية، فتعزز الدافعية وتثبيت الذاكرة.' },
            { h: 'اللدونة العصبية', p: 'التركيز المتكرر يقوي المسارات النافعة. الاستمرار أهم من الشدة.' },
        ],
        tip: 'اربط التأكيدات القصيرة بإشارة يومية (لسان جديد، قهوة، تنقل) لاستثمار تراكب العادات.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/science-of-daily-affirmations',
        title: 'A Ciência por Trás das Afirmações Diárias',
        description: 'O que psicologia e neurociência mostram: por que afirmações funcionam e como usá-las melhor.',
        date: '2024-01-22',
        category: 'Atenção Plena',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: '22 de janeiro de 2024',
        h1: 'A Ciência por Trás das Afirmações Diárias',
        intro: 'Afirmações moldam atenção e ação via expectativa, priming de autoesquema e neuroplasticidade. Visão prática.',
        alt: 'Rede neural abstrata representando neuroplasticidade',
        points: [
            { h: 'Expectativa e Atenção', p: 'Declarar o estado desejado aumenta a saliência de pistas relacionadas. Você nota mais oportunidades alinhadas.' },
            { h: 'Priming de Autoesquema', p: 'Primeira pessoa no presente ativa comportamentos coerentes com a identidade. Repetição reduz atrito para agir.' },
            { h: 'Regulação Afetiva', p: 'Linguagem emocional recruta circuitos límbicos, melhorando motivação e consolidação da memória.' },
            { h: 'Neuroplasticidade', p: 'Foco repetido fortalece vias úteis. Consistência > intensidade.' },
        ],
        tip: 'Vincule afirmações curtas a um gatilho diário (nova aba, café, trajeto) para empilhar hábitos.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/science-of-daily-affirmations',
        title: 'दैनिक पुष्टिकरण के पीछे का विज्ञान',
        description: 'मनोविज्ञान और न्यूरोसाइंस क्या बताते हैं: पुष्टिकरण क्यों काम करते हैं और उन्हें प्रभावी तरीके से कैसे उपयोग करें।',
        date: '2024-01-22',
        category: 'माइंडफुलनेस',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: '22 जनवरी 2024',
        h1: 'दैनिक पुष्टिकरण के पीछे का विज्ञान',
        intro: 'पुष्टिकरण अपेक्षा, स्व-स्कीमा प्राइमिंग और न्यूरोप्लास्टिसिटी के माध्यम से ध्यान और व्यवहार को आकार देते हैं। यहाँ व्यावहारिक दृष्टि है।',
        alt: 'न्यूरोप्लास्टिसिटी दर्शाता अमूर्त न्यूरल ग्राफिक',
        points: [
            { h: 'अपेक्षा और ध्यान', p: 'वांछित स्थिति बोलने से संबंधित संकेत अधिक प्रमुख हो जाते हैं। आप अधिक अवसर नोटिस करते हैं।' },
            { h: 'स्व-स्कीमा प्राइमिंग', p: 'प्रथम पुरुष वर्तमान काल पहचान-संगत व्यवहार को सक्रिय करता है। दोहराव से कार्रवाई का घर्षण घटता है।' },
            { h: 'भाव विनियमन', p: 'भावनात्मक शब्दावली लिम्बिक सर्किट सक्रिय करती है, प्रेरणा और स्मृति सुदृढ़ीकरण बढ़ता है।' },
            { h: 'न्यूरोप्लास्टिसिटी', p: 'बार-बार फोकस से उपयोगी मार्ग मजबूत होते हैं। निरंतरता सर्वोपरि है।' },
        ],
        tip: 'छोटे पुष्टिकरण को दैनिक संकेत (नई टैब, कॉफी, यात्रा) से जोड़ें — आदत स्टैकिंग।'
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
                        {t.points.map((p: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{p.h}</h2>
                                <p>{p.p}</p>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🔬 {lang === 'ru' ? 'Как применить на практике' : lang === 'zh' ? '实用建议' : lang === 'ar' ? 'تطبيق عملي' : lang === 'pt' ? 'Aplicando na prática' : lang === 'hi' ? 'व्यावहारिक उपयोग' : 'Applying in practice'}</h3>
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
