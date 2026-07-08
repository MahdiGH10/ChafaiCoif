import { useRef } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useLenis } from '../context/LenisContext';

const headlineLines = [
  { text: "L'art du", italic: false },
  { text: 'geste, à', italic: false },
  { text: 'Nabeul', italic: true },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const lineVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7 },
  },
};

const stars = [1, 2, 3, 4, 5];

export default function Hero() {
  const { scrollY, lenis } = useLenis();
  const heroRef = useRef(null);

  const parallaxY = useTransform(scrollY, [0, 600], [0, -80]);
  const smoothParallax = useSpring(parallaxY, { stiffness: 100, damping: 30 });

  const scrollTo = (target) => {
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      ref={heroRef}
      id="top"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}
    >
      {/* GRAIN OVERLAY */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          opacity: 0.25, mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '256px 256px',
        }}
      />

      {/* MOBILE BG — logo reveal video */}
      <div className="hero-mobile-bg" style={{
        position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden',
      }}>
        <video
          src="/videos/logo-reveal.mp4"
          autoPlay muted loop playsInline
          poster="/images/insideview.jpg"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(20,22,26,0.7) 0%, rgba(20,22,26,0.3) 100%)',
        }} />
      </div>

      {/* LEFT CONTENT */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '12vw 5vw 6vw 6vw', position: 'relative', zIndex: 4,
      }}>
        <motion.span
          className="mono"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--brass)', display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.2rem' }}
        >
          <span style={{ width: 26, height: 1, background: 'var(--brass)', display: 'inline-block' }} />
          2 Rue Taher Sfar, Nabeul
        </motion.span>

        <motion.h1
          className="serif"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ fontWeight: 500, fontSize: 'clamp(3.2rem, 7vw, 6.2rem)', lineHeight: 1.0, letterSpacing: '-0.02em', maxWidth: '12ch' }}
        >
          {headlineLines.map((line, i) => (
            <span key={i} style={{ display: 'block', overflow: 'hidden', marginBottom: '0.05em' }}>
              <motion.span
                variants={lineVariants}
                style={{ display: 'inline-block', fontStyle: line.italic ? 'italic' : 'normal', color: line.italic ? 'var(--accent)' : 'inherit' }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '1.4rem', maxWidth: '40ch', color: 'var(--ivory-dim)', fontSize: '1.05rem', lineHeight: 1.65 }}
        >
          Le salon de coiffure et barberie le mieux noté de Nabeul — coupe, couleur,
          soin et coiffure mariée. Un geste sûr, transmis, perfectionné.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => scrollTo('#reserver')}
            className="btn-primary"
            style={{
              background: 'var(--accent)', color: 'var(--ink)',
              padding: '1rem 2.2rem', fontSize: '0.85rem',
              textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600,
              border: 0, borderRadius: '3px', position: 'relative', overflow: 'hidden',
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Prendre rendez-vous</span>
          </button>
          <a
            href="tel:+21621433555"
            className="mono"
            style={{
              fontSize: '0.85rem', letterSpacing: '0.06em',
              color: 'var(--ivory)', fontWeight: 500,
              padding: '1rem 1.6rem',
              border: '1px solid var(--line-strong)', borderRadius: '3px',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              transition: 'border-color 0.25s, background 0.25s, color 0.25s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.color = 'var(--ivory)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Appeler
          </a>
        </motion.div>

        {/* SCROLL CUE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ position: 'absolute', bottom: '2.5rem', left: '6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', color: 'var(--ivory-dimmer)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          <span>Défiler</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{ display: 'block' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.span>
        </motion.div>
      </div>

      {/* RIGHT — FULL-BLEED EDITORIAL PHOTO WITH OVERLAYS */}
      <div className="hero-right" style={{
        position: 'relative', display: 'flex', alignItems: 'flex-end',
        borderInlineStart: '1px solid var(--line)', overflow: 'hidden',
      }}>
        {/* Editorial photo (not logo) */}
        <motion.div
          style={{ y: smoothParallax, position: 'absolute', inset: 0, zIndex: 1 }}
        >
          <img
            src="/images/insideview.jpg"
            alt="Intérieur du salon Chafai Coiff"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(90deg, rgba(20,22,26,0.7) 0%, rgba(20,22,26,0.15) 40%, rgba(20,22,26,0.4) 100%)',
        }} />

        {/* VERTICAL LABEL — far right edge */}
        <div style={{
          position: 'absolute', right: '1.5rem', top: 0, bottom: 0, zIndex: 5,
          display: 'flex', alignItems: 'center', pointerEvents: 'none',
        }}>
          <span className="mono" style={{
            writingMode: 'vertical-rl', textOrientation: 'mixed',
            fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--ivory-dimmer)',
            transform: 'rotate(180deg)', opacity: 0.5,
          }}>
            EST. NABEUL 2004
          </span>
        </div>

        {/* RATING BADGE — overlaid on image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', bottom: '2rem', right: '1.5rem', zIndex: 5,
            display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
            padding: '0.6rem 1rem',
            border: '1px solid rgba(242,237,227,0.12)',
            borderRadius: '8px',
            background: 'rgba(20,22,26,0.8)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            width: 'fit-content',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ display: 'flex', gap: '3px' }}>
            {stars.map((s) => (
              <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1" aria-hidden="true">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--ivory)', fontWeight: 600 }}>4.9</span>
            <span style={{ fontSize: '0.68rem', color: 'var(--ivory-dim)' }}>148 avis Google</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          header#top { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
          .hero-mobile-bg { display: block !important; }
          header#top > div:first-child { padding: 16vw 6vw 6vw !important; }
        }
        @media (min-width: 901px) {
          .hero-mobile-bg { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          header#top div[style*="backgroundImage"] { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}
