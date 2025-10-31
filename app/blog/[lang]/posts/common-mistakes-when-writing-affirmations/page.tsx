'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/common-mistakes-when-writing-affirmations',
        title: 'Common Mistakes When Writing Affirmations: What to Avoid',
        description: 'Learn the most common mistakes people make when writing affirmations and how to avoid them. Create more effective affirmations that actually work.',
        date: '2025-02-20',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop',
        dateDisplay: 'February 20, 2025',
        h1: 'Common Mistakes When Writing Affirmations: What to Avoid',
        intro: 'Many affirmations fail because of simple writing mistakes. Avoid these pitfalls to create affirmations that resonate and create real change.',
        alt: 'Handwriting with corrections representing writing mistakes',
        mistakes: [
            { mistake: 'Using Future Tense', problem: '"I will be confident" delays the feeling.', solution: 'Use present tense: "I am confident" or "I am becoming more confident each day."' },
            { mistake: 'Negative Language', problem: 'Negatives reinforce what you don\'t want.', solution: 'Say "I release stress" instead of "I am not stressed." Focus on what you want, not what you avoid.' },
            { mistake: 'Being Too Vague', problem: '"I am successful" lacks specificity.', solution: 'Be specific: "I confidently complete projects on time" or "I make decisions that align with my values."' },
            { mistake: 'Unrealistic Statements', problem: 'If you don\'t believe it, your mind rejects it.', solution: 'Start where you are: "I am learning to trust myself" instead of "I always trust myself."' },
            { mistake: 'Too Long or Complex', problem: 'Hard to remember and repeat consistently.', solution: 'Keep it short, simple, and memorable. Aim for 5-10 words.' },
        ],
        tip: 'Use the Daily Affirmations extension to save your well-crafted affirmations. The extension helps you practice them consistently and avoid common pitfalls with its structured approach.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/common-mistakes-when-writing-affirmations',
        title: 'Частые ошибки при написании аффирмаций: чего избегать',
        description: 'Узнайте самые частые ошибки при написании аффирмаций и как их избежать. Создавайте более эффективные аффирмации, которые работают.',
        date: '2025-02-20',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop',
        dateDisplay: '20 февраля 2025',
        h1: 'Частые ошибки при написании аффирмаций: чего избегать',
        intro: 'Многие аффирмации не работают из-за простых ошибок в написании. Избегайте этих ловушек, чтобы создавать аффирмации, которые резонируют и создают реальные изменения.',
        alt: 'Рукопись с правками — символ ошибок в написании',
        mistakes: [
            { mistake: 'Использование будущего времени', problem: '"Я буду уверен(а)" откладывает чувство.', solution: 'Используйте настоящее время: "Я уверен(а)" или "Я становлюсь увереннее с каждым днём."' },
            { mistake: 'Отрицательный язык', problem: 'Отрицания укрепляют то, чего вы не хотите.', solution: 'Говорите "Я отпускаю стресс" вместо "Я не в стрессе." Фокусируйтесь на том, что хотите, а не на том, чего избегаете.' },
            { mistake: 'Слишком расплывчато', problem: '"Я успешен(на)" лишено конкретики.', solution: 'Будьте конкретны: "Я уверенно завершаю проекты вовремя" или "Я принимаю решения, согласованные с моими ценностями."' },
            { mistake: 'Нереалистичные утверждения', problem: 'Если вы не верите, ваш ум это отвергает.', solution: 'Начинайте там, где вы есть: "Я учусь доверять себе" вместо "Я всегда доверяю себе."' },
            { mistake: 'Слишком длинные или сложные', problem: 'Трудно запомнить и повторять последовательно.', solution: 'Держите коротко, просто и запоминающеся. Стремитесь к 5-10 словам.' },
        ],
        tip: 'Используйте расширение Daily Affirmations для сохранения хорошо составленных аффирмаций. Расширение помогает практиковать их последовательно и избегать частых ошибок благодаря структурированному подходу.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/common-mistakes-when-writing-affirmations',
        title: '写肯定语时的常见错误：要避免什么',
        description: '了解写肯定语时最常见的错误以及如何避免。创建真正有效的肯定语。',
        date: '2025-02-20',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop',
        dateDisplay: '2025年2月20日',
        h1: '写肯定语时的常见错误：要避免什么',
        intro: '许多肯定语因为简单的写作错误而失效。避开这些陷阱，创建能够产生共鸣并带来真实改变的肯定语。',
        alt: '带修正的手写，代表写作错误',
        mistakes: [
            { mistake: '使用将来时', problem: '"我将变得自信"会延迟感受。', solution: '使用现在时："我自信"或"我每天都在变得更自信。"' },
            { mistake: '负面语言', problem: '否定会强化你不想要的东西。', solution: '说"我释放压力"而不是"我不压力"。专注于你想要的，而非你避免的。' },
            { mistake: '过于模糊', problem: '"我成功"缺乏具体性。', solution: '要具体："我自信地按时完成项目"或"我做出与价值观一致的决定。"' },
            { mistake: '不现实的陈述', problem: '如果你不相信，你的大脑会拒绝它。', solution: '从你所在的位置开始："我在学习信任自己"而非"我总是信任自己。"' },
            { mistake: '过长或复杂', problem: '难以记忆和持续重复。', solution: '保持简短、简单和易记。目标5-10个字。' },
        ],
        tip: '使用 Daily Affirmations 扩展保存精心制作的肯定语。扩展帮助你持续练习，并通过结构化方法避免常见陷阱。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/common-mistakes-when-writing-affirmations',
        title: 'الأخطاء الشائعة عند كتابة التأكيدات: ما يجب تجنبه',
        description: 'تعلم الأخطاء الأكثر شيوعاً عند كتابة التأكيدات وكيفية تجنبها. أنشئ تأكيدات أكثر فعالية تعمل حقاً.',
        date: '2025-02-20',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop',
        dateDisplay: '20 فبراير 2025',
        h1: 'الأخطاء الشائعة عند كتابة التأكيدات: ما يجب تجنبه',
        intro: 'تفشل العديد من التأكيدات بسبب أخطاء كتابة بسيطة. تجنب هذه المزالق لإنشاء تأكيدات تتردد صدى وتحدث تغييراً حقيقياً.',
        alt: 'كتابة يدوية مع تصحيحات ترمز لأخطاء الكتابة',
        mistakes: [
            { mistake: 'استخدام الزمن المستقبلي', problem: '"سأكون واثقاً" يؤجل الشعور.', solution: 'استخدم الحاضر: "أنا واثق" أو "أنا أتحول إلى أكثر ثقة كل يوم."' },
            { mistake: 'اللغة السلبية', problem: 'النفي يعزز ما لا تريده.', solution: 'قل "أُطلق التوتر" بدلاً من "أنا لست متوتراً." ركز على ما تريده، ليس ما تتجنبه.' },
            { mistake: 'الغموض الزائد', problem: '"أنا ناجح" يفتقر إلى التحديد.', solution: 'كن محدداً: "أكمل المشاريع بثقة في الوقت المحدد" أو "أتخذ قرارات تتماشى مع قيمي."' },
            { mistake: 'البيانات غير الواقعية', problem: 'إذا لم تؤمن بها، رأسك يرفضها.', solution: 'ابدأ من حيث أنت: "أنا أتعلم الثقة بنفسي" بدلاً من "أنا دائماً أثق بنفسي."' },
            { mistake: 'طويلة أو معقدة جداً', problem: 'صعبة التذكر والتكرار باستمرار.', solution: 'اجعلها قصيرة وبسيطة ويمكن تذكرها. هدفك 5-10 كلمات.' },
        ],
        tip: 'استخدم الامتداد لحفظ تأكيداتك المصممة جيداً. الامتداد يساعدك على ممارستها باستمرار وتجنب المزالق الشائعة.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/common-mistakes-when-writing-affirmations',
        title: 'Erros Comuns ao Escrever Afirmações: O que Evitar',
        description: 'Aprenda os erros mais comuns ao escrever afirmações e como evitá-los. Crie afirmações mais eficazes que realmente funcionam.',
        date: '2025-02-20',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop',
        dateDisplay: '20 de fevereiro de 2025',
        h1: 'Erros Comuns ao Escrever Afirmações: O que Evitar',
        intro: 'Muitas afirmações falham por erros simples de escrita. Evite essas armadilhas para criar afirmações que ressoam e criam mudanças reais.',
        alt: 'Escrita à mão com correções representando erros de escrita',
        mistakes: [
            { mistake: 'Usar Tempo Futuro', problem: '"Serei confiante" adia o sentimento.', solution: 'Use presente: "Sou confiante" ou "Estou me tornando mais confiante a cada dia."' },
            { mistake: 'Linguagem Negativa', problem: 'Negativos reforçam o que você não quer.', solution: 'Diga "Libero estresse" em vez de "Não estou estressado." Foque no que quer, não no que evita.' },
            { mistake: 'Ser Muito Vago', problem: '"Sou bem-sucedido" falta especificidade.', solution: 'Seja específico: "Confidentemente completo projetos no prazo" ou "Faço decisões alinhadas com meus valores."' },
            { mistake: 'Declarações Irrealistas', problem: 'Se não acredita, sua mente rejeita.', solution: 'Comece onde está: "Estou aprendendo a confiar em mim" em vez de "Sempre confio em mim."' },
            { mistake: 'Muito Longas ou Complexas', problem: 'Difíceis de lembrar e repetir consistentemente.', solution: 'Mantenha curtas, simples e memoráveis. Almeje 5-10 palavras.' },
        ],
        tip: 'Use a extensão Daily Affirmations para salvar suas afirmações bem elaboradas. A extensão ajuda a praticá-las consistentemente e evitar armadilhas comuns com sua abordagem estruturada.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/common-mistakes-when-writing-affirmations',
        title: 'पुष्टिकरण लिखते समय सामान्य गलतियाँ: क्या बचना है',
        description: 'पुष्टिकरण लिखते समय सबसे आम गलतियों और उनसे कैसे बचें, यह सीखें। वास्तव में काम करने वाले अधिक प्रभावी पुष्टिकरण बनाएँ।',
        date: '2025-02-20',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop',
        dateDisplay: '20 फरवरी 2025',
        h1: 'पुष्टिकरण लिखते समय सामान्य गलतियाँ: क्या बचना है',
        intro: 'कई पुष्टिकरण सरल लेखन गलतियों के कारण विफल होते हैं। प्रतिध्वनित करने वाले और वास्तविक बदलाव लाने वाले पुष्टिकरण बनाने के लिए इन जालों से बचें।',
        alt: 'सुधारों के साथ हस्तलेख — लेखन गलतियों का प्रतीक',
        mistakes: [
            { mistake: 'भविष्य काल का उपयोग', problem: '"मैं आत्मविश्वासी होऊंगा/होऊंगी" भावना को देरी देता है।', solution: 'वर्तमान काल का उपयोग करें: "मैं आत्मविश्वासी हूँ" या "मैं हर दिन अधिक आत्मविश्वासी बन रहा/रही हूँ।"' },
            { mistake: 'नकारात्मक भाषा', problem: 'नकारात्मक जो आप नहीं चाहते उसे मजबूत करते हैं।', solution: '"मैं तनाव छोड़ता/छोड़ती हूँ" कहें, "मैं तनाव में नहीं हूँ" नहीं। जो चाहते हैं उस पर ध्यान दें, जो टालते हैं उस पर नहीं।' },
            { mistake: 'बहुत अस्पष्ट होना', problem: '"मैं सफल हूँ" विशिष्टता की कमी है।', solution: 'विशिष्ट रहें: "मैं आत्मविश्वास से समय पर प्रोजेक्ट पूरा करता/करती हूँ" या "मैं अपने मूल्यों के अनुरूप निर्णय लेता/लेती हूँ।"' },
            { mistake: 'अवास्तविक कथन', problem: 'यदि आप विश्वास नहीं करते, तो आपका मन इसे अस्वीकार करता है।', solution: 'जहाँ हैं वहाँ से शुरू करें: "मैं खुद पर भरोसा करना सीख रहा/रही हूँ" "मैं हमेशा खुद पर भरोसा करता/करती हूँ" नहीं।' },
            { mistake: 'बहुत लंबा या जटिल', problem: 'याद रखना और लगातार दोहराना मुश्किल।', solution: 'छोटा, सरल और यादगार रखें। 5-10 शब्दों का लक्ष्य।' },
        ],
        tip: 'अच्छी तरह से तैयार किए गए पुष्टिकरण को सहेजने के लिए Daily Affirmations एक्सटेंशन का उपयोग करें। एक्सटेंशन संरचित दृष्टिकोण के साथ लगातार अभ्यास करने और सामान्य जालों से बचने में मदद करता है।'
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
                        {t.mistakes.map((m: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{m.mistake}</h2>
                                <p><strong>{lang === 'ru' ? 'Проблема:' : lang === 'zh' ? '问题：' : lang === 'ar' ? 'المشكلة:' : lang === 'pt' ? 'Problema:' : lang === 'hi' ? 'समस्या:' : 'Problem:'}</strong> {m.problem}</p>
                                <p><strong>{lang === 'ru' ? 'Решение:' : lang === 'zh' ? '解决方案：' : lang === 'ar' ? 'الحل:' : lang === 'pt' ? 'Solução:' : lang === 'hi' ? 'समाधान:' : 'Solution:'}</strong> {m.solution}</p>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">✅ {lang === 'ru' ? 'Правильный подход' : lang === 'zh' ? '正确方法' : lang === 'ar' ? 'النهج الصحيح' : lang === 'pt' ? 'Abordagem correta' : lang === 'hi' ? 'सही दृष्टिकोण' : 'Right approach'}</h3>
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

