"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from "lucide-react";

const TeamMember = ({ name, quote, image, github, linkedin, email }) => (
    <div id="team" className="shrink-0 w-[400px] flex flex-col items-center group relative pt-20">
        <div className="text-center mb-6 h-32 flex flex-col justify-end transition-transform duration-300 group-hover:-translate-y-2">
            <p className="text-white font-bold text-[30px] mt-2 leading-none">
                {name}
            </p>
            
            <p className="text-[#FFF6D6] font-medium text-[18px] italic line-clamp-1 px-4 mb-2">
                {quote}
            </p>

            {/* Social Links Row */}
            <div className="flex gap-4 justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FBBF24] transition-colors">
                        <Github size={20} />
                    </a>
                )}
                {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FBBF24] transition-colors">
                        <Linkedin size={20} />
                    </a>
                )}
                {email && (
                    <a href={`mailto:${email}`} className="text-white hover:text-[#FBBF24] transition-colors">
                        <Mail size={20} />
                    </a>
                )}
            </div>
        </div>

        <div className="w-[280px] h-[280px] rounded-full border-[10px] border-[#C49B28] overflow-hidden bg-[#FFF6D6] z-10 shadow-2xl transition-all duration-300 group-hover:border-[#DFF49E]">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover contrast-110 transition-all duration-500"
            />
        </div>
    </div>
);

const TeamPage = () => {
    const animationRef = useRef(null);

    // Updated members list with all social data
    const members = [
        { 
            name: "Anvay Kulkarni", 
            quote: "President", 
            image: "/assets/team/anvay.png",
            github: "https://github.com/Anvay14",
            linkedin: "https://www.linkedin.com/in/anvay-kulkarni-609662279/",
            email: "anvay.22311927@viit.ac.in"
        },
        { 
            name: "Swanandi Kamat", 
            quote: "Secretary", 
            image: "/assets/team/swanandi.jpeg",
            github: "https://github.com/swanandikamat",
            linkedin: "https://www.linkedin.com/in/swanandi-kamat-86aa152a6/",
            email: "swanandi.22310424@viit.ac.in"
        },
        { 
            name: "Tejas Dherange", 
            quote: "Treasurer", 
            image: "/assets/team/tejas.png",
            github: "https://github.com/Tejas-Dherange",
            linkedin: "https://www.linkedin.com/in/tejas-dherange-54a6a627b",
            email: "tejas.22310593@viit.ac.in"
        },
        { 
            name: "Shatavali Bahadure", 
            quote: "Event Management", 
            image: "/assets/team/shatavali.jpg",
            github: "https://github.com/Shatavali05",
            linkedin: "https://www.linkedin.com/in/shatavali-bahadure-172509291/",
            email: "shatavali.22310364@viit.ac.in"
        },
        { 
            name: "Palak Gudgila", 
            quote: "Public Relations Officer", 
            image: "/assets/team/palak.jpeg",
            github: "https://github.com/palak-gudgila",
            linkedin: "https://www.linkedin.com/in/palak-gudgila/",
            email: "palak.22311889@viit.ac.in"
        },
        { 
            name: "Vedant Shendge", 
            quote: "Co-Tech Head", 
            image: "/assets/team/vedantshendge.png",
            github: "https://github.com/vedant-shendge",
            linkedin: "https://www.linkedin.com/in/vedant-shendge-a1258b2b4/",
            email: "vedant.22310585@viit.ac.in"
        },
        { 
            name: "Vedant Shingote", 
            quote: "Co-Tech Head", 
            image: "/assets/team/vedantshingote.jpg",
            github: "https://github.com/Vedant-Shingote",
            linkedin: "https://www.linkedin.com/in/vedant-shingote-1827802a8/",
            email: "vedant.22310590@viit.ac.in"
        },
        { 
            name: "Gajanan Tongale", 
            quote: "Jt-Tech Head", 
            image: "/assets/team/gajanan.jpeg",
            github: "https://github.com/GajananTongale",
            linkedin: "https://www.linkedin.com/in/gajanan-tongale-828a2b33b/",
            email: "rajendra.22311256@viit.ac.in"
        },
        { 
            name: "Prithviraj Patil", 
            quote: "Jt-Tech Head", 
            image: "/assets/team/prithviraj.png",
            github: "https://github.com/Prithvi2321",
            linkedin: "https://www.linkedin.com/in/prithviraj-patil-3a1814330/",
            email: "prithvirajpatil495@gmail.com"
        },
        { 
            name: "Abhishek Kadu", 
            quote: "Web Master", 
            image: "/assets/team/abhishek.jpg",
            github: "https://github.com/ak8457417",
            linkedin: "https://www.linkedin.com/in/abhishek-kadu1/",
            email: "abhishek.22311167@viit.ac.in"
        },
        { 
            name: "Atharva Belavanki", 
            quote: "Jt-Web Master", 
            image: "/assets/team/atharva.jpg",
            github: "https://github.com/atharvabelavanki",
            linkedin: "https://www.linkedin.com/in/atharva-belavanki-4565932b4",
            email: "atharva.22311353@viit.ac.in"
        },
        { 
            name: "Akshay Nazare", 
            quote: "Design Head", 
            image: "/assets/team/man.jpg",
            github: "https://github.com/akshay-nazare",
            linkedin: "https://www.linkedin.com/in/akshay-nazare",
            email: "akshay.1252030015@vit.edu"
        },
        { 
            name: "Shivam Shinde", 
            quote: "Jt-Design Head", 
            image: "/assets/team/shivam.jpg",
            github: "https://github.com/Shivam-codex",
            linkedin: "https://www.linkedin.com/in/shivam-shinde-08a181289/",
            email: "shivam.22310019@viit.ac.in"
        },
        { 
            name: "Soham Zinjurke", 
            quote: "Content Head", 
            image: "/assets/team/soham.jpg",
            github: "https://github.com/soham-zinjurke",
            linkedin: "https://www.linkedin.com/in/sohamzinjurke/",
            email: "soham.22311620@viit.ac.in"
        },
        { 
            name: "Vedant Mulmule", 
            quote: "Documentation Head", 
            image: "/assets/team/vedantmulmule.png",
            github: "https://github.com/vedant-mulmule",
            linkedin: "https://www.linkedin.com/in/vedant-mulmule-6732642b8/",
            email: "vedant.mulmule23@vit.edu"
        },
        { 
            name: "Dhanashri Karad", 
            quote: "Jt-Documentation Head", 
            image: "/assets/team/dhanashri.jpg",
            github: "https://github.com/DhanashriKarad",
            linkedin: "https://www.linkedin.com/in/dhanashri-karad/",
            email: "dhanashrikarad19@gmail.com"
        },
        { 
            name: "Vedika Budhwat", 
            quote: "Design Team Member", 
            image: "/assets/team/woman.png",
            github: "https://github.com/vedikabudhwat07-eng",
            linkedin: "https://www.linkedin.com/in/vedika-budhwat-946b03385/",
            email: "vedika.1251100127@vit.edu"
        },
        { 
            name: "Yash Chaware", 
            quote: "Documentation Team Member", 
            image: "/assets/team/yashchaware.jpg",
            github: "https://github.com/yash-chaware",
            linkedin: "https://www.linkedin.com/in/yash-chaware",
            email: "yash.1251080031@vit.edu"
        },
        { 
            name: "Amruta Gavade", 
            quote: "Documentation Team Member", 
            image: "/assets/team/amruta.png",
            github: "https://www.linkedin.com/in/amruta-gavade-",
            linkedin: "https://www.linkedin.com/in/amrutagavade007-oss",
            email: "amrutagavade007@gmail.com"
        },
        { 
            name: "Sudiksha Pardeshi", 
            quote: "Co-Event Head", 
            image: "/assets/team/sudiksha.jpg",
            github: "https://github.com/sudiksha-pardeshi",
            linkedin: "https://www.linkedin.com/in/sudiksha-pardeshi-011b93386/",
            email: "sudiksha.22310260@viit.ac.in"
        },
        { 
            name: "Achala Patil", 
            quote: "Co-Event Head", 
            image: "/assets/team/achala.jpg",
            github: "https://github.com/Achala-Patil",
            linkedin: "https://www.linkedin.com/in/achala-patil-718152283/",
            email: "achala.patil24@vit.edu"
        },
        { 
            name: "Atharva Bhajan", 
            quote: "Jt-Event Head", 
            image: "/assets/team/atharvabhajan.jpeg",
            github: "https://github.com/Atharvabhajan",
            linkedin: "https://www.linkedin.com/in/atharvabhajan/",
            email: "atharvabhajan0574@gmail.com"
        },
        { 
            name: "Shreyas Khanore", 
            quote: "Jt-Event Head", 
            image: "/assets/team/shreyas.jpeg",
            github: "https://github.com/shreyas-khanore",
            linkedin: "https://www.linkedin.com/in/shreyas-khanore",
            email: "shreyas.khanore24@vit.edu"
        },
        { 
            name: "Namrata Devare", 
            quote: "Publicity Head", 
            image: "/assets/team/namrata.jpg",
            github: "https://github.com/namrata-devare",
            linkedin: "https://www.linkedin.com/in/namrata-devare",
            email: "namratadevare5@gmail.com"
        },
        { 
            name: "Rohan Wani", 
            quote: "Jt-Publicity Head", 
            image: "/assets/team/rohan.png",
            github: "https://github.com/rohan-wani",
            linkedin: "https://www.linkedin.com/in/rohan-wani",
            email: "rohan.wani25@vit.edu"
        },
        { 
            name: "Snehal Bomble", 
            quote: "Jt-Publicity Head", 
            image: "/assets/team/snehal.jpg",
            github: "https://github.com/Snehalbomble27",
            linkedin: "https://www.linkedin.com/in/snehal-bomble-887b73329",
            email: "snehal.1252030031@vit.edu"
        },
        { 
            name: "Siddhant Ukarde", 
            quote: "Jt-Publicity Head", 
            image: "/assets/team/siddhant.jpeg",
            github: "https://github.com/siddhant-ukarde",
            linkedin: "https://www.linkedin.com/in/siddhant-ukarde",
            email: "siddhant.ukarde24@vit.edu"
        },
        { 
            name: "Atharv Vaidya", 
            quote: "Event team member", 
            image: "/assets/team/atharvvaidya.jpg",
            github: "https://github.com/AthvaCodes",
            linkedin: "https://www.linkedin.com/in/atharv-vaidya-094b69386/",
            email: "atharvaidya007@gmail.com"
        },
        { 
            name: "Tanushka Patil", 
            quote: "Event team member", 
            image: "/assets/team/tanushka.png",
            github: "https://github.com/Tanushka-sp2007",
            linkedin: "https://www.linkedin.com/in/tanushka-sunil-patil-a87090389",
            email: "tanushka.spatil1987@gmail.com"
        },
        { 
            name: "Mahi Salode", 
            quote: "Event team member", 
            image: "/assets/team/mahi.jpg",
            github: "https://github.com/mahi.salode",
            linkedin: "https://www.linkedin.com/in/mahi-salode-314334391/",
            email: "mahi1962007.s@gmail.com"
        },
        { 
            name: "Rajesh Anerao", 
            quote: "Publicity team member", 
            image: "/assets/team/rajesh.png",
            github: "https://github.com/rajeshanerao127",
            linkedin: "https://www.linkedin.com/in/rajesh-anerao-24a236386/",
            email: "rajesh.1251040090@vit.edu"
        },
        { 
            name: "Harsh Bhamre", 
            quote: "Publicity team member", 
            image: "/assets/team/harsh.jpg",
            github: "https://github.com/Hershey57",
            linkedin: "https://www.linkedin.com/in/harsh-bhamre-240692318/",
            email: "harsh.bhamre27@gmail.com"
        }
    ];

    const tripleMembers = [...members, ...members, ...members];
    const cardWidth = 450;
    const singleSetWidth = members.length * cardWidth;

    const handleMouseEnter = () => {
        if (animationRef.current) {
            animationRef.current.style.animationPlayState = 'paused';
        }
    };

    const handleMouseLeave = () => {
        if (animationRef.current) {
            animationRef.current.style.animationPlayState = 'running';
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col">
            <div
                className="absolute inset-0 pointer-events-none opacity-40 z-0"
                style={{
                    backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}
            ></div>

            <header className="z-20 text-center pt-16 pb-1">
                <h1 className="text-white font-bold text-[48px] leading-tight">
                    Meet the minds behind the <span className="border-2 border-[#DFF49E] px-4 py-1 inline-block mx-2">magic</span>
                </h1>
                <h2 className="text-[#FBBF24] font-bold text-[48px]">
                    The ACM Team
                </h2>
            </header>

            <style jsx>{`
                @keyframes infiniteScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-${singleSetWidth}px); }
                }
                .animate-scroll {
                    animation: infiniteScroll 60s linear infinite;
                }
            `}</style>

            <div className="relative flex-1 overflow-hidden pb-32 z-10 flex items-center">
                <div
                    ref={animationRef}
                    className="flex items-center cursor-pointer animate-scroll"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ width: `${singleSetWidth * 10}px` }}
                >
                    <div className="relative flex items-center">
                        <div
                            className="absolute top-[50%] left-0 h-[300px] pointer-events-none translate-y-[-20%]"
                            style={{ width: `${singleSetWidth * 3}px` }}
                        >
                            <svg width="100%" height="100%" viewBox={`0 0 ${singleSetWidth * 3} 300`} preserveAspectRatio="none">
                                <path
                                    d={`M 0 150 ${tripleMembers.map((_, i) => {
                                        const centerX = i * cardWidth + cardWidth / 2;
                                        const endX = (i + 1) * cardWidth;
                                        const controlY = i % 2 === 0 ? 0 : 300;
                                        return `Q ${centerX} ${controlY}, ${endX} 150`;
                                    }).join(' ')}`}
                                    stroke="#C49B28"
                                    strokeWidth="80"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="opacity-90"
                                />
                            </svg>
                        </div>

                        {tripleMembers.map((member, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0"
                                style={{
                                    transform: `translateY(${index % 2 === 0 ? '-50px' : '70px'})`,
                                    width: `${cardWidth}px`
                                }}
                            >
                                <TeamMember {...member} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;