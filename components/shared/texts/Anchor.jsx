'use client';
import { useState } from 'react';

const TextHighlights = [
  '/highlights/brush1.png',
  '/highlights/brush3.png',
  '/highlights/brush4.png',
  '/highlights/brush5.png',
];

const TextAnchor = ({
  LinkComponent,
  images = TextHighlights,
  href,
  children,
  className = '',
  ...props
}) => {
  const [bgImage, setBgImage] = useState('');

  const handleMouseEnter = () => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBgImage(randomImage);
  };

  const Comp = LinkComponent || 'a';

  return (
    <Comp
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setBgImage('')}
      className={`relative inline-block px-6 no-underline transition-all duration-300 hover:text-white ${className}`}
      {...props}
    >
      <span
        className={`pointer-events-none absolute -inset-3 z-0 transition-all duration-300 ease-out ${bgImage ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}
        aria-hidden="true"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <span className="relative z-10">{children}</span>
    </Comp>
  );
};

export { TextAnchor };
