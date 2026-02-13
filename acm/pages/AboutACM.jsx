"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Added for transitions
import rob from "../public/assets/rob_blu.png";
import jelly from "@/public/assets/jelly.png";
import {cn} from "@/lib/utils";
import Title from "@/components/Title";

const AboutACM = () => {
    return (
        <div className="relative w-full min-h-screen flex flex-col lg:flex-row items-center py-8 sm:py-12 md:py-16 lg:py-0 px-4 sm:px-6 md:px-8 lg:px-0 overflow-hidden">

            <div
                className={cn(
                    "absolute inset-0 z-0",
                    "[background-size:50px_50px]",
                    "[background-image:linear-gradient(to_right,rgba(164,126,27,0.28)_1px,transparent_1px),linear-gradient(to_bottom,rgba(164,126,27,0.45)_1px,transparent_1px)]",
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

            {/* Custom radial gradient overlay */}
            <div 
                className="pointer-events-none absolute z-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[1044px] lg:h-[1057px] top-[200px] left-[-150px] sm:top-[300px] sm:left-[-250px] md:top-[400px] md:right-[-350px] lg:top-[-10px] lg:left-[-600px]"
                style={{
                    opacity: 1,
                    background: 'radial-gradient(37.26% 37.26% at 50% 50%, rgba(255, 169, 41, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%)'
                }}
            />

            {/* Left ACM - Kept exactly as your original code */}
            <div className="hidden md:block absolute left-4 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 z-0">
                <p
                    className="new-letter text-[150px] md:text-[250px] lg:text-[350px] text-[#A47E1B] font-[600] leading-none opacity-30 md:opacity-50 lg:opacity-100"
                    style={{
                        transform: "rotate(90deg) translateX(-50%)",
                        transformOrigin: "left center",
                    }}
                >
                    ACM
                </p>
            </div>

            {/* Center Content - Added fade-up entry */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 px-4 sm:px-6 md:px-8 lg:pl-50 lg:px-0 ml-0 md:ml-[100px] lg:ml-[200px] z-1 text-center lg:text-right"
            >
                <div className="flex justify-center lg:justify-end mb-4 sm:mb-6">
                    <Title className={'text-center lg:text-right lg:mr-[80px]'} title={"About ACM"} />
                </div>

                <p className="text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[400] mt-4 sm:mt-6 leading-[1.5] max-w-full lg:max-w-[800px] mx-auto lg:mx-0">
                    The Association for Computing Machinery (ACM) is the world's largest educational and scientific computing society. Since its inception in 1947, ACM has united educators, researchers, and professionals to advance computing as a science and a profession.
                    <br /><br />
                    It promotes the highest standards of technical excellence, fosters lifelong learning, and supports career development through a global network of conferences, publications, and professional communities. With a strong commitment to innovation and leadership, ACM continues to shape the future of computing worldwide.
                </p>
            </motion.div>

            {/* Right Robot - Added entry slide and floating motion */}
            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-8 lg:mt-0 lg:mr-[-70px] flex items-center justify-center lg:justify-end z-10"
            >
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image
                        src={rob}
                        alt="acm"
                        className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] w-auto rotate-[-30deg]"
                        priority
                    />
                </motion.div>
            </motion.div>

        </div>
    );
};

export default AboutACM;