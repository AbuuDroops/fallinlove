import { useRef, useCallback, useEffect, useState } from 'react';

export function useAutoScroll({ speed = 0.5 } = {}) {
  const rafRef = useRef(null);
  const isActiveRef = useRef(false);
  const isAutoScrolling = useRef(false);
  const [active, setActive] = useState(false);

  const scroll = useCallback(() => {
    if (!isActiveRef.current) return;

    const y = window.scrollY + speed;

    isAutoScrolling.current = true;
    window.scrollTo(0, y);
    isAutoScrolling.current = false;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (y >= maxScroll) {
      isActiveRef.current = false;
      setActive(false);
      return;
    }

    rafRef.current = requestAnimationFrame(scroll);
  }, [speed]);

  const start = useCallback(() => {
    if (isActiveRef.current) return;
    isActiveRef.current = true;
    setActive(true);
    rafRef.current = requestAnimationFrame(scroll);
  }, [scroll]);

  const stop = useCallback(() => {
    isActiveRef.current = false;
    setActive(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    const handleUserScroll = () => {
      if (isAutoScrolling.current) return;
      if (isActiveRef.current) {
        stop();
      }
    };

    window.addEventListener('scroll', handleUserScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleUserScroll);
      stop();
    };
  }, [stop]);

  return { active, start, stop };
}
