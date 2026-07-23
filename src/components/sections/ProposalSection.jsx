import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import FloatingHearts from '../ui/FloatingHearts';

const noMessages = [
  'Santai aja. Nggak ada tekanan kok.',
  'Aku mengerti. Makasih sudah jujur.',
  'Beneran, gapapa. Aku bersyukur kamu sudah membaca ini.',
  'Kamu wanita yang luar biasa, dan aku menghargai perasaanmu.',
];

export default function ProposalSection({ onAnswer }) {
  const [showNoMessage, setShowNoMessage] = useState(false);
  const [noStep, setNoStep] = useState(0);
  const [saidYes, setSaidYes] = useState(false);
  const [noPos, setNoPos] = useState(null);
  const [noMoved, setNoMoved] = useState(false);

  const handleYes = () => {
    setSaidYes(true);
    onAnswer?.('yes');
  };

  const moveNoBtn = useCallback(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 400;
    const btnW = 120;
    setNoPos({
      x: Math.random() * (w - btnW - 40) + 20,
      y: 60 + Math.random() * 25,
    });
    setNoMoved(true);
    if (noStep < noMessages.length - 1) {
      setNoStep((s) => s + 1);
    }
    setShowNoMessage(true);
  }, [noStep]);

  if (saidYes) {
    return null;
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <FloatingHearts active />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div className="text-center z-10 max-w-lg mx-auto">
        <motion.div className="mb-12 space-y-2">
          <motion.p
            className="text-3xl md:text-4xl font-bold text-white leading-relaxed"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Maukah kamu
          </motion.p>
          <motion.p
            className="text-3xl md:text-4xl font-bold text-white leading-relaxed"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            jadi pacarku?
          </motion.p>
        </motion.div>

        {showNoMessage && (
          <motion.p
            className="text-muted mb-8 text-sm italic"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {noMessages[noStep]}
          </motion.p>
        )}

        <div className={`flex items-center justify-center gap-6 ${noMoved ? '' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={handleYes}
              className="px-10 py-4 rounded-full bg-primary text-white font-semibold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 cursor-pointer"
            >
              ❤️ Iya
            </button>
          </motion.div>

          {!noMoved && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={moveNoBtn}
                className="px-10 py-4 rounded-full border border-white/20 text-muted hover:text-white hover:border-white/40 transition-all duration-300 cursor-pointer bg-transparent"
              >
                🤍 Tidak
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {noMoved && (
        <motion.div
          className="absolute z-50"
          style={{ left: noPos?.x ?? '50%', top: `${noPos?.y ?? 80}%` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={moveNoBtn}
            className="px-10 py-4 rounded-full border border-white/20 text-muted hover:text-white hover:border-white/40 transition-colors duration-300 cursor-pointer bg-transparent whitespace-nowrap"
          >
            🤍 Tidak
          </button>
        </motion.div>
      )}
    </section>
  );
}
