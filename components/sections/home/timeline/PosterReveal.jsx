'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import PosterImage from '@/assets/images/home/poster-dummy.jpg';

gsap.registerPlugin(ScrollTrigger);

const scene = {
  frames: 22,
  frameRate: 12,
  frameHeight: 205,
  spriteHeight: 4510,
};

export default function BrushSwipeAnimation() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [brushes, setBrushes] = useState([]);

  useEffect(() => {
    const calculateBrushes = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      // Aspect ratio of the brush image area is defined by paddingBottom: '20.5%'
      const brushHeight = width * 0.205;
      const overlap = 50; // Overlap by 2px to prevent gaps
      const effectiveHeight = brushHeight - overlap;

      // Calculate how many brushes are needed to cover the height
      const count = Math.ceil(height / effectiveHeight) + 1;

      setBrushes(
        Array.from({ length: count }, (_, i) => ({
          id: i,
          top: i * effectiveHeight,
        }))
      );
    };

    calculateBrushes();
    window.addEventListener('resize', calculateBrushes);
    return () => window.removeEventListener('resize', calculateBrushes);
  }, []);

  useEffect(() => {
    if (!containerRef.current || brushes.length === 0) return;

    const duration = scene.frames / scene.frameRate;

    // Kill previous timeline if exists
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Animate brushes sequentially
    brushes.forEach((brush, index) => {
      tl.fromTo(
        `.animation-image-${index}`,
        { y: `${((scene.spriteHeight - scene.frameHeight) / scene.spriteHeight) * -100}%` },
        {
          y: '0%',
          duration: duration,
          ease: `steps(${scene.frames - 1})`,
        },
        index === 0 ? undefined : '>' // Start after previous animation
      );
    });

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [brushes]);

  return (
    <div className="relative w-full">
      {/* Page Container */}
      <div ref={containerRef} className="relative z-1 mx-auto w-full overflow-hidden">
        <div className="relative top-0 left-0 h-fit w-full bg-transparent p-10 md:p-30">
          <Image
            src={PosterImage}
            alt="Poster Background"
            className="h-auto w-full object-contain"
          />
        </div>
        {/* White Overlay with Brush Stroke Masks */}
        <div className="absolute top-0 left-0 z-20 h-full w-full mix-blend-screen">
          {brushes.map((brush, index) => (
            <div key={brush.id} className="absolute left-0 w-full" style={{ top: brush.top }}>
              <div
                className="relative w-full scale-y-[-1] overflow-hidden"
                style={{ paddingBottom: '20.5%' }}
              >
                <Image
                  className={`animation-image-${index} absolute h-auto w-full ${index % 2 !== 0 ? 'scale-x-[-1]' : ''}`}
                  src="/brush-stroke.png"
                  alt="Brush stroke"
                  style={{
                    mixBlendMode: 'multiply',
                  }}
                  height={10000}
                  width={10000}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
