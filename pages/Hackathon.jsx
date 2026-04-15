"use client";
import React from 'react';
import Navbar from "@/components/Navbar";
import Image from "next/image";
import hackathon_bg from '../public/assets/hackathon-bg.png';
import hackathon_abt from '../public/assets/hackathon-abt.png';
import HackTime from "@/components/HackTime";
import Faqs from "@/components/Faqs";
import Link from "next/link"
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import CountdownTimer from "@/components/CountdownTime";
import Sponsors from "@/components/Sponsors";
import ShortlistButton from "@/components/ShortlistButton";
import PsButton from "@/components/PsButton";

const Hackathon = () => {
    return (
        <div className="w-full overflow-x-hidden">

            {/* HERO SECTION */}
            <div className="relative w-full min-h-screen">

                <Image
                    src={hackathon_bg}
                    alt="hackathon background"
                    fill
                    priority
                    className="object-cover -z-10"
                />

                <div className="relative z-10 text-white">
                    <Navbar />

                    <div className="flex flex-col items-center justify-center text-center mt-40 sm:mt-32 md:mt-28 space-y-6 px-4">

                        <p className="hack text-[64px] sm:text-[80px] md:text-[100px] lg:text-[128px] font-400 leading-none">
                            Breaking Enigma
                        </p>

                        <div className="space-y-2 text-[14px] sm:text-[16px] font-300 text-center">
                            <div>Vishwakarma Institute of Technology Pune – Bibwewadi Campus</div>

                            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3">
                                <div>18 April 2026 - 7:00 am</div>
                                <span className="hidden sm:block">|</span>
                                <div>19 April 2026 - 5:00 pm</div>
                            </div>
                        </div>

                        {/* Timer added here */}
                        <CountdownTimer />

                        {/*<Link*/}
                        {/*    href="/hackathon"*/}
                        {/*    // href="/hackathon/shortlists"*/}
                        {/*    className="disabled:pointer-events-none inline-block px-6 py-2.5 border-2 border-white rounded-lg text-sm sm:text-base font-medium text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg active:scale-95"*/}
                        {/*>*/}
                        {/*    SHORTLISTS*/}
                        {/*</Link>*/}

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            {/* <ShortlistButton /> */}
                            <PsButton />
                        </div>
                    </div>
                </div>
            </div>

            {/* ABOUT CONVERGE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 px-5 sm:px-10 lg:px-[84px] gap-0 lg:gap-[84px] border-t border-b border-dashed border-gray-500">

                <div className="flex flex-col gap-5 py-14 lg:py-[84px] lg:border-l lg:border-r border-dashed border-gray-500">
                    <p className="ml-5 text-[16px] sm:text-[20px] text-[#6C6C6C]">[ABOUT BREAKING ENIGMA]</p>

                    <p className="hack pl-5 pb-5 border-t border-b border-dashed border-gray-500 text-[36px] sm:text-[48px] lg:text-[64px] font-400 text-[#FF4600]">
                        kya hai breaking enigma?
                    </p>

                    <p className="text-[16px] sm:text-[20px] pl-5 pr-5">
                        {`{ The ACM Student Chapter of VIT Pune is organizing a 24-hour hackathon aimed at encouraging innovation, creativity, and technical problem-solving among students. Participants will compete in teams to develop impactful solutions to real-world challenges within a limited time 😉. }`}
                    </p>
                </div>

                <div className="px-0 lg:px-[84px] pb-10 lg:py-[84px] lg:border-r border-dashed border-gray-500 flex justify-center">
                    <Image
                        src={hackathon_abt}
                        alt="hackathon about"
                        className="w-full max-w-[464px] h-auto"
                    />
                </div>
            </div>

            {/* EVENT OUTLINE */}
            <div className="flex flex-col px-5 sm:px-10 lg:px-[84px] gap-0 lg:gap-[84px] border-t border-b border-dashed border-gray-500">
                <div className="text-center flex flex-col gap-5 py-14 lg:py-[84px] lg:border-l lg:border-r border-dashed border-gray-500">

                    <p className="ml-5 text-[16px] sm:text-[20px] text-[#6C6C6C]">[EVENT OUTLINE]</p>

                    <p className="hack pl-5 pb-5 border-t border-b border-dashed border-gray-500 text-[36px] sm:text-[48px] lg:text-[64px] font-400 text-[#3080ED]">
                        event ki rooprekha
                    </p>

                    <HackTime />
                </div>
            </div>

            <Sponsors />

            {/* PRIZES SECTION */}
            <div className="flex flex-col px-5 sm:px-10 lg:px-[84px] gap-0 lg:gap-[84px] border-t border-b border-dashed border-gray-500">

                <div className="text-center flex flex-col gap-5 py-14 lg:py-[84px] lg:border-l lg:border-r border-dashed border-gray-500">

                    <p className="ml-5 text-[16px] sm:text-[20px] text-[#6C6C6C]">
                        [REWARDS AND PRIZES]
                    </p>

                    <p className="hack pl-5 pb-5 border-t border-b border-dashed border-gray-500
        text-[36px] sm:text-[48px] lg:text-[64px] font-400 text-[#F5B301]">
                        rewards & prizes
                    </p>

                    <p className="text-[14px] sm:text-[18px] px-4 max-w-3xl mx-auto">
                        Certificates for all participants, $10 AI credits for shortlisted teams, and exciting cash prizes worth ₹50,000!
                    </p>

                    {/* GRID */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.15 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4"
                    >

                        {[
                            { title: "Winner", amount: "₹20,000" },
                            { title: "First Runner Up", amount: "₹10,000" },
                            { title: "Second Runner Up", amount: "₹5,000" },
                            { title: "Best Agentic AI Solution", amount: "₹5,000" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 40 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ scale: 1.05 }}
                                className="group relative border border-dashed border-gray-500 p-6 rounded-xl
                    transition-all duration-300 overflow-hidden"
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                    opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>

                                <p className="text-[28px] font-500 text-[#FF4600] group-hover:scale-110 transition">
                                    {item.amount}
                                </p>
                                <p className="text-lg mt-2">{item.title}</p>
                                <p className="text-sm text-gray-400 mt-1">+ Certificate</p>
                            </motion.div>
                        ))}

                        {/* Additional Rewards */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ scale: 1.03 }}
                            className="group border border-dashed border-gray-500 p-6 rounded-xl sm:col-span-2 lg:col-span-2 transition-all"
                        >
                            <p className="text-[20px] font-500 text-[#FF4600]">
                                Additional Rewards
                            </p>
                            <p className="text-sm mt-2 text-gray-300">
                                ₹10,000 worth goodies & swags for winners + AI credits for shortlisted teams
                            </p>
                        </motion.div>

                        {/* Participation */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ scale: 1.03 }}
                            className="group border border-dashed border-gray-500 p-6 rounded-xl transition-all"
                        >
                            <p className="text-[20px] font-500 text-[#FF4600]">
                                Participation
                            </p>
                            <p className="text-sm mt-2 text-gray-300">
                                Certificate for all participants
                            </p>
                        </motion.div>

                    </motion.div>
                </div>
            </div>

            {/* FAQ */}
            <div className="flex flex-col px-5 sm:px-10 lg:px-[84px] gap-0 lg:gap-[84px] border-t border-b border-dashed border-gray-500">
                <div className="text-center flex flex-col gap-5 py-14 lg:py-[84px] lg:border-l lg:border-r border-dashed border-gray-500">

                    <p className="ml-5 text-[16px] sm:text-[20px] text-[#6C6C6C]">[FREQUENTLY ASKED QUESTIONS]</p>

                    <p className="hack pl-5 pb-5 border-t border-b border-dashed border-gray-500 text-[36px] sm:text-[48px] lg:text-[64px] font-400 text-[#7DA942]">
                        aksar poochhe jane wale sawal
                    </p>

                    <Faqs />
                </div>
            </div>

            {/* FOOTER */}
            <div className="text-sm sm:text-base font-400 text-center m-5">
                hackathon@2026
            </div>

            <Footer />

        </div>
    );
};

export default Hackathon;