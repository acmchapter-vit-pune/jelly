"use client"; // Required in Next.js App Router for state/effects

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ShortlistButton() {
    // Set your exact target release time here (e.g., Midnight of a specific date)
    const targetDate = new Date("2026-04-08T00:00:00").getTime();

    const [timeLeft, setTimeLeft] = useState("");
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        // Check the time immediately on mount
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                setIsUnlocked(true);
                setTimeLeft("");
                return true; // Signals the interval to stop
            }

            // Calculate time remaining
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Pad with zeroes (e.g., "04:09:05")
            const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

            setTimeLeft(`in ${formattedTime}`);
            return false;
        };

        // Run once immediately, then start interval
        const isFinished = updateTimer();
        if (isFinished) return;

        const intervalId = setInterval(() => {
            const finished = updateTimer();
            if (finished) clearInterval(intervalId);
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [targetDate]);

    return (
        <Link
            href={isUnlocked ? "/hackathon/shortlists" : "#"}
            // Prevent default navigation just in case someone forces a click
            onClick={(e) => {
                if (!isUnlocked) e.preventDefault();
            }}
            className={`inline-block px-6 py-2.5 border-2 border-white rounded-lg text-sm sm:text-base font-medium text-white transition-all duration-300 ease-in-out ${
                isUnlocked
                    ? "hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg active:scale-95"
                    : "opacity-60 cursor-not-allowed pointer-events-none"
            }`}
        >
            {isUnlocked ? "SHORTLISTS" : `SHORTLISTS ${timeLeft}`}
        </Link>
    );
}