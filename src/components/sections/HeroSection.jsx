import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import ScrollIndicator from '../ui/ScrollIndicator';

const sparkles = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 4,
  size: 10 + Math.random() * 18,
}));

export default function HeroSection({ onStart }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute text-primary/25 z-10"
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
            y: [0, -40, -80],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeOut',
          }}
        >
          ✦
        </motion.span>
      ))}

      <motion.h1
        className="text-7xl md:text-9xl font-bold tracking-tight text-white mb-4 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Hai{' '}
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Ratna
        </span>
      </motion.h1>

      {show && (
        <motion.p
          className="text-xl md:text-2xl text-muted font-light tracking-wide z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Aku buat sesuatu untuk kamu.
        </motion.p>
      )}

      {show && (
        <motion.div
          className="mt-12 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Button size="lg" onClick={onStart}>
            Mulai Perjalanan
          </Button>
        </motion.div>
      )}

      <ScrollIndicator />
    </section>
  );
}
