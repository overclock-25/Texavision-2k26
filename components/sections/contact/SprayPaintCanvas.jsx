'use client';
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const SprayPaintCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#4c1d95');
  const lastPos = useRef({ x: 0, y: 0 });

  const colors = [
    { value: '#4c1d95', name: 'Purple' },
    { value: '#be123c', name: 'Rose' },
    { value: '#14b8a6', name: 'Teal' },
    { value: '#1e40af', name: 'Blue' },
    { value: '#000000', name: 'Black' },
    { value: '#ffffff', name: 'White' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = containerRef.current.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = 400;

    // Fill with a subtle pattern background
    ctx.fillStyle = '#faf5ee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some graffiti-style instructions
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.textAlign = 'center';
    ctx.fillText('🎨 Spray your message here!', canvas.width / 2, canvas.height / 2);
  }, []);

  const sprayPaint = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const density = 50;
    const radius = 20;

    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      const offsetX = Math.cos(angle) * r;
      const offsetY = Math.sin(angle) * r;

      const alpha = 1 - r / radius;
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha * 0.3;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const handleStart = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setIsDrawing(true);
    lastPos.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
    sprayPaint(lastPos.current.x, lastPos.current.y);
  };

  const handleMove = (clientX, clientY) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Interpolate between last position and current for smooth spray
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(1, Math.floor(distance / 5));

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const interpX = lastPos.current.x + dx * t;
      const interpY = lastPos.current.y + dy * t;
      sprayPaint(interpX, interpY);
    }

    lastPos.current = { x, y };
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Animate clear
    gsap.to(canvas, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        ctx.fillStyle = '#faf5ee';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.textAlign = 'center';
        ctx.fillText('🎨 Spray your message here!', canvas.width / 2, canvas.height / 2);
        gsap.to(canvas, { opacity: 1, duration: 0.3 });
      },
    });
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        <span className="text-dark-text font-semibold">Pick a color:</span>
        {colors.map((c) => (
          <button
            key={c.value}
            onClick={() => setColor(c.value)}
            className={`h-10 w-10 rounded-full border-4 transition-all duration-200 hover:scale-110 ${
              color === c.value ? 'border-purple-rich scale-110' : 'border-transparent'
            }`}
            style={{ backgroundColor: c.value }}
            title={c.name}
          />
        ))}
        <button
          onClick={clearCanvas}
          className="bg-dark-text ml-4 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105"
        >
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full cursor-crosshair rounded-2xl border-4 border-dashed border-gray-300 shadow-inner"
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => {
          e.preventDefault();
          const touch = e.touches[0];
          handleStart(touch.clientX, touch.clientY);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          const touch = e.touches[0];
          handleMove(touch.clientX, touch.clientY);
        }}
        onTouchEnd={handleEnd}
      />
      <p className="text-dark-text/50 mt-2 text-center text-sm">
        Click and drag to spray paint your message!
      </p>
    </div>
  );
};

export default SprayPaintCanvas;
