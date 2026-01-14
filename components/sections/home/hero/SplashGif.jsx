'use client';
import { useEffect, useState } from 'react';

const SplashGif = ({
  className = '',
  bgImage = '',
  maskImage = '',
  delay = 0,
  unique = false,
  ...props
}) => {
  const [render, setRender] = useState(false);
  const [uid, setUid] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setUid(unique ? `${maskImage}?t=${Date.now()}` : maskImage);
      setRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, maskImage, unique]);

  if (!render || !bgImage || !maskImage) return null;

  return (
    <div className={`absolute z-0 ${className}`} role="presentation" aria-hidden="true">
      <div
        className="absolute inset-0 -z-1 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${uid})`,
          mixBlendMode: 'multiply',
          filter: 'invert(1)',
        }}
      />

      <div
        className={`absolute inset-0 -z-2 bg-contain bg-center bg-no-repeat brightness-60`}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: props.bgPosition || 'center',

          maskImage: `url(${uid})`,
          maskSize: 'contain',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',

          WebkitMaskImage: `url(${uid})`,
          WebkitMaskSize: 'contain',
          WebkitMaskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    </div>
  );
};

export { SplashGif };
