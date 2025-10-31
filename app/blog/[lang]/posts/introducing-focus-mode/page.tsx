'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/introducing-focus-mode',
        title: 'Introducing Focus Mode: Your Gateway to Mindful Moments',
        description: 'Transform your new tab into a serene sanctuary with our most requested feature. Focus Mode removes distractions and creates a perfect environment for mindfulness.',
        date: '2024-01-23',
        category: 'Feature Update',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: 'January 23, 2024',
        h1: 'Introducing Focus Mode: Your Gateway to Mindful Moments',
        intro: 'We\'re thrilled to introduce Focus Mode—a serene, distraction-free environment designed to help you create mindful moments throughout your day.',
        alt: 'Peaceful workspace representing focus and mindfulness',
        body: [
            {
                heading: 'What is Focus Mode?',
                text: 'Focus Mode transforms your browser\'s new tab page into a minimalist, distraction-free space:',
                items: [
                    'Clean, minimalist design with your affirmations',
                    'Removed clutter and visual noise',
                    'Optional timer for focused work sessions',
                    'Gentle color palette to reduce eye strain',
                    'Full customization of background and text'
                ]
            },
            {
                heading: 'Key Features',
                text: 'Focus Mode includes powerful features to support your mindfulness practice:',
                items: [
                    'Affirmations display prominently without distractions',
                    'Optional pomodoro timer integration',
                    'Quick access to meditation timers',
                    'Customizable themes (Light, Dark, Minimal)',
                    'Keyboard shortcuts for quick access'
                ]
            },
            {
                heading: 'How to Enable Focus Mode',
                text: 'Activating Focus Mode takes just seconds:',
                items: [
                    'Open your Daily Affirmations extension settings',
                    'Navigate to "Display" or "Appearance" section',
                    'Toggle "Focus Mode" to ON',
                    'Customize your preferred theme',
                    'Your next new tab will automatically use Focus Mode'
                ]
            }
        ],
        cta: 'Ready to experience mindful browsing? Enable Focus Mode in your Daily Affirmations extension settings and transform every new tab into a moment of presence and inspiration.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/introducing-focus-mode',
        title: 'Режим концентрации: Ваш путь к осознанным моментам',
        description: 'Превратите вашу новую вкладку в безмятежное убежище с помощью самой востребованной функции. Режим концентрации убирает отвлечения и создает идеальную среду для осознанности.',
        date: '2024-01-23',
        category: 'Обновление функций',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: '23 января 2024',
        h1: 'Режим концентрации: Ваш путь к осознанным моментам',
        intro: 'Мы рады представить Режим концентрации — спокойную среду без отвлечений, предназначенную для создания осознанных моментов в течение дня.',
        alt: 'Спокойное рабочее пространство — символ концентрации и осознанности',
        body: [
            {
                heading: 'Что такое Режим концентрации?',
                text: 'Режим концентрации превращает новую страницу вкладки браузера в минималистичное пространство без отвлечений:',
                items: [
                    'Чистый минималистичный дизайн с вашими аффирмациями',
                    'Убран беспорядок и визуальный шум',
                    'Опциональный таймер для рабочих сессий',
                    'Мягкая цветовая палитра для снижения напряжения глаз',
                    'Полная настройка фона и текста'
                ]
            },
            {
                heading: 'Ключевые функции',
                text: 'Режим концентрации включает мощные функции для поддержки практики осознанности:',
                items: [
                    'Аффирмации отображаются заметно без отвлечений',
                    'Интеграция опционального таймера помодоро',
                    'Быстрый доступ к таймерам медитации',
                    'Настраиваемые темы (Светлая, Темная, Минимальная)',
                    'Горячие клавиши для быстрого доступа'
                ]
            },
            {
                heading: 'Как включить Режим концентрации',
                text: 'Активация Режима концентрации занимает секунды:',
                items: [
                    'Откройте настройки расширения Daily Affirmations',
                    'Перейдите в раздел "Отображение" или "Внешний вид"',
                    'Переключите "Режим концентрации" на ВКЛ',
                    'Настройте предпочитаемую тему',
                    'Ваша следующая новая вкладка автоматически будет использовать Режим концентрации'
                ]
            }
        ],
        cta: 'Готовы испытать осознанный просмотр? Включите Режим концентрации в настройках расширения Daily Affirmations и превратите каждую новую вкладку в момент присутствия и вдохновения.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/introducing-focus-mode',
        title: '专注模式：通往正念时刻的大门',
        description: '通过我们最受欢迎的功能，将你的新标签页转变为宁静的圣地。专注模式移除干扰，为正念创造完美环境。',
        date: '2024-01-23',
        category: '功能更新',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: '2024年1月23日',
        h1: '专注模式：通往正念时刻的大门',
        intro: '我们很高兴推出专注模式——一个宁静、无干扰的环境，帮助你在一天中创造正念时刻。',
        alt: '宁静的工作空间，代表专注与正念',
        body: [
            {
                heading: '什么是专注模式？',
                text: '专注模式将浏览器的新标签页转变为极简、无干扰的空间：',
                items: [
                    '干净、极简的设计，展示你的肯定语',
                    '移除杂乱和视觉噪音',
                    '可选的工作会话计时器',
                    '柔和的调色板，减少眼部疲劳',
                    '完全自定义背景和文本'
                ]
            },
            {
                heading: '主要功能',
                text: '专注模式包含强大功能以支持你的正念练习：',
                items: [
                    '肯定语显著显示，无干扰',
                    '可选番茄钟计时器集成',
                    '快速访问冥想计时器',
                    '可自定义主题（浅色、深色、极简）',
                    '快速访问的键盘快捷键'
                ]
            },
            {
                heading: '如何启用专注模式',
                text: '激活专注模式只需几秒钟：',
                items: [
                    '打开 Daily Affirmations 扩展设置',
                    '导航到"显示"或"外观"部分',
                    '将"专注模式"切换为开启',
                    '自定义你喜欢的主题',
                    '你的下一个新标签页将自动使用专注模式'
                ]
            }
        ],
        cta: '准备好体验正念浏览了吗？在 Daily Affirmations 扩展设置中启用专注模式，将每个新标签页转变为专注与灵感的时刻。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/introducing-focus-mode',
        title: 'وضع التركيز: بوابتك إلى لحظات اليقظة',
        description: 'حول لسان التبويب الجديد إلى ملاذ هادئ مع الميزة الأكثر طلباً. وضع التركيز يزيل الانحرافات وينشئ بيئة مثالية لليقظة.',
        date: '2024-01-23',
        category: 'تحديث الميزات',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: '23 يناير 2024',
        h1: 'وضع التركيز: بوابتك إلى لحظات اليقظة',
        intro: 'يسعدنا تقديم وضع التركيز—بيئة هادئة خالية من الانحرافات مصممة لمساعدتك في إنشاء لحظات يقظة طوال يومك.',
        alt: 'مساحة عمل هادئة ترمز للتركيز واليقظة',
        body: [
            {
                heading: 'ما هو وضع التركيز؟',
                text: 'يحول وضع التركيز صفحة اللسان الجديدة للمتصفح إلى مساحة بسيطة خالية من الانحرافات:',
                items: [
                    'تصميم نظيف وبسيط مع تأكيداتك',
                    'إزالة الفوضى والضوضاء البصرية',
                    'مؤقت اختياري لجلسات العمل المركزة',
                    'لوحة ألوان ناعمة لتقليل إجهاد العين',
                    'تخصيص كامل للخلفية والنص'
                ]
            },
            {
                heading: 'الميزات الرئيسية',
                text: 'يتضمن وضع التركيز ميزات قوية لدعم ممارسة اليقظة:',
                items: [
                    'عرض التأكيدات بشكل بارز دون انحرافات',
                    'تكامل مؤقت بومودورو اختياري',
                    'وصول سريع لمؤقتات التأمل',
                    'مواضيع قابلة للتخصيص (فاتح، داكن، بسيط)',
                    'اختصارات لوحة المفاتيح للوصول السريع'
                ]
            },
            {
                heading: 'كيفية تفعيل وضع التركيز',
                text: 'تفعيل وضع التركيز يستغرق ثوانٍ فقط:',
                items: [
                    'افتح إعدادات امتداد Daily Affirmations',
                    'انتقل إلى قسم "العرض" أو "المظهر"',
                    'قم بتبديل "وضع التركيز" إلى تشغيل',
                    'خصص موضوعك المفضل',
                    'لسان التبويب الجديد التالي سيستخدم تلقائياً وضع التركيز'
                ]
            }
        ],
        cta: 'جاهز لتجربة التصفح اليقظ؟ فعّل وضع التركيز في إعدادات الامتداد وحوّل كل لسان جديد إلى لحظة حضور وإلهام.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/introducing-focus-mode',
        title: 'Modo Foco: Sua Porta de Entrada para Momentos de Atenção Plena',
        description: 'Transforme sua nova aba em um santuário sereno com nosso recurso mais solicitado. O Modo Foco remove distrações e cria um ambiente perfeito para atenção plena.',
        date: '2024-01-23',
        category: 'Atualização de Recurso',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: '23 de janeiro de 2024',
        h1: 'Modo Foco: Sua Porta de Entrada para Momentos de Atenção Plena',
        intro: 'Estamos animados em apresentar o Modo Foco—um ambiente sereno e sem distrações projetado para ajudá-lo a criar momentos de atenção plena ao longo do dia.',
        alt: 'Espaço de trabalho pacífico representando foco e atenção plena',
        body: [
            {
                heading: 'O que é o Modo Foco?',
                text: 'O Modo Foco transforma a página de nova aba do navegador em um espaço minimalista sem distrações:',
                items: [
                    'Design limpo e minimalista com suas afirmações',
                    'Remoção de desordem e ruído visual',
                    'Timer opcional para sessões de trabalho focadas',
                    'Paleta de cores suave para reduzir fadiga ocular',
                    'Personalização completa de fundo e texto'
                ]
            },
            {
                heading: 'Recursos Principais',
                text: 'O Modo Foco inclui recursos poderosos para apoiar sua prática de atenção plena:',
                items: [
                    'Afirmações exibidas prominentemente sem distrações',
                    'Integração opcional de timer pomodoro',
                    'Acesso rápido a timers de meditação',
                    'Temas personalizáveis (Claro, Escuro, Minimal)',
                    'Atalhos de teclado para acesso rápido'
                ]
            },
            {
                heading: 'Como Ativar o Modo Foco',
                text: 'Ativar o Modo Foco leva apenas segundos:',
                items: [
                    'Abra as configurações da extensão Daily Affirmations',
                    'Navegue até a seção "Exibição" ou "Aparência"',
                    'Alterne "Modo Foco" para LIGADO',
                    'Personalize seu tema preferido',
                    'Sua próxima nova aba usará automaticamente o Modo Foco'
                ]
            }
        ],
        cta: 'Pronto para experimentar navegação consciente? Ative o Modo Foco nas configurações da extensão Daily Affirmations e transforme cada nova aba em um momento de presença e inspiração.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/introducing-focus-mode',
        title: 'फोकस मोड: माइंडफुल क्षणों के लिए आपका प्रवेश द्वार',
        description: 'हमारी सबसे अधिक मांग वाली सुविधा के साथ अपने नए टैब को शांत आश्रम में बदलें। फोकस मोड विचलन हटाता है और माइंडफुलनेस के लिए एक आदर्श वातावरण बनाता है।',
        date: '2024-01-23',
        category: 'सुविधा अपडेट',
        image: 'https://images.unsplash.com/photo-1493225457124-a3b1616bb1d0?w=1200&h=630&fit=crop',
        dateDisplay: '23 जनवरी 2024',
        h1: 'फोकस मोड: माइंडफुल क्षणों के लिए आपका प्रवेश द्वार',
        intro: 'हम फोकस मोड का परिचय देकर उत्साहित हैं—एक शांत, विचलन-मुक्त वातावरण जो आपके दिन भर माइंडफुल क्षण बनाने में मदद करने के लिए डिज़ाइन किया गया है।',
        alt: 'शांतिपूर्ण कार्यक्षेत्र — फोकस और माइंडफुलनेस का प्रतीक',
        body: [
            {
                heading: 'फोकस मोड क्या है?',
                text: 'फोकस मोड आपके ब्राउज़र के नए टैब पेज को एक न्यूनतम, विचलन-मुक्त स्थान में बदलता है:',
                items: [
                    'आपके पुष्टिकरण के साथ साफ, न्यूनतम डिज़ाइन',
                    'अव्यवस्था और दृश्य शोर हटाया गया',
                    'केंद्रित कार्य सत्रों के लिए वैकल्पिक टाइमर',
                    'आँखों के तनाव को कम करने के लिए सौम्य रंग पैलेट',
                    'पृष्ठभूमि और पाठ की पूर्ण अनुकूलन'
                ]
            },
            {
                heading: 'मुख्य सुविधाएँ',
                text: 'फोकस मोड में आपकी माइंडफुलनेस अभ्यास का समर्थन करने के लिए शक्तिशाली सुविधाएँ शामिल हैं:',
                items: [
                    'विचलन के बिना प्रमुख रूप से पुष्टिकरण प्रदर्शन',
                    'वैकल्पिक पोमोडोरो टाइमर एकीकरण',
                    'ध्यान टाइमर तक त्वरित पहुँच',
                    'अनुकूलन योग्य थीम (लाइट, डार्क, मिनिमल)',
                    'त्वरित पहुँच के लिए कीबोर्ड शॉर्टकट'
                ]
            },
            {
                heading: 'फोकस मोड कैसे सक्षम करें',
                text: 'फोकस मोड को सक्रिय करने में सिर्फ कुछ सेकंड लगते हैं:',
                items: [
                    'अपने Daily Affirmations एक्सटेंशन सेटिंग्स खोलें',
                    '"डिस्प्ले" या "अपीयरेंस" सेक्शन पर नेविगेट करें',
                    '"फोकस मोड" को ON पर टॉगल करें',
                    'अपनी पसंदीदा थीम कस्टमाइज़ करें',
                    'आपका अगला नया टैब स्वचालित रूप से फोकस मोड का उपयोग करेगा'
                ]
            }
        ],
        cta: 'माइंडफुल ब्राउज़िंग का अनुभव करने के लिए तैयार हैं? अपने Daily Affirmations एक्सटेंशन सेटिंग्स में फोकस मोड सक्षम करें और हर नए टैब को उपस्थिति और प्रेरणा के क्षण में बदलें।'
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
                        {t.body.map((section: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{section.heading}</h2>
                                <p>{section.text}</p>
                                <ul>
                                    {section.items.map((item: string, j: number) => (
                                        <li key={j}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <div className="bg-neutral-900/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">🚀 {lang === 'ru' ? 'Начните использовать' : lang === 'zh' ? '开始使用' : lang === 'ar' ? 'ابدأ الاستخدام' : lang === 'pt' ? 'Comece a usar' : lang === 'hi' ? 'उपयोग शुरू करें' : 'Get started'}</h3>
                            <p>{t.cta}</p>
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

