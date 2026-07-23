import { motion, AnimatePresence } from 'framer-motion';

const hearts = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 5,
  size: 12 + Math.random() * 20,
  duration: 4 + Math.random() * 4,
}));

export default function FloatingHearts({ active = true }) {
  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute text-primary/20"
              style={{ left: `${heart.x}%`, fontSize: heart.size }}
              initial={{ y: '100vh', opacity: 0 }}
              animate={{
                y: '-10vh',
                opacity: [0, 0.6, 0.3, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                delay: heart.delay,
                ease: 'linear',
              }}
            >
              ♥
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
