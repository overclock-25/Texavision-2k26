'use client';
import React from 'react';

import Header from '@/components/sections/contact/Header';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import GraffitiAbout from './GraffitiAbout';
import Image from 'next/image';
// import PrimaryButton from '@/components/shared/buttons/PrimaryButton';

const data = {
  title: 'About Us',
  subtitle:
    'Texavision 2k26 team is a group of passionate individuals dedicated to innovation and creativity.',
};

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
    <div className="bg-vanilla-cream relative flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden">
      <GraffitiAbout title={data.title} subtitle={data.subtitle} />

      <Image
        src="/images/team/graffiti-about.png"
        alt="Graffiti About"
        layout="fill"
        className="absolute inset-0 z-5 h-full w-full object-cover brightness-20"
      />
      <div className="full absolute bottom-0 z-6 h-1/3 w-full bg-linear-to-t from-black to-transparent" />
      {/* <Header
        title="About Us"
        subtitle="Learn more about the passionate team behind Texavision 2k26."
      /> */}
      {/* <p className="fly-in max-w-4xl text-center text-xl md:text-2xl">
        Texavision 2k26 team is a group of passionate individuals dedicated to innovation and
        creativity.
      </p> */}
      {/* <PrimaryButton /> */}
    </div>
  );
};

export default Hero;
