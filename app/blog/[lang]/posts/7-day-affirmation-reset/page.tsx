'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/7-day-affirmation-reset',
        title: 'The 7-Day Affirmation Reset: Your Quick Start Guide',
        description: 'Jumpstart your affirmation practice with this comprehensive 7-day program. Get daily affirmations, exercises, and guidance to transform your mindset in just one week.',
        date: '2025-05-21',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop',
        dateDisplay: 'May 21, 2025',
        h1: 'The 7-Day Affirmation Reset: Your Quick Start Guide',
        intro: 'Ready to transform your mindset in just one week? This 7-day program gives you everything you need to build a powerful affirmation practice.',
        alt: 'Calendar with 7 days highlighted representing the 7-day program',
        days: [
            { day: 'Day 1: Foundation', affirmation: 'I am open to positive change in my life.', activity: 'Write down 3 values that matter most to you. Choose affirmations that align with these values.' },
            { day: 'Day 2: Clarity', affirmation: 'I clearly see what I want to create in my life.', activity: 'List 5 goals for the next 90 days. Create one affirmation for each goal.' },
            { day: 'Day 3: Action', affirmation: 'I take consistent action toward my goals.', activity: 'Identify one small action you can take today that moves you toward your goals.' },
            { day: 'Day 4: Resilience', affirmation: 'I bounce back from setbacks with ease and grace.', activity: 'Reflect on a recent challenge and write an affirmation about your ability to overcome obstacles.' },
            { day: 'Day 5: Gratitude', affirmation: 'I appreciate the good in my life and attract more.', activity: 'Write down 10 things you\'re grateful for. Notice how gratitude shifts your energy.' },
            { day: 'Day 6: Confidence', affirmation: 'I trust myself to make the right decisions.', activity: 'Recall a time you trusted your intuition and it served you well. Affirm this ability.' },
            { day: 'Day 7: Integration', affirmation: 'I integrate positive change into my daily life.', activity: 'Design your daily affirmation routine. Commit to practicing for at least 5 minutes each morning.' },
        ],
        tip: 'Use the Daily Affirmations extension to set up your personalized affirmation library. Save all 7 affirmations from this reset, and create a daily routine that shows them automatically in your new tab.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/7-day-affirmation-reset',
        title: '7-дневный сброс аффирмаций: ваше руководство по быстрому старту',
        description: 'Запустите свою практику аффирмаций с помощью этой комплексной 7-дневной программы. Получайте ежедневные аффирмации, упражнения и руководство для трансформации вашего мышления всего за одну неделю.',
        date: '2025-05-21',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop',
        dateDisplay: '21 мая 2025',
        h1: '7-дневный сброс аффирмаций: ваше руководство по быстрому старту',
        intro: 'Готовы трансформировать мышление всего за неделю? Эта 7-дневная программа даёт всё необходимое для мощной практики аффирмаций.',
        alt: 'Календарь с выделенными 7 днями — символ 7-дневной программы',
        days: [
            { day: 'День 1: Основа', affirmation: 'Я открыт(а) к позитивным изменениям в своей жизни.', activity: 'Запишите 3 ценности, которые важнее всего. Выберите аффирмации, согласованные с этими ценностями.' },
            { day: 'День 2: Ясность', affirmation: 'Я ясно вижу, что хочу создать в своей жизни.', activity: 'Составьте список из 5 целей на следующие 90 дней. Создайте по одной аффирмации для каждой цели.' },
            { day: 'День 3: Действие', affirmation: 'Я принимаю последовательные действия для достижения своих целей.', activity: 'Определите одно небольшое действие, которое можете сделать сегодня для движения к целям.' },
            { day: 'День 4: Устойчивость', affirmation: 'Я легко и с достоинством восстанавливаюсь после неудач.', activity: 'Подумайте о недавнем вызове и напишите аффирмацию о своей способности преодолевать препятствия.' },
            { day: 'День 5: Благодарность', affirmation: 'Я ценю хорошее в своей жизни и привлекаю больше.', activity: 'Запишите 10 вещей, за которые благодарны. Заметьте, как благодарность меняет вашу энергию.' },
            { day: 'День 6: Уверенность', affirmation: 'Я доверяю себе принимать правильные решения.', activity: 'Вспомните момент, когда доверились интуиции, и это помогло. Подтвердите эту способность.' },
            { day: 'День 7: Интеграция', affirmation: 'Я интегрирую позитивные изменения в свою повседневную жизнь.', activity: 'Создайте свою ежедневную практику аффирмаций. Обязательно практикуйте не менее 5 минут каждое утро.' },
        ],
        tip: 'Используйте расширение Daily Affirmations для настройки персонализированной библиотеки. Сохраните все 7 аффирмаций из этого сброса и создайте ежедневный ритуал, который показывает их автоматически в новой вкладке.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/7-day-affirmation-reset',
        title: '7天肯定语重置：快速入门指南',
        description: '通过这个全面的7天计划快速启动你的肯定语练习。获得每日肯定语、练习和指导，在一周内转变你的思维方式。',
        date: '2025-05-21',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop',
        dateDisplay: '2025年5月21日',
        h1: '7天肯定语重置：快速入门指南',
        intro: '准备在一周内转变你的思维方式吗？这个7天计划为你提供建立强大肯定语练习所需的一切。',
        alt: '标记了7天的日历，代表7天计划',
        days: [
            { day: '第1天：基础', affirmation: '我对生活中的积极改变持开放态度。', activity: '写下3个对你最重要的价值观。选择与这些价值观一致的肯定语。' },
            { day: '第2天：清晰', affirmation: '我清楚地看到我想在生活中创造什么。', activity: '列出未来90天的5个目标。为每个目标创建一个肯定语。' },
            { day: '第3天：行动', affirmation: '我持续采取行动朝着目标前进。', activity: '确定今天可以做的一个小行动，让你更接近目标。' },
            { day: '第4天：韧性', affirmation: '我轻松优雅地从挫折中恢复。', activity: '反思最近的挑战，写下关于你克服障碍能力的肯定语。' },
            { day: '第5天：感恩', affirmation: '我感激生活中的美好并吸引更多。', activity: '写下10件你感激的事。注意感恩如何改变你的能量。' },
            { day: '第6天：自信', affirmation: '我相信自己能做出正确的决定。', activity: '回想你信任直觉并从中受益的时刻。肯定这种能力。' },
            { day: '第7天：整合', affirmation: '我将积极改变融入日常生活。', activity: '设计你的每日肯定语例行程序。承诺每天早上至少练习5分钟。' },
        ],
        tip: '使用 Daily Affirmations 扩展设置你的个性化肯定语库。保存此次重置的所有7条肯定语，并创建一个每日例行程序，自动在新标签页中显示它们。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/7-day-affirmation-reset',
        title: 'إعادة تعيين التأكيدات لمدة 7 أيام: دليل البدء السريع',
        description: 'ابدأ ممارسة التأكيدات مع هذا البرنامج الشامل لمدة 7 أيام. احصل على التأكيدات اليومية والتمارين والإرشاد لتحويل طريقة تفكيرك في أسبوع واحد فقط.',
        date: '2025-05-21',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop',
        dateDisplay: '21 مايو 2025',
        h1: 'إعادة تعيين التأكيدات لمدة 7 أيام: دليل البدء السريع',
        intro: 'جاهز لتحويل طريقة تفكيرك في أسبوع واحد فقط؟ هذا البرنامج لمدة 7 أيام يمنحك كل ما تحتاجه لبناء ممارسة تأكيدات قوية.',
        alt: 'تقويم مع 7 أيام مميزة ترمز للبرنامج',
        days: [
            { day: 'اليوم 1: الأساس', affirmation: 'أنا منفتح على التغيير الإيجابي في حياتي.', activity: 'اكتب 3 قيم مهمة بالنسبة لك. اختر تأكيدات تتماشى مع هذه القيم.' },
            { day: 'اليوم 2: الوضوح', affirmation: 'أرى بوضوح ما أريد إنشاؤه في حياتي.', activity: 'اذكر 5 أهداف للـ 90 يوماً القادمة. أنشئ تأكيداً واحداً لكل هدف.' },
            { day: 'اليوم 3: الفعل', affirmation: 'أتخذ إجراءات متسقة تجاه أهدافي.', activity: 'حدد إجراءاً صغيراً يمكنك اتخاذه اليوم يحركك نحو أهدافك.' },
            { day: 'اليوم 4: المرونة', affirmation: 'أتعافى من النكسات بسهولة ونعمة.', activity: 'فكر في تحدي حديث واكتب تأكيداً عن قدرتك على التغلب على العقبات.' },
            { day: 'اليوم 5: الامتنان', affirmation: 'أقدر الخير في حياتي وأجذب المزيد.', activity: 'اكتب 10 أشياء أنت ممتن لها. لاحظ كيف يغير الامتنان طاقتك.' },
            { day: 'اليوم 6: الثقة', affirmation: 'أثق بنفسي لاتخاذ القرارات الصحيحة.', activity: 'تذكر وقتاً وثقت فيه بحدسك وخدمك جيداً. أكد هذه القدرة.' },
            { day: 'اليوم 7: التكامل', affirmation: 'أدمج التغيير الإيجابي في حياتي اليومية.', activity: 'صمم روتينك اليومي للتأكيدات. التزم بممارسة 5 دقائق على الأقل كل صباح.' },
        ],
        tip: 'استخدم الامتداد لإعداد مكتبة التأكيدات المخصصة. احفظ التأكيدات الـ 7 من هذا الإعادة واصنع روتيناً يومياً يعرضها تلقائياً في اللسان الجديد.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/7-day-affirmation-reset',
        title: 'O Reset de Afirmações de 7 Dias: Seu Guia de Início Rápido',
        description: 'Inicie sua prática de afirmações com este programa abrangente de 7 dias. Receba afirmações diárias, exercícios e orientação para transformar sua mentalidade em apenas uma semana.',
        date: '2025-05-21',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop',
        dateDisplay: '21 de maio de 2025',
        h1: 'O Reset de Afirmações de 7 Dias: Seu Guia de Início Rápido',
        intro: 'Pronto para transformar sua mentalidade em apenas uma semana? Este programa de 7 dias oferece tudo o que você precisa para construir uma prática poderosa de afirmações.',
        alt: 'Calendário com 7 dias destacados representando o programa',
        days: [
            { day: 'Dia 1: Fundação', affirmation: 'Estou aberto(a) a mudanças positivas em minha vida.', activity: 'Escreva 3 valores que mais importam. Escolha afirmações alinhadas com esses valores.' },
            { day: 'Dia 2: Clareza', affirmation: 'Vejo claramente o que quero criar em minha vida.', activity: 'Liste 5 metas para os próximos 90 dias. Crie uma afirmação para cada meta.' },
            { day: 'Dia 3: Ação', affirmation: 'Tomo ações consistentes em direção às minhas metas.', activity: 'Identifique uma pequena ação que pode fazer hoje para avançar em suas metas.' },
            { day: 'Dia 4: Resiliência', affirmation: 'Me recupero de contratempos com facilidade e graça.', activity: 'Reflita sobre um desafio recente e escreva uma afirmação sobre sua capacidade de superar obstáculos.' },
            { day: 'Dia 5: Gratidão', affirmation: 'Aprecio o bem em minha vida e atraio mais.', activity: 'Escreva 10 coisas pelas quais é grato(a). Note como a gratidão muda sua energia.' },
            { day: 'Dia 6: Confiança', affirmation: 'Confio em mim para tomar as decisões certas.', activity: 'Lembre-se de quando confiou em sua intuição e isso serviu bem. Afirme essa capacidade.' },
            { day: 'Dia 7: Integração', affirmation: 'Integro mudanças positivas em minha vida diária.', activity: 'Projete sua rotina diária de afirmações. Comprometa-se a praticar pelo menos 5 minutos toda manhã.' },
        ],
        tip: 'Use a extensão Daily Affirmations para configurar sua biblioteca personalizada. Salve todas as 7 afirmações deste reset e crie uma rotina diária que as mostre automaticamente na nova aba.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/7-day-affirmation-reset',
        title: '7-दिवसीय पुष्टिकरण रीसेट: आपका त्वरित स्टार्ट गाइड',
        description: 'इस व्यापक 7-दिवसीय कार्यक्रम के साथ अपने पुष्टिकरण अभ्यास को शुरू करें। दैनिक पुष्टिकरण, व्यायाम और मार्गदर्शन प्राप्त करें ताकि सिर्फ एक सप्ताह में अपनी मानसिकता को बदल सकें।',
        date: '2025-05-21',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop',
        dateDisplay: '21 मई 2025',
        h1: '7-दिवसीय पुष्टिकरण रीसेट: आपका त्वरित स्टार्ट गाइड',
        intro: 'सिर्फ एक सप्ताह में अपनी मानसिकता को बदलने के लिए तैयार हैं? यह 7-दिवसीय कार्यक्रम आपको शक्तिशाली पुष्टिकरण अभ्यास बनाने के लिए आवश्यक सभी चीज़ें देता है।',
        alt: '7 दिनों के साथ कैलेंडर — 7-दिवसीय कार्यक्रम का प्रतीक',
        days: [
            { day: 'दिन 1: नींव', affirmation: 'मैं अपने जीवन में सकारात्मक परिवर्तन के लिए खुला/खुली हूँ।', activity: '3 मूल्य लिखें जो आपके लिए सबसे महत्वपूर्ण हैं। इन मूल्यों के अनुरूप पुष्टिकरण चुनें।' },
            { day: 'दिन 2: स्पष्टता', affirmation: 'मैं स्पष्ट रूप से देखता/देखती हूँ कि मैं अपने जीवन में क्या बनाना चाहता/चाहती हूँ।', activity: 'अगले 90 दिनों के लिए 5 लक्ष्य सूचीबद्ध करें。 प्रत्येक लक्ष्य के लिए एक पुष्टिकरण बनाएं।' },
            { day: 'दिन 3: कार्रवाई', affirmation: 'मैं अपने लक्ष्यों की ओर लगातार कार्रवाई करता/करती हूँ।', activity: 'एक छोटी कार्रवाई की पहचान करें जो आप आज कर सकते हैं जो आपको अपने लक्ष्यों की ओर ले जाती है।' },
            { day: 'दिन 4: लचीलापन', affirmation: 'मैं आसानी और अनुग्रह के साथ असफलताओं से उबरता/उबरती हूँ।', activity: 'हाल की चुनौती पर प्रतिबिंबित करें और बाधाओं को दूर करने की अपनी क्षमता के बारे में एक पुष्टिकरण लिखें।' },
            { day: 'दिन 5: कृतज्ञता', affirmation: 'मैं अपने जीवन में अच्छे की सराहना करता/करती हूँ और अधिक को आकर्षित करता/करती हूँ।', activity: '10 चीज़ें लिखें जिनके लिए आप आभारी हैं। ध्यान दें कि कृतज्ञता आपकी ऊर्जा को कैसे बदलती है।' },
            { day: 'दिन 6: आत्मविश्वास', affirmation: 'मैं सही निर्णय लेने के लिए खुद पर भरोसा करता/करती हूँ।', activity: 'एक समय याद करें जब आपने अपनी अंतर्दृष्टि पर भरोसा किया और इसने आपकी अच्छी सेवा की। इस क्षमता की पुष्टि करें।' },
            { day: 'दिन 7: एकीकरण', affirmation: 'मैं सकारात्मक परिवर्तन को अपने दैनिक जीवन में एकीकृत करता/करती हूँ।', activity: 'अपनी दैनिक पुष्टिकरण दिनचर्या डिज़ाइन करें। हर सुबह कम से कम 5 मिनट अभ्यास करने का वचन दें।' },
        ],
        tip: 'अपनी व्यक्तिगत पुष्टिकरण लाइब्रेरी सेटअप करने के लिए Daily Affirmations एक्सटेंशन का उपयोग करें। इस रीसेट से सभी 7 पुष्टिकरण सहेजें और एक दैनिक दिनचर्या बनाएं जो उन्हें नई टैब में स्वचालित रूप से दिखाती है।'
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
                        {t.days.map((d: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{d.day}</h2>
                                <p><strong>{lang === 'ru' ? 'Аффирмация дня:' : lang === 'zh' ? '当日肯定语：' : lang === 'ar' ? 'تأكيد اليوم:' : lang === 'pt' ? 'Afirmação do dia:' : lang === 'hi' ? 'दिन का पुष्टिकरण:' : 'Daily Affirmation:'}</strong> "{d.affirmation}"</p>
                                <p><strong>{lang === 'ru' ? 'Активность:' : lang === 'zh' ? '活动：' : lang === 'ar' ? 'النشاط:' : lang === 'pt' ? 'Atividade:' : lang === 'hi' ? 'गतिविधि:' : 'Activity:'}</strong> {d.activity}</p>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">📅 {lang === 'ru' ? 'Начните сегодня' : lang === 'zh' ? '今天开始' : lang === 'ar' ? 'ابدأ اليوم' : lang === 'pt' ? 'Comece hoje' : lang === 'hi' ? 'आज शुरू करें' : 'Start today'}</h3>
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

