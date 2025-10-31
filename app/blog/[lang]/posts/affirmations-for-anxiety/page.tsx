'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/affirmations-for-anxiety',
        title: 'Affirmations for Anxiety: Calming Your Mind with Words',
        description: 'Science-backed affirmations to soothe anxiety and regain inner steadiness. Short phrases for real moments.',
        date: '2024-07-25',
        category: 'Mental Health',
        image: 'https://images.unsplash.com/photo-1505483531331-8640e66c4a52?w=1200&h=630&fit=crop',
        dateDisplay: 'July 25, 2024',
        h1: 'Affirmations for Anxiety: Calming Your Mind with Words',
        intro: 'Use brief, believable statements with breathing. Anchor your attention, reduce spirals, and move forward gently.',
        alt: 'Calm shoreline representing steady breath and calm mind',
        groups: [
            { h: 'In the Moment', items: ['I am safe in this moment.', 'I can breathe through this feeling.', 'This wave will pass; I am steady.'] },
            { h: 'Body & Breath', items: ['My breath is slow and helpful.', 'My body softens as I exhale.', 'I allow space and ease.'] },
            { h: 'Self-Compassion', items: ['It’s okay to feel this.', 'I offer myself patience and kindness.', 'I take one small step at a time.'] },
        ],
        tip: 'Pair one line with 3 breaths. Put it on your new tab via the Daily Affirmations extension.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/affirmations-for-anxiety',
        title: 'Аффирмации от тревоги: успокоение разума словами',
        description: 'Научно обоснованные аффирмации для успокоения тревоги и возвращения внутренней устойчивости.',
        date: '2024-07-25',
        category: 'Психическое здоровье',
        image: 'https://images.unsplash.com/photo-1505483531331-8640e66c4a52?w=1200&h=630&fit=crop',
        dateDisplay: '25 июля 2024',
        h1: 'Аффирмации от тревоги: успокоение разума словами',
        intro: 'Короткие правдоподобные фразы вместе с дыханием. Возвращают внимание, снижают накручивание и помогают мягко двигаться дальше.',
        alt: 'Спокойный берег — символ ровного дыхания и ясного ума',
        groups: [
            { h: 'Здесь и сейчас', items: ['Я в безопасности в этот момент.', 'Я могу продышать это чувство.', 'Эта волна уйдёт; я устойчив(а).'] },
            { h: 'Тело и дыхание', items: ['Моё дыхание спокойное и поддерживающее.', 'Тело мягко отпускает напряжение с выдохом.', 'Я позволяю пространству и лёгкости быть.'] },
            { h: 'Самосострадание', items: ['Это нормально — так чувствовать.', 'Я отношусь к себе терпеливо и доброжелательно.', 'Я делаю один маленький шаг за раз.'] },
        ],
        tip: 'Соедините одну фразу с 3 вдохами-выдохами. Закрепите на новой вкладке через расширение Daily Affirmations.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/affirmations-for-anxiety',
        title: '焦虑肯定语：用言语安抚内心',
        description: '经科学支持的肯定语，舒缓焦虑、恢复内在稳定。适用于真实情境的短句。',
        date: '2024-07-25',
        category: '心理健康',
        image: 'https://images.unsplash.com/photo-1505483531331-8640e66c4a52?w=1200&h=630&fit=crop',
        dateDisplay: '2024年7月25日',
        h1: '焦虑肯定语：用言语安抚内心',
        intro: '配合呼吸使用简短可信的语句。稳住注意力，减轻反复思绪，温柔向前。',
        alt: '平静海岸线象征稳健呼吸与平和心境',
        groups: [
            { h: '当下时刻', items: ['此刻我很安全。', '我能用呼吸穿越这种感觉。', '这股浪潮会过去；我很稳。'] },
            { h: '身体与呼吸', items: ['我的呼吸缓慢且有帮助。', '呼气时我的身体逐步放松。', '我允许空间与轻松存在。'] },
            { h: '自我关怀', items: ['这样感受也没关系。', '我对自己温柔并保持耐心。', '我一步一步向前。'] },
        ],
        tip: '将一句话配合三次呼吸，并用扩展将其固定在新标签页。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/affirmations-for-anxiety',
        title: 'تأكيدات للقلق: تهدئة العقل بالكلمات',
        description: 'تأكيدات مدعومة علمياً لتهدئة القلق واستعادة الثبات الداخلي.',
        date: '2024-07-25',
        category: 'الصحة العقلية',
        image: 'https://images.unsplash.com/photo-1505483531331-8640e66c4a52?w=1200&h=630&fit=crop',
        dateDisplay: '25 يوليو 2024',
        h1: 'تأكيدات للقلق: تهدئة العقل بالكلمات',
        intro: 'استخدم عبارات قصيرة قابلة للتصديق مع التنفس. ثبّت الانتباه، خفّف الدوران الذهني، وتقدّم بلطف.',
        alt: 'شاطئ هادئ يرمز للتنفس المستقر والعقل الهادئ',
        groups: [
            { h: 'في اللحظة', items: ['أنا آمن في هذه اللحظة.', 'أستطيع التنفس عبر هذا الإحساس.', 'سيمرّ هذا الموج؛ أنا ثابت.'] },
            { h: 'الجسد والتنفس', items: ['نفَسي بطيء ومفيد.', 'يرتخي جسدي مع الزفير.', 'أُفسح المجال للسهولة والراحة.'] },
            { h: 'الرفق بالذات', items: ['لا بأس أن أشعر بهذا.', 'أمنح نفسي صبراً ولطفاً.', 'أتقدم خطوة صغيرة تلو الأخرى.'] },
        ],
        tip: 'اربط عبارة واحدة بثلاثة أنفاس وثبّتها في لسان جديد عبر الامتداد.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/affirmations-for-anxiety',
        title: 'Afirmações para Ansiedade: Acalmando a Mente com Palavras',
        description: 'Afirmações com base científica para acalmar a ansiedade e recuperar a estabilidade interna.',
        date: '2024-07-25',
        category: 'Saúde Mental',
        image: 'https://images.unsplash.com/photo-1505483531331-8640e66c4a52?w=1200&h=630&fit=crop',
        dateDisplay: '25 de julho de 2024',
        h1: 'Afirmações para Ansiedade: Acalmando a Mente com Palavras',
        intro: 'Use frases breves e críveis com respiração. Ancore a atenção, reduza espirais e avance com suavidade.',
        alt: 'Costa calma representando respiração estável e mente tranquila',
        groups: [
            { h: 'No Momento', items: ['Estou seguro(a) neste momento.', 'Posso respirar através desta sensação.', 'Esta onda passará; eu permaneço estável.'] },
            { h: 'Corpo & Respiração', items: ['Minha respiração é lenta e útil.', 'Meu corpo amolece ao expirar.', 'Permito espaço e leveza.'] },
            { h: 'Autocompaixão', items: ['Está tudo bem sentir isso.', 'Ofereço a mim paciência e gentileza.', 'Dou um passo de cada vez.'] },
        ],
        tip: 'Vincule uma frase a 3 respirações e fixe na nova aba via a extensão Daily Affirmations.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/affirmations-for-anxiety',
        title: 'चिंता के लिए पुष्टिकरण: शब्दों से मन को शांत करना',
        description: 'वैज्ञानिक आधार वाले पुष्टिकरण जो चिंता को शांत करें और आंतरिक स्थिरता लौटाएँ।',
        date: '2024-07-25',
        category: 'मानसिक स्वास्थ्य',
        image: 'https://images.unsplash.com/photo-1505483531331-8640e66c4a52?w=1200&h=630&fit=crop',
        dateDisplay: '25 जुलाई 2024',
        h1: 'चिंता के लिए पुष्टिकरण: शब्दों से मन को शांत करना',
        intro: 'संक्षिप्त, विश्वसनीय पंक्तियाँ और श्वास के साथ अभ्यास। ध्यान स्थिर करें, विचारों के चक्र कम करें और धीरे आगे बढ़ें।',
        alt: 'शांत समुद्र-तट — स्थिर श्वास और शांत मन',
        groups: [
            { h: 'यही पल', items: ['मैं इस क्षण सुरक्षित हूँ।', 'मैं इस भावना को श्वास से पार कर सकता/सकती हूँ।', 'यह लहर गुज़र जाएगी; मैं स्थिर हूँ।'] },
            { h: 'शरीर और श्वास', items: ['मेरी श्वास धीमी और सहायक है।', 'श्वास छोड़ते हुए शरीर ढीला होता है।', 'मैं सहजता और स्थान आने देता/देती हूँ।'] },
            { h: 'स्व-कृपा', items: ['ऐसा महसूस करना ठीक है।', 'मैं अपने लिए धैर्य और दयालुता लाता/लाती हूँ।', 'मैं एक-एक छोटा कदम बढ़ाता/बढ़ाती हूँ।'] },
        ],
        tip: 'एक पंक्ति + 3 श्वास — और Daily Affirmations एक्सटेंशन में नई टैब पर पिन करें।'
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
                            <h3 className="text-xl font-semibold mb-4">🌬️ {lang === 'ru' ? 'Дышите вместе с фразой' : lang === 'zh' ? '配合呼吸' : lang === 'ar' ? 'تنفّس مع العبارة' : lang === 'pt' ? 'Respire com a frase' : lang === 'hi' ? 'पंक्ति के साथ श्वास' : 'Breathe with the line'}</h3>
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
