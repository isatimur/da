'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/digital-wellness-affirmations',
        title: 'Digital Wellness: Using Technology for Positive Mindset',
        description: 'Mindful tech habits with affirmations. Reduce noise, keep focus, and use tools that support well-being.',
        date: '2026-01-15',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&h=630&fit=crop',
        dateDisplay: 'January 15, 2026',
        h1: 'Digital Wellness: Using Technology for Positive Mindset',
        intro: 'Technology can distract—or support. Pair simple affirmations with small habits to keep your attention and mood steady.',
        alt: 'Phone on a tidy desk with calm background representing digital wellness',
        sections: [
            { heading: 'Daily Tech Hygiene', items: ['I choose what I consume.', 'I mute what drains my energy.', 'I keep notifications intentional.'] },
            { heading: 'Focus While Online', items: ['I return to my task calmly.', 'I use tools that reduce friction.', 'I protect deep work time.'] },
            { heading: 'Healthy Boundaries', items: ['I pause before opening apps.', 'I end screens with gratitude.', 'I sleep with a quiet mind.'] },
        ],
        tip: 'Set the Daily Affirmations extension on your new tab for a calm start and gentle reminders through the day.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/digital-wellness-affirmations',
        title: 'Цифровое благополучие: технологии для позитивного мышления',
        description: 'Осознанные цифровые привычки с аффирмациями. Меньше шума, больше фокуса и инструменты, поддерживающие здоровье.',
        date: '2026-01-15',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&h=630&fit=crop',
        dateDisplay: '15 января 2026',
        h1: 'Цифровое благополучие: технологии для позитивного мышления',
        intro: 'Технологии могут отвлекать — а могут поддерживать. Свяжите простые аффирмации с небольшими привычками, чтобы удерживать внимание и настроение.',
        alt: 'Телефон на аккуратном столе — символ цифрового благополучия',
        sections: [
            { heading: 'Ежедневная цифровая гигиена', items: ['Я осознанно выбираю контент.', 'Я отключаю то, что выматывает.', 'Мои уведомления — только по делу.'] },
            { heading: 'Фокус онлайн', items: ['Я спокойно возвращаюсь к задаче.', 'Я использую инструменты, уменьшающие трение.', 'Я защищаю время глубокой работы.'] },
            { heading: 'Здоровые границы', items: ['Я делаю паузу перед открытием приложений.', 'Я завершаю экран с благодарностью.', 'Я засыпаю с тихим умом.'] },
        ],
        tip: 'Сделайте расширение Daily Affirmations новой вкладкой — спокойный старт дня и мягкие напоминания.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/digital-wellness-affirmations',
        title: '数字健康：用技术支持积极心态',
        description: '结合肯定语的正念用机习惯。减少噪音、保持专注，选择支持幸福感的工具。',
        date: '2026-01-15',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&h=630&fit=crop',
        dateDisplay: '2026年1月15日',
        h1: '数字健康：用技术支持积极心态',
        intro: '科技既能分心，也能助力。配合简单肯定语与小习惯，保持专注与情绪稳定。',
        alt: '整洁桌面上的手机，代表数字健康',
        sections: [
            { heading: '每日数字卫生', items: ['我有意识地选择内容。', '我静音消耗精力的信息。', '我让通知更有目的。'] },
            { heading: '在线时的专注', items: ['我平静回到任务。', '我使用减少摩擦的工具。', '我保护深度工作时间。'] },
            { heading: '健康边界', items: ['打开应用前我先暂停。', '我以感恩结束屏幕时间。', '我带着安静的心入睡。'] },
        ],
        tip: '将 Daily Affirmations 扩展设为新标签页，获得平静开端与全天柔和提醒。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/digital-wellness-affirmations',
        title: 'العافية الرقمية: استخدام التكنولوجيا لعقلية إيجابية',
        description: 'عادات تقنية واعية مع التأكيدات. قلل الضوضاء واحفظ التركيز واختر أدوات تدعم الرفاهية.',
        date: '2026-01-15',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&h=630&fit=crop',
        dateDisplay: '15 يناير 2026',
        h1: 'العافية الرقمية: استخدام التكنولوجيا لعقلية إيجابية',
        intro: 'يمكن للتكنولوجيا أن تشتت — أو تدعم. اجمع بين التأكيدات والعادات الصغيرة للحفاظ على الانتباه والمزاج مستقرين.',
        alt: 'هاتف على مكتب مرتب يرمز للعافية الرقمية',
        sections: [
            { heading: 'نظافة تقنية يومية', items: ['أختار ما أستهلكه بوعي.', 'أكتم ما يستنزف طاقتي.', 'أجعل الإشعارات مقصودة.'] },
            { heading: 'التركيز أثناء الاتصال', items: ['أعود لمهمتي بهدوء.', 'أستخدم أدوات تقلل الاحتكاك.', 'أحمي وقت العمل العميق.'] },
            { heading: 'حدود صحية', items: ['أتوقف قبل فتح التطبيقات.', 'أنهي وقت الشاشة بامتنان.', 'أنام بذهن هادئ.'] },
        ],
        tip: 'اجعل امتداد Daily Affirmations صفحة تبويب جديدة لبداية هادئة وتذكيرات لطيفة طوال اليوم.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/digital-wellness-affirmations',
        title: 'Bem-estar Digital: Usando Tecnologia para uma Mente Positiva',
        description: 'Hábitos tecnológicos conscientes com afirmações. Reduza ruído, mantenha foco e use ferramentas que apoiam o bem-estar.',
        date: '2026-01-15',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&h=630&fit=crop',
        dateDisplay: '15 de janeiro de 2026',
        h1: 'Bem-estar Digital: Usando Tecnologia para uma Mente Positiva',
        intro: 'A tecnologia pode distrair — ou apoiar. Combine afirmações com pequenos hábitos para manter atenção e humor estáveis.',
        alt: 'Telefone em mesa organizada — bem-estar digital',
        sections: [
            { heading: 'Higiene Tecnológica Diária', items: ['Eu escolho o que consumo.', 'Silencio o que drena minha energia.', 'Mantenho notificações intencionais.'] },
            { heading: 'Foco Online', items: ['Eu retorno à tarefa com calma.', 'Uso ferramentas que reduzem atrito.', 'Protejo meu tempo de foco profundo.'] },
            { heading: 'Limites Saudáveis', items: ['Pauso antes de abrir apps.', 'Termino a tela com gratidão.', 'Durmo com a mente tranquila.'] },
        ],
        tip: 'Defina a extensão Daily Affirmations como nova aba para um começo calmo e lembretes ao longo do dia.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/digital-wellness-affirmations',
        title: 'डिजिटल वेलनेस: सकारात्मक मानसिकता के लिए तकनीक का उपयोग',
        description: 'पुष्टिकरण के साथ सचेत डिजिटल आदतें। शोर कम करें, फोकस रखें और कल्याण समर्थक टूल्स चुनें।',
        date: '2026-01-15',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&h=630&fit=crop',
        dateDisplay: '15 जनवरी 2026',
        h1: 'डिजिटल वेलनेस: सकारात्मक मानसिकता के लिए तकनीक का उपयोग',
        intro: 'तकनीक ध्यान भटका सकती है — या सहारा दे सकती है। सरल पुष्टिकरणों को छोटे आदतों से जोड़ें, ताकि ध्यान और मूड स्थिर रहे।',
        alt: 'डिजिटल वेलनेस दर्शाता सुसज्जित डेस्क और फोन',
        sections: [
            { heading: 'दैनिक टेक हाइजीन', items: ['मैं क्या देखता/देखती हूँ, इसे चुनता/चुनती हूँ।', 'मैं ऊर्जा घटाने वाले स्रोत म्यूट करता/करती हूँ।', 'मेरी सूचनाएँ उद्देश्यपूर्ण हैं।'] },
            { heading: 'ऑनलाइन रहते हुए फोकस', items: ['मैं शांति से कार्य पर लौटता/लौटती हूँ।', 'मैं घर्षण घटाने वाले टूल्स उपयोग करता/करती हूँ।', 'मैं डीप वर्क समय की रक्षा करता/करती हूँ।'] },
            { heading: 'स्वस्थ सीमाएँ', items: ['ऐप खोलने से पहले ठहरता/ठहरती हूँ।', 'मैं स्क्रीन समय कृतज्ञता के साथ समाप्त करता/करती हूँ।', 'मैं शांत मन से सोता/सोती हूँ।'] },
        ],
        tip: 'Daily Affirmations एक्सटेंशन को नई टैब बनाएं — शांत शुरुआत और दिनभर कोमल रिमाइंडर।'
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
                                <h2>{s.heading}</h2>
                                <ul>
                                    {s.items.map((it: string, j: number) => (
                                        <li key={j}>{it}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🧘 {lang === 'ru' ? 'Осознанная цифровая среда' : lang === 'zh' ? '正念数字环境' : lang === 'ar' ? 'بيئة رقمية واعية' : lang === 'pt' ? 'Ambiente Digital Consciente' : lang === 'hi' ? 'सचेत डिजिटल माहौल' : 'Mindful Digital Environment'}</h3>
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
