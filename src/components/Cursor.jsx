import { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('custom-cursor-active');
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      if (e.target.closest('a, button, .nav-link, .btn-primary, [role="button"]')) {
        setHovering(true);
      }
    };
    const out = () => setHovering(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${hovering ? 'is-hovering' : ''}`}
      style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9999,
        left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)',
        width: hovering ? '32px' : '8px', height: hovering ? '32px' : '8px',
        borderRadius: '50%',
        background: 'var(--accent)',
        opacity: hovering ? 0.15 : 0.5,
        mixBlendMode: hovering ? 'screen' : 'normal',
        transition: 'width 0.25s ease, height 0.25s ease, opacity 0.25s ease',
      }}
    />
  );
}
