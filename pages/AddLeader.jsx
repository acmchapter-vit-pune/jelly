"use client";

/**
 * pages/AddLeader.jsx — Admin: Manage Allowed Leaders Whitelist
 *
 * Route: /hackathon/addLeader
 * Protected by admin secret entered in the page itself.
 *
 * Features:
 *  - Paste multiple emails (one per line or comma-separated)
 *  - View current whitelist
 *  - Remove individual entries
 */

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

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
                            className="fixed bottom-6 right-4 z-[200] max-w-sm pointer-events-none">
                    <div className="border border-dashed bg-black px-5 py-4 rounded-lg shadow-2xl" style={{ borderColor: c.border }}>
                        <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: c.text }}>[{c.label}]</p>
                        <p className="text-white text-sm">{toast.message}</p>
                    </div>
                </motion.div>
            );
        })()}
    </AnimatePresence>
);

const AddLeader = () => {
    const [secret,      setSecret]      = useState("");
    const [authed,      setAuthed]      = useState(false);
    const [authError,   setAuthError]   = useState("");
    const [emailInput,  setEmailInput]  = useState("");
    const [leaders,     setLeaders]     = useState([]);
    const [isLoading,   setIsLoading]   = useState(false);
    const [isAdding,    setIsAdding]    = useState(false);
    const [removingId,  setRemovingId]  = useState(null);
    const [toast,       setToast]       = useState(null);
    const toastTimer = React.useRef(null);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 5000);
    };

    const fetchLeaders = async (s = secret) => {
        setIsLoading(true);
        try {
            const res  = await fetch(`/api/admin/allowed-leaders?secret=${encodeURIComponent(s)}`);
            const json = await res.json();
            if (json.success) { setLeaders(json.data); return true; }
            return false;
        } catch { return false; }
        finally { setIsLoading(false); }
    };

    const handleAuth = async () => {
        setAuthError("");
        if (!secret.trim()) { setAuthError("Secret is required."); return; }
        const ok = await fetchLeaders(secret.trim());
        if (ok) { setAuthed(true); }
        else    { setAuthError("Invalid secret or server error."); }
    };

    const handleAdd = async () => {
        setIsAdding(true);
        const raw = emailInput
            .split(/[\n,]+/)
            .map(e => e.trim().toLowerCase())
            .filter(e => e && e.includes("@"));

        if (raw.length === 0) { showToast("No valid emails found.", "error"); setIsAdding(false); return; }

        try {
            const res  = await fetch(`/api/admin/allowed-leaders?secret=${encodeURIComponent(secret)}`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ emails: raw }),
            });
            const json = await res.json();
            if (json.success) {
                showToast(`Added ${json.inserted} new · ${json.total - json.inserted} already existed.`, "success");
                setEmailInput("");
                await fetchLeaders();
            } else {
                showToast(json.error || "Failed to add.", "error");
            }
        } catch { showToast("Network error.", "error"); }
        finally { setIsAdding(false); }
    };

    const handleRemove = async (email) => {
        setRemovingId(email);
        try {
            const res  = await fetch(`/api/admin/allowed-leaders?secret=${encodeURIComponent(secret)}`, {
                method:  "DELETE",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ email }),
            });
            const json = await res.json();
            if (json.success) {
                setLeaders(prev => prev.filter(l => l.email !== email));
                showToast(`Removed ${email}`, "success");
            } else { showToast(json.error || "Failed.", "error"); }
        } catch { showToast("Network error.", "error"); }
        finally { setRemovingId(null); }
    };

    // ── Auth gate ─────────────────────────────────────────────────────────────
    if (!authed) {
        return (
            <div className="w-full min-h-screen bg-black text-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center px-4 py-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="border border-dashed border-gray-500 bg-black p-10 sm:p-14 max-w-md w-full rounded-xl">
                        <p className="text-[#6C6C6C] text-[10px] font-mono uppercase tracking-widest mb-3">[ADMIN ACCESS]</p>
                        <h1 className="hack text-[44px] sm:text-[52px] text-[#FF4600] leading-none mb-8">manage leaders</h1>
                        <input
                            type="password"
                            placeholder="ADMIN SECRET..."
                            value={secret}
                            onChange={e => { setSecret(e.target.value); setAuthError(""); }}
                            onKeyDown={e => e.key === "Enter" && handleAuth()}
                            className="w-full bg-black border border-dashed border-gray-600 px-4 py-3.5 outline-none focus:border-[#FF4600] transition-colors font-mono text-sm placeholder:text-gray-700 rounded-md mb-4"
                        />
                        <AnimatePresence>
                            {authError && (
                                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                                          exit={{ opacity: 0, height: 0 }} className="text-[#FF4600] text-xs font-mono mb-4">
                                    ✕ {authError}
                                </motion.p>
                            )}
                        </AnimatePresence>
                        <button onClick={handleAuth}
                                className="w-full py-3.5 border-2 border-[#FF4600] text-[#FF4600] font-bold uppercase tracking-widest text-sm hover:bg-[#FF4600] hover:text-black transition-all duration-300 rounded-md">
                            ENTER →
                        </button>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    // ── Main admin UI ─────────────────────────────────────────────────────────
    return (
        <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
            <Toast toast={toast} />
            <div className="relative w-full border-b border-dashed border-gray-500">
                <Navbar />
                <div className="flex flex-col px-4 sm:px-10 lg:px-[84px] border-t border-dashed border-gray-500">
                    <div className="flex flex-col gap-5 pt-10 pb-10 lg:pt-[80px] lg:border-l lg:border-r border-dashed border-gray-500">
                        <p className="ml-2 sm:ml-5 mt-[-10px] sm:mt-[-20px] text-[14px] sm:text-[20px] text-[#6C6C6C] uppercase tracking-widest">
                            [ADMIN — BREAKING ENIGMA]
                        </p>
                        <div className="pl-2 sm:pl-5 pr-2 sm:pr-5 pb-5 border-t border-b border-dashed border-gray-500">
                            <h1 className="hack text-[28px] sm:text-[48px] lg:text-[58px] text-[#FF4600] leading-tight">
                                allowed leaders
                            </h1>
                            <p className="text-gray-600 text-xs font-mono mt-1">
                                // {leaders.length} email{leaders.length !== 1 ? "s" : ""} in whitelist
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add section */}
            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="py-8 lg:border-l lg:border-r border-dashed border-gray-500 px-4 sm:px-8">
                    <p className="text-[#6C6C6C] text-[10px] font-mono uppercase tracking-widest mb-4">[ADD LEADERS]</p>
                    <p className="text-gray-500 text-xs font-mono mb-3">
                        Paste emails — one per line or comma-separated. Duplicates are ignored.
                    </p>
                    <textarea
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                        placeholder={"leader1@gmail.com\nleader2@gmail.com\nleader3@gmail.com"}
                        rows={6}
                        className="w-full max-w-xl bg-black border border-dashed border-gray-600 px-4 py-3 outline-none focus:border-[#FF4600] transition-colors font-mono text-sm placeholder:text-gray-800 rounded-md resize-y mb-4"
                    />
                    <br />
                    <button
                        onClick={handleAdd}
                        disabled={isAdding || !emailInput.trim()}
                        className="px-8 py-3 border-2 border-[#FF4600] text-[#FF4600] font-bold uppercase tracking-widest text-sm hover:bg-[#FF4600] hover:text-black transition-all duration-300 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {isAdding ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ADDING...
                            </span>
                        ) : "ADD LEADERS →"}
                    </button>
                </div>
            </div>

            {/* List section */}
            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="lg:border-l lg:border-r border-dashed border-gray-500">

                    <div className="px-4 sm:px-8 py-3 border-b border-dashed border-gray-800 flex items-center justify-between">
                        <p className="text-[#6C6C6C] text-[10px] font-mono uppercase tracking-widest">[WHITELIST]</p>
                        <button onClick={() => fetchLeaders()} disabled={isLoading}
                                className="text-gray-600 text-[10px] font-mono uppercase hover:text-white transition-colors">
                            {isLoading ? "REFRESHING..." : "↻ REFRESH"}
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="px-8 py-10 text-center">
                            <p className="text-gray-600 font-mono text-sm animate-pulse">LOADING...</p>
                        </div>
                    ) : leaders.length === 0 ? (
                        <div className="px-8 py-10 text-center">
                            <p className="text-gray-700 font-mono text-sm">No emails in whitelist yet.</p>
                        </div>
                    ) : (
                        leaders.map((leader, i) => (
                            <motion.div
                                key={leader._id || leader.email}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0  }}
                                exit={{ opacity: 0, x: 8 }}
                                transition={{ delay: i * 0.03 }}
                                className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-dashed border-gray-800 group"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-700 font-mono text-[11px] w-6 text-right flex-shrink-0">
                                        {i + 1}
                                    </span>
                                    <span className="font-mono text-sm text-white">{leader.email}</span>
                                </div>
                                <button
                                    onClick={() => handleRemove(leader.email)}
                                    disabled={removingId === leader.email}
                                    className="text-gray-700 text-[10px] font-mono uppercase hover:text-[#FF4600] transition-colors disabled:opacity-40 px-2 py-1 border border-dashed border-transparent hover:border-[#FF4600] rounded"
                                >
                                    {removingId === leader.email ? "..." : "REMOVE"}
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="py-5 lg:border-l lg:border-r border-dashed border-gray-500 px-4 sm:px-8">
                    <p className="text-[#6C6C6C] text-[11px] font-mono">
                        // Only whitelisted emails can register on /hackathon/psRegister.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AddLeader;
