'use client';

import Image from 'next/image';

const CarouselCard = ({ date, month, year, title, image, isSelected, onClick, style }) => {
  return (
    <div
      onClick={onClick}
      className={`absolute flex h-32 w-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl transition-all duration-700 ease-out ${
        isSelected ? 'shadow-cream/20 shadow-2xl' : 'shadow-lg'
      }`}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Card background image */}
      <Image src={image} alt={title} fill className="object-cover" />
      {/* Dark overlay */}
      <div
        className={`absolute inset-0 ${
          isSelected ? 'bg-black/40' : 'bg-black/60'
        } transition-all duration-500`}
      />
      {/* Content */}
      <div className="relative z-10 text-center">
        <span className="font-gillian-joe text-cream text-4xl font-bold drop-shadow-lg">
          {date}
        </span>
        <span className="text-cream/90 block text-sm tracking-wider uppercase drop-shadow-md">
          {month} {year}
        </span>
      </div>
    </div>
  );
};

export default CarouselCard;
