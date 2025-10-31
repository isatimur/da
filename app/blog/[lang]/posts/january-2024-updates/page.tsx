'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/january-2024-updates',
        title: 'January 2024 Product Updates',
        description: 'A roundup of all the new features and improvements we\'ve added this month, including Focus Mode, Cloud Sync, and more.',
        date: '2024-01-19',
        category: 'Updates',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
        dateDisplay: 'January 19, 2024',
        h1: 'January 2024 Product Updates',
        intro: 'We\'re excited to share all the new features and improvements we\'ve launched this month. Here\'s what\'s new in Daily Affirmations.',
        alt: 'Calendar and updates representing product improvements',
        body: [
            {
                heading: '🎯 Focus Mode',
                text: 'Our most requested feature is here! Focus Mode transforms your new tab into a distraction-free environment perfect for mindfulness practice.',
                items: [
                    'Minimalist design that reduces visual clutter',
                    'Optional Pomodoro timer integration',
                    'Customizable themes and backgrounds',
                    'Keyboard shortcuts for quick access'
                ]
            },
            {
                heading: '☁️ Cloud Sync & Backup',
                text: 'Never lose your personalized affirmations again. Cloud Sync keeps your data safe and accessible across all your devices.',
                items: [
                    'Automatic backup of your affirmation library',
                    'Sync across Chrome, Edge, and other browsers',
                    'Secure encryption of your personal data',
                    'One-click restore if you switch devices'
                ]
            },
            {
                heading: '🌍 Multi-Language Support',
                text: 'Daily Affirmations now supports 6 languages, making mindfulness accessible to users worldwide.',
                items: [
                    'English, Russian, Chinese, Arabic, Portuguese, and Hindi',
                    'Fully localized interface and content',
                    'Culturally adapted affirmations',
                    'Right-to-left (RTL) support for Arabic'
                ]
            },
            {
                heading: '✨ Performance Improvements',
                text: 'Under the hood, we\'ve made Daily Affirmations faster and more reliable.',
                items: [
                    '50% faster load times',
                    'Reduced memory usage',
                    'Improved extension stability',
                    'Better error handling and recovery'
                ]
            }
        ],
        cta: 'Experience these updates today! Install or update the Daily Affirmations Chrome extension and discover how these new features can enhance your mindfulness practice.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/january-2024-updates',
        title: 'Обновления продукта за январь 2024',
        description: 'Обзор всех новых функций и улучшений, которые мы добавили в этом месяце, включая Режим концентрации, Облачную синхронизацию и многое другое.',
        date: '2024-01-19',
        category: 'Обновления',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
        dateDisplay: '19 января 2024',
        h1: 'Обновления продукта за январь 2024',
        intro: 'Мы рады поделиться всеми новыми функциями и улучшениями, которые мы запустили в этом месяце. Вот что нового в Daily Affirmations.',
        alt: 'Календарь и обновления — символ улучшений продукта',
        body: [
            {
                heading: '🎯 Режим концентрации',
                text: 'Наша самая востребованная функция здесь! Режим концентрации превращает новую вкладку в среду без отвлечений, идеальную для практики осознанности.',
                items: [
                    'Минималистичный дизайн, уменьшающий визуальный беспорядок',
                    'Интеграция опционального таймера помодоро',
                    'Настраиваемые темы и фоны',
                    'Горячие клавиши для быстрого доступа'
                ]
            },
            {
                heading: '☁️ Облачная синхронизация и резервное копирование',
                text: 'Больше никогда не теряйте свои персонализированные аффирмации. Облачная синхронизация сохраняет ваши данные в безопасности и доступными на всех устройствах.',
                items: [
                    'Автоматическое резервное копирование библиотеки аффирмаций',
                    'Синхронизация через Chrome, Edge и другие браузеры',
                    'Безопасное шифрование персональных данных',
                    'Восстановление одним кликом при смене устройства'
                ]
            },
            {
                heading: '🌍 Поддержка нескольких языков',
                text: 'Daily Affirmations теперь поддерживает 6 языков, делая осознанность доступной пользователям по всему миру.',
                items: [
                    'Английский, русский, китайский, арабский, португальский и хинди',
                    'Полностью локализованный интерфейс и контент',
                    'Культурно адаптированные аффирмации',
                    'Поддержка справа налево (RTL) для арабского'
                ]
            },
            {
                heading: '✨ Улучшения производительности',
                text: 'Под капотом мы сделали Daily Affirmations быстрее и надёжнее.',
                items: [
                    'На 50% быстрее время загрузки',
                    'Снижено использование памяти',
                    'Улучшена стабильность расширения',
                    'Улучшена обработка ошибок и восстановление'
                ]
            }
        ],
        cta: 'Испытайте эти обновления сегодня! Установите или обновите расширение Daily Affirmations для Chrome и узнайте, как эти новые функции могут улучшить вашу практику осознанности.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/january-2024-updates',
        title: '2024年1月产品更新',
        description: '本月我们添加的所有新功能和改进的综述，包括专注模式、云同步等。',
        date: '2024-01-19',
        category: '更新',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
        dateDisplay: '2024年1月19日',
        h1: '2024年1月产品更新',
        intro: '我们很高兴分享本月推出的所有新功能和改进。以下是 Daily Affirmations 的新内容。',
        alt: '日历和更新，代表产品改进',
        body: [
            {
                heading: '🎯 专注模式',
                text: '我们最受欢迎的功能来了！专注模式将新标签页转变为无干扰环境，非常适合正念练习。',
                items: [
                    '极简设计，减少视觉混乱',
                    '可选番茄钟计时器集成',
                    '可自定义主题和背景',
                    '快速访问的键盘快捷键'
                ]
            },
            {
                heading: '☁️ 云同步和备份',
                text: '再也不会丢失你的个性化肯定语。云同步保护你的数据安全，并在所有设备上可访问。',
                items: [
                    '自动备份你的肯定语库',
                    '在 Chrome、Edge 和其他浏览器间同步',
                    '个人数据的安全加密',
                    '切换设备时一键恢复'
                ]
            },
            {
                heading: '🌍 多语言支持',
                text: 'Daily Affirmations 现在支持6种语言，让正念向全球用户开放。',
                items: [
                    '英语、俄语、中文、阿拉伯语、葡萄牙语和印地语',
                    '完全本地化的界面和内容',
                    '文化适配的肯定语',
                    '阿拉伯语的从右到左 (RTL) 支持'
                ]
            },
            {
                heading: '✨ 性能改进',
                text: '在底层，我们让 Daily Affirmations 更快更可靠。',
                items: [
                    '加载速度提升50%',
                    '降低内存使用',
                    '改进扩展稳定性',
                    '更好的错误处理和恢复'
                ]
            }
        ],
        cta: '今天就体验这些更新！安装或更新 Daily Affirmations Chrome 扩展，发现这些新功能如何增强你的正念练习。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/january-2024-updates',
        title: 'تحديثات المنتج لشهر يناير 2024',
        description: 'ملخص لجميع الميزات والتحسينات الجديدة التي أضفناها هذا الشهر، بما في ذلك وضع التركيز والمزامنة السحابية والمزيد.',
        date: '2024-01-19',
        category: 'التحديثات',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
        dateDisplay: '19 يناير 2024',
        h1: 'تحديثات المنتج لشهر يناير 2024',
        intro: 'يسعدنا مشاركة جميع الميزات والتحسينات الجديدة التي أطلقناها هذا الشهر. إليك ما هو جديد في Daily Affirmations.',
        alt: 'تقويم وتحديثات ترمز لتحسينات المنتج',
        body: [
            {
                heading: '🎯 وضع التركيز',
                text: 'ميزتنا الأكثر طلباً موجودة هنا! يحول وضع التركيز لسان التبويب الجديد إلى بيئة خالية من الانحرافات مثالية لممارسة اليقظة.',
                items: [
                    'تصميم بسيط يقلل من الفوضى البصرية',
                    'تكامل مؤقت بومودورو اختياري',
                    'مواضيع وخلفيات قابلة للتخصيص',
                    'اختصارات لوحة المفاتيح للوصول السريع'
                ]
            },
            {
                heading: '☁️ المزامنة السحابية والنسخ الاحتياطي',
                text: 'لا تفقد تأكيداتك المخصصة مرة أخرى. تحافظ المزامنة السحابية على أمان بياناتك وإمكانية الوصول إليها عبر جميع أجهزتك.',
                items: [
                    'نسخ احتياطي تلقائي لمكتبة التأكيدات',
                    'المزامنة عبر Chrome و Edge والمتصفحات الأخرى',
                    'تشفير آمن لبياناتك الشخصية',
                    'استعادة بنقرة واحدة عند تبديل الأجهزة'
                ]
            },
            {
                heading: '🌍 دعم متعدد اللغات',
                text: 'يدعم Daily Affirmations الآن 6 لغات، مما يجعل اليقظة متاحة للمستخدمين في جميع أنحاء العالم.',
                items: [
                    'الإنجليزية والروسية والصينية والعربية والبرتغالية والهندية',
                    'واجهة ومحتوى محليان بالكامل',
                    'تأكيدات متكيفة ثقافياً',
                    'دعم من اليمين إلى اليسار (RTL) للعربية'
                ]
            },
            {
                heading: '✨ تحسينات الأداء',
                text: 'تحت الغطاء، جعلنا Daily Affirmations أسرع وأكثر موثوقية.',
                items: [
                    'أوقات تحميل أسرع بنسبة 50%',
                    'تقليل استخدام الذاكرة',
                    'تحسين استقرار الامتداد',
                    'معالجة أفضل للأخطاء والتعافي'
                ]
            }
        ],
        cta: 'جرب هذه التحديثات اليوم! ثبّت أو حدّث امتداد Daily Affirmations لـ Chrome واكتشف كيف يمكن لهذه الميزات الجديدة تحسين ممارسة اليقظة لديك.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/january-2024-updates',
        title: 'Atualizações do Produto em Janeiro de 2024',
        description: 'Um resumo de todos os novos recursos e melhorias que adicionamos este mês, incluindo Modo Foco, Sincronização na Nuvem e mais.',
        date: '2024-01-19',
        category: 'Atualizações',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
        dateDisplay: '19 de janeiro de 2024',
        h1: 'Atualizações do Produto em Janeiro de 2024',
        intro: 'Estamos animados em compartilhar todos os novos recursos e melhorias que lançamos este mês. Aqui está o que há de novo no Daily Affirmations.',
        alt: 'Calendário e atualizações representando melhorias do produto',
        body: [
            {
                heading: '🎯 Modo Foco',
                text: 'Nosso recurso mais solicitado está aqui! O Modo Foco transforma sua nova aba em um ambiente sem distrações perfeito para prática de atenção plena.',
                items: [
                    'Design minimalista que reduz desordem visual',
                    'Integração opcional de timer Pomodoro',
                    'Temas e fundos personalizáveis',
                    'Atalhos de teclado para acesso rápido'
                ]
            },
            {
                heading: '☁️ Sincronização e Backup na Nuvem',
                text: 'Nunca mais perca suas afirmações personalizadas. A Sincronização na Nuvem mantém seus dados seguros e acessíveis em todos os seus dispositivos.',
                items: [
                    'Backup automático de sua biblioteca de afirmações',
                    'Sincronização entre Chrome, Edge e outros navegadores',
                    'Criptografia segura de seus dados pessoais',
                    'Restauração com um clique se trocar de dispositivo'
                ]
            },
            {
                heading: '🌍 Suporte Multi-Idioma',
                text: 'Daily Affirmations agora suporta 6 idiomas, tornando atenção plena acessível a usuários em todo o mundo.',
                items: [
                    'Inglês, Russo, Chinês, Árabe, Português e Hindi',
                    'Interface e conteúdo totalmente localizados',
                    'Afirmações culturalmente adaptadas',
                    'Suporte da direita para esquerda (RTL) para Árabe'
                ]
            },
            {
                heading: '✨ Melhorias de Performance',
                text: 'Nos bastidores, tornamos Daily Affirmations mais rápido e confiável.',
                items: [
                    '50% mais rápido no tempo de carregamento',
                    'Redução do uso de memória',
                    'Melhor estabilidade da extensão',
                    'Melhor tratamento de erros e recuperação'
                ]
            }
        ],
        cta: 'Experimente essas atualizações hoje! Instale ou atualize a extensão Daily Affirmations do Chrome e descubra como esses novos recursos podem melhorar sua prática de atenção plena.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/january-2024-updates',
        title: 'जनवरी 2024 उत्पाद अपडेट',
        description: 'इस महीने हमने जोड़े गए सभी नई सुविधाओं और सुधारों का सारांश, जिसमें फोकस मोड, क्लाउड सिंक और अधिक शामिल हैं।',
        date: '2024-01-19',
        category: 'अपडेट',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
        dateDisplay: '19 जनवरी 2024',
        h1: 'जनवरी 2024 उत्पाद अपडेट',
        intro: 'हम इस महीने लॉन्च किए गए सभी नई सुविधाओं और सुधारों को साझा करने के लिए उत्साहित हैं। यहाँ Daily Affirmations में क्या नया है।',
        alt: 'कैलेंडर और अपडेट — उत्पाद सुधारों का प्रतीक',
        body: [
            {
                heading: '🎯 फोकस मोड',
                text: 'हमारी सबसे अधिक मांग वाली सुविधा यहाँ है! फोकस मोड आपके नए टैब को माइंडफुलनेस अभ्यास के लिए आदर्श विचलन-मुक्त वातावरण में बदलता है।',
                items: [
                    'न्यूनतम डिज़ाइन जो दृश्य अव्यवस्था कम करता है',
                    'वैकल्पिक पोमोडोरो टाइमर एकीकरण',
                    'अनुकूलन योग्य थीम और पृष्ठभूमि',
                    'त्वरित पहुँच के लिए कीबोर्ड शॉर्टकट'
                ]
            },
            {
                heading: '☁️ क्लाउड सिंक और बैकअप',
                text: 'अपने व्यक्तिगत पुष्टिकरण को फिर कभी न खोएं। क्लाउड सिंक आपके डेटा को सुरक्षित रखती है और आपके सभी उपकरणों पर पहुंच योग्य बनाती है।',
                items: [
                    'आपकी पुष्टिकरण लाइब्रेरी का स्वचालित बैकअप',
                    'Chrome, Edge और अन्य ब्राउज़रों में सिंक',
                    'आपके व्यक्तिगत डेटा की सुरक्षित एन्क्रिप्शन',
                    'डिवाइस बदलने पर एक-क्लिक पुनर्स्थापना'
                ]
            },
            {
                heading: '🌍 बहुभाषी समर्थन',
                text: 'Daily Affirmations अब 6 भाषाओं का समर्थन करता है, जिससे माइंडफुलनेस दुनिया भर के उपयोगकर्ताओं के लिए सुलभ हो जाता है।',
                items: [
                    'अंग्रेजी, रूसी, चीनी, अरबी, पुर्तगाली और हिंदी',
                    'पूरी तरह से स्थानीयकृत इंटरफेस और सामग्री',
                    'सांस्कृतिक रूप से अनुकूलित पुष्टिकरण',
                    'अरबी के लिए दाएं से बाएं (RTL) समर्थन'
                ]
            },
            {
                heading: '✨ प्रदर्शन सुधार',
                text: 'अंदरूनी रूप से, हमने Daily Affirmations को तेज़ और अधिक विश्वसनीय बनाया है।',
                items: [
                    '50% तेज़ लोड समय',
                    'मेमोरी उपयोग कम',
                    'एक्सटेंशन स्थिरता में सुधार',
                    'बेहतर त्रुटि हैंडलिंग और पुनर्प्राप्ति'
                ]
            }
        ],
        cta: 'आज इन अपडेट का अनुभव करें! Daily Affirmations Chrome एक्सटेंशन इंस्टॉल या अपडेट करें और खोजें कि ये नई सुविधाएँ आपके माइंडफुलनेस अभ्यास को कैसे बढ़ा सकती हैं।'
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
                            <h3 className="text-xl font-semibold mb-4">🚀 {lang === 'ru' ? 'Попробуйте сейчас' : lang === 'zh' ? '立即体验' : lang === 'ar' ? 'جرب الآن' : lang === 'pt' ? 'Experimente agora' : lang === 'hi' ? 'अभी आज़माएँ' : 'Try it now'}</h3>
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

