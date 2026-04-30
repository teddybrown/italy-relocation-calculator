import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// ─── ITALIAN TAX LOGIC 2025 ───────────────────────────────────────────────────

const IRPEF_BRACKETS = [
  { up_to: 28000,  rate: 0.23 },
  { up_to: 50000,  rate: 0.35 },
  { up_to: Infinity, rate: 0.43 },
];

const REGIONAL_RATES = {
  lombardy:  0.0173, lazio:    0.0173, campania:  0.0203,
  sicily:    0.0173, piedmont: 0.0173, veneto:    0.0173,
  tuscany:   0.0173, puglia:   0.0203, emilia:    0.0173,
  calabria:  0.0203, sardinia: 0.0173, other:     0.0173,
};

const INPS_EMPLOYEE = 0.0919; // employee contribution

function calcIRPEF(taxableIncome) {
  let tax = 0;
  let prev = 0;
  for (const bracket of IRPEF_BRACKETS) {
    const top = Math.min(taxableIncome, bracket.up_to);
    if (top <= prev) break;
    tax += (top - prev) * bracket.rate;
    prev = bracket.up_to;
    if (taxableIncome <= bracket.up_to) break;
  }
  return tax;
}

function calcDetrazionelavoro(reddito) {
  // Detrazioni per reddito da lavoro dipendente (art. 13 TUIR) — 2025
  if (reddito <= 0) return 0;
  if (reddito <= 15000) return 1955;
  if (reddito <= 28000) return 1955 + (28000 - reddito) / 13000 * 0; // semplificato
  if (reddito <= 50000) return Math.max(0, 700 * (50000 - reddito) / 22000);
  return 0;
}

function calculateNet(grossAnnual, regionKey, regime, hasFamily) {
  const gross = parseFloat(grossAnnual) || 0;

  // INPS employee contributions
  const inps = gross * INPS_EMPLOYEE;

  // Taxable base
  let taxableBase = gross - inps;

  // Regime adjustments
  let regimeNote = '';
  let taxableForIRPEF = taxableBase;

  if (regime === 'impatriates') {
    // Regime Impatriati: 50% exemption (90% for south Italy)
    const exemption = ['sicily', 'campania', 'puglia', 'calabria'].includes(regionKey) ? 0.90 : 0.50;
    taxableForIRPEF = taxableBase * (1 - exemption);
    regimeNote = `Impatriates regime: ${exemption * 100}% exemption applied`;
  } else if (regime === 'flat7') {
    // Regime 7% flat for pensioners in southern municipalities < 20k residents
    const irpef7 = taxableBase * 0.07;
    const regional = taxableBase * (REGIONAL_RATES[regionKey] || 0.0173);
    const net = gross - inps - irpef7 - regional;
    return {
      gross, inps, irpef: irpef7, regional, municipal: 0,
      totalTax: inps + irpef7 + regional,
      net, netMonthly: net / 13,
      effectiveRate: ((inps + irpef7 + regional) / gross) * 100,
      marginalRate: 7,
      regimeNote: '7% flat tax regime for pensioners in qualifying southern municipalities',
    };
  }

  // IRPEF
  const detrazione = calcDetrazionelavoro(taxableForIRPEF) + (hasFamily ? 950 : 0);
  const irpef = Math.max(0, calcIRPEF(taxableForIRPEF) - detrazione);

  // Addizionale regionale
  const regional = taxableBase * (REGIONAL_RATES[regionKey] || 0.0173);

  // Addizionale comunale (average ~0.8%)
  const municipal = taxableBase * 0.008;

  const totalTax = inps + irpef + regional + municipal;
  const net = gross - totalTax;
  const effectiveRate = (totalTax / gross) * 100;

  // Marginal rate (IRPEF bracket + INPS + regional)
  let marginalIRPEF = gross > 50000 ? 43 : gross > 28000 ? 35 : 23;
  const marginalRate = marginalIRPEF + INPS_EMPLOYEE * 100 + (REGIONAL_RATES[regionKey] || 0.0173) * 100;

  return {
    gross, inps, irpef, regional, municipal,
    totalTax, net, netMonthly: net / 13,  // 13th month (tredicesima)
    effectiveRate, marginalRate, regimeNote,
  };
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const REGIONS = [
  { key: 'lombardy', label: 'Lombardy (Milan)' },
  { key: 'lazio',    label: 'Lazio (Rome)' },
  { key: 'tuscany',  label: 'Tuscany (Florence)' },
  { key: 'emilia',   label: 'Emilia-Romagna (Bologna)' },
  { key: 'veneto',   label: 'Veneto (Venice)' },
  { key: 'piedmont', label: 'Piedmont (Turin)' },
  { key: 'campania', label: 'Campania (Naples)' },
  { key: 'sicily',   label: 'Sicily (Palermo/Catania)' },
  { key: 'puglia',   label: 'Puglia (Bari)' },
  { key: 'calabria', label: 'Calabria' },
  { key: 'sardinia', label: 'Sardinia' },
  { key: 'other',    label: 'Other region' },
];

const REGIMES = [
  { key: 'ordinary',    label: 'Standard (Ordinario)',    desc: 'Standard Italian tax regime' },
  { key: 'impatriates', label: 'Impatriates Regime',      desc: '50–90% income exemption for new residents' },
  { key: 'flat7',       label: '7% Flat Tax (Pensioners)', desc: 'For pensioners in qualifying southern municipalities' },
];

const S = {
  page: { minHeight: '100vh', background: 'var(--cream)', paddingTop: '62px' },
  hero: { background: 'var(--sand)', borderBottom: '1px solid var(--sand3)', padding: '60px clamp(1.25rem,5vw,4rem) 48px' },
  heroInner: { maxWidth: '900px', margin: '0 auto' },
  breadcrumb: { display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: 'var(--warm-muted)', marginBottom: '1.5rem' },
  breadLink: { color: 'var(--warm-muted)', textDecoration: 'none' },
  eyebrow: { fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.75rem' },
  h1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.05, color: 'var(--warm-dark)', marginBottom: '0.5rem' },
  sub: { fontSize: '1rem', color: 'var(--warm-mid)', fontWeight: 300, lineHeight: 1.75, maxWidth: '560px' },
  wrap: { maxWidth: '900px', margin: '0 auto', padding: '3rem clamp(1.25rem,5vw,4rem) 5rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' },
  card: { background: 'white', border: '1px solid var(--sand3)', borderRadius: '20px', padding: '2rem' },
  label: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-muted)', marginBottom: '0.5rem', display: 'block' },
  input: { width: '100%', padding: '12px 16px', border: '1.5px solid var(--sand3)', borderRadius: '10px', fontSize: '1rem', fontFamily: "'DM Sans', sans-serif", color: 'var(--warm-dark)', background: 'white', outline: 'none', transition: 'border-color 0.2s' },
  select: { width: '100%', padding: '11px 16px', border: '1.5px solid var(--sand3)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif", color: 'var(--warm-dark)', background: 'white', outline: 'none', cursor: 'pointer' },
  fieldWrap: { marginBottom: '1.5rem' },
  resultRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--sand2)', fontSize: '0.88rem' },
  resultLabel: { color: 'var(--warm-mid)' },
  resultVal: { fontWeight: 500, color: 'var(--warm-dark)' },
  bigNet: { textAlign: 'center', padding: '2rem', background: 'var(--terra-dim)', border: '1px solid rgba(193,68,14,0.2)', borderRadius: '16px', marginBottom: '1.5rem' },
  bigNetLabel: { fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.5rem' },
  bigNetVal: { fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: 900, color: 'var(--warm-dark)', lineHeight: 1 },
  bigNetSub: { fontSize: '0.85rem', color: 'var(--warm-mid)', marginTop: '0.4rem' },
  pill: { display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600, marginRight: '6px', marginBottom: '6px' },
  infoBox: { background: 'var(--sand)', border: '1px solid var(--sand3)', borderRadius: '12px', padding: '1rem 1.25rem', marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--warm-mid)', lineHeight: 1.7 },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', fontWeight: 700, color: 'var(--warm-dark)', marginBottom: '1rem', marginTop: '3rem' },
  guideGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginTop: '1rem' },
  guideCard: { background: 'white', border: '1px solid var(--sand3)', borderRadius: '14px', padding: '1.25rem', fontSize: '0.85rem', color: 'var(--warm-mid)', lineHeight: 1.6 },
};

const fmt = (n) => new Intl.NumberFormat('en-EU', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n));

export default function SalaryCalculator() {
  const [gross, setGross] = useState('45000');
  const [region, setRegion] = useState('lombardy');
  const [regime, setRegime] = useState('ordinary');
  const [hasFamily, setHasFamily] = useState(false);

  const result = useCallback(() => {
    const g = parseFloat(gross);
    if (!g || g <= 0) return null;
    return calculateNet(g, region, regime, hasFamily);
  }, [gross, region, regime, hasFamily])();

  const barPct = (val, total) => `${Math.round((val / total) * 100)}%`;

  return (
    <>
      <Helmet>
        <title>Italy Salary Calculator 2025 — Net Pay After Tax | Italy Relocation Calculator</title>
        <meta name="description" content="Calculate your exact net salary in Italy for 2025. Includes IRPEF, INPS contributions, regional taxes, impatriates regime and 7% flat tax. Free Italian salary calculator." />
        <meta name="keywords" content="Italy salary calculator 2025, Italian net salary calculator, busta paga netta Italy, IRPEF calculator Italy, impatriates regime calculator, Italy income tax calculator" />
        <link rel="canonical" href="https://italy-relocation-calculator.netlify.app/salary" />
        <meta property="og:title" content="Italy Salary Calculator 2025 — Net Pay After Tax" />
        <meta property="og:description" content="Calculate your exact net salary in Italy. IRPEF, INPS, regional taxes, impatriates regime and more." />
        <meta property="og:url" content="https://italy-relocation-calculator.netlify.app/salary" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Italy Net Salary Calculator 2025",
          "description": "Calculate net salary in Italy after IRPEF, INPS, regional and municipal taxes. Includes impatriates regime and 7% flat tax.",
          "url": "https://italy-relocation-calculator.netlify.app/salary",
          "applicationCategory": "FinanceApplication",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
        })}</script>
      </Helmet>

      <div style={S.page}>
        {/* Hero */}
        <header style={S.hero}>
          <div style={S.heroInner}>
            <nav style={S.breadcrumb} aria-label="Breadcrumb">
              <Link to="/" style={S.breadLink}>Calculator</Link>
              <span>›</span>
              <span>Salary Calculator</span>
            </nav>
            <div style={S.eyebrow}>🇮🇹 Italy · 2025 Tax Rates</div>
            <h1 style={S.h1}>Italian Salary<br /><em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>Net Pay Calculator</em></h1>
            <p style={{ ...S.sub, marginTop: '0.75rem' }}>Enter your gross annual salary and see exactly what lands in your bank account — after IRPEF, INPS contributions, regional taxes, and available exemption regimes.</p>
          </div>
        </header>

        <div style={S.wrap}>
          <div style={{ ...S.grid, gridTemplateColumns: window.innerWidth < 700 ? '1fr' : '1fr 1fr' }}>

            {/* INPUT PANEL */}
            <div style={S.card}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.75rem', color: 'var(--warm-dark)' }}>Your Details</h2>

              <div style={S.fieldWrap}>
                <label style={S.label}>Gross Annual Salary (€)</label>
                <input
                  style={S.input}
                  type="number"
                  value={gross}
                  min="0"
                  step="1000"
                  onChange={e => setGross(e.target.value)}
                  onFocus={e => e.target.style.borderColor = 'var(--terra)'}
                  onBlur={e => e.target.style.borderColor = 'var(--sand3)'}
                  placeholder="e.g. 45000"
                  aria-label="Gross annual salary in euros"
                />
              </div>

              <div style={S.fieldWrap}>
                <label style={S.label}>Region</label>
                <select style={S.select} value={region} onChange={e => setRegion(e.target.value)}>
                  {REGIONS.map(r => <option key={r.key} value={r.key}>{r.label}</option>)}
                </select>
              </div>

              <div style={S.fieldWrap}>
                <label style={S.label}>Tax Regime</label>
                {REGIMES.map(r => (
                  <label key={r.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px', border: `1.5px solid ${regime === r.key ? 'var(--terra)' : 'var(--sand3)'}`, borderRadius: '10px', marginBottom: '8px', cursor: 'pointer', background: regime === r.key ? 'var(--terra-dim)' : 'white', transition: 'all 0.15s' }}>
                    <input type="radio" name="regime" value={r.key} checked={regime === r.key} onChange={() => setRegime(r.key)} style={{ marginTop: '2px', accentColor: 'var(--terra)' }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--warm-dark)' }}>{r.label}</div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--warm-muted)', marginTop: '2px' }}>{r.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div style={S.fieldWrap}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.88rem', color: 'var(--warm-mid)' }}>
                  <input type="checkbox" checked={hasFamily} onChange={e => setHasFamily(e.target.checked)} style={{ accentColor: 'var(--terra)', width: '16px', height: '16px' }} />
                  Dependent family members (spouse/children)
                </label>
                <div style={{ fontSize: '0.75rem', color: 'var(--warm-muted)', marginTop: '6px', paddingLeft: '26px' }}>Adds approx. €950/year in deductions</div>
              </div>
            </div>

            {/* RESULTS PANEL */}
            <div>
              {result ? (
                <>
                  {/* Big net figure */}
                  <div style={S.bigNet}>
                    <div style={S.bigNetLabel}>Net Annual Salary</div>
                    <div style={S.bigNetVal}>€{fmt(result.net)}</div>
                    <div style={S.bigNetSub}>~€{fmt(result.netMonthly)}/month (incl. 13th month)</div>
                  </div>

                  {/* Breakdown */}
                  <div style={S.card}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-muted)', marginBottom: '1rem' }}>Breakdown</div>

                    {[
                      { label: 'Gross salary', val: `€${fmt(result.gross)}`, bold: false },
                      { label: 'INPS contributions (9.19%)', val: `− €${fmt(result.inps)}`, neg: true },
                      { label: 'IRPEF income tax', val: `− €${fmt(result.irpef)}`, neg: true },
                      { label: 'Regional tax', val: `− €${fmt(result.regional)}`, neg: true },
                      { label: 'Municipal tax (~0.8%)', val: `− €${fmt(result.municipal)}`, neg: true },
                    ].map(({ label, val, neg, bold }) => (
                      <div key={label} style={S.resultRow}>
                        <span style={{ ...S.resultLabel, fontWeight: bold ? 600 : 400 }}>{label}</span>
                        <span style={{ ...S.resultVal, color: neg ? 'var(--red)' : 'var(--warm-dark)' }}>{val}</span>
                      </div>
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0 4px', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--warm-dark)' }}>Net salary</span>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: 'var(--terra)' }}>€{fmt(result.net)}</span>
                    </div>

                    {/* Visual bar */}
                    <div style={{ marginTop: '1.25rem' }}>
                      <div style={{ display: 'flex', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '8px' }}>
                        <div style={{ width: barPct(result.net, result.gross), background: 'var(--terra)', transition: 'width 0.6s ease' }} title="Net pay" />
                        <div style={{ width: barPct(result.irpef, result.gross), background: '#E8A070', transition: 'width 0.6s ease' }} title="IRPEF" />
                        <div style={{ width: barPct(result.inps, result.gross), background: '#D9CFBC', transition: 'width 0.6s ease' }} title="INPS" />
                        <div style={{ flex: 1, background: '#EDE6D6' }} title="Other taxes" />
                      </div>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {[
                          { color: 'var(--terra)', label: `Net ${Math.round((result.net / result.gross) * 100)}%` },
                          { color: '#E8A070', label: `IRPEF ${Math.round((result.irpef / result.gross) * 100)}%` },
                          { color: '#D9CFBC', label: `INPS ${Math.round((result.inps / result.gross) * 100)}%` },
                        ].map(({ color, label }) => (
                          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--warm-muted)' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '1.5rem' }}>
                      {[
                        { label: 'Effective Tax Rate', val: `${result.effectiveRate.toFixed(1)}%` },
                        { label: 'Marginal Rate', val: `~${result.marginalRate.toFixed(0)}%` },
                        { label: 'Total Tax + INPS', val: `€${fmt(result.totalTax)}` },
                        { label: 'Net Monthly', val: `€${fmt(result.net / 12)}` },
                      ].map(({ label, val }) => (
                        <div key={label} style={{ background: 'var(--sand)', borderRadius: '10px', padding: '0.875rem', textAlign: 'center' }}>
                          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--warm-dark)', marginBottom: '3px' }}>{val}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--warm-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
                        </div>
                      ))}
                    </div>

                    {result.regimeNote && (
                      <div style={{ ...S.infoBox, background: 'var(--terra-dim)', border: '1px solid rgba(193,68,14,0.2)', marginTop: '1rem' }}>
                        <strong style={{ color: 'var(--terra)' }}>Special Regime: </strong>{result.regimeNote}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ ...S.card, textAlign: 'center', padding: '3rem 2rem', color: 'var(--warm-muted)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💶</div>
                  <p>Enter your gross salary to see your net pay calculation.</p>
                </div>
              )}
            </div>
          </div>

          {/* INFO SECTION */}
          <h2 style={S.sectionTitle}>Understanding Italian Taxes</h2>
          <div style={S.guideGrid}>
            {[
              { icon: '📊', title: 'IRPEF — Income Tax', body: 'Italy uses progressive tax brackets: 23% up to €28,000 · 35% up to €50,000 · 43% above €50,000. Various deductions can reduce the taxable base.' },
              { icon: '🏥', title: 'INPS Contributions', body: "Employees pay 9.19% of gross salary to INPS (social security). Your employer pays an additional ~30% on top — this doesn't affect your net but is part of the total labour cost." },
              { icon: '🌍', title: 'Impatriates Regime', body: 'New Italian tax residents can benefit from a 50% income exemption (90% in southern regions) for 5 years. Requires not having been resident in Italy for the past 3 years. One of Europe\'s best expat tax deals.' },
              { icon: '☀️', title: '7% Flat Tax', body: 'Pensioners transferring their residence to qualifying municipalities (under 20,000 residents) in southern Italy pay a flat 7% on all foreign pension income. Valid for up to 10 years.' },
              { icon: '🗓️', title: '13th Month (Tredicesima)', body: 'Italian employees receive a mandatory 13th month salary in December. Some contracts include a 14th month in June. Our calculator accounts for the tredicesima in the monthly figure.' },
              { icon: '📋', title: 'Regional & Municipal', body: 'Addizionale regionale (1.23–3.33%) and addizionale comunale (0–0.9%) are levied on the same IRPEF taxable base. Rates vary significantly by region and municipality.' },
            ].map(({ icon, title, body }) => (
              <div key={title} style={S.guideCard}>
                <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{icon}</div>
                <div style={{ fontWeight: 600, color: 'var(--warm-dark)', marginBottom: '6px', fontSize: '0.9rem' }}>{title}</div>
                <div>{body}</div>
              </div>
            ))}
          </div>

          <div style={{ ...S.infoBox, marginTop: '2rem' }}>
            <strong>Disclaimer:</strong> This calculator provides estimates based on 2025 Italian tax rules. Individual circumstances vary. Always consult a qualified Italian tax adviser (commercialista) before making financial decisions.
          </div>

          {/* CTA back */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/" style={{ padding: '12px 24px', borderRadius: '100px', background: 'var(--terra)', color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
              ← Full Relocation Calculator
            </Link>
            <Link to="/visa" style={{ padding: '12px 24px', borderRadius: '100px', border: '1px solid var(--sand3)', color: 'var(--warm-mid)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Visa Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
