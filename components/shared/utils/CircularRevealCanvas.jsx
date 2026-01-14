'use client';
import { useEffect, useRef } from 'react';

export default function CircularRevealCanvas({ src, size = 300, speed = 3, center = 'center' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = src;

    let radius = 0;
    let animationId;

    img.onload = () => {
      const cx = center === 'center' ? size / 2 : 0;
      const cy = center === 'center' ? size / 2 : 0;
      const maxRadius = Math.sqrt(size * size * 2);

      const animate = () => {
        ctx.clearRect(0, 0, size, size);

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.clip();

        ctx.drawImage(img, 0, 0, size, size);
        ctx.restore();

        radius += speed;

        if (radius < maxRadius) {
          animationId = requestAnimationFrame(animate);
        }
      };

      animate();
    };

    return () => cancelAnimationFrame(animationId);
  }, [src, size, speed, center]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        borderRadius: '12px',
        display: 'block',
      }}
    />
  );
}
