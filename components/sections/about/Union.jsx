'use client';
import { SplashGif } from '@/components/shared/utils/SplashGifOverlay';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';

const data = {
  title: 'Student Activity and Welfare Committee (SAWC)',
};

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
    <div className="flex flex-col gap-10">
      <div className="w-full">
        <h2 className="appear mb-8 text-center text-4xl font-bold text-purple-700 md:text-8xl">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Developer 1 */}
        {Array(4)
          .fill()
          .map((_, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <div className="relative flex h-80 w-100 items-center justify-center">
                <SplashGif
                  bgImage="/images/team/dev1.png"
                  maskImage="/images/gif/mask.gif"
                  delay={500}
                  unique={true}
                  className="mb-4 h-80 w-100 rounded-full"
                />
              </div>
              <div className="mt-4 flex flex-col items-center">
                <h3 className="text-2xl font-semibold">Anish Bar</h3>
                <p className="mt-2 text-center">
                  Frontend Developer passionate about creating stunning user interfaces.
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Union;
