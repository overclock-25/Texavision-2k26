import GalleryStacked from '@/components/sections/gallery/GalleryStacked';
import TornEdge0 from '@/components/shared/edges/TornEdge0';
import Header from '@/components/shared/texts/Header';
import SpriteHeader from '@/components/shared/texts/SpriteHeader';
import React from 'react';

const Gallery = () => {
  return (
    <div
      className="from-sand to-cream relative bg-linear-to-b pt-24"
      style={{
        backgroundImage: 'url(/svgs/gallery-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <SpriteHeader
        heading="Gallery"
        spriteSrc="/spr-header.png"
        frames={24}
        orientation="vertical"
        frameAspectRatio={1280 / 720}
        brushColor="#000000" // Custom brush color
        bgColorClass="bg-transparent"
        textColorClass="text-sand-light"
        duration={1.5}
      />
      <GalleryStacked />
      <TornEdge0
        version="rotated"
        upSectionColor="#000000"
        edgeColor="#faf7f2"
        className="absolute bottom-0 w-full overflow-hidden"
        downSectionColor="transparent"
      />
    </div>
  );
};

export default Gallery;
