import { useEffect, useState } from 'react';

export const useRender = (delay = 0) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return render;
};
