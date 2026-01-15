import React from 'react';

const ComingSoon = ({ children, className, version = 'white' }) => {
  const versions = {
    white: 'bg-cream text-black',
    black: 'bg-black text-cream',
  };
  return (
    <div
      className={`${className} flex h-full w-full flex-col items-center justify-center ${versions[version]}`}
    >
      {children}
    </div>
  );
};

export default ComingSoon;
