import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/ui/FloatingHearts';

const confettiColors = ['#F43F5E', '#FB7185', '#FBBF24', '#34D399', '#60A5FA', '#C084FC'];

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const name = searchParams.get('name') || 'Ratna';

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: confettiColors[i % confettiColors.length],
    delay: Math.random() * 2,
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-bg">
      <FloatingHearts active />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute top-0"
          style={{
            left: `${c.x}%`,
            width: c.size,
            height: c.size * 1.4,
            backgroundColor: c.color,
            borderRadius: 2,
            rotate: c.rotation,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: '100vh',
            opacity: [0, 1, 1, 0],
            rotate: c.rotation + 360,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: c.delay,
            ease: 'linear',
          }}
        />
      ))}

      <motion.div
        className="text-center z-10 max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="text-7xl block mb-8"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💖
        </motion.span>

        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ backgroundSize: '200% 200%' }}
        >
          Yeay! 🎉
        </motion.h1>

        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-xl text-white/80 mb-2">
              {name}, kamu baru saja membuat seseorang sangat, sangat bahagia.
            </p>
            <p className="text-muted mt-4 leading-relaxed">
              Ini adalah awal dari sesuatu yang indah.
              Terima kasih sudah bilang iya. ❤️
            </p>

            <motion.div
              className="mt-16 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <div className="flex items-center gap-4 justify-center">
                <span className="text-2xl">💕</span>
                <span className="text-2xl">💖</span>
                <span className="text-2xl">💕</span>
              </div>
              <button
                onClick={() => navigate('/', { replace: true })}
                className="mt-6 px-8 py-3 rounded-full border border-white/10 text-muted hover:text-white hover:border-white/30 transition-all duration-300 bg-transparent cursor-pointer text-sm"
              >
                Mulai Lagi
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
