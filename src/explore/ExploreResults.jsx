import { useMemo, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GLOBAL_CITIES, BADGE_CFG, scoreCity } from './globalData';

const dark = {
  bg: '#0A0A0F', bg2: '#12121A', bg3: '#1C1C28', bg4: '#22222F',
  border: 'rgba(255,255,255,0.07)', border2: 'rgba(255,255,255,0.13)',
  gold: '#D4A843', gold2: '#F0C96A', goldDim: 'rgba(212,168,67,0.13)',
  text: '#F0EEE8', text2: '#9A9890', text3: '#5A5855',
  green: '#4CAF7D', greenDim: 'rgba(76,175,125,0.1)',
  red: '#E07060', redDim: 'rgba(224,112,96,0.1)',
  blue: '#5B9BD5', blueDim: 'rgba(91,155,213,0.1)',
  terra: '#C1440E',
};

const COL_ICONS = { rent:'🏠', groceries:'🛒', dining:'🍽', transport:'🚇', cowork:'💻', utilities:'💡', leisure:'🎭', health:'🏥' };
const COL_COLORS = ['#D4A843','#4CAF7D','#5B9BD5','#9B8BD4','#E09040','#E07060','#4BBFAD','#CF8C7A'];
const fmt = n => new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n));

function readAnswers(params) {
  const ans = {};
  ['budget','climate','safety','lifestyle','priority'].forEach(k => {
    if (params.has(k)) {
      const v = params.get(k);
      ans[k] = k === 'budget' || k === 'climate' || k === 'safety' ? Number(v) : v;
    }
  });
  if (params.has('deal_breaker')) ans.deal_breaker = params.get('deal_breaker').split(',').filter(Boolean);
  return ans;
}

export default function ExploreResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState(null);
  const [openTab, setOpenTab] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [copied, setCopied] = useState(false);

  const ans = useMemo(() => readAnswers(searchParams), [searchParams]);
  const scored = useMemo(() =>
    GLOBAL_CITIES.map(c => ({ ...c, score: scoreCity(c, ans) })).sort((a, b) => b.score - a.score),
    [ans]
  );

  if (Object.keys(ans).length < 3) {
    navigate('/explore/quiz');
    return null;
  }

  const FILTERS = [
    { key: 'all', label: 'All Cities' },
    { key: 'budget', label: '💰 Budget' },
    { key: 'safety', label: '🛡 Safest' },
    { key: 'warmth', label: '☀️ Warmest' },
    { key: 'expats', label: '👥 Expat Scene' },
    { key: 'europe', label: '🇪🇺 Europe' },
  ];

  function applyFilter(city) {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'budget') return city.cost <= 1400;
    if (activeFilter === 'safety') return city.safety >= 80;
    if (activeFilter === 'warmth') return city.warmth >= 85;
    if (activeFilter === 'expats') return city.expat >= 82;
    if (activeFilter === 'europe') return ['lisbon','berlin','barcelona','prague','athens'].includes(city.id);
    return true;
  }

  function copyUrl() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const visibleCities = scored.filter(applyFilter);

  return (
    <>
      <Helmet>
        <title>Your City Matches — MovAbroad</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div style={{ minHeight: '100vh', background: dark.bg, paddingTop: '62px' }}>
        {/* Nav */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(1.25rem,5vw,4rem)', height: '62px', background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${dark.border}` }}>
          <Link to="/explore" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.3rem', letterSpacing: '0.05em', color: dark.text, textDecoration: 'none' }}>
            Mov<span style={{ color: dark.gold }}>Abroad</span>
          </Link>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/" style={{ fontSize: '0.75rem', color: dark.text3, textDecoration: 'none', padding: '7px 14px', border: `1px solid ${dark.border}`, borderRadius: '100px' }}>🇮🇹 Italy</Link>
            <Link to="/explore/quiz" style={{ fontSize: '0.75rem', color: dark.text2, textDecoration: 'none', padding: '7px 14px', border: `1px solid ${dark.border2}`, borderRadius: '100px' }}>Retake Quiz</Link>
          </div>
        </nav>

        <div style={{ padding: '80px clamp(1.25rem,5vw,4rem) 80px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem,5vw,3.8rem)', letterSpacing: '0.02em', color: dark.text, marginBottom: '0.3rem' }}>
                YOUR TOP <span style={{ color: dark.gold }}>MATCHES</span>
              </h1>
              <p style={{ color: dark.text2, fontSize: '0.9rem', fontWeight: 300 }}>Click any city to expand. Click "Guide ↗" for the full city guide.</p>
            </div>

            {/* Share */}
            <div style={{ background: dark.bg2, border: `1px solid ${dark.border}`, borderRadius: '16px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: dark.text, marginBottom: '3px' }}>Share your results</div>
                <div style={{ fontSize: '0.76rem', color: dark.text2 }}>Anyone with this link sees your personalised ranking.</div>
              </div>
              <button onClick={copyUrl} style={{ marginLeft: 'auto', padding: '9px 20px', borderRadius: '8px', border: 'none', background: copied ? dark.green : dark.gold, color: copied ? 'white' : '#0A0A0F', fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}>
                {copied ? '✓ Copied!' : 'Copy link'}
              </button>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {FILTERS.map(f => (
                <button key={f.key} onClick={() => setActiveFilter(f.key)}
                  style={{ padding: '7px 16px', borderRadius: '100px', border: `1px solid ${activeFilter === f.key ? dark.gold : dark.border2}`, background: activeFilter === f.key ? dark.gold : 'transparent', color: activeFilter === f.key ? '#0A0A0F' : dark.text2, fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', cursor: 'pointer', fontWeight: activeFilter === f.key ? 600 : 400, transition: 'all 0.2s' }}>
                  {f.label}
                </button>
              ))}
            </div>

            {/* Italy suggestion if Europe filter active */}
            {activeFilter === 'europe' && (
              <div style={{ background: 'rgba(193,68,14,0.1)', border: '1px solid rgba(193,68,14,0.25)', borderRadius: '14px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#E8806A', marginBottom: '3px' }}>🇮🇹 Interested in Italy specifically?</div>
                  <div style={{ fontSize: '0.78rem', color: dark.text2 }}>We have 12 detailed Italian city guides — Rome, Milan, Florence, Bologna, Naples and more.</div>
                </div>
                <Link to="/cities" style={{ padding: '9px 18px', borderRadius: '100px', background: '#C1440E', color: 'white', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 500, flexShrink: 0 }}>
                  Italy City Guides →
                </Link>
              </div>
            )}

            {/* Result cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '2.5rem' }}>
              {visibleCities.map((city, rank) => {
                const isOpen = openCard === city.id;
                const tab = openTab[city.id] || 'overview';
                const colTotal = Object.values(city.col).reduce((a, b) => a + b, 0);
                const badges = (city.bestFor || []).slice(0, 2).map(b => BADGE_CFG[b]).filter(Boolean);

                const dims = [
                  { label: 'Cost', val: Math.round((1 - city.cost/5000)*100), color: dark.green },
                  { label: 'Safety', val: city.safety, color: dark.blue },
                  { label: 'Healthcare', val: city.healthcare, color: dark.gold },
                  { label: 'Internet', val: city.internet, color: '#9B8BD4' },
                  { label: 'Expat Scene', val: city.expat, color: '#E09040' },
                  { label: 'Warmth', val: city.warmth, color: dark.red },
                ];

                return (
                  <div key={city.id} style={{ background: dark.bg2, border: `1px solid ${rank === 0 ? 'rgba(212,168,67,0.35)' : dark.border}`, borderRadius: '20px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                    {/* Head */}
                    <div onClick={() => setOpenCard(isOpen ? null : city.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.4rem 1.75rem', cursor: 'pointer' }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', lineHeight: 1, color: rank === 0 ? dark.gold : dark.text3, flexShrink: 0, width: '2.2rem', textAlign: 'center' }}>{rank + 1}</div>
                      <div style={{ fontSize: '1.9rem', flexShrink: 0 }}>{city.flag}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', letterSpacing: '0.02em', color: dark.text, marginBottom: '3px' }}>{city.name}, {city.country}</div>
                        <div style={{ fontSize: '0.8rem', color: dark.text2, fontWeight: 300 }}>{city.tagline}</div>
                        <div style={{ display: 'flex', gap: '5px', marginTop: '6px', flexWrap: 'wrap' }}>
                          {badges.map(b => (
                            <span key={b.l} style={{ fontSize: '0.62rem', padding: '2px 9px', borderRadius: '100px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', background: `${b.c}18`, color: b.c, border: `1px solid ${b.c}30` }}>{b.l}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ flexShrink: 0, textAlign: 'right', marginRight: '8px' }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.9rem', color: dark.gold, lineHeight: 1 }}>{city.score}</div>
                        <div style={{ fontSize: '0.68rem', color: dark.text3, letterSpacing: '0.08em' }}>MATCH</div>
                      </div>
                      <Link to={`/explore/cities/${city.id}`}
                        onClick={e => e.stopPropagation()}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '100px', background: dark.gold, color: '#0A0A0F', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', flexShrink: 0 }}>
                        Guide ↗
                      </Link>
                    </div>

                    {/* Expanded body */}
                    {isOpen && (
                      <div style={{ borderTop: `1px solid ${dark.border}` }}>
                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '2px', padding: '0 1.75rem', borderBottom: `1px solid ${dark.border}` }}>
                          {['overview','cost','hoods'].map(t => (
                            <button key={t} onClick={() => setOpenTab(prev => ({ ...prev, [city.id]: t }))}
                              style={{ padding: '8px 14px', fontSize: '0.8rem', fontWeight: 500, color: tab === t ? dark.gold : dark.text3, cursor: 'pointer', borderBottom: `2px solid ${tab === t ? dark.gold : 'transparent'}`, marginBottom: '-1px', background: 'none', border: 'none', borderBottom: `2px solid ${tab === t ? dark.gold : 'transparent'}`, fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s' }}>
                              {t === 'overview' ? 'Overview' : t === 'cost' ? 'Cost of Living' : 'Neighbourhoods'}
                            </button>
                          ))}
                        </div>

                        <div style={{ padding: '1.5rem 1.75rem' }}>
                          {tab === 'overview' && (
                            <>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '1.5rem' }}>
                                {[['Rent/mo', city.stats.rent],['Meal out', city.stats.meal],['Cowork/mo', city.stats.cowork],['Avg Temp', city.stats.avg_temp]].map(([l, v]) => (
                                  <div key={l} style={{ background: dark.bg3, borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.05rem', fontWeight: 600, color: dark.text, marginBottom: '3px' }}>{v}</div>
                                    <div style={{ fontSize: '0.68rem', color: dark.text3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
                                  </div>
                                ))}
                              </div>
                              <div style={{ marginBottom: '1.5rem' }}>
                                {dims.map(d => (
                                  <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '0.78rem', color: dark.text2, width: '90px', flexShrink: 0 }}>{d.label}</span>
                                    <div style={{ flex: 1, height: '5px', background: dark.bg3, borderRadius: '3px', overflow: 'hidden' }}>
                                      <div style={{ height: '100%', borderRadius: '3px', width: `${d.val}%`, background: d.color }} />
                                    </div>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 500, color: dark.text2, width: '26px', textAlign: 'right' }}>{d.val}</span>
                                  </div>
                                ))}
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.25rem' }}>
                                <div style={{ background: dark.greenDim, border: `1px solid rgba(76,175,125,0.2)`, borderRadius: '12px', padding: '1rem 1.25rem' }}>
                                  <h5 style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark.green, marginBottom: '8px' }}>✓ Pros</h5>
                                  <ul style={{ paddingLeft: '1rem' }}>{city.pros?.map((p,i) => <li key={i} style={{ fontSize: '0.82rem', color: dark.text2, lineHeight: 1.6, marginBottom: '3px' }}>{p}</li>)}</ul>
                                </div>
                                <div style={{ background: dark.redDim, border: `1px solid rgba(224,112,96,0.2)`, borderRadius: '12px', padding: '1rem 1.25rem' }}>
                                  <h5 style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark.red, marginBottom: '8px' }}>✗ Cons</h5>
                                  <ul style={{ paddingLeft: '1rem' }}>{city.cons?.map((c,i) => <li key={i} style={{ fontSize: '0.82rem', color: dark.text2, lineHeight: 1.6, marginBottom: '3px' }}>{c}</li>)}</ul>
                                </div>
                              </div>
                              <div style={{ background: dark.blueDim, border: `1px solid rgba(91,155,213,0.2)`, borderRadius: '12px', padding: '1rem 1.25rem' }}>
                                <h5 style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark.blue, marginBottom: '6px' }}>🛂 Visa</h5>
                                <p style={{ fontSize: '0.82rem', color: dark.text2, lineHeight: 1.65, margin: 0 }}>{city.visa}</p>
                              </div>
                            </>
                          )}

                          {tab === 'cost' && (
                            <>
                              {Object.entries(city.col).map(([k, v], i) => {
                                const pct = Math.round((v / colTotal) * 100);
                                return (
                                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '9px' }}>
                                    <span style={{ fontSize: '1rem', width: '22px', textAlign: 'center', flexShrink: 0 }}>{COL_ICONS[k] || '•'}</span>
                                    <span style={{ fontSize: '0.78rem', color: dark.text2, width: '85px', flexShrink: 0 }}>{k.charAt(0).toUpperCase() + k.slice(1)}</span>
                                    <div style={{ flex: 1, height: '7px', background: dark.bg3, borderRadius: '4px', overflow: 'hidden' }}>
                                      <div style={{ height: '100%', borderRadius: '4px', width: `${pct}%`, background: COL_COLORS[i % COL_COLORS.length] }} />
                                    </div>
                                    <span style={{ fontSize: '0.76rem', fontWeight: 500, color: dark.text, width: '55px', textAlign: 'right', flexShrink: 0 }}>${fmt(v)}</span>
                                  </div>
                                );
                              })}
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', padding: '10px 14px', background: dark.bg3, borderRadius: '10px', marginTop: '10px' }}>
                                <span style={{ color: dark.text2 }}>Estimated monthly total</span>
                                <span style={{ fontWeight: 600, color: dark.gold }}>${fmt(colTotal)}</span>
                              </div>
                            </>
                          )}

                          {tab === 'hoods' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                              {city.neighborhoods?.map((n, i) => {
                                const parts = n.split(' — ');
                                return (
                                  <div key={i} style={{ background: dark.bg3, borderRadius: '11px', padding: '0.875rem 1.1rem', display: 'flex', gap: '10px' }}>
                                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: dark.gold, flexShrink: 0, marginTop: '6px' }} />
                                    <div style={{ fontSize: '0.83rem', color: dark.text2, lineHeight: 1.55 }}>
                                      <strong style={{ color: dark.text, fontWeight: 500 }}>{parts[0]}</strong>
                                      {parts[1] ? ` — ${parts[1]}` : ''}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Italy CTA */}
            <div style={{ background: 'rgba(193,68,14,0.1)', border: '1px solid rgba(193,68,14,0.25)', borderRadius: '20px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🇮🇹</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', letterSpacing: '0.03em', color: dark.text, marginBottom: '0.4rem' }}>Curious About Italy Specifically?</h3>
                <p style={{ fontSize: '0.85rem', color: dark.text2, maxWidth: '420px', lineHeight: 1.65 }}>
                  We have a dedicated Italy tool — salary calculator with IRPEF tax, interactive visa guide, 12 Italian city guides and practical expat guides.
                </p>
              </div>
              <Link to="/" style={{ padding: '13px 28px', borderRadius: '100px', background: '#C1440E', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', flexShrink: 0 }}>
                Italy Relocation Calculator →
              </Link>
            </div>

            <Link to="/explore/quiz" style={{ display: 'block', textAlign: 'center', padding: '12px 36px', borderRadius: '100px', border: `1px solid ${dark.border2}`, color: dark.text2, textDecoration: 'none', fontSize: '0.88rem', marginTop: '1rem' }}>
              ↺ Retake the quiz
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
