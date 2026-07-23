import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function CountdownSection({ onComplete }) {
  const sectionRef = useRef(null);
  const [phase, setPhase] = useState('waiting');
  const [count, setCount] = useState(null);
  const isInView = useInView(sectionRef, { margin: '-200px' });
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    setTimeout(() => setPhase('text'), 600);
  }, [isInView]);

  useEffect(() => {
    if (phase !== 'text') return;

    const t = setTimeout(() => setPhase('countdown'), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'countdown') return;

    const t = setTimeout(() => setCount(3), 400);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (count === null || count <= 0) return;

    const timer = setTimeout(() => {
      if (count === 1) {
        setCount(0);
        setTimeout(() => onComplete?.(), 600);
      } else {
        setCount(count - 1);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        {phase === 'waiting' && (
          <motion.p
            key="waiting"
            className="text-xl text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Kamu siap?
          </motion.p>
        )}

        {phase === 'text' && (
          <motion.p
            key="leadup"
            className="text-2xl md:text-3xl text-white/80 font-light text-center max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Ada sesuatu yang sudah lama ingin aku tanyakan...
          </motion.p>
        )}

        {phase === 'countdown' && count !== null && count > 0 && (
          <motion.div
            key={`c-${count}`}
            className="relative"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-9xl md:text-[12rem] font-bold text-white">
              {count}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
