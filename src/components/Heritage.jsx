import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function AnimatedStat({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value.replace(/[^0-9]/g, ''));
    const start = performance.now();
    const duration = 1500;
    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.floor(eased * num));
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref}>
      <b className="serif" style={{ fontSize: '2rem', fontWeight: 500, display: 'block', color: 'var(--accent)' }}>
        {display}{suffix}
      </b>
      <span style={{ fontSize: '0.78rem', color: 'var(--ivory-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </span>
    </div>
  );
}

const stats = [
  { value: '148', suffix: '+', label: 'Avis Google (4.9★)' },
  { value: '7', suffix: '/7', label: 'Ouvert chaque jour' },
  { value: '100', suffix: '%', label: 'Rendez-vous sur mesure' },
];

const marqueeWords = ['COUPE', 'BARBE', 'SOIN', 'NABEUL', 'EST. 2004', 'COIFFURE MARIÉE'];

export default function Heritage() {
  return (
    <section id="heritage" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* FULL-WIDTH BACKGROUND */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, rgba(20,22,26,0.88) 0%, rgba(20,22,26,0.75) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: -1,
        background: 'url(/images/insideview.jpg) center/cover no-repeat fixed',
        filter: 'saturate(0.6)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '7rem 0 0' }}>
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: '680px', position: 'relative' }}
          >
            <span className="tag" style={{ color: 'var(--accent)' }}>La maison</span>
            <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--ivory)' }}>
              Un salon pensé comme un <em>atelier</em>
            </h2>
            <div style={{
              marginTop: '1.8rem', padding: '2rem', maxWidth: '560px',
              background: 'rgba(20,22,26,0.85)', backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(242,237,227,0.08)', borderRadius: '4px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}>
              <p style={{ color: 'var(--ivory)', fontSize: '1.08rem' }}>
                Nabeul est connue depuis des générations pour ses céramiques et ses
                maîtres-artisans. Chafai Coiff s'inscrit dans cette même exigence
                : un salon de coiffure et barberie où chaque prestation est exécutée
                avec le sérieux d'un métier qu'on respecte.
              </p>
              <p style={{ color: 'var(--ivory-dim)', marginTop: '1rem' }}>
                Coupe, coloration, barbe, soins capillaires et préparation des grandes
                occasions — l'équipe prend le temps d'écouter avant de proposer,
                et ne quitte jamais un client sans un résultat qu'il porte fièrement.
              </p>
            </div>
          </motion.div>
        </div>

        {/* STATS DASHBOARD STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: '3rem', width: '100%',
            borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
            background: 'rgba(20,22,26,0.8)', backdropFilter: 'blur(8px)',
          }}
        >
          <div className="wrap" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: '2rem', paddingBottom: '2rem' }}>
            {stats.map((stat, i) => (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1, justifyContent: 'center' }}>
                <AnimatedStat {...stat} />
                {i < stats.length - 1 && (
                  <div style={{ width: '1px', height: '3rem', background: 'var(--line-strong)' }} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* MARQUEE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            width: '100%', overflow: 'hidden', padding: '1.4rem 0',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
            style={{ display: 'flex', gap: '3rem', width: 'fit-content' }}
          >
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span
                key={i}
                className="mono"
                style={{
                  fontSize: '0.78rem', letterSpacing: '0.3em', color: 'var(--brass)',
                  whiteSpace: 'nowrap', opacity: 0.6,
                }}
              >
                {word}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #heritage > div > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
