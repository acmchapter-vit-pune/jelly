"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const faqs = [
    {
        q: "What is Breaking Enigma hackathon?",
        a: "Breaking Enigma is a 24-hour hackathon organized by the ACM Student Chapter of VIT Pune, focused on innovation, creativity, and solving real-world problems."
    },
    {
        q: "What is the registration and submission deadline?",
        a: "The deadline for registration and Round 1 (PPT submission) is 04 April 2026."
    },
    {
        q: "What is the selection process?",
        a: "Round 1 involves submitting a project PPT. Based on evaluation, around 50 teams will be shortlisted for the final offline hackathon."
    },
    {
        q: "What should be included in the Round 1 PPT?",
        a: "Your PPT should include the problem statement, proposed solution, technology stack, implementation overview, and impact/use case. A demo video link is optional but recommended."
    },
    {
        q: "Do we need to submit code in Round 1?",
        a: "No, only a PowerPoint presentation is required in Round 1. No source code or repository links are needed."
    },
    {
        q: "When and where is the final round?",
        a: "The final round will be held offline from 18–19 April 2026 at Vishwakarma Institute of Technology Pune – Bibwewadi Campus."
    },
    {
        q: "What happens in the final round?",
        a: "Shortlisted teams will participate in a 24-hour hackathon where they must build a working prototype based on problem statements revealed on the event day."
    },
    {
        q: "Is there any registration fee?",
        a: "Yes, only shortlisted teams need to pay ₹500 per team to participate in the final round."
    },
    {
        q: "Will accommodation and food be provided?",
        a: "Yes, one-night accommodation, one-time dinner, and refreshments will be provided to participants during the hackathon."
    },
    {
        q: "Who can participate in the hackathon?",
        a: "The hackathon is open to undergraduate and postgraduate students from recognized colleges with a valid college ID."
    },
    {
        q: "Are inter-college or inter-specialization teams allowed?",
        a: "Yes, both inter-college and inter-specialization teams are allowed."
    },
    {
        q: "What is the team size?",
        a: "Each team must consist of 3 to 4 members, and a participant can join only one team."
    },
    {
        q: "Are there any important rules to follow?",
        a: "Yes, participants must carry valid college ID, avoid plagiarism, and build their solution within the given hackathon duration. Judges' decisions will be final."
    },
    {
        q: "Will participants receive certificates or prizes?",
        a: "Yes, all finalist teams will receive certificates, and winners and runners-up will be awarded prizes."
    }
];

export default function Faqs() {
    const [open, setOpen] = useState(null);

    const toggle = (index) => {
        setOpen(open === index ? null : index);
    };

    return (
        <section className="bg-black text-white py-24 px-6">
            <div className="max-w-6xl mx-auto">

                {/* FAQ GRID */}
                <div className="grid md:grid-cols-2 gap-6">

                    {faqs.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => toggle(i)}
                            className={`
                                group cursor-pointer
                                rounded-2xl p-5
                                border border-white/20
                                backdrop-blur-md
                                bg-white/5
                                transition-all duration-300 ease-in-out
                                hover:bg-white/10 hover:border-white/40
                                hover:shadow-xl hover:shadow-white/10
                                ${open === i ? "border-white bg-white/10" : ""}
                            `}
                        >
                            {/* QUESTION */}
                            <div className="flex items-start justify-between gap-4">
                                <p className="tracking-wide text-sm sm:text-base font-medium group-hover:text-white">
                                    {item.q}
                                </p>

                                <ChevronRight
                                    className={`
                                        min-w-[20px]
                                        transition-transform duration-300 ease-in-out
                                        ${open === i ? "rotate-90 text-white" : "text-white/60"}
                                    `}
                                />
                            </div>

                            {/* ANSWER */}
                            <div
                                className={`
                                    grid transition-all duration-300 ease-in-out
                                    ${open === i
                                    ? "grid-rows-[1fr] opacity-100 mt-4"
                                    : "grid-rows-[0fr] opacity-0"}
                                `}
                            >
                                <div className="overflow-hidden text-white/70 text-sm leading-relaxed">
                                    {item.a}
                                </div>
                            </div>

                            {/* BOTTOM GLOW LINE */}
                            <div
                                className={`
                                    h-[1px] mt-4 bg-gradient-to-r from-transparent via-white/40 to-transparent
                                    transition-opacity duration-300
                                    ${open === i ? "opacity-100" : "opacity-0"}
                                `}
                            />
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}