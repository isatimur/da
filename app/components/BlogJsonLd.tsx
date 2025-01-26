interface BlogJsonLdProps {
    url: string;
    title: string;
    description: string;
    date: string;
    image: string;
    category: string;
}

export function BlogJsonLd({ url, title, description, date, image, category }: BlogJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        image: `https://daily-affirmation.today${image}`,
        datePublished: date,
        dateModified: date,
        author: {
            '@type': 'Organization',
            name: 'Daily Affirmations',
            url: 'https://daily-affirmation.today'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Daily Affirmations',
            logo: {
                '@type': 'ImageObject',
                url: 'https://daily-affirmation.today/logo.png'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url
        },
        keywords: [
            'mindfulness',
            'daily affirmations',
            'personal growth',
            'mental well-being',
            category.toLowerCase(),
            'self-improvement',
            'positive thinking'
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
} 