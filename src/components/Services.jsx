import { motion } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    number: '01',
    kicker: 'Coupe & coiffage',
    title: 'Coupe sur mesure',
    desc: 'Diagnostic, coupe et brushing adaptés à la texture et à la forme du visage.',
    items: [
      { label: 'Coupe femme', price: 'Sur devis' },
      { label: 'Coupe homme', price: 'Sur devis' },
      { label: 'Brushing / coiffage', price: 'Sur devis' },
    ],
  },
  {
    number: '02',
    kicker: 'Coloration & balayage',
    title: "Couleur d'atelier",
    desc: 'Colorations, balayages et éclaircissements pensés pour durer et vieillir avec élégance.',
    items: [
      { label: 'Coloration racine', price: 'Sur devis' },
      { label: 'Balayage / mèches', price: 'Sur devis' },
      { label: 'Soin post-couleur', price: 'Sur devis' },
    ],
  },
  {
    number: '03',
    kicker: 'Soins & rituels',
    title: 'Soins capillaires',
    desc: 'Rituels de soin en profondeur pour restaurer fibre, brillance et vitalité.',
    items: [
      { label: 'Soin hydratant', price: 'Sur devis' },
      { label: 'Soin réparateur', price: 'Sur devis' },
      { label: 'Rituel kératine', price: 'Sur devis' },
    ],
  },
  {
    number: '04',
    kicker: 'Grandes occasions',
    title: 'Coiffure mariée & événements',
    desc: 'Essai puis coiffure du jour J, pour mariages, fiançailles et soirées.',
    items: [
      { label: 'Essai coiffure', price: 'Sur devis' },
      { label: 'Coiffure mariée', price: 'Sur devis' },
      { label: 'Coiffure invitée', price: 'Sur devis' },
    ],
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="services" style={{ padding: '7rem 0', background: 'var(--ink)', position: 'relative' }}>
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="tag">Prestations</span>
          <h2 className="display">
            Quatre gestes, un seul <em>niveau d'exigence</em>
          </h2>
          <p className="lede">
            Un menu volontairement resserré autour de ce que la maison maîtrise le mieux.
          </p>
        </motion.div>

        <div>
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '2rem',
                padding: '1.6rem 0',
                borderBottom: '1px solid var(--line)',
                cursor: 'pointer',
                transition: 'background 0.3s',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ink-2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              {/* NUMBER */}
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.2rem' }}>
                <span className="serif service-number" style={{
                  fontSize: '2.6rem', fontWeight: 400, lineHeight: 1,
                  color: 'var(--accent)', opacity: 0.25, transition: 'opacity 0.3s',
                }}>
                  {service.number}
                </span>
              </div>

              {/* CONTENT */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div>
                    <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--brass)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {service.kicker}
                    </span>
                    <h3 className="serif" style={{ fontWeight: 500, fontSize: '1.6rem', marginTop: '0.3rem', color: 'var(--ivory)' }}>
                      {service.title}
                    </h3>
                  </div>
                  <span className="mono" style={{
                    fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.06em',
                    whiteSpace: 'nowrap', padding: '0.2rem 0.6rem',
                    border: '1px solid var(--accent-glow)', borderRadius: '2px',
                    background: 'var(--accent-glow)', transition: 'background 0.3s, border-color 0.3s',
                  }}>
                    Sur devis →
                  </span>
                </div>
                <p style={{ color: 'var(--ivory-dim)', fontSize: '0.92rem', maxWidth: '48ch', marginTop: '0.5rem' }}>
                  {service.desc}
                </p>

                {/* EXPANDED ITEMS */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expanded === i ? 'auto' : 0,
                    opacity: expanded === i ? 1 : 0,
                    marginTop: expanded === i ? '1.2rem' : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {service.items.map((item, j) => (
                      <div
                        key={j}
                        style={{
                          display: 'flex', justifyContent: 'space-between',
                          fontSize: '0.86rem', borderBottom: '1px dashed var(--line)',
                          padding: '0.5rem 0', color: 'var(--ivory-dim)',
                        }}
                      >
                        <span>{item.label}</span>
                        <span className="mono" style={{
                          fontSize: '0.72rem', letterSpacing: '0.06em',
                          color: 'var(--accent)', background: 'var(--accent-glow)',
                          padding: '0.1rem 0.5rem', borderRadius: '2px',
                        }}>
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #services > div > div > div > div[style*="grid"] {
            grid-template-columns: 40px 1fr !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
