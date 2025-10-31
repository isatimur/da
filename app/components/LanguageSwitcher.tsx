'use client'

import { usePathname, useRouter } from 'next/navigation';
import { supportedLanguages } from '../blog/[lang]/posts/data';

const labels: Record<string, string> = {
    en: 'EN',
    ru: 'RU',
    zh: '中文',
    ar: 'العربية',
    pt: 'PT',
    hi: 'हिं',
};

function computeTargetPath(currentPath: string, targetLang: string): string {
    // Normalize: ensure leading slash
    const path = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;

    // Cases:
    // 1) / or /{lang} -> /{targetLang}
    // 2) /blog -> /blog/{targetLang}
    // 3) /blog/{lang}(/...)? -> replace {lang}
    // 4) /blog/posts/... -> /blog/{targetLang}/posts/...
    
    // Handle root or language root - always use /{lang} format
    if (path === '/' || path.match(/^\/[a-z]{2}$/)) {
        return `/${targetLang}`;
    }

    const parts = path.split('/').filter(Boolean); // Remove empty strings
    
    // Check if first segment is a language code
    if (supportedLanguages.includes(parts[0] as any)) {
        // Replace the language
        parts[0] = targetLang;
        return '/' + parts.join('/');
    }

    // Check if it's a blog path
    if (parts[0] === 'blog') {
        // Check if second segment is a language
        if (supportedLanguages.includes(parts[1] as any)) {
            parts[1] = targetLang;
            return '/' + parts.join('/');
        }
        // Insert language after blog
        parts.splice(1, 0, targetLang);
        return '/' + parts.join('/');
    }

    // For other paths, prepend language if not English
    if (targetLang === 'en') {
        return path;
    }
    return `/${targetLang}${path}`;
}

export function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        const target = computeTargetPath(pathname || '/', lang);
        router.push(target);
    };

    // Determine current language from path
    const path = pathname || '/';
    let current = 'en';
    const parts = path.split('/').filter(Boolean);
    
    // Check first segment for language (for /{lang} or /{lang}/...)
    if (parts.length > 0 && supportedLanguages.includes(parts[0] as any)) {
        current = parts[0];
    }
    // Check second segment for blog paths (/blog/{lang}/...)
    else if (parts[0] === 'blog' && parts.length > 1 && supportedLanguages.includes(parts[1] as any)) {
        current = parts[1];
    }

    return (
        <select
            aria-label="Language switcher"
            className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm rounded-md px-2 py-1 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={current}
            onChange={onChange}
        >
            {supportedLanguages.map((lang) => (
                <option key={lang} value={lang}>
                    {labels[lang] || lang.toUpperCase()}
                </option>
            ))}
        </select>
    );
}
