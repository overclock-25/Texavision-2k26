'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GraffitiText = ({ text = 'CONTACT', className = '' }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animate each letter with stagger
    gsap.fromTo(
      lettersRef.current,
      {
        y: 100,
        opacity: 0,
        rotation: () => gsap.utils.random(-45, 45),
        scale: 0,
      },
      {
        y: 0,
        opacity: 1,
        rotation: () => gsap.utils.random(-5, 5),
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Add hover animations
    // lettersRef.current.forEach((letter) => {
    //   if (!letter) return;

    //   letter.addEventListener('mouseenter', () => {
    //     gsap.to(letter, {
    //       scale: 1.3,
    //       rotation: gsap.utils.random(-20, 20),
    //       color: gsap.utils.random(['#4c1d95', '#be123c', '#14b8a6', '#1e40af']),
    //       duration: 0.3,
    //       ease: 'power2.out',
    //     });
    //   });

    //   letter.addEventListener('mouseleave', () => {
    //     gsap.to(letter, {
    //       scale: 1,
    //       rotation: gsap.utils.random(-5, 5),
    //       color: '#4c1d95',
    //       duration: 0.3,
    //       ease: 'power2.out',
    //     });
    //   });
    // });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap items-center justify-center gap-1 md:gap-2 ${className}`}
    >
      {text.split('').map((letter, index) => (
        <span
          key={index}
          ref={(el) => (lettersRef.current[index] = el)}
          className="font-grindy-brush text-purple-rich inline-block cursor-pointer text-6xl opacity-0 transition-shadow duration-300 select-none md:text-8xl lg:text-9xl"
          style={{
            textShadow: '4px 4px 0px rgba(0,0,0,0.2)',
            WebkitTextStroke: '2px rgba(0,0,0,0.1)',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};

export default GraffitiText;
