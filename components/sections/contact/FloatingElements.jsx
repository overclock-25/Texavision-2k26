'use client';
import React, { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FloatingElements = () => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  const elements = useMemo(
    () => [
      { emoji: '🎨', size: 'text-4xl', delay: 0 },
      { emoji: '✉️', size: 'text-3xl', delay: 0.2 },
      { emoji: '📞', size: 'text-3xl', delay: 0.4 },
      { emoji: '🎭', size: 'text-4xl', delay: 0.6 },
      { emoji: '🎪', size: 'text-3xl', delay: 0.8 },
      { emoji: '🎵', size: 'text-3xl', delay: 1 },
      { emoji: '⭐', size: 'text-2xl', delay: 1.2 },
      { emoji: '🌟', size: 'text-2xl', delay: 1.4 },
    ],
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animate each floating element
    elementsRef.current.forEach((el, i) => {
      if (!el) return;

      // Initial animation - fade in and float up
      gsap.fromTo(
        el,
        {
          y: 100,
          opacity: 0,
          scale: 0,
          rotation: -30,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          delay: elements[i].delay,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Continuous floating animation
      gsap.to(el, {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-15, 15)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: elements[i].delay,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [elements]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {elements.map((item, index) => (
        <span
          key={index}
          ref={(el) => (elementsRef.current[index] = el)}
          className={`absolute opacity-0 ${item.size}`}
          style={{
            left: `${10 + (index % 4) * 25}%`,
            top: `${15 + Math.floor(index / 4) * 60}%`,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingElements;
