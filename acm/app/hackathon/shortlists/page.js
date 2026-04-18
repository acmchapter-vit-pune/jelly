"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Page = () => {
    return (
        <div className="w-full min-h-screen bg-black text-white overflow-x-hidden flex flex-col">
            <Navbar />

            {/* ── Main Content ─────────────────────────────────────────── */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-10 lg:px-[84px]">
                <div className="lg:border-l lg:border-r border-dashed border-gray-700 w-full flex items-center justify-center py-24 sm:py-32">
                    <div className="flex flex-col items-center gap-8 text-center max-w-xl">

                        {/* Icon / Badge */}
                        <motion.div
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'backOut' }}
                            className="w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center text-4xl"
                            style={{ borderColor: '#FF4600' }}
                        >
                            🏆
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="hack text-[32px] sm:text-[46px] leading-tight"
                            style={{ color: '#FF4600' }}
                        >
                            Teams are Shortlisted!
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="text-gray-400 text-[15px] sm:text-[17px] leading-relaxed"
                        >
                            The selected teams have been notified. <br />
                            Get ready — we'll see you on the event day!
                        </motion.p>

                        {/* Decorative divider */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="w-24 h-px bg-dashed border-t border-dashed border-gray-600"
                        />

                        {/* Status tag */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.45 }}
                            className="font-mono text-[11px] uppercase tracking-widest px-4 py-1.5 border border-dashed rounded-sm"
                            style={{ color: '#7DA942', borderColor: '#7DA942' }}
                        >
                            ● Selection Closed
                        </motion.span>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Page;
