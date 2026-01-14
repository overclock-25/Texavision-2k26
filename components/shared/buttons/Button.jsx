import { useEffect, useState } from 'react';

const Button = ({ delay }) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!render) return null;

  return (
    <div
      className={`masked-wrapper absolute bottom-40 z-100 flex h-40 w-50 justify-center py-12 md:bottom-10`}
    >
      <div className="pointer-events-none z-100 text-center text-white">Contact Us</div>
      <a href="https://cal.com/texavision-2k26/30min" target="_blank" rel="noopener noreferrer">
        <div className="mask-layer mask-0 cursor-pointer"></div>
        <div className="mask-layer mask-1"></div>
        <div className="mask-layer mask-2"></div>
        <div className="mask-layer mask-3"></div>
      </a>
    </div>
  );
};

export { Button };
