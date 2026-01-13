import React from 'react';
import SprayImage from '../image/SprayImage';

const UnionMember = ({ department = 'CSE', name = 'Anish Bar' }) => {
  return (
    <div>
      <div className="relative flex flex-col items-center justify-center gap-6 md:flex-row">
        <SprayImage department={department} />
        <div className="flex flex-col items-center">
          <h3 className="text-center text-4xl font-semibold md:text-6xl">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default UnionMember;
