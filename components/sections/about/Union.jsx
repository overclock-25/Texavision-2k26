'use client';
import { SplashGif } from '@/components/shared/utils/SplashGifOverlay';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import UnionMember from './members/UnionMember';

const data = {
  title: 'Student Activity and Welfare Committee (SAWC)',
};

const union = [
  {
    name: 'Anish Bar',
    department: 'CSE',
  },
  {
    name: 'Kunal Das',
    department: 'ECE',
  },
  {
    name: 'Anuvab Maity',
    department: 'ME',
  },
  {
    name: 'Sunanda Manna',
    department: 'CE',
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
    <div className="flex flex-col gap-10 px-16 py-14">
      <div className="w-full">
        <h2 className="appear mx-auto mb-8 w-full text-center text-4xl font-bold text-purple-700 md:w-3/4 md:text-6xl">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Developer 1 */}
        {union.map((member, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {/* <div className="relative flex h-80 w-100 items-center justify-center">
                <SplashGif
                  bgImage="/images/team/dev1.png"
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
            <UnionMember department={member.department} name={member.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Union;
