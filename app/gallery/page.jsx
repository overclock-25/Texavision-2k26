import VerticalTimeline from '@/components/sections/gallery/Timeline';
import TornEdge0 from '@/components/shared/edges/TornEdge0';
import TornEdge2 from '@/components/shared/edges/TornEdge2';
import Header from '@/components/shared/texts/Header';
import React from 'react';

const Gallery = () => {
  return (
    <div className="bg-sand-light">
      <Header
        heading="Gallery"
        bgColorClass={'bg-sand-light'}
        textColorClass={'text-sand'}
        brushColor={'#000000'}
      />
      <VerticalTimeline />
      <TornEdge0
        version="rotated"
        upSectionColor="#000000"
        edgeColor="#ffffff"
        className="overflow-hidden"
        downSectionColor="#faf5ee"
      />
    </div>
  );
};

export default Gallery;
