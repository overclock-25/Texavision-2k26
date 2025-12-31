'use client';
import React from 'react';
import Image from 'next/image';
import heroImage from '@/assets/images/shared/hero-image.jpeg';
import Logo from '@/assets/images/shared/tex.png';
import Path from '@/assets/images/shared/vector-path.png';
import LogoText from '@/assets/images/svgs/tex.svg';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { FacebookIcon } from '@/components/ui/FacebookIcon';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { TwitterIcon } from '@/components/ui/TwitterIcon';
import { LinkedinIcon } from '@/components/ui/LinkedinIcon';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
  const bgImage = React.useRef(null);
  const sectionPadding = 'md:px-10 sm:px-6 px-4 md:py-8 sm:py-6 py-4';
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(bgImage.current, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px) brightness(60%)',
      duration: 1.5,
      ease: 'power3.out',
    });
  });
  return (
    <div
      className={`font-montserrat relative min-h-screen w-full bg-transparent text-white ${sectionPadding}`}
    >
      <div className="relative top-0 left-0 z-20 flex h-full w-full flex-col items-start justify-evenly gap-8">
        <div className="flex flex-row items-start justify-start gap-8">
          <div className="flex flex-row items-center justify-center gap-4">
            <div className="flex flex-row items-center justify-center gap-2">
              <Image src={Logo} alt="Texavision Logo" className="w-[50px] object-contain" />
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <Image src={LogoText} alt="Texavision Logo" className="w-[150px] object-contain" />
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 md:flex-row">
          <div className="flex h-full w-full flex-col items-start justify-start gap-8 md:w-1/2">
            <div className="flex w-full flex-col gap-8 text-center md:text-left">
              <h1 className="z-30 text-5xl font-black tracking-wider uppercase md:text-8xl">
                Texavision 2k26
              </h1>
              <div className="flex items-center justify-start text-2xl">
                25th - 28th January 2026 | GCETTS, Hooghly
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col justify-center gap-6 text-4xl font-bold md:justify-start">
              <span className="w-full text-center text-yellow-200 md:text-left">
                Seeing you soon ...
              </span>
            </div>
            <div className="flex w-fit items-start justify-start">
              <FlipClockCountdown
                to={new Date('2026-01-25').getTime()}
                labels={['Days', 'Hours', 'Minutes', 'Seconds']}
                duration={0.5}
                className={`no-seconds -mx-2 flex max-w-screen -translate-x-10 scale-60 items-center justify-start gap-2 px-1 py-2 sm:translate-x-0 md:mx-0 md:scale-90 md:gap-4 md:px-3 md:py-4 lg:scale-100 lg:gap-6 lg:px-6 xl:scale-110`}
                // onComplete={() => console.log('Countdown finished!')}
              />
            </div>
            <div className="flex w-full items-center justify-center md:justify-start">
              <a href="https://cal.com/texavision-2k26" target="_blank" rel="noopener noreferrer">
                <button
                  type="button"
                  className="rounded-lg border-2 border-yellow-200 px-4 py-2 font-black tracking-wider text-yellow-200 transition-colors duration-200 ease-in-out hover:bg-yellow-200 hover:text-black"
                >
                  Contact Us
                </button>
              </a>
            </div>
          </div>
          <div className="relative z-25 hidden h-full w-full flex-col items-center justify-center sm:flex">
            <div className="relative z-30 flex aspect-square h-[400px] w-fit items-center justify-center rounded-full bg-black/30 shadow-lg shadow-black/50 backdrop-blur-md">
              <Image
                src="/videos/soon.gif"
                alt="Hero Animation"
                width={290}
                height={290}
                className="h-full w-full object-contain"
              />
            </div>
            <Image src={Path} alt="Decorative Path" className="absolute z-20 w-full object-cover" />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-6 md:justify-start">
          <div className="font-bold text-gray-500">Social Links</div>
          <div className="font-bold text-gray-500"> - </div>
          <div className="flex flex-row gap-6">
            <a
              href="https://www.facebook.com/share/14JKvJdc4YQ/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-gray-400">
                <FacebookIcon />
              </div>
            </a>
            <a
              href="https://www.instagram.com/texavision_official"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-gray-400">
                <InstagramIcon />
              </div>
            </a>
            <div className="text-gray-400">
              <TwitterIcon />
            </div>
            <div className="text-gray-400">
              <LinkedinIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[radial-gradient(ellipse_at_center _var(--tw-gradient-stops))] bg-vintage absolute top-0 left-0 z-10 h-full w-full from-zinc-50 to-black opacity-80" />
      <Image
        ref={bgImage}
        src={heroImage}
        alt="Hero Background"
        className="absolute top-0 left-0 -z-1 h-full scale-190 bg-clip-padding object-cover blur-2xl brightness-30"
      />
    </div>
  );
};

export default Hero;
