'use client';
import { SplashGif } from '@/components/sections/home/hero/SplashGif';
import { CountdownTimer } from '@/components/sections/home/hero/Timer';
import Logo from '@/public/hero/texavision.svg';

import { useIsMobile } from '@/hooks/useMobile';

const DELAY = 3000;

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute top-0 left-0 -z-10 h-full w-full bg-cover bg-center brightness-40"
        style={{ backgroundImage: `url('hero/bg.jpg')` }}
      ></div>

      <SplashGif
        className="top-1/2 left-1/3 z-0 h-screen w-[90vw] min-w-[600px] -translate-x-1/2 -translate-y-1/2"
        delay={DELAY}
        maskImage="hero/1/mask.gif"
        bgImage="hero/1/img.jpg"
      />

      {!isMobile && (
        <SplashGif
          className="-top-10 right-10 z-10 h-[80vh] w-[60vh]"
          delay={DELAY + 1000}
          maskImage="hero/2/mask.gif"
          bgImage="hero/2/img.jpg"
        />
      )}

      <SplashGif
        className="top-0 left-0 z-10 h-[45vh] w-[40vw] min-w-[250px]"
        delay={DELAY + 1500}
        maskImage="hero/3/mask.gif"
        bgImage="hero/3/img.jpg"
      />

      <SplashGif
        className="right-0 -bottom-40 z-10 h-[70vh] w-[40vw] min-w-[400px] scale-x-[-1] md:right-20 md:-bottom-20"
        delay={DELAY + 1800}
        maskImage="hero/4/mask.gif"
        bgImage="hero/4/img.jpg"
      />

      <div className="hero absolute z-200 flex h-screen w-full flex-col items-center justify-center gap-10">
        <Logo className="h-auto w-[80vw] max-w-200" />
        <CountdownTimer target={'2026-01-25T00:00:00+05:30'} delay={DELAY} />
      </div>
    </div>
  );
};

export default Hero;
