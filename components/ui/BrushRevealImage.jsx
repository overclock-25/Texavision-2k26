'use client';
import { useRef, useEffect, useState } from 'react';
import { useBrushstroke } from '@/hooks/useBrushstroke';
import { useInView } from 'motion/react';

export default function BrushRevealImage({ src, alt, className, ...props }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const { draw } = useBrushstroke(canvasRef);
  const [scaledSrc, setScaledSrc] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;

    img.onload = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const ctx = offCanvas.getContext('2d');

      // Calculate object-cover
      const aspect = img.width / img.height;
      const canvasAspect = width / height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (aspect > canvasAspect) {
        drawHeight = height;
        drawWidth = height * aspect;
        offsetY = 0;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawWidth = width;
        drawHeight = width / aspect;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      setScaledSrc(offCanvas.toDataURL());
    };
  }, [src]);

  useEffect(() => {
    if (isInView && scaledSrc && canvasRef.current && containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      const points = [];
      const rows = 6;
      const stepY = height / rows;

      for (let i = 0; i <= rows; i++) {
        const y = i * stepY + stepY / 2;
        const jitterY = (Math.random() - 0.5) * 20;

        if (i % 2 === 0) {
          points.push(-50, y + jitterY);
          points.push(width + 50, y + jitterY);
        } else {
          points.push(width + 50, y + jitterY);
          points.push(-50, y + jitterY);
        }
      }

      draw({
        points: points,
        image: scaledSrc,
        size: 120,
        inkAmount: 20,
        tension: 0.4,
        frames: 40,
        splash: true,
        dripping: true,
        color: '#ffffff',
      });
    }
  }, [isInView, scaledSrc, draw]);

  return (
    <div ref={containerRef} className={`relative ${className}`} {...props}>
      <div className="absolute inset-0 bg-gray-200" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />
      <img src={src} alt={alt} className="sr-only" />
    </div>
  );
}
