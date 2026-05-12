import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GLOBAL_CITIES } from './globalData';

const dark = {
  bg: '#0A0A0F', bg2: '#12121A', bg3: '#1C1C28',
  border: 'rgba(255,255,255,0.07)', border2: 'rgba(255,255,255,0.13)',
  gold: '#D4A843', text: '#F0EEE8', text2: '#9A9890', text3: '#5A5855',
};

export default function ExploreCitiesIndex() {
  return (
    <>
      <Helmet>
        <title>Global Expat City Guides 2025 — MovAbroad | Italy Relocation Calculator</title>
        <meta name="description" content="Detailed expat guides for 12 global cities — Lisbon, Berlin, Bali, Tokyo, Tbilisi, Dubai, Barcelona and more. Cost of living, visa options and honest reviews." />
        <meta name="keywords" content="global expat city guides 2025, best cities for digital nomads, expat city comparison, where to move abroad 2025" />
        <link rel="canonical" href="https://italy-relocation-calculator.netlify.app/explore/cities" />
        <meta property="og:title" content="Global Expat City Guides 2025 — MovAbroad" />
        <meta property="og:description" content="Detailed expat guides for 12 global cities. Cost of living, visa options and honest reviews." />
      </Helmet>

      <div style={{ minHeight: '100vh', background: dark.bg, paddingTop: '62px' }}>
        {/* Nav */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(1.25rem,5vw,4rem)', height: '62px', background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${dark.border}` }}>
          <Link to="/explore" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.3rem', letterSpacing: '0.05em', color: dark.text, textDecoration: 'none' }}>
            Mov<span style={{ color: dark.gold }}>Abroad</span>
          </Link>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/" style={{ fontSize: '0.75rem', color: dark.text3, textDecoration: 'none', padding: '7px 14px', border: `1px solid ${dark.border}`, borderRadius: '100px' }}>🇮🇹 Italy</Link>
            <Link to="/explore/quiz" style={{ fontSize: '0.75rem', color: '#0A0A0F', background: dark.gold, textDecoration: 'none', padding: '7px 16px', borderRadius: '100px', fontWeight: 600 }}>Find My City →</Link>
          </div>
        </nav>

        {/* Hero */}
        <header style={{ padding: '80px clamp(1.25rem,5vw,4rem) 50px', borderBottom: `1px solid ${dark.border}` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: dark.text3, marginBottom: '1.5rem' }} aria-label="Breadcrumb">
              <Link to="/explore" style={{ color: dark.text3, textDecoration: 'none' }}>MovAbroad</Link>
              <span>›</span>
              <span>City Guides</span>
            </nav>
            <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: dark.gold, marginBottom: '0.75rem' }}>
              12 Cities · Updated 2025
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: dark.text, marginBottom: '0.75rem' }}>
              EVERY BUDGET.<br /><span style={{ color: dark.gold }}>EVERY LIFESTYLE.</span>
            </h1>
            <p style={{ fontSize: '1rem', color: dark.text2, maxWidth: '520px', lineHeight: 1.75, fontWeight: 300, marginBottom: '2rem' }}>
              From $972/month Tbilisi to tax-free Dubai. Click any city for the full expat guide.
            </p>
            <Link to="/explore/quiz"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: dark.gold, color: '#0A0A0F', padding: '13px 28px', borderRadius: '100px', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
              Take the Quiz to Find Your Match →
            </Link>
          </div>
        </header>

        {/* Grid */}
        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem clamp(1.25rem,5vw,4rem) 5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
            {GLOBAL_CITIES.map(city => (
              <Link key={city.id} to={`/explore/cities/${city.id}`}
                style={{ background: dark.bg2, border: `1px solid ${dark.border}`, borderRadius: '16px', padding: '1.25rem 1.4rem', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = dark.gold; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = dark.border; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '8px' }}>{city.flag}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', letterSpacing: '0.03em', marginBottom: '2px', color: dark.text }}>{city.name}</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: dark.text3, marginBottom: '8px' }}>{city.country}</div>
                <div style={{ fontSize: '0.8rem', color: dark.text2, lineHeight: 1.5, marginBottom: '10px' }}>{city.tagline}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: dark.gold }}>~${city.cost.toLocaleString()}/month</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                  {(city.tags || []).slice(0, 3).map(t => (
                    <span key={t} style={{ fontSize: '0.62rem', padding: '2px 7px', borderRadius: '100px', border: `1px solid ${dark.border2}`, color: dark.text3 }}>{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* Italy CTA */}
          <div style={{ marginTop: '4rem', background: 'rgba(193,68,14,0.1)', border: '1px solid rgba(193,68,14,0.25)', borderRadius: '20px', padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🇮🇹</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.75rem', letterSpacing: '0.03em', color: dark.text, marginBottom: '0.5rem' }}>
                Thinking About Italy?
              </h3>
              <p style={{ fontSize: '0.88rem', color: dark.text2, maxWidth: '480px', lineHeight: 1.65 }}>
                Our Italy Relocation Calculator has 12 dedicated Italian city guides — Rome, Milan, Florence, Bologna, Naples, Turin, Venice, Palermo, Bari, Catania, Genova and Trieste.
              </p>
            </div>
            <Link to="/cities" style={{ padding: '14px 32px', borderRadius: '100px', background: '#C1440E', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Italy City Guides →
            </Link>
          </div>
        </main>

        <footer style={{ borderTop: `1px solid ${dark.border}`, padding: '2rem clamp(1.25rem,5vw,4rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link to="/explore" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.1rem', color: dark.text2, textDecoration: 'none' }}>Mov<span style={{ color: dark.gold }}>Abroad</span></Link>
          <p style={{ fontSize: '0.74rem', color: dark.text3 }}>Data: Numbeo, Mercer, HSBC Expat · 2025</p>
          <p style={{ fontSize: '0.74rem', color: dark.text3 }}>© 2025 · For informational purposes only</p>
        </footer>
      </div>
    </>
  );
}
