'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/affirmations-for-athletes',
        title: 'Affirmations for Athletes: Mental Training for Peak Performance',
        description: 'Powerful affirmations designed specifically for athletes. Learn how mental training through affirmations enhances performance, builds confidence, and helps achieve athletic goals.',
        date: '2025-06-17',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop',
        dateDisplay: 'June 17, 2025',
        h1: 'Affirmations for Athletes: Mental Training for Peak Performance',
        intro: 'Physical training builds strength; mental training builds resilience. Affirmations help athletes stay focused, confident, and composed under pressure.',
        alt: 'Athlete in motion representing peak performance and mental strength',
        areas: [
            { h: 'Pre-Performance', items: ['I am prepared and ready to compete at my best.', 'My body and mind work together in harmony.', 'I trust my training and my ability to execute.'] },
            { h: 'During Performance', items: ['I stay present and focused on each moment.', 'I move with precision, strength, and flow.', 'I recover quickly from setbacks and maintain composure.'] },
            { h: 'Recovery & Growth', items: ['I honor my body\'s need for rest and recovery.', 'Each practice makes me stronger and more skilled.', 'I celebrate progress and learn from every experience.'] },
        ],
        tip: 'Create a pre-competition ritual: Read your affirmations 10 minutes before events using the Daily Affirmations extension on your phone or tablet for easy access.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/affirmations-for-athletes',
        title: 'Аффирмации для спортсменов: ментальная подготовка для пиковой производительности',
        description: 'Сильные аффирмации для спортсменов. Как ментальная подготовка через аффирмации улучшает производительность, укрепляет уверенность и помогает достигать спортивных целей.',
        date: '2025-06-17',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop',
        dateDisplay: '17 июня 2025',
        h1: 'Аффирмации для спортсменов: ментальная подготовка для пиковой производительности',
        intro: 'Физическая подготовка строит силу; ментальная подготовка строит устойчивость. Аффирмации помогают спортсменам оставаться сосредоточенными, уверенными и собранными под давлением.',
        alt: 'Спортсмен в движении — символ пиковой производительности и ментальной силы',
        areas: [
            { h: 'Перед выступлением', items: ['Я подготовлен(а) и готов(а) соревноваться на максимуме.', 'Моё тело и разум работают вместе в гармонии.', 'Я доверяю своей подготовке и способности выполнять.'] },
            { h: 'Во время выступления', items: ['Я остаюсь присутствующим(ей) и сосредоточенным(ой) на каждом моменте.', 'Я двигаюсь с точностью, силой и потоком.', 'Я быстро восстанавливаюсь после неудач и сохраняю самообладание.'] },
            { h: 'Восстановление и рост', items: ['Я уважаю потребность своего тела в отдыхе и восстановлении.', 'Каждая тренировка делает меня сильнее и умелее.', 'Я праздную прогресс и учусь из каждого опыта.'] },
        ],
        tip: 'Создайте ритуал перед соревнованием: читайте аффирмации за 10 минут до события через расширение Daily Affirmations на телефоне или планшете для удобного доступа.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/affirmations-for-athletes',
        title: '运动员肯定语：巅峰表现的心理训练',
        description: '专为运动员设计的肯定语。了解通过肯定语的心理训练如何提升表现、建立信心并达成运动目标。',
        date: '2025-06-17',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop',
        dateDisplay: '2025年6月17日',
        h1: '运动员肯定语：巅峰表现的心理训练',
        intro: '身体训练建立力量；心理训练建立韧性。肯定语帮助运动员在压力下保持专注、自信和沉着。',
        alt: '运动中的运动员，代表巅峰表现与心理力量',
        areas: [
            { h: '赛前', items: ['我已准备充分，准备好以最佳状态比赛。', '我的身心协调配合。', '我相信我的训练与执行能力。'] },
            { h: '赛中', items: ['我保持当下与专注在每一刻。', '我精准、有力、流畅地移动。', '我从挫折中快速恢复并保持沉着。'] },
            { h: '恢复与成长', items: ['我尊重身体对休息与恢复的需求。', '每次训练都让我更强更有技巧。', '我庆祝进步并从每次经历中学习。'] },
        ],
        tip: '建立赛前仪式：在赛事前10分钟使用 Daily Affirmations 扩展（手机或平板）阅读肯定语，便于随时访问。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/affirmations-for-athletes',
        title: 'تأكيدات للرياضيين: التدريب العقلي للأداء القمة',
        description: 'تأكيدات قوية مصممة خصيصاً للرياضيين. تعلم كيف يعزز التدريب العقلي من خلال التأكيدات الأداء وبناء الثقة.',
        date: '2025-06-17',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop',
        dateDisplay: '17 يونيو 2025',
        h1: 'تأكيدات للرياضيين: التدريب العقلي للأداء القمة',
        intro: 'التدريب البدني يبني القوة؛ التدريب العقلي يبني المرونة. التأكيدات تساعد الرياضيين على البقاء مركزين وواثقين وهادئين تحت الضغط.',
        alt: 'رياضي في حركة يرمز للأداء القمة والقوة العقلية',
        areas: [
            { h: 'قبل الأداء', items: ['أنا مستعد وجاهز للمنافسة بأفضل ما لدي.', 'جسدي وعقلي يعملان معاً بتناغم.', 'أثق بتدريبي وقدرتي على التنفيذ.'] },
            { h: 'أثناء الأداء', items: ['أبقى حاضراً ومركزاً على كل لحظة.', 'أتحرك بدقة وقوة وتدفق.', 'أتعافى بسرعة من النكسات وأحافظ على الهدوء.'] },
            { h: 'التعافي والنمو', items: ['أكرم حاجة جسدي للراحة والتعافي.', 'كل تدريب يجعلني أقوى وأكثر مهارة.', 'أحتفل بالتقدم وأتعلم من كل تجربة.'] },
        ],
        tip: 'اصنع طقساً ما قبل المنافسة: اقرأ التأكيدات قبل 10 دقائق من الحدث عبر الامتداد على هاتفك أو جهازك اللوحي.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/affirmations-for-athletes',
        title: 'Afirmações para Atletas: Treinamento Mental para Desempenho de Pico',
        description: 'Afirmações poderosas para atletas. Como o treinamento mental através de afirmações melhora desempenho e constrói confiança.',
        date: '2025-06-17',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop',
        dateDisplay: '17 de junho de 2025',
        h1: 'Afirmações para Atletas: Treinamento Mental para Desempenho de Pico',
        intro: 'Treinamento físico constrói força; treinamento mental constrói resiliência. Afirmações ajudam atletas a manterem foco, confiança e compostura sob pressão.',
        alt: 'Atleta em movimento representando desempenho de pico e força mental',
        areas: [
            { h: 'Pré-Desempenho', items: ['Estou preparado(a) e pronto(a) para competir no meu melhor.', 'Meu corpo e mente trabalham juntos em harmonia.', 'Confio no meu treino e na minha capacidade de executar.'] },
            { h: 'Durante Desempenho', items: ['Fico presente e focado(a) em cada momento.', 'Me movimento com precisão, força e fluxo.', 'Me recupero rapidamente de contratempos e mantenho compostura.'] },
            { h: 'Recuperação & Crescimento', items: ['Honro a necessidade do meu corpo de descanso e recuperação.', 'Cada treino me torna mais forte e habilidoso(a).', 'Celebro progresso e aprendo de cada experiência.'] },
        ],
        tip: 'Crie um ritual pré-competição: Leia suas afirmações 10 minutos antes de eventos usando a extensão Daily Affirmations no telefone ou tablet para fácil acesso.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/affirmations-for-athletes',
        title: 'एथलीटों के लिए पुष्टिकरण: शीर्ष प्रदर्शन के लिए मानसिक प्रशिक्षण',
        description: 'एथलीटों के लिए विशेष रूप से डिज़ाइन किए गए शक्तिशाली पुष्टिकरण। जानें कि पुष्टिकरण के माध्यम से मानसिक प्रशिक्षण प्रदर्शन को कैसे बढ़ाता है और आत्मविश्वास बनाता है।',
        date: '2025-06-17',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop',
        dateDisplay: '17 जून 2025',
        h1: 'एथलीटों के लिए पुष्टिकरण: शीर्ष प्रदर्शन के लिए मानसिक प्रशिक्षण',
        intro: 'शारीरिक प्रशिक्षण शक्ति बनाता है; मानसिक प्रशिक्षण लचीलापन बनाता है। पुष्टिकरण एथलीटों को दबाव में फोकस, आत्मविश्वास और संयम बनाए रखने में मदद करते हैं।',
        alt: 'गति में एथलीट — शीर्ष प्रदर्शन और मानसिक शक्ति का प्रतीक',
        areas: [
            { h: 'प्रदर्शन से पहले', items: ['मैं तैयार हूँ/हूँ और अपना सर्वश्रेष्ठ प्रदर्शन करने के लिए तैयार हूँ।', 'मेरा शरीर और मन मिलकर सामंजस्य में काम करते हैं।', 'मैं अपने प्रशिक्षण और निष्पादन क्षमता पर भरोसा करता/करती हूँ।'] },
            { h: 'प्रदर्शन के दौरान', items: ['मैं प्रत्येक क्षण में वर्तमान और फोकस बनाए रखता/रखती हूँ।', 'मैं सटीकता, शक्ति और प्रवाह के साथ चलता/चलती हूँ।', 'मैं असफलताओं से जल्दी उबरता/उबरती हूँ और संयम बनाए रखता/रखती हूँ।'] },
            { h: 'पुनर्प्राप्ति और विकास', items: ['मैं अपने शरीर की आराम और पुनर्प्राप्ति की जरूरत का सम्मान करता/करती हूँ।', 'हर अभ्यास मुझे मजबूत और अधिक कुशल बनाता है।', 'मैं प्रगति का जश्न मनाता/मनाती हूँ और हर अनुभव से सीखता/सीखती हूँ।'] },
        ],
        tip: 'प्रतियोगिता-पूर्व अनुष्ठान बनाएं: Daily Affirmations एक्सटेंशन का उपयोग करके (फोन या टैबलेट पर) इवेंट से 10 मिनट पहले अपने पुष्टिकरण पढ़ें — आसान पहुँच के लिए।'
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
                        {t.areas.map((a: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{a.h}</h2>
                                <ul>
                                    {a.items.map((it: string, j: number) => (
                                        <li key={j}>{it}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🏆 {lang === 'ru' ? 'Ментальная подготовка' : lang === 'zh' ? '心理训练' : lang === 'ar' ? 'التدريب العقلي' : lang === 'pt' ? 'Treinamento mental' : lang === 'hi' ? 'मानसिक प्रशिक्षण' : 'Mental training'}</h3>
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

