'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/30-day-affirmation-challenge',
        title: '30 Day Affirmation Challenge: A Complete Guide',
        description: 'Join our structured 30-day program with daily affirmations and simple exercises to transform your mindset in one month.',
        date: '2024-06-18',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=630&fit=crop',
        dateDisplay: 'June 18, 2024',
        h1: '30 Day Affirmation Challenge: A Complete Guide',
        intro: 'A simple, effective plan: 5 minutes a day for 30 days. Clear themes, ready-to-use affirmations, and lightweight tracking.',
        alt: 'Calendar with 30 days marked for a challenge',
        weeks: [
            { title: 'Week 1: Calm & Presence', items: ['I breathe calmly and feel grounded.', 'I let go of tension with every exhale.', 'I am safe in this moment.'] },
            { title: 'Week 2: Confidence', items: ['I trust my decisions.', 'I speak clearly and confidently.', 'I learn and improve every day.'] },
            { title: 'Week 3: Focus & Productivity', items: ['I focus on what matters most.', 'I use my time wisely.', 'I complete tasks with care.'] },
            { title: 'Week 4: Gratitude & Growth', items: ['I notice small wins.', 'I am grateful for progress.', 'I welcome new opportunities.'] },
        ],
        tip: 'Use the Daily Affirmations Chrome extension as your new tab to keep the streak going.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/30-day-affirmation-challenge',
        title: '30-дневный челлендж аффирмаций: полное руководство',
        description: 'Структурированная программа на 30 дней: ежедневные аффирмации и короткие упражнения для трансформации мышления.',
        date: '2024-06-18',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=630&fit=crop',
        dateDisplay: '18 июня 2024',
        h1: '30-дневный челлендж аффирмаций: полное руководство',
        intro: 'Простой и эффективный план: 5 минут в день на протяжении 30 дней. Темы по неделям, готовые аффирмации и лёгкое отслеживание.',
        alt: 'Календарь с 30 отмеченными днями',
        weeks: [
            { title: 'Неделя 1: Спокойствие и присутствие', items: ['Я дышу спокойно и чувствую опору.', 'С каждым выдохом я отпускаю напряжение.', 'Я в безопасности в настоящем моменте.'] },
            { title: 'Неделя 2: Уверенность', items: ['Я доверяю своим решениям.', 'Я говорю ясно и уверенно.', 'Я учусь и становлюсь лучше каждый день.'] },
            { title: 'Неделя 3: Фокус и продуктивность', items: ['Я сосредоточен на главном.', 'Я использую своё время мудро.', 'Я тщательно завершаю задачи.'] },
            { title: 'Неделя 4: Благодарность и рост', items: ['Я замечаю маленькие победы.', 'Я благодарен за прогресс.', 'Я открываю новые возможности.'] },
        ],
        tip: 'Включите расширение Daily Affirmations как новую вкладку — так проще держать серию.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/30-day-affirmation-challenge',
        title: '30天肯定语挑战：完整指南',
        description: '结构化的30天计划：每日肯定语与简短练习，在一个月内转变思维。',
        date: '2024-06-18',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=630&fit=crop',
        dateDisplay: '2024年6月18日',
        h1: '30天肯定语挑战：完整指南',
        intro: '简单高效：每天5分钟，坚持30天。每周主题、现成肯定语与轻量化打卡。',
        alt: '标注了30天挑战的日历',
        weeks: [
            { title: '第1周：平静与当下', items: ['我呼吸平稳，感到踏实。', '每次呼气我都释放紧张。', '此刻我很安全。'] },
            { title: '第2周：自信', items: ['我信任自己的决定。', '我表达清晰而自信。', '我每天学习并进步。'] },
            { title: '第3周：专注与效率', items: ['我专注于最重要的事。', '我明智地利用时间。', '我认真完成任务。'] },
            { title: '第4周：感恩与成长', items: ['我留意微小的胜利。', '我为进步心存感激。', '我欢迎新的机会。'] },
        ],
        tip: '将 Daily Affirmations Chrome 扩展设置为新标签页，轻松保持连续打卡。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/30-day-affirmation-challenge',
        title: 'تحدي التأكيدات لمدة 30 يوماً: دليل كامل',
        description: 'برنامج منظم لمدة 30 يوماً مع تأكيدات يومية وتمارين بسيطة لتحويل طريقة التفكير خلال شهر.',
        date: '2024-06-18',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=630&fit=crop',
        dateDisplay: '18 يونيو 2024',
        h1: 'تحدي التأكيدات لمدة 30 يوماً: دليل كامل',
        intro: 'خطة بسيطة وفعالة: 5 دقائق يومياً لمدة 30 يوماً. موضوعات أسبوعية وتأكيدات جاهزة وتتبع خفيف.',
        alt: 'تقويم مُحدد لثلاثين يوماً',
        weeks: [
            { title: 'الأسبوع 1: الهدوء والحضور', items: ['أتنفس بهدوء وأشعر بالثبات.', 'أُطلق التوتر مع كل زفير.', 'أنا آمن في هذه اللحظة.'] },
            { title: 'الأسبوع 2: الثقة بالنفس', items: ['أثق بقراراتي.', 'أتحدث بوضوح وثقة.', 'أتعلّم وأتحسن كل يوم.'] },
            { title: 'الأسبوع 3: التركيز والإنتاجية', items: ['أُركز على ما يهم.', 'أستخدم وقتي بحكمة.', 'أُتمّ المهام بإتقان.'] },
            { title: 'الأسبوع 4: الامتنان والنمو', items: ['أُلاحظ الانتصارات الصغيرة.', 'ممتن للتقدم.', 'أرحب بالفرص الجديدة.'] },
        ],
        tip: 'اجعل امتداد Daily Affirmations صفحة التبويب الجديدة لتحافظ على الاستمرارية.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/30-day-affirmation-challenge',
        title: 'Desafio de 30 Dias de Afirmações: Guia Completo',
        description: 'Programa estruturado de 30 dias com afirmações diárias e exercícios simples para transformar sua mentalidade em um mês.',
        date: '2024-06-18',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=630&fit=crop',
        dateDisplay: '18 de junho de 2024',
        h1: 'Desafio de 30 Dias de Afirmações: Guia Completo',
        intro: 'Plano simples e eficaz: 5 minutos por dia por 30 dias. Temas semanais, afirmações prontas e acompanhamento leve.',
        alt: 'Calendário marcado por 30 dias',
        weeks: [
            { title: 'Semana 1: Calma e Presença', items: ['Respiro com calma e me sinto centrado.', 'Libero a tensão a cada expiração.', 'Estou seguro neste momento.'] },
            { title: 'Semana 2: Confiança', items: ['Confio nas minhas decisões.', 'Falo com clareza e confiança.', 'Aprendo e melhoro todos os dias.'] },
            { title: 'Semana 3: Foco e Produtividade', items: ['Foco no que mais importa.', 'Uso bem o meu tempo.', 'Concluo tarefas com cuidado.'] },
            { title: 'Semana 4: Gratidão e Crescimento', items: ['Percebo pequenas vitórias.', 'Sou grato pelo progresso.', 'Recebo novas oportunidades.'] },
        ],
        tip: 'Defina a extensão Daily Affirmations do Chrome como nova aba para manter a sequência.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/30-day-affirmation-challenge',
        title: '30-दिवसीय पुष्टिकरण चैलेंज: संपूर्ण गाइड',
        description: '30 दिनों का संगठित कार्यक्रम: दैनिक पुष्टिकरण और सरल अभ्यास, एक महीने में मानसिकता परिवर्तन।',
        date: '2024-06-18',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=630&fit=crop',
        dateDisplay: '18 जून 2024',
        h1: '30-दिवसीय पुष्टिकरण चैलेंज: संपूर्ण गाइड',
        intro: 'सरल और प्रभावी योजना: 30 दिनों तक रोज़ 5 मिनट। साप्ताहिक थीम, तैयार पुष्टिकरण और हल्का ट्रैकिंग।',
        alt: '30 दिनों के लिए चिह्नित कैलेंडर',
        weeks: [
            { title: 'सप्ताह 1: शांति और उपस्थिति', items: ['मैं शांत साँस लेता/लेती हूँ और स्थिर महसूस करता/करती हूँ।', 'हर साँस छोड़ते हुए तनाव छोड़ता/छोड़ती हूँ।', 'मैं इस क्षण में सुरक्षित हूँ।'] },
            { title: 'सप्ताह 2: आत्मविश्वास', items: ['मैं अपने निर्णयों पर भरोसा करता/करती हूँ।', 'मैं स्पष्ट और आत्मविश्वास से बोलता/बोलती हूँ।', 'मैं हर दिन सीखता/सीखती और बेहतर होता/होती हूँ।'] },
            { title: 'सप्ताह 3: फोकस और उत्पादकता', items: ['मैं जरूरी चीज़ों पर ध्यान देता/देती हूँ।', 'मैं अपना समय समझदारी से उपयोग करता/करती हूँ।', 'मैं काम ध्यान से पूरा करता/करती हूँ।'] },
            { title: 'सप्ताह 4: कृतज्ञता और विकास', items: ['मैं छोटी जीतें नोटिस करता/करती हूँ।', 'मैं प्रगति के लिए कृतज्ञ हूँ।', 'मैं नए अवसरों का स्वागत करता/करती हूँ।'] },
        ],
        tip: 'Daily Affirmations Chrome एक्सटेंशन को नई टैब बनाएं — स्ट्रीक बनाए रखना आसान होगा।'
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
                        {t.weeks.map((w: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{w.title}</h2>
                                <ul>
                                    {w.items.map((it: string, j: number) => (
                                        <li key={j}>{it}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">✅ {lang === 'ru' ? 'Как удерживать прогресс' : lang === 'zh' ? '如何保持进度' : lang === 'ar' ? 'كيفية الحفاظ على التقدم' : lang === 'pt' ? 'Como manter o progresso' : lang === 'hi' ? 'प्रगति कैसे बनाए रखें' : 'How to keep the streak'}</h3>
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
