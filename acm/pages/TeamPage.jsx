"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const TeamMember = ({ name, quote, image }) => (
    <div className="shrink-0 w-[400px] flex flex-col items-center group relative pt-20">
        <div className="text-center mb-6 h-24 flex flex-col justify-end transition-transform duration-300 group-hover:-translate-y-2">
            <p className="text-[#FFF6D6] font-medium text-[20px] italic line-clamp-2 px-4">
                &quot;{quote}&quot;
            </p>
            <p className="text-white font-bold text-[30px] mt-2 leading-none">
                {name}
            </p>
        </div>

        <div className="w-[280px] h-[280px] rounded-full border-[10px] border-[#C49B28] overflow-hidden bg-[#FFF6D6] z-10 shadow-2xl transition-all duration-300 group-hover:border-[#DFF49E]">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
            />
        </div>
    </div>
);

const TeamPage = () => {
    const animationRef = useRef(null);

    const members = [
        { name: "Bhavesh Bhakta", quote: "RCB will win next year - Change My Mind", image: "https://via.placeholder.com/300?text=Bhavesh" },
        { name: "Atharva Patil", quote: "Code is Poetry", image: "https://via.placeholder.com/300?text=Atharva" },
        { name: "Ananya Sharma", quote: "Designing the future, one pixel at a time.", image: "https://via.placeholder.com/300?text=Ananya" },
        { name: "Rohan Das", quote: "Debugging is like being a detective in a movie.", image: "https://via.placeholder.com/300?text=Rohan" },
        { name: "Sanya Malhotra", quote: "Creating magic with ACM every day.", image: "https://via.placeholder.com/300?text=Sanya" },
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

            {/* Background Layer */}
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
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-${singleSetWidth}px);
          }
        }
        
        .animate-scroll {
          animation: infiniteScroll 25s linear infinite;
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
                        {/* SVG Path */}
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

                        {/* Team Members */}
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