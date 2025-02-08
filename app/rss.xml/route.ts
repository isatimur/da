import { blogPosts } from '../blog/posts/data';

export async function GET() {
  const baseUrl = 'https://daily-affirmation.today';

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Daily Affirmations Blog</title>
    <description>Transform your browsing experience with daily positive affirmations, beautiful backgrounds, and mindful moments.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(post => `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${baseUrl}/blog/posts/${post.slug}</link>
          <guid isPermaLink="true">${baseUrl}/blog/posts/${post.slug}</guid>
          <description><![CDATA[${post.excerpt}]]></description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <dc:creator><![CDATA[Daily Affirmations Team]]></dc:creator>
          <category><![CDATA[${post.category}]]></category>
        </item>
      `).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=18000',
    },
  });
} 