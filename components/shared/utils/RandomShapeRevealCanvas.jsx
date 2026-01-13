'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function RandomShapeRevealCanvas({
  src,
  width,
  height,
  shapeCount = 30,
  className = '',
}) {
  const canvasRef = useRef(null);
  const progress = useRef({ value: 0 });

  useGSAP(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = src;

    const shapes = Array.from({ length: shapeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 8 + 4,
      max: Math.random() * 100 + 80,
    }));

    img.onload = () => {
      const render = () => {
        ctx.clearRect(0, 0, width, height);

        ctx.save();
        ctx.beginPath();

        shapes.forEach((s) => {
          const radius = s.r + s.max * progress.current.value;
          ctx.moveTo(s.x + radius, s.y);
          ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        });

        ctx.clip();
        ctx.drawImage(img, 0, 0, width, height);
        ctx.restore();
      };

      gsap.to(progress.current, {
        value: 1,
        ease: 'power2.out',
        duration: 3,
        scrollTrigger: {
          trigger: canvas,
          start: 'top 75%',
          once: true,
        },
        onUpdate: render,
      });
    };
  }, [src, width, height, shapeCount]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{ display: 'block', borderRadius: '12px' }}
    />
  );
}
