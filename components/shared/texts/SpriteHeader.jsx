'use client';

import React, { useRef, useEffect, useState, useId } from 'react';

/**
 * SpriteHeader Component
 *
 * Renders a header with a brush stroke background animation using a spritesheet.
 * Can work in two modes:
 * 1. Image Mode: Renders the sprite as-is (e.g. pre-colored stroke).
 * 2. Mask Mode: Uses the sprite as a mask for a background color (allows changing brush color).
 *
 * Props:
 * @param {string} heading - The text to display.
 * @param {string} spriteSrc - URL to the spritesheet image.
 * @param {number} frames - Total number of horizontal frames in the spritesheet.
 * @param {number} frameAspectRatio - Aspect ratio (width/height) of a SINGLE frame.
 * @param {number} duration - Animation duration in seconds.
 * @param {string} bgColorClass - Tailwind class for the container background.
 * @param {string} textColorClass - Tailwind class for the text color.
 * @param {string} brushColor - Hex color code. If provided, enables "Mask Mode".
 * @param {string} orientation - 'horizontal' | 'vertical'. Direction of the spritesheet.
 */
const SpriteHeader = ({
  heading,
  spriteSrc,
  frames = 10,
  frameAspectRatio = 2.5, // e.g., 1000px / 400px = 2.5
  duration = 0.8,
  bgColorClass = '',
  textColorClass = 'text-gray-900',
  brushColor = null,
  orientation = 'horizontal',
  textSizeClass = 'text-large',
  className = '',
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  // Create a unique ID for this instance's styles
  const id = useId();
  const uniqueId = `sprite-${id.replace(/:/g, '')}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const current = containerRef.current;
    if (current) {
      observer.observe(current);
    }
    return () => observer.disconnect();
  }, []);

  // Determine if we should treat the sprite as a mask (Solid Color Brush) or an Image (Pre-colored Brush)
  const isMask = !!brushColor;
  const isVertical = orientation === 'vertical';

  // Generate dynamic keyframes for this specific animation
  const animationName = `play-sprite-${uniqueId}`;
  const keyframes = `
    @keyframes ${animationName} {
      from { 
        mask-position: 0% 0%; 
        -webkit-mask-position: 0% 0%; 
        background-position: 0% 0%; 
      }
      to { 
        mask-position: ${isVertical ? '0% 100%' : '100% 0%'}; 
        -webkit-mask-position: ${isVertical ? '0% 100%' : '100% 0%'}; 
        background-position: ${isVertical ? '0% 100%' : '100% 0%'}; 
      }
    }
  `;

  const spriteStyle = {
    // Layout
    width: '100%',
    height: '100%',

    // Background / Mask Setup
    ...(isMask
      ? {
          backgroundColor: brushColor,
          maskImage: `url('${spriteSrc}')`,
          WebkitMaskImage: `url('${spriteSrc}')`,
          maskSize: isVertical ? `100% ${frames * 100}%` : `${frames * 100}% 100%`,
          WebkitMaskSize: isVertical ? `100% ${frames * 100}%` : `${frames * 100}% 100%`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: '0% 0%',
          WebkitMaskPosition: '0% 0%',
        }
      : {
          backgroundImage: `url('${spriteSrc}')`,
          backgroundSize: isVertical ? `100% ${frames * 100}%` : `${frames * 100}% 100%`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0% 0%',
        }),

    // Animation
    // We use steps(frames - 1) because we are interpolating from 0% (frame 1) to 100% (frame N).
    animation: isVisible ? `${animationName} ${duration}s steps(${frames - 1}) forwards` : 'none',

    // Initial State
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.1s ease-in',
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex min-h-[100px] items-center justify-center overflow-hidden p-8 md:min-h-[200px] ${bgColorClass} ${className}`}
    >
      <style>{keyframes}</style>

      {/* Sprite Wrapper to maintain Aspect Ratio */}
      <div
        className="pointer-events-none absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        style={{
          width: '100%',
          maxWidth: '1000px',
          aspectRatio: `${frameAspectRatio}`,
        }}
        aria-hidden="true"
      >
        <div style={spriteStyle} />
      </div>

      {/* Text layer */}
      <h2
        className={`${textColorClass} ${textSizeClass} relative z-10 font-bold tracking-widest uppercase mix-blend-normal`}
      >
        {heading}
      </h2>
    </div>
  );
};

export default SpriteHeader;
