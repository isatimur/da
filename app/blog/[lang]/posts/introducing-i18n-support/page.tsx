'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/introducing-i18n-support',
        title: 'Introducing Multi-Language Support: Daily Affirmations Now Available in 6 Languages',
        description: 'Daily Affirmations Chrome extension now supports English, Russian, Chinese, Arabic, Portuguese, and Hindi. Experience affirmations in your native language.',
        date: '2024-01-25',
        category: 'Feature Update',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: 'January 25, 2024',
        h1: 'Introducing Multi-Language Support: Daily Affirmations Now Available in 6 Languages',
        intro: 'We\'re excited to announce that the Daily Affirmations Chrome extension now supports six languages, making mindfulness practice accessible to millions more users worldwide.',
        alt: 'Globe with different language symbols representing internationalization and multi-language support',
        body: [
            {
                heading: 'Available Languages',
                text: 'The Daily Affirmations extension is now available in:',
                items: [
                    'English (US/UK)',
                    'Russian (Русский)',
                    'Chinese Simplified (简体中文)',
                    'Arabic (العربية)',
                    'Portuguese (Português)',
                    'Hindi (हिन्दी)'
                ]
            },
            {
                heading: 'How to Change Your Language',
                text: 'Changing your language is simple:',
                items: [
                    'Open the Daily Affirmations extension',
                    'Click on the Settings icon',
                    'Select "Language" from the menu',
                    'Choose your preferred language',
                    'The interface and affirmations will update immediately'
                ]
            },
            {
                heading: 'Localized Content',
                text: 'Every aspect of the extension has been carefully translated:',
                items: [
                    'All user interface elements',
                    'Curated affirmation libraries',
                    'Settings and preferences',
                    'Help text and tooltips',
                    'Notification messages'
                ]
            },
            {
                heading: 'Cultural Adaptations',
                text: 'Beyond translation, we\'ve culturally adapted affirmations to resonate with each language community:',
                items: [
                    'Culturally relevant affirmation examples',
                    'Regional formatting and date preferences',
                    'Right-to-left (RTL) support for Arabic',
                    'Appropriate color and design adaptations'
                ]
            }
        ],
        cta: 'Ready to experience Daily Affirmations in your language? Install the Chrome extension and switch to your preferred language in settings. Start your mindfulness journey in the language that feels most natural to you.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/introducing-i18n-support',
        title: 'Введение поддержки нескольких языков: Daily Affirmations теперь доступно на 6 языках',
        description: 'Расширение Daily Affirmations для Chrome теперь поддерживает английский, русский, китайский, арабский, португальский и хинди. Испытайте аффирмации на вашем родном языке.',
        date: '2024-01-25',
        category: 'Обновление функций',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: '25 января 2024',
        h1: 'Введение поддержки нескольких языков: Daily Affirmations теперь доступно на 6 языках',
        intro: 'Мы рады объявить, что расширение Daily Affirmations для Chrome теперь поддерживает шесть языков, делая практику осознанности доступной для миллионов пользователей по всему миру.',
        alt: 'Глобус с разными языковыми символами, представляющий интернационализацию и поддержку нескольких языков',
        body: [
            {
                heading: 'Доступные языки',
                text: 'Расширение Daily Affirmations теперь доступно на:',
                items: [
                    'Английский (США/Великобритания)',
                    'Русский',
                    'Упрощенный китайский (简体中文)',
                    'Арабский (العربية)',
                    'Португальский (Português)',
                    'Хинди (हिन्दी)'
                ]
            },
            {
                heading: 'Как изменить язык',
                text: 'Изменить язык просто:',
                items: [
                    'Откройте расширение Daily Affirmations',
                    'Нажмите на иконку Настройки',
                    'Выберите "Язык" из меню',
                    'Выберите предпочитаемый язык',
                    'Интерфейс и аффирмации обновятся немедленно'
                ]
            },
            {
                heading: 'Локализованный контент',
                text: 'Каждый аспект расширения был тщательно переведен:',
                items: [
                    'Все элементы пользовательского интерфейса',
                    'Кураторские библиотеки аффирмаций',
                    'Настройки и предпочтения',
                    'Справочные тексты и подсказки',
                    'Сообщения уведомлений'
                ]
            },
            {
                heading: 'Культурные адаптации',
                text: 'Помимо перевода, мы культурно адаптировали аффирмации для резонанса с каждым языковым сообществом:',
                items: [
                    'Культурно релевантные примеры аффирмаций',
                    'Региональные форматы и предпочтения дат',
                    'Поддержка справа налево (RTL) для арабского',
                    'Соответствующие цветовые и дизайнерские адаптации'
                ]
            }
        ],
        cta: 'Готовы испытать Daily Affirmations на своем языке? Установите расширение для Chrome и переключитесь на предпочитаемый язык в настройках. Начните свое путешествие к осознанности на языке, который кажется вам наиболее естественным.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/introducing-i18n-support',
        title: '引入多语言支持：Daily Affirmations 现提供 6 种语言版本',
        description: 'Daily Affirmations Chrome 扩展现在支持英语、俄语、中文、阿拉伯语、葡萄牙语和印地语。用您的母语体验肯定语。',
        date: '2024-01-25',
        category: '功能更新',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: '2024年1月25日',
        h1: '引入多语言支持：Daily Affirmations 现提供 6 种语言版本',
        intro: '我们很高兴地宣布，Daily Affirmations Chrome 扩展现在支持六种语言，使全球数百万用户能够进行正念练习。',
        alt: '带有不同语言符号的地球，代表国际化和多语言支持',
        body: [
            {
                heading: '可用语言',
                text: 'Daily Affirmations 扩展现在提供以下语言：',
                items: [
                    '英语（美国/英国）',
                    '俄语（Русский）',
                    '简体中文',
                    '阿拉伯语（العربية）',
                    '葡萄牙语（Português）',
                    '印地语（हिन्दी）'
                ]
            },
            {
                heading: '如何更改语言',
                text: '更改语言很简单：',
                items: [
                    '打开 Daily Affirmations 扩展',
                    '点击设置图标',
                    '从菜单中选择"语言"',
                    '选择您的首选语言',
                    '界面和肯定语将立即更新'
                ]
            },
            {
                heading: '本地化内容',
                text: '扩展的每个方面都已仔细翻译：',
                items: [
                    '所有用户界面元素',
                    '精选肯定语库',
                    '设置和偏好',
                    '帮助文本和工具提示',
                    '通知消息'
                ]
            },
            {
                heading: '文化适应',
                text: '除了翻译，我们还对肯定语进行了文化适应，以引起每个语言社区的共鸣：',
                items: [
                    '文化相关的肯定语示例',
                    '区域格式和日期偏好',
                    '阿拉伯语的从右到左（RTL）支持',
                    '适当的颜色和设计适应'
                ]
            }
        ],
        cta: '准备好用您的语言体验 Daily Affirmations 了吗？安装 Chrome 扩展并在设置中切换到您的首选语言。以最自然的语言开始您的正念之旅。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/introducing-i18n-support',
        title: 'إدخال دعم متعدد اللغات: Daily Affirmations متاح الآن بـ 6 لغات',
        description: 'امتداد Daily Affirmations لـ Chrome يدعم الآن الإنجليزية والروسية والصينية والعربية والبرتغالية والهندية. جرب التأكيدات بلغتك الأم.',
        date: '2024-01-25',
        category: 'تحديث الميزات',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: '25 يناير 2024',
        h1: 'إدخال دعم متعدد اللغات: Daily Affirmations متاح الآن بـ 6 لغات',
        intro: 'نحن متحمسون للإعلان عن أن امتداد Daily Affirmations لـ Chrome يدعم الآن ست لغات، مما يجعل ممارسة اليقظة في متناول الملايين من المستخدمين في جميع أنحاء العالم.',
        alt: 'كرة أرضية برموز لغات مختلفة تمثل العولمة ودعم متعدد اللغات',
        body: [
            {
                heading: 'اللغات المتاحة',
                text: 'امتداد Daily Affirmations متاح الآن بـ:',
                items: [
                    'الإنجليزية (الولايات المتحدة/المملكة المتحدة)',
                    'الروسية (Русский)',
                    'الصينية المبسطة (简体中文)',
                    'العربية',
                    'البرتغالية (Português)',
                    'الهندية (हिन्दी)'
                ]
            },
            {
                heading: 'كيفية تغيير لغتك',
                text: 'تغيير لغتك بسيط:',
                items: [
                    'افتح امتداد Daily Affirmations',
                    'انقر على أيقونة الإعدادات',
                    'اختر "اللغة" من القائمة',
                    'اختر لغتك المفضلة',
                    'سيتم تحديث الواجهة والتأكيدات فوراً'
                ]
            },
            {
                heading: 'المحتوى المترجم',
                text: 'تمت ترجمة كل جانب من جوانب الامتداد بعناية:',
                items: [
                    'جميع عناصر واجهة المستخدم',
                    'مكتبات التأكيدات المختارة',
                    'الإعدادات والتفضيلات',
                    'نص المساعدة والتلميحات',
                    'رسائل الإشعارات'
                ]
            },
            {
                heading: 'التكيفات الثقافية',
                text: 'بالإضافة إلى الترجمة، قمنا بتكييف التأكيدات ثقافياً للتوافق مع كل مجتمع لغوي:',
                items: [
                    'أمثلة التأكيدات ذات الصلة ثقافياً',
                    'تنسيقات إقليمية وتفضيلات التاريخ',
                    'دعم من اليمين إلى اليسار (RTL) للعربية',
                    'تكيفات اللون والتصميم المناسبة'
                ]
            }
        ],
        cta: 'مستعد لتجربة Daily Affirmations بلغتك؟ قم بتثبيت امتداد Chrome وقم بالتبديل إلى لغتك المفضلة في الإعدادات. ابدأ رحلتك في اليقظة باللغة التي تشعر بها بشكل طبيعي.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/introducing-i18n-support',
        title: 'Apresentando Suporte Multilíngue: Daily Affirmations Agora Disponível em 6 Idiomas',
        description: 'A extensão Daily Affirmations do Chrome agora suporta inglês, russo, chinês, árabe, português e hindi. Experimente afirmações no seu idioma nativo.',
        date: '2024-01-25',
        category: 'Atualização de Recurso',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: '25 de janeiro de 2024',
        h1: 'Apresentando Suporte Multilíngue: Daily Affirmations Agora Disponível em 6 Idiomas',
        intro: 'Estamos animados em anunciar que a extensão Daily Affirmations do Chrome agora suporta seis idiomas, tornando a prática de atenção plena acessível a milhões de usuários em todo o mundo.',
        alt: 'Globo com diferentes símbolos de idiomas representando internacionalização e suporte multilíngue',
        body: [
            {
                heading: 'Idiomas Disponíveis',
                text: 'A extensão Daily Affirmations agora está disponível em:',
                items: [
                    'Inglês (EUA/Reino Unido)',
                    'Russo (Русский)',
                    'Chinês Simplificado (简体中文)',
                    'Árabe (العربية)',
                    'Português',
                    'Hindi (हिन्दी)'
                ]
            },
            {
                heading: 'Como Alterar Seu Idioma',
                text: 'Alterar seu idioma é simples:',
                items: [
                    'Abra a extensão Daily Affirmations',
                    'Clique no ícone de Configurações',
                    'Selecione "Idioma" no menu',
                    'Escolha seu idioma preferido',
                    'A interface e as afirmações serão atualizadas imediatamente'
                ]
            },
            {
                heading: 'Conteúdo Localizado',
                text: 'Cada aspecto da extensão foi cuidadosamente traduzido:',
                items: [
                    'Todos os elementos da interface do usuário',
                    'Bibliotecas de afirmações curadas',
                    'Configurações e preferências',
                    'Textos de ajuda e dicas',
                    'Mensagens de notificação'
                ]
            },
            {
                heading: 'Adaptações Culturais',
                text: 'Além da tradução, adaptamos culturalmente as afirmações para ressoar com cada comunidade linguística:',
                items: [
                    'Exemplos de afirmações culturalmente relevantes',
                    'Formatos regionais e preferências de data',
                    'Suporte de direita para esquerda (RTL) para árabe',
                    'Adaptações apropriadas de cores e design'
                ]
            }
        ],
        cta: 'Pronto para experimentar Daily Affirmations no seu idioma? Instale a extensão do Chrome e alterne para seu idioma preferido nas configurações. Comece sua jornada de atenção plena no idioma que parece mais natural para você.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/introducing-i18n-support',
        title: 'बहुभाषी समर्थन की शुरुआत: Daily Affirmations अब 6 भाषाओं में उपलब्ध',
        description: 'Daily Affirmations Chrome एक्सटेंशन अब अंग्रेजी, रूसी, चीनी, अरबी, पुर्तगाली और हिंदी का समर्थन करता है। अपनी मूल भाषा में पुष्टिकरण का अनुभव करें।',
        date: '2024-01-25',
        category: 'सुविधा अपडेट',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        dateDisplay: '25 जनवरी 2024',
        h1: 'बहुभाषी समर्थन की शुरुआत: Daily Affirmations अब 6 भाषाओं में उपलब्ध',
        intro: 'हमें यह घोषणा करते हुए खुशी हो रही है कि Daily Affirmations Chrome एक्सटेंशन अब छह भाषाओं का समर्थन करता है, जिससे दुनिया भर में लाखों अधिक उपयोगकर्ताओं के लिए माइंडफुलनेस अभ्यास सुलभ हो गया है।',
        alt: 'विभिन्न भाषा प्रतीकों के साथ ग्लोब, अंतर्राष्ट्रीयकरण और बहुभाषी समर्थन का प्रतिनिधित्व करता है',
        body: [
            {
                heading: 'उपलब्ध भाषाएं',
                text: 'Daily Affirmations एक्सटेंशन अब इन भाषाओं में उपलब्ध है:',
                items: [
                    'अंग्रेजी (US/UK)',
                    'रूसी (Русский)',
                    'सरलीकृत चीनी (简体中文)',
                    'अरबी (العربية)',
                    'पुर्तगाली (Português)',
                    'हिंदी'
                ]
            },
            {
                heading: 'अपनी भाषा कैसे बदलें',
                text: 'अपनी भाषा बदलना सरल है:',
                items: [
                    'Daily Affirmations एक्सटेंशन खोलें',
                    'सेटिंग्स आइकन पर क्लिक करें',
                    'मेनू से "भाषा" चुनें',
                    'अपनी पसंदीदा भाषा चुनें',
                    'इंटरफ़ेस और पुष्टिकरण तुरंत अपडेट हो जाएंगे'
                ]
            },
            {
                heading: 'स्थानीयकृत सामग्री',
                text: 'एक्सटेंशन के हर पहलू को ध्यान से अनुवादित किया गया है:',
                items: [
                    'सभी उपयोगकर्ता इंटरफ़ेस तत्व',
                    'क्यूरेटेड पुष्टिकरण लाइब्रेरी',
                    'सेटिंग्स और प्राथमिकताएं',
                    'सहायता पाठ और टूलटिप',
                    'अधिसूचना संदेश'
                ]
            },
            {
                heading: 'सांस्कृतिक अनुकूलन',
                text: 'अनुवाद के अलावा, हमने पुष्टिकरण को सांस्कृतिक रूप से अनुकूलित किया है ताकि प्रत्येक भाषा समुदाय के साथ प्रतिध्वनित हो:',
                items: [
                    'सांस्कृतिक रूप से प्रासंगिक पुष्टिकरण उदाहरण',
                    'क्षेत्रीय स्वरूपण और तारीख प्राथमिकताएं',
                    'अरबी के लिए दाएं से बाएं (RTL) समर्थन',
                    'उपयुक्त रंग और डिज़ाइन अनुकूलन'
                ]
            }
        ],
        cta: 'अपनी भाषा में Daily Affirmations का अनुभव करने के लिए तैयार हैं? Chrome एक्सटेंशन इंस्टॉल करें और सेटिंग्स में अपनी पसंदीदा भाषा पर स्विच करें। उस भाषा में अपनी माइंडफुलनेस यात्रा शुरू करें जो आपको सबसे स्वाभाविक लगती है।'
    }
};

export default function BlogPost() {
    const params = useParams();
    const lang = (params?.lang as string) || 'en';
    const langContent = content[lang as keyof typeof content] || content.en;

    return (
        <>
            <BlogJsonLd
                url={langContent.url}
                title={langContent.title}
                description={langContent.description}
                date={langContent.date}
                image={langContent.image}
                category={langContent.category}
            />
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 pt-24">
                <article className="container mx-auto px-4 max-w-4xl">
                    <header className="mb-8">
                        <time dateTime={langContent.date} className="text-sm text-neutral-400 mb-2">
                            {langContent.dateDisplay}
                        </time>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            {langContent.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            {langContent.h1}
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            {langContent.intro}
                        </p>
                        <SocialShare url={langContent.url} title={langContent.title} description={langContent.description} />
                    </header>

                    <figure className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={langContent.image}
                            alt={langContent.alt}
                            fill
                            className="object-cover"
                            priority
                        />
                    </figure>

                    <div className="prose prose-invert max-w-none">
                        {langContent.body.map((section, index) => (
                            <section key={index} className="mb-8">
                                <h2>{section.heading}</h2>
                                <p>{section.text}</p>
                                <ul>
                                    {section.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <div className="bg-gradient-to-r from-neutral-900/50 to-neutral-800/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">
                                {lang === 'ru' ? '🚀 Готовы начать?' : 
                                 lang === 'zh' ? '🚀 准备好开始了吗？' :
                                 lang === 'ar' ? '🚀 مستعد للبدء؟' :
                                 lang === 'pt' ? '🚀 Pronto para Começar?' :
                                 lang === 'hi' ? '🚀 शुरू करने के लिए तैयार?' :
                                 '🚀 Ready to Get Started?'}
                            </h3>
                            <p>
                                {langContent.cta}
                            </p>
                        </div>
                    </div>

                    <footer className="mt-16">
                        <div className="border-t border-neutral-800 pt-16">
                            <NewsletterSignup />
                        </div>

                        <div className="mt-8 pt-8 border-t border-neutral-800">
                            <SocialShare url={langContent.url} title={langContent.title} description={langContent.description} />
                        </div>
                    </footer>
                </article>
            </main>
        </>
    );
}

