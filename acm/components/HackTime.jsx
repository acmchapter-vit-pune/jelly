import React from "react";

const events = [
    {
        time: "18 Mar – 05 Apr",
        title: "Round 1: PPT Submission",
        desc: "Submit your project PPT via Unstop. Top 50 teams will be shortlisted."
    },
    {
        time: "05 Apr, 11:59 PM",
        title: "Registration & Submission Deadline",
        desc: "Last date to register and submit your PPT."
    },
    {
        time: "18 Apr, 07:00 AM",
        title: "Hackathon Begins",
        desc: "24-hour offline hackathon starts at VIT Pune."
    },
    {
        time: "18–19 Apr",
        title: "Build & Develop",
        desc: "Teams will build a working prototype based on problem statements revealed on the day."
    },
    {
        time: "19 Apr, 05:00 PM",
        title: "Final Evaluation & Closing",
        desc: "Project presentations, judging, and winner announcements."
    }
];

const HackTime = () => {
    return (
        <section className="bg-black text-white py-28 px-6 flex justify-center">
            <div className="relative w-full max-w-6xl">


                {/* VERTICAL LINE */}
                <div className="absolute left-1/2 top-0 h-full w-[2px] bg-blue-500/70 -translate-x-1/2"></div>

                {/* EVENTS */}
                <div className="space-y-24">
                    {events.map((event, i) => {
                        const left = i % 2 === 0;

                        return (
                            <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-center">

                                {/* LEFT */}
                                <div className={`pr-10 ${left ? "text-right" : "invisible md:visible"}`}>
                                    {left && (
                                        <>
                                            <p className="text-blue-400 font-semibold">{event.time}</p>
                                            <p className="tracking-widest text-sm sm:text-base font-medium">
                                                {event.title}
                                            </p>
                                            <p className="text-white/60 text-xs sm:text-sm mt-1 leading-relaxed">
                                                {event.desc}
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* DOT */}
                                <div className="flex justify-center">
                                    <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-black shadow-[0_0_14px_#3b82f6] transition-transform duration-300 hover:scale-125"></div>
                                </div>

                                {/* RIGHT */}
                                <div className={`pl-10 ${!left ? "text-left" : "invisible md:visible"}`}>
                                    {!left && (
                                        <>
                                            <p className="text-blue-400 font-semibold">{event.time}</p>
                                            <p className="tracking-widest text-sm sm:text-base font-medium">
                                                {event.title}
                                            </p>
                                            <p className="text-white/60 text-xs sm:text-sm mt-1 leading-relaxed">
                                                {event.desc}
                                            </p>
                                        </>
                                    )}
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default HackTime;