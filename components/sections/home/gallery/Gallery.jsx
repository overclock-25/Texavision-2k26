'use client';
import TornEdge0 from '@/components/shared/edges/TornEdge0';
// import Masonry from '@/components/shared/utils/Masonry';
// import { SplashGif } from '@/components/shared/utils/SplashGifOverlay';
// import { mask } from 'motion/react-client';
import React from 'react';

const data = [
  {
    id: 1,
    img: '/images/png/photo.jpg',
    maskSrc: '/images/frame/background.svg',
  },
  {
    id: 2,
    img: '/images/png/photo.jpg',
    maskSrc: '/images/frame/background2.svg',
  },
  {
    id: 3,
    img: '/images/png/photo.jpg',
    maskSrc: '/images/frame/background3.svg',
  },
  {
    id: 4,
    img: '/images/png/photo.jpg',
    maskSrc: '/images/frame/background4.svg',
  },
  {
    id: 5,
    img: '/images/png/photo.jpg',
    maskSrc: '/images/frame/background.svg',
  },
  {
    id: 6,
    img: '/images/png/photo.jpg',
    maskSrc: '/images/frame/background2.svg',
  },
  {
    id: 7,
    img: '/images/png/photo.jpg',
    maskSrc: '/images/frame/background3.svg',
  },
  {
    id: 8,
    img: '/images/png/photo.jpg',
    maskSrc: '/images/frame/background4.svg',
  },
];

const Gallery = () => {
  const imageRef = React.useRef(null);
  const color = '#1E3A8A'; // Example color, you can customize or pass as prop
  return (
    <div className="relative w-full bg-[url('/images/png/wall-gallery.jpg')] bg-cover bg-center">
      <TornEdge0
        upSectionColor="#000000"
        edgeColor="#ffffff"
        className="absolute top-0 left-0 z-15 overflow-hidden"
        downSectionColor="transparent"
      />
      <TornEdge0
        upSectionColor="#000000"
        edgeColor="#ffffff"
        version="rotated"
        className="absolute bottom-0 left-0 z-15 overflow-hidden"
        downSectionColor="transparent"
      />
      <div className="relative z-10 flex min-h-[700px] w-full grid-cols-1 flex-col items-center justify-start gap-8 overflow-hidden px-10 py-30">
        <div className="absolute top-0 left-0 h-full w-full bg-black/50" />
        <h2 className="text-vanilla-cream z-10 text-center text-4xl font-bold md:text-5xl lg:text-6xl">
          Let{"'"}s Create Memories Together
        </h2>
        <div className="z-10 grid h-full w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {data.map(({ id, img, maskSrc }) => (
            <div
              key={id}
              ref={imageRef}
              className="h-60 w-40 overflow-hidden rounded-lg opacity-75 brightness-90 grayscale transition-all duration-300 hover:opacity-100 hover:brightness-100 hover:grayscale-0 md:h-80 md:w-60"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitMaskImage: `url(${maskSrc})`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url(${maskSrc})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
          ))}
          {/* <SplashGif bgImage='/images/png/photo.jpg' maskImage='/images/gif/mask.gif' delay={300} /> */}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
