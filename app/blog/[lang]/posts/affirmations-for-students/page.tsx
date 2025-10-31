'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/affirmations-for-students',
        title: 'Affirmations for Students: Enhancing Focus and Learning',
        description: 'Powerful affirmations designed for students to enhance focus, improve learning, increase academic confidence, and manage exam stress.',
        date: '2025-07-24',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop',
        dateDisplay: 'July 24, 2025',
        h1: 'Affirmations for Students: Enhancing Focus and Learning',
        intro: 'Academic success requires mental clarity and confidence. Use affirmations to build focus, reduce test anxiety, and maintain motivation throughout your studies.',
        alt: 'Student studying with focus and determination',
        categories: [
            { h: 'Focus & Concentration', items: ['I focus my attention on one task at a time.', 'My mind is clear and ready to learn.', 'I absorb information efficiently and effectively.'] },
            { h: 'Confidence', items: ['I am well-prepared and capable of success.', 'I trust my ability to understand complex material.', 'I approach challenges with curiosity and determination.'] },
            { h: 'Stress Management', items: ['I handle exam pressure with calm and clarity.', 'I take breaks when needed and return refreshed.', 'My well-being supports my academic performance.'] },
        ],
        tip: 'Set student-focused affirmations in the Daily Affirmations extension. Open a new tab before studying to read them—this primes your mind for focused work.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/affirmations-for-students',
        title: 'Аффирмации для студентов: улучшение фокуса и обучения',
        description: 'Сильные аффирмации для студентов: усиление концентрации, улучшение обучения, повышение академической уверенности и управление экзаменационным стрессом.',
        date: '2025-07-24',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop',
        dateDisplay: '24 июля 2025',
        h1: 'Аффирмации для студентов: улучшение фокуса и обучения',
        intro: 'Академический успех требует ясности ума и уверенности. Используйте аффирмации для развития фокуса, снижения тревоги и поддержания мотивации в учёбе.',
        alt: 'Студент учится с фокусом и решимостью',
        categories: [
            { h: 'Фокус и концентрация', items: ['Я фокусирую внимание на одной задаче за раз.', 'Мой ум ясен и готов учиться.', 'Я эффективно и результативно усваиваю информацию.'] },
            { h: 'Уверенность', items: ['Я хорошо подготовлен(а) и способен(на) на успех.', 'Я доверяю своей способности понимать сложный материал.', 'Я подхожу к вызовам с любопытством и решимостью.'] },
            { h: 'Управление стрессом', items: ['Я справляюсь с экзаменационным давлением спокойно и ясно.', 'Я делаю перерывы, когда нужно, и возвращаюсь отдохнувшим(ей).', 'Моё благополучие поддерживает мою академическую успеваемость.'] },
        ],
        tip: 'Установите аффирмации для студентов в расширении Daily Affirmations. Откройте новую вкладку перед учёбой, чтобы прочитать их — это настраивает ум на сосредоточенную работу.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/affirmations-for-students',
        title: '学生肯定语：提升专注与学习',
        description: '专为学生设计的肯定语，提升专注、改善学习、增强学术信心、应对考试压力。',
        date: '2025-07-24',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop',
        dateDisplay: '2025年7月24日',
        h1: '学生肯定语：提升专注与学习',
        intro: '学业成功需要清晰的心态与信心。用肯定语建立专注、减轻考试焦虑，并在整个学习过程中保持动力。',
        alt: '专注学习的学生',
        categories: [
            { h: '专注与集中', items: ['我一次专注于一项任务。', '我的头脑清晰，准备学习。', '我高效地吸收信息。'] },
            { h: '信心', items: ['我准备充分，能够成功。', '我相信自己有能力理解复杂材料。', '我以好奇和决心面对挑战。'] },
            { h: '压力管理', items: ['我以冷静和清晰应对考试压力。', '我根据需要休息，然后精神饱满地回来。', '我的健康支持我的学业表现。'] },
        ],
        tip: '在 Daily Affirmations 扩展中设置学生类肯定语。学习前打开新标签页阅读它们——这能让大脑为专注工作做好准备。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/affirmations-for-students',
        title: 'تأكيدات للطلاب: تعزيز التركيز والتعلم',
        description: 'تأكيدات قوية مصممة للطلاب لتعزيز التركيز وتحسين التعلم وزيادة الثقة الأكاديمية وإدارة ضغط الامتحانات.',
        date: '2025-07-24',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop',
        dateDisplay: '24 يوليو 2025',
        h1: 'تأكيدات للطلاب: تعزيز التركيز والتعلم',
        intro: 'يتطلب النجاح الأكاديمي وضوحاً عقلياً وثقة. استخدم التأكيدات لبناء التركيز وتقليل قلق الامتحان والحفاظ على الدافعية.',
        alt: 'طالب يدرس بتركيز وتصميم',
        categories: [
            { h: 'التركيز والانتباه', items: ['أركز انتباهي على مهمة واحدة في كل مرة.', 'عقلي واضح وجاهز للتعلم.', 'أستوعب المعلومات بكفاءة وفعالية.'] },
            { h: 'الثقة', items: ['أنا مستعد جيداً وقادر على النجاح.', 'أثق بقدرتي على فهم المواد المعقدة.', 'أتعامل مع التحديات بفضول وتصميم.'] },
            { h: 'إدارة الإجهاد', items: ['أتعامل مع ضغط الامتحانات بهدوء ووضوح.', 'آخذ استراحات عند الحاجة وأعود منتعشاً.', 'رفاهي يدعم أدائي الأكاديمي.'] },
        ],
        tip: 'ثبّت تأكيدات الطلاب في الامتداد. افتح لساناً جديداً قبل الدراسة لقراءتها — هذا يهيئ عقلك للعمل المركز.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/affirmations-for-students',
        title: 'Afirmações para Estudantes: Melhorando Foco e Aprendizado',
        description: 'Afirmações para estudantes melhorarem foco, aprendizado, confiança acadêmica e gerenciarem estresse de exames.',
        date: '2025-07-24',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop',
        dateDisplay: '24 de julho de 2025',
        h1: 'Afirmações para Estudantes: Melhorando Foco e Aprendizado',
        intro: 'Sucesso acadêmico requer clareza mental e confiança. Use afirmações para construir foco, reduzir ansiedade de provas e manter motivação nos estudos.',
        alt: 'Estudante estudando com foco e determinação',
        categories: [
            { h: 'Foco & Concentração', items: ['Foco minha atenção em uma tarefa por vez.', 'Minha mente está clara e pronta para aprender.', 'Absorvo informações de forma eficiente e eficaz.'] },
            { h: 'Confiança', items: ['Estou bem preparado(a) e capaz de ter sucesso.', 'Confio na minha capacidade de entender material complexo.', 'Abordo desafios com curiosidade e determinação.'] },
            { h: 'Gestão de Estresse', items: ['Lido com pressão de exames com calma e clareza.', 'Tiro pausas quando necessário e volto renovado(a).', 'Meu bem-estar apoia meu desempenho acadêmico.'] },
        ],
        tip: 'Configure afirmações focadas em estudantes na extensão Daily Affirmations. Abra uma nova aba antes de estudar para lê-las—isso prepara sua mente para trabalho focado.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/affirmations-for-students',
        title: 'छात्रों के लिए पुष्टिकरण: फोकस और सीखने को बढ़ाना',
        description: 'फोकस बढ़ाने, सीखने में सुधार, शैक्षणिक आत्मविश्वास बढ़ाने और परीक्षा के तनाव को प्रबंधित करने के लिए छात्रों के लिए डिज़ाइन किए गए शक्तिशाली पुष्टिकरण।',
        date: '2025-07-24',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop',
        dateDisplay: '24 जुलाई 2025',
        h1: 'छात्रों के लिए पुष्टिकरण: फोकस और सीखने को बढ़ाना',
        intro: 'शैक्षणिक सफलता के लिए मानसिक स्पष्टता और आत्मविश्वास की आवश्यकता है। फोकस बनाने, परीक्षा की चिंता कम करने और अपने अध्ययन में प्रेरणा बनाए रखने के लिए पुष्टिकरण का उपयोग करें।',
        alt: 'फोकस और दृढ़ता के साथ पढ़ता छात्र',
        categories: [
            { h: 'फोकस और एकाग्रता', items: ['मैं एक समय में एक कार्य पर अपना ध्यान केंद्रित करता/करती हूँ।', 'मेरा मन स्पष्ट है और सीखने के लिए तैयार है।', 'मैं जानकारी को कुशलता और प्रभावी ढंग से अवशोषित करता/करती हूँ।'] },
            { h: 'आत्मविश्वास', items: ['मैं अच्छी तरह से तैयार हूँ/हूँ और सफलता के लिए सक्षम हूँ।', 'मैं जटिल सामग्री को समझने की अपनी क्षमता पर भरोसा करता/करती हूँ।', 'मैं जिज्ञासा और दृढ़ता के साथ चुनौतियों का सामना करता/करती हूँ।'] },
            { h: 'तनाव प्रबंधन', items: ['मैं परीक्षा के दबाव को शांति और स्पष्टता के साथ संभालता/संभालती हूँ।', 'मैं जरूरत पड़ने पर ब्रेक लेता/लेती हूँ और तरोताजा वापस आता/आती हूँ।', 'मेरा कल्याण मेरे शैक्षणिक प्रदर्शन का समर्थन करता है।'] },
        ],
        tip: 'Daily Affirmations एक्सटेंशन में छात्र-केंद्रित पुष्टिकरण सेट करें। अध्ययन से पहले एक नई टैब खोलकर उन्हें पढ़ें — यह आपके मन को केंद्रित कार्य के लिए तैयार करता है।'
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
                        {t.categories.map((cat: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{cat.h}</h2>
                                <ul>
                                    {cat.items.map((it: string, j: number) => (
                                        <li key={j}>{it}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">📚 {lang === 'ru' ? 'Учебная поддержка' : lang === 'zh' ? '学习支持' : lang === 'ar' ? 'الدعم الدراسي' : lang === 'pt' ? 'Suporte de estudos' : lang === 'hi' ? 'अध्ययन सहायता' : 'Study support'}</h3>
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

