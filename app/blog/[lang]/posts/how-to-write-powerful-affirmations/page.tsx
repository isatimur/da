'use client'

import { Header } from '../../../../components/Header';
import { NewsletterSignup } from '../../../../components/NewsletterSignup';
import { SocialShare } from '../../../../components/SocialShare';
import { BlogJsonLd } from '../../../../components/BlogJsonLd';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const content = {
    en: {
        url: 'https://daily-affirmation.today/blog/posts/how-to-write-powerful-affirmations',
        title: 'How to Write Powerful Daily Affirmations That Actually Work',
        description: "Learn the proven techniques for crafting effective daily affirmations that create real change. Discover writing strategies, examples, and practices that make affirmations work.",
        date: '2024-03-15',
        category: 'Guides',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=630&fit=crop',
        dateDisplay: 'March 15, 2024',
        h1: 'How to Write Powerful Daily Affirmations That Actually Work',
        intro: 'Transform your affirmation practice with proven writing techniques that create lasting change. Discover the secrets behind affirmations that resonate deeply and drive real results.',
        alt: 'Person writing in journal with pen and paper, representing powerful daily affirmations',
        sections: [
            { heading: 'Why Most Affirmations Don\'t Work', text: 'Most people write affirmations that sound good but don\'t change behavior. The issue is in the writing: generic, future-tense, and emotionally flat statements rarely stick.' },
            { heading: 'Five Essentials', text: 'Use first-person present, be specific, focus on desired states, keep it believable, add emotional language.' },
        ],
        cta: 'Make it effortless: use the Daily Affirmations Chrome extension to keep your affirmations visible and consistent every day.'
    },
    ru: {
        url: 'https://daily-affirmation.today/blog/ru/posts/how-to-write-powerful-affirmations',
        title: 'Как писать эффективные ежедневные аффирмации, которые действительно работают',
        description: 'Изучите проверенные техники создания эффективных ежедневных аффирмаций, которые создают реальные изменения. Стратегии написания, примеры и практики, делающие аффирмации рабочими.',
        date: '2024-03-15',
        category: 'Руководства',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=630&fit=crop',
        dateDisplay: '15 марта 2024',
        h1: 'Как писать эффективные ежедневные аффирмации, которые действительно работают',
        intro: 'Преобразуйте практику аффирмаций с помощью проверенных техник письма. Узнайте, как создавать фразы, которые реально меняют мышление и поведение.',
        alt: 'Человек пишет в дневнике ручкой — метафора мощных аффирмаций',
        sections: [
            { heading: 'Почему многие аффирмации не работают', text: 'Часто фразы слишком общие, в будущем времени и без эмоций. Такие утверждения ум не принимает.' },
            { heading: 'Пять основ', text: 'Первое лицо и настоящее время, конкретика, фокус на желаемом, правдоподобность, эмоциональная лексика.' },
        ],
        cta: 'Сделайте это просто: используйте расширение Daily Affirmations для Chrome, чтобы ваши аффирмации были всегда на виду.'
    },
    zh: {
        url: 'https://daily-affirmation.today/blog/zh/posts/how-to-write-powerful-affirmations',
        title: '如何撰写真正有效的每日肯定语',
        description: '学习经过验证的技巧，打造有效的每日肯定语，带来真正的改变。写作策略、示例与实践。',
        date: '2024-03-15',
        category: '指南',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=630&fit=crop',
        dateDisplay: '2024年3月15日',
        h1: '如何撰写真正有效的每日肯定语',
        intro: '用经过验证的写作技巧优化你的肯定语，让其真正改变思维与行为。',
        alt: '写日记的人，象征有力的肯定语',
        sections: [
            { heading: '为什么许多肯定语无效', text: '过于笼统、使用将来时、缺乏情感的语句不易被大脑接受。' },
            { heading: '五个关键要素', text: '第一人称现在时、具体清晰、聚焦想要、可相信、带情感词。' },
        ],
        cta: '配合 Chrome 扩展 Daily Affirmations，让肯定语每日可见、坚持更轻松。'
    },
    ar: {
        url: 'https://daily-affirmation.today/blog/ar/posts/how-to-write-powerful-affirmations',
        title: 'كيفية كتابة التأكيدات اليومية القوية التي تعمل بالفعل',
        description: 'تعلّم التقنيات المثبتة لصياغة التأكيدات اليومية الفعالة التي تُحدث تغييراً حقيقياً.',
        date: '2024-03-15',
        category: 'أدلة',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=630&fit=crop',
        dateDisplay: '15 مارس 2024',
        h1: 'كيفية كتابة التأكيدات اليومية القوية التي تعمل بالفعل',
        intro: 'حوّل ممارستك للتأكيدات بتقنيات كتابة مثبتة تُحدث أثراً دائماً.',
        alt: 'شخص يكتب في دفتر — تأكيدات قوية',
        sections: [
            { heading: 'لماذا لا تعمل معظم التأكيدات', text: 'العمومية، زمن المستقبل، وغياب العاطفة تمنع العقل من قبولها.' },
            { heading: 'خمسة أساسيات', text: 'ضمير المتكلم والمضارع، التحديد، التركيز على المرغوب، القابلية للتصديق، لغة عاطفية.' },
        ],
        cta: 'اجعلها سهلة: استخدم امتداد Daily Affirmations لـ Chrome لإبقاء تأكيداتك مرئية يومياً.'
    },
    pt: {
        url: 'https://daily-affirmation.today/blog/pt/posts/how-to-write-powerful-affirmations',
        title: 'Como Escrever Afirmações Diárias Poderosas que Realmente Funcionam',
        description: 'Técnicas comprovadas para escrever afirmações eficazes que geram mudança real.',
        date: '2024-03-15',
        category: 'Guias',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=630&fit=crop',
        dateDisplay: '15 de março de 2024',
        h1: 'Como Escrever Afirmações Diárias Poderosas que Realmente Funcionam',
        intro: 'Transforme sua prática com técnicas de escrita que realmente funcionam.',
        alt: 'Pessoa escrevendo em um diário — afirmações poderosas',
        sections: [
            { heading: 'Por que muitas afirmações não funcionam', text: 'Frases genéricas, no futuro e sem emoção não se fixam no cérebro.' },
            { heading: 'Cinco essenciais', text: 'Primeira pessoa no presente, especificidade, foco no desejado, credibilidade, linguagem emocional.' },
        ],
        cta: 'Use a extensão Daily Affirmations do Chrome para manter suas afirmações visíveis todos os dias.'
    },
    hi: {
        url: 'https://daily-affirmation.today/blog/hi/posts/how-to-write-powerful-affirmations',
        title: 'शक्तिशाली दैनिक पुष्टिकरण कैसे लिखें जो वास्तव में काम करते हैं',
        description: 'प्रमाणित तकनीकों से प्रभावी पुष्टिकरण लिखना सीखें जो वास्तविक बदलाव लाते हैं।',
        date: '2024-03-15',
        category: 'गाइड',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=630&fit=crop',
        dateDisplay: '15 मार्च 2024',
        h1: 'शक्तिशाली दैनिक पुष्टिकरण कैसे लिखें जो वास्तव में काम करते हैं',
        intro: 'ऐसी लेखन तकनीकों से अपनी प्रैक्टिस बदलें जो सच में असर करती हैं।',
        alt: 'डायरी में लिखता व्यक्ति — शक्तिशाली पुष्टिकरण',
        sections: [
            { heading: 'कई पुष्टिकरण क्यों काम नहीं करते', text: 'बहुत सामान्य, भविष्यकाल और बिना भावना वाली पंक्तियाँ मन में नहीं टिकतीं।' },
            { heading: 'पाँच आवश्यक तत्व', text: 'प्रथम पुरुष वर्तमान, स्पष्टता, वांछित पर फोकस, विश्वसनीयता, भावनात्मक भाषा।' },
        ],
        cta: 'Chrome के Daily Affirmations एक्सटेंशन से अपनी पुष्टिकरण रोज़ाना दृश्य और सुसंगत रखें.'
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
                        {t.sections.map((s: any, i: number) => (
                            <section key={i} className="mb-8">
                                <h2>{s.heading}</h2>
                                <p>{s.text}</p>
                            </section>
                        ))}

                        <div className="bg-gradient-to-r from-neutral-900/50 to-neutral-800/50 p-6 rounded-xl my-8">
                            <h3 className="text-xl font-semibold mb-4">
                                {lang === 'ru' ? '💡 Советы' : lang === 'zh' ? '💡 提示' : lang === 'ar' ? '💡 نصيحة' : lang === 'pt' ? '💡 Dica' : lang === 'hi' ? '💡 सुझाव' : '💡 Tips'}
                            </h3>
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
