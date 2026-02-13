"use client";

import React from 'react';
import Title from '@/components/Title';
import { motion } from 'framer-motion';

const Gallery = () => {
  // Organized based on your provided Cloudinary links
  const col1Images = [
    { src: "/assets/box.png" },
    { src: "/assets/box.png" },
    { src: "/assets/box.png" },
    { src: "/assets/box.png" },
  ];

  const col2Images = [
    { src: "/assets/box.png" },
    { src: "/assets/box.png" },
    { src: "/assets/box.png" },
    { src: "/assets/box.png" },
  ];

  const col3Images = [
    { src: "/assets/box.png" },
    { src: "/assets/box.png" },
    { src: "/assets/box.png" },
    { src: "/assets/box.png" },
  ];

  /**
   * ScrollingColumn Component
   * direction "up": 0% -> -50%
   * direction "down": -50% -> 0%
   */
  const ScrollingColumn = ({ images, direction = 'up' }) => {
    const duplicatedImages = [...images, ...images];
    
    return (
      <div className="relative flex-1 overflow-hidden h-[700px] md:h-[800px]">
        <motion.div
          initial={{ y: direction === 'up' ? "0%" : "-50%" }}
          animate={{ y: direction === 'up' ? "-50%" : "0%" }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-col gap-4 py-4"
        >
          {duplicatedImages.map((image, idx) => (
            <div
              key={idx}
              className="relative h-72 md:h-80 w-full group cursor-pointer overflow-hidden rounded-xl bg-zinc-900"
            >
              <img
                src={image.src}
                alt={`Gallery item ${idx}`}
                className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                loading="lazy"
              />
              {/* Optional Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section id="gallery" className="w-full min-h-screen bg-black px-5 md:px-[100px] py-20 box-border overflow-hidden">
      {/* Header Container */}
      <div className="relative z-10 flex flex-col items-center mb-10 md:mb-16">
        <Title title={"Explore Our Gallery"} />
        <div className="h-1 w-20 bg-gradient-to-r from-[#FF4669] to-[#CE1790] mt-4 rounded-full" />
      </div>

      {/* Main Grid Container */}
      <div className="container mx-auto">
        <div className="flex gap-4 md:gap-6 h-[700px] md:h-[800px] overflow-hidden">
          
          {/* Left Column: Scrolls Down */}
          <ScrollingColumn images={col1Images} direction="down" />

          {/* Middle Column: Scrolls Up (Infinite Loop) */}
          <ScrollingColumn images={col2Images} direction="up" />

          {/* Right Column: Scrolls Down */}
          <div className="hidden sm:block flex-1">
            <ScrollingColumn images={col3Images} direction="down" />
          </div>
          
        </div>
      </div>

      {/* Custom CSS for smoothing if needed */}
      <style jsx>{`
        section {
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </section>
  );
};

export default Gallery;