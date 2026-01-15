'use client';

import { motion } from 'motion/react';
import { IconX } from '@tabler/icons-react';
import { useRef, useEffect } from 'react';
import { useBrushstroke } from '@/hooks/useBrushstroke';
import Image from 'next/image';

export default function GraffitiDrawer({ yearData, isOpen, onClose, dir = 'right' }) {
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const { draw: drawBg, clear: clearBg } = useBrushstroke(bgCanvasRef);

  useEffect(() => {
    if (!isOpen) return;

    clearBg?.();

    if (bgCanvasRef.current && containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      bgCanvasRef.current.width = width;
      bgCanvasRef.current.height = height;

      const points = [];
      const rows = 10;
      const stepY = height / rows;

      for (let i = 0; i <= rows; i++) {
        const y = i * stepY + stepY / 2;
        const jitterY = (Math.random() - 0.5) * 50;

        if (i % 2 === 0) {
          points.push(-100, y + jitterY, width + 100, y + jitterY);
        } else {
          points.push(width + 100, y + jitterY, -100, y + jitterY);
        }
      }

      drawBg({
        points,
        color: '#e8dcc8',
        size: 300,
        inkAmount: 50,
        tension: 0.4,
        frames: 30,
        splash: true,
        dripping: false,
      });
    }
  }, [isOpen, drawBg, clearBg]);

  if (!yearData) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex h-full w-full ${dir === 'right' ? 'justify-end' : 'justify-start'} overflow-hidden`}
      data-lenis-prevent
      onClick={onClose}
    >
      {/* Drawer panel */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className={`relative h-full w-full md:w-[600px] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{
          maskImage: "url('/svgs/poster.svg')",
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskImage: "url('/svgs/poster.svg')",
          WebkitMaskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
        }}
      >
        {/* Background reveal canvas */}
        <canvas
          ref={bgCanvasRef}
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        />

        {/* Texture overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20" />

        <div
          ref={scrollRef}
          className="relative h-full w-full overflow-y-scroll overscroll-contain"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative min-h-full"
          >
            <button
              onClick={onClose}
              className="text-charcoal absolute top-16 right-10 z-50 p-2 hover:text-black"
            >
              <IconX size={32} strokeWidth={2} />
            </button>

            {/* Year heading */}
            <div className="relative mt-8 mb-16">
              <canvas
                ref={canvasRef}
                width={400}
                height={200}
                className="pointer-events-none absolute -top-4 -left-4 z-0 opacity-80"
              />
              <h2 className="text-charcoal relative z-10 text-center text-8xl font-black italic drop-shadow-lg select-none">
                {yearData.year}
              </h2>
            </div>

            <div className="relative mt-10 flex flex-col items-center justify-center gap-6">
              {[yearData.cover, ...yearData.images].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, zIndex: 20 }}
                  className="group relative w-60 bg-white p-1 shadow-lg"
                >
                  <div className="aspect-3/4 overflow-hidden">
                    <Image
                      src={img}
                      alt=""
                      height={100}
                      width={100}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:grayscale"
                    />
                  </div>
                  <p className="text-charcoal mt-2 text-center font-mono text-[10px] tracking-widest uppercase opacity-60">
                    IMG_{yearData.year}_{i + 1}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
