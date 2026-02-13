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

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 7000); // 10 seconds

        return () => clearTimeout(timer);
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
