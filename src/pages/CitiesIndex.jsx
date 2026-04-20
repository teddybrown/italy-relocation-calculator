import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CITY_LIST } from '../data/cityData';

const BUDGET_LABELS = [
  { max: 1400, label: 'Budget-friendly', color: '#2D7D52' },
  { max: 2000, label: 'Mid-range', color: '#C8882A' },
  { max: 9999, label: 'Premium', color: '#C1440E' },
];

function getBudgetLabel(budget) {
  return BUDGET_LABELS.find(b => budget <= b.max) || BUDGET_LABELS[2];
}

export default function CitiesIndex() {
  return (
    <>
      <Helmet>
        <title>Italian City Guides for Expats 2025 | Italy Relocation Calculator</title>
        <meta name="description" content="Detailed expat guides for 12 Italian cities. Cost of living, best neighbourhoods, visa options and honest reviews for Rome, Milan, Florence, Naples, Bologna, Turin, Venice, Palermo, Bari, Catania, Genoa and Trieste." />
        <meta name="keywords" content="Italy expat city guide 2025, living in Italy cities, best cities to live in Italy, Italy cost of living by city, move to Italy expat guide" />
        <link rel="canonical" href="https://italy-relocation-calculator.netlify.app/cities" />
        <meta property="og:title" content="Italian City Guides for Expats 2025" />
        <meta property="og:description" content="Detailed expat guides for 12 Italian cities — cost of living, neighbourhoods, visa and honest reviews." />
        <meta property="og:url" content="https://italy-relocation-calculator.netlify.app/cities" />
      </Helmet>

      {/* Hero */}
      <header style={{ background: 'var(--sand)', borderBottom: '1px solid var(--sand3)', padding: '90px clamp(1.25rem, 5vw, 4rem) 50px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🇮🇹 Italy Expat Guides · 2025
            <span style={{ flex: '0 0 32px', height: '1px', background: 'var(--terra)', opacity: 0.4, display: 'block' }} />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', color: 'var(--warm-dark)' }}>
            Find Your <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>Italian City</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--warm-mid)', maxWidth: '520px', lineHeight: 1.75, fontWeight: 300, marginBottom: '2rem' }}>
            Honest, data-backed guides for 12 Italian cities — from Milan's financial buzz to Catania's volcanic energy. Cost of living, best neighbourhoods, visa routes and more.
          </p>
          <Link to="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--terra)', color: 'white', padding: '13px 28px', borderRadius: '100px', fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--terra2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--terra)'}>
            Calculate Your Budget for Any City →
          </Link>
        </div>
      </header>

      {/* City Grid */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem clamp(1.25rem, 5vw, 4rem) 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {CITY_LIST.map(city => {
            const budgetInfo = getBudgetLabel(city.budgetSingle);
            return (
              <Link key={city.id} to={`/cities/${city.id}`}
                style={{ background: 'var(--white)', border: '1px solid var(--sand3)', borderRadius: '16px', padding: '1.25rem 1.4rem', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--terra)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(193,68,14,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--sand3)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ fontSize: '1.75rem' }}>{city.flag}</div>
                  <span style={{ fontSize: '0.65rem', padding: '2px 9px', borderRadius: '100px', fontWeight: 600, background: `${budgetInfo.color}15`, color: budgetInfo.color, border: `1px solid ${budgetInfo.color}30` }}>
                    {budgetInfo.label}
                  </span>
                </div>

                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--warm-dark)', marginBottom: '2px' }}>{city.name}</div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--warm-muted)', marginBottom: '8px' }}>{city.region}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--warm-mid)', lineHeight: 1.5, marginBottom: '10px' }}>{city.tagline}</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--terra)' }}>
                    from ~€{city.budgetSingle}/mo
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {(city.tags || []).slice(0, 2).map(t => (
                      <span key={t} style={{ fontSize: '0.62rem', padding: '2px 7px', borderRadius: '100px', border: '1px solid var(--sand3)', color: 'var(--warm-muted)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
