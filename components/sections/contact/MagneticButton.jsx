'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MagneticButton = ({ children, className = '', onClick }) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (textRef.current) {
        gsap.to(textRef.current, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });

      if (textRef.current) {
        gsap.to(textRef.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`bg-purple-rich relative overflow-hidden rounded-full px-10 py-5 font-semibold text-white transition-colors duration-300 hover:bg-purple-800 ${className}`}
    >
      <span ref={textRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className="bg-lavender-soft absolute inset-0 origin-center scale-0 rounded-full transition-transform duration-500 group-hover:scale-100" />
    </button>
  );
};

export default MagneticButton;
