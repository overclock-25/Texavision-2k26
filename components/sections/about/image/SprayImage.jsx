import Image from 'next/image';
import React from 'react';
import DeptImage from './DeptImage';

const SprayImage = ({ department = 'CSE', size = 36, imageUrl = '', className = '' }) => {
  // const circleSizes = size;
  // const imageSizes = size;
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-10 md:flex-row ${className}`}
    >
      <div className={`p-6`}>
        <Image
          width={size * 4}
          height={size * 4}
          src={imageUrl || '/images/team/dev1.png'}
          alt="Union Member"
          className="-traslate-x-1 translat-y-1 relative inset-0 z-5 aspect-square h-full w-full rounded-full object-cover"
        />
      </div>
      <Image
        width={size * 6}
        height={size * 6}
        src="/images/svg/circle2.svg"
        alt="circle"
        className={`absolute z-6 h-full w-full rounded-full object-cover`}
      />
      <DeptImage department={department} />
      {/* <Image
        width={100}
        height={100}
        src="/images/team/dev1.png"
        alt="Union Member"
        className="relative inset-[25%] h-2/3 w-1/2 rounded-full object-cover"
      /> */}
    </div>
  );
};

export default SprayImage;
