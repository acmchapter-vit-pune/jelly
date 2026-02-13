"use client";
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import box from '../public/assets/box.png';
import { cn } from "@/lib/utils";
import Title from "@/components/Title";

const Card = ({ domain, index }) => {
    return (
        <motion.div 
            // Staggered entry from bottom
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            // Hover effect: slight lift and scale
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative inline-block cursor-pointer group"
        >
            <Image
                src={box}
                alt="acm"
                className="
                    w-[280px] h-[240px]
                    sm:w-[340px] sm:h-[300px]
                    lg:w-[450px] lg:h-[400px]
                    drop-shadow-lg
                "
            />

            <p className="
                absolute inset-0 flex items-center justify-center pt-30
                text-[20px] sm:text-[26px] lg:text-[38px] sm:pt-50
                font-[700] text-black transition-transform duration-300 group-hover:scale-110
            ">
                {domain}
            </p>

            {/* Gradient below each card - pulse effect on hover */}
            <motion.div 
                className="pointer-events-none absolute z-0 
                    w-[360px] h-[56px]
                    sm:w-[440px] sm:h-[68px]
                    md:w-[510px] md:h-[79px]
                    lg:w-[580px] lg:h-[90px]
                    top-[200px] left-[-40px]
                    sm:top-[310px] sm:left-[-50px]
                    md:top-[330px] md:left-[-58px]
                    lg:top-[340px] lg:left-[-65px]"
                style={{
                    opacity: 1,
                    background: 'radial-gradient(37.26% 37.26% at 50% 50%, rgba(255, 169, 41, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%)'
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
        </motion.div>
    );
};


const Domains = () => {
    const domainsList = ["TECH", "RESEARCH", "DESIGN", "CODING", "AIML", "EXTRA"];

    return (
        <div
            id="domains"
            className="relative w-full flex flex-col p-6 sm:p-10 mt-10 items-center overflow-hidden"
        >

            <div
                className={cn(
                    "absolute inset-0 z-0",
                    "[background-size:50px_50px]",
                    "[background-image:linear-gradient(to_right,rgba(164,126,27,0.28)_1px,transparent_1px),linear-gradient(to_bottom,rgba(164,126,27,0.45)_1px,transparent_1px)]",
                )}
            />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

            <Title title={'Domains'} />
            
            <div className="
                relative z-10 w-full
                grid grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-x-8 gap-y-12
                justify-items-center
                mt-8 sm:mt-12
            ">
                {domainsList.map((domain, index) => (
                    <Card key={domain} domain={domain} index={index} />
                ))}
            </div>

        </div>
    );
};

export default Domains;