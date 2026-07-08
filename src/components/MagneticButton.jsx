import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, as = 'div', className, style, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    setPos({ x, y });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const Tag = as;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 15, mass: 0.1 }}
    >
      <Tag {...props}>{children}</Tag>
    </motion.div>
  );
}
