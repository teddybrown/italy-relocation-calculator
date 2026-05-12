import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GLOBAL_CITIES } from './globalData';

const S = {
  page: { minHeight: '100vh', background: '#0A0A0F', paddingTop: '62px' },
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(1.25rem,5vw,4rem)', height: '62px', background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.07)' },
  navLogo: { fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.3rem', letterSpacing: '0.05em', color: '#F0EEE8', textDecoration: 'none' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '10px' },
  navPill: { fontSize: '0.78rem', fontWeight: 500, padding: '7px 16px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.13)', color: '#9A9890', background: 'transparent', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' },
  navPillPrimary: { fontSize: '0.78rem', fontWeight: 500, padding: '7px 16px', borderRadius: '100px', border: 'none', background: '#D4A843', color: '#0A0A0F', textDecoration: 'none', whiteSpace: 'nowrap', fontFamily: "'DM Sans', sans-serif" },
};

export default function ExploreHome() {
  return (
    <>
      <Helmet>
        <title>Explore Global Cities — MovAbroad | Italy Relocation Calculator</title>
        <meta name="description" content="Not sure about Italy? Explore 12 of the world's best expat cities — Lisbon, Berlin, Bali, Tokyo, Tbilisi and more. Take the quiz to find your perfect city." />
        <link rel="canonical" href="https://italy-relocation-calculator.netlify.app/explore" />
        <meta property="og:title" content="Explore Global Cities — MovAbroad" />
        <meta property="og:description" content="Find your perfect city abroad. 12 top expat destinations ranked by your priorities." />
      </Helmet>

      <div style={S.page}>
        {/* Dark nav for MovAbroad */}
        <nav style={S.nav} aria-label="Main navigation">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" style={{ ...S.navPill, fontSize: '0.75rem' }}>🇮🇹 Italy Calculator</Link>
            <span style={{ color: '#D4A843', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.3rem', letterSpacing: '0.05em' }}>
              Mov<span style={{ color: '#F0EEE8' }}>Abroad</span>
            </span>
          </div>
          <div style={S.navLinks}>
            <Link to="/explore/cities" style={S.navPill}>All Cities</Link>
            <Link to="/explore/quiz" style={S.navPillPrimary}>Find My City →</Link>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px clamp(1.25rem,6vw,5rem) 60px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(212,168,67,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Italy crosslink banner */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(193,68,14,0.12)', border: '1px solid rgba(193,68,14,0.25)', borderRadius: '100px', padding: '8px 20px', marginBottom: '2rem', fontSize: '0.78rem', color: '#E8806A' }}>
            <span>🇮🇹</span>
            <span>Looking specifically at Italy?</span>
            <Link to="/" style={{ color: '#E8806A', fontWeight: 600, textDecoration: 'underline' }}>Use our Italy Calculator →</Link>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4A843', marginBottom: '1.75rem' }}>
            <span style={{ display: 'block', width: '28px', height: '1px', background: '#D4A843', opacity: 0.5 }} />
            Global Expat City Matcher · 2025
            <span style={{ display: 'block', width: '28px', height: '1px', background: '#D4A843', opacity: 0.5 }} />
          </div>

          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3.5rem,10vw,8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: '#F0EEE8', marginBottom: '0.2em' }}>
            WHERE DO<br />YOU <span style={{ color: '#D4A843' }}>BELONG?</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', fontWeight: 300, color: '#9A9890', maxWidth: '520px', margin: '1rem auto 2.5rem', lineHeight: 1.75 }}>
            Answer 6 questions about your budget, lifestyle, and priorities. Get a personalised ranking of the world's best expat cities.
          </p>

          <Link to="/explore/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#D4A843', color: '#0A0A0F', padding: '16px 40px', borderRadius: '100px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', boxShadow: '0 0 40px rgba(212,168,67,0.3)', transition: 'all 0.25s' }}>
            Start Matching →
          </Link>

          {/* City flags */}
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {GLOBAL_CITIES.slice(0, 8).map(c => (
              <div key={c.id} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{c.flag}</div>
                <div style={{ fontSize: '0.75rem', color: '#5A5855', letterSpacing: '0.06em' }}>{c.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* City grid preview */}
        <section style={{ padding: 'clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,4rem)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4A843', marginBottom: '0.75rem' }}>12 Cities</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.05, letterSpacing: '0.02em', color: '#F0EEE8', marginBottom: '0.75rem' }}>
                Every budget. <span style={{ color: '#D4A843' }}>Every lifestyle.</span>
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#9A9890', maxWidth: '480px', fontWeight: 300, lineHeight: 1.75 }}>
                From €900/month Tbilisi to tax-free Dubai. Click any city to read the full guide.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
              {GLOBAL_CITIES.map(c => (
                <Link key={c.id} to={`/explore/cities/${c.id}`}
                  style={{ background: '#1C1C28', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.25rem 1.4rem', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A843'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{c.flag}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.15rem', letterSpacing: '0.03em', marginBottom: '3px', color: '#F0EEE8' }}>{c.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#5A5855', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.country}</div>
                  <div style={{ fontSize: '0.78rem', color: '#9A9890', lineHeight: 1.5, marginBottom: '8px' }}>{c.tagline}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#D4A843' }}>~${c.cost.toLocaleString()}/mo</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Italy CTA banner */}
        <section style={{ padding: '0 clamp(1.25rem,5vw,4rem) clamp(4rem,8vw,7rem)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ background: 'rgba(193,68,14,0.1)', border: '1px solid rgba(193,68,14,0.25)', borderRadius: '20px', padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🇮🇹</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.75rem', letterSpacing: '0.03em', color: '#F0EEE8', marginBottom: '0.5rem' }}>
                  Thinking About Italy Specifically?
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#9A9890', maxWidth: '480px', lineHeight: 1.65 }}>
                  Our Italy Relocation Calculator goes deeper — Italian salary after tax, visa routes, 12 Italian city guides, healthcare and banking guides, all in one tool.
                </p>
              </div>
              <Link to="/" style={{ padding: '14px 32px', borderRadius: '100px', background: '#C1440E', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Italy Calculator →
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '2rem clamp(1.25rem,5vw,4rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link to="/explore" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.1rem', color: '#9A9890', textDecoration: 'none' }}>Mov<span style={{ color: '#D4A843' }}>Abroad</span></Link>
          <p style={{ fontSize: '0.74rem', color: '#5A5855' }}>Data: Numbeo, Mercer, HSBC Expat, Nomad List · 2025</p>
          <p style={{ fontSize: '0.74rem', color: '#5A5855' }}>© 2025 · For informational purposes only</p>
        </footer>
      </div>
    </>
  );
}
