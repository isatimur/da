import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Affirmations - Transform Your New Tab with Mindful Inspiration",
  description: "Enhance your daily browsing with personalized affirmations, beautiful backgrounds, and mindful moments. A Chrome extension for daily inspiration, personal growth, and mental well-being.",
  keywords: ["daily affirmations", "chrome extension", "personal growth", "mindfulness", "new tab", "productivity", "mental health", "positive thinking", "self improvement", "meditation", "daily inspiration"],
  openGraph: {
    title: "Daily Affirmations - Transform Your New Tab with Mindful Inspiration",
    description: "Transform your browsing experience with daily positive affirmations, beautiful backgrounds, and mindful moments for personal growth.",
    images: ["/og-image.png"],
    type: "website",
    url: "https://daily-affirmation.today",
    siteName: "Daily Affirmations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Affirmations - Transform Your New Tab with Mindful Inspiration",
    description: "Transform your browsing experience with daily positive affirmations, beautiful backgrounds, and mindful moments for personal growth.",
    images: ["/og-image.png"],
    site: "@DailyAffirm",
    creator: "@DailyAffirm"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://daily-affirmation.today"
  },
  authors: [{ name: "Daily Affirmations Team" }],
  generator: "Next.js",
  applicationName: "Daily Affirmations",
  referrer: "origin-when-cross-origin",
  creator: "Daily Affirmations Team",
  publisher: "Daily Affirmations",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://daily-affirmation.today" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Daily Affirmations",
                "applicationCategory": ["BrowserExtension", "LifestyleApplication"],
                "operatingSystem": "Chrome",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "Transform your new tab into a daily source of inspiration with beautiful backgrounds and personalized affirmations.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "ratingCount": "100"
                },
                "url": "https://daily-affirmation.today",
                "author": {
                  "@type": "Organization",
                  "name": "Daily Affirmations Team",
                  "url": "https://daily-affirmation.today"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Daily Affirmations",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://daily-affirmation.today/logo.png"
                  }
                },
                "downloadUrl": "https://chromewebstore.google.com/detail/daily-affirmations/nhhicimcipdgjckacooendaikhjhenle",
                "featureList": [
                  "Daily curated affirmations",
                  "Beautiful backgrounds",
                  "Focus mode",
                  "Custom affirmations library",
                  "Cloud sync",
                  "Smart reminders"
                ],
                "screenshot": "https://daily-affirmation.today/screenshot-1.png"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": "https://daily-affirmation.today",
                "name": "Daily Affirmations",
                "description": "Transform your new tab with daily inspiration and mindful moments",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://daily-affirmation.today/blog/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "url": "https://daily-affirmation.today",
                "name": "Daily Affirmations",
                "logo": "https://daily-affirmation.today/logo.png",
                "sameAs": [
                  "https://twitter.com/DailyAffirm",
                  "https://github.com/25microsaas/daily-affirmations",
                  "https://chromewebstore.google.com/detail/daily-affirmations/nhhicimcipdgjckacooendaikhjhenle"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer support",
                  "email": "support@daily-affirmation.today"
                }
              }
            ])
          }}
        />
        <link rel="alternate" type="application/rss+xml" title="Daily Affirmations Blog" href="https://daily-affirmation.today/rss.xml" />
        <meta name="apple-itunes-app" content="app-id=nhhicimcipdgjckacooendaikhjhenle, app-argument=https://daily-affirmation.today" />
      </head>
      <body className={inter.className}>
        {children}
        <GoogleAnalytics gaId="G-GWXZH6581W" />
      </body>
    </html>
  );
}
