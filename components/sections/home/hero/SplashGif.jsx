'use client';

const SplashGif = ({
  className = '',
  bgImage = '',
  maskImage = '',
  isVisible = false,
  ...props
}) => {
  if (!bgImage || !maskImage) return null;

  return (
    <div
      className={`absolute z-0 ${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      role="presentation"
      aria-hidden="true"
    >
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
