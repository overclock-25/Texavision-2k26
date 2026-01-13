'use client';

const DateCard = ({ date, month, isSelected, onClick, variant = 'mobile' }) => {
  if (variant === 'mobile') {
    return (
      <div
        onClick={onClick}
        className={`flex h-16 w-20 cursor-pointer flex-col items-center justify-center rounded-lg backdrop-blur-sm transition-all duration-300 ease-out ${
          isSelected
            ? 'bg-charcoal text-cream scale-105 shadow-xl'
            : 'text-charcoal border-charcoal/20 border bg-transparent shadow-md'
        }`}
      >
        <span
          className={`font-gillian-joe text-xl font-bold ${
            isSelected ? 'text-cream' : 'text-charcoal'
          }`}
        >
          {date}
        </span>
        <span
          className={`text-xs tracking-wider uppercase ${
            isSelected ? 'text-cream/80' : 'text-charcoal/70'
          }`}
        >
          {month}
        </span>
      </div>
    );
  }

  // Desktop variant (for 3D carousel - handled separately in parent)
  return null;
};

export default DateCard;
