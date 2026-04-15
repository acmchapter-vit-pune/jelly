"use client";

/**
 * pages/PsRevealPage.jsx — Public PS list (read-only)
 *
 * Anyone can view. Rows navigate to /psDescription/[psId].
 * Team leaders click "LEADER PORTAL →" to go to /psSelection.
 */

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import { PROBLEM_STATEMENTS } from "@/lib/psData";

const MAX_TEAMS = 7;

const PsRevealPage = () => {
    const router = useRouter();

    const [psData, setPsData] = useState(
        PROBLEM_STATEMENTS.map(ps => ({ ...ps, remaining: MAX_TEAMS, isClosed: false, count: 0 }))
    );
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);

    useEffect(() => {
        fetch("/api/ps-status")
            .then(r => r.json())
            .then(json => { if (json.success) setPsData(json.data); })
            .catch(console.error);

        const socket = io({ transports: ["websocket", "polling"] });
        socketRef.current = socket;
        socket.on("connect",    () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));
        socket.on("ps-update", ({ psId, remaining }) =>
            setPsData(prev => prev.map(ps =>
                ps.id === psId ? { ...ps, remaining: Math.max(0, remaining), isClosed: remaining <= 0 } : ps
            ))
        );
        socket.on("ps-closed", ({ psId }) =>
            setPsData(prev => prev.map(ps =>
                ps.id === psId ? { ...ps, remaining: 0, isClosed: true } : ps
            ))
        );
        return () => socket.disconnect();
    }, []);

    const openCount   = psData.filter(p => !p.isClosed).length;
    const closedCount = psData.filter(p =>  p.isClosed).length;

    return (
        <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">

            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="relative w-full border-b border-dashed border-gray-500">
                <Navbar />
                <div className="flex flex-col px-4 sm:px-10 lg:px-[84px] border-t border-dashed border-gray-500">
                    <div className="flex flex-col gap-5 pt-10 pb-10 lg:pt-[84px] lg:border-l lg:border-r border-dashed border-gray-500">

                        <p className="ml-2 sm:ml-5 mt-[-10px] sm:mt-[-20px] text-[14px] sm:text-[20px] text-[#6C6C6C] uppercase tracking-widest">
                            [BREAKING ENIGMA — PS SELECTION]
                        </p>

                        {/* Title + leader portal link */}
                        <div className="pl-2 sm:pl-5 pr-2 sm:pr-5 pb-5 border-t border-b border-dashed border-gray-500 flex items-center justify-between gap-4">
                            <h1 className="hack text-[28px] sm:text-[48px] lg:text-[60px] font-400 text-[#FF4600] leading-tight">
                                problem statements
                            </h1>
                            <button
                                onClick={() => router.push("/hackathon/psSelection")}
                                className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#F5B301] text-[#F5B301] text-[10px] sm:text-sm font-bold uppercase tracking-widest hover:bg-[#F5B301] hover:text-black transition-all duration-300 rounded-md whitespace-nowrap"
                            >
                                LEADER PORTAL
                            </button>
                        </div>

                        <div className="pl-2 sm:pl-5 pr-2 sm:pr-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <p className="text-[13px] sm:text-[16px] italic text-gray-500 leading-relaxed">
                                {`{ Click any PS to view full details. Team leaders — use the portal to select your PS. }`}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest flex-shrink-0"
                                 style={{ color: isConnected ? "#7DA942" : "#FF4600" }}>
                                <span className="w-2 h-2 rounded-full"
                                      style={{ backgroundColor: isConnected ? "#7DA942" : "#FF4600",
                                               boxShadow: isConnected ? "0 0 6px #7DA942" : "none" }} />
                                {isConnected ? "LIVE" : "CONNECTING..."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── PS List ─────────────────────────────────────────────────── */}
            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="lg:border-l lg:border-r border-dashed border-gray-500">

                    <div className="flex items-center gap-6 px-4 sm:px-6 py-3 border-b border-dashed border-gray-800 text-[10px] font-mono">
                        <span className="text-gray-600">{psData.length} TOTAL</span>
                        <span className="text-[#7DA942]">{openCount} OPEN</span>
                        {closedCount > 0 && <span className="text-[#FF4600]">{closedCount} CLOSED</span>}
                    </div>

                    <div className="hidden sm:grid grid-cols-[80px_1fr_140px_120px] gap-4 px-6 py-2 border-b border-dashed border-gray-800">
                        {["PS ID", "Title", "Domain", "Slots Left"].map(h => (
                            <span key={h} className="font-mono text-[10px] text-gray-700 uppercase tracking-widest">{h}</span>
                        ))}
                    </div>

                    {psData.map((ps, index) => (
                        <motion.div
                            key={ps.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0  }}
                            transition={{ delay: index * 0.04, duration: 0.3 }}
                            onClick={() => router.push(`/hackathon/psDescription/${ps.id}`)}
                            className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-dashed cursor-pointer group transition-all duration-200"
                            style={ps.isClosed
                                ? { backgroundColor: "rgba(255,70,0,0.05)", borderColor: "rgba(255,70,0,0.25)" }
                                : { borderColor: "rgba(75,85,99,0.4)" }}
                            whileHover={{ backgroundColor: ps.isClosed ? "rgba(255,70,0,0.09)" : "rgba(255,255,255,0.025)" }}
                        >
                            <span className="font-mono text-[11px] sm:text-sm w-14 sm:w-16 flex-shrink-0"
                                  style={{ color: ps.isClosed ? "rgba(255,70,0,0.5)" : "rgb(107,114,128)" }}>
                                {ps.id}
                            </span>

                            <div className="flex-1 min-w-0">
                                <span className="font-bold text-sm sm:text-base block truncate transition-colors"
                                      style={{ color: ps.isClosed ? "rgba(255,255,255,0.4)" : "white" }}>
                                    {ps.title}
                                </span>
                                <span className="text-[9px] font-mono uppercase tracking-widest mt-0.5 block sm:hidden"
                                      style={{ color: ps.isClosed ? "rgba(255,70,0,0.5)" : ps.color }}>
                                    {ps.domain}
                                </span>
                            </div>

                            <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest px-2 py-1 border border-dashed rounded-sm w-[130px] text-center flex-shrink-0"
                                  style={ps.isClosed
                                      ? { color: "rgba(255,70,0,0.4)", borderColor: "rgba(255,70,0,0.2)" }
                                      : { color: ps.color, borderColor: ps.color }}>
                                {ps.domain}
                            </span>

                            {ps.isClosed ? (
                                <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-dashed rounded-sm flex-shrink-0"
                                      style={{ color: "#FF4600", borderColor: "rgba(255,70,0,0.4)" }}>
                                    ● CLOSED
                                </span>
                            ) : (
                                <span className="font-mono text-xs sm:text-sm flex-shrink-0"
                                      style={{ color: ps.remaining <= 2 ? "#F5B301" : ps.color }}>
                                    <span className="font-bold">{ps.remaining}</span>
                                    <span className="text-gray-600">/7 left</span>
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="py-5 lg:border-l lg:border-r border-dashed border-gray-500 px-4 sm:px-6">
                    <p className="text-[#6C6C6C] text-[11px] font-mono leading-relaxed">
                        // Click any row to view the full problem statement. Team leaders use the portal to lock in their selection.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PsRevealPage;
