import VerticalTimeline from '@/components/sections/gallery/Timeline';
import Header from '@/components/shared/texts/Header';
import React from 'react';

const Gallery = () => {
  return (
    <div className="bg-cream">
      <Header
        heading="Gallery"
        bgColorClass={'bg-cream'}
        textColorClass={'text-cream'}
        brushColor={'#000000'}
      />
      <VerticalTimeline />
    </div>
  );
};

export default Gallery;
