'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/building-self-confidence-affirmations',
        title: 'Building Self-Confidence Through Daily Affirmations',
        description: 'Confidence-focused affirmations and practice steps to replace self-doubt with steady self-belief.',
        date: '2024-10-11',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=630&fit=crop',
        dateDisplay: 'October 11, 2024',
        h1: 'Building Self-Confidence Through Daily Affirmations',
        intro: 'Confidence grows by doing believable reps. Use short, specific lines tied to actions you can take today.',
        alt: 'Person standing tall at sunrise representing confidence',
        blocks: [
            { h: 'Identity', items: ['I am capable and resourceful.', 'My opinion matters and adds value.', 'I learn quickly and adapt.'] },
            { h: 'Action', items: ['I take one clear step despite uncertainty.', 'I speak up once per meeting.', 'I finish small tasks with care.'] },
            { h: 'Recovery', items: ['I handle mistakes with curiosity.', 'I adjust and try again.', 'My progress compounds daily.'] },
        ],
        tip: 'Pin 3 lines on your new tab via the extension. Check one action before lunch.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/building-self-confidence-affirmations',
        title: 'Построение уверенности с помощью ежедневных аффирмаций',
        description: 'Аффирмации и шаги практики, которые заменяют сомнения устойчивой верой в себя.',
        date: '2024-10-11',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=630&fit=crop',
        dateDisplay: '11 октября 2024',
        h1: 'Построение уверенности с помощью ежедневных аффирмаций',
        intro: 'Уверенность растёт через «правдоподобные повторы». Короткие конкретные фразы, привязанные к сегодняшним действиям.',
        alt: 'Человек на рассвете — символ уверенности',
        blocks: [
            { h: 'Идентичность', items: ['Я способен(на) и находчив(а).', 'Моё мнение важно и приносит ценность.', 'Я быстро учусь и адаптируюсь.'] },
            { h: 'Действие', items: ['Делаю один понятный шаг несмотря на неопределённость.', 'Высказываюсь хотя бы раз за встречу.', 'Завершаю мелкие задачи аккуратно.'] },
            { h: 'Восстановление', items: ['Отношусь к ошибкам с любопытством.', 'Корректируюсь и пробую снова.', 'Мой прогресс накапливается ежедневно.'] },
        ],
        tip: 'Закрепите 3 фразы на новой вкладке через расширение. До обеда — один выполненный шаг.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/building-self-confidence-affirmations',
        title: '通过每日肯定语建立自信',
        description: '面向自信的肯定语与练习步骤，用稳定自信取代自我怀疑。',
        date: '2024-10-11',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=630&fit=crop',
        dateDisplay: '2024年10月11日',
        h1: '通过每日肯定语建立自信',
        intro: '自信源于可信的“重复”。用简短具体的语句连接到今天能做到的行动。',
        alt: '日出时挺立的人象征自信',
        blocks: [
            { h: '身份', items: ['我有能力且足智多谋。', '我的观点有价值。', '我学习迅速且善于适应。'] },
            { h: '行动', items: ['即使不确定，我也迈出明确一步。', '每次会议我都发言一次。', '我认真完成小任务。'] },
            { h: '恢复', items: ['我以好奇心对待错误。', '我调整后再尝试。', '我的进步每天复利增长。'] },
        ],
        tip: '用扩展把3条语句固定在新标签页；午餐前完成一个行动。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/building-self-confidence-affirmations',
        title: 'بناء الثقة بالنفس عبر التأكيدات اليومية',
        description: 'تأكيدات وخطوات عملية تستبدل الشك بثقة راسخة.',
        date: '2024-10-11',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=630&fit=crop',
        dateDisplay: '11 أكتوبر 2024',
        h1: 'بناء الثقة بالنفس عبر التأكيدات اليومية',
        intro: 'الثقة تنمو بالتكرارات القابلة للتصديق. عبارات قصيرة ومحددة مرتبطة بخطوات يومية.',
        alt: 'شخص واقف بثبات عند الشروق يرمز للثقة',
        blocks: [
            { h: 'الهوية', items: ['أنا قادر ومرن.', 'رأيي ذو قيمة ومسموع.', 'أتعلّم بسرعة وأتكيف.'] },
            { h: 'الفعل', items: ['أتخذ خطوة واضحة رغم اللايقين.', 'أتحدث مرة واحدة في كل اجتماع.', 'أُنهي المهام الصغيرة بعناية.'] },
            { h: 'التعافي', items: ['أتعامل مع الأخطاء بفضول.', 'أُعدل وأحاول مجدداً.', 'يتراكم تقدمي يومياً.'] },
        ],
        tip: 'ثبّت 3 عبارات في لسان جديد عبر الامتداد؛ أنجز خطوة قبل الغداء.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/building-self-confidence-affirmations',
        title: 'Construindo Autoconfiança com Afirmações Diárias',
        description: 'Afirmações e passos práticos que substituem a dúvida por autoconfiança estável.',
        date: '2024-10-11',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=630&fit=crop',
        dateDisplay: '11 de outubro de 2024',
        h1: 'Construindo Autoconfiança com Afirmações Diárias',
        intro: 'A confiança cresce com repetições críveis. Frases curtas e específicas ligadas a ações de hoje.',
        alt: 'Pessoa ereta ao nascer do sol simbolizando confiança',
        blocks: [
            { h: 'Identidade', items: ['Sou capaz e engenhoso(a).', 'Minha opinião tem valor.', 'Aprendo rápido e me adapto.'] },
            { h: 'Ação', items: ['Dou um passo claro mesmo com incerteza.', 'Falo pelo menos uma vez por reunião.', 'Concluo pequenas tarefas com cuidado.'] },
            { h: 'Recuperação', items: ['Lido com erros com curiosidade.', 'Ajusto e tento novamente.', 'Meu progresso se compõe diariamente.'] },
        ],
        tip: 'Fixe 3 linhas na nova aba via a extensão e faça uma ação antes do almoço.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/building-self-confidence-affirmations',
        title: 'दैनिक पुष्टिकरण से आत्मविश्वास बनाना',
        description: 'आत्मविश्वास केंद्रित पुष्टिकरण और अभ्यास कदम, जो संदेह की जगह स्थिर आत्म-विश्वास लाएँ।',
        date: '2024-10-11',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=630&fit=crop',
        dateDisplay: '11 अक्टूबर 2024',
        h1: 'दैनिक पुष्टिकरण से आत्मविश्वास बनाना',
        intro: 'विश्वसनीय दोहराव से आत्मविश्वास बढ़ता है। आज के कृत्यों से जुड़े छोटे, स्पष्ट वाक्य प्रयोग करें।',
        alt: 'सूर्योदय पर आत्मविश्वास से खड़ा व्यक्ति',
        blocks: [
            { h: 'पहचान', items: ['मैं सक्षम और संसाधनपूर्ण हूँ।', 'मेरी राय मूल्यवान है।', 'मैं जल्दी सीखता/सीखती हूँ और अनुकूल होता/होती हूँ।'] },
            { h: 'कार्य', items: ['अनिश्चितता के बावजूद एक स्पष्ट कदम उठाता/उठाती हूँ।', 'हर मीटिंग में एक बार बोलता/बोलती हूँ।', 'छोटे कार्य ध्यान से पूरा करता/करती हूँ।'] },
            { h: 'पुनर्प्राप्ति', items: ['गलतियों को जिज्ञासा से देखता/देखती हूँ।', 'समायोजित कर फिर कोशिश करता/करती हूँ।', 'मेरा प्रगति रोज़ बढ़ता है।'] },
        ],
        tip: 'एक्सटेंशन में 3 पंक्तियों को नई टैब पर पिन करें; दोपहर से पहले एक एक्शन पूरा करें।'
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
                        {t.blocks.map((b: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{b.h}</h2>
                                <ul>
                                    {b.items.map((it: string, j: number) => (
                                        <li key={j}>{it}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">✨ {lang === 'ru' ? 'Укрепляйте шагами' : lang === 'zh' ? '用行动巩固' : lang === 'ar' ? 'رسّخها بالأفعال' : lang === 'pt' ? 'Consolide com ação' : lang === 'hi' ? 'कदमों से मजबूत करें' : 'Consolidate with action'}</h3>
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
