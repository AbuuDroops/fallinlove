import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const petals = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 8 + Math.random() * 6,
  size: 10 + Math.random() * 14,
  rotation: Math.random() * 360,
  sway: 30 + Math.random() * 40,
}));

function Petal({ petal }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${petal.x}%`,
        top: -30,
        fontSize: petal.size,
        rotate: petal.rotation,
      }}
      animate={{
        y: ['-5vh', '110vh'],
        x: [0, petal.sway, -petal.sway * 0.5, petal.sway * 0.3, 0],
        rotate: [petal.rotation, petal.rotation + 40, petal.rotation - 20, petal.rotation + 60],
        opacity: [0, 0.5, 0.4, 0.3, 0],
      }}
      transition={{
        duration: petal.duration,
        repeat: Infinity,
        delay: petal.delay,
        ease: 'linear',
      }}
    >
      🌸
    </motion.div>
  );
}

export default function AmbientLove() {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const glowRef = useRef(null);
  const [isTouchDevice] = useState(() => typeof window !== 'undefined' && 'ontouchstart' in window);

  useEffect(() => {
    if (isTouchDevice) return;
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [isTouchDevice]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Gradient Mesh — 3 large moving orbs */}
      <motion.div
        className="absolute rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-[120px]"
        style={{ width: 600, height: 600 }}
        animate={{
          x: ['-10%', '70%', '30%', '-10%'],
          y: ['20%', '10%', '70%', '20%'],
          scale: [1, 1.3, 0.9, 1],
          opacity: [0.2, 0.4, 0.25, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full bg-gradient-to-b from-secondary/8 to-transparent blur-[100px]"
        style={{ width: 450, height: 450 }}
        animate={{
          x: ['80%', '20%', '60%', '80%'],
          y: ['10%', '60%', '30%', '10%'],
          scale: [0.9, 1.2, 1, 0.9],
          opacity: [0.15, 0.35, 0.2, 0.15],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute rounded-full bg-gradient-to-b from-rose-400/8 to-transparent blur-[100px]"
        style={{ width: 500, height: 500 }}
        animate={{
          x: ['30%', '80%', '10%', '30%'],
          y: ['70%', '30%', '50%', '70%'],
          scale: [1.1, 0.8, 1.3, 1.1],
          opacity: [0.2, 0.3, 0.15, 0.2],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      {/* 5. Mouse-follow Glow */}
      {!isTouchDevice && (
        <motion.div
          ref={glowRef}
          className="absolute rounded-full bg-gradient-to-b from-primary/15 to-transparent blur-[120px]"
          style={{
            width: 400,
            height: 400,
            x: mousePos.x - 200,
            y: mousePos.y - 200,
            transition: 'x 0.8s ease-out, y 0.8s ease-out',
          }}
        />
      )}

      {/* 6. Rose Petals */}
      {petals.map((petal) => (
        <Petal key={petal.id} petal={petal} />
      ))}
    </div>
  );
}
