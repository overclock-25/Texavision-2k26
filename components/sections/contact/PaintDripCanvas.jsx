'use client';
import React, { useRef, useEffect } from 'react';

const PaintDripCanvas = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const dripsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['#4c1d95', '#be123c', '#14b8a6', '#1e40af', '#c4b5fd', '#e9d5ff'];

    // Create initial drips
    const createDrip = (x) => {
      return {
        x,
        y: 0,
        width: Math.random() * 15 + 5,
        height: 0,
        maxHeight: Math.random() * 150 + 50,
        speed: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        blob: Math.random() * 10 + 5,
      };
    };

    // Initialize drips across the canvas
    const initDrips = () => {
      dripsRef.current = [];
      const numDrips = Math.floor(canvas.width / 50);
      for (let i = 0; i < numDrips; i++) {
        const x = (i / numDrips) * canvas.width + Math.random() * 30 - 15;
        dripsRef.current.push(createDrip(x));
      }
    };

    initDrips();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dripsRef.current.forEach((drip) => {
        // Update drip
        if (drip.height < drip.maxHeight) {
          drip.height += drip.speed;
        }

        // Draw drip
        ctx.save();
        ctx.globalAlpha = drip.opacity;

        // Gradient for drip
        const gradient = ctx.createLinearGradient(drip.x, drip.y, drip.x, drip.y + drip.height);
        gradient.addColorStop(0, drip.color);
        gradient.addColorStop(1, drip.color + '00');

        // Draw main drip body
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(drip.x - drip.width / 2, drip.y);
        ctx.quadraticCurveTo(
          drip.x - drip.width / 2,
          drip.y + drip.height * 0.7,
          drip.x,
          drip.y + drip.height
        );
        ctx.quadraticCurveTo(
          drip.x + drip.width / 2,
          drip.y + drip.height * 0.7,
          drip.x + drip.width / 2,
          drip.y
        );
        ctx.closePath();
        ctx.fill();

        // Draw blob at bottom
        if (drip.height > 20) {
          ctx.fillStyle = drip.color;
          ctx.globalAlpha = drip.opacity * 0.8;
          ctx.beginPath();
          ctx.ellipse(
            drip.x,
            drip.y + drip.height,
            drip.blob * (drip.height / drip.maxHeight),
            drip.blob * 0.6 * (drip.height / drip.maxHeight),
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a delay
    const timeout = setTimeout(() => {
      animate();
    }, 500);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(timeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute top-0 left-0 w-full ${className}`}
      style={{ zIndex: 10 }}
    />
  );
};

export default PaintDripCanvas;
