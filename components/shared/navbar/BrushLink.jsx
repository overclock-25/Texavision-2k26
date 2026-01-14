'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useBrushstroke } from '@/hooks/useBrushstroke';
import { usePathname } from 'next/navigation';

const BrushLink = ({ href, children, className = '' }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pathname = usePathname();
  const isActive = pathname === href;

  // Configuration for the brush stroke
  const { draw, clear } = useBrushstroke(canvasRef, {
    size: 10,
    color: '#e8dcc8', // Using rose-deep color
    inkAmount: 1,
    tension: 0.5,
    splashing: false,
    frames: 20, // Speed up the animation (approx 0.3s)
  });

  const updateCanvasSize = () => {
    if (containerRef.current && canvasRef.current) {
      // Set canvas size to match resolution
      canvasRef.current.width = containerRef.current.offsetWidth;
      canvasRef.current.height = containerRef.current.offsetHeight;
    }
  };

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      updateCanvasSize(); // Ensure size is correct before drawing
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      // Calculate points for the underline
      // Start slightly inside, end slightly inside, somewhat wobbly y around height - 5
      const padding = 5;
      const yBase = height - 8;

      const points = [
        padding,
        yBase,
        width * 0.3,
        yBase - 1 + Math.random() * 2,
        width * 0.6,
        yBase + 1 - Math.random() * 2,
        width - padding,
        yBase,
      ];

      canvasRef.current.style.opacity = '1';
      clear();
      draw({ points });
    }
  };

  const handleMouseLeave = () => {
    if (canvasRef.current) {
      canvasRef.current.style.opacity = '0';
    }
    clear();
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href} className="relative z-10 block px-1 py-1 no-underline">
        {children}
      </Link>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full transition-opacity duration-300"
      />
    </div>
  );
};

export default BrushLink;
