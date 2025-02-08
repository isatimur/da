import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/blog',
                    '/blog/posts/*',
                    '/privacy',
                    '/terms'
                ],
                disallow: [
                    '/api/*',
                    '/admin/*',
                    '/*.json$',
                    '/private/*',
                    '/draft/*'
                ]
            },
            {
                userAgent: 'GPTBot',
                allow: ['/blog/posts/*'],
                disallow: '/'
            }
        ],
        sitemap: 'https://daily-affirmation.today/sitemap.xml',
        host: 'https://daily-affirmation.today'
    };
} 