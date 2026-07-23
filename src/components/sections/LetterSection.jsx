import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const letterParagraphs = [
  "Untuk Ratna,",
  "Surat ini sudah aku tulis berulang kali di kepalaku. Setiap kali, aku hapus dan mulai lagi, karena kata-kata seolah tak pernah cukup.",
  "Ada sesuatu tentang dirimu yang membuat dunia terasa lebih lembut, lebih terangseperti alam semesta akhirnya memutuskan untuk menunjukkan padaku arti keindahan.",
  "Aku tak tahu apa yang akan terjadi ke depannya. Tapi yang aku tahu, saat aku membayangkan masa depanku, kamu ada di setiap versinya.",
  "Terima kasih sudah ada. Terima kasih sudah menjadi dirimu.",
  "Dengan segenap hati,",
];

export default function LetterSection({ onOpen }) {
  const { ref, isInView } = useAnimateOnScroll();
  const [opened, setOpened] = useState(false);

  return (
    <section className="relative min-h-screen py-32 px-6 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-primary/[0.02]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        ref={ref}
        className="max-w-2xl mx-auto w-full"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sign">Surat untuk Kamu</h2>
          <p className="text-muted">
            {opened ? 'Baca dengan perlahan ya' : 'Ada surat buat kamu nih'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="envelope"
              onClick={() => { setOpened(true); onOpen?.(); }}
              className="relative w-full p-12 md:p-16 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] shadow-2xl shadow-primary/5 cursor-pointer group text-left"
              whileHover={{ scale: 1.02, borderColor: 'rgba(244,63,94,0.25)' }}
              whileTap={{ scale: 0.98 }}
              exit={{ scale: 0.8, opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-3xl" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent rounded-b-3xl opacity-50" />

              <div className="flex flex-col items-center justify-center gap-6">
                <motion.span
                  className="text-7xl block"
                  animate={{ scale: [1, 1.15, 1], y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  💌
                </motion.span>
                <span className="text-lg text-muted group-hover:text-primary transition-colors duration-300">
                  Klik untuk membuka
                </span>
                <motion.span
                  className="text-primary/60 text-2xl"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↓
                </motion.span>
              </div>

              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-[8px]">♥</span>
              </motion.div>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-primary/20 shadow-2xl shadow-primary/10"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-3xl" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent rounded-b-3xl opacity-50" />

              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-[8px]">♥</span>
              </motion.div>

              <div className="space-y-6">
                {letterParagraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    className={`leading-relaxed ${
                      i === 0 || i === letterParagraphs.length - 1
                        ? 'font-semibold text-white'
                        : 'text-white/70'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.2 + 0.3 }}
                  >
                    {para}
                  </motion.p>
                ))}
                <motion.div
                  className="text-right mt-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-4xl md:text-5xl text-primary/80 font-signature">
                    abu
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
