'use client';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import React from 'react';
import { SplashGif } from '@/components/shared/utils/SplashGifOverlay';
import CircularRevealCanvas from '@/components/shared/utils/CircularRevealCanvas';
import RandomShapeRevealCanvas from '@/components/shared/utils/RandomShapeRevealCanvas';

gsap.registerPlugin(ScrollTrigger);

const Header = ({ title = 'About Us' }) => {
  const bgRef = React.useRef(null);
  const titleRef = React.useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.to(bgRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        // scrollTrigger: {
        //   trigger: bgRef.current,
        //   start: 'top bottom',
        //   end: 'bottom top',
        //   scrub: true,
        // },
      }).to(titleRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' });
    },
    { scope: bgRef }
  );
  return (
    <div className="relative my-20 flex w-full flex-col items-center justify-center overflow-hidden">
      <h2
        ref={titleRef}
        className="text-purple-rich font-grindy-brush absolute z-10 mx-auto flex w-full translate-y-0 items-center justify-center text-center text-7xl font-extrabold opacity-0 md:w-3/4 md:text-9xl"
      >
        {title}
      </h2>
      {/* <SplashGif
        bgImage="/images/team/photo.png"
        maskImage="/images/gif/mask.gif"
        delay={500}
        unique={true}
        className="object-contain w-1/2 h-100"
      /> */}
      <RandomShapeRevealCanvas
        src="/images/png/spray-tp.png"
        height={500}
        width={1000}
        shapeCount={40}
        growthSpeed={2}
        className="h-100 w-1/2 object-contain"
      />

      {/* <CircularRevealCanvas
        src="/images/svg/spray-paint.svg"
        size={400}
        speed={5}
        center="center"
        className="absolute -top-[65%] left-[15%] w-1/2 object-contain opacity-0 md:-top-[55%] md:left-[25%] md:w-1/3"
      /> */}
      {/* <Image
        ref={bgRef}
        src="/images/svg/spray-paint.svg"
        fill
        alt="spray-paint"
        className="absolute -top-[65%] left-[15%] w-1/2 object-contain opacity-0 md:-top-[55%] md:left-[25%] md:w-1/3"
      /> */}
    </div>
  );
};

export default Header;
