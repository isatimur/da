'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/affirmations-for-mothers',
        title: 'Affirmations for Mothers: Self-Care Through Positive Thinking',
        description: 'Powerful affirmations designed specifically for mothers to promote self-care, reduce mom guilt, build confidence, and maintain balance during parenthood.',
        date: '2025-09-19',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1200&h=630&fit=crop',
        dateDisplay: 'September 19, 2025',
        h1: 'Affirmations for Mothers: Self-Care Through Positive Thinking',
        intro: 'Parenting is demanding. Use affirmations to honor your effort, release guilt, and nurture yourself while caring for others.',
        alt: 'Mother with child in peaceful moment representing self-care',
        groups: [
            { h: 'Self-Care', items: ['I prioritize my well-being to be present for my family.', 'Taking time for myself makes me a better parent.', 'My needs matter and deserve attention.'] },
            { h: 'Releasing Guilt', items: ['I am doing my best and that is enough.', 'It\'s okay to make mistakes; I learn and grow.', 'I release comparison and honor my unique path.'] },
            { h: 'Strength & Balance', items: ['I am strong, capable, and resilient.', 'I balance caring for others with caring for myself.', 'Each day I grow in patience and wisdom.'] },
        ],
        tip: 'Set these affirmations as your new tab with the Daily Affirmations extension. Take 30 seconds before responding to notifications to read one—this creates a moment of pause and presence.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/affirmations-for-mothers',
        title: 'Аффирмации для матерей: самозабота через позитивное мышление',
        description: 'Сильные аффирмации для матерей, способствующие самозаботе, снижению чувства вины, укреплению уверенности и балансу в родительстве.',
        date: '2025-09-19',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1200&h=630&fit=crop',
        dateDisplay: '19 сентября 2025',
        h1: 'Аффирмации для матерей: самозабота через позитивное мышление',
        intro: 'Родительство требует много сил. Используйте аффирмации, чтобы ценить свои усилия, отпускать вину и заботиться о себе, заботясь о других.',
        alt: 'Мать с ребёнком в спокойный момент — символ самозаботы',
        groups: [
            { h: 'Самозабота', items: ['Я ставлю своё благополучие в приоритет, чтобы быть присутствующей для семьи.', 'Время для себя делает меня лучшим родителем.', 'Мои потребности важны и заслуживают внимания.'] },
            { h: 'Освобождение от вины', items: ['Я делаю всё возможное, и этого достаточно.', 'Нормально ошибаться; я учусь и расту.', 'Я отпускаю сравнения и ценю свой уникальный путь.'] },
            { h: 'Сила и баланс', items: ['Я сильная, способная и устойчивая.', 'Я балансирую заботу о других с заботой о себе.', 'Каждый день я расту в терпении и мудрости.'] },
        ],
        tip: 'Установите эти аффирмации на новую вкладку через расширение Daily Affirmations. Отвечая на уведомления, выделите 30 секунд, чтобы прочитать одну — это создаёт момент паузы и присутствия.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/affirmations-for-mothers',
        title: '给母亲的肯定语：通过积极思维实现自我关怀',
        description: '专为母亲设计的肯定语，促进自我关怀、减少内疚、建立信心，并在育儿过程中保持平衡。',
        date: '2025-09-19',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1200&h=630&fit=crop',
        dateDisplay: '2025年9月19日',
        h1: '给母亲的肯定语：通过积极思维实现自我关怀',
        intro: '育儿要求很高。用肯定语认可你的努力，释放内疚，在照顾他人的同时滋养自己。',
        alt: '母亲与孩子在一起的平静时刻，代表自我关怀',
        groups: [
            { h: '自我关怀', items: ['我优先考虑自己的福祉，以便为家人提供支持。', '为自己留时间让我成为更好的父母。', '我的需求很重要，值得关注。'] },
            { h: '释放内疚', items: ['我尽力了，这已经足够。', '犯错是可以的；我从中学习并成长。', '我放下比较，尊重自己独特的道路。'] },
            { h: '力量与平衡', items: ['我坚强、有能力且有韧性。', '我在照顾他人与照顾自己之间保持平衡。', '每一天我都在耐心与智慧中成长。'] },
        ],
        tip: '用 Daily Affirmations 扩展将这些肯定语设为新标签页。在回复通知前花30秒读一条，这能创造一个暂停与在场的时刻。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/affirmations-for-mothers',
        title: 'تأكيدات للأمهات: الرعاية الذاتية من خلال التفكير الإيجابي',
        description: 'تأكيدات قوية مصممة خصيصاً للأمهات لتعزيز الرعاية الذاتية وتقليل ذنب الأم وبناء الثقة والحفاظ على التوازن.',
        date: '2025-09-19',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1200&h=630&fit=crop',
        dateDisplay: '19 سبتمبر 2025',
        h1: 'تأكيدات للأمهات: الرعاية الذاتية من خلال التفكير الإيجابي',
        intro: 'الأبوة تتطلب الكثير. استخدمي التأكيدات لتقدير جهدك وإطلاق الذنب والعناية بنفسك أثناء رعاية الآخرين.',
        alt: 'أم وطفل في لحظة هادئة ترمز للرعاية الذاتية',
        groups: [
            { h: 'الرعاية الذاتية', items: ['أُعطي أولوية لرفاهي لأكون موجودة لعائلتي.', 'أخذ الوقت لنفسي يجعلني أماً أفضل.', 'احتياجاتي مهمة وتستحق الاهتمام.'] },
            { h: 'إطلاق الذنب', items: ['أبذل قصارى جهدي وهذا كاف.', 'لا بأس بارتكاب الأخطاء؛ أتعلم وأنمو.', 'أُطلق المقارنة وأكرم مساري الفريد.'] },
            { h: 'القوة والتوازن', items: ['أنا قوية وقادرة ومرنة.', 'أوازن بين رعاية الآخرين ورعاية نفسي.', 'كل يوم أنمو في الصبر والحكمة.'] },
        ],
        tip: 'ثبّتي هذه التأكيدات في لسان جديد عبر الامتداد. خذي 30 ثانية قبل الرد على الإشعارات لقراءة واحدة — هذا يخلق لحظة توقف وحضور.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/affirmations-for-mothers',
        title: 'Afirmações para Mães: Autocuidado Através do Pensamento Positivo',
        description: 'Afirmações poderosas para mães promoverem autocuidado, reduzirem culpa materna, construírem confiança e manterem equilíbrio.',
        date: '2025-09-19',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1200&h=630&fit=crop',
        dateDisplay: '19 de setembro de 2025',
        h1: 'Afirmações para Mães: Autocuidado Através do Pensamento Positivo',
        intro: 'A parentalidade é exigente. Use afirmações para honrar seu esforço, liberar culpa e nutrir a si mesma enquanto cuida de outros.',
        alt: 'Mãe com filho em momento tranquilo representando autocuidado',
        groups: [
            { h: 'Autocuidado', items: ['Priorizo meu bem-estar para estar presente para minha família.', 'Tirar tempo para mim me torna uma mãe melhor.', 'Minhas necessidades importam e merecem atenção.'] },
            { h: 'Liberando Culpa', items: ['Estou fazendo o meu melhor e isso é suficiente.', 'Está tudo bem cometer erros; aprendo e cresço.', 'Libero comparações e honro meu caminho único.'] },
            { h: 'Força & Equilíbrio', items: ['Sou forte, capaz e resiliente.', 'Equilibro cuidar dos outros com cuidar de mim.', 'Cada dia cresço em paciência e sabedoria.'] },
        ],
        tip: 'Defina essas afirmações como nova aba na extensão Daily Affirmations. Reserve 30 segundos antes de responder notificações para ler uma—isso cria um momento de pausa e presença.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/affirmations-for-mothers',
        title: 'माताओं के लिए पुष्टिकरण: सकारात्मक सोच के माध्यम से स्व-देखभाल',
        description: 'माताओं के लिए विशेष रूप से डिज़ाइन किए गए शक्तिशाली पुष्टिकरण: स्व-देखभाल को बढ़ावा, माँ के अपराध को कम करना, आत्मविश्वास बनाना और संतुलन बनाए रखना।',
        date: '2025-09-19',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1200&h=630&fit=crop',
        dateDisplay: '19 सितम्बर 2025',
        h1: 'माताओं के लिए पुष्टिकरण: सकारात्मक सोच के माध्यम से स्व-देखभाल',
        intro: 'पालन-पोषण माँग करने वाला है। अपने प्रयास का सम्मान करने, अपराध मुक्त करने और दूसरों की देखभाल करते हुए खुद की देखभाल करने के लिए पुष्टिकरण का उपयोग करें।',
        alt: 'शांत क्षण में माँ और बच्चा — स्व-देखभाल का प्रतीक',
        groups: [
            { h: 'स्व-देखभाल', items: ['मैं अपने परिवार के लिए मौजूद रहने के लिए अपने कल्याण को प्राथमिकता देती हूँ।', 'अपने लिए समय निकालना मुझे एक बेहतर माता-पिता बनाता है।', 'मेरी जरूरतें मायने रखती हैं और ध्यान की हकदार हैं।'] },
            { h: 'अपराध मुक्त करना', items: ['मैं अपना सर्वश्रेष्ठ कर रही हूँ और यह पर्याप्त है।', 'गलतियाँ करना ठीक है; मैं सीखती और बढ़ती हूँ।', 'मैं तुलना छोड़ती हूँ और अपने अद्वितीय रास्ते का सम्मान करती हूँ।'] },
            { h: 'शक्ति और संतुलन', items: ['मैं मजबूत, सक्षम और लचीली हूँ।', 'मैं दूसरों की देखभाल के साथ अपनी देखभाल को संतुलित करती हूँ।', 'हर दिन मैं धैर्य और ज्ञान में बढ़ती हूँ।'] },
        ],
        tip: 'Daily Affirmations एक्सटेंशन में इन पुष्टिकरणों को नई टैब पर सेट करें। सूचनाओं का जवाब देने से पहले एक पढ़ने के लिए 30 सेकंड लें — यह रुकने और उपस्थिति का एक क्षण बनाता है।'
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
                            <h3 className="text-xl font-semibold mb-4">💕 {lang === 'ru' ? 'Забота о себе' : lang === 'zh' ? '自我关怀' : lang === 'ar' ? 'الرعاية الذاتية' : lang === 'pt' ? 'Autocuidado' : lang === 'hi' ? 'स्व-देखभाल' : 'Self-care'}</h3>
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

