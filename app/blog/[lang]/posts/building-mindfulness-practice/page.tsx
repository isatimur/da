'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/building-mindfulness-practice',
        title: '5 Ways to Build a Consistent Mindfulness Practice',
        description: 'Practical tips and strategies to incorporate mindfulness into your daily routine, using Daily Affirmations as your companion.',
        date: '2024-01-20',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop',
        dateDisplay: 'January 20, 2024',
        h1: '5 Ways to Build a Consistent Mindfulness Practice',
        intro: 'Building a sustainable mindfulness practice doesn\'t require hours of meditation. Small, consistent actions create lasting change.',
        alt: 'Peaceful meditation scene representing mindfulness',
        ways: [
            { way: 'Start Small', description: 'Begin with just 2-5 minutes daily. Consistency beats duration. Set your affirmations to appear automatically with the Daily Affirmations extension so you\'re reminded without effort.' },
            { way: 'Anchor to Existing Habits', description: 'Link mindfulness to things you already do—morning coffee, brushing teeth, commuting. Pair affirmations with these moments for natural integration.' },
            { way: 'Use Technology Wisely', description: 'Turn your phone and browser into mindfulness tools. The Daily Affirmations extension transforms every new tab into a moment of presence and positive reflection.' },
            { way: 'Practice Non-Judgment', description: 'When you miss a day or feel distracted, observe without criticism. Return to practice gently. Every moment is a fresh start.' },
            { way: 'Track Your Progress', description: 'Notice subtle shifts: better sleep, reduced reactivity, increased presence. Keep a simple journal or use the extension\'s built-in tracking to see your growth.' },
        ],
        tip: 'Install the Daily Affirmations extension and set it as your new tab page. Every time you open a browser, you\'ll automatically engage with mindfulness through personalized affirmations.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/building-mindfulness-practice',
        title: '5 способов построить последовательную практику осознанности',
        description: 'Практические советы и стратегии для включения осознанности в вашу ежедневную рутину, используя Daily Affirmations в качестве вашего спутника.',
        date: '2024-01-20',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop',
        dateDisplay: '20 января 2024',
        h1: '5 способов построить последовательную практику осознанности',
        intro: 'Построение устойчивой практики осознанности не требует часов медитации. Небольшие последовательные действия создают устойчивые изменения.',
        alt: 'Спокойная сцена медитации — символ осознанности',
        ways: [
            { way: 'Начните с малого', description: 'Начните с 2-5 минут в день. Регулярность важнее длительности. Установите аффирмации так, чтобы они появлялись автоматически через расширение Daily Affirmations — так вы будете напоминать без усилий.' },
            { way: 'Привяжите к существующим привычкам', description: 'Свяжите осознанность с тем, что уже делаете — утренний кофе, чистка зубов, дорога. Объедините аффирмации с этими моментами для естественной интеграции.' },
            { way: 'Используйте технологии мудро', description: 'Превратите телефон и браузер в инструменты осознанности. Расширение Daily Affirmations превращает каждую новую вкладку в момент присутствия и позитивного размышления.' },
            { way: 'Практикуйте отсутствие суждений', description: 'Когда пропускаете день или отвлекаетесь, наблюдайте без критики. Возвращайтесь к практике мягко. Каждый момент — это новое начало.' },
            { way: 'Отслеживайте прогресс', description: 'Замечайте тонкие сдвиги: лучший сон, сниженная реактивность, увеличенное присутствие. Ведите простой дневник или используйте встроенное отслеживание расширения, чтобы видеть свой рост.' },
        ],
        tip: 'Установите расширение Daily Affirmations и установите его как новую страницу вкладки. Каждый раз, открывая браузер, вы автоматически погружаетесь в осознанность через персонализированные аффирмации.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/building-mindfulness-practice',
        title: '建立持续正念实践的5种方法',
        description: '将正念融入日常生活的实用技巧和策略，使用 Daily Affirmations 作为你的伴侣。',
        date: '2024-01-20',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop',
        dateDisplay: '2024年1月20日',
        h1: '建立持续正念实践的5种方法',
        intro: '建立可持续的正念实践不需要数小时的冥想。小而持续的行动能带来持久改变。',
        alt: '宁静的冥想场景，代表正念',
        ways: [
            { way: '从小开始', description: '每天从2-5分钟开始。持续性比时长更重要。用 Daily Affirmations 扩展让肯定语自动显示，这样你无需费力就会被提醒。' },
            { way: '与现有习惯结合', description: '将正念与已有行为关联——晨间咖啡、刷牙、通勤。在这些时刻配合肯定语，自然融入。' },
            { way: '明智使用技术', description: '将手机和浏览器变成正念工具。Daily Affirmations 扩展将每个新标签页变成专注与积极反思的时刻。' },
            { way: '练习不带评判', description: '当你错过一天或感到分心时，不带批评地观察。温和地回到练习。每一刻都是新的开始。' },
            { way: '追踪你的进展', description: '注意细微变化：更好的睡眠、减少反应性、增加专注。保持简单日记或使用扩展的内置追踪来看到你的成长。' },
        ],
        tip: '安装 Daily Affirmations 扩展并将其设为新标签页。每次打开浏览器，你都会通过个性化肯定语自动参与正念。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/building-mindfulness-practice',
        title: '5 طرق لبناء ممارسة اليقظة المتسقة',
        description: 'نصائح واستراتيجيات عملية لدمج اليقظة في روتينك اليومي، باستخدام Daily Affirmations كرفيق لك.',
        date: '2024-01-20',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop',
        dateDisplay: '20 يناير 2024',
        h1: '5 طرق لبناء ممارسة اليقظة المتسقة',
        intro: 'بناء ممارسة اليقظة المستدامة لا يتطلب ساعات من التأمل. الإجراءات الصغيرة المتسقة تُحدث تغييراً دائماً.',
        alt: 'مشهد تأمل هادئ يرمز لليقظة',
        ways: [
            { way: 'ابدأ صغيراً', description: 'ابدأ بـ 2-5 دقائق يومياً. الثبات يتفوق على المدة. اضبط التأكيدات لتظهر تلقائياً عبر الامتداد لتذكيرك دون جهد.' },
            { way: 'اربط بعادات موجودة', description: 'اربط اليقظة بأشياء تفعلها بالفعل—قهوة الصباح، تنظيف الأسنان، التنقل. اربط التأكيدات بهذه اللحظات للتكامل الطبيعي.' },
            { way: 'استخدم التكنولوجيا بحكمة', description: 'حول هاتفك ومتصفحك إلى أدوات يقظة. الامتداد يحول كل لسان جديد إلى لحظة حضور وتأمل إيجابي.' },
            { way: 'مارس عدم الحكم', description: 'عندما تفوت يوماً أو تشعر بالانحراف، راقب دون نقد. ارجع للممارسة بلطف. كل لحظة هي بداية جديدة.' },
            { way: 'تتبع تقدمك', description: 'لاحظ التحولات الدقيقة: نوم أفضل، تفاعل أقل، حضور أكبر. احتفظ بمجلة بسيطة أو استخدم تتبع الامتداد المدمج لرؤية نموك.' },
        ],
        tip: 'ثبّت الامتداد واجعله صفحة التبويب الجديدة. في كل مرة تفتح المتصفح، ستنخرط تلقائياً في اليقظة عبر التأكيدات المخصصة.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/building-mindfulness-practice',
        title: '5 Maneiras de Construir uma Prática Consistente de Atenção Plena',
        description: 'Dicas práticas e estratégias para incorporar atenção plena em sua rotina diária, usando Daily Affirmations como seu companheiro.',
        date: '2024-01-20',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop',
        dateDisplay: '20 de janeiro de 2024',
        h1: '5 Maneiras de Construir uma Prática Consistente de Atenção Plena',
        intro: 'Construir uma prática sustentável de atenção plena não requer horas de meditação. Ações pequenas e consistentes criam mudanças duradouras.',
        alt: 'Cena de meditação pacífica representando atenção plena',
        ways: [
            { way: 'Comece Pequeno', description: 'Comece com apenas 2-5 minutos diários. Consistência supera duração. Configure suas afirmações para aparecer automaticamente com a extensão Daily Affirmations para lembrar sem esforço.' },
            { way: 'Ancore a Hábitos Existentes', description: 'Vincule atenção plena a coisas que já faz—café da manhã, escovar dentes, deslocamento. Pare afirmações com esses momentos para integração natural.' },
            { way: 'Use Tecnologia Sabiamente', description: 'Transforme seu telefone e navegador em ferramentas de atenção plena. A extensão Daily Affirmations transforma cada nova aba em um momento de presença e reflexão positiva.' },
            { way: 'Pratique Não-Julgamento', description: 'Quando perder um dia ou se sentir distraído, observe sem crítica. Volte à prática gentilmente. Cada momento é um novo começo.' },
            { way: 'Acompanhe Seu Progresso', description: 'Note mudanças sutis: melhor sono, reatividade reduzida, maior presença. Mantenha um diário simples ou use o acompanhamento integrado da extensão para ver seu crescimento.' },
        ],
        tip: 'Instale a extensão Daily Affirmations e configure-a como sua página de nova aba. Toda vez que abrir o navegador, você se envolverá automaticamente com atenção plena através de afirmações personalizadas.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/building-mindfulness-practice',
        title: 'एक सुसंगत माइंडफुलनेस अभ्यास बनाने के 5 तरीके',
        description: 'अपनी दैनिक दिनचर्या में माइंडफुलनेस को शामिल करने के लिए व्यावहारिक सुझाव और रणनीतियाँ, Daily Affirmations को अपने साथी के रूप में उपयोग करना।',
        date: '2024-01-20',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop',
        dateDisplay: '20 जनवरी 2024',
        h1: 'एक सुसंगत माइंडफुलनेस अभ्यास बनाने के 5 तरीके',
        intro: 'एक स्थायी माइंडफुलनेस अभ्यास बनाने के लिए ध्यान के घंटों की आवश्यकता नहीं है। छोटे, लगातार कार्य स्थायी बदलाव लाते हैं।',
        alt: 'शांतिपूर्ण ध्यान दृश्य — माइंडफुलनेस का प्रतीक',
        ways: [
            { way: 'छोटे से शुरू करें', description: 'दिन में सिर्फ 2-5 मिनट से शुरू करें। निरंतरता अवधि से बेहतर है। बिना प्रयास के याद दिलाने के लिए Daily Affirmations एक्सटेंशन के साथ अपने पुष्टिकरण को स्वचालित रूप से दिखाई देने के लिए सेट करें।' },
            { way: 'मौजूदा आदतों से जोड़ें', description: 'माइंडफुलनेस को उन चीज़ों से जोड़ें जो आप पहले से करते हैं—सुबह की कॉफी, दाँत ब्रश करना, आवागमन। प्राकृतिक एकीकरण के लिए इन क्षणों के साथ पुष्टिकरण जोड़ें।' },
            { way: 'तकनीक का बुद्धिमानी से उपयोग करें', description: 'अपने फोन और ब्राउज़र को माइंडफुलनेस उपकरण में बदलें। Daily Affirmations एक्सटेंशन प्रत्येक नई टैब को उपस्थिति और सकारात्मक प्रतिबिंब के क्षण में बदलता है।' },
            { way: 'गैर-निर्णय का अभ्यास करें', description: 'जब आप एक दिन छूट जाएं या विचलित महसूस करें, तो आलोचना के बिना निरीक्षण करें। धीरे से अभ्यास पर वापस लौटें। हर क्षण एक नई शुरुआत है।' },
            { way: 'अपनी प्रगति को ट्रैक करें', description: 'सूक्ष्म बदलाव देखें: बेहतर नींद, कम प्रतिक्रियाशीलता, बढ़ी हुई उपस्थिति। एक सरल जर्नल रखें या अपने विकास को देखने के लिए एक्सटेंशन के अंतर्निहित ट्रैकिंग का उपयोग करें।' },
        ],
        tip: 'Daily Affirmations एक्सटेंशन इंस्टॉल करें और इसे अपनी नई टैब पेज के रूप में सेट करें। हर बार जब आप ब्राउज़र खोलेंगे, आप स्वचालित रूप से व्यक्तिगत पुष्टिकरण के माध्यम से माइंडफुलनेस में संलग्न होंगे।'
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
                        {t.ways.map((w: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{i + 1}. {w.way}</h2>
                                <p>{w.description}</p>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🧘 {lang === 'ru' ? 'Начните сегодня' : lang === 'zh' ? '今天开始' : lang === 'ar' ? 'ابدأ اليوم' : lang === 'pt' ? 'Comece hoje' : lang === 'hi' ? 'आज शुरू करें' : 'Start today'}</h3>
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

