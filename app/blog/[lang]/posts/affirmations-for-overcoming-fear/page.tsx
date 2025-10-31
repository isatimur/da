'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/affirmations-for-overcoming-fear',
        title: 'Affirmations for Overcoming Fear and Self-Doubt',
        description: 'Powerful affirmations to overcome fear, self-doubt, and limiting beliefs. Proven techniques to build courage and move past fears.',
        date: '2025-04-09',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: 'April 9, 2025',
        h1: 'Affirmations for Overcoming Fear and Self-Doubt',
        intro: 'Fear is a signal, not a stop sign. Use affirmations to acknowledge fear while choosing courage and action.',
        alt: 'Person looking forward with confidence, overcoming fear',
        groups: [
            { h: 'Courage', items: ['I feel fear and move forward anyway.', 'Courage is choosing action despite fear.', 'I trust myself to handle whatever comes.'] },
            { h: 'Growth Mindset', items: ['Challenges help me grow.', 'I learn from mistakes and try again.', 'I am stronger than my fears.'] },
            { h: 'Self-Belief', items: ['I have overcome challenges before.', 'I am capable of more than I think.', 'I believe in my ability to adapt.'] },
        ],
        tip: 'Pair these affirmations with the Daily Affirmations extension. Read them before facing situations that trigger fear—this primes your mind for courage.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/affirmations-for-overcoming-fear',
        title: 'Аффирмации для преодоления страха и сомнений',
        description: 'Сильные аффирмации для преодоления страха, сомнений и ограничивающих убеждений. Проверенные техники для развития смелости.',
        date: '2025-04-09',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: '9 апреля 2025',
        h1: 'Аффирмации для преодоления страха и сомнений',
        intro: 'Страх — это сигнал, а не знак остановки. Используйте аффирмации, чтобы признать страх и выбрать смелость и действие.',
        alt: 'Человек смотрит вперёд с уверенностью, преодолевая страх',
        groups: [
            { h: 'Смелость', items: ['Я чувствую страх и всё равно двигаюсь вперёд.', 'Смелость — это выбор действия несмотря на страх.', 'Я доверяю себе справиться с чем угодно.'] },
            { h: 'Мышление роста', items: ['Вызовы помогают мне расти.', 'Я учусь на ошибках и пробую снова.', 'Я сильнее своих страхов.'] },
            { h: 'Вера в себя', items: ['Я уже преодолевал(а) трудности раньше.', 'Я способен(на) на большее, чем думаю.', 'Я верю в свою способность адаптироваться.'] },
        ],
        tip: 'Объедините эти аффирмации с расширением Daily Affirmations. Читайте их перед ситуациями, вызывающими страх — это настроит ум на смелость.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/affirmations-for-overcoming-fear',
        title: '克服恐惧和自我怀疑的肯定语',
        description: '克服恐惧、自我怀疑和限制性信念的肯定语。经验证的技巧，建立勇气、越过恐惧。',
        date: '2025-04-09',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: '2025年4月9日',
        h1: '克服恐惧和自我怀疑的肯定语',
        intro: '恐惧是信号，不是停止标志。用肯定语承认恐惧，同时选择勇气与行动。',
        alt: '自信向前的人，克服恐惧',
        groups: [
            { h: '勇气', items: ['我感受到恐惧，但仍向前。', '勇气是在恐惧中仍选择行动。', '我相信自己能应对任何情况。'] },
            { h: '成长心态', items: ['挑战帮助我成长。', '我从错误中学习并再试。', '我比恐惧更强大。'] },
            { h: '自我信念', items: ['我曾克服过挑战。', '我的能力超出我的想象。', '我相信自己的适应能力。'] },
        ],
        tip: '将这些肯定语与 Daily Affirmations 扩展结合使用。在面对引发恐惧的情况前阅读它们，为内心注入勇气。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/affirmations-for-overcoming-fear',
        title: 'تأكيدات للتغلب على الخوف والشك الذاتي',
        description: 'تأكيدات قوية للتغلب على الخوف والشك الذاتي والمعتقدات المحدودة. تقنيات مثبتة لبناء الشجاعة.',
        date: '2025-04-09',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: '9 أبريل 2025',
        h1: 'تأكيدات للتغلب على الخوف والشك الذاتي',
        intro: 'الخوف إشارة، ليس علامة توقف. استخدم التأكيدات للاعتراف بالخوف مع اختيار الشجاعة والفعل.',
        alt: 'شخص ينظر للأمام بثقة، يتغلب على الخوف',
        groups: [
            { h: 'الشجاعة', items: ['أشعر بالخوف ومع ذلك أتابع.', 'الشجاعة هي اختيار الفعل رغم الخوف.', 'أثق بنفسي للتعامل مع أي شيء يأتي.'] },
            { h: 'عقلية النمو', items: ['التحديات تساعدني على النمو.', 'أتعلّم من الأخطاء وأحاول مجدداً.', 'أنا أقوى من مخاوفي.'] },
            { h: 'الإيمان بالذات', items: ['تغلبت على التحديات من قبل.', 'أنا قادر على أكثر مما أعتقد.', 'أؤمن بقدرتي على التكيف.'] },
        ],
        tip: 'اربط هذه التأكيدات بالامتداد. اقرأها قبل مواجهة المواقف التي تثير الخوف — هذا يهيئ عقلك للشجاعة.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/affirmations-for-overcoming-fear',
        title: 'Afirmações para Superar Medo e Autodúvida',
        description: 'Afirmações poderosas para superar medo, autodúvida e crenças limitantes. Técnicas comprovadas para construir coragem.',
        date: '2025-04-09',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: '9 de abril de 2025',
        h1: 'Afirmações para Superar Medo e Autodúvida',
        intro: 'Medo é um sinal, não um sinal de parada. Use afirmações para reconhecer medo enquanto escolhe coragem e ação.',
        alt: 'Pessoa olhando adiante com confiança, superando medo',
        groups: [
            { h: 'Coragem', items: ['Sinto medo e sigo em frente mesmo assim.', 'Coragem é escolher ação apesar do medo.', 'Confio em mim para lidar com o que vier.'] },
            { h: 'Mentalidade de Crescimento', items: ['Desafios me ajudam a crescer.', 'Aprendo com erros e tento novamente.', 'Sou mais forte que meus medos.'] },
            { h: 'Autoconfiança', items: ['Já superei desafios antes.', 'Sou capaz de mais do que penso.', 'Acredito na minha capacidade de me adaptar.'] },
        ],
        tip: 'Combine essas afirmações com a extensão Daily Affirmations. Leia-as antes de enfrentar situações que despertam medo—isso prepara sua mente para coragem.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/affirmations-for-overcoming-fear',
        title: 'भय और आत्मसंदेह को दूर करने के लिए पुष्टिकरण',
        description: 'भय, आत्मसंदेह और सीमित विश्वासों को दूर करने के लिए शक्तिशाली पुष्टिकरण। साहस बनाने की सिद्ध तकनीकें।',
        date: '2025-04-09',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: '9 अप्रैल 2025',
        h1: 'भय और आत्मसंदेह को दूर करने के लिए पुष्टिकरण',
        intro: 'भय एक संकेत है, रोकने का संकेत नहीं। साहस और कार्रवाई चुनते हुए भय को स्वीकार करने के लिए पुष्टिकरण का उपयोग करें।',
        alt: 'आत्मविश्वास से आगे देखता व्यक्ति, भय पर विजय',
        groups: [
            { h: 'साहस', items: ['मैं भय महसूस करता/करती हूँ और फिर भी आगे बढ़ता/बढ़ती हूँ।', 'साहस भय के बावजूद कार्रवाई चुनना है।', 'मैं खुद पर विश्वास करता/करती हूँ कि जो भी आए उसे संभालूँगा/संभालूँगी।'] },
            { h: 'विकास मानसिकता', items: ['चुनौतियाँ मुझे बढ़ने में मदद करती हैं।', 'मैं गलतियों से सीखता/सीखती हूँ और फिर कोशिश करता/करती हूँ।', 'मैं अपने भय से मजबूत हूँ।'] },
            { h: 'आत्म-विश्वास', items: ['मैंने पहले चुनौतियों पर विजय पाई है।', 'मैं अपने विचार से अधिक सक्षम हूँ।', 'मैं अपनी अनुकूलन क्षमता में विश्वास करता/करती हूँ।'] },
        ],
        tip: 'Daily Affirmations एक्सटेंशन के साथ इन पुष्टिकरणों को जोड़ें। भय उत्पन्न करने वाली स्थितियों से पहले उन्हें पढ़ें — यह आपके मन को साहस के लिए तैयार करता है।'
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
                        {t.groups.map((g: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{g.h}</h2>
                                <ul>
                                    {g.items.map((it: string, j: number) => (
                                        <li key={j}>{it}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">💪 {lang === 'ru' ? 'Построение мужества' : lang === 'zh' ? '建立勇气' : lang === 'ar' ? 'بناء الشجاعة' : lang === 'pt' ? 'Construindo coragem' : lang === 'hi' ? 'साहस बनाना' : 'Building courage'}</h3>
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

