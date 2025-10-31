// Blog posts data with language support
type Language = 'en' | 'ru' | 'zh' | 'ar' | 'pt' | 'hi';

export interface BlogPost {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    category: string;
}

const blogPostsByLanguage: Record<Language, BlogPost[]> = {
    en: [
        {
            title: "How to Write Powerful Daily Affirmations That Actually Work",
            slug: "how-to-write-powerful-affirmations",
            date: "2024-03-15",
            excerpt: "Learn the proven techniques for crafting effective daily affirmations that create real change. Discover writing strategies, examples, and practices that make affirmations work.",
            category: "Guides"
        },
        {
            title: "Morning Affirmations: Transform Your Day in 5 Minutes",
            slug: "morning-affirmations-transform-your-day",
            date: "2024-04-22",
            excerpt: "Discover powerful morning affirmation routines that set a positive tone for your entire day. Learn proven techniques and specific affirmations for morning success.",
            category: "Guides"
        },
        {
            title: "Introducing Focus Mode: Your Gateway to Mindful Moments",
            slug: "introducing-focus-mode",
            date: "2024-01-23",
            excerpt: "Transform your new tab into a serene sanctuary with our most requested feature. Focus Mode removes distractions and creates a perfect environment for mindfulness.",
            category: "Feature Update"
        },
        {
            title: "January 2024 Product Updates",
            slug: "january-2024-updates",
            date: "2024-01-19",
            excerpt: "A roundup of all the new features and improvements we've added this month, including Focus Mode, Cloud Sync, and more.",
            category: "Updates"
        },
        {
            title: "Creating Your Personal Affirmation Library",
            slug: "personal-affirmation-library",
            date: "2024-01-18",
            excerpt: "Learn how to write powerful, personalized affirmations and organize them effectively using our Pro features.",
            category: "Guides"
        },
        {
            title: "Introducing Multi-Language Support: Daily Affirmations Now Available in 6 Languages",
            slug: "introducing-i18n-support",
            date: "2024-01-25",
            excerpt: "Daily Affirmations Chrome extension now supports English, Russian, Chinese, Arabic, Portuguese, and Hindi. Experience affirmations in your native language.",
            category: "Feature Update"
        },
        {
            title: "The Psychology of Positive Affirmations: What Science Tells Us",
            slug: "the-psychology-of-positive-affirmations",
            date: "2024-05-10",
            excerpt: "Explore the psychological research and scientific evidence behind positive affirmations. Learn how they work, why they're effective, and how to maximize their impact.",
            category: "Mindfulness"
        },
        {
            title: "30 Day Affirmation Challenge: A Complete Guide",
            slug: "30-day-affirmation-challenge",
            date: "2024-06-18",
            excerpt: "Join our comprehensive 30-day affirmation challenge. Get daily affirmations, track your progress, and transform your mindset with this proven month-long program.",
            category: "Guides"
        },
        {
            title: "Affirmations for Anxiety: Calming Your Mind with Words",
            slug: "affirmations-for-anxiety",
            date: "2024-07-25",
            excerpt: "Discover powerful affirmations specifically designed to calm anxiety and reduce stress. Learn science-backed techniques for using affirmations to manage anxious thoughts and find inner peace.",
            category: "Mental Health"
        },
        {
            title: "Nighttime Affirmations: Ending Your Day with Gratitude",
            slug: "nighttime-affirmations-gratitude",
            date: "2024-08-14",
            excerpt: "Learn how nighttime affirmations improve sleep quality and promote gratitude. Discover evening affirmation routines that help you reflect, release, and prepare for restful sleep.",
            category: "Mindfulness"
        },
        {
            title: "Affirmations vs. Mantras: What's the Difference?",
            slug: "affirmations-vs-mantras",
            date: "2024-09-05",
            excerpt: "Understand the key differences between affirmations and mantras. Learn when to use each, how they work differently, and how to choose the right practice for your goals.",
            category: "Guides"
        },
        {
            title: "Building Self-Confidence Through Daily Affirmations",
            slug: "building-self-confidence-affirmations",
            date: "2024-10-11",
            excerpt: "Learn how daily affirmations can transform your self-confidence. Discover powerful confidence-building affirmations and proven techniques for overcoming self-doubt and building genuine self-belief.",
            category: "Guides"
        },
        {
            title: "Affirmations for Work: Boosting Professional Success",
            slug: "affirmations-for-work",
            date: "2024-11-08",
            excerpt: "Discover powerful workplace affirmations to enhance your career, boost productivity, and achieve professional success. Learn how to use affirmations for confidence, leadership, and work-life balance.",
            category: "Guides"
        },
        {
            title: "Mindfulness and Affirmations: A Perfect Pair",
            slug: "mindfulness-and-affirmations",
            date: "2024-12-03",
            excerpt: "Discover how mindfulness and affirmations work together to create deeper transformation. Learn techniques for combining these powerful practices for enhanced well-being and personal growth.",
            category: "Mindfulness"
        },
        {
            title: "Affirmations for Relationships: Strengthening Connections",
            slug: "affirmations-for-relationships",
            date: "2025-01-14",
            excerpt: "Discover powerful affirmations to strengthen relationships, improve communication, and deepen connections with partners, family, and friends. Learn relationship-focused affirmation practices.",
            category: "Guides"
        },
        {
            title: "The Neuroscience of Affirmations: How They Rewire Your Brain",
            slug: "the-neuroscience-of-affirmations",
            date: "2025-02-18",
            excerpt: "Explore the neuroscience behind affirmations and discover how they physically rewire your brain. Learn about neuroplasticity, neural pathways, and the science of positive self-talk.",
            category: "Mindfulness"
        },
        {
            title: "Creating Affirmations That Resonate: The Personal Touch",
            slug: "creating-affirmations-that-resonate",
            date: "2025-03-12",
            excerpt: "Learn how to create deeply personal affirmations that truly resonate with your values, goals, and authentic self. Discover techniques for crafting affirmations that feel genuine and powerful.",
            category: "Guides"
        },
        {
            title: "Affirmations for Overcoming Fear and Self-Doubt",
            slug: "affirmations-for-overcoming-fear",
            date: "2025-04-09",
            excerpt: "Discover powerful affirmations to overcome fear, self-doubt, and limiting beliefs. Learn proven techniques for using affirmations to build courage and move past fears.",
            category: "Guides"
        },
        {
            title: "The 7-Day Affirmation Reset: Your Quick Start Guide",
            slug: "7-day-affirmation-reset",
            date: "2025-05-21",
            excerpt: "Jumpstart your affirmation practice with this comprehensive 7-day program. Get daily affirmations, exercises, and guidance to transform your mindset in just one week.",
            category: "Guides"
        },
        {
            title: "Affirmations for Athletes: Mental Training for Peak Performance",
            slug: "affirmations-for-athletes",
            date: "2025-06-17",
            excerpt: "Discover powerful affirmations designed specifically for athletes. Learn how mental training through affirmations enhances performance, builds confidence, and helps achieve athletic goals.",
            category: "Guides"
        },
        {
            title: "Affirmations for Students: Enhancing Focus and Learning",
            slug: "affirmations-for-students",
            date: "2025-07-24",
            excerpt: "Discover powerful affirmations designed for students to enhance focus, improve learning, boost academic confidence, and manage exam stress. Learn student-specific affirmation practices.",
            category: "Guides"
        },
        {
            title: "Manifestation vs. Affirmations: Separating Fact from Fiction",
            slug: "manifestation-vs-affirmations",
            date: "2025-08-13",
            excerpt: "Understand the real differences between manifestation and affirmations. Learn what science says about each practice and how to use them effectively together.",
            category: "Guides"
        },
        {
            title: "Affirmations for Mothers: Self-Care Through Positive Thinking",
            slug: "affirmations-for-mothers",
            date: "2025-09-19",
            excerpt: "Discover powerful affirmations designed specifically for mothers to promote self-care, reduce mom guilt, build confidence, and maintain balance while parenting.",
            category: "Guides"
        },
        {
            title: "The Best Time to Practice Affirmations: Timing Your Positivity",
            slug: "best-time-to-practice-affirmations",
            date: "2025-10-08",
            excerpt: "Discover when and how often to practice affirmations for maximum effectiveness. Learn about optimal timing, frequency, and how different times of day affect affirmation impact.",
            category: "Guides"
        },
        {
            title: "Affirmations for Creatives: Unlocking Your Artistic Potential",
            slug: "affirmations-for-creatives",
            date: "2025-11-05",
            excerpt: "Discover powerful affirmations designed for artists, writers, musicians, and creatives to overcome creative blocks, build artistic confidence, and unlock their full creative potential.",
            category: "Guides"
        },
        {
            title: "Digital Wellness: Using Technology for Positive Mindset",
            slug: "digital-wellness-affirmations",
            date: "2026-01-15",
            excerpt: "Discover how to use technology mindfully for positive mental health. Learn how digital tools like affirmation apps can support well-being while maintaining healthy tech boundaries.",
            category: "Guides"
        },
        {
            title: "The Science Behind Daily Affirmations",
            slug: "science-of-daily-affirmations",
            date: "2024-01-22",
            excerpt: "Explore the psychological research and neuroscience behind positive affirmations, and learn how they can rewire your brain for success and well-being.",
            category: "Mindfulness"
        },
        {
            title: "Introducing Cloud Sync & Backup",
            slug: "cloud-sync-backup",
            date: "2024-01-21",
            excerpt: "Never lose your personalized affirmations again. Our new cloud sync feature keeps your data safe and accessible across all your devices.",
            category: "Feature Update"
        },
        {
            title: "5 Ways to Build a Consistent Mindfulness Practice",
            slug: "building-mindfulness-practice",
            date: "2024-01-20",
            excerpt: "Practical tips and strategies to incorporate mindfulness into your daily routine, using Daily Affirmations as your companion.",
            category: "Guides"
        }
    ],
    ru: [
        {
            title: "Как писать эффективные ежедневные аффирмации, которые действительно работают",
            slug: "how-to-write-powerful-affirmations",
            date: "2024-03-15",
            excerpt: "Изучите проверенные техники создания эффективных ежедневных аффирмаций, которые создают реальные изменения. Откройте для себя стратегии написания, примеры и практики, которые делают аффирмации эффективными.",
            category: "Руководства"
        },
        {
            title: "Утренние аффирмации: Преобразуйте свой день за 5 минут",
            slug: "morning-affirmations-transform-your-day",
            date: "2024-04-22",
            excerpt: "Откройте для себя мощные утренние ритуалы аффирмаций, которые задают позитивный тон всему вашему дню. Изучите проверенные техники и конкретные аффирмации для утреннего успеха.",
            category: "Руководства"
        },
        {
            title: "Режим концентрации: Ваш путь к осознанным моментам",
            slug: "introducing-focus-mode",
            date: "2024-01-23",
            excerpt: "Превратите вашу новую вкладку в безмятежное убежище с помощью самой востребованной функции. Режим концентрации убирает отвлечения и создает идеальную среду для осознанности.",
            category: "Обновление функций"
        },
        {
            title: "Обновления продукта за январь 2024",
            slug: "january-2024-updates",
            date: "2024-01-19",
            excerpt: "Обзор всех новых функций и улучшений, которые мы добавили в этом месяце, включая Режим концентрации, Облачную синхронизацию и многое другое.",
            category: "Обновления"
        },
        {
            title: "Создание вашей личной библиотеки аффирмаций",
            slug: "personal-affirmation-library",
            date: "2024-01-18",
            excerpt: "Узнайте, как писать мощные, персонализированные аффирмации и эффективно организовывать их, используя наши Pro функции.",
            category: "Руководства"
        },
        {
            title: "Введение поддержки нескольких языков: Daily Affirmations теперь доступно на 6 языках",
            slug: "introducing-i18n-support",
            date: "2024-01-25",
            excerpt: "Расширение Daily Affirmations для Chrome теперь поддерживает английский, русский, китайский, арабский, португальский и хинди. Испытайте аффирмации на вашем родном языке.",
            category: "Обновление функций"
        },
        {
            title: "Психология позитивных аффирмаций: что говорит наука",
            slug: "the-psychology-of-positive-affirmations",
            date: "2024-05-10",
            excerpt: "Исследуйте психологические исследования и научные доказательства, стоящие за позитивными аффирмациями. Узнайте, как они работают, почему они эффективны и как максимизировать их влияние.",
            category: "Осознанность"
        },
        {
            title: "30-дневный челлендж аффирмаций: полное руководство",
            slug: "30-day-affirmation-challenge",
            date: "2024-06-18",
            excerpt: "Присоединяйтесь к нашему комплексному 30-дневному челленджу аффирмаций. Получайте ежедневные аффирмации, отслеживайте свой прогресс и трансформируйте свое мышление с помощью этой проверенной месячной программы.",
            category: "Руководства"
        },
        {
            title: "Аффирмации от тревоги: успокоение разума словами",
            slug: "affirmations-for-anxiety",
            date: "2024-07-25",
            excerpt: "Откройте для себя мощные аффирмации, специально разработанные для успокоения тревоги и снижения стресса. Изучите научно обоснованные техники использования аффирмаций для управления тревожными мыслями и обретения внутреннего покоя.",
            category: "Психическое здоровье"
        },
        {
            title: "Вечерние аффирмации: завершение дня с благодарностью",
            slug: "nighttime-affirmations-gratitude",
            date: "2024-08-14",
            excerpt: "Узнайте, как вечерние аффирмации улучшают качество сна и способствуют благодарности. Откройте для себя вечерние ритуалы аффирмаций, которые помогут вам размышлять, отпускать и готовиться к спокойному сну.",
            category: "Осознанность"
        },
        {
            title: "Аффирмации против мантр: в чем разница?",
            slug: "affirmations-vs-mantras",
            date: "2024-09-05",
            excerpt: "Поймите ключевые различия между аффирмациями и мантрами. Узнайте, когда использовать каждую, как они работают по-разному и как выбрать правильную практику для ваших целей.",
            category: "Руководства"
        },
        {
            title: "Построение уверенности в себе через ежедневные аффирмации",
            slug: "building-self-confidence-affirmations",
            date: "2024-10-11",
            excerpt: "Узнайте, как ежедневные аффирмации могут трансформировать вашу уверенность в себе. Откройте для себя мощные аффирмации для построения уверенности и проверенные техники преодоления неуверенности в себе и построения подлинной веры в себя.",
            category: "Руководства"
        },
        {
            title: "Аффирмации для работы: повышение профессионального успеха",
            slug: "affirmations-for-work",
            date: "2024-11-08",
            excerpt: "Откройте для себя мощные рабочие аффирмации для улучшения карьеры, повышения продуктивности и достижения профессионального успеха. Узнайте, как использовать аффирмации для уверенности, лидерства и баланса работы и жизни.",
            category: "Руководства"
        },
        {
            title: "Осознанность и аффирмации: идеальная пара",
            slug: "mindfulness-and-affirmations",
            date: "2024-12-03",
            excerpt: "Откройте для себя, как осознанность и аффирмации работают вместе, создавая более глубокую трансформацию. Изучите техники сочетания этих мощных практик для улучшения благополучия и личностного роста.",
            category: "Осознанность"
        },
        {
            title: "Аффирмации для отношений: укрепление связей",
            slug: "affirmations-for-relationships",
            date: "2025-01-14",
            excerpt: "Откройте для себя мощные аффирмации для укрепления отношений, улучшения общения и углубления связей с партнерами, семьей и друзьями. Изучите практики аффирмаций, ориентированные на отношения.",
            category: "Руководства"
        },
        {
            title: "Нейронаука аффирмаций: как они перестраивают ваш мозг",
            slug: "the-neuroscience-of-affirmations",
            date: "2025-02-18",
            excerpt: "Исследуйте нейронауку, стоящую за аффирмациями, и узнайте, как они физически перестраивают ваш мозг. Узнайте о нейропластичности, нейронных путях и науке позитивного внутреннего диалога.",
            category: "Осознанность"
        },
        {
            title: "Создание резонирующих аффирмаций: личный подход",
            slug: "creating-affirmations-that-resonate",
            date: "2025-03-12",
            excerpt: "Узнайте, как создавать глубоко личные аффирмации, которые действительно резонируют с вашими ценностями, целями и подлинным «я». Откройте для себя техники создания аффирмаций, которые ощущаются подлинными и мощными.",
            category: "Руководства"
        },
        {
            title: "Аффирмации для преодоления страха и неуверенности в себе",
            slug: "affirmations-for-overcoming-fear",
            date: "2025-04-09",
            excerpt: "Откройте для себя мощные аффирмации для преодоления страха, неуверенности в себе и ограничивающих убеждений. Изучите проверенные техники использования аффирмаций для построения смелости и преодоления страхов.",
            category: "Руководства"
        },
        {
            title: "7-дневный сброс аффирмаций: ваше руководство по быстрому старту",
            slug: "7-day-affirmation-reset",
            date: "2025-05-21",
            excerpt: "Запустите свою практику аффирмаций с помощью этой комплексной 7-дневной программы. Получайте ежедневные аффирмации, упражнения и руководство для трансформации вашего мышления всего за одну неделю.",
            category: "Руководства"
        },
        {
            title: "Аффирмации для спортсменов: ментальная тренировка для пиковой производительности",
            slug: "affirmations-for-athletes",
            date: "2025-06-17",
            excerpt: "Откройте для себя мощные аффирмации, специально разработанные для спортсменов. Узнайте, как ментальная тренировка через аффирмации повышает производительность, строит уверенность и помогает достичь спортивных целей.",
            category: "Руководства"
        },
        {
            title: "Аффирмации для студентов: улучшение концентрации и обучения",
            slug: "affirmations-for-students",
            date: "2025-07-24",
            excerpt: "Откройте для себя мощные аффирмации, разработанные для студентов, чтобы улучшить концентрацию, улучшить обучение, повысить академическую уверенность и справиться со стрессом перед экзаменами. Изучите практики аффирмаций, специфичные для студентов.",
            category: "Руководства"
        },
        {
            title: "Манифестация против аффирмаций: отделение фактов от вымысла",
            slug: "manifestation-vs-affirmations",
            date: "2025-08-13",
            excerpt: "Поймите реальные различия между манифестацией и аффирмациями. Узнайте, что говорит наука о каждой практике и как эффективно использовать их вместе.",
            category: "Руководства"
        },
        {
            title: "Аффирмации для мам: забота о себе через позитивное мышление",
            slug: "affirmations-for-mothers",
            date: "2025-09-19",
            excerpt: "Откройте для себя мощные аффирмации, специально разработанные для мам, чтобы способствовать заботе о себе, уменьшить вину мамы, построить уверенность и поддерживать баланс во время воспитания.",
            category: "Руководства"
        },
        {
            title: "Лучшее время для практики аффирмаций: тайминг вашей позитивности",
            slug: "best-time-to-practice-affirmations",
            date: "2025-10-08",
            excerpt: "Откройте для себя, когда и как часто практиковать аффирмации для максимальной эффективности. Узнайте об оптимальном времени, частоте и о том, как разное время дня влияет на воздействие аффирмаций.",
            category: "Руководства"
        },
        {
            title: "Аффирмации для творческих людей: раскрытие вашего художественного потенциала",
            slug: "affirmations-for-creatives",
            date: "2025-11-05",
            excerpt: "Откройте для себя мощные аффирмации, разработанные для художников, писателей, музыкантов и творческих людей, чтобы преодолеть творческие блоки, построить художественную уверенность и раскрыть свой полный творческий потенциал.",
            category: "Руководства"
        },
        {
            title: "Цифровое благополучие: использование технологий для позитивного мышления",
            slug: "digital-wellness-affirmations",
            date: "2026-01-15",
            excerpt: "Узнайте, как осознанно использовать технологии для позитивного психического здоровья. Узнайте, как цифровые инструменты, такие как приложения с аффирмациями, могут поддерживать благополучие, поддерживая здоровые технические границы.",
            category: "Руководства"
        },
        {
            title: "Наука за ежедневными аффирмациями",
            slug: "science-of-daily-affirmations",
            date: "2024-01-22",
            excerpt: "Исследуйте психологические исследования и нейронауку, стоящие за позитивными аффирмациями, и узнайте, как они могут перестроить ваш мозг для успеха и благополучия.",
            category: "Осознанность"
        },
        {
            title: "Введение облачной синхронизации и резервного копирования",
            slug: "cloud-sync-backup",
            date: "2024-01-21",
            excerpt: "Больше никогда не теряйте свои персонализированные аффирмации. Наша новая функция облачной синхронизации сохраняет ваши данные в безопасности и доступными на всех ваших устройствах.",
            category: "Обновление функций"
        },
        {
            title: "5 способов построить последовательную практику осознанности",
            slug: "building-mindfulness-practice",
            date: "2024-01-20",
            excerpt: "Практические советы и стратегии для включения осознанности в вашу ежедневную рутину, используя Daily Affirmations в качестве вашего спутника.",
            category: "Руководства"
        }
    ],
    zh: [
        {
            title: "如何撰写真正有效的每日肯定语",
            slug: "how-to-write-powerful-affirmations",
            date: "2024-03-15",
            excerpt: "学习经过验证的技巧，打造有效的每日肯定语，带来真正的改变。发现写作策略、示例和实践，让肯定语发挥作用。",
            category: "指南"
        },
        {
            title: "晨间肯定语：5分钟内改变您的一天",
            slug: "morning-affirmations-transform-your-day",
            date: "2024-04-22",
            excerpt: "发现强大的晨间肯定语例行程序，为您的全天设定积极的基调。学习经过验证的技巧和晨间成功的具体肯定语。",
            category: "指南"
        },
        {
            title: "专注模式：通往正念时刻的大门",
            slug: "introducing-focus-mode",
            date: "2024-01-23",
            excerpt: "通过我们最受欢迎的功能，将您的新标签页转变为宁静的圣所。专注模式消除干扰，为正念创造完美的环境。",
            category: "功能更新"
        },
        {
            title: "2024年1月产品更新",
            slug: "january-2024-updates",
            date: "2024-01-19",
            excerpt: "本月我们添加的所有新功能和改进的综述，包括专注模式、云同步等。",
            category: "更新"
        },
        {
            title: "创建您的个人肯定语库",
            slug: "personal-affirmation-library",
            date: "2024-01-18",
            excerpt: "学习如何撰写强大的个性化肯定语，并使用我们的专业功能有效组织它们。",
            category: "指南"
        },
        {
            title: "引入多语言支持：Daily Affirmations 现提供 6 种语言版本",
            slug: "introducing-i18n-support",
            date: "2024-01-25",
            excerpt: "Daily Affirmations Chrome 扩展现在支持英语、俄语、中文、阿拉伯语、葡萄牙语和印地语。用您的母语体验肯定语。",
            category: "功能更新"
        },
        {
            title: "积极肯定语的心理学：科学告诉我们什么",
            slug: "the-psychology-of-positive-affirmations",
            date: "2024-05-10",
            excerpt: "探索积极肯定语背后的心理学研究和科学证据。了解它们如何工作、为什么有效以及如何最大化其影响。",
            category: "正念"
        },
        {
            title: "30天肯定语挑战：完整指南",
            slug: "30-day-affirmation-challenge",
            date: "2024-06-18",
            excerpt: "加入我们全面的30天肯定语挑战。获取每日肯定语，跟踪您的进度，并通过这个经过验证的月度计划转变您的思维方式。",
            category: "指南"
        },
        {
            title: "焦虑的肯定语：用话语平静心灵",
            slug: "affirmations-for-anxiety",
            date: "2024-07-25",
            excerpt: "发现专为平静焦虑和减轻压力而设计的强大肯定语。学习使用肯定语管理焦虑想法并找到内心平静的科学支持技术。",
            category: "心理健康"
        },
        {
            title: "夜间肯定语：以感恩结束您的一天",
            slug: "nighttime-affirmations-gratitude",
            date: "2024-08-14",
            excerpt: "了解夜间肯定语如何改善睡眠质量并促进感恩。发现帮助您反思、释放并为安详睡眠做好准备的晚间肯定语例行程序。",
            category: "正念"
        },
        {
            title: "肯定语与咒语：有什么区别？",
            slug: "affirmations-vs-mantras",
            date: "2024-09-05",
            excerpt: "了解肯定语和咒语之间的关键差异。学习何时使用每种方法，它们如何不同地工作，以及如何为您的目标选择正确的实践。",
            category: "指南"
        },
        {
            title: "通过每日肯定语建立自信",
            slug: "building-self-confidence-affirmations",
            date: "2024-10-11",
            excerpt: "了解每日肯定语如何转变您的自信。发现强大的建立自信的肯定语和克服自我怀疑、建立真正自信的经过验证的技术。",
            category: "指南"
        },
        {
            title: "工作肯定语：提升职业成功",
            slug: "affirmations-for-work",
            date: "2024-11-08",
            excerpt: "发现强大的职场肯定语以提升您的职业生涯、提高生产力并实现职业成功。学习如何使用肯定语来增强信心、领导力和工作与生活的平衡。",
            category: "指南"
        },
        {
            title: "正念与肯定语：完美配对",
            slug: "mindfulness-and-affirmations",
            date: "2024-12-03",
            excerpt: "发现正念和肯定语如何共同工作以创造更深层的转变。学习将这些强大实践结合使用以增强幸福和个人成长的技术。",
            category: "正念"
        },
        {
            title: "关系肯定语：加强联系",
            slug: "affirmations-for-relationships",
            date: "2025-01-14",
            excerpt: "发现强大的肯定语以加强关系、改善沟通并加深与伴侣、家人和朋友的连接。学习以关系为中心的肯定语实践。",
            category: "指南"
        },
        {
            title: "肯定语的神经科学：它们如何重新连接您的大脑",
            slug: "the-neuroscience-of-affirmations",
            date: "2025-02-18",
            excerpt: "探索肯定语背后的神经科学，发现它们如何物理地重新连接您的大脑。了解神经可塑性、神经通路和积极自我对话的科学。",
            category: "正念"
        },
        {
            title: "创建引起共鸣的肯定语：个人风格",
            slug: "creating-affirmations-that-resonate",
            date: "2025-03-12",
            excerpt: "学习如何创建真正与您的价值观、目标和真实自我产生共鸣的深刻个人肯定语。发现制作感觉真实和强大的肯定语的技术。",
            category: "指南"
        },
        {
            title: "克服恐惧和自我怀疑的肯定语",
            slug: "affirmations-for-overcoming-fear",
            date: "2025-04-09",
            excerpt: "发现强大的肯定语以克服恐惧、自我怀疑和限制性信念。学习使用肯定语建立勇气并超越恐惧的经过验证的技术。",
            category: "指南"
        },
        {
            title: "7天肯定语重置：快速入门指南",
            slug: "7-day-affirmation-reset",
            date: "2025-05-21",
            excerpt: "通过这个全面的7天计划快速启动您的肯定语实践。获得每日肯定语、练习和指导，在一周内转变您的思维方式。",
            category: "指南"
        },
        {
            title: "运动员肯定语：巅峰表现的心理训练",
            slug: "affirmations-for-athletes",
            date: "2025-06-17",
            excerpt: "发现专为运动员设计的强大肯定语。了解通过肯定语进行的心理训练如何提高表现、建立信心并帮助实现运动目标。",
            category: "指南"
        },
        {
            title: "学生肯定语：增强专注力和学习",
            slug: "affirmations-for-students",
            date: "2025-07-24",
            excerpt: "发现专为学生设计的强大肯定语，以增强专注力、改善学习、提升学业信心并管理考试压力。学习学生特定的肯定语实践。",
            category: "指南"
        },
        {
            title: "显化与肯定语：区分事实与虚构",
            slug: "manifestation-vs-affirmations",
            date: "2025-08-13",
            excerpt: "了解显化和肯定语之间的真正差异。了解科学对每种实践的说法以及如何有效地一起使用它们。",
            category: "指南"
        },
        {
            title: "母亲肯定语：通过积极思考进行自我护理",
            slug: "affirmations-for-mothers",
            date: "2025-09-19",
            excerpt: "发现专为母亲设计的强大肯定语，以促进自我护理、减少母亲内疚、建立信心并在育儿时保持平衡。",
            category: "指南"
        },
        {
            title: "练习肯定语的最佳时间：安排您的积极性",
            slug: "best-time-to-practice-affirmations",
            date: "2025-10-08",
            excerpt: "发现何时以及多久练习一次肯定语以获得最大效果。了解最佳时间安排、频率以及一天中不同时间如何影响肯定语的影响。",
            category: "指南"
        },
        {
            title: "创意者肯定语：释放您的艺术潜力",
            slug: "affirmations-for-creatives",
            date: "2025-11-05",
            excerpt: "发现专为艺术家、作家、音乐家和创意人员设计的强大肯定语，以克服创意障碍、建立艺术信心并释放他们的全部创意潜力。",
            category: "指南"
        },
        {
            title: "数字健康：使用技术获得积极心态",
            slug: "digital-wellness-affirmations",
            date: "2026-01-15",
            excerpt: "发现如何有意识地使用技术来获得积极的心理健康。了解肯定语应用等数字工具如何在保持健康技术边界的同时支持幸福。",
            category: "指南"
        },
        {
            title: "每日肯定语背后的科学",
            slug: "science-of-daily-affirmations",
            date: "2024-01-22",
            excerpt: "探索积极肯定语背后的心理学研究和神经科学，了解它们如何为成功和幸福重新连接您的大脑。",
            category: "正念"
        },
        {
            title: "引入云同步和备份",
            slug: "cloud-sync-backup",
            date: "2024-01-21",
            excerpt: "再也不会丢失您的个性化肯定语。我们新的云同步功能使您的数据在所有设备上安全且可访问。",
            category: "功能更新"
        },
        {
            title: "建立一致正念实践的5种方法",
            slug: "building-mindfulness-practice",
            date: "2024-01-20",
            excerpt: "将正念融入您的日常例行程序的实用技巧和策略，使用Daily Affirmations作为您的伴侣。",
            category: "指南"
        }
    ],
    ar: [
        {
            title: "كيفية كتابة التأكيدات اليومية القوية التي تعمل بالفعل",
            slug: "how-to-write-powerful-affirmations",
            date: "2024-03-15",
            excerpt: "تعلم التقنيات المجربة لصياغة التأكيدات اليومية الفعالة التي تحدث تغييراً حقيقياً. اكتشف استراتيجيات الكتابة والأمثلة والممارسات التي تجعل التأكيدات تعمل.",
            category: "أدلة"
        },
        {
            title: "تأكيدات الصباح: حول يومك في 5 دقائق",
            slug: "morning-affirmations-transform-your-day",
            date: "2024-04-22",
            excerpt: "اكتشف روتينات تأكيدات الصباح القوية التي تحدد نغمة إيجابية ليومك بالكامل. تعلم التقنيات المجربة والتأكيدات المحددة لنجاح الصباح.",
            category: "أدلة"
        },
        {
            title: "وضع التركيز: بوابتك إلى لحظات اليقظة",
            slug: "introducing-focus-mode",
            date: "2024-01-23",
            excerpt: "حول علامة التبويب الجديدة الخاصة بك إلى ملاذ هادئ مع الميزة الأكثر طلباً. وضع التركيز يزيل الانحرافات وينشئ بيئة مثالية لليقظة.",
            category: "تحديث الميزات"
        },
        {
            title: "تحديثات المنتج لشهر يناير 2024",
            slug: "january-2024-updates",
            date: "2024-01-19",
            excerpt: "ملخص لجميع الميزات والتحسينات الجديدة التي أضفناها هذا الشهر، بما في ذلك وضع التركيز والمزامنة السحابية والمزيد.",
            category: "التحديثات"
        },
        {
            title: "إنشاء مكتبة التأكيدات الشخصية الخاصة بك",
            slug: "personal-affirmation-library",
            date: "2024-01-18",
            excerpt: "تعلم كيفية كتابة التأكيدات القوية المخصصة وتنظيمها بشكل فعال باستخدام ميزاتنا الاحترافية.",
            category: "أدلة"
        },
        {
            title: "إدخال دعم متعدد اللغات: Daily Affirmations متاح الآن بـ 6 لغات",
            slug: "introducing-i18n-support",
            date: "2024-01-25",
            excerpt: "امتداد Daily Affirmations لـ Chrome يدعم الآن الإنجليزية والروسية والصينية والعربية والبرتغالية والهندية. جرب التأكيدات بلغتك الأم.",
            category: "تحديث الميزات"
        },
        {
            title: "علم نفس التأكيدات الإيجابية: ما يقوله العلم",
            slug: "the-psychology-of-positive-affirmations",
            date: "2024-05-10",
            excerpt: "استكشف الأبحاث النفسية والأدلة العلمية وراء التأكيدات الإيجابية. تعلم كيف تعمل ولماذا تكون فعالة وكيفية تعظيم تأثيرها.",
            category: "اليقظة"
        },
        {
            title: "تحدي التأكيدات لمدة 30 يوماً: دليل شامل",
            slug: "30-day-affirmation-challenge",
            date: "2024-06-18",
            excerpt: "انضم إلى تحدي التأكيدات الشامل لمدة 30 يوماً. احصل على التأكيدات اليومية، تتبع تقدمك، وحول طريقة تفكيرك من خلال هذا البرنامج الشهري المثبت.",
            category: "أدلة"
        },
        {
            title: "التأكيدات للقلق: تهدئة عقلك بالكلمات",
            slug: "affirmations-for-anxiety",
            date: "2024-07-25",
            excerpt: "اكتشف التأكيدات القوية المصممة خصيصاً لتهدئة القلق وتقليل التوتر. تعلم التقنيات المدعومة علمياً لاستخدام التأكيدات لإدارة الأفكار القلقة والعثور على السلام الداخلي.",
            category: "الصحة العقلية"
        },
        {
            title: "تأكيدات المساء: إنهاء يومك بالامتنان",
            slug: "nighttime-affirmations-gratitude",
            date: "2024-08-14",
            excerpt: "تعلم كيف تحسن تأكيدات المساء جودة النوم وتعزز الامتنان. اكتشف روتينات التأكيدات المسائية التي تساعدك على التأمل والتحرر والاستعداد للنوم المريح.",
            category: "اليقظة"
        },
        {
            title: "التأكيدات مقابل التعاويذ: ما الفرق؟",
            slug: "affirmations-vs-mantras",
            date: "2024-09-05",
            excerpt: "افهم الاختلافات الرئيسية بين التأكيدات والتعاويذ. تعلم متى تستخدم كل منهما وكيف يعملان بشكل مختلف وكيفية اختيار الممارسة المناسبة لأهدافك.",
            category: "أدلة"
        },
        {
            title: "بناء الثقة بالنفس من خلال التأكيدات اليومية",
            slug: "building-self-confidence-affirmations",
            date: "2024-10-11",
            excerpt: "تعلم كيف يمكن للتأكيدات اليومية أن تحول ثقتك بنفسك. اكتشف التأكيدات القوية لبناء الثقة والتقنيات المثبتة للتغلب على الشك الذاتي وبناء الإيمان الحقيقي بالنفس.",
            category: "أدلة"
        },
        {
            title: "التأكيدات للعمل: تعزيز النجاح المهني",
            slug: "affirmations-for-work",
            date: "2024-11-08",
            excerpt: "اكتشف التأكيدات القوية في مكان العمل لتعزيز مسيرتك المهنية وزيادة الإنتاجية وتحقيق النجاح المهني. تعلم كيفية استخدام التأكيدات للثقة والقيادة والتوازن بين العمل والحياة.",
            category: "أدلة"
        },
        {
            title: "اليقظة والتأكيدات: ثنائي مثالي",
            slug: "mindfulness-and-affirmations",
            date: "2024-12-03",
            excerpt: "اكتشف كيف تعمل اليقظة والتأكيدات معاً لخلق تحول أعمق. تعلم تقنيات دمج هذه الممارسات القوية لتعزيز الرفاهية والنمو الشخصي.",
            category: "اليقظة"
        },
        {
            title: "التأكيدات للعلاقات: تقوية الروابط",
            slug: "affirmations-for-relationships",
            date: "2025-01-14",
            excerpt: "اكتشف التأكيدات القوية لتقوية العلاقات وتحسين التواصل وتعزيز الروابط مع الشركاء والعائلة والأصدقاء. تعلم ممارسات التأكيدات التي تركز على العلاقات.",
            category: "أدلة"
        },
        {
            title: "علم الأعصاب للتأكيدات: كيف تعيد توصيل دماغك",
            slug: "the-neuroscience-of-affirmations",
            date: "2025-02-18",
            excerpt: "استكشف علم الأعصاب وراء التأكيدات واكتشف كيف تعيد توصيل دماغك جسدياً. تعلم عن المرونة العصبية والمسارات العصبية وعلم الحديث الإيجابي مع النفس.",
            category: "اليقظة"
        },
        {
            title: "إنشاء التأكيدات التي تتردد صداها: اللمسة الشخصية",
            slug: "creating-affirmations-that-resonate",
            date: "2025-03-12",
            excerpt: "تعلم كيفية إنشاء التأكيدات الشخصية العميقة التي تتردد صدى حقاً مع قيمك وأهدافك وذاتك الأصيلة. اكتشف تقنيات صياغة التأكيدات التي تشعر بأنها حقيقية وقوية.",
            category: "أدلة"
        },
        {
            title: "التأكيدات للتغلب على الخوف والشك الذاتي",
            slug: "affirmations-for-overcoming-fear",
            date: "2025-04-09",
            excerpt: "اكتشف التأكيدات القوية للتغلب على الخوف والشك الذاتي والمعتقدات المحدودة. تعلم التقنيات المثبتة لاستخدام التأكيدات لبناء الشجاعة والتغلب على المخاوف.",
            category: "أدلة"
        },
        {
            title: "إعادة تعيين التأكيدات لمدة 7 أيام: دليل البدء السريع",
            slug: "7-day-affirmation-reset",
            date: "2025-05-21",
            excerpt: "ابدأ ممارسة التأكيدات مع هذا البرنامج الشامل لمدة 7 أيام. احصل على التأكيدات اليومية والتمارين والإرشاد لتحويل طريقة تفكيرك في أسبوع واحد فقط.",
            category: "أدلة"
        },
        {
            title: "التأكيدات للرياضيين: التدريب العقلي للأداء القمة",
            slug: "affirmations-for-athletes",
            date: "2025-06-17",
            excerpt: "اكتشف التأكيدات القوية المصممة خصيصاً للرياضيين. تعلم كيف يعزز التدريب العقلي من خلال التأكيدات الأداء ويبني الثقة ويساعد على تحقيق الأهداف الرياضية.",
            category: "أدلة"
        },
        {
            title: "التأكيدات للطلاب: تعزيز التركيز والتعلم",
            slug: "affirmations-for-students",
            date: "2025-07-24",
            excerpt: "اكتشف التأكيدات القوية المصممة للطلاب لتعزيز التركيز وتحسين التعلم وزيادة الثقة الأكاديمية وإدارة ضغط الامتحانات. تعلم ممارسات التأكيدات المحددة للطلاب.",
            category: "أدلة"
        },
        {
            title: "التجلي مقابل التأكيدات: فصل الحقائق عن الخيال",
            slug: "manifestation-vs-affirmations",
            date: "2025-08-13",
            excerpt: "افهم الاختلافات الحقيقية بين التجلي والتأكيدات. تعلم ما يقوله العلم عن كل ممارسة وكيفية استخدامها معاً بشكل فعال.",
            category: "أدلة"
        },
        {
            title: "التأكيدات للأمهات: الرعاية الذاتية من خلال التفكير الإيجابي",
            slug: "affirmations-for-mothers",
            date: "2025-09-19",
            excerpt: "اكتشف التأكيدات القوية المصممة خصيصاً للأمهات لتعزيز الرعاية الذاتية وتقليل ذنب الأم وبناء الثقة والحفاظ على التوازن أثناء الأبوة.",
            category: "أدلة"
        },
        {
            title: "أفضل وقت لممارسة التأكيدات: توقيت إيجابيتك",
            slug: "best-time-to-practice-affirmations",
            date: "2025-10-08",
            excerpt: "اكتشف متى وكم مرة تمارس التأكيدات للحصول على أقصى فعالية. تعلم عن التوقيت الأمثل والتكرار وكيف تؤثر أوقات مختلفة من اليوم على تأثير التأكيدات.",
            category: "أدلة"
        },
        {
            title: "التأكيدات للمبدعين: إطلاق إمكاناتك الفنية",
            slug: "affirmations-for-creatives",
            date: "2025-11-05",
            excerpt: "اكتشف التأكيدات القوية المصممة للفنانين والكتاب والموسيقيين والمبدعين للتغلب على العقبات الإبداعية وبناء الثقة الفنية وإطلاق إمكاناتهم الإبداعية الكاملة.",
            category: "أدلة"
        },
        {
            title: "العافية الرقمية: استخدام التكنولوجيا للحصول على عقلية إيجابية",
            slug: "digital-wellness-affirmations",
            date: "2026-01-15",
            excerpt: "اكتشف كيفية استخدام التكنولوجيا بوعي للحصول على صحة عقلية إيجابية. تعلم كيف يمكن للأدوات الرقمية مثل تطبيقات التأكيدات أن تدعم الرفاهية مع الحفاظ على حدود صحية للتكنولوجيا.",
            category: "أدلة"
        },
        {
            title: "العلم وراء التأكيدات اليومية",
            slug: "science-of-daily-affirmations",
            date: "2024-01-22",
            excerpt: "استكشف الأبحاث النفسية وعلم الأعصاب وراء التأكيدات الإيجابية، وتعلم كيف يمكنها إعادة توصيل دماغك للنجاح والرفاهية.",
            category: "اليقظة"
        },
        {
            title: "إدخال المزامنة السحابية والنسخ الاحتياطي",
            slug: "cloud-sync-backup",
            date: "2024-01-21",
            excerpt: "لا تفقد تأكيداتك المخصصة مرة أخرى. تحافظ ميزة المزامنة السحابية الجديدة على أمان بياناتك وإمكانية الوصول إليها عبر جميع أجهزتك.",
            category: "تحديث الميزات"
        },
        {
            title: "5 طرق لبناء ممارسة اليقظة المتسقة",
            slug: "building-mindfulness-practice",
            date: "2024-01-20",
            excerpt: "نصائح واستراتيجيات عملية لدمج اليقظة في روتينك اليومي، باستخدام Daily Affirmations كرفيق لك.",
            category: "أدلة"
        }
    ],
    pt: [
        {
            title: "Como Escrever Afirmações Diárias Poderosas Que Realmente Funcionam",
            slug: "how-to-write-powerful-affirmations",
            date: "2024-03-15",
            excerpt: "Aprenda as técnicas comprovadas para criar afirmações diárias eficazes que geram mudanças reais. Descubra estratégias de escrita, exemplos e práticas que fazem as afirmações funcionarem.",
            category: "Guias"
        },
        {
            title: "Afirmações Matinais: Transforme Seu Dia em 5 Minutos",
            slug: "morning-affirmations-transform-your-day",
            date: "2024-04-22",
            excerpt: "Descubra rotinas poderosas de afirmações matinais que definem um tom positivo para todo o seu dia. Aprenda técnicas comprovadas e afirmações específicas para o sucesso matinal.",
            category: "Guias"
        },
        {
            title: "Modo Foco: Sua Porta de Entrada para Momentos de Atenção Plena",
            slug: "introducing-focus-mode",
            date: "2024-01-23",
            excerpt: "Transforme sua nova aba em um santuário sereno com nosso recurso mais solicitado. O Modo Foco remove distrações e cria um ambiente perfeito para atenção plena.",
            category: "Atualização de Recurso"
        },
        {
            title: "Atualizações do Produto em Janeiro de 2024",
            slug: "january-2024-updates",
            date: "2024-01-19",
            excerpt: "Um resumo de todos os novos recursos e melhorias que adicionamos este mês, incluindo Modo Foco, Sincronização na Nuvem e mais.",
            category: "Atualizações"
        },
        {
            title: "Criando Sua Biblioteca Pessoal de Afirmações",
            slug: "personal-affirmation-library",
            date: "2024-01-18",
            excerpt: "Aprenda como escrever afirmações poderosas e personalizadas e organizá-las de forma eficaz usando nossos recursos Pro.",
            category: "Guias"
        },
        {
            title: "Apresentando Suporte Multilíngue: Daily Affirmations Agora Disponível em 6 Idiomas",
            slug: "introducing-i18n-support",
            date: "2024-01-25",
            excerpt: "A extensão Daily Affirmations do Chrome agora suporta inglês, russo, chinês, árabe, português e hindi. Experimente afirmações no seu idioma nativo.",
            category: "Atualização de Recurso"
        },
        {
            title: "A Psicologia das Afirmações Positivas: O que a Ciência nos Diz",
            slug: "the-psychology-of-positive-affirmations",
            date: "2024-05-10",
            excerpt: "Explore a pesquisa psicológica e as evidências científicas por trás das afirmações positivas. Aprenda como funcionam, por que são eficazes e como maximizar seu impacto.",
            category: "Atenção Plena"
        },
        {
            title: "Desafio de 30 Dias de Afirmações: Um Guia Completo",
            slug: "30-day-affirmation-challenge",
            date: "2024-06-18",
            excerpt: "Participe do nosso desafio abrangente de afirmações de 30 dias. Receba afirmações diárias, acompanhe seu progresso e transforme sua mentalidade com este programa mensal comprovado.",
            category: "Guias"
        },
        {
            title: "Afirmações para Ansiedade: Acalmando sua Mente com Palavras",
            slug: "affirmations-for-anxiety",
            date: "2024-07-25",
            excerpt: "Descubra afirmações poderosas projetadas especificamente para acalmar a ansiedade e reduzir o estresse. Aprenda técnicas baseadas em ciência para usar afirmações para gerenciar pensamentos ansiosos e encontrar paz interior.",
            category: "Saúde Mental"
        },
        {
            title: "Afirmações Noturnas: Terminando seu Dia com Gratidão",
            slug: "nighttime-affirmations-gratitude",
            date: "2024-08-14",
            excerpt: "Aprenda como as afirmações noturnas melhoram a qualidade do sono e promovem a gratidão. Descubra rotinas de afirmações noturnas que ajudam você a refletir, liberar e se preparar para um sono tranquilo.",
            category: "Atenção Plena"
        },
        {
            title: "Afirmações vs. Mantras: Qual é a Diferença?",
            slug: "affirmations-vs-mantras",
            date: "2024-09-05",
            excerpt: "Entenda as principais diferenças entre afirmações e mantras. Aprenda quando usar cada um, como funcionam de forma diferente e como escolher a prática certa para seus objetivos.",
            category: "Guias"
        },
        {
            title: "Construindo Autoconfiança Através de Afirmações Diárias",
            slug: "building-self-confidence-affirmations",
            date: "2024-10-11",
            excerpt: "Aprenda como as afirmações diárias podem transformar sua autoconfiança. Descubra afirmações poderosas para construir confiança e técnicas comprovadas para superar a autodúvida e construir genuína crença em si mesmo.",
            category: "Guias"
        },
        {
            title: "Afirmações para o Trabalho: Impulsionando o Sucesso Profissional",
            slug: "affirmations-for-work",
            date: "2024-11-08",
            excerpt: "Descubra afirmações poderosas no local de trabalho para melhorar sua carreira, aumentar a produtividade e alcançar o sucesso profissional. Aprenda como usar afirmações para confiança, liderança e equilíbrio trabalho-vida.",
            category: "Guias"
        },
        {
            title: "Atenção Plena e Afirmações: Um Par Perfeito",
            slug: "mindfulness-and-affirmations",
            date: "2024-12-03",
            excerpt: "Descubra como a atenção plena e as afirmações trabalham juntas para criar uma transformação mais profunda. Aprenda técnicas para combinar essas práticas poderosas para melhor bem-estar e crescimento pessoal.",
            category: "Atenção Plena"
        },
        {
            title: "Afirmações para Relacionamentos: Fortalecendo Conexões",
            slug: "affirmations-for-relationships",
            date: "2025-01-14",
            excerpt: "Descubra afirmações poderosas para fortalecer relacionamentos, melhorar a comunicação e aprofundar conexões com parceiros, família e amigos. Aprenda práticas de afirmações focadas em relacionamentos.",
            category: "Guias"
        },
        {
            title: "A Neurociência das Afirmações: Como Elas Reconfiguram seu Cérebro",
            slug: "the-neuroscience-of-affirmations",
            date: "2025-02-18",
            excerpt: "Explore a neurociência por trás das afirmações e descubra como elas fisicamente reconfiguram seu cérebro. Aprenda sobre neuroplasticidade, caminhos neurais e a ciência do diálogo interno positivo.",
            category: "Atenção Plena"
        },
        {
            title: "Criando Afirmações que Ressonam: O Toque Pessoal",
            slug: "creating-affirmations-that-resonate",
            date: "2025-03-12",
            excerpt: "Aprenda como criar afirmações profundamente pessoais que realmente ressoam com seus valores, objetivos e autenticidade. Descubra técnicas para criar afirmações que parecem genuínas e poderosas.",
            category: "Guias"
        },
        {
            title: "Afirmações para Superar Medo e Autodúvida",
            slug: "affirmations-for-overcoming-fear",
            date: "2025-04-09",
            excerpt: "Descubra afirmações poderosas para superar medo, autodúvida e crenças limitantes. Aprenda técnicas comprovadas para usar afirmações para construir coragem e superar medos.",
            category: "Guias"
        },
        {
            title: "O Reset de Afirmações de 7 Dias: Seu Guia de Início Rápido",
            slug: "7-day-affirmation-reset",
            date: "2025-05-21",
            excerpt: "Inicie sua prática de afirmações com este programa abrangente de 7 dias. Receba afirmações diárias, exercícios e orientação para transformar sua mentalidade em apenas uma semana.",
            category: "Guias"
        },
        {
            title: "Afirmações para Atletas: Treinamento Mental para Desempenho de Pico",
            slug: "affirmations-for-athletes",
            date: "2025-06-17",
            excerpt: "Descubra afirmações poderosas projetadas especificamente para atletas. Aprenda como o treinamento mental através de afirmações melhora o desempenho, constrói confiança e ajuda a alcançar objetivos atléticos.",
            category: "Guias"
        },
        {
            title: "Afirmações para Estudantes: Melhorando Foco e Aprendizado",
            slug: "affirmations-for-students",
            date: "2025-07-24",
            excerpt: "Descubra afirmações poderosas projetadas para estudantes para melhorar o foco, melhorar o aprendizado, aumentar a confiança acadêmica e gerenciar o estresse de exames. Aprenda práticas de afirmações específicas para estudantes.",
            category: "Guias"
        },
        {
            title: "Manifestação vs. Afirmações: Separando Fato de Ficção",
            slug: "manifestation-vs-affirmations",
            date: "2025-08-13",
            excerpt: "Entenda as verdadeiras diferenças entre manifestação e afirmações. Aprenda o que a ciência diz sobre cada prática e como usá-las efetivamente juntas.",
            category: "Guias"
        },
        {
            title: "Afirmações para Mães: Autocuidado Através do Pensamento Positivo",
            slug: "affirmations-for-mothers",
            date: "2025-09-19",
            excerpt: "Descubra afirmações poderosas projetadas especificamente para mães para promover autocuidado, reduzir a culpa materna, construir confiança e manter equilíbrio durante a parentalidade.",
            category: "Guias"
        },
        {
            title: "O Melhor Momento para Praticar Afirmações: Cronometrando sua Positividade",
            slug: "best-time-to-practice-affirmations",
            date: "2025-10-08",
            excerpt: "Descubra quando e com que frequência praticar afirmações para máxima eficácia. Aprenda sobre o tempo ideal, frequência e como diferentes momentos do dia afetam o impacto das afirmações.",
            category: "Guias"
        },
        {
            title: "Afirmações para Criativos: Desbloqueando seu Potencial Artístico",
            slug: "affirmations-for-creatives",
            date: "2025-11-05",
            excerpt: "Descubra afirmações poderosas projetadas para artistas, escritores, músicos e criativos para superar bloqueios criativos, construir confiança artística e desbloquear seu pleno potencial criativo.",
            category: "Guias"
        },
        {
            title: "Bem-estar Digital: Usando Tecnologia para Mentalidade Positiva",
            slug: "digital-wellness-affirmations",
            date: "2026-01-15",
            excerpt: "Descubra como usar a tecnologia com atenção para saúde mental positiva. Aprenda como ferramentas digitais como aplicativos de afirmações podem apoiar o bem-estar enquanto mantêm limites saudáveis de tecnologia.",
            category: "Guias"
        },
        {
            title: "A Ciência por Trás das Afirmações Diárias",
            slug: "science-of-daily-affirmations",
            date: "2024-01-22",
            excerpt: "Explore a pesquisa psicológica e neurociência por trás das afirmações positivas, e aprenda como elas podem reconfigurar seu cérebro para sucesso e bem-estar.",
            category: "Atenção Plena"
        },
        {
            title: "Apresentando Sincronização e Backup na Nuvem",
            slug: "cloud-sync-backup",
            date: "2024-01-21",
            excerpt: "Nunca mais perca suas afirmações personalizadas. Nosso novo recurso de sincronização na nuvem mantém seus dados seguros e acessíveis em todos os seus dispositivos.",
            category: "Atualização de Recurso"
        },
        {
            title: "5 Maneiras de Construir uma Prática Consistente de Atenção Plena",
            slug: "building-mindfulness-practice",
            date: "2024-01-20",
            excerpt: "Dicas práticas e estratégias para incorporar atenção plena em sua rotina diária, usando Daily Affirmations como seu companheiro.",
            category: "Guias"
        }
    ],
    hi: [
        {
            title: "शक्तिशाली दैनिक पुष्टिकरण कैसे लिखें जो वास्तव में काम करते हैं",
            slug: "how-to-write-powerful-affirmations",
            date: "2024-03-15",
            excerpt: "प्रभावी दैनिक पुष्टिकरण बनाने के सिद्ध तकनीक सीखें जो वास्तविक बदलाव लाते हैं। लेखन रणनीतियाँ, उदाहरण और अभ्यास खोजें जो पुष्टिकरण को काम करते हैं।",
            category: "गाइड"
        },
        {
            title: "सुबह के पुष्टिकरण: 5 मिनट में अपना दिन बदलें",
            slug: "morning-affirmations-transform-your-day",
            date: "2024-04-22",
            excerpt: "शक्तिशाली सुबह के पुष्टिकरण दिनचर्या खोजें जो आपके पूरे दिन के लिए सकारात्मक स्वर निर्धारित करते हैं। सिद्ध तकनीक और सुबह की सफलता के लिए विशिष्ट पुष्टिकरण सीखें।",
            category: "गाइड"
        },
        {
            title: "फोकस मोड: माइंडफुल क्षणों के लिए आपका प्रवेश द्वार",
            slug: "introducing-focus-mode",
            date: "2024-01-23",
            excerpt: "हमारी सबसे अधिक मांग वाली सुविधा के साथ अपने नए टैब को शांत आश्रम में बदलें। फोकस मोड विचलन हटाता है और माइंडफुलनेस के लिए एक आदर्श वातावरण बनाता है।",
            category: "सुविधा अपडेट"
        },
        {
            title: "जनवरी 2024 उत्पाद अपडेट",
            slug: "january-2024-updates",
            date: "2024-01-19",
            excerpt: "इस महीने हमने जोड़े गए सभी नई सुविधाओं और सुधारों का सारांश, जिसमें फोकस मोड, क्लाउड सिंक और अधिक शामिल हैं।",
            category: "अपडेट"
        },
        {
            title: "अपनी व्यक्तिगत पुष्टिकरण लाइब्रेरी बनाना",
            slug: "personal-affirmation-library",
            date: "2024-01-18",
            excerpt: "शक्तिशाली, व्यक्तिगत पुष्टिकरण कैसे लिखें और हमारी Pro सुविधाओं का उपयोग करके उन्हें प्रभावी ढंग से व्यवस्थित करना सीखें।",
            category: "गाइड"
        },
        {
            title: "बहुभाषी समर्थन की शुरुआत: Daily Affirmations अब 6 भाषाओं में उपलब्ध",
            slug: "introducing-i18n-support",
            date: "2024-01-25",
            excerpt: "Daily Affirmations Chrome एक्सटेंशन अब अंग्रेजी, रूसी, चीनी, अरबी, पुर्तगाली और हिंदी का समर्थन करता है। अपनी मूल भाषा में पुष्टिकरण का अनुभव करें।",
            category: "सुविधा अपडेट"
        },
        {
            title: "सकारात्मक पुष्टिकरण का मनोविज्ञान: विज्ञान हमें क्या बताता है",
            slug: "the-psychology-of-positive-affirmations",
            date: "2024-05-10",
            excerpt: "सकारात्मक पुष्टिकरण के पीछे मनोवैज्ञानिक अनुसंधान और वैज्ञानिक साक्ष्य का अन्वेषण करें। जानें कि वे कैसे काम करते हैं, क्यों प्रभावी हैं और उनके प्रभाव को कैसे अधिकतम करें।",
            category: "माइंडफुलनेस"
        },
        {
            title: "30 दिन का पुष्टिकरण चैलेंज: एक संपूर्ण गाइड",
            slug: "30-day-affirmation-challenge",
            date: "2024-06-18",
            excerpt: "हमारे व्यापक 30-दिवसीय पुष्टिकरण चैलेंज में शामिल हों। दैनिक पुष्टिकरण प्राप्त करें, अपनी प्रगति को ट्रैक करें, और इस सिद्ध मासिक कार्यक्रम के साथ अपनी मानसिकता को बदलें।",
            category: "गाइड"
        },
        {
            title: "चिंता के लिए पुष्टिकरण: शब्दों से अपने मन को शांत करना",
            slug: "affirmations-for-anxiety",
            date: "2024-07-25",
            excerpt: "चिंता को शांत करने और तनाव कम करने के लिए विशेष रूप से डिज़ाइन किए गए शक्तिशाली पुष्टिकरण खोजें। चिंताजनक विचारों का प्रबंधन करने और आंतरिक शांति पाने के लिए पुष्टिकरण का उपयोग करने की विज्ञान-समर्थित तकनीकें सीखें।",
            category: "मानसिक स्वास्थ्य"
        },
        {
            title: "रात के पुष्टिकरण: कृतज्ञता के साथ अपना दिन समाप्त करना",
            slug: "nighttime-affirmations-gratitude",
            date: "2024-08-14",
            excerpt: "जानें कि रात के पुष्टिकरण नींद की गुणवत्ता को कैसे सुधारते हैं और कृतज्ञता को बढ़ावा देते हैं। शाम के पुष्टिकरण दिनचर्या खोजें जो आपको प्रतिबिंबित करने, छोड़ने और आरामदायक नींद के लिए तैयार होने में मदद करते हैं।",
            category: "माइंडफुलनेस"
        },
        {
            title: "पुष्टिकरण बनाम मंत्र: क्या अंतर है?",
            slug: "affirmations-vs-mantras",
            date: "2024-09-05",
            excerpt: "पुष्टिकरण और मंत्रों के बीच मुख्य अंतर को समझें। जानें कि प्रत्येक का उपयोग कब करना है, वे अलग-अलग कैसे काम करते हैं और अपने लक्ष्यों के लिए सही अभ्यास कैसे चुनें।",
            category: "गाइड"
        },
        {
            title: "दैनिक पुष्टिकरण के माध्यम से आत्मविश्वास बनाना",
            slug: "building-self-confidence-affirmations",
            date: "2024-10-11",
            excerpt: "जानें कि दैनिक पुष्टिकरण आपके आत्मविश्वास को कैसे बदल सकते हैं। आत्मविश्वास बनाने के लिए शक्तिशाली पुष्टिकरण और आत्मसंदेह को दूर करने और वास्तविक आत्मविश्वास बनाने की सिद्ध तकनीकें खोजें।",
            category: "गाइड"
        },
        {
            title: "काम के लिए पुष्टिकरण: पेशेवर सफलता को बढ़ावा देना",
            slug: "affirmations-for-work",
            date: "2024-11-08",
            excerpt: "अपने करियर को बढ़ाने, उत्पादकता बढ़ाने और पेशेवर सफलता हासिल करने के लिए शक्तिशाली कार्यस्थल पुष्टिकरण खोजें। आत्मविश्वास, नेतृत्व और काम-जीवन संतुलन के लिए पुष्टिकरण का उपयोग करना सीखें।",
            category: "गाइड"
        },
        {
            title: "माइंडफुलनेस और पुष्टिकरण: एक सही जोड़ी",
            slug: "mindfulness-and-affirmations",
            date: "2024-12-03",
            excerpt: "खोजें कि माइंडफुलनेस और पुष्टिकरण गहरे परिवर्तन बनाने के लिए कैसे एक साथ काम करते हैं। बेहतर कल्याण और व्यक्तिगत विकास के लिए इन शक्तिशाली प्रथाओं को जोड़ने की तकनीकें सीखें।",
            category: "माइंडफुलनेस"
        },
        {
            title: "रिश्तों के लिए पुष्टिकरण: कनेक्शन को मजबूत करना",
            slug: "affirmations-for-relationships",
            date: "2025-01-14",
            excerpt: "रिश्तों को मजबूत करने, संचार में सुधार करने और साथी, परिवार और दोस्तों के साथ कनेक्शन को गहरा करने के लिए शक्तिशाली पुष्टिकरण खोजें। रिश्ते-केंद्रित पुष्टिकरण प्रथाएं सीखें।",
            category: "गाइड"
        },
        {
            title: "पुष्टिकरण का न्यूरोसाइंस: वे आपके मस्तिष्क को कैसे फिर से जोड़ते हैं",
            slug: "the-neuroscience-of-affirmations",
            date: "2025-02-18",
            excerpt: "पुष्टिकरण के पीछे न्यूरोसाइंस का अन्वेषण करें और खोजें कि वे आपके मस्तिष्क को शारीरिक रूप से कैसे फिर से जोड़ते हैं। न्यूरोप्लास्टिसिटी, न्यूरल पाथवे और सकारात्मक आत्म-चर्चा के विज्ञान के बारे में जानें।",
            category: "माइंडफुलनेस"
        },
        {
            title: "प्रतिध्वनित पुष्टिकरण बनाना: व्यक्तिगत स्पर्श",
            slug: "creating-affirmations-that-resonate",
            date: "2025-03-12",
            excerpt: "जानें कि कैसे गहरे व्यक्तिगत पुष्टिकरण बनाएं जो वास्तव में आपके मूल्यों, लक्ष्यों और प्रामाणिक स्व के साथ प्रतिध्वनित होते हैं। पुष्टिकरण बनाने की तकनीकें खोजें जो वास्तविक और शक्तिशाली महसूस होते हैं।",
            category: "गाइड"
        },
        {
            title: "भय और आत्मसंदेह को दूर करने के लिए पुष्टिकरण",
            slug: "affirmations-for-overcoming-fear",
            date: "2025-04-09",
            excerpt: "भय, आत्मसंदेह और सीमित विश्वासों को दूर करने के लिए शक्तिशाली पुष्टिकरण खोजें। साहस बनाने और भय से आगे बढ़ने के लिए पुष्टिकरण का उपयोग करने की सिद्ध तकनीकें सीखें।",
            category: "गाइड"
        },
        {
            title: "7-दिवसीय पुष्टिकरण रीसेट: आपका त्वरित स्टार्ट गाइड",
            slug: "7-day-affirmation-reset",
            date: "2025-05-21",
            excerpt: "इस व्यापक 7-दिवसीय कार्यक्रम के साथ अपने पुष्टिकरण अभ्यास को शुरू करें। दैनिक पुष्टिकरण, व्यायाम और मार्गदर्शन प्राप्त करें ताकि सिर्फ एक सप्ताह में अपनी मानसिकता को बदल सकें।",
            category: "गाइड"
        },
        {
            title: "एथलीटों के लिए पुष्टिकरण: शीर्ष प्रदर्शन के लिए मानसिक प्रशिक्षण",
            slug: "affirmations-for-athletes",
            date: "2025-06-17",
            excerpt: "एथलीटों के लिए विशेष रूप से डिज़ाइन किए गए शक्तिशाली पुष्टिकरण खोजें। जानें कि पुष्टिकरण के माध्यम से मानसिक प्रशिक्षण प्रदर्शन को कैसे बढ़ाता है, आत्मविश्वास बनाता है और एथलेटिक लक्ष्यों को प्राप्त करने में मदद करता है।",
            category: "गाइड"
        },
        {
            title: "छात्रों के लिए पुष्टिकरण: फोकस और सीखने को बढ़ाना",
            slug: "affirmations-for-students",
            date: "2025-07-24",
            excerpt: "फोकस बढ़ाने, सीखने में सुधार, शैक्षणिक आत्मविश्वास बढ़ाने और परीक्षा के तनाव को प्रबंधित करने के लिए छात्रों के लिए डिज़ाइन किए गए शक्तिशाली पुष्टिकरण खोजें। छात्र-विशिष्ट पुष्टिकरण प्रथाएं सीखें।",
            category: "गाइड"
        },
        {
            title: "मैनिफेस्टेशन बनाम पुष्टिकरण: तथ्य को कल्पना से अलग करना",
            slug: "manifestation-vs-affirmations",
            date: "2025-08-13",
            excerpt: "मैनिफेस्टेशन और पुष्टिकरण के बीच वास्तविक अंतर को समझें। जानें कि विज्ञान प्रत्येक अभ्यास के बारे में क्या कहता है और उनका प्रभावी ढंग से एक साथ उपयोग कैसे करें।",
            category: "गाइड"
        },
        {
            title: "माताओं के लिए पुष्टिकरण: सकारात्मक सोच के माध्यम से स्व-देखभाल",
            slug: "affirmations-for-mothers",
            date: "2025-09-19",
            excerpt: "स्व-देखभाल को बढ़ावा देने, माँ के अपराध को कम करने, आत्मविश्वास बनाने और पालन-पोषण के दौरान संतुलन बनाए रखने के लिए माताओं के लिए विशेष रूप से डिज़ाइन किए गए शक्तिशाली पुष्टिकरण खोजें।",
            category: "गाइड"
        },
        {
            title: "पुष्टिकरण का अभ्यास करने का सबसे अच्छा समय: अपनी सकारात्मकता को समय देना",
            slug: "best-time-to-practice-affirmations",
            date: "2025-10-08",
            excerpt: "अधिकतम प्रभावशीलता के लिए पुष्टिकरण का अभ्यास कब और कितनी बार करना है, यह खोजें। इष्टतम समय, आवृत्ति के बारे में जानें और दिन के विभिन्न समय पुष्टिकरण के प्रभाव को कैसे प्रभावित करते हैं।",
            category: "गाइड"
        },
        {
            title: "रचनात्मक लोगों के लिए पुष्टिकरण: अपनी कलात्मक क्षमता को अनलॉक करना",
            slug: "affirmations-for-creatives",
            date: "2025-11-05",
            excerpt: "रचनात्मक ब्लॉकों को दूर करने, कलात्मक आत्मविश्वास बनाने और अपनी पूरी रचनात्मक क्षमता को अनलॉक करने के लिए कलाकारों, लेखकों, संगीतकारों और रचनात्मक लोगों के लिए डिज़ाइन किए गए शक्तिशाली पुष्टिकरण खोजें।",
            category: "गाइड"
        },
        {
            title: "डिजिटल वेलनेस: सकारात्मक मानसिकता के लिए प्रौद्योगिकी का उपयोग करना",
            slug: "digital-wellness-affirmations",
            date: "2026-01-15",
            excerpt: "सकारात्मक मानसिक स्वास्थ्य के लिए प्रौद्योगिकी का सचेत रूप से उपयोग कैसे करें, यह खोजें। जानें कि पुष्टिकरण ऐप्स जैसे डिजिटल उपकरण स्वस्थ तकनीकी सीमाओं को बनाए रखते हुए कल्याण का समर्थन कैसे कर सकते हैं।",
            category: "गाइड"
        },
        {
            title: "दैनिक पुष्टिकरण के पीछे विज्ञान",
            slug: "science-of-daily-affirmations",
            date: "2024-01-22",
            excerpt: "सकारात्मक पुष्टिकरण के पीछे मनोवैज्ञानिक अनुसंधान और न्यूरोसाइंस का अन्वेषण करें, और जानें कि वे सफलता और कल्याण के लिए आपके मस्तिष्क को कैसे फिर से जोड़ सकते हैं।",
            category: "माइंडफुलनेस"
        },
        {
            title: "क्लाउड सिंक और बैकअप की शुरुआत",
            slug: "cloud-sync-backup",
            date: "2024-01-21",
            excerpt: "अपने व्यक्तिगत पुष्टिकरण को फिर कभी न खोएं। हमारी नई क्लाउड सिंक सुविधा आपके डेटा को सुरक्षित रखती है और आपके सभी उपकरणों पर पहुंच योग्य बनाती है।",
            category: "सुविधा अपडेट"
        },
        {
            title: "एक सुसंगत माइंडफुलनेस अभ्यास बनाने के 5 तरीके",
            slug: "building-mindfulness-practice",
            date: "2024-01-20",
            excerpt: "अपनी दैनिक दिनचर्या में माइंडफुलनेस को शामिल करने के लिए व्यावहारिक सुझाव और रणनीतियाँ, Daily Affirmations को अपने साथी के रूप में उपयोग करना।",
            category: "गाइड"
        }
    ]
};

export function getBlogPosts(lang: Language = 'en'): BlogPost[] {
    return blogPostsByLanguage[lang] || blogPostsByLanguage.en;
}

export const supportedLanguages: Language[] = ['en', 'ru', 'zh', 'ar', 'pt', 'hi'];

