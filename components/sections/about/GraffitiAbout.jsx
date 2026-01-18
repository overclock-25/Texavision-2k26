import MaskText from '@/components/ui/MaskText';
import Image from 'next/image';
import React from 'react';

const GraffitiAbout = ({ title, subtitle }) => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-20 md:px-8 lg:px-16">
      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        <MaskText title={title} size="large" maskBgUrl="/images/team/graffiti-about.png" />
        <p className="mx-auto w-2/3 max-w-2xl text-center text-sm! text-white md:text-2xl md:text-[18px]!">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default GraffitiAbout;
