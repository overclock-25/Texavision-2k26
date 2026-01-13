import Animation from '@/components/sections/about/Animation';
import Developers from '@/components/sections/about/Developers';
import Hero from '@/components/sections/about/Hero';
import Union from '@/components/sections/about/Union';
import React from 'react';

const About = () => {
  return (
    <div className="bg-vanilla-cream flex flex-col gap-28 px-10">
      <Hero />
      {/* <Animation /> */}
      <Union />
      <Developers />
    </div>
  );
};

export default About;
