import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { NewsletterSignup } from '../../components/NewsletterSignup';
import { Rss } from 'lucide-react';
import { getBlogPosts } from './posts/data';

const metadataByLang: Record<string, { title: string; description: string }> = {
    en: {
        title: 'Blog - Daily Affirmations Updates and Insights',
        description: 'Stay updated with the latest features, mindfulness tips, and development updates for the Daily Affirmations Chrome extension.',
    },
    ru: {
        title: 'Блог - Обновления и идеи Daily Affirmations',
        description: 'Будьте в курсе последних функций, советов по осознанности и обновлений разработки для расширения Daily Affirmations для Chrome.',
    },
    zh: {
        title: '博客 - Daily Affirmations 更新和见解',
        description: '了解 Daily Affirmations Chrome 扩展的最新功能、正念技巧和开发更新。',
    },
    ar: {
        title: 'المدونة - تحديثات ورؤى Daily Affirmations',
        description: 'ابق محدثاً مع أحدث الميزات ونصائح اليقظة وتحديثات التطوير لامتداد Daily Affirmations لـ Chrome.',
    },
    pt: {
        title: 'Blog - Atualizações e Insights do Daily Affirmations',
        description: 'Mantenha-se atualizado com os últimos recursos, dicas de atenção plena e atualizações de desenvolvimento para a extensão Daily Affirmations do Chrome.',
    },
    hi: {
        title: 'ब्लॉग - Daily Affirmations अपडेट और अंतर्दृष्टि',
        description: 'Daily Affirmations Chrome एक्सटेंशन के लिए नवीनतम सुविधाओं, माइंडफुलनेस युक्तियाँ और विकास अपडेट के साथ अपडेट रहें।',
    },
};

export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const lang = resolvedParams?.lang || 'en';
    const metadata = metadataByLang[lang] || metadataByLang.en;
    
    return {
        title: metadata.title,
        description: metadata.description,
    };
}

const labels = {
    en: {
        latestUpdates: 'Latest Updates',
        rssFeed: 'RSS Feed',
        readMore: 'Read more',
    },
    ru: {
        latestUpdates: 'Последние обновления',
        rssFeed: 'RSS лента',
        readMore: 'Читать далее',
    },
    zh: {
        latestUpdates: '最新更新',
        rssFeed: 'RSS 源',
        readMore: '阅读更多',
    },
    ar: {
        latestUpdates: 'آخر التحديثات',
        rssFeed: 'خلاصة RSS',
        readMore: 'اقرأ المزيد',
    },
    pt: {
        latestUpdates: 'Últimas Atualizações',
        rssFeed: 'Feed RSS',
        readMore: 'Leia mais',
    },
    hi: {
        latestUpdates: 'नवीनतम अपडेट',
        rssFeed: 'RSS फ़ीड',
        readMore: 'अधिक पढ़ें',
    },
};

export default async function BlogPage({ params }: { params: Promise<{ lang?: string }> }) {
    const resolvedParams = await params;
    const lang = resolvedParams?.lang || 'en';
    const blogPosts = getBlogPosts(lang as any);
    const t = labels[lang as keyof typeof labels] || labels.en;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 pt-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
                            {t.latestUpdates}
                        </h1>
                        <a
                            href={`/api/rss${lang !== 'en' ? `?lang=${lang}` : ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-neutral-200"
                        >
                            <Rss className="w-4 h-4" />
                            <span>{t.rssFeed}</span>
                        </a>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {blogPosts.map((post) => (
                            <article
                                key={post.slug}
                                className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900/80 transition-colors"
                            >
                                <div className="text-sm text-neutral-400 mb-2">{post.date}</div>
                                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                                    {post.category}
                                </div>
                                <h2 className="text-xl font-semibold mb-3">
                                    <Link
                                        href={`/blog/${lang}/posts/${post.slug}`}
                                        className="hover:text-yellow-500 transition-colors"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-neutral-400 mb-4">{post.excerpt}</p>
                                <Link
                                    href={`/blog/${lang}/posts/${post.slug}`}
                                    className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
                                >
                                    {t.readMore}
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </article>
                        ))}
                    </div>

                    <div className="mt-20">
                        <NewsletterSignup />
                    </div>
                </div>
            </main>
        </>
    );
}

