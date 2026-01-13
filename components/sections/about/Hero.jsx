'use client';
import React from 'react';

import Header from './Header';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
// import PrimaryButton from '@/components/shared/buttons/PrimaryButton';

const Hero = () => {
  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        '.fly-in',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 1 }
      );
    },
    { scope: null }
  );
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Header title="About Us" />
      <p className="fly-in max-w-4xl text-center text-xl md:text-2xl">
        Texavision 2k26 team is a group of passionate individuals dedicated to innovation and
        creativity.
      </p>
      {/* <PrimaryButton /> */}
    </div>
  );
};

export default Hero;
