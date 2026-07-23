import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer({ startOnPlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!startOnPlay) return;
    const t = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(t);
  }, [startOnPlay]);

  useEffect(() => {
    if (!audioRef.current || !startOnPlay) return;
    audioRef.current.volume = 0.3;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [startOnPlay]);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source
          src="/best-part.mp3"
          type="audio/mpeg"
        />
      </audio>

      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-lg border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs text-muted truncate max-w-[120px]">
                Best Part - H.E.R.
              </span>
              {isPlaying && (
                <span className="flex gap-[2px] items-end h-3">
                  {[1, 2, 3].map((i) => (
                    <motion.span
                      key={i}
                      className="w-[2px] bg-primary rounded-full"
                      animate={{ height: [3, 8, 4, 10, 3] }}
                      transition={{
                        duration: 0.8 + i * 0.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </span>
              )}
            </motion.div>

            <motion.button
              onClick={toggle}
              className="w-10 h-10 rounded-full bg-primary/90 backdrop-blur-lg flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
