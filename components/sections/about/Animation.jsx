import SpriteHeader from '@/components/shared/texts/SpriteHeader';
import MaskImage from '@/components/shared/utils/MaskImage';
import RandomShapeRevealCanvas from '@/components/shared/utils/RandomShapeRevealCanvas';
import React from 'react';

const Animation = () => {
  return (
    <div className="flex flex-col gap-6 bg-black px-4 py-8 sm:gap-8 sm:px-8 sm:py-12 md:gap-10 md:px-14 md:py-16">
      <div className="w-full">
        {/* <h2 className="mx-auto w-full text-center text-5xl font-bold text-white md:w-3/4 md:text-6xl">
          Our Journey
        </h2> */}
        <SpriteHeader
          heading="Our Journey"
          spriteSrc="/spr-header.png"
          frames={24}
          orientation="vertical"
          frameAspectRatio={1280 / 720}
          brushColor="#00b8db" // Custom brush color
          bgColorClass="#ffffff"
          textColorClass="text-black"
          duration={1.5}
        />
      </div>
      <div className="mx-auto max-w-4xl px-4 text-center text-white/70">
        <p className="text-base sm:text-lg md:text-xl">
          Since our inception,{' '}
          <span className="text-purple-rich font-grindy-brush text-[18px]">Texavision 2k26</span>{' '}
          has been committed to fostering innovation and creativity among students. Our journey
          began with a small group of{' '}
          <span className="text-purple-rich font-grindy-brush text-[18px]">
            passionate individuals{' '}
          </span>
          who envisioned a platform where ideas could flourish. Over the years, we have grown into a
          <span className="text-purple-rich font-grindy-brush text-[18px]"> vibrant community</span>
          , <span className="font-grindy-brush text-[18px] text-cyan-500">organizing events</span>,{' '}
          <span className="font-grindy-brush text-[18px] text-blue-500">workshops</span>, and{' '}
          <span className="font-grindy-brush text-[18px] text-orange-500">hackathons</span> that
          inspire and empower students to push the boundaries of technology and design. Join us as
          we continue to explore new horizons and make a lasting impact in the world of tech.
        </p>
      </div>
      <div className="relative mx-auto flex h-[500px] w-full flex-col items-center justify-center gap-8 rounded-lg px-4 py-20 sm:h-[400px] sm:gap-12 md:h-[500px] md:flex-row md:gap-16 lg:h-[600px] lg:gap-20">
        <RandomShapeRevealCanvas
          src="/images/svg/college-logo.svg"
          width={200}
          height={200}
          shapeCount={40}
          growthSpeed={2}
          className="relative z-10 w-1/2 max-w-[150px] sm:w-1/3 sm:max-w-[180px] md:w-auto md:max-w-none md:-translate-y-10"
        />
        <RandomShapeRevealCanvas
          src="/images/svg/sawc-logo.svg"
          width={200}
          height={200}
          shapeCount={40}
          growthSpeed={2}
          className="relative z-10 w-1/2 max-w-[150px] sm:w-1/3 sm:max-w-[180px] md:w-auto md:max-w-none md:-translate-y-15"
        />
        <MaskImage
          imageUrl="/images/png/lightwall.jpg"
          svgUrl="/images/png/spray-tp.png"
          className="absolute inset-0 z-5 hidden h-full w-full md:block"
        />
        <MaskImage
          imageUrl="/images/png/lightwall.jpg"
          svgUrl="/images/svg/background2.svg"
          className="absolute inset-0 z-5 h-full w-full md:hidden"
        />
      </div>
    </div>
  );
};

export default Animation;
