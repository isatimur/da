'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/the-neuroscience-of-affirmations',
        title: 'The Neuroscience of Affirmations: How They Rewire Your Brain',
        description: 'Explore the neuroscience behind affirmations and discover how they physically rewire your brain.',
        date: '2025-02-18',
        category: 'Mindfulness',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: 'February 18, 2025',
        h1: 'The Neuroscience of Affirmations: How They Rewire Your Brain',
        intro: 'Repetition strengthens neural pathways. Affirmations activate reward circuits and prime identity-consistent behavior through neuroplasticity.',
        alt: 'Neural network visualization representing brain rewiring',
        points: [
            { h: 'Neuroplasticity', p: 'Repeated focus strengthens pathways. Daily affirmations build durable connections that support new habits and beliefs.' },
            { h: 'Reward Circuits', p: 'Positive self-talk triggers dopamine release. This makes affirmations feel good and encourages repetition.' },
            { h: 'Self-Schema Activation', p: 'First-person present statements activate identity networks. Your brain begins to align behavior with the affirmed identity.' },
            { h: 'Stress Reduction', p: 'Affirmations reduce cortisol and activate the parasympathetic system, supporting calm and resilience.' },
        ],
        tip: 'Consistency matters more than intensity. Use the Daily Affirmations extension to keep your phrases visible and build the habit.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/the-neuroscience-of-affirmations',
        title: 'Нейронаука аффирмаций: как они перепрограммируют мозг',
        description: 'Изучите нейронауку, стоящую за аффирмациями, и узнайте, как они физически меняют мозг.',
        date: '2025-02-18',
        category: 'Осознанность',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: '18 февраля 2025',
        h1: 'Нейронаука аффирмаций: как они перепрограммируют мозг',
        intro: 'Повторение укрепляет нейронные пути. Аффирмации активируют системы награды и запускают поведение, согласованное с идентичностью, через нейропластичность.',
        alt: 'Визуализация нейросети — перепрограммирование мозга',
        points: [
            { h: 'Нейропластичность', p: 'Повторный фокус укрепляет пути. Ежедневные аффирмации создают прочные связи, поддерживающие новые привычки и убеждения.' },
            { h: 'Системы награды', p: 'Позитивный диалог с собой запускает выброс дофамина. Это делает аффирмации приятными и поощряет повторение.' },
            { h: 'Активация «я»-схем', p: 'Фразы в первом лице и настоящем времени активируют сети идентичности. Мозг начинает выравнивать поведение под подтверждённую идентичность.' },
            { h: 'Снижение стресса', p: 'Аффирмации снижают кортизол и активируют парасимпатику, поддерживая спокойствие и устойчивость.' },
        ],
        tip: 'Важнее регулярность, а не интенсивность. Используйте расширение Daily Affirmations, чтобы держать фразы на виду и укрепить привычку.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/the-neuroscience-of-affirmations',
        title: '肯定语的神经科学：它们如何重塑大脑',
        description: '探索肯定语背后的神经科学，了解它们如何物理重塑大脑。',
        date: '2025-02-18',
        category: '正念',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: '2025年2月18日',
        h1: '肯定语的神经科学：它们如何重塑大脑',
        intro: '重复强化神经通路。肯定语通过神经可塑性激活奖赏回路，启动与身份一致的行为。',
        alt: '神经网络可视化，代表大脑重塑',
        points: [
            { h: '神经可塑性', p: '重复聚焦会强化通路。每日肯定语建立持久连接，支持新习惯与信念。' },
            { h: '奖赏回路', p: '积极的自我对话触发多巴胺释放，使肯定语感觉良好并鼓励重复。' },
            { h: '自我图式激活', p: '第一人称现在时语句激活身份网络，大脑开始将行为与确认的身份对齐。' },
            { h: '压力降低', p: '肯定语降低皮质醇并激活副交感系统，支持平静与韧性。' },
        ],
        tip: '持续性比强度更重要。使用 Daily Affirmations 扩展保持语句可见，建立习惯。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/the-neuroscience-of-affirmations',
        title: 'علم الأعصاب للتأكيدات: كيف تعيد توصيل دماغك',
        description: 'استكشف علم الأعصاب وراء التأكيدات واكتشف كيف تعيد توصيل دماغك جسدياً.',
        date: '2025-02-18',
        category: 'اليقظة',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: '18 فبراير 2025',
        h1: 'علم الأعصاب للتأكيدات: كيف تعيد توصيل دماغك',
        intro: 'التكرار يقوي المسارات العصبية. التأكيدات تُفعّل دوائر المكافأة وتُحفّز سلوكاً متسقاً مع الهوية عبر اللدونة العصبية.',
        alt: 'تصوير الشبكة العصبية يرمز لإعادة توصيل الدماغ',
        points: [
            { h: 'اللدونة العصبية', p: 'التركيز المتكرر يقوّي المسارات. التأكيدات اليومية تبني روابط دائمة تدعم عادات ومعتقدات جديدة.' },
            { h: 'دوائر المكافأة', p: 'الحديث الإيجابي للذات يُطلِق الدوبامين. هذا يجعل التأكيدات مريحة ويشجع على التكرار.' },
            { h: 'تفعيل مخطط الذات', p: 'البيانات بالمضارع وضمير المتكلم تُفعّل شبكات الهوية. يبدأ الدماغ بمحاذاة السلوك مع الهوية المؤكدة.' },
            { h: 'تقليل الإجهاد', p: 'التأكيدات تقلل الكورتيزول وتفعّل الجهاز الودي، مما يدعم الهدوء والمرونة.' },
        ],
        tip: 'الثبات أهم من الشدة. استخدم الامتداد لإبقاء العبارات مرئية وبناء العادة.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/the-neuroscience-of-affirmations',
        title: 'A Neurociência das Afirmações: Como Elas Reconfiguram seu Cérebro',
        description: 'Explore a neurociência por trás das afirmações e descubra como elas reconfiguram seu cérebro fisicamente.',
        date: '2025-02-18',
        category: 'Atenção Plena',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: '18 de fevereiro de 2025',
        h1: 'A Neurociência das Afirmações: Como Elas Reconfiguram seu Cérebro',
        intro: 'A repetição fortalece vias neurais. Afirmações ativam circuitos de recompensa e preparam comportamentos consistentes com a identidade via neuroplasticidade.',
        alt: 'Visualização de rede neural representando reconfiguração cerebral',
        points: [
            { h: 'Neuroplasticidade', p: 'Foco repetido fortalece vias. Afirmações diárias constroem conexões duradouras que sustentam novos hábitos e crenças.' },
            { h: 'Circuitos de Recompensa', p: 'Diálogo interno positivo dispara liberação de dopamina. Isso faz as afirmações sentirem bem e encoraja repetição.' },
            { h: 'Ativação de Autoesquema', p: 'Declarações em primeira pessoa no presente ativam redes de identidade. O cérebro começa a alinhar comportamento com a identidade afirmada.' },
            { h: 'Redução de Estresse', p: 'Afirmações reduzem cortisol e ativam o sistema parassimpático, apoiando calma e resiliência.' },
        ],
        tip: 'Consistência importa mais que intensidade. Use a extensão Daily Affirmations para manter frases visíveis e construir o hábito.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/the-neuroscience-of-affirmations',
        title: 'पुष्टिकरण का न्यूरोसाइंस: वे आपके मस्तिष्क को कैसे फिर से जोड़ते हैं',
        description: 'पुष्टिकरण के पीछे न्यूरोसाइंस का अन्वेषण करें और जानें कि वे शारीरिक रूप से मस्तिष्क को कैसे फिर से जोड़ते हैं।',
        date: '2025-02-18',
        category: 'माइंडफुलनेस',
        image: 'https://images.unsplash.com/photo-1559757175-08fda9f4f7d6?w=1200&h=630&fit=crop',
        dateDisplay: '18 फरवरी 2025',
        h1: 'पुष्टिकरण का न्यूरोसाइंस: वे आपके मस्तिष्क को कैसे फिर से जोड़ते हैं',
        intro: 'दोहराव न्यूरल पाथवे मजबूत करता है। पुष्टिकरण इनाम सर्किट सक्रिय करते हैं और न्यूरोप्लास्टिसिटी के माध्यम से पहचान-संगत व्यवहार को प्राइम करते हैं।',
        alt: 'न्यूरल नेटवर्क विज़ुअलाइज़ेशन — मस्तिष्क पुनःसंयोजन',
        points: [
            { h: 'न्यूरोप्लास्टिसिटी', p: 'बार-बार फोकस मार्ग मजबूत करता है। दैनिक पुष्टिकरण टिकाऊ कनेक्शन बनाते हैं जो नए आदतों और मान्यताओं का समर्थन करते हैं।' },
            { h: 'इनाम सर्किट', p: 'सकारात्मक आत्म-वार्ता डोपामाइन रिलीज़ ट्रिगर करती है। यह पुष्टिकरण को अच्छा महसूस कराता है और दोहराव को प्रोत्साहित करता है।' },
            { h: 'स्व-स्कीमा सक्रियण', p: 'प्रथम पुरुष वर्तमान काल वाक्य पहचान नेटवर्क सक्रिय करते हैं। मस्तिष्क व्यवहार को पुष्ट पहचान के साथ संरेखित करना शुरू करता है।' },
            { h: 'तनाव कमी', p: 'पुष्टिकरण कोर्टिसोल कम करते हैं और पैरासिम्पेथेटिक सिस्टम सक्रिय करते हैं, शांति और लचीलापन का समर्थन करते हैं।' },
        ],
        tip: 'तीव्रता से अधिक निरंतरता मायने रखती है। Daily Affirmations एक्सटेंशन का उपयोग करके अपनी पंक्तियों को दृश्य रखें और आदत बनाएँ।'
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
                            <h3 className="text-xl font-semibold mb-4">🧠 {lang === 'ru' ? 'Практическое применение' : lang === 'zh' ? '实际应用' : lang === 'ar' ? 'تطبيق عملي' : lang === 'pt' ? 'Aplicação prática' : lang === 'hi' ? 'व्यावहारिक अनुप्रयोग' : 'Practical application'}</h3>
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

