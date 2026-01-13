'use client';

import { useBrushstroke } from '@/hooks/useBrushstroke';
import { useEffect, useRef, useState } from 'react';

const SvgBrushHeader = ({
  children,
  width = 1000,
  height = 300,
  brushOptions = {},
  className = '',
  threshold = 0.3,
}) => {
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { draw, clear } = useBrushstroke(canvasRef, {
    size: 5,
    color: '#000',
    inkAmount: 1,
    splashing: false,
    tension: 0.5,
    ...brushOptions,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (!hasAnimated || !svgRef.current) return;

    // Clear previous drawings
    clear();

    const paths = svgRef.current.querySelectorAll('path');

    // Draw each path in sequence
    paths.forEach((path) => {
      draw({
        path,
        frames: 60,
      });
    });
  }, [draw, clear, children, hasAnimated]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: width,
        aspectRatio: `${width}/${height}`,
      }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ display: 'none' }}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
};

export default SvgBrushHeader;
