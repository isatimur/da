'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/affirmations-for-work',
        title: 'Affirmations for Work: Boosting Professional Success',
        description: 'Work affirmations for confidence, productivity, leadership, and balance. Practical phrases and tips to use at work.',
        date: '2024-11-08',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=630&fit=crop',
        dateDisplay: 'November 8, 2024',
        h1: 'Affirmations for Work: Boosting Professional Success',
        intro: 'Use targeted affirmations to enter meetings calm, handle deadlines confidently, and keep focus on what matters most.',
        alt: 'Minimal desk workspace representing focus and productivity',
        blocks: [
            { heading: 'Confidence & Presence', items: ['I communicate clearly and confidently.', 'My voice is valuable and heard.', 'I bring thoughtful solutions to the table.'] },
            { heading: 'Focus & Productivity', items: ['I prioritize what has impact.', 'I work with clarity and intention.', 'I make steady progress every hour.'] },
            { heading: 'Leadership & Collaboration', items: ['I lead with calm and clarity.', 'I listen fully and decide wisely.', 'I elevate my team with trust and support.'] },
            { heading: 'Balance & Well-being', items: ['I maintain healthy boundaries.', 'My work supports my life and growth.', 'I close the day with gratitude.'] },
        ],
        tip: 'Set the Daily Affirmations Chrome extension as your new tab to keep work-focused phrases visible throughout the day.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/affirmations-for-work',
        title: 'Аффирмации для работы: путь к профессиональному успеху',
        description: 'Аффирмации для уверенности, продуктивности, лидерства и баланса. Практичные формулировки и советы для работы.',
        date: '2024-11-08',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=630&fit=crop',
        dateDisplay: '8 ноября 2024',
        h1: 'Аффирмации для работы: путь к профессиональному успеху',
        intro: 'Используйте точные аффирмации, чтобы входить в встречи спокойно, уверенно держать дедлайны и фокусироваться на главном.',
        alt: 'Минималистичное рабочее место — фокус и продуктивность',
        blocks: [
            { heading: 'Уверенность и присутствие', items: ['Я общаюсь ясно и уверенно.', 'Мой голос ценен и слышим.', 'Я предлагаю продуманные решения.'] },
            { heading: 'Фокус и продуктивность', items: ['Я приоритезирую то, что приносит эффект.', 'Я работаю ясно и осознанно.', 'Каждый час я делаю ощутимый шаг вперёд.'] },
            { heading: 'Лидерство и взаимодействие', items: ['Я веду спокойно и ясно.', 'Я внимательно слушаю и мудро решаю.', 'Я усиливаю команду доверием и поддержкой.'] },
            { heading: 'Баланс и благополучие', items: ['Я сохраняю здоровые границы.', 'Моя работа поддерживает мою жизнь и рост.', 'Я завершаю день с благодарностью.'] },
        ],
        tip: 'Сделайте расширение Daily Affirmations новой вкладкой — рабочие формулы будут всегда на виду.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/affirmations-for-work',
        title: '工作肯定语：提升职业成功',
        description: '用于自信、效率、领导力与平衡的工作肯定语。实用句式与使用建议。',
        date: '2024-11-08',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=630&fit=crop',
        dateDisplay: '2024年11月8日',
        h1: '工作肯定语：提升职业成功',
        intro: '用针对性的肯定语，让你在会议中从容、面对期限自信、专注于最重要之事。',
        alt: '极简办公桌，象征专注与效率',
        blocks: [
            { heading: '自信与存在感', items: ['我清晰而自信地沟通。', '我的声音有价值并被听见。', '我带来有思考的解决方案。'] },
            { heading: '专注与效率', items: ['我优先处理最有影响的事项。', '我清晰而有意图地工作。', '我每小时都在稳步推进。'] },
            { heading: '领导与协作', items: ['我以冷静与清晰领导。', '我充分倾听并明智决策。', '我用信任与支持提升团队。'] },
            { heading: '平衡与健康', items: ['我保持健康的边界。', '我的工作支持我的生活与成长。', '我以感恩结束一天。'] },
        ],
        tip: '将 Daily Affirmations Chrome 扩展设为新标签页，让工作肯定语全天可见。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/affirmations-for-work',
        title: 'تأكيدات للعمل: تعزيز النجاح المهني',
        description: 'تأكيدات للعمل للثقة والإنتاجية والقيادة والتوازن. عبارات عملية ونصائح للاستخدام.',
        date: '2024-11-08',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=630&fit=crop',
        dateDisplay: '8 نوفمبر 2024',
        h1: 'تأكيدات للعمل: تعزيز النجاح المهني',
        intro: 'استخدم تأكيدات موجهة للدخول إلى الاجتماعات بهدوء، والتعامل مع المواعيد بثقة، والتركيز على ما يهم.',
        alt: 'مساحة عمل بسيطة ترمز للتركيز والإنتاجية',
        blocks: [
            { heading: 'الثقة والحضور', items: ['أتواصل بوضوح وثقة.', 'صوتي قيم ومسموع.', 'أقدم حلولاً مدروسة.'] },
            { heading: 'التركيز والإنتاجية', items: ['أُعطي الأولوية لما له تأثير.', 'أعمل بوضوح ونية.', 'أحرز تقدماً ثابتاً كل ساعة.'] },
            { heading: 'القيادة والتعاون', items: ['أقود بهدوء ووضوح.', 'أستمع بالكامل وأقرر بحكمة.', 'أرفع فريقي بالثقة والدعم.'] },
            { heading: 'التوازن والرفاه', items: ['أحافظ على حدود صحية.', 'عملي يدعم حياتي ونموي.', 'أختتم اليوم بالامتنان.'] },
        ],
        tip: 'اجعل امتداد Daily Affirmations صفحة التبويب الجديدة لإبقاء عبارات العمل مرئية طوال اليوم.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/affirmations-for-work',
        title: 'Afirmações para o Trabalho: Impulsionando o Sucesso Profissional',
        description: 'Afirmações de trabalho para confiança, produtividade, liderança e equilíbrio. Frases práticas e dicas.',
        date: '2024-11-08',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=630&fit=crop',
        dateDisplay: '8 de novembro de 2024',
        h1: 'Afirmações para o Trabalho: Impulsionando o Sucesso Profissional',
        intro: 'Use afirmações direcionadas para entrar em reuniões com calma, lidar com prazos com confiança e manter o foco no que importa.',
        alt: 'Mesa de trabalho minimalista — foco e produtividade',
        blocks: [
            { heading: 'Confiança e Presença', items: ['Me comunico com clareza e confiança.', 'Minha voz é valiosa e ouvida.', 'Trago soluções bem pensadas.'] },
            { heading: 'Foco e Produtividade', items: ['Priorizo o que tem impacto.', 'Trabalho com clareza e intenção.', 'Avanço de forma constante a cada hora.'] },
            { heading: 'Liderança e Colaboração', items: ['Lidero com calma e clareza.', 'Escuto plenamente e decido com sabedoria.', 'Elevo meu time com confiança e apoio.'] },
            { heading: 'Equilíbrio e Bem-estar', items: ['Mantenho limites saudáveis.', 'Meu trabalho apoia minha vida e meu crescimento.', 'Encerro o dia com gratidão.'] },
        ],
        tip: 'Defina a extensão Daily Affirmations como nova aba para manter frases de trabalho visíveis o dia todo.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/affirmations-for-work',
        title: 'काम के लिए पुष्टिकरण: पेशेवर सफलता को बढ़ावा',
        description: 'आत्मविश्वास, उत्पादकता, नेतृत्व और संतुलन के लिए कार्यस्थल पुष्टिकरण। उपयोग में आसान पंक्तियाँ और सुझाव।',
        date: '2024-11-08',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=630&fit=crop',
        dateDisplay: '8 नवम्बर 2024',
        h1: 'काम के लिए पुष्टिकरण: पेशेवर सफलता को बढ़ावा',
        intro: 'लक्षित पुष्टिकरण के साथ मीटिंग में शांत रहें, डेडलाइन को आत्मविश्वास से संभालें, और ज़रूरी चीज़ों पर फोकस रखें।',
        alt: 'एकाग्रता और उत्पादकता दर्शाता मिनिमल कार्यस्थल',
        blocks: [
            { heading: 'आत्मविश्वास और उपस्थिति', items: ['मैं स्पष्ट और आत्मविश्वास से संवाद करता/करती हूँ।', 'मेरी आवाज़ मूल्यवान है और सुनी जाती है।', 'मैं सोच-समझकर समाधान लाता/लाती हूँ।'] },
            { heading: 'फोकस और उत्पादकता', items: ['मैं प्रभावशाली कार्यों को प्राथमिकता देता/देती हूँ।', 'मैं स्पष्टता और उद्देश्य से काम करता/करती हूँ।', 'मैं हर घंटे स्थिर प्रगति करता/करती हूँ।'] },
            { heading: 'नेतृत्व और सहयोग', items: ['मैं शांति और स्पष्टता से नेतृत्व करता/करती हूँ।', 'मैं पूरी तरह सुनता/सुनती हूँ और समझदारी से निर्णय लेता/लेती हूँ।', 'मैं विश्वास और समर्थन से टीम को ऊपर उठाता/उठाती हूँ।'] },
            { heading: 'संतुलन और कल्याण', items: ['मैं स्वस्थ सीमाएँ बनाए रखता/रखती हूँ।', 'मेरा काम मेरे जीवन और विकास का समर्थन करता है।', 'मैं दिन का अंत कृतज्ञता से करता/करती हूँ।'] },
        ],
        tip: 'Daily Affirmations Chrome एक्सटेंशन को नई टैब बनाकर कार्य पुष्टिकरण पूरे दिन दृश्यमान रखें।'
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
                        {t.blocks.map((b: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{b.heading}</h2>
                                <ul>
                                    {b.items.map((it: string, j: number) => (
                                        <li key={j}>{it}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">💼 {lang === 'ru' ? 'Работайте осознанно' : lang === 'zh' ? '专注工作' : lang === 'ar' ? 'اعمل بوعي' : lang === 'pt' ? 'Trabalhe com atenção' : lang === 'hi' ? 'सचेत होकर काम करें' : 'Work mindfully'}</h3>
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
