'use client'

import { Header } from '../../../components/Header';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { SocialShare } from '../../../components/SocialShare';
import { BlogJsonLd } from '../../../components/BlogJsonLd';
import Image from 'next/image';

export default function BlogPost() {
    const url = 'https://daily-affirmation.today/blog/posts/affirmations-for-students';
    const title = 'Affirmations for Students: Enhancing Focus and Learning';
    const description = 'Discover powerful affirmations designed for students to enhance focus, improve learning, boost academic confidence, and manage exam stress. Learn student-specific affirmation practices.';
    const date = '2025-07-24';
    const category = 'Guides';
    const image = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop';

    return (
        <>
            <BlogJsonLd
                url={url}
                title={title}
                description={description}
                date={date}
                image={image}
                category={category}
            />
            <Header />
            <main className="min-h-screen bg-neutral-950 text-neutral-50 pt-24">
                <article className="container mx-auto px-4 max-w-4xl">
                    <header className="mb-8">
                        <time dateTime={date} className="text-sm text-neutral-400 mb-2">
                            July 24, 2025
                        </time>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 mb-4">
                            {category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            Affirmations for Students: Enhancing Focus and Learning
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Boost your academic performance and confidence. Learn how targeted affirmations help students focus, manage stress, and achieve their learning goals.
                        </p>
                        <SocialShare url={url} title={title} description={description} />
                    </header>

                    <figure className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={image}
                            alt="Student studying with books and laptop, representing academic success and learning"
                            fill
                            className="object-cover"
                            priority
                        />
                    </figure>

                    <div className="prose prose-invert max-w-none">
                        <section>
                            <h2>Why Students Need Affirmations</h2>
                            <p>
                                Student life brings academic pressure, deadlines, exams, and the challenge of balancing multiple responsibilities. Affirmations help students build confidence, reduce test anxiety, improve focus, and maintain motivation during challenging academic periods.
                            </p>
                            <p>
                                When students practice affirmations, they reprogram limiting beliefs about their abilities, build resilience, and approach learning with a growth mindset.
                            </p>
                        </section>

                        <section>
                            <h2>Student Affirmations by Need</h2>
                            
                            <h3>Academic Confidence</h3>
                            <ul>
                                <li>"I am capable of learning and mastering new material."</li>
                                <li>"I am intelligent and capable of academic success."</li>
                                <li>"I trust my ability to understand and apply knowledge."</li>
                                <li>"I am a good student who works hard and learns effectively."</li>
                                <li>"I deserve academic success and achievement."</li>
                            </ul>

                            <h3>Focus and Concentration</h3>
                            <ul>
                                <li>"I focus easily and maintain attention during study sessions."</li>
                                <li>"I absorb information quickly and retain it effectively."</li>
                                <li>"My mind is sharp and ready to learn."</li>
                                <li>"I stay present and engaged during classes and study time."</li>
                                <li>"I eliminate distractions and concentrate fully."</li>
                            </ul>

                            <h3>Exam Performance</h3>
                            <ul>
                                <li>"I am prepared and confident for this exam."</li>
                                <li>"I recall information easily during tests."</li>
                                <li>"I remain calm and focused during exams."</li>
                                <li>"I trust my knowledge and perform at my best."</li>
                                <li>"I handle exam pressure with confidence and clarity."</li>
                            </ul>

                            <h3>Stress Management</h3>
                            <ul>
                                <li>"I manage academic stress effectively and stay balanced."</li>
                                <li>"I handle deadlines with organization and calm."</li>
                                <li>"I take breaks and maintain my well-being."</li>
                                <li>"I ask for help when needed without shame."</li>
                                <li>"I balance studying with rest and self-care."</li>
                            </ul>

                            <h3>Learning and Growth</h3>
                            <ul>
                                <li>"I love learning and growing my knowledge."</li>
                                <li>"Every challenge helps me learn and improve."</li>
                                <li>"I embrace mistakes as learning opportunities."</li>
                                <li>"I am constantly expanding my understanding."</li>
                                <li>"I develop new skills and abilities every day."</li>
                            </ul>
                        </section>

                        <section>
                            <h2>When to Use Student Affirmations</h2>
                            
                            <h3>Before Study Sessions</h3>
                            <p>Set your mindset:</p>
                            <ul>
                                <li>"I am focused and ready to learn."</li>
                                <li>"I absorb information easily and effectively."</li>
                                <li>"I enjoy this learning process."</li>
                            </ul>

                            <h3>Before Exams</h3>
                            <p>Build confidence:</p>
                            <ul>
                                <li>"I am prepared and will perform at my best."</li>
                                <li>"I recall information easily during tests."</li>
                                <li>"I remain calm and focused."</li>
                            </ul>

                            <h3>During Stressful Periods</h3>
                            <p>Maintain balance:</p>
                            <ul>
                                <li>"I handle pressure with organization and calm."</li>
                                <li>"I take care of myself while managing deadlines."</li>
                                <li>"I am capable of handling this workload."</li>
                            </ul>

                            <h3>When Feeling Overwhelmed</h3>
                            <p>Refocus and regroup:</p>
                            <ul>
                                <li>"I break tasks into manageable steps."</li>
                                <li>"I ask for help when needed."</li>
                                <li>"I am capable of completing my work."</li>
                            </ul>
                        </section>

                        <section>
                            <h2>Subject-Specific Affirmations</h2>
                            
                            <h3>Math and Sciences</h3>
                            <ul>
                                <li>"I understand mathematical concepts and solve problems easily."</li>
                                <li>"I grasp scientific principles and apply them effectively."</li>
                                <li>"I enjoy the logic and patterns in math and science."</li>
                            </ul>

                            <h3>Writing and Language Arts</h3>
                            <ul>
                                <li>"I express my ideas clearly and powerfully in writing."</li>
                                <li>"Words flow through me easily and beautifully."</li>
                                <li>"I communicate my thoughts effectively."</li>
                            </ul>

                            <h3>History and Social Studies</h3>
                            <ul>
                                <li>"I remember historical facts and understand their significance."</li>
                                <li>"I connect concepts and see patterns in social studies."</li>
                                <li>"I engage deeply with historical and social content."</li>
                            </ul>
                        </section>

                        <section>
                            <h2>Building Your Student Affirmation Practice</h2>
                            <ol>
                                <li><strong>Identify your challenges:</strong> Focus, confidence, test anxiety, stress?</li>
                                <li><strong>Choose 3-5 affirmations:</strong> Address your biggest academic challenges</li>
                                <li><strong>Practice before study sessions:</strong> Set your mindset for learning</li>
                                <li><strong>Use before exams:</strong> Build confidence and calm</li>
                                <li><strong>Review regularly:</strong> Update affirmations as challenges evolve</li>
                            </ol>
                        </section>

                        <section>
                            <h2>Combining Affirmations with Study Techniques</h2>
                            <p>
                                Pair affirmations with effective study habits:
                            </p>
                            <ul>
                                <li>Repeat affirmations before starting study sessions</li>
                                <li>Use affirmations during breaks to refocus</li>
                                <li>Practice affirmations while reviewing material</li>
                                <li>Combine with visualization: see yourself succeeding</li>
                            </ul>
                        </section>

                        <section>
                            <h2>Additional Resources</h2>
                            <p>
                                Enhance your academic success with <a href="/blog/posts/building-self-confidence-affirmations" className="text-yellow-500 hover:text-yellow-400">confidence-building affirmations</a>, learn about <a href="/blog/posts/morning-affirmations-transform-your-day" className="text-yellow-500 hover:text-yellow-400">morning routines</a> for students, or explore <a href="/blog/posts/affirmations-for-anxiety" className="text-yellow-500 hover:text-yellow-400">affirmations for managing test anxiety</a>.
                            </p>
                        </section>
                    </div>

                    <footer className="mt-16">
                        <div className="border-t border-neutral-800 pt-16">
                            <NewsletterSignup />
                        </div>

                        <div className="mt-8 pt-8 border-t border-neutral-800">
                            <SocialShare url={url} title={title} description={description} />
                        </div>
                    </footer>
                </article>
            </main>
        </>
    );
}

