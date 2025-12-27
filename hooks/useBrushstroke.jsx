'use client';

import {
  BrushEngine,
  getSplinePoints,
  generateRandomPoints,
} from '@/components/shared/utils/BrushEngine';
import { useRef, useCallback, useEffect } from 'react';

export function useBrushstroke(canvasRef, globalOptions = {}) {
  // FIXED: Pre-initialize with a resolved promise to avoid ".then is undefined"
  const queueRef = useRef(Promise.resolve());
  const optionsRef = useRef(globalOptions);

  useEffect(() => {
    optionsRef.current = globalOptions;
  }, [globalOptions]);

  const draw = useCallback(
    (params = {}) => {
      // We update the queue ref by chaining the next animation
      queueRef.current = queueRef.current.then(async () => {
        if (!canvasRef.current) return;

        const mergedParams = { ...optionsRef.current, ...params };
        const ctx = canvasRef.current.getContext('2d');

        if (mergedParams.image) {
          const img = new Image();
          img.src = mergedParams.image;
          await new Promise((r) => (img.onload = r));

          if (mergedParams.color) {
            const offCanvas = document.createElement('canvas');
            offCanvas.width = img.width;
            offCanvas.height = img.height;
            const offCtx = offCanvas.getContext('2d');

            offCtx.drawImage(img, 0, 0);

            offCtx.globalCompositeOperation = 'multiply';
            offCtx.fillStyle = mergedParams.color;
            offCtx.fillRect(0, 0, offCanvas.width, offCanvas.height);

            offCtx.globalCompositeOperation = 'source-over';

            mergedParams.pattern = ctx.createPattern(offCanvas, 'no-repeat');
          } else {
            mergedParams.pattern = ctx.createPattern(img, 'no-repeat');
          }
        }

        const engine = new BrushEngine(canvasRef.current, mergedParams);

        if (mergedParams.delay) await new Promise((r) => setTimeout(r, mergedParams.delay * 1000));

        ctx.globalCompositeOperation = mergedParams.erase ? 'destination-out' : 'source-over';

        let points = [];
        let rawPoints = mergedParams.points;

        if (typeof rawPoints === 'number') {
          rawPoints = generateRandomPoints(
            rawPoints,
            canvasRef.current.width,
            canvasRef.current.height
          );
        }

        if (mergedParams.path instanceof SVGPathElement) {
          const len = mergedParams.path.getTotalLength();
          const steps = mergedParams.frames || 50;
          for (let i = 0; i <= steps; i++) {
            const pt = mergedParams.path.getPointAtLength((i / steps) * len);
            points.push({ x: pt.x, y: pt.y });
          }
        } else if (Array.isArray(rawPoints)) {
          const coords = typeof rawPoints[0] === 'number' ? rawPoints : [];
          const smoothed = getSplinePoints(coords, mergedParams.tension || 0.5);
          for (let i = 0; i < smoothed.length; i += 2) {
            points.push({ x: smoothed[i], y: smoothed[i + 1] });
          }
        }

        if (points.length === 0) return;

        return new Promise((resolve) => {
          let currentFrame = 0;
          const totalFrames = mergedParams.frames || 60;
          engine.startStroke(points[0].x, points[0].y);

          const step = () => {
            const idx = Math.floor((currentFrame / totalFrames) * (points.length - 1));
            const p = points[idx];
            engine.render(p.x, p.y);

            if (currentFrame < totalFrames) {
              currentFrame++;
              requestAnimationFrame(step);
            } else {
              engine.endStroke();
              if (mergedParams.end) mergedParams.end();
              resolve();
            }
          };
          step();
        });
      });
    },
    [canvasRef]
  );

  return {
    draw,
    clear: () => canvasRef.current?.getContext('2d').clearRect(0, 0, 9999, 9999),
  };
}
