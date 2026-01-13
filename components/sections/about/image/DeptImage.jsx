import Image from 'next/image';
import React from 'react';

const DeptImage = ({ department = 'CSE' }) => {
  return (
    <div className="absolute -top-4 -right-10 z-0 h-16 w-16 rounded-full object-cover">
      <Image width={140} height={140} src="/images/svg/bubble.svg" alt="spray paint" className="" />
      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-black">
        {department}
      </div>
    </div>
  );
};

export default DeptImage;
