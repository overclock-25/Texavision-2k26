'use client';
import { useRender } from '@/hooks/useRender';

const RenderButton = ({ children, onClick, className, delay, ...props }) => {
  const render = useRender(delay);

  return (
    <div
      className={`masked-wrapper relative z-100 flex h-40 w-50 justify-center py-12 opacity-0 transition-opacity duration-1000 ${render && 'opacity-100'}`}
      onClick={onClick}
      {...props}
    >
      <div className={`pointer-events-none z-100 text-center text-white ${className}`}>
        {children}
      </div>
      <div className="relative">
        <div className="mask-layer mask-0 cursor-pointer"></div>
        <div className="mask-layer mask-1"></div>
        <div className="mask-layer mask-2"></div>
        <div className="mask-layer mask-3"></div>
      </div>
    </div>
  );
};

export { RenderButton };
