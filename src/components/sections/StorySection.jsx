import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const memories = [
  {
    id: 1,
    text: "Pertama kali aku melihatmu, semuanya sirna. Seakan alam semesta memutuskan untuk menunjukkan padaku arti keindahan yang sesungguhnya.",
    emoji: '',
  },
  {
    id: 2,
    text: "Aku masih ingat suara tawamu untuk pertama kalinya. Bukan sekadar suara—itu musik yang ingin aku dengar selamanya.",
    emoji: '',
  },
  {
    id: 3,
    text: "Cara matamu berbinar saat membicarakan hal yang kamu sukai. Binar itu adalah hal paling tulus yang pernah aku saksikan.",
    emoji: '',
  },
  {
    id: 4,
    text: "Dan di tengah perjalanan, aku sadar—rumah bukanlah sebuah tempat. Rumah adalah dirimu.",
    emoji: '',
  },
];

export default function StorySection({ part = 1 }) {
  const items = part === 1 ? memories.slice(0, 2) : part === 2 ? memories.slice(2) : memories;

  return (
    <section className="relative min-h-screen py-32 px-6">
      <div className="max-w-2xl mx-auto">
        {items.map((memory, index) => (
          <StoryCard key={memory.id} memory={memory} index={index} items={items} />
        ))}
      </div>
    </section>
  );
}

function StoryCard({ memory, index, items }) {
  const { ref, isInView } = useAnimateOnScroll();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative ${index < items.length - 1 ? 'mb-48' : ''}`}
      initial={{ opacity: 0, x: isEven ? -120 : 120 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -120 : 120 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-4xl md:text-5xl block mb-6">{memory.emoji}</span>
      <p className={`text-xl md:text-2xl text-white/90 leading-relaxed font-light italic ${isEven ? 'text-left' : 'text-right'}`}>
        "{memory.text}"
      </p>
      {index < items.length - 1 && (
        <motion.div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-primary/40 to-transparent"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      )}
    </motion.div>
  );
}
