import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function BeforeAfter() {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const pos = useMotionValue(50);
  const smoothPos = useSpring(pos, { stiffness: 150, damping: 20 });

  const clipPath = useTransform(smoothPos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleX = useTransform(smoothPos, (v) => `${v}%`);

  const updatePos = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      pos.set(Math.max(2, Math.min(98, x)));
    },
    [pos]
  );

  const handlePointerDown = useCallback(
    (e) => {
      isDragging.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      updatePos(e.clientX);
    },
    [updatePos]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      updatePos(e.clientX);
    },
    [updatePos]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        overflow: 'hidden',
        borderRadius: '4px',
        border: '1px solid var(--line)',
        userSelect: 'none',
        cursor: 'ew-resize',
        background: 'var(--ink)',
      }}
    >
      {/* AFTER (bottom layer) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#22262c',
        }}
      >
        <img
          src="/images/after.jpg"
          alt="Après"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <span
          className="mono"
          style={{
            position: 'absolute',
            right: '1.4rem',
            bottom: '1.4rem',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
            background: 'rgba(0,0,0,0.4)',
            padding: '0.25rem 0.7rem',
            borderRadius: '2px',
            backdropFilter: 'blur(4px)',
          }}
        >
          Après
        </span>
      </div>

      {/* BEFORE (top layer, clipped) */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath,
        }}
      >
        <img
          src="/images/before.jpg"
          alt="Avant"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <span
          className="mono"
          style={{
            position: 'absolute',
            left: '1.4rem',
            bottom: '1.4rem',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
            background: 'rgba(0,0,0,0.4)',
            padding: '0.25rem 0.7rem',
            borderRadius: '2px',
            backdropFilter: 'blur(4px)',
          }}
        >
          Avant
        </span>
      </motion.div>

      {/* HANDLE */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: handleX,
          width: '2px',
          height: '100%',
          background: 'rgba(255,255,255,0.9)',
          x: '-50%',
          zIndex: 5,
          boxShadow: '0 0 8px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
            color: 'var(--ink)',
            fontSize: '0.8rem',
            pointerEvents: 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M8 3L3 8l5 5M16 3l5 5-5 5" />
            <path d="M3 8h18M3 16h18" strokeWidth="1.5" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
