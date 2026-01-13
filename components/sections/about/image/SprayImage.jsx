import Image from 'next/image';
import React from 'react';
import DeptImage from './DeptImage';

const SprayImage = ({ department = 'CSE' }) => {
  return (
    <div className="relative flex flex-col items-center justify-center md:flex-row">
      <div className="h-36 w-36 p-6">
        <Image
          width={100}
          height={100}
          src="/images/team/dev1.png"
          alt="Union Member"
          className="relative inset-0 z-5 h-full w-full -translate-x-1 translate-y-1 rounded-full object-cover"
        />
      </div>
      <Image
        width={120}
        height={120}
        src="/images/svg/circle.svg"
        alt="circle"
        className="absolute z-1 h-36 w-36 rounded-full object-cover"
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
