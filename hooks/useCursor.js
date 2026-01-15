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

    const handleMouseOver = (e) => {
      const isInteractive =
        e.target.matches('a, button, [role="button"], input, textarea, select') ||
        e.target.closest('a, button, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return {
    mousePosition,
    isHovering,
  };
};

export default useCursor;
