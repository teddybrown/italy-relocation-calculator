import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CITY_GUIDES } from '../data/cityData';

const SCORE_COLORS = {
  'Quality of Life': '#C1440E',
  'Expat Scene':     '#1a5c9e',
  'Affordability':   '#2D7D52',
  'Job Market':      '#C8882A',
  'Safety':          '#6B4F3A',
  'Internet':        '#7A5A9A',
};

function Section({ h2, body, callout }) {
  // Render **bold** markdown
  const renderBody = (text) =>
    text.split('\n\n').map((para, i) => {
      if (para.startsWith('**')) {
        const lines = para.split('\n');
        return lines.map((line, j) => {
          if (line.startsWith('**')) {
            const [, title, ...rest] = line.split('**');
            return (
              <p key={`${i}-${j}`} style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--warm-dark)' }}>{title}</strong>
                {rest.join('**')}
              </p>
            );
          }
          return <p key={`${i}-${j}`}>{line}</p>;
        });
      }
      return <p key={i}>{para}</p>;
    });

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 700, color: 'var(--warm-dark)', marginBottom: '0.875rem', lineHeight: 1.2 }}>
        {h2}
      </h2>
      <div style={{ fontSize: '0.92rem', color: 'var(--warm-mid)', lineHeight: 1.8 }}>
        {renderBody(body)}
      </div>
      {callout && (
        <div style={{ background: 'var(--sand)', border: '1px solid var(--sand3)', borderLeft: '3px solid var(--terra)', borderRadius: '0 12px 12px 0', padding: '1rem 1.25rem', margin: '1.25rem 0', fontSize: '0.875rem', color: 'var(--warm-mid)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--terra)' }}>💡 </strong>{callout}
        </div>
      )}
    </div>
  );
}

export default function CityGuide() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const city = CITY_GUIDES[cityId];

  if (!city) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '1rem' }}>City not found</h2>
        <Link to="/cities" style={{ color: 'var(--terra)' }}>← Back to all cities</Link>
      </div>
    );
  }

  const canonicalUrl = `https://italy-relocation-calculator.netlify.app/cities/${cityId}`;

  return (
    <>
      <Helmet>
        <title>{`Living in ${city.name}, Italy — Expat Guide 2025 | Italy Relocation Calculator`}</title>
        <meta name="description" content={`${city.tagline}. Complete expat guide for ${city.name}: cost of living, best neighbourhoods, visa options and practical tips for 2025.`} />
        <meta name="keywords" content={`living in ${city.name} expat 2025, ${city.name} cost of living, moving to ${city.name} Italy, ${city.name} neighbourhoods expat`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`Living in ${city.name}, Italy — Expat Guide 2025`} />
        <meta property="og:description" content={`${city.tagline}. Cost of living, best neighbourhoods, visa options and honest review.`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": `Living in ${city.name}, Italy: Expat Guide 2025`,
          "description": `${city.tagline}. Complete expat guide covering cost of living, neighbourhoods, visa options.`,
          "author": { "@type": "Organization", "name": "Italy Relocation Calculator" },
          "publisher": { "@type": "Organization", "name": "Italy Relocation Calculator", "url": "https://italy-relocation-calculator.netlify.app" },
          "datePublished": "2025-03-01",
          "dateModified": "2025-04-17",
          "mainEntityOfPage": canonicalUrl,
        })}</script>
      </Helmet>

      {/* HERO */}
      <header style={{ background: 'var(--sand)', borderBottom: '1px solid var(--sand3)', padding: '90px clamp(1.25rem, 5vw, 4rem) 50px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: 'var(--warm-muted)', marginBottom: '1.5rem' }}>
            <Link to="/" style={{ color: 'var(--warm-muted)', textDecoration: 'none' }}>Calculator</Link>
            <span>›</span>
            <Link to="/cities" style={{ color: 'var(--warm-muted)', textDecoration: 'none' }}>City Guides</Link>
            <span>›</span>
            <span>{city.name}</span>
          </nav>

          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{city.flag}</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.0, color: 'var(--warm-dark)', marginBottom: '0.5rem' }}>
            Living in <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>{city.name}</em>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--warm-mid)', fontWeight: 300, marginBottom: '2rem', maxWidth: '600px' }}>{city.tagline}</p>

          {/* Hero stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, auto))', gap: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--sand3)' }}>
            {[
              { val: city.stats.rent, lbl: 'Monthly Rent' },
              { val: city.stats.meal, lbl: 'Meal Out' },
              { val: `€${city.budgetSingle}/mo`, lbl: 'Budget (Single)' },
              { val: city.stats.climate, lbl: 'Climate' },
            ].map(({ val, lbl }) => (
              <div key={lbl}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: 'var(--warm-dark)' }}>{val}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--warm-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem clamp(1.25rem, 5vw, 4rem) 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }}
          className="city-guide-grid">

          {/* Article */}
          <article>
            {city.sections.map((sec, i) => (
              <Section key={i} {...sec} />
            ))}

            {/* Pros / Cons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(45,125,82,0.08)', border: '1px solid rgba(45,125,82,0.2)', borderRadius: '12px', padding: '1.1rem 1.25rem' }}>
                <h4 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2D7D52', marginBottom: '0.6rem' }}>✓ Pros</h4>
                <ul style={{ paddingLeft: '1rem' }}>
                  {city.pros.map((p, i) => <li key={i} style={{ fontSize: '0.82rem', color: 'var(--warm-mid)', lineHeight: 1.6, marginBottom: '0.25rem' }}>{p}</li>)}
                </ul>
              </div>
              <div style={{ background: 'rgba(192,57,43,0.06)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: '12px', padding: '1.1rem 1.25rem' }}>
                <h4 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '0.6rem' }}>✗ Cons</h4>
                <ul style={{ paddingLeft: '1rem' }}>
                  {city.cons.map((c, i) => <li key={i} style={{ fontSize: '0.82rem', color: 'var(--warm-mid)', lineHeight: 1.6, marginBottom: '0.25rem' }}>{c}</li>)}
                </ul>
              </div>
            </div>

            {/* Verdict */}
            <div style={{ background: 'rgba(193,68,14,0.08)', border: '1px solid rgba(193,68,14,0.2)', borderRadius: '14px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.6rem' }}>🏁 The Verdict</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--warm-mid)', lineHeight: 1.75, margin: 0 }}>{city.verdict}</p>
            </div>

            {/* Visa */}
            <div style={{ background: 'rgba(26,92,158,0.08)', border: '1px solid rgba(26,92,158,0.2)', borderRadius: '12px', padding: '1.1rem 1.25rem', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a5c9e', marginBottom: '0.5rem' }}>📌 Visa & Residency</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--warm-mid)', lineHeight: 1.7, margin: 0 }}>{city.visaNote}</p>
            </div>

            {/* Related cities */}
            {city.related?.length > 0 && (
              <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--sand3)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--warm-dark)', marginBottom: '1rem' }}>
                  Explore More Italian Cities
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {city.related.map(rid => {
                    const rc = CITY_GUIDES[rid];
                    if (!rc) return null;
                    return (
                      <Link key={rid} to={`/cities/${rid}`}
                        style={{ background: 'var(--white)', border: '1px solid var(--sand3)', borderRadius: '12px', padding: '1rem 1.25rem', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--terra)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--sand3)'; e.currentTarget.style.transform = 'none'; }}>
                        <div style={{ fontSize: '1.4rem', marginBottom: '5px' }}>{rc.flag}</div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--warm-dark)' }}>{rc.name}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--warm-muted)', marginTop: '2px' }}>~€{rc.budgetSingle}/month</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '82px' }}>
            {/* Cost of living */}
            <div style={{ background: 'var(--white)', border: '1px solid var(--sand3)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-muted)', marginBottom: '1rem' }}>
                Monthly Costs
              </div>
              {Object.entries(city.col).map(([k, v]) => {
                const isTotal = k.includes('total');
                return (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--sand2)', fontSize: '0.85rem', ...(isTotal ? { background: 'var(--sand)', fontWeight: 600, padding: '10px 8px', borderRadius: '8px', borderBottom: 'none', marginTop: '4px' } : {}) }}>
                    <span style={{ color: isTotal ? 'var(--warm-dark)' : 'var(--warm-muted)' }}>{k}</span>
                    <span style={{ fontWeight: isTotal ? 700 : 500, color: isTotal ? 'var(--terra)' : 'var(--warm-dark)' }}>{v}</span>
                  </div>
                );
              })}
            </div>

            {/* Scores */}
            <div style={{ background: 'var(--white)', border: '1px solid var(--sand3)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-muted)', marginBottom: '1rem' }}>
                City Scores
              </div>
              {Object.entries(city.scores).map(([label, val]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--warm-mid)', width: '100px', flexShrink: 0 }}>{label}</span>
                  <div style={{ flex: 1, height: '6px', background: 'var(--sand2)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: '3px', width: `${val}%`, background: SCORE_COLORS[label] || 'var(--terra)', transition: 'width 1s ease' }} />
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--warm-dark)', width: '28px', textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ background: 'var(--terra)', borderRadius: '16px', padding: '1.5rem', color: 'white', textAlign: 'center' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', marginBottom: '0.5rem' }}>Calculate Your Budget</h3>
              <p style={{ fontSize: '0.82rem', opacity: 0.85, marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Use our full calculator to get a personalised cost estimate for {city.name} with Italian tax included.
              </p>
              <button onClick={() => navigate('/')}
                style={{ background: 'white', color: 'var(--terra)', padding: '11px 24px', borderRadius: '100px', fontWeight: 600, fontSize: '0.85rem', border: 'none', cursor: 'pointer', width: '100%', fontFamily: "'DM Sans', sans-serif" }}>
                Open Calculator →
              </button>
            </div>
          </aside>
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .city-guide-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
