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
                <motion.p variants={itemVariants} className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[72px] font-[800] leading-[1.1] px-4 sm:px-8 lg:px-0">
                    <Title title={"We are"} /> <span className="text-[#DBB42C]">association</span>
                    <br /> of computing machinery
                </motion.p>

                <motion.p variants={itemVariants} className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-[400] pt-4 sm:pt-6 md:pt-7 lg:pt-8 leading-[1.5] px-4 sm:px-8 md:px-12 lg:px-0">
                    Plus Jakarta Sans is a fresh take on geometric sans serif styles,
                    designed by Gumpita Rahayu from Tokotype
                </motion.p>

                {/* Button with Scale and Brightness effect */}
                <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-[70%] sm:w-[65%] md:w-[50%] lg:w-[35%] mt-6 sm:mt-7 md:mt-8 lg:mt-8 mx-auto bg-black border-l-4 border-b-4 border-[#EDC531] p-1 sm:p-1.5 md:p-2 lg:p-2"
                >
                    <div className="bg-[#EDC531]">
                        <Link href={`/hackathon`}>
                        <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-bold px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-2.5 lg:px-3 lg:py-3 cursor-pointer text-center text-black" >
                            Check Out Events ↗
                        </p>
                        </Link>
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