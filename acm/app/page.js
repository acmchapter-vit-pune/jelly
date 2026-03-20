"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

import HeroSection from "@/pages/HeroSection";
import AboutVIT from "@/pages/AboutVIT";
import AboutACM from "@/pages/AboutACM";
import Domains from "@/pages/Domains";
import Footer from "@/components/Footer";
import OurEvents from "@/pages/OurEvents";
import Gallery from "@/pages/Gallery";
import TeamPage from "@/pages/TeamPage";

export default function Home() {
    const [loading, setLoading] = useState(true);

    // Handle hash scrolling
    useEffect(() => {
        if (window.location.hash) {
            const el = document.querySelector(window.location.hash);
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
            }
        }
    }, []);

    // Loader logic (ONLY FIRST VISIT)
    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisited");

        if (hasVisited) {
            setLoading(false); // skip loader
        } else {
            sessionStorage.setItem("hasVisited", "true");

            const timer = setTimeout(() => {
                setLoading(false);
            }, 3000); // you can reduce from 7000 → 3000 (better UX)

            return () => clearTimeout(timer);
        }
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="w-full overflow-x-hidden">
            <HeroSection />
            <AboutVIT />
            <AboutACM />
            <Domains />
            <OurEvents />
            <Gallery />
            <TeamPage />
            <Footer />
        </div>
    );
}