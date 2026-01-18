'use client';
import { useEffect, useState } from 'react';

const useCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseEnter = (e) => {
      if (e.target instanceof Element) {
        const isInteractive =
          e.target.matches('a, button, [role="button"], input, textarea, select') ||
          e.target.closest('a, button, [role="button"]');
        if (isInteractive) {
          setIsHovering(true);
        }
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target instanceof Element) {
        const isInteractive =
          e.target.matches('a, button, [role="button"], input, textarea, select') ||
          e.target.closest('a, button, [role="button"]');
        if (isInteractive) {
          setIsHovering(false);
        }
      }
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return {
    mousePosition,
    isHovering,
  };
};

export default useCursor;
