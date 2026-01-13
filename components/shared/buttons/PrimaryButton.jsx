import React from 'react';

const PrimaryButton = ({ children }) => {
  return (
    <button className="group bg-[url('/images/svg/drip-paint.svg')] bg-cover bg-center px-10 py-6 text-3xl font-semibold text-white transition duration-300 ease-in-out hover:scale-105">
      <div className="text-purple-soft translate-y-[17%] transition-colors duration-150 ease-in-out group-hover:text-white">
        {children ? children : 'Click Me'}
      </div>
    </button>
  );
};

export default PrimaryButton;
