'use client';

import useCursor from '@/hooks/useCursor';

const CustomCursor = () => {
  const { mousePosition, isHovering } = useCursor();

  return (
    <>
      {/* Outer ring */}
      <div
        className={`pointer-events-none fixed top-0 left-0 mix-blend-difference transition-all duration-300 ease-out`}
        style={{
          transform: isHovering
            ? `translate3d(${mousePosition.x - 4}px, ${mousePosition.y - 4}px, 0)`
            : `translate3d(${mousePosition.x - 2}px, ${mousePosition.y - 2}px, 0)`,
          willChange: 'transform',
          zIndex: 999,
        }}
      >
        <div
          className={`h-5 w-5 rounded-full border-2 transition-all duration-300 ${
            isHovering && 'h-6 w-6 animate-pulse border-white'
          }`}
        />
      </div>

      {/* Inner dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 mix-blend-exclusion transition-all duration-150 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
          willChange: 'transform',
          zIndex: 9999,
        }}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white transition-all duration-200 ${
            isHovering ? 'scale-70' : 'scale-100'
          }`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
