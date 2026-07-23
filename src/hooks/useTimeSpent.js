import { useEffect, useRef } from 'react';

export function useTimeSpent(onTick) {
  const startRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      onTick?.(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [onTick]);
}
