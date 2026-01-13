'use client';
import { useEffect, useRef } from 'react';

export default function RandomShapeRevealCanvas({
  src,
  size = 320,
  shapeCount = 25,
  growthSpeed = 1.6,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = src;

    // Create random shapes
    const shapes = Array.from({ length: shapeCount }).map(() => ({
      x: Math.random() * size,
      y: Math.random() * size,
      r: Math.random() * 10 + 5,
      max: Math.random() * 90 + 50,
      growth: Math.random() * growthSpeed + 0.5,
    }));

    let animationId;

    img.onload = () => {
      const animate = () => {
        ctx.clearRect(0, 0, size, size);

        ctx.save();
        ctx.beginPath();

        shapes.forEach((s) => {
          ctx.moveTo(s.x + s.r, s.y);
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          s.r += s.growth;
        });

        ctx.clip();
        ctx.drawImage(img, 0, 0, size, size);
        ctx.restore();

        const done = shapes.every((s) => s.r >= s.max);
        if (!done) animationId = requestAnimationFrame(animate);
      };

      animate();
    };

    return () => cancelAnimationFrame(animationId);
  }, [src, size, shapeCount, growthSpeed]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{
        display: 'block',
        borderRadius: '12px',
      }}
    />
  );
}
