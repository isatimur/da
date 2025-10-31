'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/mindfulness-and-affirmations',
        title: 'Mindfulness and Affirmations: A Perfect Pair',
        description: 'How mindfulness and affirmations work together for deeper transformation. Practical techniques and integration tips.',
        date: '2024-12-03',
        category: 'Mindfulness',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop',
        dateDisplay: 'December 3, 2024',
        h1: 'Mindfulness and Affirmations: A Perfect Pair',
        intro: 'Mindfulness grounds you in the present; affirmations guide your direction. Together, they create lasting shifts.',
        alt: 'Serene landscape representing mindful awareness',
        steps: [
            { h: 'Start Present', p: 'Take 3 breaths. Notice your body and current state. This primes the mind to receive affirmations.' },
            { h: 'State Your Intention', p: 'Say your affirmation with full attention. Feel the words; notice any resistance without judgment.' },
            { h: 'Return to Breath', p: 'Close with 2 more breaths, letting the phrase settle. Repeat 2–3 times daily for consistency.' },
        ],
        tip: 'Combine both practices by setting your affirmations on the Daily Affirmations extension—read mindfully each time you open a new tab.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/mindfulness-and-affirmations',
        title: 'Осознанность и аффирмации: идеальная пара',
        description: 'Как осознанность и аффирмации работают вместе для более глубокой трансформации. Практические техники и советы по интеграции.',
        date: '2024-12-03',
        category: 'Осознанность',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop',
        dateDisplay: '3 декабря 2024',
        h1: 'Осознанность и аффирмации: идеальная пара',
        intro: 'Осознанность заземляет в настоящем; аффирмации задают направление. Вместе они создают устойчивые сдвиги.',
        alt: 'Спокойный пейзаж — символ осознанного присутствия',
        steps: [
            { h: 'Начните с присутствия', p: 'Сделайте 3 вдоха. Отметьте тело и текущее состояние. Это настраивает ум на приём аффирмаций.' },
            { h: 'Озвучьте намерение', p: 'Произнесите аффирмацию с полным вниманием. Почувствуйте слова; заметьте сопротивление без осуждения.' },
            { h: 'Вернитесь к дыханию', p: 'Завершите 2 вдохами, позволяя фразе улечься. Повторяйте 2–3 раза в день для последовательности.' },
        ],
        tip: 'Объедините обе практики: закрепите аффирмации в расширении Daily Affirmations — читайте осознанно каждый раз, открывая новую вкладку.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/mindfulness-and-affirmations',
        title: '正念与肯定语：完美搭配',
        description: '正念与肯定语如何共同作用实现更深层转化。实用技巧与整合建议。',
        date: '2024-12-03',
        category: '正念',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop',
        dateDisplay: '2024年12月3日',
        h1: '正念与肯定语：完美搭配',
        intro: '正念让你扎根当下；肯定语指引方向。两者结合带来持续转变。',
        alt: '宁静风景象征正念觉知',
        steps: [
            { h: '从当下开始', p: '3次呼吸。觉察身体与当前状态。这为接受肯定语做好准备。' },
            { h: '表达意图', p: '全神贯注地说出肯定语。感受词句；不带评判地注意任何抗拒。' },
            { h: '回到呼吸', p: '再2次呼吸收尾，让语句沉淀。每日2–3次以保持连续性。' },
        ],
        tip: '将肯定语设置在扩展的新标签页，每次打开时正念阅读，同时结合两种练习。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/mindfulness-and-affirmations',
        title: 'اليقظة والتأكيدات: ثنائي مثالي',
        description: 'كيف تعمل اليقظة والتأكيدات معاً للتحول الأعمق. تقنيات عملية ونصائح دمج.',
        date: '2024-12-03',
        category: 'اليقظة',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop',
        dateDisplay: '3 ديسمبر 2024',
        h1: 'اليقظة والتأكيدات: ثنائي مثالي',
        intro: 'اليقظة تُجذرك في الحاضر؛ التأكيدات تُرشد اتجاهك. معاً، يخلقان تحولات دائمة.',
        alt: 'منظر طبيعي هادئ يرمز للوعي اليقظ',
        steps: [
            { h: 'ابدأ بالحضور', p: '3 أنفاس. لاحظ جسدك وحالتك الحالية. هذا يهيئ العقل لتلقّي التأكيدات.' },
            { h: 'عبّر عن قصدك', p: 'قل تأكيدك بتركيز كامل. اشعر بالكلمات؛ لاحظ أي مقاومة بلا حكم.' },
            { h: 'عد للتنفس', p: 'اختتم بأنفاسين آخرين، دع العبارة تستقر. كرّر 2–3 مرات يومياً للثبات.' },
        ],
        tip: 'اجمع الممارستين بضبط التأكيدات في الامتداد — اقرأ بوَعي كلما فتحت لساناً جديداً.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/mindfulness-and-affirmations',
        title: 'Atenção Plena e Afirmações: Um Par Perfeito',
        description: 'Como atenção plena e afirmações trabalham juntas para transformação mais profunda. Técnicas práticas e dicas de integração.',
        date: '2024-12-03',
        category: 'Atenção Plena',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop',
        dateDisplay: '3 de dezembro de 2024',
        h1: 'Atenção Plena e Afirmações: Um Par Perfeito',
        intro: 'A atenção plena te ancora no presente; as afirmações guiam sua direção. Juntas, criam mudanças duradouras.',
        alt: 'Paisagem serena representando consciência plena',
        steps: [
            { h: 'Comece Presente', p: '3 respirações. Perceba seu corpo e estado atual. Isso prepara a mente para receber afirmações.' },
            { h: 'Declare Sua Intenção', p: 'Diga sua afirmação com atenção total. Sinta as palavras; note qualquer resistência sem julgamento.' },
            { h: 'Volte à Respiração', p: 'Feche com mais 2 respirações, deixando a frase se estabelecer. Repita 2–3 vezes por dia para consistência.' },
        ],
        tip: 'Combine ambas as práticas configurando suas afirmações na extensão Daily Affirmations — leia com atenção toda vez que abrir uma nova aba.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/mindfulness-and-affirmations',
        title: 'माइंडफुलनेस और पुष्टिकरण: एक सही जोड़ी',
        description: 'माइंडफुलनेस और पुष्टिकरण कैसे गहरे बदलाव के लिए एक साथ काम करते हैं। व्यावहारिक तकनीक और एकीकरण सुझाव।',
        date: '2024-12-03',
        category: 'माइंडफुलनेस',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop',
        dateDisplay: '3 दिसम्बर 2024',
        h1: 'माइंडफुलनेस और पुष्टिकरण: एक सही जोड़ी',
        intro: 'माइंडफुलनेस आपको वर्तमान में जमाती है; पुष्टिकरण दिशा देते हैं। साथ में, वे स्थायी बदलाव बनाते हैं।',
        alt: 'शांत दृश्य — सचेत जागरूकता का प्रतीक',
        steps: [
            { h: 'वर्तमान से शुरू करें', p: '3 श्वास लें। अपने शरीर और वर्तमान अवस्था को नोटिस करें। यह मन को पुष्टिकरण लेने के लिए तैयार करता है।' },
            { h: 'अपना इरादा बताएँ', p: 'पूरे ध्यान से अपना पुष्टिकरण बोलें। शब्दों को महसूस करें; बिना निर्णय के कोई प्रतिरोध नोटिस करें।' },
            { h: 'श्वास पर वापस जाएँ', p: '2 और श्वास से बंद करें, वाक्य को बसने दें। निरंतरता के लिए दिन में 2–3 बार दोहराएँ।' },
        ],
        tip: 'दोनों अभ्यास जोड़ें: एक्सटेंशन में पुष्टिकरण सेट करें — हर बार नई टैब खोलते समय सचेत होकर पढ़ें।'
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
                        {t.steps.map((s: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{s.h}</h2>
                                <p>{s.p}</p>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🧘 {lang === 'ru' ? 'Интеграция практик' : lang === 'zh' ? '整合练习' : lang === 'ar' ? 'دمج الممارسات' : lang === 'pt' ? 'Integrando práticas' : lang === 'hi' ? 'अभ्यास एकीकरण' : 'Integrating practices'}</h3>
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

