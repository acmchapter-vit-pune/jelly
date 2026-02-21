"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const faqs = [
    {
        q: "What are the benefits of attending Converge?",
        a: "You'll network with innovators, learn from industry experts, and discover opportunities in tech and marketing."
    },
    {
        q: "Who's the mastermind behind Converge?",
        a: "The event is organized by our college technical committee and innovation cell."
    },
    {
        q: "I'm new to tech and marketing. Is Converge still for me?",
        a: "Absolutely! The event is beginner friendly and designed to spark curiosity."
    },
    {
        q: "Will I get any swags?",
        a: "Yes — attendees receive exclusive swags and goodies."
    },
    {
        q: "Is there any entry fee?",
        a: "No. The event is completely free."
    },
    {
        q: "Okay, you've convinced me. How do I sign up?",
        a: "Click the register button at the top of the page and fill the form."
    }
];

export default function Faqs() {
    const [open, setOpen] = useState(null);

    const toggle = (index) => {
        setOpen(open === index ? null : index);
    };

    return (
        <section className="bg-black text-white py-24 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

                {faqs.map((item, i) => (
                    <div
                        key={i}
                        className="border border-white/30 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-white"
                        onClick={() => toggle(i)}
                    >
                        {/* QUESTION */}
                        <div className="flex items-center justify-between">
                            <p className="tracking-wide">{item.q}</p>

                            <ChevronRight
                                className={`transition-transform duration-300 ${
                                    open === i ? "rotate-90" : ""
                                }`}
                            />
                        </div>

                        {/* ANSWER */}
                        <div
                            className={`grid transition-all duration-300 ${
                                open === i
                                    ? "grid-rows-[1fr] opacity-100 mt-4"
                                    : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div className="overflow-hidden text-white/70 text-sm">
                                {item.a}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}