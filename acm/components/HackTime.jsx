import React from "react";

const events = [
    { time: "12:25 PM", title: "CHECK-IN" },
    { time: "12:40 PM", title: "OPENING NOTE" },
    { time: "01:00 PM", title: "APEXIA UNVEILING" },
    { time: "01:20 PM", title: "CONVERGE PATHS" },
    { time: "02:00 PM", title: "DISCOVER & CONNECT" },
    { time: "02:25 PM", title: "CLOSING & SWAG" },
];

const HackTime = () => {
    return (
        <section className="bg-black text-white py-28 flex justify-center">
            <div className="relative w-full max-w-6xl">

                {/* vertical line */}
                <div className="absolute left-1/2 top-0 h-full w-[2px] bg-blue-500/70 -translate-x-1/2"></div>

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
                                            <p className="tracking-widest">{event.title}</p>
                                        </>
                                    )}
                                </div>

                                {/* DOT */}
                                <div className="flex justify-center">
                                    <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-black shadow-[0_0_14px_#3b82f6]"></div>
                                </div>

                                {/* RIGHT */}
                                <div className={`pl-10 ${!left ? "text-left" : "invisible md:visible"}`}>
                                    {!left && (
                                        <>
                                            <p className="text-blue-400 font-semibold">{event.time}</p>
                                            <p className="tracking-widest">{event.title}</p>
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