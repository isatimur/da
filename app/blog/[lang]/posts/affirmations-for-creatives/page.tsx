'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/affirmations-for-creatives',
        title: 'Affirmations for Creatives: Unlocking Your Artistic Potential',
        description: 'Powerful affirmations designed for artists, writers, musicians, and creatives to overcome creative blocks, build artistic confidence, and unlock their full creative potential.',
        date: '2025-11-05',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop',
        dateDisplay: 'November 5, 2025',
        h1: 'Affirmations for Creatives: Unlocking Your Artistic Potential',
        intro: 'Creative work requires vulnerability and courage. Use affirmations to overcome blocks, build confidence, and trust your unique creative voice.',
        alt: 'Artist workspace with creative tools representing artistic potential',
        themes: [
            { h: 'Overcoming Blocks', items: ['I release perfectionism and embrace the creative process.', 'My ideas flow freely and naturally.', 'I trust my creative instincts and take action.'] },
            { h: 'Artistic Confidence', items: ['My creative voice is unique and valuable.', 'I share my work with courage and authenticity.', 'I am learning and growing with each project.'] },
            { h: 'Flow & Inspiration', items: ['I am open to inspiration from all sources.', 'Creative energy flows through me easily.', 'I create consistently, even when motivation is low.'] },
        ],
        tip: 'Set creative affirmations in the Daily Affirmations extension. Read them before starting a creative session to prime your mind for flow and remove self-doubt.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/affirmations-for-creatives',
        title: 'Аффирмации для творческих людей: раскрытие художественного потенциала',
        description: 'Сильные аффирмации для художников, писателей, музыкантов и творческих людей: преодоление блоков, укрепление художественной уверенности и раскрытие творческого потенциала.',
        date: '2025-11-05',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop',
        dateDisplay: '5 ноября 2025',
        h1: 'Аффирмации для творческих людей: раскрытие художественного потенциала',
        intro: 'Творческая работа требует уязвимости и смелости. Используйте аффирмации, чтобы преодолевать блоки, укреплять уверенность и доверять своему уникальному творческому голосу.',
        alt: 'Рабочее место художника с инструментами — символ художественного потенциала',
        themes: [
            { h: 'Преодоление блоков', items: ['Я отпускаю перфекционизм и принимаю творческий процесс.', 'Мои идеи текут свободно и естественно.', 'Я доверяю своим творческим инстинктам и действую.'] },
            { h: 'Художественная уверенность', items: ['Мой творческий голос уникален и ценен.', 'Я делюсь своей работой со смелостью и аутентичностью.', 'Я учусь и расту с каждым проектом.'] },
            { h: 'Поток и вдохновение', items: ['Я открыт(а) для вдохновения из всех источников.', 'Творческая энергия течёт через меня легко.', 'Я создаю последовательно, даже когда мотивация низка.'] },
        ],
        tip: 'Установите творческие аффирмации в расширении Daily Affirmations. Читайте их перед началом творческой сессии, чтобы настроить ум на поток и убрать сомнения.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/affirmations-for-creatives',
        title: '给创作者的肯定语：释放你的艺术潜能',
        description: '专为艺术家、作家、音乐家和创作者设计的肯定语，克服创作障碍、建立艺术信心、释放全部创作潜能。',
        date: '2025-11-05',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop',
        dateDisplay: '2025年11月5日',
        h1: '给创作者的肯定语：释放你的艺术潜能',
        intro: '创作需要脆弱与勇气。用肯定语克服阻碍、建立信心，并信任你独特的创作声音。',
        alt: '艺术家工作空间与创作工具，代表艺术潜能',
        themes: [
            { h: '克服阻碍', items: ['我放下完美主义，拥抱创作过程。', '我的想法自由自然地流动。', '我相信我的创作直觉并采取行动。'] },
            { h: '艺术信心', items: ['我的创作声音独特且有价值。', '我以勇气和真实分享作品。', '我在每个项目中学习与成长。'] },
            { h: '心流与灵感', items: ['我对来自所有来源的灵感保持开放。', '创作能量轻松流经我。', '我持续创作，即使动机较低时。'] },
        ],
        tip: '在 Daily Affirmations 扩展中设置创作类肯定语。在开始创作前阅读它们，让大脑进入心流状态并去除自我怀疑。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/affirmations-for-creatives',
        title: 'تأكيدات للمبدعين: إطلاق إمكاناتك الفنية',
        description: 'تأكيدات قوية للفنانين والكتاب والموسيقيين والمبدعين للتغلب على العقبات الإبداعية وبناء الثقة الفنية.',
        date: '2025-11-05',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop',
        dateDisplay: '5 نوفمبر 2025',
        h1: 'تأكيدات للمبدعين: إطلاق إمكاناتك الفنية',
        intro: 'يتطلب العمل الإبداعي الضعف والشجاعة. استخدم التأكيدات للتغلب على العقبات وبناء الثقة والثقة بصوتك الإبداعي الفريد.',
        alt: 'مساحة عمل فنان مع أدوات إبداعية ترمز للإمكانات الفنية',
        themes: [
            { h: 'تجاوز العقبات', items: ['أُطلق الكمالية وأحتضن العملية الإبداعية.', 'أفكاري تتدفق بحرية وبطبيعة الحال.', 'أثق بغرائزي الإبداعية وأتخذ إجراءات.'] },
            { h: 'الثقة الفنية', items: ['صوتي الإبداعي فريد وقيم.', 'أشارك عملي بشجاعة وأصالة.', 'أتعلّم وأنمو مع كل مشروع.'] },
            { h: 'التدفق والإلهام', items: ['أنا منفتح على الإلهام من جميع المصادر.', 'الطاقة الإبداعية تتدفق من خلالي بسهولة.', 'أنشئ باستمرار، حتى عندما تكون الدافعية منخفضة.'] },
        ],
        tip: 'ثبّت التأكيدات الإبداعية في الامتداد. اقرأها قبل بدء جلسة إبداعية لتهيئة عقلك للتدفق وإزالة الشك الذاتي.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/affirmations-for-creatives',
        title: 'Afirmações para Criativos: Desbloqueando seu Potencial Artístico',
        description: 'Afirmações para artistas, escritores, músicos e criativos superarem bloqueios criativos e construírem confiança artística.',
        date: '2025-11-05',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop',
        dateDisplay: '5 de novembro de 2025',
        h1: 'Afirmações para Criativos: Desbloqueando seu Potencial Artístico',
        intro: 'Trabalho criativo requer vulnerabilidade e coragem. Use afirmações para superar bloqueios, construir confiança e confiar em sua voz criativa única.',
        alt: 'Espaço de trabalho criativo representando potencial artístico',
        themes: [
            { h: 'Superando Bloqueios', items: ['Libero perfeccionismo e abraço o processo criativo.', 'Minhas ideias fluem livremente e naturalmente.', 'Confio em meus instintos criativos e tomo ação.'] },
            { h: 'Confiança Artística', items: ['Minha voz criativa é única e valiosa.', 'Compartilho meu trabalho com coragem e autenticidade.', 'Aprendo e cresço com cada projeto.'] },
            { h: 'Fluxo & Inspiração', items: ['Estou aberto(a) à inspiração de todas as fontes.', 'Energia criativa flui através de mim facilmente.', 'Crio consistentemente, mesmo quando a motivação está baixa.'] },
        ],
        tip: 'Configure afirmações criativas na extensão Daily Affirmations. Leia-as antes de iniciar uma sessão criativa para preparar sua mente para o fluxo e remover autodúvida.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/affirmations-for-creatives',
        title: 'रचनात्मक लोगों के लिए पुष्टिकरण: अपनी कलात्मक क्षमता को अनलॉक करना',
        description: 'रचनात्मक ब्लॉकों को दूर करने, कलात्मक आत्मविश्वास बनाने और पूरी रचनात्मक क्षमता को अनलॉक करने के लिए कलाकारों, लेखकों, संगीतकारों और रचनात्मक लोगों के लिए डिज़ाइन किए गए शक्तिशाली पुष्टिकरण।',
        date: '2025-11-05',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop',
        dateDisplay: '5 नवम्बर 2025',
        h1: 'रचनात्मक लोगों के लिए पुष्टिकरण: अपनी कलात्मक क्षमता को अनलॉक करना',
        intro: 'रचनात्मक कार्य कमजोरी और साहस की माँग करता है। ब्लॉकों को दूर करने, आत्मविश्वास बनाने और अपनी अद्वितीय रचनात्मक आवाज़ पर भरोसा करने के लिए पुष्टिकरण का उपयोग करें।',
        alt: 'रचनात्मक उपकरणों के साथ कलाकार का कार्यक्षेत्र — कलात्मक क्षमता का प्रतीक',
        themes: [
            { h: 'ब्लॉकों पर विजय', items: ['मैं पूर्णतावाद को छोड़ता/छोड़ती हूँ और रचनात्मक प्रक्रिया को अपनाता/अपनाती हूँ।', 'मेरे विचार स्वतंत्र और प्राकृतिक रूप से बहते हैं।', 'मैं अपने रचनात्मक सहज ज्ञान पर भरोसा करता/करती हूँ और कार्रवाई करता/करती हूँ।'] },
            { h: 'कलात्मक आत्मविश्वास', items: ['मेरी रचनात्मक आवाज़ अद्वितीय और मूल्यवान है।', 'मैं साहस और प्रामाणिकता के साथ अपना काम साझा करता/करती हूँ।', 'मैं हर परियोजना के साथ सीखता/सीखती और बढ़ता/बढ़ती हूँ।'] },
            { h: 'प्रवाह और प्रेरणा', items: ['मैं सभी स्रोतों से प्रेरणा के लिए खुला/खुली हूँ।', 'रचनात्मक ऊर्जा मुझसे आसानी से बहती है।', 'मैं लगातार बनाता/बनाती हूँ, भले ही प्रेरणा कम हो।'] },
        ],
        tip: 'Daily Affirmations एक्सटेंशन में रचनात्मक पुष्टिकरण सेट करें। रचनात्मक सत्र शुरू करने से पहले उन्हें पढ़ें — यह आपके मन को प्रवाह के लिए तैयार करता है और आत्म-संदेह को दूर करता है।'
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
                        {t.themes.map((th: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{th.h}</h2>
                                <ul>
                                    {th.items.map((it: string, j: number) => (
                                        <li key={j}>{it}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🎨 {lang === 'ru' ? 'Творческий поток' : lang === 'zh' ? '创作心流' : lang === 'ar' ? 'التدفق الإبداعي' : lang === 'pt' ? 'Fluxo criativo' : lang === 'hi' ? 'रचनात्मक प्रवाह' : 'Creative flow'}</h3>
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

