'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { supportedLanguages } from '../blog/[lang]/posts/data';

export function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get current language from path
    const getCurrentLang = () => {
        if (!pathname) return 'en';
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length > 0 && supportedLanguages.includes(parts[0] as any)) {
            return parts[0];
        }
        if (parts[0] === 'blog' && parts.length > 1 && supportedLanguages.includes(parts[1] as any)) {
            return parts[1];
        }
        return 'en';
    };

    const currentLang = getCurrentLang();
    const homePath = `/${currentLang}`;
    const blogPath = `/blog/${currentLang}`;

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href?.includes('#')) {
            e.preventDefault();
            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);
            
            // If we're not on the home page, navigate to home with anchor
            if (pathname && !pathname.match(/^\/[a-z]{2}?$/)) {
                window.location.href = `${homePath}#${targetId}`;
                return;
            }

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Update URL without scrolling
                window.history.pushState({}, '', `${homePath}#${targetId}`);
            }
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
            scrolled 
                ? 'bg-neutral-950/80 backdrop-blur-md border-neutral-800/50' 
                : 'bg-neutral-950/50 border-transparent'
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href={homePath} className="text-xl font-bold text-gradient">
                        Daily Affirmations
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link 
                            href={blogPath}
                            className="text-neutral-400 hover:text-neutral-200 transition-colors"
                        >
                            {currentLang === 'ru' ? 'Блог' : currentLang === 'zh' ? '博客' : currentLang === 'ar' ? 'المدونة' : currentLang === 'pt' ? 'Blog' : currentLang === 'hi' ? 'ब्लॉग' : 'Blog'}
                        </Link>
                        <Link 
                            href={`${homePath}#features`}
                            onClick={handleAnchorClick}
                            className="text-neutral-400 hover:text-neutral-200 transition-colors"
                        >
                            {currentLang === 'ru' ? 'Функции' : currentLang === 'zh' ? '功能' : currentLang === 'ar' ? 'الميزات' : currentLang === 'pt' ? 'Recursos' : currentLang === 'hi' ? 'सुविधाएँ' : 'Features'}
                        </Link>
                        <Link 
                            href={`${homePath}#pricing`}
                            onClick={handleAnchorClick}
                            className="text-neutral-400 hover:text-neutral-200 transition-colors"
                        >
                            {currentLang === 'ru' ? 'Цены' : currentLang === 'zh' ? '定价' : currentLang === 'ar' ? 'الأسعار' : currentLang === 'pt' ? 'Preços' : currentLang === 'hi' ? 'मूल्य निर्धारण' : 'Pricing'}
                        </Link>
                        <a
                            href="https://chromewebstore.google.com/detail/daily-affirmations/nhhicimcipdgjckacooendaikhjhenle"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-neutral-900 font-medium transition-colors"
                        >
                            {currentLang === 'ru' ? 'Установить расширение' : currentLang === 'zh' ? '安装扩展' : currentLang === 'ar' ? 'ثبّت الامتداد' : currentLang === 'pt' ? 'Instalar Extensão' : currentLang === 'hi' ? 'एक्सटेंशन इंस्टॉल करें' : 'Install Extension'}
                        </a>
                        <LanguageSwitcher />
                    </nav>
                </div>
            </div>
        </header>
    );
} 