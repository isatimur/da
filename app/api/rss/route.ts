import { NextResponse } from 'next/server';
import { blogPosts } from '../../blog/posts/data';

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

export async function GET() {
    const baseUrl = 'https://daily-affirmation.today';
    
    const rssItems = blogPosts.map(post => {
        const title = escapeXml(post.title);
        const description = escapeXml(post.excerpt);
        const link = `${baseUrl}/blog/posts/${post.slug}`;
        const pubDate = new Date(post.date).toUTCString();
        const category = escapeXml(post.category);

        return `
        <item>
            <title>${title}</title>
            <description>${description}</description>
            <link>${link}</link>
            <guid>${link}</guid>
            <pubDate>${pubDate}</pubDate>
            <category>${category}</category>
        </item>`;
    }).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Daily Affirmations Blog</title>
        <description>Latest updates and insights from Daily Affirmations</description>
        <link>${baseUrl}/blog</link>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
        ${rssItems}
    </channel>
</rss>`;

    return new NextResponse(rss, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
    });
} 