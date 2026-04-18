"use client";
import { useEffect, useState } from "react";

export default function CountdownTimer() {
    const targetDate = new Date("2026-04-18T07:00:00+05:30").getTime();

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    // ── null on the server so SSR and client initial render match (both empty).
    // ── useEffect fires only on the client, sets the real value, then ticks.
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        // Set immediately so timer appears without a 1-second blank flash
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const boxStyle =
        "flex flex-col items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-md min-w-[70px]";

    // Render nothing until client hydrates — this is what prevents the mismatch
    if (!timeLeft) return null;

    return (
        <div className="flex gap-3 justify-center items-center mt-4 text-white">
            <div className={boxStyle}>
                <span className="text-xl font-semibold">{timeLeft.days}</span>
                <span className="text-xs">Days</span>
            </div>

            <div className={boxStyle}>
                <span className="text-xl font-semibold">{timeLeft.hours}</span>
                <span className="text-xs">Hours</span>
            </div>

            <div className={boxStyle}>
                <span className="text-xl font-semibold">{timeLeft.minutes}</span>
                <span className="text-xs">Min</span>
            </div>

            <div className={boxStyle}>
                <span className="text-xl font-semibold">{timeLeft.seconds}</span>
                <span className="text-xs">Sec</span>
            </div>
        </div>
    );
}