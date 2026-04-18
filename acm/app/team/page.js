"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import Title from "@/components/Title";

// Import Assets (Keeping all your imports exactly as they were)
import man from "@/public/assets/team/man.jpg";
import woman from "@/public/assets/team/woman.png";
import faculty1 from "@/public/assets/team/disha_mam.png";
import faculty2 from "@/public/assets/team/prashant_sir.png";
import anvay from "@/public/assets/team/anvay.png";
import swanandi from "@/public/assets/team/swanandi.jpeg";
import tejas from "@/public/assets/team/tejas.png";
import palak from "@/public/assets/team/palak.jpeg";
import shatavali from "@/public/assets/team/shatavali.jpg";
import atharva from "@/public/assets/team/atharva.jpg";
import vedantshingote from "@/public/assets/team/vedantshingote.jpg";
import abhishek from "@/public/assets/team/abhishek.jpg";
import gajanan from "@/public/assets/team/gajanan.jpeg";
import prithviraj from "@/public/assets/team/prithviraj.png";
import soham from "@/public/assets/team/soham.jpg";
import amruta from "@/public/assets/team/amruta.png";
import dhanashri from "@/public/assets/team/dhanashri.jpg";
import vedantmulmule from "@/public/assets/team/vedantmulmule.png";
import yashchaware from "@/public/assets/team/yashchaware.jpg";
import shivam from "@/public/assets/team/shivam.jpg";
import achala from "@/public/assets/team/achala.jpg";
import sudiksha from "@/public/assets/team/sudiksha.jpg";
import atharvabhajan from "@/public/assets/team/atharvabhajan.jpeg";
import snehal from "@/public/assets/team/snehal.jpg";
import siddhant from "@/public/assets/team/siddhant.jpeg";
import atharvvaidya from "@/public/assets/team/atharvvaidya.jpg";
import tanushka from "@/public/assets/team/tanushka.png";
import mahi from "@/public/assets/team/mahi.jpg";
import harsh from "@/public/assets/team/harsh.jpg";
import vedantshendge from "@/public/assets/team/vedantshendge.png";
import namrata from "@/public/assets/team/namrata.jpg";
import shreyas from "@/public/assets/team/shreyas.jpeg";
import rohan from "@/public/assets/team/rohan.png";
import rajesh from "@/public/assets/team/rajesh.png";
import Navbar from "@/components/Navbar";

const FacultyCard = ({ name, position, image }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center w-full max-w-[21.875rem] py-4"
        >
            <div className="group relative flex flex-col items-center w-full p-6 rounded-xl bg-[#111111]/80 backdrop-blur-xl border border-[#A47E1B]/30 shadow-[0_0_80px_rgba(164,126,27,0.1)] hover:border-[#EDC531]/60 hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2">
                <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-t from-[#A47E1B]/10 via-transparent to-transparent blur-xl transition-opacity duration-500" />
                <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-lg border border-white/10">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        quality={95}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                </div>
                <h3 className="text-[22px] font-bold mb-1 text-white transition-all duration-500 group-hover:text-[#EDC531]">
                    {name}
                </h3>
                <p className="text-[16px] font-medium text-[#FFF6D6]/60">
                    {position}
                </p>
                <span className="mt-3 h-0.5 w-10 rounded-full bg-[#A47E1B]/60 transition-all duration-500 group-hover:w-20 group-hover:bg-[#EDC531]" />
            </div>
        </motion.div>
    );
};

const TeamMemberCard = ({ name, position, linkedin = "", github = "", email = "", imageSrc, priority = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#A47E1B]/20 bg-[#0a0a0a] p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-[#EDC531]/50 hover:shadow-[0_20px_50px_rgba(164,126,27,0.2)]"
        >
            <div className="relative flex flex-row items-center gap-6">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-[#A47E1B]/30 bg-black transition-all duration-500 group-hover:scale-105 group-hover:border-[#EDC531]">
                    <Image
                        src={imageSrc}
                        alt={name}
                        fill
                        sizes="112px"
                        priority={priority}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
                <div className="relative flex flex-1 flex-col items-start justify-center">
                    <div className="mb-3 text-left">
                        <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#EDC531]">
                            {name}
                        </h3>
                        <p className="text-sm font-medium text-[#FFF6D6]/70">
                            {position}
                        </p>
                    </div>
                    <div className="mt-1 flex gap-3 opacity-60 transition-all duration-500 group-hover:opacity-100">
                        {linkedin && (
                            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#EDC531] transition-colors">
                                <Linkedin size={18} />
                            </a>
                        )}
                        {github && (
                            <a href={github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#EDC531] transition-colors">
                                <Github size={18} />
                            </a>
                        )}
                        {email && (
                            <a href={`mailto:${email}`} className="text-white hover:text-[#EDC531] transition-colors">
                                <Mail size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Page = () => {
    const members = [
        // Core Team
        { name: "Anvay Kulkarni", position: "President", group: "Core Team", email: "anvay.22311927@viit.ac.in", github: "https://github.com/Anvay14", linkedin: "https://www.linkedin.com/in/anvay-kulkarni-609662279/", imageSrc: anvay },
        { name: "Swanandi Kamat", position: "Secretary", group: "Core Team", email: "swanandi.22310424@viit.ac.in", github: "https://github.com/swanandikamat", linkedin: "https://www.linkedin.com/in/swanandi-kamat-86aa152a6/", imageSrc: swanandi },
        { name: "Tejas Dherange", position: "Treasurer", group: "Core Team", email: "tejas.22310593@viit.ac.in", github: "https://github.com/Tejas-Dherange", linkedin: "https://www.linkedin.com/in/tejas-dherange-54a6a627b", imageSrc: tejas },
        { name: "Shatavali Bahadure", position: "Event Coordinator", group: "Core Team", email: "shatavali.22310364@viit.ac.in", github: "https://github.com/Shatavali05", linkedin: "https://www.linkedin.com/in/shatavali-bahadure-172509291/", imageSrc: shatavali },
        { name: "Palak Gudgila", position: "Public Relations Officer", group: "Core Team", email: "palak.22311889@viit.ac.in", github: "https://github.com/palak-gudgila", linkedin: "https://www.linkedin.com/in/palak-gudgila/", imageSrc: palak },

        // Technical & Web
        { name: "Vedant Shendge", position: "Co-Tech Head", group: "Technical & Web", email: "vedant.22310585@viit.ac.in", github: "https://github.com/vedant-shendge", linkedin: "https://www.linkedin.com/in/vedant-shendge-a1258b2b4/", imageSrc: vedantshendge },
        { name: "Vedant Shingote", position: "Co-Tech Head", group: "Technical & Web", email: "vedant.22310590@viit.ac.in", github: "https://github.com/Vedant-Shingote", linkedin: "https://www.linkedin.com/in/vedant-shingote-1827802a8/", imageSrc: vedantshingote },
        { name: "Gajanan Tongale", position: "Jt-Tech Head", group: "Technical & Web", email: "rajendra.22311256@viit.ac.in", github: "https://github.com/GajananTongale", linkedin: "https://www.linkedin.com/in/gajanan-tongale-828a2b33b/", imageSrc: gajanan },
        { name: "Prithviraj Patil", position: "Jt-Tech Head", group: "Technical & Web", email: "prithvirajpatil495@gmail.com", github: "https://github.com/Prithvi2321", linkedin: "https://www.linkedin.com/in/prithviraj-patil-3a1814330/", imageSrc: prithviraj },
        { name: "Abhishek Kadu", position: "Web Master", group: "Technical & Web", email: "abhishek.22311167@viit.ac.in", github: "https://github.com/ak8457417", linkedin: "https://www.linkedin.com/in/abhishek-kadu1/", imageSrc: abhishek },
        { name: "Atharva Belavanki", position: "Jt-Web Master", group: "Technical & Web", email: "atharva.22311353@viit.ac.in", github: "https://github.com/atharvabelavanki", linkedin: "https://www.linkedin.com/in/atharva-belavanki-4565932b4/", imageSrc: atharva },

        // Design, Content & Documentation
        { name: "Akshay Nazare", position: "Design Head", group: "Design, Content & Documentation", email: "akshay.1252030015@vit.edu", github: "https://github.com/akshay-nazare", linkedin: "https://www.linkedin.com/in/akshay-nazare", imageSrc: man },
        { name: "Shivam Shinde", position: "Jt-Design Head", group: "Design, Content & Documentation", email: "shivam.22310019@viit.ac.in", github: "https://github.com/Shivam-codex", linkedin: "https://www.linkedin.com/in/shivam-shinde-08a181289/", imageSrc: shivam },
        { name: "Soham Zinjurke", position: "Content Head", group: "Design, Content & Documentation", email: "soham.22311620@viit.ac.in", github: "https://github.com/soham-zinjurke", linkedin: "https://www.linkedin.com/in/sohamzinjurke/", imageSrc: soham },
        { name: "Vedant Mulmule", position: "Documentation Head", group: "Design, Content & Documentation", email: "vedant.mulmule23@vit.edu", github: "https://github.com/vedant-mulmule", linkedin: "https://www.linkedin.com/in/vedant-mulmule-6732642b8/", imageSrc: vedantmulmule },
        { name: "Dhanashri Karad", position: "Jt-Documentation Head", group: "Design, Content & Documentation", email: "dhanashrikarad19@gmail.com", github: "https://github.com/DhanashriKarad", linkedin: "https://www.linkedin.com/in/dhanashri-karad/", imageSrc: dhanashri },
        { name: "Vedika Budhwat", position: "Design Team Member", group: "Design, Content & Documentation", email: "vedika.1251100127@vit.edu", github: "https://github.com/vedikabudhwat07-eng", linkedin: "https://www.linkedin.com/in/vedika-budhwat-946b03385/", imageSrc: woman },
        { name: "Yash Chaware", position: "Documentation Team Member", group: "Design, Content & Documentation", email: "yash.1251080031@vit.edu", github: "https://github.com/yash-chaware", linkedin: "https://www.linkedin.com/in/yash-chaware/", imageSrc: yashchaware },
        { name: "Amruta Gavade", position: "Documentation Team Member", group: "Design, Content & Documentation", email: "amrutagavade007@gmail.com", github: "https://www.linkedin.com/in/amruta-gavade-", linkedin: "https://www.linkedin.com/in/amrutagavade007-oss/", imageSrc: amruta },

        // Event & Publicity
        { name: "Sudiksha Pardeshi", position: "Co-Event Head", group: "Event & Publicity", email: "sudiksha.22310260@viit.ac.in", github: "https://github.com/sudiksha-pardeshi", linkedin: "https://www.linkedin.com/in/sudiksha-pardeshi-011b93386/", imageSrc: sudiksha },
        { name: "Achala Patil", position: "Co-Event Head", group: "Event & Publicity", email: "achala.patil24@vit.edu", github: "https://github.com/Achala-Patil", linkedin: "https://www.linkedin.com/in/achala-patil-718152283/", imageSrc: achala },
        { name: "Atharva Bhajan", position: "Jt-Event Head", group: "Event & Publicity", email: "atharvabhajan0574@gmail.com", github: "https://github.com/Atharvabhajan", linkedin: "https://www.linkedin.com/in/atharvabhajan/", imageSrc: atharvabhajan },
        { name: "Shreyas Khanore", position: "Jt-Event Head", group: "Event & Publicity", email: "shreyas.khanore24@vit.edu", github: "https://github.com/shreyas-khanore", linkedin: "https://www.linkedin.com/in/shreyas-khanore/", imageSrc: shreyas },
        { name: "Namrata Devare", position: "Publicity Head", group: "Event & Publicity", email: "namratadevare5@gmail.com", github: "https://github.com/namrata-devare", linkedin: "https://www.linkedin.com/in/namrata-devare/", imageSrc: namrata },
        { name: "Snehal Bomble", position: "Jt-Publicity Head", group: "Event & Publicity", email: "snehal.1252030031@vit.edu", github: "https://github.com/Snehalbomble27", linkedin: "https://www.linkedin.com/in/snehal-bomble-887b73329/", imageSrc: snehal },
        { name: "Siddhant Ukarde", position: "Jt-Publicity Head", group: "Event & Publicity", email: "siddhant.ukarde24@vit.edu", github: "https://github.com/siddhant-ukarde", linkedin: "https://www.linkedin.com/in/siddhant-ukarde/", imageSrc: siddhant },
        { name: "Atharv Vaidya", position: "Event team member", group: "Event & Publicity", email: "atharvaidya007@gmail.com", github: "https://github.com/AthvaCodes", linkedin: "https://www.linkedin.com/in/atharv-vaidya-094b69386/", imageSrc: atharvvaidya },
        { name: "Tanushka Patil", position: "Event team member", group: "Event & Publicity", email: "tanushka.spatil1987@gmail.com", github: "https://github.com/Tanushka-sp2007", linkedin: "https://www.linkedin.com/in/tanushka-sunil-patil-a87090389/", imageSrc: tanushka },
        { name: "Mahi Salode", position: "Event team member", group: "Event & Publicity", email: "mahi1962007.s@gmail.com", github: "https://github.com/mahi.salode", linkedin: "https://www.linkedin.com/in/mahi-salode-314334391/", imageSrc: mahi },
        { name: "Rajesh Anerao", position: "Publicity team member", group: "Event & Publicity", email: "rajesh.1251040090@vit.edu", github: "https://github.com/rajeshanerao127", linkedin: "https://www.linkedin.com/in/rajesh-anerao-24a236386/", imageSrc: rajesh },
        { name: "Harsh Bhamre", position: "Publicity team member", group: "Event & Publicity", email: "harsh.bhamre27@gmail.com", github: "https://github.com/Hershey57", linkedin: "https://www.linkedin.com/in/harsh-bhamre-240692318/", imageSrc: harsh },
    ];

    const ROLE_PRIORITY = ["President", "Secretary", "Treasurer", "Event Management", "Public Relations Officer", "Co-Tech Head", "Design Head", "Content Head", "Documentation Head", "Co-Event Head", "Publicity Head", "Web Master", "Jt-Design Head", "Jt-Tech Head", "Jt-Web Master", "Jt-Event Head", "Jt-Documentation Head", "Jt-Publicity Head"];
    const getRoleRank = (pos) => ROLE_PRIORITY.indexOf(pos) === -1 ? ROLE_PRIORITY.length : ROLE_PRIORITY.indexOf(pos);
    const groupedMembers = members.reduce((acc, m) => {
        if (!acc[m.group]) acc[m.group] = [];
        acc[m.group].push(m);
        return acc;
    }, {});
    const groupOrder = ["Core Team", "Technical & Web", "Design, Content & Documentation", "Event & Publicity"];

    return (
        <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
        <Navbar/>
            {/* Keeping the radial glows for depth but removed the grid */}
            <div 
                className="pointer-events-none fixed z-0 w-[600px] h-[600px] lg:w-[1000px] lg:h-[1000px] top-[-200px] left-[-200px]"
                style={{ background: 'radial-gradient(circle, rgba(164, 126, 27, 0.1) 0%, transparent 70%)' }}
            />
            <div 
                className="pointer-events-none fixed z-0 w-[600px] h-[600px] lg:w-[1000px] lg:h-[1000px] bottom-[-200px] right-[-200px]"
                style={{ background: 'radial-gradient(circle, rgba(164, 126, 27, 0.05) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 flex flex-col gap-20 px-4 py-24 max-w-7xl mx-auto">
                {/* Faculty Section */}
                <section className="text-center">
                    <div className="flex justify-center mb-12">
                        <Title title="Faculty Coordinators" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-10">
                        <FacultyCard name="Disha Wankhede" position="Faculty Coordinator" image={faculty1} />
                        <FacultyCard name="Prashant Mahale" position="Faculty Coordinator" image={faculty2} />
                    </div>
                </section>

                {/* Main Team Section */}
                <section className="text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                        <div className="flex justify-center mb-6">
                            <Title title="Our Team" />
                        </div>
                        <p className="text-[#FFF6D6]/60 max-w-2xl mx-auto text-lg">
                            The brilliant minds behind VIIT ACM working together to shape the future of computing.
                        </p>
                    </motion.div>

                    <div className="space-y-20">
                        {groupOrder.map((group) => (
                            groupedMembers[group] && (
                                <motion.div key={group} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative w-full">
                                    <div className="flex flex-col gap-10">
                                        {/* Group Header */}
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#A47E1B]/30 pb-6 text-left">
                                            <div>
                                                <h2 className="text-3xl font-bold text-[#DBB42C] tracking-tight">{group}</h2>
                                                <p className="mt-1 text-sm text-[#FFF6D6]/50 italic">
                                                    {group === "Core Team" ? "Leadership driving VIIT ACM." : group === "Technical & Web" ? "Developers powering our chapter." : group === "Design, Content & Documentation" ? "The creative heart of our team." : "Managers and publicity experts."}
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center rounded-full border border-[#A47E1B]/40 bg-[#A47E1B]/10 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#EDC531]">
                                                {groupedMembers[group].length} Members
                                            </span>
                                        </div>
                                        
                                        {/* Members Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                                            {groupedMembers[group].sort((a, b) => getRoleRank(a.position) - getRoleRank(b.position)).map((member, idx) => (
                                                <TeamMemberCard key={idx} {...member} priority={idx < 2} />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Page;