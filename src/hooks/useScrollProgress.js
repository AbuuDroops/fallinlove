import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useRef } from 'react';

export function useScrollProgress() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(Math.round(latest * 100));
  });

  return { containerRef, progress };
}
