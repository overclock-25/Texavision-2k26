'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import panicImg from '@/assets/images/home/panic.webp';
import trap from '@/assets/images/home/trap.webp';
import Header from '@/components/shared/texts/Header';

const performanceData = [
  {
    id: 1,
    date: '14',
    month: 'Feb',
    year: '2026',
    title: 'Opening Night',
    image: trap,
  },
  {
    id: 2,
    date: '15',
    month: 'Feb',
    year: '2026',
    title: 'Main Event',
    image: panicImg,
  },
  {
    id: 3,
    date: '16',
    month: 'Feb',
    year: '2026',
    title: 'Grand Finale',
    image: panicImg,
  },
];

const Performances = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-transition every 20 seconds with looping
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % performanceData.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const selectedPerformance = performanceData[selectedIndex];

  // Calculate position for 3D carousel effect
  const getCarouselStyle = (index) => {
    const total = performanceData.length;
    let offset = index - selectedIndex;

    // Handle looping - find shortest path
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const isSelected = offset === 0;
    const absOffset = Math.abs(offset);

    // 3D positioning
    const translateX = offset * 160;
    const translateZ = isSelected ? 0 : -150 - absOffset * 50;
    const rotateY = offset * -35;
    const scale = isSelected ? 1 : 0.75;
    const opacity = absOffset > 1 ? 0.4 : isSelected ? 1 : 0.7;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: isSelected ? 30 : 10 - absOffset,
      opacity,
    };
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="pointer-events-none absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/edit-stock.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay for content readability */}
      <div className="absolute inset-0 z-1 bg-black/60" />

      {/* Gradient mask - top fade to black */}
      <div className="absolute inset-x-0 top-0 z-2 h-40 bg-linear-to-b from-black via-black/70 to-transparent" />

      {/* Gradient mask - bottom fade to black */}
      <div className="absolute inset-x-0 bottom-0 z-2 h-40 bg-linear-to-t from-black via-black/70 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-16 md:px-12 lg:px-20">
        {/* Mobile: Title at top */}
        {/* <h2 className="lg:hidden font-grindy-brush text-5xl md:text-6xl text-cream mb-8 tracking-wide text-center">
					Performances
				</h2> */}
        <Header
          heading="Performances"
          bgColorClass={'bg-transparent lg:hidden'}
          textColorClass={'text-black'}
          brushColor={'#ffffff'}
        />

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left Side - Picture with overlaid date cards on mobile */}
          <div className="flex w-full justify-center lg:w-1/2 lg:justify-start">
            <div className="relative w-full max-w-md">
              {/* Image Container */}
              <div className="bg-blur relative mb-6 h-[500px] w-full overflow-hidden rounded-lg bg-transparent shadow-lg lg:mb-0">
                <Image
                  src={selectedPerformance.image}
                  alt={selectedPerformance.title}
                  fill
                  className="object-fit transition-all duration-500 ease-in-out"
                  priority
                />
              </div>

              {/* Date Cards - Overlaid on image for mobile, hidden on desktop */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 lg:hidden">
                {performanceData.map((performance, index) => {
                  const isSelected = index === selectedIndex;

                  return (
                    <div
                      key={performance.id}
                      onClick={() => setSelectedIndex(index)}
                      className={`flex h-16 w-20 cursor-pointer flex-col items-center justify-center rounded-lg backdrop-blur-sm transition-all duration-300 ease-out ${
                        isSelected
                          ? 'bg-charcoal text-cream scale-105 shadow-xl'
                          : 'text-charcoal border-charcoal/20 border bg-transparent shadow-md'
                      } `}
                    >
                      <span
                        className={`font-gillian-joe text-xl font-bold ${
                          isSelected ? 'text-cream' : 'text-charcoal'
                        }`}
                      >
                        {performance.date}
                      </span>
                      <span
                        className={`text-xs tracking-wider uppercase ${
                          isSelected ? 'text-cream/80' : 'text-charcoal/70'
                        }`}
                      >
                        {performance.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Title & Date Cards (Desktop only) */}
          <div className="hidden h-[500px] w-full flex-col items-center justify-between lg:flex lg:w-1/2 lg:items-end">
            {/* Title - Desktop */}
            <h2 className="font-grindy-brush text-cream text-5xl tracking-wide md:text-6xl lg:text-7xl">
              Performances
            </h2>
            {/* <Header
        heading="Performances"
        bgColorClass={'bg-transparent lg:block hidden'}
        textColorClass={'text-sand'}
        brushColor={'#ffffff'}
      /> */}

            {/* Performance Title */}
            <div className="text-center lg:text-right">
              {/* <h3 className="font-drunk-millionaire text-2xl md:text-3xl text-cream">
                {selectedPerformance.title}
              </h3> */}
            </div>

            {/* 3D Carousel - Desktop */}
            <div
              className="relative flex h-48 w-full items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {performanceData.map((performance, index) => {
                  const isSelected = index === selectedIndex;
                  const carouselStyle = getCarouselStyle(index);

                  return (
                    <div
                      key={performance.id}
                      onClick={() => setSelectedIndex(index)}
                      className={`absolute flex h-32 w-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl transition-all duration-700 ease-out ${
                        isSelected ? 'shadow-cream/20 shadow-2xl' : 'shadow-lg'
                      } `}
                      style={{
                        ...carouselStyle,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      {/* Card background image */}
                      <Image
                        src={performance.image}
                        alt={performance.title}
                        fill
                        className="object-cover"
                      />
                      {/* Dark overlay */}
                      <div
                        className={`absolute inset-0 ${
                          isSelected ? 'bg-black/40' : 'bg-black/60'
                        } transition-all duration-500`}
                      />
                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <span className="font-gillian-joe text-cream text-4xl font-bold drop-shadow-lg">
                          {performance.date}
                        </span>
                        <span className="text-cream/90 block text-sm tracking-wider uppercase drop-shadow-md">
                          {performance.month} {performance.year}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Performance Title below image */}
        <div className="mt-6 text-center lg:hidden">
          {/* <h3 className="font-drunk-millionaire text-2xl text-cream">
            {selectedPerformance.title}
          </h3> */}
        </div>
      </div>
    </section>
  );
};

export default Performances;
