'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
// import DripCropSvg from '../utils/DripCropSvg';

const DripIcon = ({ children, color = 'blue', className, iconColor }) => {
  const containerRef = useRef(null);
  const dripRef = useRef(null);
  const sprayRef = useRef(null);
  const tl = gsap.timeline();

  const handleMouseEnter = () => {
    tl.to(sprayRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    }).to(dripRef.current, {
      scaleY: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    tl.to(dripRef.current, {
      scaleY: 0,
      duration: 0.3,
      ease: 'power2.in',
    }).to(sprayRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.in',
    });
  };

  return (
    <div
      ref={containerRef}
      className={`group relative flex h-20 w-20 flex-col items-center ${className}`}
      style={{ color: color }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-[19%] right-[22%] z-10 flex h-12 w-12 items-center justify-center">
        {/* {React.createElement(icon, { size: 36, color: iconColor || color })} */}
        {children}
      </div>
      {/* <Image
        ref={sprayRef}
        src="/images/svg/drip-paint3.svg"
        alt="Paint Drip"
        width={24}
        height={48}
        className="h-full w-full scale-80 object-contain"
      /> */}
      <div
        ref={sprayRef}
        className="h-full w-full object-contain"
        style={{
          backgroundColor: color,
          maskImage: 'url(/images/svg/drip-paint3.svg)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskImage: 'url(/images/svg/drip-paint3.svg)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
        }}
      />
      <div
        ref={dripRef}
        className="top- absolute h-full w-full origin-top translate-y-12 scale-y-0 object-contain"
        style={{
          backgroundColor: color,
          maskImage: 'url(/images/svg/drip-crop.svg)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskImage: 'url(/images/svg/drip-crop.svg)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
        }}
      />
      {/* <Image
      ref={dripRef}
        src="/images/svg/drip-crop.svg"
        alt="Paint Drip"
        width={24}
        height={48}
        className="absolute top- scale-y-0 h-full w-full object-contain origin-top translate-y-12"
      /> */}
      {/* <DripCropSvg svgColor='#ffffff' /> */}
    </div>
  );
};

export default DripIcon;
