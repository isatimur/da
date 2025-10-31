'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/affirmations-for-relationships',
        title: 'Affirmations for Relationships: Strengthening Connections',
        description: 'Powerful affirmations to strengthen relationships, improve communication, and deepen bonds with partners, family, and friends.',
        date: '2025-01-14',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop',
        dateDisplay: 'January 14, 2025',
        h1: 'Affirmations for Relationships: Strengthening Connections',
        intro: 'Use targeted affirmations to nurture healthy relationships, communicate clearly, and build deeper connections with the people you care about.',
        alt: 'Two hands holding representing connection and relationships',
        groups: [
            { h: 'Communication', items: ['I express my needs clearly and listen with presence.', 'I approach difficult conversations with curiosity and compassion.', 'I communicate with honesty and respect.'] },
            { h: 'Connection', items: ['I nurture meaningful connections in my life.', 'I am open to receiving and giving love.', 'I create space for others to be themselves.'] },
            { h: 'Boundaries', items: ['I set healthy boundaries with kindness.', 'I honor my needs while respecting others.', 'I choose relationships that uplift me.'] },
        ],
        tip: 'Keep relationship-focused affirmations visible with the Daily Affirmations extension to remind you daily of your relationship values.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/affirmations-for-relationships',
        title: 'Аффирмации для отношений: укрепление связей',
        description: 'Сильные аффирмации для укрепления отношений, улучшения коммуникации и углубления связей с партнёрами, семьёй и друзьями.',
        date: '2025-01-14',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop',
        dateDisplay: '14 января 2025',
        h1: 'Аффирмации для отношений: укрепление связей',
        intro: 'Используйте направленные аффирмации для поддержания здоровых отношений, ясной коммуникации и более глубоких связей с близкими.',
        alt: 'Две руки, соединённые вместе — символ связи и отношений',
        groups: [
            { h: 'Коммуникация', items: ['Я выражаю свои потребности ясно и слушаю с присутствием.', 'Я подхожу к сложным разговорам с любопытством и состраданием.', 'Я общаюсь честно и с уважением.'] },
            { h: 'Связь', items: ['Я поддерживаю значимые связи в своей жизни.', 'Я открыт(а) получать и дарить любовь.', 'Я создаю пространство, чтобы другие могли быть собой.'] },
            { h: 'Границы', items: ['Я устанавливаю здоровые границы с добротой.', 'Я уважаю свои потребности, уважая других.', 'Я выбираю отношения, которые поднимают меня.'] },
        ],
        tip: 'Держите аффирмации, фокусированные на отношениях, на виду через расширение Daily Affirmations — они напомнят о ваших ценностях в отношениях.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/affirmations-for-relationships',
        title: '关系肯定语：加强连接',
        description: '用于加强关系、改善沟通、深化与伴侣、家人和朋友纽带的肯定语。',
        date: '2025-01-14',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop',
        dateDisplay: '2025年1月14日',
        h1: '关系肯定语：加强连接',
        intro: '用针对性的肯定语培养健康关系，清晰沟通，与你关心的人建立更深的连接。',
        alt: '两双手相握象征连接与关系',
        groups: [
            { h: '沟通', items: ['我清晰表达需求，并专注倾听。', '我带着好奇与共情处理困难对话。', '我以诚实与尊重沟通。'] },
            { h: '连接', items: ['我在生活中培育有意义的连接。', '我乐于给予和接受爱。', '我为他人的真实自我创造空间。'] },
            { h: '边界', items: ['我温和地设定健康边界。', '我在尊重他人的同时尊重自己的需求。', '我选择提升我的关系。'] },
        ],
        tip: '用 Daily Affirmations 扩展保持关系类肯定语可见，每日提醒你关系的价值观。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/affirmations-for-relationships',
        title: 'تأكيدات للعلاقات: تقوية الروابط',
        description: 'تأكيدات قوية لتقوية العلاقات وتحسين التواصل وتعزيز الروابط مع الشركاء والعائلة والأصدقاء.',
        date: '2025-01-14',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop',
        dateDisplay: '14 يناير 2025',
        h1: 'تأكيدات للعلاقات: تقوية الروابط',
        intro: 'استخدم تأكيدات موجهة لرعاية العلاقات الصحية والتواصل بوضوح وبناء روابط أعمق مع من تهتم بهم.',
        alt: 'يدان متشابكتان ترمزان للاتصال والعلاقات',
        groups: [
            { h: 'التواصل', items: ['أعبر عن احتياجاتي بوضوح وأستمع بحضور.', 'أتعامل مع المحادثات الصعبة بفضول وتعاطف.', 'أتحدث بصدق واحترام.'] },
            { h: 'الاتصال', items: ['أرعى اتصالات ذات معنى في حياتي.', 'أنا منفتح على تلقي وإعطاء الحب.', 'أخلق مساحة للآخرين ليكونوا أنفسهم.'] },
            { h: 'الحدود', items: ['أضع حدوداً صحية بلطف.', 'أحترم احتياجاتي مع احترام الآخرين.', 'أختار علاقات ترفعني.'] },
        ],
        tip: 'احتفظ بتأكيدات العلاقات مرئية عبر الامتداد لتذكيرك بقيم العلاقات يومياً.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/affirmations-for-relationships',
        title: 'Afirmações para Relacionamentos: Fortalecendo Conexões',
        description: 'Afirmações poderosas para fortalecer relacionamentos, melhorar comunicação e aprofundar vínculos com parceiros, família e amigos.',
        date: '2025-01-14',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop',
        dateDisplay: '14 de janeiro de 2025',
        h1: 'Afirmações para Relacionamentos: Fortalecendo Conexões',
        intro: 'Use afirmações direcionadas para nutrir relacionamentos saudáveis, comunicar claramente e construir conexões mais profundas com quem você ama.',
        alt: 'Duas mãos unidas representando conexão e relacionamentos',
        groups: [
            { h: 'Comunicação', items: ['Expresso minhas necessidades claramente e escuto com presença.', 'Abordo conversas difíceis com curiosidade e compaixão.', 'Comunico com honestidade e respeito.'] },
            { h: 'Conexão', items: ['Nutro conexões significativas na minha vida.', 'Estou aberto(a) a receber e dar amor.', 'Crio espaço para outros serem eles mesmos.'] },
            { h: 'Limites', items: ['Estabeleço limites saudáveis com gentileza.', 'Honro minhas necessidades enquanto respeito outras.', 'Escolho relacionamentos que me elevam.'] },
        ],
        tip: 'Mantenha afirmações focadas em relacionamentos visíveis na extensão Daily Affirmations para lembrar diariamente seus valores de relacionamento.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/affirmations-for-relationships',
        title: 'रिश्तों के लिए पुष्टिकरण: कनेक्शन को मजबूत करना',
        description: 'रिश्तों को मजबूत करने, संचार सुधारने और साथी, परिवार और दोस्तों के साथ कनेक्शन गहरा करने के लिए शक्तिशाली पुष्टिकरण।',
        date: '2025-01-14',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop',
        dateDisplay: '14 जनवरी 2025',
        h1: 'रिश्तों के लिए पुष्टिकरण: कनेक्शन को मजबूत करना',
        intro: 'स्वस्थ रिश्तों को पोषित करने, स्पष्ट संचार करने और आपकी देखभाल करने वालों के साथ गहरे कनेक्शन बनाने के लिए लक्षित पुष्टिकरण का उपयोग करें।',
        alt: 'दो हाथ जुड़े हुए — कनेक्शन और रिश्तों का प्रतीक',
        groups: [
            { h: 'संचार', items: ['मैं अपनी जरूरतों को स्पष्टता से व्यक्त करता/करती हूँ और उपस्थिति के साथ सुनता/सुनती हूँ।', 'मैं कठिन बातचीत में जिज्ञासा और करुणा के साथ जाता/जाती हूँ।', 'मैं ईमानदारी और सम्मान के साथ संवाद करता/करती हूँ।'] },
            { h: 'कनेक्शन', items: ['मैं अपने जीवन में सार्थक कनेक्शन पोषित करता/करती हूँ।', 'मैं प्रेम देने और लेने के लिए खुला/खुली हूँ।', 'मैं दूसरों के लिए अपने होने का स्थान बनाता/बनाती हूँ।'] },
            { h: 'सीमाएँ', items: ['मैं दयालुता के साथ स्वस्थ सीमाएँ निर्धारित करता/करती हूँ।', 'मैं दूसरों का सम्मान करते हुए अपनी जरूरतों का सम्मान करता/करती हूँ।', 'मैं ऐसे रिश्ते चुनता/चुनती हूँ जो मुझे उठाते हैं।'] },
        ],
        tip: 'Daily Affirmations एक्सटेंशन में रिश्ते-केंद्रित पुष्टिकरण दृश्य रखें — ये आपको रोज़ाना रिश्तों के मूल्यों की याद दिलाएँगे।'
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
                            <h3 className="text-xl font-semibold mb-4">💝 {lang === 'ru' ? 'Укрепляйте связи ежедневно' : lang === 'zh' ? '每日加强连接' : lang === 'ar' ? 'قوّ الروابط يومياً' : lang === 'pt' ? 'Fortaleça conexões diariamente' : lang === 'hi' ? 'रोज़ाना कनेक्शन मजबूत करें' : 'Strengthen connections daily'}</h3>
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

