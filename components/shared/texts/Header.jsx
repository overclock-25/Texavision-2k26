'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useBrushstroke } from '@/hooks/useBrushstroke';

const Header = ({ bgColorClass, textColorClass, brushColor, heading }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Initialize the brush hook with desired options for a realistic white stroke
  const { draw } = useBrushstroke(canvasRef, {
    color: brushColor || '#ffffff', // White paint
    inkAmount: 20, // High ink amount for solid coverage
    size: 50, // Brush size
    splashing: true, // Add some splashes for realism
    dripping: false, // Disable dripping for a cleaner background look
    tension: 0.5, // Curve tension
  });

  useEffect(() => {
    if (!hasAnimated) return;

    const canvas = canvasRef.current;

    if (canvas) {
      // Set internal resolution
      canvas.width = 1000;
      canvas.height = 400;

      // Define points for a slight natural curve (not S-shaped)
      const points = [
        300,
        190, // Start
        400,
        180, // Middle (slight arch)
        600,
        180, // Middle (slight arch)
        700,
        195, // End
      ];

      // Draw the stroke
      draw({
        points,
        frames: 60,
        delay: 0.2,
        splashing: false,
        dripping: false,
        size: 180,
        inkAmount: 2,
      });
    }
  }, [draw, hasAnimated]);

  return (
    <div
      ref={containerRef}
      className={`relative flex min-h-[200px] items-center justify-center overflow-hidden p-8 ${bgColorClass}`}
    >
      {/* Canvas positioned behind the text */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        style={{ width: '100%', maxWidth: '1000px', height: 'auto' }}
      ></canvas>

      {/* Text layer */}
      <h2
        className={`${textColorClass} relative z-10 text-5xl font-bold tracking-widest uppercase mix-blend-normal`}
      >
        {heading}
      </h2>
    </div>
  );
};

export default Header;
