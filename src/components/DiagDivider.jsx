import { motion } from 'framer-motion';

export default function DiagDivider({ flip }) {
  const clipPath = flip
    ? 'polygon(0 4%, 100% 0, 100% 100%, 0 96%)'
    : 'polygon(0 0, 100% 4%, 100% 96%, 0 100%)';

  return (
    <motion.div
      style={{
        width: '100%', height: 'clamp(40px, 6vw, 80px)',
        background: 'var(--ink-2)', clipPath,
        marginTop: '-1px',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    />
  );
}
