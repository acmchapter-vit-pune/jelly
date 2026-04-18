"use client";

/**
 * pages/PsRegister.jsx — Leader Registration Page
 *
 * Route: /hackathon/psRegister
 * Fields: Team Name, Email (must be whitelisted), Password, Re-enter Password
 * On success → redirects to /hackathon/psLogin.
 * Email must be in ALLOWED_LEADER_EMAILS — validated server-side.
 */

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const PsRegister = () => {
    const router    = useRouter();
    const teamRef   = useRef(null);

    const [form, setForm] = useState({
        teamName:        "",
        email:           "",
        password:        "",
        confirmPassword: "",
    });
    const [error,        setError]        = useState("");
    const [success,      setSuccess]      = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => { setTimeout(() => teamRef.current?.focus(), 100); }, []);

    const update = (field) => (e) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
        setError("");
    };

    const handleRegister = async () => {
        setError(""); setSuccess("");

        if (!form.teamName.trim())        { setError("Team name is required.");         return; }
        if (!form.email.trim())           { setError("Email is required.");             return; }
        if (!form.password.trim())        { setError("Password is required.");          return; }
        if (form.password.length < 6)     { setError("Password must be 6+ characters."); return; }
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res  = await fetch("/api/auth/register", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({
                    teamName:        form.teamName.trim(),
                    email:           form.email.trim(),
                    password:        form.password.trim(),
                    confirmPassword: form.confirmPassword.trim(),
                }),
            });
            const json = await res.json();
            if (json.success) {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => router.push("/hackathon/psLogin"), 1800);
            } else {
                setError(json.error || "Registration failed.");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const fields = [
        { key: "teamName",        label: "TEAM NAME",        type: "text",     placeholder: "TEAM NAME..."         },
        { key: "email",           label: "LEADER EMAIL",     type: "email",    placeholder: "REGISTERED EMAIL..."  },
        { key: "password",        label: "PASSWORD",         type: "password", placeholder: "CREATE PASSWORD..."   },
        { key: "confirmPassword", label: "CONFIRM PASSWORD", type: "password", placeholder: "RE-ENTER PASSWORD..." },
    ];

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
                        [REGISTER — BREAKING ENIGMA]
                    </p>
                    <h1 className="hack text-[44px] sm:text-[56px] text-[#7DA942] leading-none mb-1">
                        register
                    </h1>
                    <p className="text-gray-600 text-xs font-mono mb-10">
                        // only registered event emails can sign up
                    </p>

                    <div className="flex flex-col gap-3 mb-4">
                        {fields.map(({ key, type, placeholder }, i) => (
                            <input
                                key={key}
                                ref={i === 0 ? teamRef : undefined}
                                type={type}
                                placeholder={placeholder}
                                value={form[key]}
                                onChange={update(key)}
                                onKeyDown={e => e.key === "Enter" && handleRegister()}
                                className="w-full bg-black border border-dashed border-gray-600 px-4 py-3.5 outline-none focus:border-[#7DA942] transition-colors font-mono text-sm placeholder:text-gray-700 rounded-md"
                            />
                        ))}
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
                        {success && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{    opacity: 0, height: 0    }}
                                className="text-[#7DA942] text-xs font-mono mb-4 leading-snug"
                            >
                                ✓ {success}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={handleRegister}
                        disabled={isSubmitting || !!success}
                        className="w-full py-3.5 border-2 border-[#7DA942] text-[#7DA942] font-bold uppercase tracking-widest text-sm hover:bg-[#7DA942] hover:text-black transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-wait mb-6"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                REGISTERING...
                            </span>
                        ) : "REGISTER"}
                    </button>

                    <div className="border-t border-dashed border-gray-800 pt-6 text-center">
                        <p className="text-gray-600 text-xs font-mono mb-2">Already registered?</p>
                        <Link
                            href="/hackathon/psLogin"
                            className="text-[#F5B301] text-xs font-mono uppercase tracking-widest hover:underline"
                        >
                            LOGIN HERE
                        </Link>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default PsRegister;
