"use client";

/**
 * pages/PsDashboard.jsx — Live PS Selection Dashboard (admin-gated)
 *
 * Organiser enters ADMIN_SECRET to view the live dashboard.
 * WebSocket events (ps-update, ps-closed) update the table instantly.
 */

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { getPusherClient } from "@/lib/pusherClient";
import { PROBLEM_STATEMENTS } from "@/lib/psData";

const MAX_TEAMS = 7;

// ── Admin secret gate ─────────────────────────────────────────────────────────
const SecretGate = ({ onSuccess }) => {
    const [secret,  setSecret]  = useState("");
    const [error,   setError]   = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

    const handleEnter = async () => {
        setError("");
        if (!secret.trim()) { setError("Secret is required."); return; }
        setLoading(true);
        try {
            // Validate by calling any admin endpoint with the secret
            const res  = await fetch(`/api/admin/allowed-leaders?secret=${encodeURIComponent(secret.trim())}`);
            const json = await res.json();
            if (json.success) { onSuccess(); }
            else              { setError("Invalid admin secret."); }
        } catch { setError("Network error. Try again."); }
        finally { setLoading(false); }
    };

    return (
        <div className="w-full min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4 py-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="border border-dashed border-gray-500 bg-black p-10 sm:p-14 max-w-md w-full rounded-xl">
                    <p className="text-[#6C6C6C] text-[10px] font-mono uppercase tracking-widest mb-3">[ADMIN ACCESS]</p>
                    <h1 className="hack text-[44px] sm:text-[52px] text-[#3080ED] leading-none mb-8">live dashboard</h1>

                    <input
                        ref={inputRef}
                        type="password"
                        placeholder="ADMIN SECRET..."
                        value={secret}
                        onChange={e => { setSecret(e.target.value); setError(""); }}
                        onKeyDown={e => e.key === "Enter" && handleEnter()}
                        className="w-full bg-black border border-dashed border-gray-600 px-4 py-3.5 outline-none focus:border-[#3080ED] transition-colors font-mono text-sm placeholder:text-gray-700 rounded-md mb-4"
                    />

                    <AnimatePresence>
                        {error && (
                            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="text-[#FF4600] text-xs font-mono mb-4">
                                ✕ {error}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <button onClick={handleEnter} disabled={loading}
                            className="w-full py-3.5 border-2 border-[#3080ED] text-[#3080ED] font-bold uppercase tracking-widest text-sm hover:bg-[#3080ED] hover:text-black transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-wait">
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                VERIFYING...
                            </span>
                        ) : "VIEW DASHBOARD →"}
                    </button>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
const PsDashboard = () => {
    const [authed, setAuthed] = useState(false);

    const [psData, setPsData] = useState(
        PROBLEM_STATEMENTS.map(ps => ({ ...ps, remaining: MAX_TEAMS, isClosed: false, count: 0 }))
    );
    const [isConnected, setIsConnected] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!authed) return;

        // Fetch current state
        fetch("/api/ps-status")
            .then(r => r.json())
            .then(json => { if (json.success) setPsData(json.data); })
            .catch(console.error);

        // Connect via Pusher
        const client  = getPusherClient();
        const channel = client.subscribe('ps-updates');
        socketRef.current = channel;

        client.connection.bind('connected',    () => setIsConnected(true));
        client.connection.bind('disconnected', () => setIsConnected(false));
        client.connection.bind('connecting',   () => setIsConnected(false));
        setIsConnected(client.connection.state === 'connected');

        channel.bind('ps-update', ({ psId, remaining }) => {
            setPsData(prev => prev.map(ps =>
                ps.id === psId
                    ? { ...ps, remaining: Math.max(0, remaining), isClosed: remaining <= 0, count: MAX_TEAMS - Math.max(0, remaining) }
                    : ps
            ));
            setLastUpdated(new Date().toLocaleTimeString());
        });

        channel.bind('ps-closed', ({ psId }) => {
            setPsData(prev => prev.map(ps =>
                ps.id === psId ? { ...ps, remaining: 0, isClosed: true, count: MAX_TEAMS } : ps
            ));
            setLastUpdated(new Date().toLocaleTimeString());
        });

        return () => {
            channel.unbind_all();
            client.unsubscribe('ps-updates');
        };
    }, [authed]);

    if (!authed) return <SecretGate onSuccess={() => setAuthed(true)} />;

    const totalSelected = psData.reduce((sum, ps) => sum + (ps.count || 0), 0);
    const closedCount   = psData.filter(p => p.isClosed).length;

    return (
        <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">

            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="relative w-full border-b border-dashed border-gray-500">
                <Navbar />
                <div className="flex flex-col px-4 sm:px-10 lg:px-[84px] border-t border-dashed border-gray-500">
                    <div className="flex flex-col gap-5 pt-10 pb-10 lg:pt-[84px] lg:border-l lg:border-r border-dashed border-gray-500">

                        <p className="ml-2 sm:ml-5 mt-[-10px] sm:mt-[-20px] text-[14px] sm:text-[20px] text-[#6C6C6C] uppercase tracking-widest">
                            [BREAKING ENIGMA — LIVE DASHBOARD]
                        </p>

                        <h1 className="hack pl-2 sm:pl-5 pb-5 border-t border-b border-dashed border-gray-500 text-[28px] sm:text-[48px] lg:text-[64px] font-400 text-[#3080ED] leading-tight">
                            ps selection live
                        </h1>

                        <div className="pl-2 sm:pl-5 pr-2 sm:pr-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <p className="text-[14px] sm:text-[18px] italic text-gray-400 leading-relaxed">
                                {`{ Real-time view of PS selection progress. Updates live as teams lock in. }`}
                            </p>
                            <div className="flex items-center gap-4 flex-shrink-0">
                                {lastUpdated && (
                                    <span className="text-[10px] font-mono text-gray-600">
                                        LAST UPDATE: {lastUpdated}
                                    </span>
                                )}
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest"
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
            </div>

            {/* ── Stats Cards ─────────────────────────────────────────────── */}
            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="py-8 lg:border-l lg:border-r border-dashed border-gray-500 px-4 sm:px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: "Total PS",        value: psData.length,   color: "#F5B301" },
                            { label: "Open",            value: psData.length - closedCount, color: "#7DA942" },
                            { label: "Closed",          value: closedCount,     color: "#FF4600" },
                            { label: "Teams Locked In", value: totalSelected,   color: "#3080ED" },
                        ].map(card => (
                            <motion.div
                                key={card.label}
                                layout
                                className="border border-dashed border-gray-700 px-5 py-4 rounded-lg text-center"
                            >
                                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                                    {card.label}
                                </p>
                                <motion.p
                                    key={card.value}
                                    initial={{ scale: 1.3, opacity: 0 }}
                                    animate={{ scale: 1,   opacity: 1 }}
                                    className="hack text-4xl sm:text-5xl"
                                    style={{ color: card.color }}
                                >
                                    {card.value}
                                </motion.p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Table ───────────────────────────────────────────────────── */}
            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="py-8 sm:py-12 lg:border-l lg:border-r border-dashed border-gray-500">
                    <div className="px-2 sm:px-5 mb-4 flex items-center justify-between">
                        <h2 className="hack text-[24px] sm:text-[36px] text-[#3080ED]">
                            live selections
                        </h2>
                        <span className="text-[10px] font-mono text-gray-500 hidden sm:block">
                            ← updates in real-time →
                        </span>
                    </div>

                    <div className="overflow-x-auto px-2 sm:px-5">
                        <table className="w-full min-w-[640px] border-collapse table-fixed">
                            <colgroup>
                                <col className="w-[80px]" />
                                <col />
                                <col className="w-[180px]" />
                                <col className="w-[80px]" />
                                <col className="w-[110px]" />
                                <col className="w-[100px]" />
                            </colgroup>
                            <thead>
                                <tr className="border-b border-dashed border-gray-600">
                                    <th className="text-left p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">PS ID</th>
                                    <th className="text-left p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">Title</th>
                                    <th className="text-left p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest hidden sm:table-cell">Domain</th>
                                    <th className="text-center p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">Teams</th>
                                    <th className="text-center p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">Slots</th>
                                    <th className="text-center p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence mode="sync">
                                    {psData.map((ps, index) => {
                                        const count     = ps.count ?? 0;
                                        const remaining = ps.remaining ?? MAX_TEAMS;

                                        return (
                                            <motion.tr
                                                key={ps.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0   }}
                                                transition={{ delay: index * 0.04 }}
                                                className="border-b border-dashed border-gray-800 hover:bg-white/[0.02] transition-colors"
                                            >
                                                {/* PS ID */}
                                                <td className="p-3 sm:p-4">
                                                    <span className="font-mono text-[11px] sm:text-sm text-gray-500">
                                                        {ps.id}
                                                    </span>
                                                </td>

                                                {/* Title */}
                                                <td className="p-3 sm:p-4 max-w-0">
                                                    <span className="font-bold text-sm sm:text-base text-white block truncate" title={ps.title}>
                                                        {ps.title}
                                                    </span>
                                                </td>

                                                {/* Domain */}
                                                <td className="p-3 sm:p-4 hidden sm:table-cell">
                                                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-2 py-1 border border-dashed rounded-sm"
                                                          style={{ color: ps.color, borderColor: ps.color }}>
                                                        {ps.domain}
                                                    </span>
                                                </td>

                                                {/* Teams count — animates on change */}
                                                <td className="p-3 sm:p-4 text-center">
                                                    <motion.span
                                                        key={count}
                                                        initial={{ scale: 1.5, color: ps.color }}
                                                        animate={{ scale: 1,   color: "#ffffff" }}
                                                        transition={{ duration: 0.4 }}
                                                        className="font-mono text-sm sm:text-base font-bold"
                                                    >
                                                        {count}
                                                        <span className="text-gray-600 font-normal text-xs">/{MAX_TEAMS}</span>
                                                    </motion.span>
                                                </td>

                                                {/* Slots remaining */}
                                                <td className="p-3 sm:p-4 text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        {Array.from({ length: MAX_TEAMS }).map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                animate={{
                                                                    backgroundColor: i < count ? ps.color : "rgba(75,85,99,0.3)",
                                                                }}
                                                                transition={{ duration: 0.4 }}
                                                                className="w-2 h-2 rounded-full"
                                                            />
                                                        ))}
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="p-3 sm:p-4 text-center">
                                                    <AnimatePresence mode="wait">
                                                        {ps.isClosed ? (
                                                            <motion.span
                                                                key="closed"
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1   }}
                                                                className="text-[9px] font-mono uppercase tracking-widest text-[#FF4600] border border-dashed border-[#FF4600] px-2 py-1 rounded-sm"
                                                            >
                                                                ● CLOSED
                                                            </motion.span>
                                                        ) : (
                                                            <motion.span
                                                                key="open"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className="text-[9px] font-mono uppercase tracking-widest text-[#7DA942] border border-dashed border-[#7DA942] px-2 py-1 rounded-sm"
                                                            >
                                                                ● OPEN
                                                            </motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PsDashboard;
