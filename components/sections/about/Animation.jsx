import SpriteHeader from '@/components/shared/texts/SpriteHeader';
import RandomShapeRevealCanvas from '@/components/shared/utils/RandomShapeRevealCanvas';
import React from 'react';

const Animation = () => {
  return (
    <div className="flex flex-col gap-10 bg-gray-100 px-14 py-16">
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
          brushColor="black" // Custom brush color
          bgColorClass="#000000"
          textColorClass="text-gray-100"
          duration={1.5}
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-lg md:text-xl">
          Since our inception, Texavision 2k26 has been committed to fostering innovation and
          creativity among students. Our journey began with a small group of passionate individuals
          who envisioned a platform where ideas could flourish. Over the years, we have grown into a
          vibrant community, organizing events, workshops, and hackathons that inspire and empower
          students to push the boundaries of technology and design. Join us as we continue to
          explore new horizons and make a lasting impact in the world of tech.
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-evenly gap-20 sm:flex-row">
        <RandomShapeRevealCanvas
          src="/images/svg/college-logo.svg"
          width={200}
          height={200}
          shapeCount={40}
          growthSpeed={2}
          className=""
        />
        <RandomShapeRevealCanvas
          src="/images/svg/sawc-logo.svg"
          width={200}
          height={200}
          shapeCount={40}
          growthSpeed={2}
          className=""
        />
      </div>
    </div>
  );
};

export default Animation;
