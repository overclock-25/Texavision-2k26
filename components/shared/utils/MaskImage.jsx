import React from 'react';

const MaskImage = ({
  imageRef,
  className,
  imageUrl = '/images/png/lightwall.jpg',
  svgUrl = '/images/svg/drip-paint3.svg',
  bgSize = 'cover',
  bgPosition = 'center',
  ...props
}) => {
  return (
    <div
      ref={imageRef ? imageRef : null}
      className={`h-full w-full ${className}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: bgSize,
        backgroundPosition: bgPosition,
        WebkitMaskImage: `url(${svgUrl})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: `url(${svgUrl})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
      {...props}
    />
  );
};

export default MaskImage;
