"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import blu_rob from "../public/assets/rob_blu.png";
import org_rob from "../public/assets/rob_org.png";
import hero_sm from "../public/assets/hero_sm.png";
import { cn } from "@/lib/utils";
import Title from "@/components/Title";

const HeroSection = () => {
    // Animation Variants - Purely for timing, doesn't change CSS layout
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div id={'home'} className='flex flex-col relative overflow-hidden min-h-screen bg-black'>
            {/* Background Animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className={cn(
                    "absolute inset-0 z-0",
                    "[background-size:30px_30px]",
                    "[background-image:linear-gradient(to_right,rgba(164,126,27,0.28)_1px,transparent_1px),linear-gradient(to_bottom,rgba(164,126,27,0.45)_1px,transparent_1px)]",
                )}
            />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

            <Navbar />

            {/* Main Content Wrapper */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-4 sm:px-8 md:px-16 lg:px-80 text-center z-10"
            >
                {/* Logo with Hover Scale */}
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
                    <Image 
                        className={'mx-auto mb-2 sm:mb-0 h-[44px] w-[98px] sm:h-[56px] sm:w-[119px] md:h-[64px] md:w-[136px] lg:h-[72px] lg:w-[153px]'} 
                        src={hero_sm} 
                        alt={"acm"} 
                    />
                </motion.div>

                {/* Text Content with Fade-In */}
                <motion.div variants={itemVariants} className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[72px] font-[800] leading-[1.1] px-4 sm:px-8 lg:px-0">
                    <Title title={"We are"} /> <span className="text-[#DBB42C]">association</span>
                    <br /> of computing machinery
                </motion.div>

                <motion.p variants={itemVariants} className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-[400] pt-4 sm:pt-6 md:pt-7 lg:pt-8 leading-[1.5] px-4 sm:px-8 md:px-12 lg:px-0">
                     Advancing computing as a science and profession. Join the premier global community of computing professionals and students.
                </motion.p>

                {/* Button with Scale and Brightness effect */}
                                <motion.div
                    variants={itemVariants}
                                        initial={{ opacity: 0, y: 6 }}

                                        animate={{ opacity: 1, y: 0 }}

                                        transition={{ duration: 0.6 }}

                                        whileHover={{ scale: 1.03 }}

                                        whileTap={{ scale: 0.98 }}

                                        className="relative w-auto mx-auto mt-6 sm:mt-8 lg:mt-10 px-0"
                                    >

                                        {/* outer crate: restored subtle black background + gold borders (compact) */}
                                        <div className="relative inline-block mx-auto bg-black border-l-4 border-b-4 border-[#EDC531] overflow-hidden p-1 rounded-md">

                                            {/* reduced glow layer to keep atmosphere without clutter */}
                                            <motion.div
                                                className="absolute inset-0 bg-[#EDC531]/12 blur-sm pointer-events-none"
                                                animate={{ opacity: [0.12, 0.28, 0.12] }}
                                                transition={{ duration: 2.4, repeat: Infinity }}
                                            />

                                            {/* subtle shine sweep */}
                                            <motion.div
                                                className="absolute top-0 left-[-90%] w-[140%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                                                animate={{ left: ["-90%", "110%"] }}
                                                transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2 }}
                                            />

                                            <div className="relative inline-flex justify-center bg-[#EDC531] px-4 py-2 rounded-sm">
                                                {/* Compact live CTA — narrower so it doesn't span the whole hero */}
                                                <Link href="/hackathon" className="live-cta-btn inline-flex items-center">
                                                    <span className="live-badge">
                                                        <span className="dot" />
                                                        LIVE
                                                    </span>
                                                    <span className="ml-3 text-sm font-semibold">Breaking Enigma&nbsp;↗</span>
                                                </Link>

                                                <style jsx>{`
                                                    .live-badge {
                                                        display: inline-flex;
                                                        align-items: center;
                                                        gap: 6px;
                                                        background: #c0001a;
                                                        color: #fff;
                                                        font-size: 11px;
                                                        font-weight: 700;
                                                        letter-spacing: 0.12em;
                                                        padding: 4px 8px;
                                                        border-radius: 4px;
                                                        vertical-align: middle;
                                                    }

                                                    .live-badge .dot {
                                                        width: 7px;
                                                        height: 7px;
                                                        border-radius: 50%;
                                                        background: #fff;
                                                        animation: blink 1s step-start infinite;
                                                        display: inline-block;
                                                    }

                                                    @keyframes blink {
                                                        0%, 100% { opacity: 1; }
                                                        50%       { opacity: 0; }
                                                    }

                                                    .live-cta-btn {
                                                        background: #f5c430;
                                                        color: #111;
                                                        font-size: 14px;
                                                        font-weight: 700;
                                                        padding: 10px 18px;
                                                        border-radius: 8px;
                                                        cursor: pointer;
                                                        border: none;
                                                        letter-spacing: 0.01em;
                                                        text-decoration: none;
                                                        gap: 12px;
                                                        box-shadow: 0 2px 8px rgba(0,0,0,0.12);
                                                    }

                                                    .live-cta-btn:hover {
                                                        background: #ffd84d;
                                                    }

                                                    /* Keep the styles scoped but allow tailwind layout to remain */
                                                                            `}</style>
                                                                            </div>
                                                                    </div>

                </motion.div>
            </motion.div>

            {/* Bottom Section - Keeping your flex-col lg:flex-row gap layout exactly as is */}
            <div className={'flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-20 lg:gap-30 z-10 px-4 sm:px-8 md:px-12 lg:px-0'}>
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className={'flex flex-col pt-8 sm:pt-12 md:pt-20 lg:pt-40 pl-0 lg:pl-10 items-center lg:items-start'}
                >
                    <p className={'text-[24px] sm:text-[28px] md:text-[34px] lg:text-[40px] font-[800] text-center lg:text-left'}>
                        Established in <span className="text-[#DBB42C]">2000</span>
                    </p>
                    <p className={'text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] font-[700] text-center lg:text-left'}>
                        Evolving ever since
                    </p>
                </motion.div>

                {/* Floating Robot Images Container */}
                <div className="flex justify-center gap-6 sm:gap-8 md:gap-9 lg:gap-10 pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-0">
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Image className="h-[140px] w-[100px] sm:h-[175px] sm:w-[125px] md:h-[210px] md:w-[150px] lg:h-70 lg:w-50" src={org_rob} alt="org_rob" />
                    </motion.div>
                    
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                        <Image className="h-[140px] w-[90px] sm:h-[175px] sm:w-[112px] md:h-[210px] md:w-[135px] lg:h-70 lg:w-45" src={blu_rob} alt="blu_rob" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;