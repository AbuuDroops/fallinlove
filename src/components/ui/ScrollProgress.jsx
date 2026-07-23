import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  { label: 'Cerita', key: 'story1' },
  { label: 'Galeri', key: 'gallery' },
  { label: 'Timeline', key: 'timeline' },
  { label: 'Alasan', key: 'reasons' },
  { label: 'Surat', key: 'letter' },
  { label: 'Countdown', key: 'countdown' },
  { label: 'Proposal', key: 'proposal' },
];

export default function ScrollProgress({ started, letterOpened }) {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        started ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="relative h-[2px] bg-white/[0.06]">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary"
          style={{ width }}
        />
      </div>

      <div className="hidden sm:flex items-center justify-center gap-1 pt-2 px-4">
        {steps.map((step, i) => {
          const show =
            (step.key === 'countdown' || step.key === 'proposal')
              ? letterOpened
              : true;

          if (!show) return null;

          return (
            <span
              key={step.key}
              className="text-[10px] text-muted/40 tracking-widest uppercase"
            >
              {step.label}
              {i < steps.length - 1 && (
                <span className="mx-1 text-muted/20">·</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
