"use client";

/**
 * components/PsButton.jsx — PS selection navigation button (always enabled)
 */

import Link from "next/link";

export default function PsButton() {
    return (
        <Link
            href="/hackathon/psRevealPage"
            className="inline-block px-6 py-2.5 border-2 border-white rounded-lg text-sm sm:text-base font-medium text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg active:scale-95"
        >
            SELECT PS
        </Link>
    );
}
