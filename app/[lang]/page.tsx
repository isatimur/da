'use client'

import { ArrowRight, Chrome, Star, Cloud, Bell, Palette, Lock, Github, Check, Sparkles, Users } from "lucide-react";
import { BackgroundBeams } from "../components/ui/background-beams";
import { Header } from "../components/Header";
import { SupportChat } from "../components/SupportChat";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NewsletterSignup } from '../components/NewsletterSignup';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const content = {
    en: {
        hero: {
            badge: { project: "Project #1", type: "Chrome Extension" },
            title: "Transform Your New Tab into a\nDaily Source of Inspiration",
            subtitle: "Start each day with purpose. Beautiful backgrounds, personalized affirmations, and mindful moments — all in your browser.",
            cta: "Add to Chrome - It's Free",
            rating: "★★★★★ 100+ Users"
        },
        features: {
            title: "Everything You Need for Daily Mindfulness",
            subtitle: "Carefully crafted features to enhance your daily affirmation practice and keep you motivated.",
            items: [
                { icon: Star, title: "Daily Affirmations", description: "Start each day with powerful, personalized affirmations that inspire and motivate" },
                { icon: Cloud, title: "Weather Integration", description: "Stay informed with a beautiful, minimalist weather display" },
                { icon: Bell, title: "Smart Reminders", description: "Set custom reminder times and days to maintain your practice" },
                { icon: Palette, title: "Theme Customization", description: "Choose from minimal or nature themes, customize fonts and card styles" },
                { icon: Lock, title: "Focus Mode", description: "Remove distractions and immerse yourself in your daily affirmation practice" },
                { icon: Sparkles, title: "Premium Backgrounds", description: "Access a curated collection of stunning backgrounds that change daily" }
            ]
        },
        testimonials: {
            title: "Loved by Mindful People",
            subtitle: "Join thousands who have transformed their browsing experience",
            items: [
                { name: "Sarah M.", role: "Mindfulness Coach", content: "Daily Affirmations has transformed my morning routine. The focus mode is a game-changer for my clients." },
                { name: "David L.", role: "Software Engineer", content: "Clean, beautiful, and actually helps me stay positive throughout the day. Love the cloud sync feature!" },
                { name: "Emily R.", role: "Wellness Blogger", content: "The perfect blend of aesthetics and functionality. My new tab page is now a source of daily inspiration." }
            ]
        },
        pricing: {
            title: "Simple, Transparent Pricing",
            subtitle: "Start for free, upgrade when you need more",
            plans: [
                {
                    name: "Basic",
                    price: "0",
                    interval: "forever",
                    features: [
                        "Daily curated affirmations",
                        "Basic nature backgrounds", 
                        "Weather & clock widgets",
                        "Focus mode (basic)",
                        "Local storage"
                    ],
                    cta: "Install Now",
                    popular: false
                },
                {
                    name: "Pro (Early Access)", 
                    price: "0",
                    interval: "month",
                    features: [
                        "Everything in Basic, plus:",
                        "Custom affirmations library",
                        "Premium background themes",
                        "Cloud sync & backup",
                        "Smart daily reminders",
                        "Advanced focus mode",
                        "Priority support",
                        "Early access to new features"
                    ],
                    cta: "Get Pro Access",
                    popular: true,
                    badge: "Most Popular"
                }
            ]
        },
        featureCarousel: {
            items: [
                {
                    title: 'Focus Mode',
                    description: 'Transform your new tab into a distraction-free sanctuary with our Focus Mode. Perfect for mindful moments and deep work sessions.'
                },
                {
                    title: 'Custom Affirmations',
                    description: 'Create and save your own personal affirmations. Make your daily inspiration truly yours with our customization features.'
                },
                {
                    title: 'Custom Backgrounds',
                    description: 'Choose from our curated collection or upload your own backgrounds. Save your favorites and create the perfect ambiance for your mindful moments.'
                },
                {
                    title: 'Daily Reminders',
                    description: 'Never miss a moment of mindfulness with customizable daily reminders. Set your preferred times and get gentle notifications to pause and reflect.'
                }
            ]
        },
        newsletter: {
            title: "Stay Updated",
            subtitle: "Get the latest mindfulness tips and feature updates.",
            placeholder: "Enter your email",
            submit: "Subscribe",
            submitting: "Subscribing...",
            success: "Thanks for subscribing!",
            error: "Failed to subscribe"
        },
        stats: {
            items: [
                { number: "100+", label: "Active Users" },
                { number: "1000+", label: "Affirmations Delivered" },
                { number: "4.8", label: "Average Rating" },
                { number: "24/7", label: "Support" }
            ]
        },
        cta: {
            title: "Start Your Journey Today",
            subtitle: "Join thousands of users who have transformed their daily browsing experience into moments of inspiration.",
            install: "Install Extension",
            source: "View Source"
        }
    },
    ru: {
        hero: {
            badge: { project: "Проект #1", type: "Расширение Chrome" },
            title: "Превратите новую вкладку в\nежедневный источник вдохновения",
            subtitle: "Начинайте каждый день с целью. Красивые фоны, персонализированные аффирмации и осознанные моменты — всё в вашем браузере.",
            cta: "Добавить в Chrome - Бесплатно",
            rating: "★★★★★ 100+ Пользователей"
        },
        features: {
            title: "Всё необходимое для ежедневной осознанности",
            subtitle: "Продуманные функции для улучшения ежедневной практики аффирмаций и поддержания мотивации.",
            items: [
                { icon: Star, title: "Ежедневные аффирмации", description: "Начинайте каждый день с мощных персонализированных аффирмаций, которые вдохновляют и мотивируют" },
                { icon: Cloud, title: "Интеграция погоды", description: "Будьте в курсе с красивым минималистичным отображением погоды" },
                { icon: Bell, title: "Умные напоминания", description: "Установите индивидуальное время и дни напоминаний для поддержания практики" },
                { icon: Palette, title: "Настройка темы", description: "Выберите из минималистичных или природных тем, настройте шрифты и стили карточек" },
                { icon: Lock, title: "Режим концентрации", description: "Уберите отвлечения и погрузитесь в ежедневную практику аффирмаций" },
                { icon: Sparkles, title: "Премиум фоны", description: "Доступ к кураторской коллекции потрясающих фонов, которые меняются ежедневно" }
            ]
        },
        testimonials: {
            title: "Любимо осознанными людьми",
            subtitle: "Присоединяйтесь к тысячам, кто трансформировал свой опыт просмотра",
            items: [
                { name: "Сара М.", role: "Коуч по осознанности", content: "Daily Affirmations трансформировала мою утреннюю рутину. Режим концентрации меняет игру для моих клиентов." },
                { name: "Давид Л.", role: "Инженер-программист", content: "Чистый, красивый и действительно помогает мне оставаться позитивным в течение дня. Обожаю функцию облачной синхронизации!" },
                { name: "Эмили Р.", role: "Блогер о здоровье", content: "Идеальное сочетание эстетики и функциональности. Моя новая вкладка теперь источник ежедневного вдохновения." }
            ]
        },
        pricing: {
            title: "Простое, прозрачное ценообразование",
            subtitle: "Начните бесплатно, обновитесь, когда нужно больше",
            plans: [
                {
                    name: "Базовый",
                    price: "0",
                    interval: "навсегда",
                    features: [
                        "Ежедневные кураторские аффирмации",
                        "Базовые природные фоны", 
                        "Виджеты погоды и часов",
                        "Режим концентрации (базовый)",
                        "Локальное хранилище"
                    ],
                    cta: "Установить сейчас",
                    popular: false
                },
                {
                    name: "Pro (Ранний доступ)", 
                    price: "0",
                    interval: "месяц",
                    features: [
                        "Всё из Базового, плюс:",
                        "Библиотека собственных аффирмаций",
                        "Премиум темы фонов",
                        "Облачная синхронизация и резервное копирование",
                        "Умные ежедневные напоминания",
                        "Расширенный режим концентрации",
                        "Приоритетная поддержка",
                        "Ранний доступ к новым функциям"
                    ],
                    cta: "Получить Pro доступ",
                    popular: true,
                    badge: "Самый популярный"
                }
            ]
        },
        featureCarousel: {
            items: [
                {
                    title: 'Режим концентрации',
                    description: 'Превратите новую вкладку в безмятежное убежище без отвлечений с нашим Режимом концентрации. Идеально для осознанных моментов и глубоких рабочих сессий.'
                },
                {
                    title: 'Собственные аффирмации',
                    description: 'Создавайте и сохраняйте свои личные аффирмации. Сделайте своё ежедневное вдохновение действительно своим с нашими функциями настройки.'
                },
                {
                    title: 'Собственные фоны',
                    description: 'Выбирайте из нашей кураторской коллекции или загружайте свои фоны. Сохраняйте избранное и создавайте идеальную атмосферу для осознанных моментов.'
                },
                {
                    title: 'Ежедневные напоминания',
                    description: 'Никогда не пропускайте момент осознанности с настраиваемыми ежедневными напоминаниями. Установите предпочтительное время и получайте мягкие уведомления для паузы и размышлений.'
                }
            ]
        },
        newsletter: {
            title: "Будьте в курсе",
            subtitle: "Получайте последние советы по осознанности и обновления функций.",
            placeholder: "Введите ваш email",
            submit: "Подписаться",
            submitting: "Подписка...",
            success: "Спасибо за подписку!",
            error: "Не удалось подписаться"
        },
        stats: {
            items: [
                { number: "100+", label: "Активных пользователей" },
                { number: "1000+", label: "Доставлено аффирмаций" },
                { number: "4.8", label: "Средняя оценка" },
                { number: "24/7", label: "Поддержка" }
            ]
        },
        cta: {
            title: "Начните путешествие сегодня",
            subtitle: "Присоединяйтесь к тысячам пользователей, которые трансформировали свой ежедневный опыт просмотра в моменты вдохновения.",
            install: "Установить расширение",
            source: "Посмотреть код"
        }
    },
    zh: {
        hero: {
            badge: { project: "项目 #1", type: "Chrome 扩展" },
            title: "将新标签页转变为\n每日灵感来源",
            subtitle: "每天有目标地开始。精美的背景、个性化肯定语和正念时刻——都在你的浏览器中。",
            cta: "添加到 Chrome - 免费",
            rating: "★★★★★ 100+ 用户"
        },
        features: {
            title: "每日正念所需的一切",
            subtitle: "精心打造的功能，增强你的每日肯定语练习并保持动力。",
            items: [
                { icon: Star, title: "每日肯定语", description: "每天以有力、个性化的肯定语开始，激励和鼓舞你" },
                { icon: Cloud, title: "天气集成", description: "通过精美、极简的天气显示保持信息更新" },
                { icon: Bell, title: "智能提醒", description: "设置自定义提醒时间和日期，保持练习" },
                { icon: Palette, title: "主题定制", description: "从极简或自然主题中选择，自定义字体和卡片样式" },
                { icon: Lock, title: "专注模式", description: "移除干扰，沉浸在你的每日肯定语练习中" },
                { icon: Sparkles, title: "高级背景", description: "访问精选的令人惊叹的背景集合，每天更换" }
            ]
        },
        testimonials: {
            title: "受到正念人士喜爱",
            subtitle: "加入数千位转变浏览体验的用户",
            items: [
                { name: "Sarah M.", role: "正念教练", content: "Daily Affirmations 改变了我的早晨习惯。专注模式对我的客户来说是游戏规则改变者。" },
                { name: "David L.", role: "软件工程师", content: "干净、美观，真正帮助我全天保持积极。喜欢云同步功能！" },
                { name: "Emily R.", role: "健康博主", content: "美学与功能的完美结合。我的新标签页现在是每日灵感的源泉。" }
            ]
        },
        pricing: {
            title: "简单透明的定价",
            subtitle: "免费开始，需要时升级",
            plans: [
                {
                    name: "基础版",
                    price: "0",
                    interval: "永久",
                    features: [
                        "每日精选肯定语",
                        "基础自然背景", 
                        "天气和时钟小部件",
                        "专注模式（基础）",
                        "本地存储"
                    ],
                    cta: "立即安装",
                    popular: false
                },
                {
                    name: "专业版（早期访问）", 
                    price: "0",
                    interval: "月",
                    features: [
                        "基础版的所有功能，以及：",
                        "自定义肯定语库",
                        "高级背景主题",
                        "云同步和备份",
                        "智能每日提醒",
                        "高级专注模式",
                        "优先支持",
                        "新功能早期访问"
                    ],
                    cta: "获取专业版访问",
                    popular: true,
                    badge: "最受欢迎"
                }
            ]
        },
        featureCarousel: {
            items: [
                {
                    title: '专注模式',
                    description: '用我们的专注模式将新标签页转变为无干扰的圣地。非常适合正念时刻和深度工作时段。'
                },
                {
                    title: '自定义肯定语',
                    description: '创建并保存你自己的个人肯定语。通过我们的定制功能，让你的每日灵感真正属于你。'
                },
                {
                    title: '自定义背景',
                    description: '从我们的精选集合中选择或上传你自己的背景。保存收藏，为你的正念时刻营造完美氛围。'
                },
                {
                    title: '每日提醒',
                    description: '通过可定制的每日提醒，永远不错过正念时刻。设置你偏好的时间，获得温和的通知以暂停和反思。'
                }
            ]
        },
        newsletter: {
            title: "保持更新",
            subtitle: "获取最新的正念技巧和功能更新。",
            placeholder: "输入你的邮箱",
            submit: "订阅",
            submitting: "订阅中...",
            success: "感谢订阅！",
            error: "订阅失败"
        },
        stats: {
            items: [
                { number: "100+", label: "活跃用户" },
                { number: "1000+", label: "已发送肯定语" },
                { number: "4.8", label: "平均评分" },
                { number: "24/7", label: "支持" }
            ]
        },
        cta: {
            title: "今天开始你的旅程",
            subtitle: "加入数千位将每日浏览体验转变为灵感时刻的用户。",
            install: "安装扩展",
            source: "查看源代码"
        }
    },
    ar: {
        hero: {
            badge: { project: "المشروع #1", type: "امتداد Chrome" },
            title: "حوّل لسان التبويب الجديد إلى\nمصدر يومي للإلهام",
            subtitle: "ابدأ كل يوم بغرض. خلفيات جميلة وتأكيدات مخصصة ولحظات يقظة — كل ذلك في متصفحك.",
            cta: "أضف إلى Chrome - مجاناً",
            rating: "★★★★★ 100+ مستخدم"
        },
        features: {
            title: "كل ما تحتاجه لليقظة اليومية",
            subtitle: "ميزات مصممة بعناية لتعزيز ممارسة التأكيدات اليومية والحفاظ على الدافعية.",
            items: [
                { icon: Star, title: "التأكيدات اليومية", description: "ابدأ كل يوم بتأكيدات قوية ومخصصة تلهمك وتحفزك" },
                { icon: Cloud, title: "تكامل الطقس", description: "ابق على اطلاع مع عرض طقس جميل وبسيط" },
                { icon: Bell, title: "التذكيرات الذكية", description: "حدد أوقات وأيام تذكيرات مخصصة للحفاظ على ممارستك" },
                { icon: Palette, title: "تخصيص المظهر", description: "اختر من مواضيع بسيطة أو طبيعية، خصص الخطوط وأنماط البطاقات" },
                { icon: Lock, title: "وضع التركيز", description: "أزل الانحرافات وانغمس في ممارسة التأكيدات اليومية" },
                { icon: Sparkles, title: "الخلفيات المميزة", description: "الوصول إلى مجموعة مختارة من الخلفيات الرائعة التي تتغير يومياً" }
            ]
        },
        testimonials: {
            title: "محبوب من قبل الأشخاص اليقظين",
            subtitle: "انضم إلى الآلاف الذين غيروا تجربة التصفح لديهم",
            items: [
                { name: "سارة م.", role: "مدربة اليقظة", content: "Daily Affirmations غيرت روتيني الصباحي. وضع التركيز يغير اللعبة لعملائي." },
                { name: "ديفيد ل.", role: "مهندس برمجيات", content: "نظيف وجميل ويساعدني فعلياً على البقاء إيجابياً طوال اليوم. أحب ميزة المزامنة السحابية!" },
                { name: "إيميلي ر.", role: "مدونة العافية", content: "المزيج المثالي من الجمال والوظيفة. صفحة التبويب الجديدة الخاصة بي أصبحت الآن مصدر إلهام يومي." }
            ]
        },
        pricing: {
            title: "أسعار بسيطة وشفافة",
            subtitle: "ابدأ مجاناً، ترق عندما تحتاج المزيد",
            plans: [
                {
                    name: "أساسي",
                    price: "0",
                    interval: "مدى الحياة",
                    features: [
                        "تأكيدات يومية مختارة",
                        "خلفيات طبيعية أساسية", 
                        "أدوات الطقس والساعة",
                        "وضع التركيز (أساسي)",
                        "تخزين محلي"
                    ],
                    cta: "ثبّت الآن",
                    popular: false
                },
                {
                    name: "Pro (وصول مبكر)", 
                    price: "0",
                    interval: "شهر",
                    features: [
                        "كل شيء في الأساسي، بالإضافة إلى:",
                        "مكتبة تأكيدات مخصصة",
                        "مواضيع خلفية مميزة",
                        "المزامنة السحابية والنسخ الاحتياطي",
                        "تذكيرات يومية ذكية",
                        "وضع التركيز المتقدم",
                        "دعم ذو أولوية",
                        "وصول مبكر للميزات الجديدة"
                    ],
                    cta: "احصل على وصول Pro",
                    popular: true,
                    badge: "الأكثر شعبية"
                }
            ]
        },
        featureCarousel: {
            items: [
                {
                    title: 'وضع التركيز',
                    description: 'حوّل لسان التبويب الجديد إلى ملاذ خالٍ من الانحرافات مع وضع التركيز. مثالي للأنظات اليقظة وجلسات العمل العميقة.'
                },
                {
                    title: 'تأكيدات مخصصة',
                    description: 'أنشئ واحفظ تأكيداتك الشخصية. اجعل إلهامك اليومي حقاً خاصاً بك مع ميزات التخصيص.'
                },
                {
                    title: 'خلفيات مخصصة',
                    description: 'اختر من مجموعتنا المختارة أو ارفع خلفياتك الخاصة. احفظ المفضلة وأنشئ الأجواء المثالية للأنظات اليقظة.'
                },
                {
                    title: 'تذكيرات يومية',
                    description: 'لا تفوت لحظة يقظة أبداً مع تذكيرات يومية قابلة للتخصيص. حدد أوقاتك المفضلة واحصل على إشعارات لطيفة للتوقف والتأمل.'
                }
            ]
        },
        newsletter: {
            title: "ابق محدثاً",
            subtitle: "احصل على أحدث نصائح اليقظة وتحديثات الميزات.",
            placeholder: "أدخل بريدك الإلكتروني",
            submit: "اشترك",
            submitting: "جاري الاشتراك...",
            success: "شكراً للاشتراك!",
            error: "فشل الاشتراك"
        },
        stats: {
            items: [
                { number: "100+", label: "مستخدم نشط" },
                { number: "1000+", label: "تأكيدات مسلمة" },
                { number: "4.8", label: "التقييم المتوسط" },
                { number: "24/7", label: "الدعم" }
            ]
        },
        cta: {
            title: "ابدأ رحلتك اليوم",
            subtitle: "انضم إلى الآلاف من المستخدمين الذين غيروا تجربة التصفح اليومية إلى لحظات إلهام.",
            install: "ثبّت الامتداد",
            source: "عرض الكود المصدري"
        }
    },
    pt: {
        hero: {
            badge: { project: "Projeto #1", type: "Extensão Chrome" },
            title: "Transforme Sua Nova Aba em uma\nFonte Diária de Inspiração",
            subtitle: "Comece cada dia com propósito. Belos fundos, afirmações personalizadas e momentos de atenção plena — tudo no seu navegador.",
            cta: "Adicionar ao Chrome - Grátis",
            rating: "★★★★★ 100+ Usuários"
        },
        features: {
            title: "Tudo que Você Precisa para Atenção Plena Diária",
            subtitle: "Recursos cuidadosamente criados para aprimorar sua prática diária de afirmações e mantê-lo motivado.",
            items: [
                { icon: Star, title: "Afirmações Diárias", description: "Comece cada dia com afirmações poderosas e personalizadas que inspiram e motivam" },
                { icon: Cloud, title: "Integração do Tempo", description: "Mantenha-se informado com uma exibição de tempo bonita e minimalista" },
                { icon: Bell, title: "Lembretes Inteligentes", description: "Defina horários e dias de lembretes personalizados para manter sua prática" },
                { icon: Palette, title: "Personalização de Tema", description: "Escolha entre temas minimalistas ou naturais, personalize fontes e estilos de cartões" },
                { icon: Lock, title: "Modo Foco", description: "Remova distrações e mergulhe em sua prática diária de afirmações" },
                { icon: Sparkles, title: "Fundos Premium", description: "Acesse uma coleção curada de fundos deslumbrantes que mudam diariamente" }
            ]
        },
        testimonials: {
            title: "Amado por Pessoas Conscientes",
            subtitle: "Junte-se a milhares que transformaram sua experiência de navegação",
            items: [
                { name: "Sarah M.", role: "Coach de Atenção Plena", content: "Daily Affirmations transformou minha rotina matinal. O modo foco é um divisor de águas para meus clientes." },
                { name: "David L.", role: "Engenheiro de Software", content: "Limpo, bonito e realmente me ajuda a permanecer positivo durante o dia. Adoro o recurso de sincronização na nuvem!" },
                { name: "Emily R.", role: "Blogger de Bem-Estar", content: "A combinação perfeita de estética e funcionalidade. Minha nova aba agora é uma fonte de inspiração diária." }
            ]
        },
        pricing: {
            title: "Preços Simples e Transparentes",
            subtitle: "Comece grátis, atualize quando precisar de mais",
            plans: [
                {
                    name: "Básico",
                    price: "0",
                    interval: "para sempre",
                    features: [
                        "Afirmações curadas diárias",
                        "Fundos naturais básicos", 
                        "Widgets de tempo e relógio",
                        "Modo foco (básico)",
                        "Armazenamento local"
                    ],
                    cta: "Instalar Agora",
                    popular: false
                },
                {
                    name: "Pro (Acesso Antecipado)", 
                    price: "0",
                    interval: "mês",
                    features: [
                        "Tudo no Básico, mais:",
                        "Biblioteca de afirmações personalizadas",
                        "Temas de fundo premium",
                        "Sincronização e backup na nuvem",
                        "Lembretes diários inteligentes",
                        "Modo foco avançado",
                        "Suporte prioritário",
                        "Acesso antecipado a novos recursos"
                    ],
                    cta: "Obter Acesso Pro",
                    popular: true,
                    badge: "Mais Popular"
                }
            ]
        },
        featureCarousel: {
            items: [
                {
                    title: 'Modo Foco',
                    description: 'Transforme sua nova aba em um santuário sem distrações com nosso Modo Foco. Perfeito para momentos de atenção plena e sessões de trabalho profundo.'
                },
                {
                    title: 'Afirmações Personalizadas',
                    description: 'Crie e salve suas próprias afirmações pessoais. Torne sua inspiração diária verdadeiramente sua com nossos recursos de personalização.'
                },
                {
                    title: 'Fundos Personalizados',
                    description: 'Escolha de nossa coleção curada ou envie seus próprios fundos. Salve seus favoritos e crie a atmosfera perfeita para seus momentos de atenção plena.'
                },
                {
                    title: 'Lembretes Diários',
                    description: 'Nunca perca um momento de atenção plena com lembretes diários personalizáveis. Defina seus horários preferidos e receba notificações suaves para pausar e refletir.'
                }
            ]
        },
        newsletter: {
            title: "Mantenha-se Atualizado",
            subtitle: "Receba as últimas dicas de atenção plena e atualizações de recursos.",
            placeholder: "Digite seu e-mail",
            submit: "Inscrever-se",
            submitting: "Inscrevendo...",
            success: "Obrigado por se inscrever!",
            error: "Falha ao se inscrever"
        },
        stats: {
            items: [
                { number: "100+", label: "Usuários Ativos" },
                { number: "1000+", label: "Afirmações Entregues" },
                { number: "4.8", label: "Avaliação Média" },
                { number: "24/7", label: "Suporte" }
            ]
        },
        cta: {
            title: "Comece Sua Jornada Hoje",
            subtitle: "Junte-se a milhares de usuários que transformaram sua experiência diária de navegação em momentos de inspiração.",
            install: "Instalar Extensão",
            source: "Ver Código Fonte"
        }
    },
    hi: {
        hero: {
            badge: { project: "प्रोजेक्ट #1", type: "Chrome एक्सटेंशन" },
            title: "अपने नए टैब को\nदैनिक प्रेरणा स्रोत में बदलें",
            subtitle: "हर दिन उद्देश्य के साथ शुरू करें। सुंदर पृष्ठभूमि, व्यक्तिगत पुष्टिकरण और माइंडफुल क्षण — सब आपके ब्राउज़र में।",
            cta: "Chrome में जोड़ें - मुफ़्त",
            rating: "★★★★★ 100+ उपयोगकर्ता"
        },
        features: {
            title: "दैनिक माइंडफुलनेस के लिए आपको जो कुछ चाहिए",
            subtitle: "आपके दैनिक पुष्टिकरण अभ्यास को बढ़ाने और आपको प्रेरित रखने के लिए सावधानी से तैयार की गई सुविधाएँ।",
            items: [
                { icon: Star, title: "दैनिक पुष्टिकरण", description: "शक्तिशाली, व्यक्तिगत पुष्टिकरण के साथ हर दिन शुरू करें जो प्रेरित और प्रेरित करते हैं" },
                { icon: Cloud, title: "मौसम एकीकरण", description: "एक सुंदर, न्यूनतम मौसम प्रदर्शन के साथ सूचित रहें" },
                { icon: Bell, title: "स्मार्ट अनुस्मारक", description: "अपने अभ्यास को बनाए रखने के लिए कस्टम अनुस्मारक समय और दिन सेट करें" },
                { icon: Palette, title: "थीम अनुकूलन", description: "न्यूनतम या प्रकृति थीम से चुनें, फ़ॉन्ट और कार्ड शैलियों को अनुकूलित करें" },
                { icon: Lock, title: "फोकस मोड", description: "विचलन हटाएं और अपने दैनिक पुष्टिकरण अभ्यास में डूब जाएं" },
                { icon: Sparkles, title: "प्रीमियम पृष्ठभूमि", description: "आश्चर्यजनक पृष्ठभूमि की एक क्यूरेटेड संग्रह तक पहुंच जो दैनिक रूप से बदलती है" }
            ]
        },
        testimonials: {
            title: "माइंडफुल लोगों द्वारा पसंद किया गया",
            subtitle: "हजारों लोगों से जुड़ें जिन्होंने अपने ब्राउज़िंग अनुभव को बदल दिया है",
            items: [
                { name: "Sarah M.", role: "माइंडफुलनेस कोच", content: "Daily Affirmations ने मेरी सुबह की दिनचर्या को बदल दिया है। फोकस मोड मेरे ग्राहकों के लिए गेम-चेंजर है।" },
                { name: "David L.", role: "सॉफ़्टवेयर इंजीनियर", content: "साफ, सुंदर, और वास्तव में मुझे दिन भर सकारात्मक रहने में मदद करता है। क्लाउड सिंक सुविधा पसंद है!" },
                { name: "Emily R.", role: "वेलनेस ब्लॉगर", content: "सौंदर्य और कार्यक्षमता का सही मिश्रण। मेरा नया टैब पेज अब दैनिक प्रेरणा का स्रोत है।" }
            ]
        },
        pricing: {
            title: "सरल, पारदर्शी मूल्य निर्धारण",
            subtitle: "मुफ्त शुरू करें, जरूरत पड़ने पर अपग्रेड करें",
            plans: [
                {
                    name: "बेसिक",
                    price: "0",
                    interval: "हमेशा के लिए",
                    features: [
                        "दैनिक क्यूरेटेड पुष्टिकरण",
                        "बुनियादी प्रकृति पृष्ठभूमि", 
                        "मौसम और घड़ी विजेट",
                        "फोकस मोड (बेसिक)",
                        "स्थानीय संग्रहण"
                    ],
                    cta: "अभी इंस्टॉल करें",
                    popular: false
                },
                {
                    name: "Pro (अर्ली एक्सेस)", 
                    price: "0",
                    interval: "महीना",
                    features: [
                        "बेसिक में सब कुछ, प्लस:",
                        "कस्टम पुष्टिकरण लाइब्रेरी",
                        "प्रीमियम पृष्ठभूमि थीम",
                        "क्लाउड सिंक और बैकअप",
                        "स्मार्ट दैनिक अनुस्मारक",
                        "उन्नत फोकस मोड",
                        "प्राथमिकता समर्थन",
                        "नई सुविधाओं तक अर्ली एक्सेस"
                    ],
                    cta: "Pro एक्सेस प्राप्त करें",
                    popular: true,
                    badge: "सबसे लोकप्रिय"
                }
            ]
        },
        featureCarousel: {
            items: [
                {
                    title: 'फोकस मोड',
                    description: 'हमारे फोकस मोड के साथ अपने नए टैब को विचलन-मुक्त आश्रम में बदलें। माइंडफुल क्षणों और गहरे कार्य सत्रों के लिए परफेक्ट।'
                },
                {
                    title: 'कस्टम पुष्टिकरण',
                    description: 'अपने व्यक्तिगत पुष्टिकरण बनाएं और सहेजें। हमारे अनुकूलन सुविधाओं के साथ अपनी दैनिक प्रेरणा को वास्तव में अपना बनाएं।'
                },
                {
                    title: 'कस्टम पृष्ठभूमि',
                    description: 'हमारे क्यूरेटेड संग्रह से चुनें या अपनी पृष्ठभूमि अपलोड करें। अपने पसंदीदा सहेजें और अपने माइंडफुल क्षणों के लिए सही माहौल बनाएं।'
                },
                {
                    title: 'दैनिक अनुस्मारक',
                    description: 'अनुकूलन योग्य दैनिक अनुस्मारक के साथ कभी भी माइंडफुलनेस का क्षण न चूकें। अपना पसंदीदा समय सेट करें और रुकने और प्रतिबिंबित करने के लिए सौम्य सूचनाएं प्राप्त करें।'
                }
            ]
        },
        newsletter: {
            title: "अद्यतन रहें",
            subtitle: "नवीनतम माइंडफुलनेस सुझाव और सुविधा अपडेट प्राप्त करें।",
            placeholder: "अपना ईमेल दर्ज करें",
            submit: "सदस्यता लें",
            submitting: "सदस्यता ले रहे हैं...",
            success: "सदस्यता लेने के लिए धन्यवाद!",
            error: "सदस्यता लेने में विफल"
        },
        stats: {
            items: [
                { number: "100+", label: "सक्रिय उपयोगकर्ता" },
                { number: "1000+", label: "पुष्टिकरण वितरित" },
                { number: "4.8", label: "औसत रेटिंग" },
                { number: "24/7", label: "सहायता" }
            ]
        },
        cta: {
            title: "आज अपनी यात्रा शुरू करें",
            subtitle: "हजारों उपयोगकर्ताओं से जुड़ें जिन्होंने अपने दैनिक ब्राउज़िंग अनुभव को प्रेरणा के क्षणों में बदल दिया है।",
            install: "एक्सटेंशन इंस्टॉल करें",
            source: "स्रोत देखें"
        }
    }
};

export default function DailyAffirmationsPage() {
    const params = useParams();
    const lang = (params?.lang as string) || 'en';
    const t = (content as any)[lang] || content.en;
    
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [currentFeature, setCurrentFeature] = useState(0);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % t.testimonials.items.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [t.testimonials.items.length]);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(t.newsletter.success);
                setEmail('');
            } else {
                throw new Error(data.error || t.newsletter.error);
            }
        } catch (error) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : t.newsletter.error);
        }
    };

    const featureImages = [
        '/palm-leaf.png',
        '/custom-affirmations.png',
        '/custom-backgrounds.png',
        '/daily-reminder.png'
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 relative z-0">
                {/* Hero Section */}
                <section id="hero" className="relative h-[40rem] flex flex-col items-center justify-center overflow-hidden">
                    <BackgroundBeams className="opacity-40" />
                    <div className="p-4 relative z-10 w-full container mx-auto text-center">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-sm mb-4">
                            <span className="text-yellow-500 mr-2">{t.hero.badge.project}</span>
                            <span className="text-neutral-400">{t.hero.badge.type}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gradient whitespace-pre-line">
                            {t.hero.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto mb-8">
                            {t.hero.subtitle}
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <a
                                href="https://chromewebstore.google.com/detail/daily-affirmations/nhhicimcipdgjckacooendaikhjhenle"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-brand text-neutral-950 font-semibold hover:opacity-90 transition-opacity"
                            >
                                <Chrome className="w-5 h-5 mr-2" />
                                {t.hero.cta}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </a>
                            <div className="text-sm text-neutral-400">
                                {t.hero.rating}
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Features Showcase */}
                <section id="features" className="py-20 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                                {t.features.title}
                            </h2>
                            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                                {t.features.subtitle}
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {t.features.items.map((feature: any, index: number) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900/80 transition-colors group"
                                >
                                    <feature.icon className="w-12 h-12 mb-4 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-neutral-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 px-4 bg-neutral-900/50">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                                {t.testimonials.title}
                            </h2>
                            <p className="text-xl text-neutral-400">
                                {t.testimonials.subtitle}
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="relative h-[300px]">
                                {t.testimonials.items.map((testimonial: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-1000 ${
                                            index === activeTestimonial ? "opacity-100" : "opacity-0"
                                        }`}
                                    >
                                        <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-neutral-950 font-bold">
                                                    {testimonial.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{testimonial.name}</h3>
                                                    <p className="text-sm text-neutral-400">{testimonial.role}</p>
                                                </div>
                                            </div>
                                            <p className="text-lg text-neutral-300">{testimonial.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-2 mt-8">
                                {t.testimonials.items.map((_: any, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTestimonial(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            index === activeTestimonial
                                                ? "bg-yellow-500 w-8"
                                                : "bg-neutral-700 hover:bg-neutral-600"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section id="pricing" className="py-20 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                                {t.pricing.title}
                            </h2>
                            <p className="text-xl text-neutral-400">
                                {t.pricing.subtitle}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {t.pricing.plans.map((plan: any) => (
                                <div
                                    key={plan.name}
                                    className={`relative p-8 rounded-2xl backdrop-blur-sm flex flex-col ${
                                        plan.popular
                                            ? "bg-white/[0.08] border border-white/[0.12]"
                                            : "bg-white/[0.04] border border-white/[0.08]"
                                    }`}
                                >
                                    {plan.popular && plan.badge && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-gradient-to-r from-[#3B82F6] via-[#10B981] to-[#EAB308] text-white text-sm font-medium px-4 py-1 rounded-full">
                                                {plan.badge}
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-center mb-8">
                                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                        <div className="mb-2">
                                            <span className="text-4xl font-bold">${plan.price}</span>
                                            {plan?.interval && (
                                                <span className="text-neutral-400 ml-1">/{plan.interval}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        {plan.features.map((feature: string) => (
                                            <div key={feature} className="flex items-start gap-3">
                                                <div className="rounded-full bg-white/10 p-1 mt-0.5 shrink-0">
                                                    <Check className="w-3 h-3 text-[#10B981]" />
                                                </div>
                                                <span className="text-neutral-300 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8">
                                        <Button
                                            variant={plan.popular ? "link" : "default"}
                                            size="lg"
                                            className="w-full justify-center font-medium"
                                            asChild
                                        >
                                            <Link href={plan.popular ? "/checkout" : "https://chromewebstore.google.com/detail/daily-affirmations/nhhicimcipdgjckacooendaikhjhenle"}>
                                                {plan.cta}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Carousel */}
                <section className="w-full py-20 bg-black relative z-10">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="relative overflow-hidden rounded-2xl bg-gray-900 p-8 pointer-events-auto">
                            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                                <div className="space-y-6">
                                    <h3 className="text-3xl font-bold">
                                        {t.featureCarousel.items[currentFeature].title}
                                    </h3>
                                    <p className="text-gray-300 text-lg">
                                        {t.featureCarousel.items[currentFeature].description}
                                    </p>
                                    <div className="flex space-x-4">
                                        {t.featureCarousel.items.map((_: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentFeature(index)}
                                                className={`w-3 h-3 rounded-full transition-colors pointer-events-auto ${
                                                    index === currentFeature ? 'bg-blue-500' : 'bg-gray-600'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="relative h-[400px] cursor-pointer pointer-events-auto" onClick={() => setFullscreenImage(featureImages[currentFeature])}>
                                    <Image
                                        src={featureImages[currentFeature]}
                                        alt={t.featureCarousel.items[currentFeature].title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black relative z-10">
                    <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
                        <h2 className="text-3xl font-bold mb-6">{t.newsletter.title}</h2>
                        <p className="text-gray-300 mb-8">
                            {t.newsletter.subtitle}
                        </p>
                        <form onSubmit={handleSubscribe} className="flex gap-4 max-w-md mx-auto relative z-10 pointer-events-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.newsletter.placeholder}
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 pointer-events-auto"
                                required
                            />
                            <Button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-gradient-brand hover:opacity-90 pointer-events-auto"
                            >
                                {status === 'loading' ? t.newsletter.submitting : t.newsletter.submit}
                            </Button>
                        </form>
                        {message && (
                            <p className={`mt-4 ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </section>

                {/* Stats */}
                <section className="py-20 px-4 bg-neutral-900/50 relative z-10">
                    <div className="container mx-auto relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {t.stats.items.map((stat: any) => (
                                <div key={stat.label} className="text-center pointer-events-auto">
                                    <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
                                        {stat.number}
                                    </div>
                                    <div className="text-neutral-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 px-4 relative z-10">
                    <div className="container mx-auto text-center relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
                            {t.cta.title}
                        </h2>
                        <p className="text-xl text-neutral-200 max-w-2xl mx-auto mb-12">
                            {t.cta.subtitle}
                        </p>
                        <div className="flex items-center justify-center gap-4 relative z-10 pointer-events-auto">
                            <a
                                href="https://chromewebstore.google.com/detail/daily-affirmations/nhhicimcipdgjckacooendaikhjhenle"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-brand text-neutral-950 font-semibold hover:opacity-90 transition-opacity cursor-pointer pointer-events-auto relative z-10"
                            >
                                <Chrome className="w-6 h-6 mr-2" />
                                {t.cta.install}
                                <ArrowRight className="w-6 h-6 ml-2" />
                            </a>
                            <a
                                href="https://github.com/25microsaas/daily-affirmations"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-4 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition-colors cursor-pointer pointer-events-auto relative z-10"
                            >
                                <Github className="w-6 h-6 mr-2" />
                                {t.cta.source}
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            {fullscreenImage && (
                <div 
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-pointer"
                    onClick={() => setFullscreenImage(null)}
                >
                    <Image
                        src={fullscreenImage}
                        alt="Feature preview"
                        width={1200}
                        height={800}
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
            <SupportChat />
        </>
    );
}

