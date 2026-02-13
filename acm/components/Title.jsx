"use client";
import React from 'react';
import Image from "next/image";
import jelly from "@/public/assets/jelly.png";
import { motion } from "framer-motion";

const Title = ({title, className = ''}) => {
    return (
        <div className={`z-10 relative inline-block ${className}`}>
            {/* Jelly Icon with Float & Wobble */}
            <motion.div 
                className="absolute left-[-40px] sm:left-[-55px] md:left-[-65px] lg:left-[-80px] top-[-30px] sm:top-[-40px] pointer-events-none z-[100]"
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    y: [0, -10, 0] // Continuous floating
                }}
                transition={{ 
                    opacity: { duration: 0.5 },
                    scale: { type: "spring", stiffness: 200, damping: 12 },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ 
                    scale: 1.2,
                    rotate: [0, 15, -15, 0],
                    transition: { duration: 0.4 }
                }}
            >
                <Image
                    src={jelly}
                    alt="jelly"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 drop-shadow-2xl"
                />
            </motion.div>

            {/* Text with Gradient/Pulse effect */}
            <motion.div 
                className={'text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-[800] z-10 relative'}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <span className="bg-clip-text transition-all duration-300">
                    {title}
                </span>
            </motion.div>
        </div>
    );
};

export default Title;