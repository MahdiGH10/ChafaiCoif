import { motion } from 'framer-motion';

export default function ScallopDivider({ flip, fill = 'var(--ink-2)' }) {
  return (
    <motion.div
      style={{
        width: '100%',
        lineHeight: 0,
        transform: flip ? 'rotate(180deg)' : 'none',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ width: '100%', height: 'auto', display: 'block' }} aria-hidden="true">
        <path
          d="M0,60 L0,20 Q25,0 50,20 T100,20 T150,20 T200,20 T250,20 T300,20 T350,20 T400,20 T450,20 T500,20 T550,20 T600,20 T650,20 T700,20 T750,20 T800,20 T850,20 T900,20 T950,20 T1000,20 T1050,20 T1100,20 T1150,20 T1200,20 L1200,60 Z"
          fill={fill}
        />
      </svg>
    </motion.div>
  );
}
