import { SplashGif } from '@/components/shared/utils/SplashGifOverlay';
import React from 'react';

const Developers = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full">
        <h2 className="mb-8 text-center text-5xl font-bold md:text-6xl">Meet the Developers</h2>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        {/* Developer 1 */}
        {Array(4)
          .fill()
          .map((_, index) => (
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

export default Developers;
