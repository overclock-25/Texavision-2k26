import Animation from '@/components/sections/about/Animation';
import Developers from '@/components/sections/about/Developers';
import Hero from '@/components/sections/about/Hero';
import Union from '@/components/sections/about/Union';
import TornEdge0 from '@/components/shared/edges/TornEdge0';
import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      {/* <TornEdge0
        upSectionColor="#000000"
        edgeColor="#ffffff"
        className="-mt-px overflow-hidden"
        downSectionColor="#f3f4f6"
      /> */}
      <Animation />
      {/* <TornEdge0
        upSectionColor="#000000"
        edgeColor="#ffffff"
        className="-mt-px overflow-hidden"
        downSectionColor="#fef3c7"
      /> */}
      <Union />
      {/* <TornEdge0
        upSectionColor="#fef3c7"
        edgeColor="#ffffff"
        className="-mt-px overflow-hidden"
        downSectionColor="#faf5ee"
      /> */}
      <Developers />
      <TornEdge0
        upSectionColor="#d4d4d4"
        edgeColor="#ffffff"
        className="-mt-px overflow-hidden"
        downSectionColor="#000000"
      />
    </div>
  );
};

export default About;
