'use client';
import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MarqueeAnimation = ({ children, direction, duration, className }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null); // Ref for the single set of content
  const [contentWidth, setContentWidth] = useState(0); // Width of the single set of content

  useLayoutEffect(() => {
    // Only calculate the width of one set of the children
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth);
    }
  }, [children]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        key={`scroll-${contentWidth}`}
        className="flex"
        ref={containerRef}
        animate={{
          x: direction === 'right' ? [-contentWidth, 0] : [0, -contentWidth],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration,
            ease: 'linear',
          },
        }}
        style={{ width: 'max-content' }}
      >
        <div ref={contentRef} style={{ display: 'flex', flexShrink: 0 }}>
          {' '}
          {children}{' '}
        </div>
        <div style={{ display: 'flex', flexShrink: 0 }}> {children} </div>
      </motion.div>
    </div>
  );
};

export { MarqueeAnimation };
