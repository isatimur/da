'use client'

import { ArrowRight, Chrome, Star, Cloud, Bell, Palette, Lock, Github, Check, Sparkles, Users } from "lucide-react";
import { BackgroundBeams } from "./components/ui/background-beams";
import { Header } from "./components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NewsletterSignup } from './components/NewsletterSignup';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const testimonials = [
    {
        name: "Sarah M.",
        role: "Mindfulness Coach",
        content: "Daily Affirmations has transformed my morning routine. The focus mode is a game-changer for my clients.",
        avatar: "/testimonials/avatar1.png"
    },
    {
        name: "David L.",
        role: "Software Engineer",
        content: "Clean, beautiful, and actually helps me stay positive throughout the day. Love the cloud sync feature!",
        avatar: "/testimonials/avatar2.png"
    },
    {
        name: "Emily R.",
        role: "Wellness Blogger",
        content: "The perfect blend of aesthetics and functionality. My new tab page is now a source of daily inspiration.",
        avatar: "/testimonials/avatar3.png"
    }
];

const pricingPlans = [
    {
        name: "Basic",
        price: "0",
        features: [
            "Daily curated affirmations",
            "Basic nature backgrounds",
            "Weather & clock widgets",
            "Focus mode (basic)",
            "Local storage"
        ],
        cta: "Install Now",
        popular: false
    },
    {
        name: "Pro (Early Access)",
        price: "0",
        features: [
            "Everything in Basic, plus:",
            "Custom affirmations library",
            "Premium background themes",
            "Cloud sync & backup",
            "Smart daily reminders",
            "Advanced focus mode",
            "Priority support",
            "Early access to new features"
        ],
        cta: "Get Pro Access",
        popular: true,
        badge: "Limited Time Free"
    }
];

const features = [
    {
        title: 'Focus Mode',
        description: 'Transform your new tab into a distraction-free sanctuary with our Focus Mode. Perfect for mindful moments and deep work sessions.',
        image: '/features/focus-mode.png'
    },
    {
        title: 'Custom Affirmations',
        description: 'Create and save your own personal affirmations. Make your daily inspiration truly yours with our customization features.',
        image: '/features/custom-affirmations.png'
    },
    {
        title: 'Cloud Sync',
        description: 'Never lose your favorite affirmations. Sync across devices and keep your mindful moments with you wherever you go.',
        image: '/features/cloud-sync.png'
    }
];

export default function DailyAffirmationsPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [currentFeature, setCurrentFeature] = useState(0);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage('Thanks for subscribing!');
                setEmail('');
            } else {
                throw new Error(data.error || 'Failed to subscribe');
            }
        } catch (error) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : 'Failed to subscribe');
        }
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 relative">
                {/* Hero Section */}
                <section id="hero" className="relative h-[40rem] flex flex-col items-center justify-center overflow-hidden">
                    <BackgroundBeams className="opacity-40" />
                    <div className="p-4 relative z-10 w-full container mx-auto text-center">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-sm mb-4">
                            <span className="text-yellow-500 mr-2">Project #1</span>
                            <span className="text-neutral-400">Chrome Extension</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gradient">
                            Transform Your New Tab into a
                            <br />
                            Daily Source of Inspiration
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto mb-8">
                            Start each day with purpose. Beautiful backgrounds, personalized affirmations, and mindful moments — all in your browser.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <a
                                href="https://chrome.google.com/webstore"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-brand text-neutral-950 font-semibold hover:opacity-90 transition-opacity"
                            >
                                <Chrome className="w-5 h-5 mr-2" />
                                Add to Chrome - It's Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </a>
                            <div className="text-sm text-neutral-400">
                                ★★★★★ <span className="ml-1">100+ Users</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Showcase */}
                <section id="features" className="py-20 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                                Everything You Need for Daily Mindfulness
                            </h2>
                            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                                Carefully crafted features to enhance your daily affirmation practice and keep you motivated.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    icon: Star,
                                    title: "Daily Affirmations",
                                    description: "Start each day with powerful, personalized affirmations that inspire and motivate"
                                },
                                {
                                    icon: Cloud,
                                    title: "Weather Integration",
                                    description: "Stay informed with a beautiful, minimalist weather display"
                                },
                                {
                                    icon: Bell,
                                    title: "Smart Reminders",
                                    description: "Set custom reminder times and days to maintain your practice"
                                },
                                {
                                    icon: Palette,
                                    title: "Theme Customization",
                                    description: "Choose from minimal or nature themes, customize fonts and card styles"
                                },
                                {
                                    icon: Lock,
                                    title: "Focus Mode",
                                    description: "Remove distractions and immerse yourself in your daily affirmation practice"
                                },
                                {
                                    icon: Sparkles,
                                    title: "Premium Backgrounds",
                                    description: "Access a curated collection of stunning backgrounds that change daily"
                                }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900/80 transition-colors group"
                                >
                                    <feature.icon className="w-12 h-12 mb-4 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-neutral-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 px-4 bg-neutral-900/50">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                                Loved by Mindful People
                            </h2>
                            <p className="text-xl text-neutral-400">
                                Join thousands who have transformed their browsing experience
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="relative h-[300px]">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-1000 ${
                                            index === activeTestimonial ? "opacity-100" : "opacity-0"
                                        }`}
                                    >
                                        <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
                                            <div className="flex items-center gap-4 mb-6">
                                                <Image
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    width={48}
                                                    height={48}
                                                    className="rounded-full"
                                                />
                                                <div>
                                                    <h3 className="font-semibold">{testimonial.name}</h3>
                                                    <p className="text-sm text-neutral-400">{testimonial.role}</p>
                                                </div>
                                            </div>
                                            <p className="text-lg text-neutral-300">{testimonial.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-2 mt-8">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTestimonial(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            index === activeTestimonial
                                                ? "bg-yellow-500 w-8"
                                                : "bg-neutral-700 hover:bg-neutral-600"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section id="pricing" className="py-20 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                                Simple, Transparent Pricing
                            </h2>
                            <p className="text-xl text-neutral-400">
                                Start for free, upgrade when you need more
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {pricingPlans.map((plan) => (
                                <div
                                    key={plan.name}
                                    className={`relative p-8 rounded-2xl backdrop-blur-sm flex flex-col ${
                                        plan.popular
                                            ? "bg-white/[0.08] border border-white/[0.12]"
                                            : "bg-white/[0.04] border border-white/[0.08]"
                                    }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-gradient-to-r from-[#3B82F6] via-[#10B981] to-[#EAB308] text-white text-sm font-medium px-4 py-1 rounded-full">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-center mb-8">
                                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                        <div className="mb-2">
                                            <span className="text-4xl font-bold">${plan.price}</span>
                                            {plan.interval && (
                                                <span className="text-neutral-400 ml-1">/{plan.interval}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        {plan.features.map((feature) => (
                                            <div key={feature} className="flex items-start gap-3">
                                                <div className="rounded-full bg-white/10 p-1 mt-0.5 shrink-0">
                                                    <Check className="w-3 h-3 text-[#10B981]" />
                                                </div>
                                                <span className="text-neutral-300 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8">
                                        <Button
                                            variant={plan.popular ? "primary" : "default"}
                                            size="lg"
                                            className="w-full justify-center font-medium"
                                            asChild
                                        >
                                            <Link href={plan.popular ? "/checkout" : "https://chrome.google.com/webstore"}>
                                                {plan.cta}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Carousel */}
                <section className="w-full py-20 bg-black">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="relative overflow-hidden rounded-2xl bg-gray-900 p-8">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="space-y-6">
                                    <h3 className="text-3xl font-bold">
                                        {features[currentFeature].title}
                                    </h3>
                                    <p className="text-gray-300 text-lg">
                                        {features[currentFeature].description}
                                    </p>
                                    <div className="flex space-x-4">
                                        {features.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentFeature(index)}
                                                className={`w-3 h-3 rounded-full transition-colors ${
                                                    index === currentFeature ? 'bg-blue-500' : 'bg-gray-600'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="relative h-[400px]">
                                    <Image
                                        src={features[currentFeature].image}
                                        alt={features[currentFeature].title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black">
                    <div className="max-w-2xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
                        <p className="text-gray-300 mb-8">
                            Get the latest mindfulness tips and feature updates.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                                required
                            />
                            <Button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-gradient-brand hover:opacity-90"
                            >
                                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                            </Button>
                        </form>
                        {message && (
                            <p className={`mt-4 ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </section>

                {/* Stats */}
                <section className="py-20 px-4 bg-neutral-900/50">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { number: "100+", label: "Active Users" },
                                { number: "1000+", label: "Affirmations Delivered" },
                                { number: "4.8", label: "Average Rating" },
                                { number: "24/7", label: "Support" }
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
                                        {stat.number}
                                    </div>
                                    <div className="text-neutral-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
                            Start Your Journey Today
                        </h2>
                        <p className="text-xl text-neutral-200 max-w-2xl mx-auto mb-12">
                            Join thousands of users who have transformed their daily browsing experience into moments of inspiration.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <a
                                href="https://chrome.google.com/webstore"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-brand text-neutral-950 font-semibold hover:opacity-90 transition-opacity"
                            >
                                <Chrome className="w-6 h-6 mr-2" />
                                Install Extension
                                <ArrowRight className="w-6 h-6 ml-2" />
                            </a>
                            <a
                                href="https://github.com/25microsaas/daily-affirmations"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-4 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition-colors"
                            >
                                <Github className="w-6 h-6 mr-2" />
                                View Source
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}