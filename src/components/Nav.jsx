import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, useSpring } from 'framer-motion';
import { useLenis } from '../context/LenisContext';


const links = [
  { label: 'Maison', href: '#heritage' },
  { label: 'Prestations', href: '#services' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Avis', href: '#avis' },
  { label: 'Réserver', href: '#reserver' },
];

const sectionIds = ['top', 'heritage', 'services', 'galerie', 'avis', 'reserver'];

export default function Nav() {
  const { scrollY, lenis } = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  const progress = useTransform(scrollY, [0, 3000], [0, 1]);
  const smoothProgress = useSpring(progress, { stiffness: 80, damping: 25 });
  const progressPercent = useTransform(smoothProgress, (v) => `${Math.min(v, 1) * 100}%`);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => {
      setScrolled((prev) => {
        const next = v > 60;
        return prev !== next ? next : prev;
      });
    });
    return unsubscribe;
  }, [scrollY]);

  useEffect(() => {
    const observers = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (target) => {
    setMobileOpen(false);
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, height: '2px',
          width: progressPercent, background: 'var(--accent)',
          zIndex: 60, transformOrigin: 'left',
        }}
      />

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '1.5rem',
            padding: scrolled ? '0.6rem 6vw' : '1.2rem 6vw',
            background: scrolled ? 'rgba(20,22,26,0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(242,237,227,0.06)' : '1px solid transparent',
            transition: 'padding 0.4s ease, background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
          }}
      >
        {/* LOGO — hidden text on mobile */}
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); scrollToTop(); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 500, fontSize: '1.1rem', letterSpacing: '0.02em', flexShrink: 0 }}
          className="serif"
        >
          <img src="/images/logo.png" alt="Chafai Coiff" style={{ height: 32, width: 'auto', display: 'block' }} />
          <span className="nav-brand-text">
            Chafai Coif
          </span>
        </a>

        {/* FLOATING ISLAND — frosted glass pill */}
        <div className="nav-island" style={{
          display: 'flex', alignItems: 'center', gap: '0.25rem',
          padding: '0.4rem 0.6rem',
          background: scrolled ? 'rgba(28,31,38,0.85)' : 'rgba(28,31,38,0.4)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(242,237,227,0.08)',
          borderRadius: '100px',
          transition: 'background 0.4s ease',
        }}>
          {links.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="nav-link"
                style={{
                  padding: '0.45rem 1rem', borderRadius: '100px',
                  fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                  background: isActive ? 'var(--accent-glow)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--ivory-dim)',
                  transition: 'background 0.3s, color 0.3s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--accent-glow)';
                    e.currentTarget.style.color = 'var(--ivory)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--ivory-dim)';
                  }
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          aria-label="Menu"
          onClick={() => setMobileOpen(true)}
          className="mobile-toggle"
          style={{ display: 'none', background: 'none', border: 0, color: 'var(--ivory)', fontSize: '1.4rem', padding: '0.25rem' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        {/* MOBILE OVERLAY */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ position: 'fixed', inset: 0, background: 'var(--ink-2)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}
            >
              <button
                aria-label="Fermer"
                onClick={() => setMobileOpen(false)}
                style={{ position: 'absolute', top: '1.6rem', right: '6vw', background: 'none', border: 0, color: 'var(--ivory)', fontSize: '1.4rem' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              {links.map((link, i) => {
                const sectionId = link.href.slice(1);
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="serif"
                    style={{ fontSize: '1.8rem', color: isActive ? 'var(--accent)' : 'var(--ivory)', opacity: isActive ? 1 : 0.8 }}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @media (max-width: 900px) {
            .nav-island { display: none !important; }
            .mobile-toggle { display: flex !important; align-items: center; justify-content: center; padding: 0.5rem !important; }
            .nav-brand-text { font-size: 0.95rem; }
          }
          @media (min-width: 901px) {
            .mobile-toggle { display: none !important; }
          }
        `}</style>
      </motion.nav>
    </>
  );
}
