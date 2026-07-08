import { motion } from 'framer-motion';
import BeforeAfter from './BeforeAfter';

const photos = [
  { label: 'Intérieur', src: '/images/insideview.jpg', alt: 'Vue intérieure du salon Chafai Coiff à Nabeul', tall: true },
  { label: 'Extérieur', src: '/images/outside.png', alt: 'Façade du salon Chafai Coiff à Nabeul', tall: false },
];

export default function Gallery() {
  return (
    <section id="galerie" style={{ background: 'var(--ink-2)', padding: '7rem 0', position: 'relative' }}>
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="tag">Galerie</span>
          <h2 className="display">
            Votre <em>studio</em> en images
          </h2>
          <p className="lede">
            Photos d'ambiance du salon et exemples de réalisations.
          </p>
        </motion.div>

        {/* ASYMMETRIC LAYOUT */}
        <div className="gallery-asymmetric" style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '1rem',
        }}>
          {photos.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                aspectRatio: item.tall ? '3/4' : '4/3',
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--line)',
                background: 'var(--ink-2)',
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <span className="mono" style={{
                position: 'absolute', left: '0.9rem', bottom: '0.8rem',
                fontSize: '0.72rem', color: 'var(--ivory)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                background: 'rgba(0,0,0,0.3)', padding: '0.2rem 0.5rem',
                borderRadius: '2px',
              }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BEFORE / AFTER — FULL WIDTH */}
      <div style={{ marginTop: '5rem', width: '100%' }}>
        <div className="wrap" style={{ marginBottom: '2.5rem' }}>
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="tag">Avant / Après</span>
            <h2 className="display">
              La <em>transformation</em> en direct
            </h2>
            <p className="lede">
              Faites glisser le curseur pour révéler la différence.
            </p>
          </motion.div>
        </div>
        <div style={{ padding: '0 6vw' }}>
          <BeforeAfter />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gallery-asymmetric { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
