import { motion } from 'framer-motion';

export default function SectionNumber({ num, total = 6 }) {
  return (
    <motion.span
      className="mono"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        position: 'absolute', top: '0.75rem', right: '0',
        fontSize: '0.65rem', letterSpacing: '0.12em',
        color: 'var(--ivory-dimmer)', opacity: 0.2,
        userSelect: 'none',
      }}
    >
      {String(num).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </motion.span>
  );
}
