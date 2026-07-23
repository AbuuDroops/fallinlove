import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

import img1 from '../../assets/IMG-20260704-WA0015.jpg';
import img2 from '../../assets/IMG-20260704-WA0016.jpg';
import img3 from '../../assets/IMG-20260704-WA0045.jpg';
import img4 from '../../assets/IMG-20260704-WA0046.jpg';
import img5 from '../../assets/IMG-20260704-WA0047.jpg';
import img6 from '../../assets/IMG-20260704-WA0048.jpg';

const cards = [
  { id: 1, image: img1 },
  { id: 2, image: img2 },
  { id: 3, image: img3 },
  { id: 4, image: img4 },
  { id: 5, image: img5 },
  { id: 6, image: img6 },
];

const directions = [
  { x: -200, y: 0, rotate: -8 },
  { x: 200, y: 0, rotate: 8 },
  { x: 0, y: -200, rotate: -5 },
  { x: 0, y: 200, rotate: 5 },
  { x: -150, y: -150, rotate: -12 },
  { x: 150, y: -150, rotate: 12 },
];

export default function GallerySection() {
  return (
    <section className="relative min-h-screen py-32 px-6">
      <SectionHeader />

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <GalleryCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}

function SectionHeader() {
  const { ref, isInView } = useAnimateOnScroll();

  return (
    <motion.div
      ref={ref}
      className="text-center mb-20"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sign">Galeri Kita</h2>
      <p className="text-muted text-lg">Momen yang terabadikan selamanya</p>
    </motion.div>
  );
}

function GalleryCard({ card, index }) {
  const { ref, isInView } = useAnimateOnScroll({ margin: '-50px' });
  const dir = directions[index % directions.length];

  return (
    <motion.div
      ref={ref}
      className="relative aspect-[4/5] rounded-2xl border border-white/5 overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, x: dir.x, y: dir.y, rotate: dir.rotate }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : { opacity: 0, x: dir.x, y: dir.y, rotate: dir.rotate }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -8, rotate: 0 }}
      style={{ willChange: 'transform, opacity' }}
    >
      <img
        src={card.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
    </motion.div>
  );
}
