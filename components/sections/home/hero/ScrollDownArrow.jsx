import { useRender } from '@/hooks/useRender';

const ScrollDownArrow = ({ delay = 0 }) => {
  const render = useRender(delay);

  return (
    <div
      className={`absolute bottom-2 left-1/2 z-100 h-10 w-15 -translate-x-1/2 animate-bounce opacity-0 transition-opacity duration-1000 ${render && 'opacity-100'}`}
      style={{
        backgroundImage: `url('hero/arrow.png')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        filter: 'invert(0.8)',
      }}
    ></div>
  );
};

export { ScrollDownArrow };
