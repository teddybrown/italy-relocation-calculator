import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GLOBAL_CITIES } from './globalData';

const dark = {
  bg: '#0A0A0F', bg2: '#12121A', bg3: '#1C1C28',
  border: 'rgba(255,255,255,0.07)', border2: 'rgba(255,255,255,0.13)',
  gold: '#D4A843', goldDim: 'rgba(212,168,67,0.13)',
  text: '#F0EEE8', text2: '#9A9890', text3: '#5A5855',
  green: '#4CAF7D', greenDim: 'rgba(76,175,125,0.1)',
  red: '#E07060', redDim: 'rgba(224,112,96,0.1)',
  blue: '#5B9BD5', blueDim: 'rgba(91,155,213,0.1)',
};

const COL_ICONS = { rent:'🏠', groceries:'🛒', dining:'🍽', transport:'🚇', cowork:'💻', utilities:'💡', leisure:'🎭', health:'🏥' };
const fmt = n => new Intl.NumberFormat('en-US').format(Math.round(n));

export default function ExploreCityGuide() {
  const { cityId } = useParams();
  const city = GLOBAL_CITIES.find(c => c.id === cityId);

  if (!city) {
    return (
      <div style={{ background: dark.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: dark.text }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', marginBottom: '1rem' }}>City not found</h2>
          <Link to="/explore/cities" style={{ color: dark.gold }}>← Back to all cities</Link>
        </div>
      </div>
    );
  }

  const colTotal = Object.values(city.col).reduce((a, b) => a + b, 0);
  const related = GLOBAL_CITIES.filter(c => c.id !== city.id).slice(0, 3);

  const SCORE_DATA = [
    { label: 'Safety',      val: city.safety,     color: dark.blue },
    { label: 'Healthcare',  val: city.healthcare,  color: dark.gold },
    { label: 'Internet',    val: city.internet,    color: '#9B8BD4' },
    { label: 'Expat Scene', val: city.expat,       color: '#E09040' },
    { label: 'Nightlife',   val: city.nightlife,   color: '#CF8C7A' },
    { label: 'Nature',      val: city.nature,      color: dark.green },
    { label: 'Warmth',      val: city.warmth,      color: dark.red },
  ];

  return (
    <>
      <Helmet>
        <title>{`Living in ${city.name}, ${city.country} — Expat Guide 2025 | MovAbroad`}</title>
        <meta name="description" content={`${city.tagline}. Complete expat guide for ${city.name}: cost of living, visa options, best neighbourhoods and practical tips for 2025.`} />
        <meta name="keywords" content={`living in ${city.name} expat 2025, ${city.name} cost of living, moving to ${city.name}, ${city.name} digital nomad`} />
        <link rel="canonical" href={`https://italy-relocation-calculator.netlify.app/explore/cities/${city.id}`} />
        <meta property="og:title" content={`Living in ${city.name} — Expat Guide 2025`} />
        <meta property="og:description" content={`${city.tagline}. Cost of living, visa, neighbourhoods.`} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          'headline': `Living in ${city.name}, ${city.country}: Expat Guide 2025`,
          'author': { '@type': 'Organization', 'name': 'MovAbroad' },
          'datePublished': '2025-03-01',
          'dateModified': '2025-04-17',
          'mainEntityOfPage': `https://italy-relocation-calculator.netlify.app/explore/cities/${city.id}`,
        })}</script>
      </Helmet>

      <div style={{ minHeight: '100vh', background: dark.bg, paddingTop: '62px' }}>
        {/* Nav */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(1.25rem,5vw,4rem)', height: '62px', background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${dark.border}` }}>
          <Link to="/explore" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.3rem', letterSpacing: '0.05em', color: dark.text, textDecoration: 'none' }}>
            Mov<span style={{ color: dark.gold }}>Abroad</span>
          </Link>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/explore/cities" style={{ fontSize: '0.75rem', color: dark.text3, textDecoration: 'none', padding: '7px 14px', border: `1px solid ${dark.border}`, borderRadius: '100px' }}>← All Cities</Link>
            <Link to="/" style={{ fontSize: '0.75rem', color: dark.text3, textDecoration: 'none', padding: '7px 14px', border: `1px solid ${dark.border}`, borderRadius: '100px' }}>🇮🇹 Italy</Link>
            <Link to="/explore/quiz" style={{ fontSize: '0.75rem', color: '#0A0A0F', background: dark.gold, textDecoration: 'none', padding: '7px 16px', borderRadius: '100px', fontWeight: 600 }}>Quiz →</Link>
          </div>
        </nav>

        {/* Hero */}
        <header style={{ background: dark.bg2, borderBottom: `1px solid ${dark.border}`, padding: '80px clamp(1.25rem,5vw,4rem) 50px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: 'linear-gradient(135deg, transparent, rgba(212,168,67,0.04))', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: dark.text3, marginBottom: '1.5rem' }} aria-label="Breadcrumb">
              <Link to="/explore" style={{ color: dark.text3, textDecoration: 'none' }}>MovAbroad</Link>
              <span>›</span>
              <Link to="/explore/cities" style={{ color: dark.text3, textDecoration: 'none' }}>City Guides</Link>
              <span>›</span>
              <span style={{ color: dark.text2 }}>{city.name}</span>
            </nav>

            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{city.flag}</div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: dark.text, marginBottom: '0.5rem' }}>
              {city.name}, <span style={{ color: dark.gold }}>{city.country}</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: dark.text2, fontWeight: 300, marginBottom: '2rem', maxWidth: '600px' }}>{city.tagline}</p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, auto))', gap: '2rem', paddingTop: '2rem', borderTop: `1px solid ${dark.border}` }}>
              {[
                { val: city.stats.rent, lbl: 'Monthly Rent' },
                { val: city.stats.meal, lbl: 'Meal Out' },
                { val: `~$${city.cost.toLocaleString()}/mo`, lbl: 'Budget (Single)' },
                { val: city.stats.avg_temp, lbl: 'Climate' },
              ].map(({ val, lbl }) => (
                <div key={lbl}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', lineHeight: 1, color: dark.text, marginBottom: '4px' }}>{val}</div>
                  <div style={{ fontSize: '0.72rem', color: dark.text3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem clamp(1.25rem,5vw,4rem) 5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem', alignItems: 'start' }} className="explore-guide-grid">

            {/* Article */}
            <article>
              {/* Visa */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '0.02em', color: dark.text, marginBottom: '0.875rem', lineHeight: 1.05 }}>
                  Visa & <span style={{ color: dark.gold }}>Legal Path</span>
                </h2>
                <div style={{ background: dark.blueDim, border: `1px solid rgba(91,155,213,0.2)`, borderRadius: '12px', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark.blue, marginBottom: '0.6rem' }}>🛂 Visa Options</h4>
                  <p style={{ fontSize: '0.875rem', color: dark.text2, lineHeight: 1.7, margin: 0 }}>{city.visa}</p>
                </div>
              </div>

              {/* Cost breakdown */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '0.02em', color: dark.text, marginBottom: '0.875rem', lineHeight: 1.05 }}>
                  Monthly <span style={{ color: dark.gold }}>Cost Breakdown</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                  {Object.entries(city.col).map(([k, v]) => (
                    <div key={k} style={{ background: dark.bg2, border: `1px solid ${dark.border}`, borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.82rem', color: dark.text2 }}>{COL_ICONS[k] || '•'} {k.charAt(0).toUpperCase() + k.slice(1)}</span>
                      <span style={{ fontSize: '0.92rem', fontWeight: 600, color: dark.text }}>${fmt(v)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: dark.goldDim, border: '1px solid rgba(212,168,67,0.25)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: dark.text2 }}>Estimated monthly total</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: dark.gold }}>${fmt(colTotal)}</span>
                </div>
              </div>

              {/* Neighbourhoods */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '0.02em', color: dark.text, marginBottom: '0.875rem', lineHeight: 1.05 }}>
                  Neighbourhoods & <span style={{ color: dark.gold }}>Where to Live</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {city.neighborhoods?.map((n, i) => {
                    const parts = n.split(' — ');
                    return (
                      <div key={i} style={{ background: dark.bg2, border: `1px solid ${dark.border}`, borderRadius: '11px', padding: '0.875rem 1.1rem', display: 'flex', gap: '12px' }}>
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: dark.gold, flexShrink: 0, marginTop: '6px' }} />
                        <div style={{ fontSize: '0.85rem', color: dark.text2, lineHeight: 1.55 }}>
                          <strong style={{ color: dark.text, fontWeight: 500 }}>{parts[0]}</strong>
                          {parts[1] ? ` — ${parts[1]}` : ''}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pros / Cons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ background: dark.greenDim, border: `1px solid rgba(76,175,125,0.2)`, borderRadius: '12px', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark.green, marginBottom: '0.75rem' }}>✓ Pros</h4>
                  <ul style={{ paddingLeft: '1rem' }}>{city.pros?.map((p, i) => <li key={i} style={{ fontSize: '0.84rem', color: dark.text2, lineHeight: 1.6, marginBottom: '0.3rem' }}>{p}</li>)}</ul>
                </div>
                <div style={{ background: dark.redDim, border: `1px solid rgba(224,112,96,0.2)`, borderRadius: '12px', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark.red, marginBottom: '0.75rem' }}>✗ Cons</h4>
                  <ul style={{ paddingLeft: '1rem' }}>{city.cons?.map((c, i) => <li key={i} style={{ fontSize: '0.84rem', color: dark.text2, lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>)}</ul>
                </div>
              </div>

              {/* Italy CTA */}
              <div style={{ background: 'rgba(193,68,14,0.1)', border: '1px solid rgba(193,68,14,0.25)', borderRadius: '16px', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', letterSpacing: '0.03em', color: dark.text, marginBottom: '4px' }}>🇮🇹 Considering Italy?</h3>
                  <p style={{ fontSize: '0.82rem', color: dark.text2, margin: 0 }}>We have 12 Italian city guides plus salary calculator, visa guide and more.</p>
                </div>
                <Link to="/cities" style={{ padding: '12px 24px', borderRadius: '100px', border: 'none', background: '#C1440E', color: 'white', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  Italy City Guides →
                </Link>
              </div>

              {/* Related */}
              <div style={{ paddingTop: '2rem', borderTop: `1px solid ${dark.border}` }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', letterSpacing: '0.03em', color: dark.text, marginBottom: '1.25rem' }}>Explore More Cities</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
                  {related.map(rc => (
                    <Link key={rc.id} to={`/explore/cities/${rc.id}`}
                      style={{ background: dark.bg2, border: `1px solid ${dark.border}`, borderRadius: '12px', padding: '1rem 1.25rem', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = dark.border2; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = dark.border; e.currentTarget.style.transform = 'none'; }}>
                      <div style={{ fontSize: '1.4rem', marginBottom: '5px' }}>{rc.flag}</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 500, color: dark.text }}>{rc.name}</div>
                      <div style={{ fontSize: '0.74rem', color: dark.text3, marginTop: '2px' }}>~${rc.cost.toLocaleString()}/month</div>
                    </Link>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: '82px' }}>
              {/* Score card */}
              <div style={{ background: dark.bg2, border: `1px solid ${dark.border}`, borderRadius: '16px', padding: '1.5rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark.text3, marginBottom: '1rem' }}>City Scores</div>
                {SCORE_DATA.map(({ label, val, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.78rem', color: dark.text2, width: '90px', flexShrink: 0 }}>{label}</span>
                    <div style={{ flex: 1, height: '6px', background: dark.bg3, borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: '3px', width: `${val}%`, background: color }} />
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 500, color: dark.text2, width: '28px', textAlign: 'right' }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ background: dark.bg2, border: `1px solid ${dark.border}`, borderRadius: '16px', padding: '1.5rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark.text3, marginBottom: '0.875rem' }}>Quick Tags</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {(city.tags || []).map(t => (
                    <span key={t} style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '100px', border: `1px solid ${dark.border2}`, color: dark.text2 }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ background: dark.gold, borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', letterSpacing: '0.03em', marginBottom: '0.5rem', color: '#0A0A0F' }}>Find Your Perfect City</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(10,10,15,0.7)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  Take the quiz and get a personalised ranking based on your budget, lifestyle and priorities.
                </p>
                <Link to="/explore/quiz" style={{ display: 'block', background: '#0A0A0F', color: dark.gold, padding: '11px 24px', borderRadius: '100px', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s' }}>
                  Take the Quiz →
                </Link>
              </div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${dark.border}`, padding: '2rem clamp(1.25rem,5vw,4rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link to="/explore" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.1rem', color: dark.text2, textDecoration: 'none' }}>Mov<span style={{ color: dark.gold }}>Abroad</span></Link>
          <p style={{ fontSize: '0.74rem', color: dark.text3 }}>Data: Numbeo, Mercer, HSBC Expat · 2025</p>
          <p style={{ fontSize: '0.74rem', color: dark.text3 }}>© 2025 · For informational purposes only</p>
        </footer>

        <style>{`
          @media (max-width: 900px) {
            .explore-guide-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </>
  );
}
