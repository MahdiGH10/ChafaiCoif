export default function LogoMark({ size = 32, color = 'var(--ivory)', accent = 'var(--accent)' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* LEFT RING */}
      <circle cx="10" cy="23" r="4.5" stroke={color} strokeWidth="2.5" />
      {/* LEFT BLADE */}
      <path d="M10 18.5 Q14 11 20 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

      {/* RIGHT RING */}
      <circle cx="22" cy="23" r="4.5" stroke={color} strokeWidth="2.5" />
      {/* RIGHT BLADE */}
      <path d="M22 18.5 Q18 11 12 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

      {/* PIVOT — ceramic-inspired diamond */}
      <path d="M16 13 L18.5 15.5 L16 18 L13.5 15.5 Z" fill={accent} stroke="none" />
    </svg>
  );
}
