import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const today = () => new Date().toISOString().split('T')[0];
const phoneRegex = /^\+216\s?\d{2}\s?\d{3}\s?\d{3}$/;

const prestations = [
  'Coupe & coiffage',
  'Coloration & balayage',
  'Barbe & rasage',
  'Soins & rituels',
  'Coiffure mariée & événements',
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nom: '', tel: '', prestation: prestations[0], date: '',
  });
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (data) => {
    const errs = {};
    if (!data.nom.trim()) errs.nom = 'Veuillez entrer votre nom';
    if (!data.tel.trim()) {
      errs.tel = 'Veuillez entrer votre téléphone';
    } else if (!phoneRegex.test(data.tel.trim())) {
      errs.tel = 'Format attendu : +216 XX XXX XXX';
    }
    if (!data.date) errs.date = 'Veuillez choisir une date';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(formData);
    setErrors(errs);
    setTouched({ nom: true, tel: true, date: true });
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      const newData = { ...formData, [field]: val };
      const errs = validate(newData);
      setErrors((prev) => ({ ...prev, [field]: errs[field] || undefined }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: errs[field] || undefined }));
    setFocusedField(null);
  };

  const errorId = (field) => (errors[field] && touched[field] ? `${field}-error` : undefined);

  const inputBorder = (field) =>
    errors[field] && touched[field]
      ? 'var(--accent)'
      : focusedField === field
        ? 'var(--accent)'
        : 'var(--line)';

  return (
    <section id="reserver" style={{ background: 'var(--ink-2)', padding: '7rem 0', position: 'relative' }}>
      <div className="wrap">
        <div className="book-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
          alignItems: 'stretch',
        }}>
          {/* LEFT: INFO — with background image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative', overflow: 'hidden',
              padding: '2.8rem', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', minHeight: '500px',
              border: '1px solid var(--line)', borderRight: 'none',
              borderRadius: '4px 0 0 4px',
            }}
          >
            {/* Background image */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 0,
              background: 'url(/images/outside.png) center/cover no-repeat',
              filter: 'saturate(0.5) brightness(0.5)',
            }} />
            {/* Dark overlay */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: 'linear-gradient(135deg, rgba(20,22,26,0.85) 0%, rgba(20,22,26,0.6) 100%)',
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <span className="tag">Réserver</span>
              <h2 className="display" style={{ color: 'var(--ivory)' }}>
                Un rendez-vous, <em>sans attendre</em>
              </h2>
              <p className="lede" style={{ color: 'var(--ivory-dim)' }}>
                Appelez-nous ou passez au salon — nous sommes ouverts 7j/7 de 9h à 22h.
              </p>

              <div style={{ marginTop: '2rem' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '0.7rem 0', borderBottom: '1px solid var(--line)',
                  fontSize: '0.92rem', color: 'var(--ivory)',
                }}>
                  <span>Lundi — Dimanche</span>
                  <span className="mono" style={{ color: 'var(--ivory-dim)', fontSize: '0.85rem' }}>
                    09:00 – 22:00
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <a
                  href="tel:+21621433555"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    fontSize: '1.05rem', marginBottom: '1rem',
                    color: 'var(--ivory)', transition: 'color 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ivory)'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  +216 21 433 555
                </a>
                <br />
                <a
                  href="https://wa.me/21621433555"
                  target="_blank" rel="noopener"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    fontSize: '0.95rem', marginBottom: '0.9rem',
                    color: 'var(--ivory-dim)', transition: 'color 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ivory)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ivory-dim)'; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <br />
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  fontSize: '0.95rem', color: 'var(--ivory-dim)',
                }}>
                  → 2 Rue Taher Sfar, Nabeul
                </span>
              </div>

              <a
                href="https://maps.google.com/?cid=6468433324922218836"
                target="_blank" rel="noopener"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  marginTop: '1.5rem', padding: '0.7rem 1.2rem',
                  border: '1px solid var(--line)', borderRadius: '3px',
                  fontSize: '0.82rem', color: 'var(--ivory-dim)',
                  textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--ivory)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.color = 'var(--ivory-dim)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Ouvrir dans Google Maps
              </a>
            </div>
          </motion.div>

          {/* DECORATIVE VERTICAL LINE WITH DIAMOND */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 0, position: 'relative', zIndex: 3,
          }}>
            <div style={{
              width: '1px', height: '60%', background: 'var(--line-strong)',
              position: 'absolute',
            }} />
            <div style={{
              width: 10, height: 10, background: 'var(--brass)',
              transform: 'rotate(45deg)', position: 'absolute',
              opacity: 0.5,
            }} />
          </div>

          {/* RIGHT: FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'var(--ink)',
              border: '1px solid var(--line)',
              padding: '2.8rem', borderRadius: '0 4px 4px 0',
              position: 'relative', minHeight: '500px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {['nom', 'tel', 'prestation', 'date'].map((field) => (
                    <div key={field} style={{ marginBottom: '1.3rem' }}>
                      <label
                        htmlFor={field}
                        style={{
                          display: 'block', fontSize: '0.72rem',
                          textTransform: field === 'prestation' || field === 'date' ? 'uppercase' : 'none',
                          letterSpacing: field === 'prestation' || field === 'date' ? '0.1em' : '0',
                          color: errors[field] && touched[field] ? 'var(--accent)' : focusedField === field ? 'var(--accent)' : 'var(--brass)',
                          marginBottom: '0.5rem', transition: 'color 0.3s',
                        }}
                      >
                        {field === 'nom' ? 'Nom *' : field === 'tel' ? 'Téléphone *' : field === 'prestation' ? 'Prestation' : 'Date souhaitée'}
                      </label>
                      {field === 'prestation' ? (
                        <select
                          id={field}
                          value={formData[field]}
                          onChange={handleChange(field)}
                          onFocus={() => setFocusedField(field)}
                          onBlur={() => setFocusedField(null)}
                          style={{
                            width: '100%', background: 'transparent', border: 0,
                            borderBottom: `1px solid ${inputBorder(field)}`,
                            color: 'var(--ivory)', fontFamily: "'Manrope', sans-serif",
                            fontSize: '0.98rem', padding: '0.6rem 0',
                            outline: 'none', transition: 'border-color 0.3s', cursor: 'pointer',
                          }}
                        >
                          {prestations.map((p) => (
                            <option key={p} style={{ background: 'var(--ink)' }}>{p}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field}
                          type={field === 'date' ? 'date' : field === 'tel' ? 'tel' : 'text'}
                          value={formData[field]}
                          onChange={handleChange(field)}
                          onFocus={() => setFocusedField(field)}
                          onBlur={handleBlur(field)}
                          placeholder={field === 'nom' ? 'Votre nom' : field === 'tel' ? '+216 XX XXX XXX' : ''}
                          min={field === 'date' ? today() : undefined}
                          required
                          aria-required={field !== 'prestation' ? 'true' : undefined}
                          aria-invalid={errors[field] && touched[field] ? 'true' : undefined}
                          aria-describedby={errorId(field)}
                          autoComplete={field === 'nom' ? 'name' : field === 'tel' ? 'tel' : undefined}
                          style={{
                            width: '100%', background: 'transparent', border: 0,
                            borderBottom: `1px solid ${inputBorder(field)}`,
                            color: 'var(--ivory)', fontFamily: "'Manrope', sans-serif",
                            fontSize: '0.98rem', padding: '0.6rem 0',
                            outline: 'none', transition: 'border-color 0.3s',
                          }}
                        />
                      )}
                      {errors[field] && touched[field] && (
                        <span className="error-text" id={`${field}-error`} role="alert">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          {errors[field]}
                        </span>
                      )}
                    </div>
                  ))}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="btn-primary"
                    style={{
                      marginTop: '0.6rem', width: '100%', background: 'var(--accent)',
                      color: 'var(--ink)', border: 0, padding: '1rem',
                      fontSize: '0.85rem', textTransform: 'uppercase',
                      letterSpacing: '0.1em', fontWeight: 600, borderRadius: '2px',
                      cursor: 'pointer', position: 'relative', overflow: 'hidden',
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>Prendre rendez-vous</span>
                  </motion.button>
                  <p style={{
                    marginTop: '1rem', fontSize: '0.78rem',
                    color: 'var(--ivory-dim)', textAlign: 'center',
                  }}>
                    Ou appelez-nous directement au <strong style={{ color: 'var(--ivory)' }}>+216 21 433 555</strong>
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', textAlign: 'center', minHeight: '360px',
                  }}
                >
                  <motion.svg width="80" height="80" viewBox="0 0 80 80"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    aria-hidden="true"
                  >
                    <motion.circle cx="40" cy="40" r="36" fill="none" stroke="var(--accent)" strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <motion.path d="M26 40l10 10 18-20" fill="none" stroke="var(--ivory)" strokeWidth="3"
                      strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    />
                  </motion.svg>
                  <motion.h3 className="serif"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ marginTop: '1.5rem', fontSize: '1.3rem', color: 'var(--ivory)' }}
                  >
                    Merci, {formData.nom} !
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{ color: 'var(--ivory-dim)', fontSize: '0.92rem', marginTop: '0.5rem', maxWidth: '28ch' }}
                  >
                    Votre demande a bien été reçue. Nous vous contacterons au {formData.tel} pour confirmer votre rendez-vous.
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ nom: '', tel: '', prestation: prestations[0], date: '' });
                      setErrors({});
                      setTouched({});
                    }}
                    style={{
                      marginTop: '1.5rem', background: 'none',
                      border: '1px solid var(--brass)', color: 'var(--ivory-dim)',
                      padding: '0.5rem 1.2rem', fontSize: '0.78rem',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      borderRadius: '2px', transition: 'background 0.25s, color 0.25s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--accent)';
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.color = 'var(--ink)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'var(--brass)';
                      e.currentTarget.style.color = 'var(--ivory-dim)';
                    }}
                  >
                    Nouvelle demande
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .book-grid { grid-template-columns: 1fr !important; }
          .book-grid > div:first-child { border-right: 1px solid var(--line) !important; border-radius: 4px !important; }
          .book-grid > div:last-child { border-radius: 4px !important; }
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.7); cursor: pointer;
        }
        .book-grid input:focus, .book-grid select:focus {
          box-shadow: 0 1px 0 var(--accent);
        }
        .book-grid select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2396886A' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0 center;
          padding-right: 1.5rem !important;
        }
      `}</style>
    </section>
  );
}
