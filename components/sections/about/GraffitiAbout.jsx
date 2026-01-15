import Image from 'next/image';
import React from 'react';

const GraffitiAbout = ({ title, subtitle }) => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-20 md:px-8 lg:px-16">
      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        <h2 className="graffiti-text graffiti absolute inset-0 mb-6 text-center text-7xl leading-none font-bold text-white drop-shadow-[2px_2px_0_white] md:text-7xl lg:text-9xl">
          {title}
        </h2>
        <h2 className="graffiti relative mb-6 bg-[url('/images/team/graffiti-about.png')] bg-cover bg-clip-text bg-center text-center text-7xl leading-none font-bold text-transparent [-webkit-background-clip:text] md:text-7xl lg:text-9xl">
          {title}
        </h2>
        <p className="mx-auto w-2/3 max-w-2xl text-center text-sm! text-white md:text-2xl md:text-[18px]!">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default GraffitiAbout;
