"use client";
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";

// Assets
import unstop from '../public/assets/sponsors/unstop.png';
import osen from '../public/assets/sponsors/osen.png';
import budhani from '../public/assets/sponsors/budhani.png';
import pana from '../public/assets/sponsors/pana.png';
import buddy from '../public/assets/sponsors/buddy.png';

const Sponsors = () => {
    // Using a Cyan/Electric Blue theme: #00F0FF
    const themeColor = "#00F0FF";

    const sponsorsList = [
        { name: "Unstop", logo: unstop, link: "https://unstop.com" },
        { name: "Osen", logo: osen, link: "#" },
        { name: "Budhani Bros", logo: budhani, link: "#" },
        { name: "Pana", logo: pana, link: "#" },
        { name: "Buddy", logo: buddy, link: "#" },
    ];

    return (
        <div className="flex flex-col px-5 sm:px-10 lg:px-[84px] gap-0 lg:gap-[84px] border-t border-b border-dashed border-gray-500 bg-black/5">
            <div className="text-center flex flex-col gap-5 py-14 lg:py-[84px] lg:border-l lg:border-r border-dashed border-gray-500">

                <p className="ml-5 text-[16px] sm:text-[20px] text-[#6C6C6C]">
                    [SUPPORTED BY THE BEST]
                </p>

                <p className="hack pl-5 pb-5 border-t border-b border-dashed border-gray-500
                    text-[36px] sm:text-[48px] lg:text-[64px] font-400 text-[#00F0FF]">
                    sponsors & partners
                </p>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-10 px-4"
                >
                    {sponsorsList.map((sponsor, index) => (
                        <motion.a
                            key={index}
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover="hover"
                            className="group relative flex flex-col items-center justify-center h-48 border border-dashed border-gray-500 rounded-lg overflow-hidden bg-black/40 hover:border-[#00F0FF] transition-colors duration-300"
                        >
                            {/* THEMATIC: Tech Grid Background on Hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-500"
                                 style={{
                                     backgroundImage: `radial-gradient(${themeColor} 0.5px, transparent 0.5px)`,
                                     backgroundSize: '12px 12px'
                                 }}>
                            </div>

                            {/* SAFE SCANLINE (Framer Motion instead of CSS animation) */}
                            <motion.div
                                variants={{
                                    hover: {
                                        top: ["0%", "100%"],
                                        transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
                                    }
                                }}
                                className="absolute left-0 w-full h-[1px] bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] z-20 pointer-events-none opacity-0 group-hover:opacity-100"
                            />

                            {/* LOGO CONTAINER - Increased size (p-4 instead of p-6) */}
                            <div className="relative w-full h-full p-4 flex items-center justify-center z-10">
                                <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    width={200} // Increased width
                                    height={100}
                                    className="max-w-[90%] max-h-[75%] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* DECRYPTION LABEL */}
                            <div className="absolute bottom-2 left-2 text-[7px] text-gray-600 font-mono group-hover:text-[#00F0FF] transition-colors">
                                STATUS: VERIFIED_{index}
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Sponsors;