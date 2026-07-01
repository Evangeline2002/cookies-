import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';
import sweetImg from '../assets/sweet.png';

export default function About() {
    return (
        <main className="min-h-screen">
            <SEO
                title="About Cookie Heaven | Our Story"
                description="Learn about Cookie Heaven, our passion for baking, and how we craft the finest premium cookies delivered across India."
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-[#FFFDF8] to-white py-20 lg:py-32 px-4 border-b border-[var(--color-primary)]/10 text-center">
                <div className="container mx-auto max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold font-['Poppins'] text-[var(--color-primary)] mb-6"
                    >
                        Baking Memories, <br className="hidden md:block" />One Cookie at a Time.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
                    >
                        Since 2026, Cookie Heaven has been on a mission to redefine the bakery experience by blending traditional recipes with modern, premium ingredients.
                    </motion.p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                        <motion.div
                            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="bg-[#FFFDF8] rounded-[3rem] p-4 md:p-6 flex items-center justify-center relative border border-[var(--color-primary)]/10 shadow-sm overflow-hidden"
                        >
                            <img src={sweetImg} alt="Our sweet cookie creation" className="w-full h-full object-cover rounded-[2rem]" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="section-title text-left mb-4">Our Sweet Journey</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Started in a small home kitchen with just an oven and a grandmothers recipe, Cookie Heaven was born out of a simple desire: to create the perfect chocolate chip cookie. Fast forward to today, and we're delivering our freshly baked happiness across the entire country.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                What sets us apart is our uncompromising commitment to quality. We don't use artificial preservatives. We don't cut corners. We wake up before sunrise to ensure that every box dispatched is as fresh and delicious as if you just pulled it out of the oven yourself.
                            </p>

                            <ul className="space-y-3 pt-4">
                                {['Sourced from premium local farms', '100% natural ingredients', 'Artisan bakers with 10+ years experience'].map((usp, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-800 font-medium">
                                        <FiCheckCircle className="text-[var(--color-secondary)] text-xl" />
                                        {usp}
                                    </li>
                                ))}
                            </ul>

                            {/* Taste the Difference button removed as requested */}
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 px-4 bg-[var(--color-background)]">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="section-title mb-16">Our Core Values</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { t: 'Quality First', d: 'Never compromising on ingredients.', i: '🥇' },
                            { t: 'Baked Fresh', d: 'Oven to door delivery within hours.', i: '🔥' },
                            { t: 'Sustainability', d: 'Eco-friendly, biodegradable packaging.', i: '🌱' },
                            { t: 'Community', d: 'Supporting local farmers & charities.', i: '🤝' },
                        ].map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-primary)]/10 hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="text-5xl mb-4">{v.i}</div>
                                <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-2">{v.t}</h3>
                                <p className="text-gray-600">{v.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
