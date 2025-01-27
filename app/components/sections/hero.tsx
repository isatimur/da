import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                        <span className="inline-flex items-center space-x-2 rounded-full bg-indigo-600/10 px-4 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                            🎉 Limited Time Free Access
                        </span>
                    </div>
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Transform Your Day with Daily Affirmations
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Experience premium features for free during our early access period. Start your journey to mindfulness and positivity today.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <Button asChild variant="default" size="lg">
                            <Link href="/install">Install Now</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="#features">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
} 