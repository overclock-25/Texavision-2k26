'use client';
import { useEffect, useState } from 'react';

const SplashGif = ({ className = '', bgImage = '', maskImage = '', delay = 0, ...props }) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, maskImage]);

  if (!render || !bgImage || !maskImage) return null;

  return (
    <div className={`absolute z-0 ${className}`} role="presentation" aria-hidden="true">
      <div
        className="absolute inset-0 -z-1 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${maskImage})`,
          mixBlendMode: 'multiply',
          filter: 'invert(1)',
        }}
      />

      <div
        className={`absolute inset-0 -z-2 bg-contain bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: props.bgPosition || 'center',

          maskImage: `url(${maskImage})`,
          maskSize: 'contain',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',

          WebkitMaskImage: `url(${maskImage})`,
          WebkitMaskSize: 'contain',
          WebkitMaskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    </div>
  );
};

export { SplashGif };
