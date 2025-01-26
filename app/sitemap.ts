import { blogPosts } from './blog/posts/data';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://daily-affirmation.today';

    // Static pages
    const staticPages = [
        '',
        '/blog',
        '/privacy',
        '/terms',
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Blog posts
    const blogRoutes = blogPosts.map(post => ({
        url: `${baseUrl}/blog/posts/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...blogRoutes];
} 