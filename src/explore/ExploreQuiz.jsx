import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GLOBAL_QUESTIONS } from './globalData';

const dark = {
  bg: '#0A0A0F', bg2: '#12121A', bg3: '#1C1C28',
  border: 'rgba(255,255,255,0.07)', border2: 'rgba(255,255,255,0.13)',
  gold: '#D4A843', text: '#F0EEE8', text2: '#9A9890', text3: '#5A5855',
  terra: '#C1440E',
};

export default function ExploreQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multiSel, setMultiSel] = useState([]);
  const navigate = useNavigate();

  const totalSteps = GLOBAL_QUESTIONS.length;
  const q = GLOBAL_QUESTIONS[step];

  function selectOpt(i) {
    if (q.multi) {
      const next = multiSel.includes(i) ? multiSel.filter(x => x !== i) : [...multiSel, i];
      setMultiSel(next);
      setAnswers(a => ({ ...a, [q.id]: next.map(x => GLOBAL_QUESTIONS[step].options[x].value) }));
    } else {
      setAnswers(a => ({ ...a, [q.id]: q.options[i].value }));
      setTimeout(() => advance(), 280);
    }
  }

  function advance() {
    if (step < totalSteps - 1) {
      setStep(s => s + 1);
      setMultiSel([]);
    } else {
      // Build URL params and go to results
      const params = new URLSearchParams();
      const finalAnswers = { ...answers };
      if (q.multi) finalAnswers[q.id] = multiSel.map(x => q.options[x].value);
      Object.entries(finalAnswers).forEach(([k, v]) => {
        params.set(k, Array.isArray(v) ? v.join(',') : String(v));
      });
      navigate(`/explore/results?${params.toString()}`);
    }
  }

  const progress = (step / totalSteps) * 100;

  return (
    <>
      <Helmet>
        <title>City Matching Quiz — MovAbroad</title>
        <meta name="description" content="Answer 6 questions to get your personalised global expat city ranking." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div style={{ minHeight: '100vh', background: dark.bg, paddingTop: '62px' }}>
        {/* Nav */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(1.25rem,5vw,4rem)', height: '62px', background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${dark.border}` }}>
          <Link to="/explore" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.3rem', letterSpacing: '0.05em', color: dark.text, textDecoration: 'none' }}>
            Mov<span style={{ color: dark.gold }}>Abroad</span>
          </Link>
          <Link to="/" style={{ fontSize: '0.75rem', color: dark.text3, textDecoration: 'none' }}>🇮🇹 Italy Calculator</Link>
        </nav>

        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '80px clamp(1.25rem,5vw,4rem) 80px' }}>
          {/* Progress bar */}
          <div style={{ height: '3px', background: dark.bg3, borderRadius: '2px', marginBottom: '3rem', overflow: 'hidden' }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div style={{ height: '100%', background: dark.gold, borderRadius: '2px', width: `${progress}%`, transition: 'width 0.5s ease' }} />
          </div>

          <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: dark.text3, marginBottom: '1rem' }}>
            Step {step + 1} of {totalSteps}
          </div>

          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem,5vw,3.2rem)', lineHeight: 1.05, letterSpacing: '0.02em', color: dark.text, marginBottom: '0.5rem' }}>
            {q.title}
          </h2>
          {q.sub && <p style={{ fontSize: '0.95rem', color: dark.text2, marginBottom: '2rem', fontWeight: 300 }}>{q.sub}</p>}

          {/* Options */}
          <div style={{ display: 'grid', gridTemplateColumns: q.options.length > 3 ? '1fr 1fr' : '1fr', gap: '10px' }}>
            {q.options.map((opt, i) => {
              const isSel = q.multi ? multiSel.includes(i) : answers[q.id] === opt.value;
              return (
                <button key={i} onClick={() => selectOpt(i)}
                  style={{ padding: '1rem 1.25rem', borderRadius: '14px', border: `1.5px solid ${isSel ? dark.gold : dark.border}`, background: isSel ? 'rgba(212,168,67,0.1)' : dark.bg2, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.18s', fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{opt.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 500, color: dark.text }}>{opt.label}</div>
                    {opt.sub && <div style={{ fontSize: '0.78rem', color: dark.text2, marginTop: '2px' }}>{opt.sub}</div>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '2rem', alignItems: 'center' }}>
            {step > 0 && (
              <button onClick={() => { setStep(s => s - 1); setMultiSel([]); }}
                style={{ padding: '14px 28px', borderRadius: '100px', border: `1px solid ${dark.border2}`, background: 'transparent', color: dark.text2, fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', cursor: 'pointer' }}>
                ← Back
              </button>
            )}
            {q.multi && (
              <button onClick={advance}
                style={{ flex: 1, padding: '14px 28px', borderRadius: '100px', border: 'none', background: dark.gold, color: '#0A0A0F', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
                {step === totalSteps - 1 ? 'See My Results →' : 'Continue →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
