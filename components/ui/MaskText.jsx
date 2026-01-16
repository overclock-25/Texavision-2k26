import React from 'react';

const MaskText = ({ title, size = 'medium', maskBgUrl = '/images/team/paint-drip.png' }) => {
  const sizeClass = {
    small: 'text-5xl md:text-6xl',
    medium: 'text-7xl lg:text-7xl',
    large: 'text-8xl md:text-[148px]',
  };

  const maskStyle = {
    backgroundImage: `url("${maskBgUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <div className="relative">
      <h2
        className={`graffiti-text graffiti absolute inset-0 mb-6 text-center leading-none font-bold text-white drop-shadow-[2px_2px_0_white] ${sizeClass[size]}`}
      >
        {title}
      </h2>
      <h2
        className={`graffiti relative mb-6 ${sizeClass[size]} graffiti relative mb-6 bg-cover bg-clip-text bg-center text-center leading-none font-bold text-transparent [-webkit-background-clip:text]`}
        style={maskStyle}
      >
        {title}
      </h2>
    </div>
  );
};

export default MaskText;
