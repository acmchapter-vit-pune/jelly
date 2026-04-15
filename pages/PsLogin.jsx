"use client";

/**
 * pages/PsLogin.jsx — Leader Login Page
 *
 * Route: /hackathon/psLogin
 * Validates email + password against MongoDB via POST /api/auth/leader.
 * On success → redirects to /hackathon/psSelection.
 * Has link to /hackathon/psRegister for first-time users.
 */

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const PsLogin = () => {
    const router = useRouter();
    const [email,        setEmail]        = useState("");
    const [password,     setPassword]     = useState("");
    const [error,        setError]        = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checking,     setChecking]     = useState(true);
    const emailRef = useRef(null);

    // If already logged in, skip to selection
    useEffect(() => {
        fetch("/api/auth/leader")
            .then(r => r.json())
            .then(json => {
                if (json.valid) router.replace("/hackathon/psSelection");
                else { setChecking(false); setTimeout(() => emailRef.current?.focus(), 100); }
            })
            .catch(() => { setChecking(false); });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleLogin = async () => {
        setError("");
        if (!email.trim())    { setError("Email is required.");    return; }
        if (!password.trim()) { setError("Password is required."); return; }

        setIsSubmitting(true);
        try {
            const res  = await fetch("/api/auth/leader", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ email: email.trim(), password: password.trim() }),
            });
            const json = await res.json();
            if (json.valid) {
                router.push("/hackathon/psSelection");
            } else {
                setError(json.error || "Authentication failed.");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (checking) {
        return (
            <div className="w-full min-h-screen bg-black flex items-center justify-center">
                <p className="text-gray-600 font-mono text-sm animate-pulse">CHECKING SESSION...</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-black text-white flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0  }}
                    transition={{ duration: 0.4 }}
                    className="border border-dashed border-gray-500 bg-black p-10 sm:p-14 max-w-md w-full rounded-xl"
                >
                    <p className="text-[#6C6C6C] text-[10px] font-mono uppercase tracking-widest mb-3">
                        [LEADER PORTAL — BREAKING ENIGMA]
                    </p>
                    <h1 className="hack text-[44px] sm:text-[56px] text-[#F5B301] leading-none mb-1">
                        login
                    </h1>
                    <p className="text-gray-600 text-xs font-mono mb-10">
                        // enter credentials you set during registration
                    </p>

                    <div className="flex flex-col gap-3 mb-4">
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="LEADER EMAIL..."
                            value={email}
                            onChange={e => { setEmail(e.target.value); setError(""); }}
                            onKeyDown={e => e.key === "Enter" && handleLogin()}
                            className="w-full bg-black border border-dashed border-gray-600 px-4 py-3.5 outline-none focus:border-[#F5B301] transition-colors font-mono text-sm placeholder:text-gray-700 rounded-md"
                        />
                        <input
                            type="password"
                            placeholder="PASSWORD..."
                            value={password}
                            onChange={e => { setPassword(e.target.value); setError(""); }}
                            onKeyDown={e => e.key === "Enter" && handleLogin()}
                            className="w-full bg-black border border-dashed border-gray-600 px-4 py-3.5 outline-none focus:border-[#F5B301] transition-colors font-mono text-sm placeholder:text-gray-700 rounded-md"
                        />
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{    opacity: 0, height: 0    }}
                                className="text-[#FF4600] text-xs font-mono mb-4 leading-snug"
                            >
                                ✕ {error}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={handleLogin}
                        disabled={isSubmitting}
                        className="w-full py-3.5 border-2 border-[#F5B301] text-[#F5B301] font-bold uppercase tracking-widest text-sm hover:bg-[#F5B301] hover:text-black transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-wait mb-6"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                LOGGING IN...
                            </span>
                        ) : "LOGIN →"}
                    </button>

                    <div className="border-t border-dashed border-gray-800 pt-6 text-center">
                        <p className="text-gray-600 text-xs font-mono mb-2">First time here?</p>
                        <Link
                            href="/hackathon/psRegister"
                            className="text-[#7DA942] text-xs font-mono uppercase tracking-widest hover:underline transition-all"
                        >
                            REGISTER YOUR TEAM →
                        </Link>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default PsLogin;
