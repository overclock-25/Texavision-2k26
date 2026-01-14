'use client';

import Image from 'next/image';
import BrushSwipeAnimation from './PosterReveal';
import PosterBg from '@/assets/images/svgs/poster.svg';

const Timeline = () => {
  return (
    <div className="bg-sand-light relative overflow-hidden">
      <div className="absolute top-0 left-0 z-0 h-full w-full">
        {/* <Image src={PosterBg.src} alt="Timeline" className="h-auto w-full" /> */}
        <PosterBg className="h-auto w-full" />
      </div>

      <div className="relative">
        <BrushSwipeAnimation />
      </div>
    </div>
  );
};

export default Timeline;
