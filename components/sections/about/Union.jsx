'use client';
// import { SplashGif } from '@/components/shared/utils/SplashGifOverlay';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import UnionMember from './members/UnionMember';
import TornEdge0 from '@/components/shared/edges/TornEdge0';
import Image from 'next/image';
import BrushStroke from '@/public/images/svg/brush-stroke.svg';
import BrushStroke2 from '@/public/images/svg/brush-stroke2.svg';
// import MaskText from '@/components/ui/MaskText';

const data = {
  title: 'Student Activity and Welfare Committee (SAWC)',
};

const union = [
  {
    name: 'Siddhartha Samanta',
    department: 'APM',
    imageUrl: '/images/union/sid.png',
  },
  {
    name: 'Ronak Shaw',
    department: 'TT',
    imageUrl: '/images/union/ron.png',
  },
  {
    name: 'Ushnangshu Ghosh',
    department: 'CSE',
    imageUrl: '/images/union/ush.jpg',
  },
  {
    name: 'Saiyad Aayan Rahman',
    department: 'IT',
    imageUrl: '/images/union/aay.jpg',
  },
];

const Union = ({ title = data.title }) => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.appear',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.3 }
    );
    return tl;
  });
  return (
    <div className="relative">
      <TornEdge0
        upSectionColor="#000000"
        edgeColor="#ffffff"
        className="absolute inset-0 -mt-px w-full overflow-hidden"
        // downSectionColor="#fef3c7"
        downSectionColor="transparent"
      />
      <div className="relative flex flex-col gap-10 px-16 py-26">
        <Image
          src="/images/png/wall3.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 opacity-75"
        />
        <div className="absolute inset-0 -z-5 w-full bg-black/30" />
        <div className="relative w-fit">
          <h2 className="appear relative mx-auto mb-8 w-full text-center text-6xl font-bold text-purple-700 md:w-3/4 md:text-6xl">
            Student Activity and Welfare Committee <span className="text-cyan-800">(SAWC)</span>
          </h2>
          {/* <Image
            src="/images/svg/brush-stroke.svg"
            fill
            alt="brush stroke"
            className="hidden md:block -z-2 h-full w-full object-contain opacity-50"
          /> */}
          <BrushStroke className="absolute inset-0 -z-2 hidden h-full w-full rotate-180 bg-no-repeat fill-purple-500/80 object-contain opacity-50 md:block" />
          {/* <Image
            src="/images/svg/brush-stroke2.svg"
            fill
            alt="brush stroke"
            className="block md:hidden -z-2 h-full w-full object-contain opacity-50"
          /> */}
          <BrushStroke2 className="absolute inset-0 -z-2 block h-full w-full fill-purple-500/60 object-contain md:hidden" />
          {/* <MaskText title={title} /> */}
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Developer 1 */}
          {union.map((member, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* <div className="relative flex h-80 w-100 items-center justify-center">
                <SplashGif
                  bgImage="/images/union/dev1.png"
                  maskImage="/images/gif/mask.gif"
                  delay={500}
                  unique={true}
                  className="mb-4 h-80 w-75 md:w-100 rounded-full"
                />
              </div>
              <div className="mt-4 flex flex-col items-center">
                <h3 className="text-5xl font-semibold text-center">Anish Bar</h3>
                <p className="mt-2 text-center">
                  Frontend Developer passionate about creating stunning user interfaces.
                </p>
              </div> */}
              <UnionMember
                department={member.department}
                name={member.name}
                imageUrl={member.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
      <TornEdge0
        upSectionColor="#d4d4d4"
        edgeColor="#ffffff"
        version="rotated"
        className="absolute bottom-0 -mt-px w-full overflow-hidden"
        downSectionColor="transparent"
      />
    </div>
  );
};

export default Union;
