"use client";
import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Helper function to concatenate Tailwind classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

// 1. Wavy Topology Background Component
const WavyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient mask to fade out the edges like the original hero section */}
      <div className="absolute inset-0 z-10 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]"></div>
      
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-20 stroke-[#DBB42C] fill-none"
        strokeWidth="1.5"
      >
        {/* Horizontal wavy lines */}
        {Array.from({ length: 40 }).map((_, i) => {
          const y = i * 35;
          // Creates a wave that curves down in the middle
          return (
            <path
              key={`h-${i}`}
              d={`M -200,${y} Q 500,${y + 180} 1200,${y}`}
            />
          );
        })}
        
        {/* Vertical wavy lines */}
        {Array.from({ length: 40 }).map((_, i) => {
          const x = i * 35;
          // Creates a slight wave for vertical lines to match perspective
          return (
            <path
              key={`v-${i}`}
              d={`M ${x},0 Q ${x - 80},500 ${x},1000`}
            />
          );
        })}
      </svg>
    </div>
  );
};

// 2. Mocked ACM Logo Component
const Logo = () => (
  <div className="flex items-center gap-1 cursor-pointer">
    <div className="relative flex items-center justify-center w-10 h-10">
      <div className="absolute inset-0 bg-[#0096FF] transform rotate-45 rounded-sm"></div>
      <div className="absolute w-8 h-8 bg-black transform rotate-45"></div>
      <span className="relative z-10 text-[#0096FF] font-bold text-xl tracking-tighter">
        {"< >"}
      </span>
    </div>
    <span className="text-[#0096FF] font-black text-2xl tracking-tight mt-2">
      acm
    </span>
  </div>
);



// 4. Main App Component (Default Export)
export default function App() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col relative overflow-x-hidden min-h-screen bg-black font-sans text-white">
      {/* Background */}
      <WavyBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col w-full px-6 sm:px-12 lg:px-24 pt-12 pb-24 max-w-[1600px] mx-auto"
      >
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full mb-16">
          <motion.div variants={itemVariants} className="flex-1 pr-4">
            <p className="text-gray-300 text-lg mb-4 font-medium tracking-wide">
              Get Started
            </p>
            {/* Added sm:whitespace-nowrap to guarantee exactly 2 lines as dictated by the <br /> */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold leading-[1.1] tracking-tight sm:whitespace-nowrap">
              Get in touch with us.
              <br />
              We're here to assist you.
            </h1>
          </motion.div>

          {/* Social Icons - Vertically Stacked as in the image */}
          <motion.div variants={itemVariants} className="flex md:flex-col gap-4 mt-8 md:mt-0 right-0 shrink-0">
            {/* Added text-[#EDC531] to make the icons golden by default */}
            <a href="#" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-[#EDC531] hover:border-[#EDC531] transition-all duration-300 group">
              <Facebook size={18} className="group-hover:scale-110 transition-transform fill-transparent" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-[#EDC531] hover:border-[#EDC531] transition-all duration-300 group">
              <Instagram size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-[#EDC531] hover:border-[#EDC531] transition-all duration-300 group">
              <Twitter size={18} className="group-hover:scale-110 transition-transform fill-current" />
            </a>
          </motion.div>
        </div>

        {/* Form Section */}
        <motion.form variants={itemVariants} className="w-full max-w-5xl mb-24" onSubmit={(e) => e.preventDefault()}>
          
          {/* Row 1: 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-transparent border-b border-gray-600 pb-4 text-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#EDC531] transition-colors"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-gray-600 pb-4 text-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#EDC531] transition-colors"
              />
            </div>
            <div className="relative">
              <input
                type="tel"
                placeholder="Phone Number (optional)"
                className="w-full bg-transparent border-b border-gray-600 pb-4 text-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#EDC531] transition-colors"
              />
            </div>
          </div>

          {/* Row 2: 1 Full Width Column */}
          <div className="relative mb-12">
            <input
              type="text"
              placeholder="Message"
              className="w-full bg-transparent border-b border-gray-600 pb-4 text-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#EDC531] transition-colors"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#DBB42C] hover:bg-[#ffd84d] text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors duration-300"
          >
            Leave us a Message <ArrowRight size={18} />
          </motion.button>
        </motion.form>

      </motion.main>

      {/* Bottom Contact Info Section - Spans Full Width with Top Border */}
      <div className="relative z-10 w-full border-t border-gray-700 mt-auto">
        <div className="px-6 sm:px-12 lg:px-24 py-16 max-w-[1600px] mx-auto flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
          
          {/* Left: Contact Info Heading */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <p className="text-gray-300 mb-2 font-medium">Contact Info</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              We are always<br />happy to assist you
            </h2>
          </motion.div>

          {/* Right: Info Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 flex flex-col sm:flex-row gap-12 sm:gap-24"
          >
            {/* Email Block */}
            <div className="flex flex-col">
              <h3 className="font-bold text-lg mb-1">Email Address</h3>
              <div className="w-8 h-[2px] bg-white mb-4"></div>
              <p className="font-bold text-lg mb-3">help@info.com</p>
              <div className="text-gray-400 text-sm leading-relaxed">
                <p>Assistance hours:</p>
                <p>Monday - Friday 6 am to</p>
                <p>8 pm EST</p>
              </div>
            </div>

            {/* Phone Block */}
            <div className="flex flex-col">
              <h3 className="font-bold text-lg mb-1">Number</h3>
              <div className="w-8 h-[2px] bg-white mb-4"></div>
              <p className="font-bold text-lg mb-3">(808) 998-34256</p>
              <div className="text-gray-400 text-sm leading-relaxed">
                <p>Assistance hours:</p>
                <p>Monday - Friday 6 am to</p>
                <p>8 pm EST</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
     
     <Footer/>
    </div>
    
  );
}