"use client";
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const Shortlists = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // --- DEMO DATA ---
    const rawTeamsData = [
        { "team_name": "Segmentation_Faults", "leader_name": "Vedant Pawar", "track": "Women Safety" },
        { "team_name": "SPectra", "leader_name": "Saloni Tanmor", "track": "Social Impact" },
        { "team_name": "AlertMate", "leader_name": "Urvi Chaudhari", "track": "Women Safety" },
        { "team_name": "Null Pointers", "leader_name": "Sakshi Bhosale", "track": "Gen AI" },
        { "team_name": "XtraFusion", "leader_name": "Om Salunke", "track": "Gen AI" },
        { "team_name": "Commit || Cry", "leader_name": "Girish  Nalkar", "track": "Women Safety" },
        { "team_name": "Clash of Code", "leader_name": "Soham Suryawanshi", "track": "Social Impact" },
        { "team_name": "Code Comets", "leader_name": "Purva Waykole", "track": "Gen AI" },
        { "team_name": "Team BKC", "leader_name": "Devang Damkondwar", "track": "Gen AI" },
        { "team_name": "Goblet Of Fire", "leader_name": "ARYAN SURATKAR", "track": "Gen AI" },
        { "team_name": "Status 200", "leader_name": "Saurabhi Sharma", "track": "Women Safety" },
        { "team_name": "Triple A", "leader_name": "ALISHA SAVANT", "track": "Women Safety" },
        { "team_name": "Delta Devs", "leader_name": "subrav bhande", "track": "Women Safety" },
        { "team_name": "Enigma Crackers", "leader_name": "Sairaj Lad", "track": "Women Safety" },
        { "team_name": "BrainByte", "leader_name": "Sakshi Huple", "track": "Women Safety" },
        { "team_name": "God's Plan", "leader_name": "Anshul Patidar", "track": "Healthcare" },
        { "team_name": "B4U", "leader_name": "Prasad Khot", "track": "Women Safety" },
        { "team_name": "The_Invinsibles", "leader_name": "Loheyta Dhanure", "track": "Women Safety" },
        { "team_name": "113 Titans", "leader_name": "Prathamesh Sude", "track": "EdTech" },
        { "team_name": "Shantabai Mandali", "leader_name": "Madhura  Ubhe", "track": "EdTech" },
        { "team_name": "CookedDevelopers", "leader_name": "Supriya Mulik", "track": "Women Safety" },
        { "team_name": "Agnisphere", "leader_name": "Ashish Varpe", "track": "Social Impact" },
        { "team_name": "Consensus Labs", "leader_name": "Radhika Kandalkar", "track": "Women Safety" },
        { "team_name": "Error 404", "leader_name": "Sonia Nanwani", "track": "Women Safety" },
        { "team_name": "Drvn Studio", "leader_name": "Ayush Gadve", "track": "Healthcare" },
        { "team_name": "Team INSPIRE", "leader_name": "Anisha Shankar", "track": "Women Safety" },
        { "team_name": "Wrath Of God", "leader_name": "Harsh Mahajan", "track": "Gen AI" },
        { "team_name": "The Last Semicolon", "leader_name": "Nikhil Thakur", "track": "Social Impact" },
        { "team_name": "GenZPT", "leader_name": "Abhaykumar  Roy", "track": "Women Safety" },
        { "team_name": "Helix", "leader_name": "Shriya Bhat", "track": "Women Safety" },
        { "team_name": "Kremlin Spies", "leader_name": "Gauravi Phansekar", "track": "Women Safety" },
        { "team_name": "Team Divas", "leader_name": "Aahana Patil", "track": "Social Impact" },
        { "team_name": "Mind Matrix", "leader_name": "Arman Shaikh", "track": "Women Safety" },
        { "team_name": "Swarajya", "leader_name": "RAJIWADE SHIVAM", "track": "Women Safety" },
        { "team_name": "ShunyaCode", "leader_name": "Ameya Jadhav", "track": "Women Safety" },
        { "team_name": "Globians", "leader_name": "Avaneesh Kulkarni", "track": "EdTech" },
        { "team_name": "Code comrades", "leader_name": "Vishal Chavan", "track": "Healthcare" },
        { "team_name": "Rasmalai", "leader_name": "Vivek Bhange", "track": "Gen AI" },
        { "team_name": "Crusade", "leader_name": "Pranoti Chakwate", "track": "Social Impact" },
        { "team_name": "Zero to One", "leader_name": "Atharva Ubhe", "track": "Women Safety" },
        { "team_name": "Team Trata", "leader_name": "Siddheshwar Budge", "track": "Women Safety" },
        { "team_name": "Team Refactor", "leader_name": "Paras Kumbhar", "track": "EdTech" },
        { "team_name": "Igniters", "leader_name": "Yash Shardul", "track": "Social Impact" },
        { "team_name": "Synapse Squad", "leader_name": "Sanvi Bongale", "track": "EdTech" },
        { "team_name": "CodeTrinity", "leader_name": "NAMRATA PATIL", "track": "Women Safety" },
        { "team_name": "BrainBridge", "leader_name": "vedant attarkar", "track": "EdTech" },
        { "team_name": "RS2T", "leader_name": "Tanishq Tumram", "track": "EdTech" },
        { "team_name": "Data Seekers", "leader_name": "DAKSH SOOD", "track": "EdTech" },
        { "team_name": "Le'Squad", "leader_name": "Vivek Sutar", "track": "Women Safety" },
        { "team_name": "team MARIA", "leader_name": "VED MADURWAR", "track": "Gen AI" },
        { "team_name": "Binary Brains", "leader_name": "Hussain Vahora", "track": "Women Safety" },
        { "team_name": "MetaMinds", "leader_name": "Manswi Badgujar", "track": "EdTech" },
        { "team_name": "Warriors-X", "leader_name": "Aryan Ghadekar", "track": "EdTech" },
        { "team_name": "MindForge", "leader_name": "Shravani Kale", "track": "Gen AI" },
        { "team_name": "VELORA", "leader_name": "Pranav Sawant", "track": "Women Safety" },
        { "team_name": "Team SSRV", "leader_name": "Sarthak Chawke", "track": "Women Safety" },
        { "team_name": "Dhurandhar", "leader_name": "Shrivardhan Patil", "track": "EdTech" },
        { "team_name": "THE AMATEURS", "leader_name": "Kunal Honde", "track": "Healthcare" },
        { "team_name": "Error 502", "leader_name": "Abdullah Khan", "track": "Gen AI" },
        { "team_name": "NODEtorious", "leader_name": "Vedansh Dubey", "track": "EdTech" }
    ];

// Map the first 50 items to mainTeams
    const mainTeams = rawTeamsData.slice(0, 50).map((team, index) => ({
        id: index + 1,
        name: team.team_name,
        leader: team.leader_name,
        track: team.track,
        status: "Shortlisted"
    }));

// Map the remaining 10 items (index 50 to 59) to waitingTeams
    const waitingTeams = rawTeamsData.slice(50, 60).map((team, index) => ({
        id: index + 51,
        name: team.team_name,
        leader: team.leader_name,
        track: team.track,
        status: "Waiting"
    }));

    const filteredMain = mainTeams.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.leader.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
            {/* HERO / HEADER SECTION */}
            <div className="relative w-full border-b border-dashed border-gray-500">
                <Navbar />

                <div className="flex flex-col px-4 sm:px-10 lg:px-[84px] border-dashed border-t border-gray-500">
                    <div className="flex flex-col gap-5 py-10 lg:py-[84px] lg:border-l lg:border-r border-dashed border-gray-500">

                        {/* Label */}
                        <p className="ml-2 sm:ml-5 mt-[-10px] sm:mt-[-20px] text-[14px] sm:text-[20px] text-[#6C6C6C] uppercase tracking-widest">
                            [SELECTION RESULTS]
                        </p>

                        {/* Title */}
                        <h1 className="hack pl-2 sm:pl-5 pb-5 border-t border-b border-dashed border-gray-500 text-[28px] sm:text-[48px] lg:text-[64px] font-400 text-[#3080ED] leading-tight">
                            shortlisted teams
                        </h1>

                        {/* Description and Search */}
                        <div className="pl-2 sm:pl-5 pr-2 sm:pr-5 flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <p className="text-[14px] sm:text-[20px] max-w-2xl leading-relaxed text-gray-300">
                                {`{ Congratulations to the teams who made it through! Below are the 50 teams selected for the final showdown at VIT Pune. }`}
                            </p>

                            {/* Search Bar */}
                            <div className="w-full md:max-w-md relative group">
                                <input
                                    type="text"
                                    placeholder="SEARCH BY TEAM OR LEADER..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-black/40 border border-dashed border-gray-500 p-3 sm:p-4 outline-none focus:border-[#FF4600] transition-all font-mono text-xs sm:text-sm placeholder:text-gray-700"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FF4600] font-mono text-[10px] sm:text-xs opacity-50 group-hover:opacity-100 transition-opacity hidden sm:block">
                                    [SEARCH]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN SHORTLIST TABLE */}
            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500">
                <div className="py-8 sm:py-10 lg:border-l lg:border-r border-dashed border-gray-500">

                    <div className="px-2 sm:px-5 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
                        <h2 className="text-[#FF4600] flex items-baseline">
                            <span className={'hack text-2xl sm:text-4xl'}>main list</span>
                            <span className="text-gray-600 ml-3 text-xs sm:text-sm font-mono tracking-tighter">({filteredMain.length}/50)</span>
                        </h2>
                        <span className="text-[10px] font-mono text-gray-500 sm:hidden uppercase tracking-widest">← Swipe to view →</span>
                    </div>

                    {/* Table Responsive Wrapper */}
                    <div className="overflow-x-auto px-2 sm:px-5 pb-4">
                        <table className="w-full min-w-[600px] border-collapse border border-dashed border-gray-700">
                            <thead>
                            <tr className="text-left bg-gray-900/50 border-b border-dashed border-gray-500">
                                <th className="p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-gray-500 uppercase">#</th>
                                <th className="p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-gray-500 uppercase">Team Name</th>
                                <th className="p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-gray-500 uppercase">Team Leader</th>
                                <th className="p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-gray-500 uppercase">Track</th>
                                <th className="p-4 font-mono text-[10px] sm:text-xs text-gray-500 uppercase">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <AnimatePresence mode='popLayout'>
                                {filteredMain.map((team, index) => (
                                    <motion.tr
                                        key={team.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="border-b border-dashed border-gray-800 hover:bg-white/5 transition-colors group"
                                    >
                                        <td className="p-3 sm:p-4 font-mono text-[10px] sm:text-sm text-[#6C6C6C]">{String(index + 1).padStart(2, '0')}</td>
                                        <td className="p-3 sm:p-4 font-bold text-xs sm:text-sm text-white group-hover:text-[#3080ED] transition-colors">{team.name}</td>
                                        <td className="p-3 sm:p-4 text-xs sm:text-sm text-gray-300">{team.leader}</td>
                                        <td className="p-3 sm:p-4">
                                                <span className="px-1.5 py-0.5 border border-gray-700 rounded text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">
                                                    {team.track}
                                                </span>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                                <span className="text-[#7DA942] text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                                                    ● Confirmed
                                                </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* WAITING LIST SECTION */}
            <div className="px-4 sm:px-10 lg:px-[84px] border-b border-dashed border-gray-500 bg-[#FF4600]/5">
                <div className="py-10 lg:py-14 lg:border-l lg:border-r border-dashed border-gray-500 px-2 sm:px-5">

                    <div className="flex flex-col gap-2 mb-8 ml-2 sm:ml-0">
                        <p className="text-[#6C6C6C] text-[10px] sm:text-sm font-mono uppercase tracking-widest">[IN CASE OF CANCELLATIONS]</p>
                        <h2 className="hack text-[24px] sm:text-[36px] text-[#F5B301]">waiting list</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
                        {waitingTeams.map((team, i) => (
                            <div
                                key={team.id}
                                className="border border-dashed border-gray-500 p-4 sm:p-6 rounded-lg bg-black hover:border-[#F5B301] transition-all"
                            >
                                <div className="flex justify-between items-start">
                                    <p className="font-mono text-[#F5B301] text-sm">WL-{i + 1}</p>
                                    <span className="text-[8px] sm:text-[10px] bg-gray-800 px-2 py-1 rounded text-gray-400 uppercase tracking-tighter">On Standby</span>
                                </div>
                                <h3 className="text-base sm:text-xl font-bold mt-4">{team.name}</h3>
                                <p className="text-gray-400 text-xs sm:text-sm mt-1">Lead: {team.leader}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Shortlists;