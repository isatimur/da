import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Affirmations - Transform Your New Tab into Daily Inspiration",
  description: "Enhance your daily browsing with personalized affirmations, beautiful backgrounds, and mindful moments. A Chrome extension for daily inspiration and personal growth.",
  keywords: ["daily affirmations", "chrome extension", "personal growth", "mindfulness", "new tab", "productivity"],
  openGraph: {
    title: "Daily Affirmations - Transform Your New Tab",
    description: "Transform your browsing experience with daily positive affirmations, beautiful backgrounds, and mindful moments.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Affirmations - Transform Your New Tab",
    description: "Transform your browsing experience with daily positive affirmations, beautiful backgrounds, and mindful moments.",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://daily-affirmation.today" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Daily Affirmations",
              "applicationCategory": "BrowserExtension",
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
                "ratingCount": "10"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <GoogleAnalytics gaId="G-GWXZH6581W" />
      </body>
    </html>
  );
}
