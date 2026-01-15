'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PosterImage from '@/assets/images/home/poster-dummy.jpg';
import PaintSpray from '@/assets/images/svgs/paint-spray.svg';
import Image from 'next/image';
import { CircleChevronRight, X } from 'lucide-react';

// Helper for random numbers
const random = (min, max) => Math.random() * (max - min) + min;

const PinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="5" r="3" fill="#ef4444" stroke="black" strokeWidth="1.5" />
    <path d="M12 8L12 18" stroke="black" strokeWidth="1.5" />
  </svg>
);

// Dummy Data
const years = [2026, 2025, 2024, 2023, 2022, 2021];
const galleryData = years.map((y) => ({
  year: y.toString(),
  cover: PosterImage.src,
  images: Array(15) // Generate 15 images
    .fill(PosterImage.src)
    .map((src, i) => ({
      id: `${y}-${i}`,
      src,
      rotation: random(-6, 6),
      width: random(200, 350), // vary widths slightly
    })),
}));

export default function GalleryStacked() {
  const [selectedYear, setSelectedYear] = useState(null);

  // Lock body scroll when wall is open
  useEffect(() => {
    if (selectedYear) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedYear]);

  return (
    <div className="font-grindy-brush relative min-h-screen w-full px-4 py-20 pb-32 md:px-10">
      {/* Year Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-12 gap-y-24 sm:grid-cols-2 lg:grid-cols-3">
        {galleryData.map((item) => (
          <YearStack key={item.year} item={item} onClick={() => setSelectedYear(item)} />
        ))}
      </div>

      {/* Exploding Photo Wall Overlay */}
      <AnimatePresence>
        {selectedYear && <PhotoWall data={selectedYear} onClose={() => setSelectedYear(null)} />}
      </AnimatePresence>
    </div>
  );
}

function YearStack({ item, onClick }) {
  const { year, cover } = item;

  return (
    <div className="flex justify-center">
      <motion.div
        layoutId={`stack-container-${year}`}
        className="group relative h-72 w-56 cursor-pointer md:h-80 md:w-64"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Layer 1 (Bottom) */}
        <div
          className="absolute inset-0 rounded border-2 border-black bg-white shadow-sm transition-transform duration-300 group-hover:rotate-6"
          style={{ transform: 'rotate(-3deg)' }}
        />
        {/* Layer 2 (Middle) */}
        <div
          className="absolute inset-0 rounded border-2 border-black bg-white shadow-sm transition-transform duration-300 group-hover:-rotate-4"
          style={{ transform: 'rotate(2deg)' }}
        />
        {/* Top Layer */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center rounded border-2 border-black bg-white p-3 shadow-md transition-transform duration-300 group-hover:rotate-0"
          style={{ transform: 'rotate(0deg)' }}
        >
          {/* Pin */}
          <div className="absolute -top-8 z-20 w-6 drop-shadow-md">
            {/* <PinIcon className="h-8 w-8" /> */}
            <Image src="/svgs/push-pin.png" alt="pin" height={100} width={100} />
          </div>

          <div className="relative h-4/5 w-full overflow-hidden">
            {/* Using standard img for simplicity in animation, next/image can be tricky with layoutId sometimes */}
            <img
              src={cover}
              alt={year}
              className="h-full w-full object-cover"
              style={{
                maskImage: `url('/svgs/poster.svg')`,
                WebkitMaskImage: `url('/svgs/poster.svg')`,
                maskSize: '100% 100%',
                WebkitMaskSize: '100% 100%',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
              }}
            />
          </div>

          <div className="flex w-full justify-between px-2">
            <div className="font-centrion mt-4 text-4xl text-black">{year}</div>

            <CircleChevronRight className="mt-5 h-6 w-6 text-black" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function PhotoWall({ data, onClose }) {
  const [spread, setSpread] = useState(false);

  useEffect(() => {
    // Trigger "dealing" animation after mount
    const timer = setTimeout(() => {
      setSpread(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-cream fixed inset-0 z-50 flex flex-col pt-24 backdrop-blur-sm"
      data-lenis-prevent
    >
      {/* Header / Controls */}
      <div className="relative z-50 flex items-center justify-between border-b-2 border-black p-6 shadow-md">
        <h2 className="font-grindy-brush w-full text-center text-7xl text-black">{data.year}</h2>
        <button
          onClick={onClose}
          className="font-abegnale rounded-full border-2 border-black bg-black px-6 py-2 text-xl text-white transition-colors hover:bg-orange-600"
        >
          <X size={24} />
        </button>
      </div>

      {/* Scrollable Wall */}
      <div className="relative flex-1 overflow-y-auto p-8" id="wall-scroll-container">
        <div
          className={
            spread
              ? 'columns-1 gap-8 sm:columns-2 md:columns-3 lg:columns-4'
              : 'grid h-full w-full place-items-center'
          }
        >
          {data.images.map((img, idx) => (
            <PhotoCard key={idx} img={img} index={idx} spread={spread} />
          ))}
        </div>
        <div className="h-32"></div> {/* Spacer at bottom */}
      </div>

      {/* Spray Painting Effect Overlay (Visual Flourish) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1.5 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${PaintSpray.src})` }}
      />
    </motion.div>
  );
}

function PhotoCard({ img, index, spread }) {
  return (
    <motion.div
      layout
      initial={{ rotate: random(-5, 5), scale: 0.8 }}
      animate={{
        rotate: spread ? img.rotation : random(-5, 5),
        scale: spread ? 1 : 0.8,
      }}
      transition={{
        duration: 0.8,
        delay: spread ? index * 0.08 : 0, // Stagger the dealing
        type: 'spring',
        damping: 20,
        stiffness: 100,
      }}
      className={
        spread
          ? 'relative mb-8 inline-block w-full break-inside-avoid'
          : 'col-start-1 row-start-1 w-64 max-w-[80vw] shadow-2xl'
      }
      style={{
        zIndex: spread ? 1 : 50 - index,
      }}
    >
      <div
        className={`border-2 border-black bg-white p-3 shadow-lg transition-transform ${
          spread ? 'hover:z-10 hover:scale-105' : ''
        }`}
      >
        <div className="absolute -top-3 left-1/2 z-10 w-6 -translate-x-1/2">
          <PinIcon className="h-6 w-6" />
        </div>
        <img src={img.src} alt="Gallery" className="h-auto w-full object-cover" />
      </div>
    </motion.div>
  );
}
