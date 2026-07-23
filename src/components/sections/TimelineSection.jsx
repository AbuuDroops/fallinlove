import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const events = [
  { year: '2024', title: 'Pertama Bertemu', description: 'Hari di mana kita LDKS 1 kelompok.' },
  { year: '2025', title: 'Awal Dari Keakraban', description: 'Saat kita berlatih bersama untuk p5bk.' },
  { year: '2026', title: 'Pertama Tertawa Bersama', description: 'Saat aku tahu tawamu adalah suara favoritku.' },
  { year: '2026', title: 'Semakin Dekat', description: 'Setiap hari sejak itu, aku makin jatuh hati padamu.' },
  { year: '2026', title: 'Saat Ini', description: 'Di sini, sekarang momen terpenting dari semuanya.' },
];

export default function TimelineSection() {
  return (
    <section className="relative min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sign">Perjalanan Kita</h2>
          <p className="text-muted text-lg">Setiap momen yang membawa kita ke sini</p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-px" />

          <div className="space-y-16">
            {events.map((event, i) => (
              <TimelineItem key={i} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event, index }) {
  const { ref, isInView } = useAnimateOnScroll();
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
        <span className="text-xs text-primary font-mono tracking-widest">{event.year}</span>
        <h3 className="text-xl font-semibold text-white mt-1">{event.title}</h3>
        <p className="text-muted mt-2 leading-relaxed">{event.description}</p>
      </div>

      <motion.div
        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 w-8 h-8 rounded-full bg-surface border-2 border-primary/40 flex items-center justify-center text-xs z-10"
        animate={isInView ? { scale: [1, 1.3, 1], borderColor: ['rgba(244,63,94,0.4)', 'rgba(244,63,94,0.8)', 'rgba(244,63,94,0.4)'] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ♥
      </motion.div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}
