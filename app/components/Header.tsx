'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href?.startsWith('/#')) {
            e.preventDefault();
            const targetId = href.replace('/#', '');
            const targetElement = document.getElementById(targetId);
            
            if (pathname !== '/') {
                window.location.href = href;
                return;
            }

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Update URL without scrolling
                window.history.pushState({}, '', href);
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
                    <Link href="/" className="text-xl font-bold text-gradient">
                        Daily Affirmations
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link 
                            href="/blog" 
                            className="text-neutral-400 hover:text-neutral-200 transition-colors"
                        >
                            Blog
                        </Link>
                        <Link 
                            href="/#features" 
                            onClick={handleAnchorClick}
                            className="text-neutral-400 hover:text-neutral-200 transition-colors"
                        >
                            Features
                        </Link>
                        <Link 
                            href="/#pricing" 
                            onClick={handleAnchorClick}
                            className="text-neutral-400 hover:text-neutral-200 transition-colors"
                        >
                            Pricing
                        </Link>
                        <a
                            href="https://chromewebstore.google.com/detail/daily-affirmations/nhhicimcipdgjckacooendaikhjhenle"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-neutral-900 font-medium transition-colors"
                        >
                            Install Extension
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
} 