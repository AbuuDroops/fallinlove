import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ThankYouPage() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-bg">
      <motion.div
        className="text-center z-10 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="text-6xl block mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          🌸
        </motion.span>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Terima Kasih, Ratna
        </h1>

        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="text-lg text-white/70 leading-relaxed mb-4">
              Aku sangat bersyukur kamu meluangkan waktu untuk membaca semua yang sudah aku buat untukmu.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Kejujuranmu berarti lebih dari yang kamu tahu.
              Aku sungguh berharap kamu selalu bahagia.
            </p>

            <motion.div
              className="mt-8 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <button
                onClick={() => navigate('/', { replace: true })}
                className="px-8 py-3 rounded-full border border-white/10 text-muted hover:text-white hover:border-white/30 transition-all duration-300 bg-transparent cursor-pointer text-sm"
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
