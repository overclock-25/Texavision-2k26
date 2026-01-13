import { SplashGif } from '@/components/shared/utils/SplashGifOverlay';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import React from 'react';

const devs = [
  {
    name: 'Anish Bar',
    role: 'Frontend Developer',
    image: '/images/team/dev1.png',
    linkedIn: '#',
    github: '#',
  },
  {
    name: 'Kunal Das',
    role: 'Backend Developer',
    image: '/images/team/dev1.png',
    linkedIn: '#',
    github: '#',
  },
  {
    name: 'Anuvab Maity',
    role: 'AI Developer',
    image: '/images/team/dev1.png',
    linkedIn: '#',
    github: '#',
  },
  {
    name: 'Sunanda Manna',
    role: 'Full Stack Developer',
    image: '/images/team/dev1.png',
    linkedIn: '#',
    github: '#',
  },
];
const Developers = () => {
  return (
    <div className="flex flex-col gap-10 bg-[#faf5ee] px-16 py-14">
      <div className="w-full">
        <h2 className="text-purple-rich mx-auto mb-8 w-full text-center text-xl font-bold md:w-3/4 md:text-6xl">
          Meet the Developers
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        {/* Developer 1 */}
        {devs.map((_, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div className="relative flex h-40 w-50 items-center justify-center">
              <SplashGif
                bgImage="/images/team/dev1.png"
                maskImage="/images/gif/mask.gif"
                delay={500}
                unique={true}
                className="mb-4 h-40 w-50 rounded-full"
              />
            </div>
            <div className="mt-4 flex flex-col items-center">
              <h3 className="text-center text-2xl font-semibold">{devs[index].name}</h3>
              {/* <p className="mt-2 text-center">
                  {devs[index].role}
                </p> */}
              <div className="flex">
                <a href={devs[index].linkedIn} className="mx-2 text-blue-600">
                  <IconBrandLinkedin className="h-10 w-10" />
                </a>
                <a href={devs[index].github} className="mx-2 text-gray-800">
                  <IconBrandGithub className="h-10 w-10" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
