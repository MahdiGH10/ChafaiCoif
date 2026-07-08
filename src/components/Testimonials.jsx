import { motion } from 'framer-motion';


const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/UCKvCs13uLouPmW39';

const reviews = [
  {
    name: 'Ibtissem Kacem',
    rating: 5,
    text: 'Je recommande vivement ce salon de coiffure. Je suis ravie du résultat et ils sont très professionnelles et à l écoute de leurs clientes',
    featured: true,
  },
  {
    name: 'Sonia Ben Said',
    rating: 5,
    text: 'Acceuil très chaleureux avec un personnel très compétent et à l\'écoute. Les résultats sont incroyables. Vivement les prochaines visites',
  },
  {
    name: 'Sahbi Blel',
    rating: 5,
    text: 'Super endroit je recommande, un accueil chaleureux un professionnalisme',
  },
  {
    name: 'Oumayma',
    rating: 5,
    text: 'Très bon salon de coiffure, je vous le recommande.',
  },
  {
    name: 'Ikbel Jemai',
    rating: 4,
    text: 'Super équipe, super accueil un grand Merci pour tout',
  },
  {
    name: 'Nizar Belhaj',
    rating: 4,
    text: 'Satisfait de la coupe',
  },
  {
    name: 'chehida khedri',
    rating: 5,
    text: 'سبحان الله وبحمده سبحان الله العظيم',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function StarRating({ rating, size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={s <= rating ? 'var(--accent)' : 'var(--ink-3)'}
          stroke={s <= rating ? 'var(--accent)' : 'var(--line-strong)'}
          strokeWidth="1"
          aria-hidden="true"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const featured = reviews.find((r) => r.featured);
  const rest = reviews.filter((r) => !r.featured);

  return (
    <section id="avis" style={{ padding: '7rem 0', background: 'var(--ink)', position: 'relative' }}>
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="tag">Avis</span>
          <h2 className="display">
            Ce que <em>disent</em> les clients
          </h2>
        </motion.div>

        {/* GOOGLE BADGE */}
        <motion.a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.6rem 1.2rem', marginBottom: '2.5rem',
            border: '1px solid var(--line-strong)', borderRadius: '100px',
            background: 'var(--ink-2)', width: 'fit-content',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--brass)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-strong)'; }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
          </svg>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--ivory)', fontWeight: 600 }}>4.9</span>
              <StarRating rating={5} size={12} />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--ivory-dim)' }}>148 avis Google</span>
          </div>
        </motion.a>

        {/* FEATURED REVIEW — hero quote */}
        {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderTop: '2px solid var(--brass)', paddingTop: '2rem', marginBottom: '3rem',
              }}
            >
              <span className="serif" style={{
                fontSize: '4rem', lineHeight: 0.5, display: 'block', color: 'var(--brass)', opacity: 0.2, marginBottom: '0.3rem', userSelect: 'none',
              }}>
                "
              </span>
              <p className="serif" style={{
                fontStyle: 'italic', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                color: 'var(--ivory)', lineHeight: 1.4, maxWidth: '48ch',
              }}>
                {featured.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.2rem' }}>
                <StarRating rating={featured.rating} size={16} />
                <span className="mono" style={{ fontSize: '0.82rem', color: 'var(--brass)' }}>{featured.name}</span>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono"
                  style={{ fontSize: '0.72rem', color: 'var(--accent)', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                >
                  Voir sur Google →
                </a>
              </div>
            </motion.div>
        )}

        {/* REMAINING REVIEWS — small grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {rest.map((review, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="card"
              style={{
                padding: '1.4rem',
                display: 'flex', flexDirection: 'column', gap: '0.7rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: '0.82rem', color: 'var(--ivory)', fontWeight: 600 }}>
                  {review.name}
                </span>
                <StarRating rating={review.rating} />
              </div>
              {review.text && (
                <p style={{ fontSize: '0.9rem', color: 'var(--ivory-dim)', lineHeight: 1.65, margin: 0 }}>
                  {review.text}
                </p>
              )}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mono"
                style={{
                  fontSize: '0.72rem', color: 'var(--accent)', textDecoration: 'none',
                  marginTop: 'auto', opacity: 0.7, transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; }}
              >
                Voir sur Google →
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #avis > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
