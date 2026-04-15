"use client";
import React, { useState } from "react";
import Image from "next/image";
import nav_logo from "../public/assets/nav_logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();

        // HOME button
        if (targetId === "/") {
            router.push("/");
            closeMenu();
            return;
        }

        // If already on home page → smooth scroll
        if (pathname === "/") {
            const el = document.querySelector(targetId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
        // If on another page → navigate with hash
        else {
            router.push(`/${targetId}`);
        }

        closeMenu();
    };

    const navLinks = [
        { name: "Home", id: "/" },
        { name: "About", id: "#about" },
        { name: "Domains", id: "#domains" },
        { name: "Events", id: "#events" },
        { name: "Gallery", id: "#gallery" },
        { name: "Team", id: "#team" },
    ];

    return (
        <nav className="relative flex items-center justify-between py-3 sm:py-4 px-4 sm:px-8 md:px-12 z-50 text-white">

            {/* Logo */}
            <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-lg font-bold cursor-pointer"
                onClick={() => router.push("/")}
            >
                <Image
                    src={nav_logo}
                    alt="ACM"
                    className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] drop-shadow-md"
                />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                {navLinks.map((link, index) => (
                    <motion.a
                        key={link.name}
                        href={link.id}
                        onClick={(e) => handleSmoothScroll(e, link.id)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative text-[18px] xl:text-[22px] font-bold cursor-pointer hover:text-[#A47E1B] transition-colors group"
                    >
                        {link.name}
                        <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#A47E1B] transition-all duration-300 group-hover:w-full" />
                    </motion.a>
                ))}

                {/* Contact Us Button */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#EDC531] rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:bg-[#DBB42C] transition-colors"
                >
                    <p
                        onClick={() => router.push('/contactUs')}
                        className="text-[18px] xl:text-[22px] font-bold text-black px-4 py-2 cursor-pointer"
                    >
                        Contact Us
                    </p>
                </motion.div>
            </div>

            {/* Hamburger */}
            <button
                onClick={toggleMenu}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 z-50 focus:outline-none"
                aria-label="Toggle menu"
            >
                <motion.span
                    animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    className="block w-8 h-1 bg-current mb-1.5 rounded-full"
                />
                <motion.span
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block w-8 h-1 bg-current mb-1.5 rounded-full"
                />
                <motion.span
                    animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    className="block w-8 h-1 bg-current rounded-full"
                />
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-black z-40 lg:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8 text-white">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                    href={link.id}
                                    onClick={(e) => handleSmoothScroll(e, link.id)}
                                    className="text-[32px] font-extrabold cursor-pointer hover:text-[#A47E1B]"
                                >
                                    {link.name}
                                </motion.a>
                            ))}

                            {/* Contact Us Button (Mobile) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 }}
                                className="bg-[#EDC531] rounded-[5px] border-4 border-black mt-4"
                            >
                                <p
                                    onClick={(e) => handleSmoothScroll(e, "#contact")}
                                    className="text-[28px] font-bold text-black px-8 py-4 cursor-pointer"
                                >
                                    Contact Us
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;