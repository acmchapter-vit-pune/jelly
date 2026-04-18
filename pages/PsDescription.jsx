"use client";

/**
 * pages/PsDescription.jsx — Full PS Detail (read-only)
 *
 * Route: /hackathon/psDescription/[psId]
 * Shows story, description, requirements, good to have + live slot count.
 * Selection is done from /hackathon/psRevealPage via the SELECT PS button.
 */

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { getPusherClient } from "@/lib/pusherClient";
import { PROBLEM_STATEMENTS } from "@/lib/psData";

const MAX_TEAMS = 6;

// ── Slot Dots ─────────────────────────────────────────────────────────────────
const SlotDots = ({ remaining, color }) => {
    const filled = MAX_TEAMS - remaining;
    return (
        <div className="flex gap-1.5 items-center">
            {Array.from({ length: MAX_TEAMS }).map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ backgroundColor: i < filled ? color : "rgba(75,85,99,0.3)" }}
                    transition={{ duration: 0.4 }}
                    className="w-2.5 h-2.5 rounded-full"
                />
            ))}
        </div>
    );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const PsDescription = () => {
    const params  = useParams();
    const psId    = params?.psId ?? null;
    const router  = useRouter();

    const ps = PROBLEM_STATEMENTS.find(p => p.id === psId);

    const [slotInfo,    setSlotInfo]    = useState({ remaining: MAX_TEAMS, isClosed: false, count: 0 });
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!ps) return;

        fetch("/api/ps-status")
            .then(r => r.json())
            .then(json => {
                if (json.success) {
                    const found = json.data.find(p => p.id === psId);
                    if (found) setSlotInfo({ remaining: found.remaining, isClosed: found.isClosed, count: found.count });
                }
            })
            .catch(console.error);

        const client  = getPusherClient();
        const channel = client.subscribe('ps-updates');
        socketRef.current = channel;

        client.connection.bind('connected',    () => setIsConnected(true));
        client.connection.bind('disconnected', () => setIsConnected(false));
        client.connection.bind('connecting',   () => setIsConnected(false));
        setIsConnected(client.connection.state === 'connected');

        channel.bind('ps-update', ({ psId: uid, remaining }) => {
            if (uid === psId)
                setSlotInfo({ remaining: Math.max(0, remaining), isClosed: remaining <= 0, count: MAX_TEAMS - Math.max(0, remaining) });
        });
        channel.bind('ps-closed', ({ psId: cid }) => {
            if (cid === psId) setSlotInfo({ remaining: 0, isClosed: true, count: MAX_TEAMS });
        });
        return () => {
            channel.unbind_all();
            client.unsubscribe('ps-updates');
        };
    }, [psId, ps]); // eslint-disable-line react-hooks/exhaustive-deps

    // 404
    if (!ps) {
        return (
            <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 px-4">
                <p className="hack text-[48px] text-[#FF4600]">404</p>
                <p className="text-gray-400 font-mono">PS not found: {psId}</p>
                <Link href="/hackathon/psRevealPage"
                      className="border border-dashed border-white px-6 py-2 text-sm font-mono hover:bg-white hover:text-black transition-all">
                    ← BACK TO LIST
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">

            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="relative w-full border-b border-dashed border-gray-500">
                <Navbar />
                <div className="flex flex-col px-4 sm:px-10 lg:px-[84px] border-t border-dashed border-gray-500">
                    <div className="flex flex-col gap-5 pt-8 pb-8 lg:pt-[60px] lg:border-l lg:border-r border-dashed border-gray-500">

                        {/* Breadcrumb */}
                        <div className="pl-2 sm:pl-5 flex items-center gap-3 text-[11px] font-mono text-gray-600">
                            <button onClick={() => router.push("/hackathon/psRevealPage")}
                                    className="hover:text-white transition-colors">
                                ← PROBLEM STATEMENTS
                            </button>
                            <span>/</span>
                            <span style={{ color: ps.color }}>{ps.id}</span>
                        </div>

                        {/* PS ID + Domain */}
                        <div className="pl-2 sm:pl-5 flex items-center gap-3 flex-wrap">
                            <span className="font-mono text-sm text-gray-500">{ps.id}</span>
                            <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 border border-dashed rounded-sm"
                                  style={{ color: ps.color, borderColor: ps.color }}>
                                {ps.domain}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="hack pl-2 sm:pl-5 pb-5 border-t border-b border-dashed border-gray-500 text-[26px] sm:text-[44px] lg:text-[58px] leading-tight"
                            style={{ color: ps.color }}>
                            {ps.title}
                        </h1>

                        {/* Slot status */}
                        <div className="pl-2 sm:pl-5 pr-2 sm:pr-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <SlotDots remaining={slotInfo.remaining} color={slotInfo.isClosed ? "#FF4600" : ps.color} />
                                <motion.span
                                    key={slotInfo.remaining}
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0  }}
                                    className="font-mono text-sm"
                                    style={{ color: slotInfo.isClosed ? "#FF4600" : slotInfo.remaining <= 2 ? "#F5B301" : ps.color }}
                                >
                                    {slotInfo.isClosed ? "ALL SLOTS FILLED" : `${slotInfo.remaining} of 7 slots remaining`}
                                </motion.span>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest"
                                 style={{ color: isConnected ? "#7DA942" : "#FF4600" }}>
                                <span className="w-1.5 h-1.5 rounded-full"
                                      style={{ backgroundColor: isConnected ? "#7DA942" : "#FF4600",
                                               boxShadow: isConnected ? "0 0 5px #7DA942" : "none" }} />
                                {isConnected ? "LIVE" : "..."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Content ─────────────────────────────────────────────────── */}
            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="py-10 sm:py-16 lg:border-l lg:border-r border-dashed border-gray-500">
                    <div className="px-2 sm:px-8 max-w-4xl">

                        {/* Story — only shown when text is non-empty */}
                        {ps.story && (
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
                                <p className="text-[#6C6C6C] text-[10px] font-mono uppercase tracking-widest mb-3">[STORY]</p>
                                <blockquote className="text-gray-300 text-[15px] sm:text-[17px] leading-relaxed italic border-l-[3px] border-dashed pl-5"
                                            style={{ borderColor: ps.color }}>
                                    "{ps.story}"
                                </blockquote>
                            </motion.div>
                        )}

                        {ps.story && <div className="border-t border-dashed border-gray-800 mb-10" />}

                        {/* Description — structured blocks */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-10">
                            <p className="text-[#6C6C6C] text-[10px] font-mono uppercase tracking-widest mb-4">[DESCRIPTION]</p>
                            <div className="space-y-4">
                                {(ps.descriptionBlocks ?? [{ type: 'paragraph', text: ps.description }]).map((block, bi) =>
                                    block.type === 'bullets' ? (
                                        <ul key={bi} className="space-y-1.5 pl-2">
                                            {block.items.map((item, ii) => (
                                                <li key={ii} className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-gray-300 leading-relaxed">
                                                    <span className="font-mono mt-1 flex-shrink-0" style={{ color: ps.color }}>•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p key={bi} className="text-gray-300 text-[15px] sm:text-[17px] leading-relaxed">
                                            {block.text}
                                        </p>
                                    )
                                )}
                            </div>
                        </motion.div>

                        <div className="border-t border-dashed border-gray-800 mb-10" />

                        {/* Requirements + Good To Have */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                            <div>
                                <p className="text-[#6C6C6C] text-[10px] font-mono uppercase tracking-widest mb-4">[REQUIREMENTS]</p>
                                <ul className="space-y-3">
                                    {ps.requirements.map((req, i) => (
                                        <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                                   transition={{ delay: 0.25 + i * 0.07 }}
                                                   className="flex items-start gap-3 text-[14px] sm:text-[15px] text-gray-300 leading-relaxed">
                                            <span className="font-mono font-bold mt-0.5 flex-shrink-0" style={{ color: "#FF4600" }}>→</span>
                                            {req}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="text-[#6C6C6C] text-[10px] font-mono uppercase tracking-widest mb-4">[GOOD TO HAVE]</p>
                                <ul className="space-y-3">
                                    {ps.goodToHave.map((feat, i) => (
                                        <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                                   transition={{ delay: 0.3 + i * 0.07 }}
                                                   className="flex items-start gap-3 text-[14px] sm:text-[15px] text-gray-500 leading-relaxed">
                                            <span className="font-mono font-bold mt-0.5 flex-shrink-0" style={{ color: "#7DA942" }}>+</span>
                                            {feat}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Resource Links */}
                        {ps.resourceLinks && ps.resourceLinks.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="mb-12">
                                <div className="border-t border-dashed border-gray-800 mb-10" />
                                <p className="text-[#6C6C6C] text-[10px] font-mono uppercase tracking-widest mb-4">[RESOURCE / DATASET LINKS]</p>
                                <ul className="space-y-2">
                                    {ps.resourceLinks.map((link, i) => (
                                        <li key={i} className="flex items-center gap-2.5 text-[14px] sm:text-[15px]">
                                            <span className="font-mono flex-shrink-0" style={{ color: ps.color }}>↗</span>
                                            <a href={link.url}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               className="text-gray-400 hover:text-white underline underline-offset-4 decoration-dashed transition-colors break-all">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {/* Back only */}
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                                    className="border-t border-dashed border-gray-800 pt-8">
                            <button
                                onClick={() => router.push("/hackathon/psRevealPage")}
                                className="px-5 py-2.5 border border-dashed border-gray-600 text-sm font-mono text-gray-400 hover:border-white hover:text-white transition-all rounded-md"
                            >
                                ← BACK TO LIST
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PsDescription;
