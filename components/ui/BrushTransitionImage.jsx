'use client';

import { useRef, useEffect } from 'react';
import { useBrushstroke } from '@/hooks/useBrushstroke';

const BrushTransitionImage = ({ src, selectedIndex }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const prevIndexRef = useRef(selectedIndex);
  const prevSrcRef = useRef(null); // Start with null - no initial image
  const isFirstRenderRef = useRef(true);

  const { draw, clear } = useBrushstroke(canvasRef, {
    inkAmount: 60,
    size: 250,
    splashing: false,
    dripping: false,
    tension: 0.4,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isTransitioningRef.current) return;

    // Check if this is the first render or if src changed
    const shouldTransition =
      isFirstRenderRef.current ||
      (prevIndexRef.current !== selectedIndex && prevSrcRef.current !== src);

    if (shouldTransition) {
      isFirstRenderRef.current = false;
      prevIndexRef.current = selectedIndex;
      const newSrc = src;
      prevSrcRef.current = src;

      isTransitioningRef.current = true;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Get the image src as string for the brush pattern
      const imageSrc = typeof newSrc === 'string' ? newSrc : newSrc.src;

      // Diagonal zig-zag from top-left to bottom-right
      const w = rect.width;
      const h = rect.height;

      const zigzagPoints = [
        -150,
        -150, // Start off-screen top-left
        w * 0.1,
        -50, // Swing to top edge
        -50,
        h * 0.1, // Swing to left edge
        w * 0.15,
        -10, // Swing to top edge
        -30,
        h * 0.1, // Swing to left edge
        w * 0.1,
        h * 0.05, // Near top
        w * 0.12,
        h * 0.5, // Swing left
        w * 0.65,
        h * 0.2, // Swing right-up
        w * 0.25,
        h * 0.65, // Swing left-down
        w * 0.4,
        h * 0.35, // Swing right-up
        w * 0.9,
        h * 0.3, // Swing left-down
        w * 0.2,
        h * 0.5, // Swing right
        w * 0.55,
        h * 0.15, // Near bottom
        w + 150,
        h * 0.65, // Swing to right edge
        w * 0.75,
        h + 50, // Swing to bottom edge
        w + 150,
        h * 0.4, // Swing to right edge
        w * 0.3,
        h + 100, // Swing to bottom edge
        w + 150,
        h + 150, // End off-screen bottom-right
      ];

      // Draw zig-zag stroke with the next image as the brush pattern
      draw({
        points: zigzagPoints,
        frames: 100,
        delay: 0,
        image: imageSrc,
        imageSize: { width: rect.width, height: rect.height },
        size: Math.max(rect.width, rect.height) / 1.1,
        inkAmount: 10,
        tension: 0.2,
        end: () => {
          // Keep the brush stroke visible - don't clear
          isTransitioningRef.current = false;
        },
      });
    } else if (prevIndexRef.current !== selectedIndex) {
      // Index changed but same image, just update refs
      prevIndexRef.current = selectedIndex;
      prevSrcRef.current = src;
    }
  }, [src, selectedIndex, draw, clear]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-transparent">
      {/* Canvas for brush stroke - this IS the image display */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10" />
    </div>
  );
};

export default BrushTransitionImage;
