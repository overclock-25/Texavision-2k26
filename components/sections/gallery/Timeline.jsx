'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GraffitiDrawer from './GraffitiDrawer';
import BrushRevealImage from '@/components/ui/BrushRevealImage';
import PosterImage from '@/assets/images/home/poster-dummy.jpg';

const timelineData = [
  {
    year: '2023',
    cover: PosterImage.src,
    images: [PosterImage.src, PosterImage.src],
  },
  {
    year: '2022',
    cover: PosterImage.src,
    images: [PosterImage.src, PosterImage.src],
  },
];

export default function VerticalTimeline() {
  const [selectedYear, setSelectedYear] = useState(null);
  return (
    <div className="bg-cream text-charcoal relative min-h-screen overflow-x-hidden px-10 py-20">
      {/* Background Texture */}
      <div className="pointer-events-none fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />

      {/* Central Spine - Clean Line */}
      <div className="absolute top-0 left-1/2 block h-full w-0.5 -translate-x-1/2 bg-orange-600/20" />

      <div className="relative z-10 flex flex-col gap-16 md:gap-32">
        {timelineData.map((item, index) => (
          <TimelineGroup
            key={item.year}
            item={item}
            isLeft={index % 2 === 0}
            onOpen={() => setSelectedYear(item)}
          />
        ))}
      </div>
      <GraffitiDrawer
        yearData={selectedYear}
        isOpen={!!selectedYear}
        onClose={() => setSelectedYear(null)}
      />
    </div>
  );
}

function TimelineGroup({ item, isLeft, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div
      className={`relative flex w-full flex-col items-center md:flex-row ${isLeft ? 'md:flex-row-reverse' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 50% Spacer to keep things centered around the spine */}
      <div className="hidden w-1/2 md:block" />

      {/* Content Side */}
      <div
        className={`flex flex-col items-center gap-8 px-4 md:flex-row md:px-10 ${isLeft ? 'md:flex-row-reverse' : ''}`}
      >
        {/* The Anchor: Cover Image & Year */}
        <div className="group relative z-10 shrink-0 cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative h-[400px] w-[280px] overflow-hidden bg-white shadow-2xl"
            onClick={handleOpen}
            style={{
              maskImage: "url('/svgs/torn-paper.svg')",
              maskSize: '100% 100%',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: "url('/svgs/torn-paper.svg')",
              WebkitMaskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }}
          >
            <BrushRevealImage
              src={item.cover}
              alt={item.year}
              className="h-full w-full transition-all duration-500 group-hover:grayscale"
            />
            <div className="from-cream/90 pointer-events-none absolute inset-0 bg-linear-to-t via-transparent to-transparent" />

            {/* Graffiti Year - Clean & Readable */}
            <h3 className="text-charcoal font-protest-revolution absolute bottom-4 left-4 text-6xl font-bold drop-shadow-md select-none">
              {item.year}
            </h3>
          </motion.div>
        </div>

        {/* The Slide-Out Gallery */}
        <motion.div
          initial={false}
          animate={{
            width: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : isLeft ? 20 : -20,
          }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex h-2 items-center gap-4 overflow-hidden whitespace-nowrap md:h-auto"
        >
          {item.images.map((img, i) => (
            <motion.div
              key={i}
              className="relative h-[280px] w-[200px] shrink-0 overflow-hidden bg-white shadow-xl"
              style={{
                maskImage: "url('/svgs/torn-paper.svg')",
                maskSize: '100% 100%',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: "url('/svgs/torn-paper.svg')",
                WebkitMaskSize: '100% 100%',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
              }}
            >
              <BrushRevealImage
                src={img}
                alt=""
                className="h-full w-full transition-all hover:grayscale"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Connection Node on the Spine */}
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center">
        <div className="h-4 w-4 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
      </div>
    </div>
  );
}
