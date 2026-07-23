import { motion } from 'framer-motion';

export default function AutoScrollToggle({ active, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface/80 backdrop-blur-lg border border-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {active ? (
        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-muted" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      <span className="text-xs text-muted whitespace-nowrap">
        {active ? 'Jeda' : 'Putar Otomatis'}
      </span>
    </motion.button>
  );
}
