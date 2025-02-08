import { blogPosts } from './blog/posts/data';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://daily-affirmation.today';

    // Static pages with priorities
    const staticPages = [
        { route: '', priority: 1.0, changeFreq: 'daily' },
        { route: '/blog', priority: 0.9, changeFreq: 'daily' },
        { route: '/privacy', priority: 0.7, changeFreq: 'monthly' },
        { route: '/terms', priority: 0.7, changeFreq: 'monthly' },
        { route: '/features', priority: 0.8, changeFreq: 'weekly' },
        { route: '/pricing', priority: 0.8, changeFreq: 'weekly' },
        { route: '/about', priority: 0.7, changeFreq: 'monthly' },
        { route: '/contact', priority: 0.7, changeFreq: 'monthly' },
    ].map(({ route, priority, changeFreq }) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: changeFreq as MetadataRoute.Sitemap[number]['changeFrequency'],
        priority: priority,
    }));

    // Blog posts with dynamic priorities based on date
    const blogRoutes = blogPosts.map(post => {
        const postDate = new Date(post.date);
        const now = new Date();
        const ageInDays = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
        
        // Newer posts get higher priority
        let priority = 0.9;
        if (ageInDays > 7) priority = 0.8;
        if (ageInDays > 30) priority = 0.7;
        if (ageInDays > 90) priority = 0.6;

        return {
            url: `${baseUrl}/blog/posts/${post.slug}`,
            lastModified: postDate.toISOString(),
            changeFrequency: ageInDays <= 7 ? 'daily' : 
                           ageInDays <= 30 ? 'weekly' : 
                           ageInDays <= 90 ? 'monthly' : 
                           'yearly',
            priority: priority,
        } as MetadataRoute.Sitemap[number];
    });

    // Category pages
    const categoryPages = [
        'mindfulness',
        'productivity',
        'personal-growth',
        'feature-updates',
        'tutorials'
    ].map(category => ({
        url: `${baseUrl}/blog/category/${category}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...blogRoutes, ...categoryPages];
} 