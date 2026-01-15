'use client';
import { ContactUsLink } from '@/components/sections/home/hero/ContactUsLink';
import { ScrollDownArrow } from '@/components/sections/home/hero/ScrollDownArrow';
import { SplashGif } from '@/components/sections/home/hero/SplashGif';
import { CountdownTimer } from '@/components/sections/home/hero/Timer';
import { useIsMobile } from '@/hooks/useMobile';
import Logo from '@/public/hero/texavision.svg';
import { useEffect, useState } from 'react';

const STAGES = {
  INITIAL_LOGO: 0,
  SPLASH_ONE: 1,
  SPLASH_TWO: 2,
  SPLASH_THREE: 3,
  SPLASH_FOUR: 4,
  FINAL_UI: 5,
};
const SEQUENCE = [
  { next: STAGES.SPLASH_ONE, delay: 4000 },
  { next: STAGES.SPLASH_TWO, delay: 1000 },
  { next: STAGES.SPLASH_THREE, delay: 500 },
  { next: STAGES.SPLASH_FOUR, delay: 300 },
  { next: STAGES.FINAL_UI, delay: 2000 },
];

const Hero = () => {
  const [stage, setStage] = useState(STAGES.INITIAL_LOGO);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (stage < STAGES.FINAL_UI) {
      const currentStep = SEQUENCE[stage];
      const timer = setTimeout(() => {
        setStage(currentStep.next);
      }, currentStep.delay);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center bg-no-repeat brightness-40"
        style={{ backgroundImage: `url('hero/bg.jpg')` }}
      />

      {/* Sequential Splashes */}
      <SplashGif
        isVisible={stage >= STAGES.SPLASH_ONE}
        className="top-1/2 left-1/3 z-0 h-screen w-[90vw] min-w-[600px] -translate-x-1/2 -translate-y-1/2"
        maskImage="hero/1/mask.gif"
        bgImage="hero/1/img.jpg"
      />

      {!isMobile && (
        <SplashGif
          isVisible={stage >= STAGES.SPLASH_TWO}
          className="-top-10 right-10 z-10 h-[80vh] w-[60vh]"
          maskImage="hero/2/mask.gif"
          bgImage="hero/2/img.jpg"
        />
      )}

      <SplashGif
        isVisible={stage >= STAGES.SPLASH_THREE}
        className="top-0 left-0 z-10 h-[45vh] w-[40vw] min-w-[250px]"
        maskImage="hero/3/mask.gif"
        bgImage="hero/3/img.jpg"
      />

      <SplashGif
        isVisible={stage >= STAGES.SPLASH_FOUR}
        className="right-0 -bottom-40 z-10 h-[70vh] w-[40vw] min-w-[400px] scale-x-[-1] md:right-20 md:-bottom-20"
        maskImage="hero/4/mask.gif"
        bgImage="hero/4/img.jpg"
      />

      {/* UI Layers */}
      {stage < STAGES.SPLASH_TWO && (
        <div className={`hero flex h-screen w-full flex-col items-center justify-center`}>
          <Logo className="h-auto w-[80vw] max-w-200" />
        </div>
      )}

      {/* Final Interactive UI (Stage 5) */}
      <div
        className={`absolute z-100 flex h-screen w-full flex-col items-center justify-center bg-black/60 pt-30 transition-opacity duration-700 ${
          stage === STAGES.FINAL_UI ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'opacity, transform' }} // Tells the browser to optimize this
      >
        <Logo className="mb-10 h-auto w-[80vw] max-w-200 fill-white/90" />
        <CountdownTimer target="2026-01-25T00:00:00+05:30" />
        <ContactUsLink link="https://cal.com/texavision-2k26/30min" />
      </div>

      {stage >= STAGES.SPLASH_FOUR && <ScrollDownArrow />}
    </div>
  );
};

export default Hero;
