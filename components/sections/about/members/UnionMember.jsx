import React from 'react';
import SprayImage from '../image/SprayImage';

const UnionMember = ({ department = 'CSE', name = 'Anish Bar', imageUrl = '' }) => {
  return (
    <div>
      <div className="relative flex flex-col items-center justify-center gap-6 md:flex-row">
        <SprayImage department={department} imageUrl={imageUrl} className="md:w-1/2" />
        <div className="flex flex-col items-center md:w-1/2">
          <h3 className="text-center text-4xl font-semibold text-black/80 md:text-left md:text-6xl">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UnionMember;
