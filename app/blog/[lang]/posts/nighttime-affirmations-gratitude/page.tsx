'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/nighttime-affirmations-gratitude',
        title: 'Nighttime Affirmations: Ending Your Day with Gratitude',
        description: 'Evening affirmations to release tension, reflect with gratitude, and prepare for restful sleep.',
        date: '2024-08-14',
        category: 'Mindfulness',
        image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&h=630&fit=crop',
        dateDisplay: 'August 14, 2024',
        h1: 'Nighttime Affirmations: Ending Your Day with Gratitude',
        intro: 'Close loops gently. Shift your mind from doing to being with a 3-minute evening ritual.',
        alt: 'Cozy night scene with warm light symbolizing evening calm',
        sets: [
            { h: 'Release & Reset', items: ['I release what I cannot change today.', 'I did enough for today.', 'I allow my body to rest.'] },
            { h: 'Gratitude', items: ['I notice one thing I’m grateful for.', 'Today had moments of meaning.', 'I appreciate my effort and care.'] },
            { h: 'Sleep Priming', items: ['My breath is slow and peaceful.', 'My mind can be quiet now.', 'I welcome deep, restoring sleep.'] },
        ],
        tip: 'Open a new tab before bed and read one set slowly using the Daily Affirmations extension.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/nighttime-affirmations-gratitude',
        title: 'Вечерние аффирмации: завершайте день с благодарностью',
        description: 'Вечерние аффирмации, чтобы отпустить напряжение, посмотреть на день с благодарностью и настроиться на восстановительный сон.',
        date: '2024-08-14',
        category: 'Осознанность',
        image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&h=630&fit=crop',
        dateDisplay: '14 августа 2024',
        h1: 'Вечерние аффирмации: завершайте день с благодарностью',
        intro: 'Мягко закрывайте «незакрытые петли». Переведите внимание из «делать» в «быть» с 3‑минутным вечерним ритуалом.',
        alt: 'Уютный вечерний интерьер — спокойствие и тепло',
        sets: [
            { h: 'Отпускание и перезапуск', items: ['Я отпускаю то, что сегодня не могу изменить.', 'На сегодня достаточно.', 'Я позволяю телу отдыхать.'] },
            { h: 'Благодарность', items: ['Я замечаю одну вещь, за которую благодарен(на).', 'В этом дне были моменты смысла.', 'Я ценю свои усилия и заботу.'] },
            { h: 'Подготовка ко сну', items: ['Моё дыхание спокойное и ровное.', 'Мой ум может сейчас быть тихим.', 'Я приветствую глубокий восстановительный сон.'] },
        ],
        tip: 'Откройте новую вкладку перед сном и прочитайте один набор медленно через расширение Daily Affirmations.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/nighttime-affirmations-gratitude',
        title: '夜间肯定语：以感恩结束一天',
        description: '晚间肯定语，释放紧张、带着感恩回顾，为安稳睡眠做准备。',
        date: '2024-08-14',
        category: '正念',
        image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&h=630&fit=crop',
        dateDisplay: '2024年8月14日',
        h1: '夜间肯定语：以感恩结束一天',
        intro: '温柔收尾。用3分钟夜间小仪式，让心从“做事”切换到“存在”。',
        alt: '温暖灯光的夜景，象征夜晚的安宁',
        sets: [
            { h: '释放与复位', items: ['我放下今天无法改变的事。', '今天已经足够了。', '我允许身体休息。'] },
            { h: '感恩', items: ['我注意到一件值得感恩的小事。', '今天有有意义的片刻。', '我欣赏自己的用心与努力。'] },
            { h: '睡眠准备', items: ['我的呼吸缓慢而平和。', '此刻我的大脑可以安静下来。', '我欢迎深度恢复性的睡眠。'] },
        ],
        tip: '睡前打开新标签页，配合扩展慢慢读一组肯定语。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/nighttime-affirmations-gratitude',
        title: 'تأكيدات المساء: إنهاء يومك بالامتنان',
        description: 'تأكيدات مسائية لإطلاق التوتر والتأمل بالامتنان والاستعداد لنوم مريح.',
        date: '2024-08-14',
        category: 'اليقظة',
        image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&h=630&fit=crop',
        dateDisplay: '14 أغسطس 2024',
        h1: 'تأكيدات المساء: إنهاء يومك بالامتنان',
        intro: 'أغلق الدوائر برفق. انتقل من الفعل إلى الكينونة بطقس مسائي مدته 3 دقائق.',
        alt: 'مشهد ليلي دافئ يرمز لهدوء المساء',
        sets: [
            { h: 'تحرّر وإعادة ضبط', items: ['أُطلق ما لا أستطيع تغييره اليوم.', 'لقد كان ما فعلته كافياً لليوم.', 'أسمح لجسدي أن يستريح.'] },
            { h: 'امتنان', items: ['ألاحظ شيئاً واحداً ممتناً له.', 'حمل هذا اليوم لحظات ذات معنى.', 'أقدّر جهدي واعتنائي.'] },
            { h: 'تهيئة للنوم', items: ['نفَسي بطيء ومسالم.', 'بإمكان ذهني أن يهدأ الآن.', 'أرحّب بنوم عميق مُرمّم.'] },
        ],
        tip: 'افتح لساناً جديداً قبل النوم واقرأ مجموعة ببطء عبر الامتداد.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/nighttime-affirmations-gratitude',
        title: 'Afirmações Noturnas: Terminando o Dia com Gratidão',
        description: 'Afirmações da noite para liberar tensão, refletir com gratidão e preparar um sono reparador.',
        date: '2024-08-14',
        category: 'Atenção Plena',
        image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&h=630&fit=crop',
        dateDisplay: '14 de agosto de 2024',
        h1: 'Afirmações Noturnas: Terminando o Dia com Gratidão',
        intro: 'Feche os ciclos com gentileza. Em 3 minutos, passe do fazer ao ser.',
        alt: 'Cena noturna aconchegante — calma da noite',
        sets: [
            { h: 'Liberar & Reiniciar', items: ['Eu libero o que não posso mudar hoje.', 'Hoje já foi o suficiente.', 'Permito que meu corpo descanse.'] },
            { h: 'Gratidão', items: ['Percebo uma coisa pela qual sou grato(a).', 'O dia teve momentos de significado.', 'Aprecio meu esforço e cuidado.'] },
            { h: 'Preparação para o Sono', items: ['Minha respiração é lenta e tranquila.', 'Minha mente pode ficar quieta agora.', 'Recebo um sono profundo e restaurador.'] },
        ],
        tip: 'Abra uma nova aba antes de dormir e leia um conjunto devagar usando a extensão Daily Affirmations.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/nighttime-affirmations-gratitude',
        title: 'रात्रि पुष्टिकरण: कृतज्ञता के साथ दिन का समापन',
        description: 'तनाव छोड़ने, कृतज्ञता से चिंतन करने और आरामदायक नींद की तैयारी के लिए शाम के पुष्टिकरण।',
        date: '2024-08-14',
        category: 'माइंडफुलनेस',
        image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&h=630&fit=crop',
        dateDisplay: '14 अगस्त 2024',
        h1: 'रात्रि पुष्टिकरण: कृतज्ञता के साथ दिन का समापन',
        intro: 'धीरे से अधूरे चक्र बंद करें। 3‑मिनट के शाम रिवाज़ से “करने” से “होने” की अवस्था में आएँ।',
        alt: 'आरामदायक रात का दृश्य — शाम की शांति',
        sets: [
            { h: 'रिलीज़ और रीसेट', items: ['मैं आज जो नहीं बदल सकता/सकती, उसे छोड़ देता/देती हूँ।', 'आज के लिए इतना पर्याप्त है।', 'मैं शरीर को विश्राम करने देता/देती हूँ।'] },
            { h: 'कृतज्ञता', items: ['मैं एक ऐसी चीज़ नोटिस करता/करती हूँ जिसके लिए आभारी हूँ।', 'आज अर्थपूर्ण पल थे।', 'मैं अपने प्रयास और देखभाल की सराहना करता/करती हूँ।'] },
            { h: 'नींद की तैयारी', items: ['मेरी श्वास धीमी और शांत है।', 'मेरा मन अब शांत हो सकता है।', 'मैं गहरी, पुनर्स्थापित करने वाली नींद का स्वागत करता/करती हूँ।'] },
        ],
        tip: 'सोने से पहले नई टैब खोलें और एक्सटेंशन के साथ एक सेट धीरे-धीरे पढ़ें।'
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
                        {t.sets.map((s: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{s.h}</h2>
                                <ul>
                                    {s.items.map((it: string, j: number) => (
                                        <li key={j}>{it}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🌙 {lang === 'ru' ? 'Спокойной ночи' : lang === 'zh' ? '晚安' : lang === 'ar' ? 'تصبح على خير' : lang === 'pt' ? 'Boa noite' : lang === 'hi' ? 'शुभ रात्रि' : 'Good night'}</h3>
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
