'use client';

import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

/* =======================
   Animation Variants
======================= */

const RECT_VARIANTS = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};

const PATH_VARIANTS = { ...RECT_VARIANTS };
const LINE_VARIANTS = { ...RECT_VARIANTS };

/* =======================
   Component
======================= */

const InstagramIcon = forwardRef(function InstagramIcon(
  { onMouseEnter, onMouseLeave, className, size = 28, ...props },
  ref
) {
  const rectControls = useAnimation();
  const pathControls = useAnimation();
  const lineControls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation() {
        rectControls.start('animate');
        pathControls.start('animate');
        lineControls.start('animate');
      },
      stopAnimation() {
        rectControls.start('normal');
        pathControls.start('normal');
        lineControls.start('normal');
      },
    };
  });

  const handleMouseEnter = useCallback(
    (e) => {
      if (!isControlledRef.current) {
        rectControls.start('animate');
        pathControls.start('animate');
        lineControls.start('animate');
      } else {
        onMouseEnter?.(e);
      }
    },
    [rectControls, pathControls, lineControls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e) => {
      if (!isControlledRef.current) {
        rectControls.start('normal');
        pathControls.start('normal');
        lineControls.start('normal');
      } else {
        onMouseLeave?.(e);
      }
    },
    [rectControls, pathControls, lineControls, onMouseLeave]
  );

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.rect
          variants={RECT_VARIANTS}
          initial="normal"
          animate={rectControls}
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          ry="5"
        />
        <motion.path
          variants={PATH_VARIANTS}
          initial="normal"
          animate={pathControls}
          d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
        />
        <motion.line
          variants={LINE_VARIANTS}
          initial="normal"
          animate={lineControls}
          x1="17.5"
          y1="6.5"
          x2="17.51"
          y2="6.5"
        />
      </svg>
    </div>
  );
});

export { InstagramIcon };
