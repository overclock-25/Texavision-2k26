'use client';
import DripIcon from '@/components/shared/Icons/DripIcon';
import { SplashGif } from '@/components/shared/utils/SplashGifOverlay';
import MaskText from '@/components/ui/MaskText';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

const devs = [
  {
    name: 'Anish Bar',
    user: 'Anix',
    role: 'Frontend Developer',
    image: '/images/team/anish.jpg',
    linkedIn: 'https://www.linkedin.com/in/anishbar/',
    github: 'https://github.com/Anix003',
  },
  {
    name: 'Kunal Das',
    user: 'Kyo',
    role: 'Backend Developer',
    image: '/images/team/kunal.jpg',
    linkedIn: 'https://www.linkedin.com/in/kunal-das-dev/',
    github: 'https://github.com/kunal25das',
  },
  {
    name: 'Anuvab Maity',
    user: 'Pryor',
    role: 'AI Developer',
    image: '/images/team/anuvab.png',
    linkedIn: 'https://www.linkedin.com/in/anuvab-maity-789b08257/',
    github: 'https://github.com/anuvabmaity',
  },
  {
    name: 'Sunanda Manna',
    user: 'Sunshine',
    role: 'Full Stack Developer',
    image: '/images/team/sunanda.jpg',
    linkedIn: 'https://www.linkedin.com/in/sunanda-manna-168617258/',
    github: 'https://github.com/sunanda-05',
  },
];
const Developers = () => {
  return (
    <div className="relative">
      <Image
        src="/images/png/wall2.jpg"
        alt="Background"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-5 h-1/2 w-full bg-linear-to-b from-[#d4d4d4] to-transparent md:h-1/2" />
      <div className="flex flex-col gap-10 bg-transparent px-4 py-8 md:px-16 md:py-14">
        <div className="relative mx-auto w-fit">
          {/* <h2 className="text-[#333333] mx-auto mb-8 w-full text-center text-6xl font-bold md:w-3/4 md:text-6xl">
            Meet the Developers
          </h2> */}
          <MaskText
            title="Meet the Developers"
            size="medium"
            maskBgUrl="/images/png/graffiti-wall.jpg"
          />
          <Image
            src="/images/svg/brush-stroke.svg"
            fill
            alt="brush stroke"
            className="-z-2 h-full w-full object-contain opacity-50"
          />
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Developer 1 */}
          {devs.map((_, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <div className="relative flex h-40 w-50 items-center justify-center">
                <SplashGif
                  bgImage={devs[index].image}
                  maskImage="/images/gif/mask.gif"
                  delay={500}
                  unique={true}
                  className="h-40 w-50 rounded-full"
                />
              </div>
              <div className="mt-4 flex flex-col items-center">
                {/* <span className="flex gap-4">
                  <h5 className="font-gillian-joe! mt-3 text-[20px]! text-amber-700">
                    {devs[index].name}
                  </h5>
                </span> */}
                <h3 className="text-center text-4xl font-semibold md:text-4xl">
                  {devs[index].name}
                </h3>
                {/* <p className="mt-2 text-center">
                  {devs[index].role}
                </p> */}
                <div className="flex">
                  <a target="_blank" href={devs[index].linkedIn} className="mx-2 text-blue-600">
                    <DripIcon color="blue" iconColor="white">
                      <IconBrandLinkedin size={32} className="text-white" />
                    </DripIcon>
                  </a>
                  <a target="_blank" href={devs[index].github} className="mx-2 text-gray-800">
                    <DripIcon color="#333333" iconColor="white">
                      <IconBrandGithub size={32} className="text-white" />
                    </DripIcon>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 -z-5 h-1/2 w-full bg-linear-to-t from-[#d4d4d4] to-transparent md:h-1/2" />
    </div>
  );
};

export default Developers;
