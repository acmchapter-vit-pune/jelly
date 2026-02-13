"use client";
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Title from "@/components/Title";
import rob_org from '../public/assets/rob_org.png';
import rob_blu from '../public/assets/rob_blu.png';
import box from '../public/assets/box.png';

const EventCard = ({ title, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="relative inline-block z-10 cursor-pointer"
        >
            <Image
                src={box}
                alt="event"
                className="w-[280px] h-[240px] sm:w-[340px] sm:h-[300px] lg:w-[450px] lg:h-[400px]"
            />
            <p className="absolute inset-0 flex items-center justify-center pt-30 text-[20px] sm:text-[26px] lg:text-[38px] sm:pt-50 font-[700] text-black">
                {title}
            </p>
        </motion.div>
    );
};

const EventDescription = ({ description, year, side }) => {
    const isRight = side === "right";
    
    return (
        <motion.div 
            initial={{ opacity: 0, x: isRight ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn(
                "relative z-10 max-w-[380px] sm:max-w-[420px] md:max-w-[450px]",
                isRight ? "ml-auto pr-8 sm:pr-10 md:pr-12" : "mr-auto pl-8 sm:pl-10 md:pl-12"
            )}
        >
            <div className={cn(
                "absolute top-0 bottom-0 flex items-center justify-center flex-shrink-0 z-20",
                isRight ? "right-0" : "left-0"
            )} style={{ width: "32px" }}>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[#EDC531] font-[800] text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] whitespace-nowrap"
                    style={{ transform: isRight ? "rotate(270deg)" : "rotate(90deg)" }}
                >
                    {year}
                </motion.div>
            </div>

            <p className={cn(
                "text-white text-[14px] sm:text-[15px] md:text-[17px] lg:text-[18px] font-[400] leading-relaxed mb-5 sm:mb-6",
                isRight ? "text-right" : "text-left"
            )}>
                {description}
            </p>

            <div className={cn("flex items-center gap-4", isRight ? "justify-end" : "justify-start")}>
                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-black border-l-4 border-b-4 border-[#EDC531] p-0.5 sm:p-1 md:p-1 lg:p-1.5 inline-block"
                >
                    <div className="bg-[#EDC531]">
                        <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] font-bold px-1.5 py-1 sm:px-2 sm:py-1 md:px-2 md:py-1.5 lg:px-2.5 lg:py-2 cursor-pointer text-center text-black">
                            Know More ↗
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const TimelineNode = () => {
    return (
        <div className="relative flex items-center justify-center">
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[#EDC531] border-4 border-black rounded-full z-20 relative pixel-art-shadow flex-shrink-0"
            />
        </div>
    );
};

const OurEvents = () => {
    const events = [
        { title: "Techakthon", description: "ACMOne streamlines operations for ACM VIT's 100+ organizing committee members by centralizing event planning.", year: "2019", side: "right" },
        { title: "Code Sprint", description: "A 48-hour coding marathon where participants solve real-world problems and build innovative solutions.", year: "2020", side: "left" },
        { title: "AI Workshop", description: "Hands-on workshop covering machine learning fundamentals and practical applications in modern technology.", year: "2021", side: "right" },
        { title: "Design Hack", description: "Creative design competition focusing on UI/UX principles and innovative visual solutions.", year: "2022", side: "left" },
        { title: "Tech Summit", description: "Annual technology conference featuring industry leaders and cutting-edge innovations.", year: "2023", side: "right" },
        { title: "Innovation Lab", description: "Collaborative space for students to prototype and develop their tech ideas with mentorship.", year: "2024", side: "left" },
    ];

    return (
        <div id={"events"} className="relative w-full min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
            {/* Grid background */}
            <div className={cn(
                "absolute inset-0 z-0",
                "[background-size:30px_30px] sm:[background-size:40px_40px] md:[background-size:50px_50px]",
                "[background-image:linear-gradient(to_right,rgba(164,126,27,0.28)_1px,transparent_1px),linear-gradient(to_bottom,rgba(164,126,27,0.45)_1px,transparent_1px)]",
            )} />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            {/* Decorative characters with floating animations */}
            <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden md:block absolute left-[-50px] top-[30%] z-10 pointer-events-none pt-35"
            >
                <Image src={rob_org} alt="robot" className="h-[200px] md:h-[300px] lg:h-[400px] w-auto rotate-[30deg]" />
            </motion.div>

            <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="hidden md:block absolute right-[-50px] top-[60%] z-10 pointer-events-none"
            >
                <Image src={rob_blu} alt="robot" className="h-[200px] md:h-[300px] lg:h-[400px] w-auto rotate-[-30deg]" />
            </motion.div>

            <div className="relative z-10 flex justify-center mb-10 sm:mb-14 md:mb-16">
                <Title title={"Our Events"} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Vertical Line with Draw-in effect */}
                <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gray-500/70" 
                />

                <div className="space-y-16 lg:space-y-2">
                    {events.map((event, index) => {
                        const isLeft = event.side === "left";
                        return (
                            <div key={index} className="relative grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-10">
                                {/* Connector Lines */}
                                <motion.div 
                                    initial={{ width: 0, opacity: 0 }}
                                    whileInView={{ width: "auto", opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className={cn(
                                        "hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-gray-500/70 z-0",
                                        isLeft ? "left-[280px] sm:left-[340px] lg:left-[450px]" : "right-[280px] sm:right-[340px] lg:right-[450px]"
                                    )} 
                                    style={{ [isLeft ? 'right' : 'left']: 'calc(50% + 20px)' }} 
                                />

                                <div className="hidden md:flex justify-end">
                                    <div className="relative w-full flex items-center justify-end">
                                        {isLeft ? <EventCard title={event.title} index={index} /> : <EventDescription {...event} />}
                                    </div>
                                </div>

                                <TimelineNode />

                                <div className="hidden md:flex justify-start">
                                    <div className="relative w-full flex items-center justify-start">
                                        {isLeft ? <EventDescription {...event} /> : <EventCard title={event.title} index={index} />}
                                    </div>
                                </div>

                                <div className="md:hidden flex flex-col items-center gap-4">
                                    <TimelineNode />
                                    <EventCard title={event.title} index={index} />
                                    <EventDescription {...event} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OurEvents;