import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="flex h-[30vh] w-full items-center justify-center text-5xl font-black text-blue-700 motion-safe:animate-pulse motion-reduce:animate-none"
        >
          Texavision 2k26
        </div>
      ))}
    </div>
  );
};

export default Home;
