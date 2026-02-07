"use client";

import React from 'react';
import Title from '@/components/Title';

const Gallery = () => {
  const galleryImages = [
    { src: "/img1.jpg", height: "h-[400px]" },
    { src: "/img2.jpg", height: "h-[200px]" },
    { src: "/img3.jpg", height: "h-[320px]" },
    { src: "/img4.jpg", height: "h-[250px]" },
    { src: "/img5.jpg", height: "h-[380px]" },
    { src: "/img6.jpg", height: "h-[150px]" },
    { src: "/img7.jpg", height: "h-[420px]" },
    { src: "/img8.jpg", height: "h-[280px]" },
    { src: "/img9.jpg", height: "h-[350px]" }
  ];

  return (
    <section id="gallery" className="w-full min-h-screen bg-black px-5 md:px-[100px] py-20 box-border">
      {/* Header Container */}
      <div className="relative z-10 flex justify-center mb-10 sm:mb-14 md:mb-16">
                <Title title={"Explore Our Gallery"} />
            </div>

      {/* Gallery Grid */}
      <div className="max-h-[800px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative w-full ${image.height} bg-[#fad643] rounded-2xl overflow-hidden break-inside-avoid transition-all hover:scale-[1.01] duration-300`}
            >
              <img 
                src={image.src} 
                alt={`Gallery item ${index}`}
                loading="lazy"
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #facc15; 
          border-radius: 10px;
        }
        .break-inside-avoid {
          break-inside: avoid;
          display: inline-block; /* Essential for Masonry layout fixes in some browsers */
          width: 100%;
        }
      `}</style>
    </section>
  );
};

export default Gallery;