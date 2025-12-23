'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScrolling({ children, root = true }) {
  return (
    <ReactLenis
      root={root}
      options={{
        lerp: 0.9,
        duration: 2,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1.2,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
