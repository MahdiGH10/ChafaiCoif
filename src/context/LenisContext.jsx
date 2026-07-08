import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useMotionValue, useReducedMotion } from 'framer-motion';

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const prefersReduced = useReducedMotion();
  const scrollY = useMotionValue(0);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', (e) => {
      scrollY.set(e.animatedScroll);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  return (
    <LenisContext.Provider value={{ scrollY, lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error('useLenis must be used within LenisProvider');
  return ctx;
}
