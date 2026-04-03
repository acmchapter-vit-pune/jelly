"use client";
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

const ProblemStatements = () => {
    const problems = [
        { id: "BE-01", title: "Agentic AI for Cybersecurity", description: "Develop an autonomous AI agent capable of identifying and mitigating real-time phishing attempts in corporate networks.", teams: 42, color: "#FF4600" },
        { id: "BE-02", title: "Decentralized Identity Vault", description: "Create a blockchain-based solution for secure, user-owned medical record sharing between hospitals.", teams: 28, color: "#3080ED" },
        { id: "BE-03", title: "Smart City Traffic Optimizer", description: "Use computer vision and IoT data to optimize traffic light timings in high-congestion urban areas.", teams: 35, color: "#F5B301" },
        { id: "BE-04", title: "Predictive Agri-Tech", description: "Build a model that predicts crop yield and pest outbreaks using satellite imagery and historical weather data.", teams: 19, color: "#7DA942" },
        { id: "BE-05", title: "FinTech Fraud Detection", description: "An advanced anomaly detection system for identifying high-frequency trading manipulation.", teams: 51, color: "#FF4600" },
        { id: "BE-06", title: "EdTech Personalization Engine", description: "An AI-driven platform that adapts curriculum difficulty based on real-time student performance metrics.", teams: 22, color: "#3080ED" },
        { id: "BE-07", title: "Sustainable Supply Chain", description: "A transparency tool using RFID/Blockchain to track carbon footprints across a product's lifecycle.", teams: 15, color: "#F5B301" },
        { id: "BE-08", title: "Mental Health Companion", description: "A privacy-first LLM designed to provide initial psychological support and crisis detection.", teams: 47, color: "#7DA942" },
        { id: "BE-09", title: "AR-Based Remote Repair", description: "An Augmented Reality interface allowing experts to guide field technicians through complex hardware repairs.", teams: 12, color: "#FF4600" },
        { id: "BE-10", title: "Zero-Knowledge Voting", description: "A secure, anonymous, and verifiable voting system using Zero-Knowledge Proofs for university elections.", teams: 31, color: "#3080ED" },
    ];

    return (
        <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
            {/* HEADER SECTION */}
            <div className="relative w-full border-b border-t border-dashed border-gray-500">
                <Navbar />

                <div className="flex flex-col px-4 sm:px-10 lg:px-[84px] mt-5 border-t border-dashed border-gray-500">
                    <div className="flex flex-col gap-5 pt-10 pb-10 lg:pt-[84px] lg:border-l lg:border-r border-dashed border-gray-500">
                        <p className="ml-2 sm:ml-5 mt-[-10px] sm:mt-[-20px] text-[14px] sm:text-[20px] text-[#6C6C6C] uppercase tracking-widest">
                            [CHALLENGE REPOSITORY]
                        </p>

                        <h1 className="hack pl-2 sm:pl-5 pb-5 border-t border-b border-dashed border-gray-500 text-[28px] sm:text-[48px] lg:text-[64px] font-400 text-[#F5B301] leading-tight">
                            problem statements
                        </h1>

                        <p className="text-[14px] sm:text-[20px] pl-2 sm:pl-5 pb-4 pr-2 sm:pr-5 max-w-3xl italic text-gray-400 leading-relaxed">
                            {`{ Choose your battlefield. Each statement is designed to push the boundaries of current technology. }`}
                        </p>
                    </div>
                </div>
            </div>

            {/* PROBLEMS GRID */}
            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="py-8 sm:py-14 lg:border-l lg:border-r border-dashed border-gray-500">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-2 sm:px-5">
                        {problems.map((prob, index) => (
                            <motion.div
                                key={prob.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative border border-dashed border-gray-600 p-5 sm:p-8 rounded-xl bg-gray-900/20 hover:bg-white/[0.03] transition-all duration-300 flex flex-col"
                            >
                                {/* Top Meta Info */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className="font-mono text-xs sm:text-sm text-gray-500 tracking-tighter">ID: {prob.id}</span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[8px] sm:text-[10px] uppercase text-gray-500 mb-1">Live Submissions</span>
                                        <span className="font-mono text-[16px] sm:text-[18px]" style={{ color: prob.color }}>
                                            {prob.teams} <span className="text-[10px] text-gray-600">TEAMS</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-white transition-colors" style={{ color: prob.color }}>
                                    {prob.title}
                                </h3>
                                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 flex-grow">
                                    {prob.description}
                                </p>

                                {/* Action - Responsive Layout */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
                                    <Link
                                        href={`https://unstop.com/hackathons/breaking-enigma-vishwakarma-institute-of-technology-pune-maharashtra-1660436`}
                                        target="_blank"
                                        className="w-full sm:w-auto text-center px-6 py-2.5 border border-white text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-md"
                                    >
                                        Register
                                    </Link>

                                    {/* Hide dashed line on mobile to save space */}
                                    <div className="hidden sm:block h-[1px] flex-grow mx-4 border-t border-dashed border-gray-700"></div>

                                    <span className="text-[9px] font-mono text-gray-600 self-end sm:self-auto">
                                        VERIFIED_ENIGMA_STMT
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProblemStatements;