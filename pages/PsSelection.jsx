"use client";

/**
 * pages/PsSelection.jsx — Leader PS Selection Portal (cookie-gated)
 *
 * Route: /hackathon/psSelection
 * Validates HTTP-only session cookie on mount via GET /api/auth/leader.
 * If invalid → redirects to /hackathon/psLogin.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { getPusherClient } from "@/lib/pusherClient";
import { PROBLEM_STATEMENTS } from "@/lib/psData";

const MAX_TEAMS = 7;

// ── Toast ─────────────────────────────────────────────────────────────────────
const Toast = ({ toast }) => (
    <AnimatePresence>
        {toast && (() => {
            const c = toast.type === "success"
                ? { border: "#7DA942", text: "#7DA942", label: "SUCCESS" }
                : { border: "#FF4600", text: "#FF4600", label: "ERROR"   };
            return (
                <motion.div key="t" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.25 }}
                            className="fixed bottom-6 right-4 sm:right-6 z-[200] max-w-sm pointer-events-none">
                    <div className="border border-dashed bg-black px-5 py-4 rounded-lg shadow-2xl" style={{ borderColor: c.border }}>
                        <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: c.text }}>[{c.label}]</p>
                        <p className="text-white text-sm leading-snug">{toast.message}</p>
                    </div>
                </motion.div>
            );
        })()}
    </AnimatePresence>
);

// ── Confirm Lock-In Modal ─────────────────────────────────────────────────────
const ConfirmModal = ({ ps, onClose, onConfirm, isSubmitting }) => {
    const [typed, setTyped] = useState("");
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 80);
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const isMatch = typed.trim().toUpperCase() === ps.id;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
            onClick={e => e.target === e.currentTarget && !isSubmitting && onClose()}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{    opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="border border-dashed border-gray-500 bg-black p-8 sm:p-10 max-w-md w-full rounded-xl relative"
            >
                {!isSubmitting && (
                    <button onClick={onClose}
                            className="absolute top-4 right-5 text-gray-600 hover:text-white font-mono text-lg transition-colors">✕</button>
                )}

                <p className="text-[#6C6C6C] text-[10px] font-mono uppercase tracking-widest mb-3">[CONFIRM SELECTION]</p>
                <h2 className="hack text-[40px] sm:text-[48px] leading-none mb-1" style={{ color: ps.color }}>lock in</h2>
                <p className="text-gray-600 text-xs font-mono mb-6">// this cannot be undone</p>

                <div className="border border-dashed px-4 py-3 rounded-md mb-6" style={{ borderColor: `${ps.color}44` }}>
                    <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">{ps.id}</p>
                    <p className="text-white text-sm font-bold leading-snug">{ps.title}</p>
                </div>

                <p className="text-gray-400 text-xs font-mono mb-3">
                    Type <span className="text-white font-bold">{ps.id}</span> to confirm:
                </p>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={ps.id}
                    value={typed}
                    onChange={e => { setTyped(e.target.value.toUpperCase()); setError(""); }}
                    onKeyDown={e => e.key === "Enter" && isMatch && !isSubmitting && onConfirm()}
                    className="w-full bg-black border border-dashed border-gray-600 px-4 py-3 outline-none focus:border-white transition-colors font-mono text-sm placeholder:text-gray-700 rounded-md uppercase tracking-widest mb-4"
                />

                <AnimatePresence>
                    {error && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }} className="text-[#FF4600] text-xs font-mono mb-4">
                            ✕ {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => { if (!isMatch) { setError(`Type exactly "${ps.id}" to confirm.`); return; } onConfirm(); }}
                    disabled={isSubmitting || !isMatch}
                    className="w-full py-3 border-2 text-sm font-bold uppercase tracking-widest transition-all duration-200 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ borderColor: isMatch ? ps.color : "rgb(75,85,99)", color: isMatch ? ps.color : "rgb(75,85,99)" }}
                    onMouseEnter={e => { if (isMatch && !isSubmitting) { e.currentTarget.style.background = ps.color; e.currentTarget.style.color = "#000"; }}}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = isMatch ? ps.color : "rgb(75,85,99)"; }}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            LOCKING IN...
                        </span>
                    ) : "CONFIRM →"}
                </button>
            </motion.div>
        </motion.div>
    );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const PsSelection = () => {
    const router = useRouter();

    const [authState,   setAuthState]   = useState("loading"); // loading | authed
    const [leaderInfo,  setLeaderInfo]  = useState({ email: "", teamName: "" });
    const [psData,      setPsData]      = useState(
        PROBLEM_STATEMENTS.map(ps => ({ ...ps, remaining: MAX_TEAMS, isClosed: false, count: 0 }))
    );
    const [isConnected, setIsConnected] = useState(false);
    const [selectedPs,  setSelectedPs]  = useState(null);
    const [isLocking,   setIsLocking]   = useState(false);
    const [lockedPsId,  setLockedPsId]  = useState(null);
    const [toast,       setToast]       = useState(null);
    const socketRef  = useRef(null);
    const toastTimer = useRef(null);

    // Validate session on mount
    useEffect(() => {
        fetch("/api/auth/leader")
            .then(r => r.json())
            .then(json => {
                if (!json.valid) {
                    router.replace("/hackathon/psLogin");
                } else {
                    setLeaderInfo({ email: json.email, teamName: json.teamName });
                    setAuthState("authed");
                }
            })
            .catch(() => router.replace("/hackathon/psLogin"));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Socket + PS status (only after auth confirmed)
    useEffect(() => {
        if (authState !== "authed") return;

        fetch("/api/ps-status")
            .then(r => r.json())
            .then(json => { if (json.success) setPsData(json.data); })
            .catch(console.error);

        const client  = getPusherClient();
        const channel = client.subscribe('ps-updates');
        socketRef.current = channel;

        client.connection.bind('connected',    () => setIsConnected(true));
        client.connection.bind('disconnected', () => setIsConnected(false));
        client.connection.bind('connecting',   () => setIsConnected(false));
        setIsConnected(client.connection.state === 'connected');

        channel.bind('ps-update', ({ psId, remaining }) =>
            setPsData(prev => prev.map(ps =>
                ps.id === psId ? { ...ps, remaining: Math.max(0, remaining), isClosed: remaining <= 0 } : ps
            ))
        );
        channel.bind('ps-closed', ({ psId }) =>
            setPsData(prev => prev.map(ps =>
                ps.id === psId ? { ...ps, remaining: 0, isClosed: true } : ps
            ))
        );
        return () => {
            channel.unbind_all();
            client.unsubscribe('ps-updates');
        };
    }, [authState]);

    const showToast = useCallback((message, type = "success") => {
        setToast({ message, type });
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 6000);
    }, []);

    const handleLockIn = async () => {
        if (!selectedPs) return;
        setIsLocking(true);
        try {
            const res  = await fetch("/api/select-ps", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ psId: selectedPs.id }),
            });
            const json = await res.json();
            if (json.success) {
                setLockedPsId(selectedPs.id);
                setSelectedPs(null);
                showToast(json.message, "success");
            } else if (json.error === "session_replaced" || json.error === "session_expired" || json.error === "session_missing") {
                setSelectedPs(null);
                router.replace("/hackathon/psLogin");
            } else {
                setSelectedPs(null);
                showToast(json.message || "Something went wrong.", "error");
            }
        } catch {
            setSelectedPs(null);
            showToast("Network error. Please try again.", "error");
        } finally {
            setIsLocking(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/leader", { method: "DELETE" }).catch(() => {});
        router.push("/hackathon/psLogin");
    };

    if (authState === "loading") {
        return (
            <div className="w-full min-h-screen bg-black flex items-center justify-center">
                <p className="text-gray-600 font-mono text-sm animate-pulse">VERIFYING SESSION...</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
            <Toast toast={toast} />

            <AnimatePresence>
                {selectedPs && (
                    <ConfirmModal
                        key="confirm"
                        ps={selectedPs}
                        isSubmitting={isLocking}
                        onClose={() => !isLocking && setSelectedPs(null)}
                        onConfirm={handleLockIn}
                    />
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="relative w-full border-b border-dashed border-gray-500">
                <Navbar />
                <div className="flex flex-col px-4 sm:px-10 lg:px-[84px] border-t border-dashed border-gray-500">
                    <div className="flex flex-col gap-5 pt-10 pb-10 lg:pt-[80px] lg:border-l lg:border-r border-dashed border-gray-500">

                        <p className="ml-2 sm:ml-5 mt-[-10px] sm:mt-[-20px] text-[14px] sm:text-[20px] text-[#6C6C6C] uppercase tracking-widest">
                            [LEADER PORTAL — BREAKING ENIGMA]
                        </p>

                        <div className="pl-2 sm:pl-5 pr-2 sm:pr-5 pb-5 border-t border-b border-dashed border-gray-500 flex items-center justify-between gap-4 flex-wrap">
                            <div>
                                <h1 className="hack text-[28px] sm:text-[48px] lg:text-[58px] text-[#7DA942] leading-tight">
                                    select your ps
                                </h1>
                                {leaderInfo.teamName && (
                                    <p className="font-mono text-xs text-gray-500 mt-1">
                                        TEAM: <span className="text-white">{leaderInfo.teamName}</span>
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest"
                                     style={{ color: isConnected ? "#7DA942" : "#FF4600" }}>
                                    <span className="w-2 h-2 rounded-full"
                                          style={{ backgroundColor: isConnected ? "#7DA942" : "#FF4600",
                                                   boxShadow: isConnected ? "0 0 6px #7DA942" : "none" }} />
                                    LIVE
                                </div>
                                <button onClick={handleLogout}
                                        className="px-3 py-1.5 border border-dashed border-gray-700 text-gray-500 text-[10px] font-mono uppercase hover:border-white hover:text-white transition-all rounded-md">
                                    LOGOUT
                                </button>
                            </div>
                        </div>

                        <div className="pl-2 sm:pl-5">
                            <p className="text-gray-500 text-sm italic">
                                {`{ Logged in as `}
                                <span className="text-white font-bold not-italic">{leaderInfo.email}</span>
                                {` — pick one PS and lock in for your team. }`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Locked banner */}
            <AnimatePresence>
                {lockedPsId && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                                className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed"
                                style={{ borderColor: "rgba(125,169,66,0.4)", backgroundColor: "rgba(125,169,66,0.05)" }}>
                        <div className="py-4 lg:border-l lg:border-r border-dashed border-[rgba(125,169,66,0.2)] px-4 sm:px-6 flex items-center gap-4">
                            <span className="text-[#7DA942] text-xl">✓</span>
                            <div>
                                <p className="text-[#7DA942] font-bold text-sm">
                                    {leaderInfo.teamName || "Your team"} locked into <span className="font-mono">{lockedPsId}</span>!
                                </p>
                                <p className="text-gray-500 text-xs font-mono mt-0.5">Selection confirmed and final. You may close this window.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PS List */}
            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="lg:border-l lg:border-r border-dashed border-gray-500">

                    <div className="hidden sm:grid grid-cols-[80px_1fr_140px_120px_130px] gap-4 px-6 py-2 border-b border-dashed border-gray-800">
                        {["PS ID", "Title", "Domain", "Slots", ""].map(h => (
                            <span key={h} className="font-mono text-[10px] text-gray-700 uppercase tracking-widest">{h}</span>
                        ))}
                    </div>

                    {psData.map((ps, index) => {
                        const isLocked  = lockedPsId === ps.id;
                        const canSelect = !ps.isClosed && !lockedPsId;

                        return (
                            <motion.div
                                key={ps.id}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0  }}
                                transition={{ delay: index * 0.04 }}
                                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-dashed transition-colors"
                                style={ps.isClosed
                                    ? { backgroundColor: "rgba(255,70,0,0.04)", borderColor: "rgba(255,70,0,0.2)" }
                                    : isLocked
                                    ? { backgroundColor: "rgba(125,169,66,0.05)", borderColor: "rgba(125,169,66,0.3)" }
                                    : { borderColor: "rgba(75,85,99,0.4)" }}
                            >
                                <span className="font-mono text-[11px] sm:text-sm w-14 sm:w-16 flex-shrink-0"
                                      style={{ color: ps.isClosed ? "rgba(255,70,0,0.5)" : isLocked ? "#7DA942" : "rgb(107,114,128)" }}>
                                    {ps.id}
                                </span>

                                <div className="flex-1 min-w-0">
                                    <span className="font-bold text-sm sm:text-base block truncate"
                                          style={{ color: ps.isClosed ? "rgba(255,255,255,0.35)" : "white" }}>
                                        {ps.title}
                                    </span>
                                    <span className="text-[9px] font-mono uppercase tracking-widest mt-0.5 block sm:hidden"
                                          style={{ color: ps.isClosed ? "rgba(255,70,0,0.4)" : ps.color }}>
                                        {ps.domain}
                                    </span>
                                </div>

                                <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest px-2 py-1 border border-dashed rounded-sm w-[130px] text-center flex-shrink-0"
                                      style={ps.isClosed
                                          ? { color: "rgba(255,70,0,0.35)", borderColor: "rgba(255,70,0,0.15)" }
                                          : { color: ps.color, borderColor: ps.color }}>
                                    {ps.domain}
                                </span>

                                <div className="flex-shrink-0 w-[100px] sm:w-[110px]">
                                    {ps.isClosed ? (
                                        <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-dashed rounded-sm"
                                              style={{ color: "#FF4600", borderColor: "rgba(255,70,0,0.35)" }}>● CLOSED</span>
                                    ) : isLocked ? (
                                        <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-dashed rounded-sm"
                                              style={{ color: "#7DA942", borderColor: "rgba(125,169,66,0.4)" }}>✓ LOCKED</span>
                                    ) : (
                                        <span className="font-mono text-xs sm:text-sm"
                                              style={{ color: ps.remaining <= 2 ? "#F5B301" : ps.color }}>
                                            <span className="font-bold">{ps.remaining}</span>
                                            <span className="text-gray-600">/7</span>
                                        </span>
                                    )}
                                </div>

                                <div className="flex-shrink-0 w-[110px] sm:w-[120px]">
                                    {!isLocked && (
                                        <button
                                            onClick={() => canSelect && setSelectedPs(ps)}
                                            disabled={!canSelect}
                                            className={`w-full px-3 py-2 border text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-md ${
                                                !canSelect
                                                    ? "border-gray-800 text-gray-700 cursor-not-allowed"
                                                    : "border-white text-white hover:bg-white hover:text-black"
                                            }`}
                                        >
                                            {lockedPsId && !isLocked ? "—" : "LOCK IN"}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="py-5 lg:border-l lg:border-r border-dashed border-gray-500 px-4 sm:px-6">
                    <p className="text-[#6C6C6C] text-[11px] font-mono">
                        // Click LOCK IN, type the PS ID to confirm. One selection per team — final.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PsSelection;
