import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const reasons = [
  { id: 1, text: 'Tawamu bisa menerangi ruangan yang paling gelap sekalipun.', icon: '' },
  { id: 2, text: 'Cara kamu peduli pada semua orang tanpa berharap imbalan.', icon: '' },
  { id: 3, text: 'Semangatmu saat membicarakan hal-hal yang kamu cintai.', icon: '' },
  { id: 4, text: 'Cara kamu membuat momen sederhana terasa begitu istimewa.', icon: '' },
  { id: 5, text: 'Kekuatanmu jauh lebih berani dari yang kamu kira.', icon: '' },
  { id: 6, text: 'Cara matamu menyipit saat kamu tersenyum.', icon: '' },
];

export default function ReasonsSection() {
  return (
    <section className="relative min-h-screen py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sign">
            Hal yang Aku Suka Tentangmu
          </h2>
          <p className="text-muted text-lg">
            Dan ini baru awal dari daftarnya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.id} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonCard({ reason, index }) {
  const { ref, isInView } = useAnimateOnScroll();
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="group relative p-7 rounded-2xl bg-surface/40 border border-white/[0.06] hover:border-primary/20 transition-all duration-700"
      initial={{ opacity: 0, x: fromLeft ? -60 : 60, y: 30 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: fromLeft ? -60 : 60, y: 30 }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl shrink-0 mt-1">{reason.icon}</span>
        <p className="text-white/80 leading-relaxed text-[15px]">{reason.text}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}
