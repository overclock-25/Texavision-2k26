'use client';
import { useRender } from '@/hooks/useRender';

const ContactUsLink = ({ link, delay }) => {
  const render = useRender(delay);

  return (
    <div
      className={`masked-wrapper relative z-100 flex h-40 w-50 justify-center py-12 opacity-0 transition-opacity duration-1000 ${render && 'opacity-100'}`}
    >
      <div className="pointer-events-none z-100 text-center text-white">Contact Us</div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="mask-layer mask-0 cursor-pointer"></div>
        <div className="mask-layer mask-1"></div>
        <div className="mask-layer mask-2"></div>
        <div className="mask-layer mask-3"></div>
      </a>
    </div>
  );
};

export { ContactUsLink };
