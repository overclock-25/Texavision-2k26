'use client';
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SprayPaintCanvas from './SprayPaintCanvas';
import SpriteHeader from '@/components/shared/texts/SpriteHeader';

gsap.registerPlugin(ScrollTrigger);

const InteractiveSection = () => {
  const sectionRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      '.interactive-content',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
          onEnter: () => setShowCanvas(true),
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-cream relative overflow-hidden px-4 py-20 md:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-4xl">
        <SpriteHeader
          heading="Leave Your Mark"
          spriteSrc="/spr-header.png"
          frames={24}
          orientation="vertical"
          frameAspectRatio={1280 / 720}
          brushColor="#7c3aed"
          bgColorClass="bg-cream"
          textColorClass="text-cream"
          duration={1.5}
        />
        <p className="interactive-content text-dark-text/70 mx-auto mb-8 max-w-2xl text-center text-lg">
          Express yourself! Use our virtual spray paint canvas to create your own graffiti message.
        </p>

        <div className="interactive-content">{showCanvas && <SprayPaintCanvas />}</div>
      </div>
    </section>
  );
};

export default InteractiveSection;
