import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// ─── VISA DATA ────────────────────────────────────────────────────────────────

const VISAS = {
  eu_freedom: {
    name: 'EU Freedom of Movement',
    icon: '🇪🇺',
    color: '#1a5c9e',
    tag: 'EU Citizens',
    summary: 'As an EU/EEA/Swiss citizen you have the right to live and work in Italy without a visa. You must register with the local municipality (anagrafe) within 3 months of arrival.',
    requirements: ['Valid EU passport or ID card', 'Register at local anagrafe within 90 days', 'Proof of sufficient resources or employment after 3 months', 'Health insurance if not employed'],
    timeline: '2–4 weeks for registration',
    cost: '~€20 registration fee',
    pros: ['No income threshold', 'Right to work immediately', 'Path to permanent residency after 5 years', 'No visa application required'],
    cons: ['Must register within 90 days', 'Some bureaucracy for residency card'],
    bestFor: 'All EU/EEA/Swiss citizens',
    link: 'https://www.esteri.it/en/living-and-working-abroad/',
  },
  digital_nomad: {
    name: 'Digital Nomad / Remote Worker Visa',
    icon: '💻',
    color: '#C1440E',
    tag: 'Most Popular',
    summary: "Italy's Digital Nomad Visa (Visto per Lavoratori da Remoto) allows non-EU remote workers and freelancers to live in Italy for 1 year, renewable. One of Europe's more straightforward nomad visa options.",
    requirements: ['Minimum €28,000/year gross income from remote work', 'Employment contract or freelance clients outside Italy', 'Private health insurance covering Italy', 'Proof of accommodation in Italy', 'Clean criminal record'],
    timeline: '1–3 months (apply at Italian consulate in home country)',
    cost: '~€116 visa fee + insurance + document costs (~€500–1,000 total)',
    pros: ['1 year renewable', 'Can work for non-Italian employers', 'Path to longer residency', 'Eligible for Impatriates tax regime (50% exemption)', 'Includes family members'],
    cons: ['€28,000/year income threshold', 'Must apply from home country (not in Italy)', 'Processing can be slow at some consulates', 'Health insurance required'],
    bestFor: 'Remote workers, freelancers, and digital nomads earning €28k+/year',
    link: 'https://vistoperitalia.esteri.it/home/en',
  },
  elective_residency: {
    name: 'Elective Residency Visa',
    icon: '🏡',
    color: '#2D7D52',
    tag: 'Retirees & Passive Income',
    summary: 'The Visto per Residenza Elettiva is designed for people who want to live in Italy without working — retirees, people with investment income, rental income, or other passive income sources.',
    requirements: ['Minimum €31,000/year passive income (pension, investments, rental)', '€38,000 for couples', 'Proof of accommodation (owned or rented)', 'Health insurance', 'No intention to work in Italy'],
    timeline: '1–4 months',
    cost: '~€116 visa fee + associated costs',
    pros: ['No need to work', 'Renewable annually', 'Can include family', 'Access to Italian public healthcare after registration', 'Beautiful quality of life'],
    cons: ['Cannot work in Italy', 'Higher income threshold than Digital Nomad', 'Must demonstrate stable passive income', 'Processing can be slow'],
    bestFor: 'Retirees, investors, and people with sufficient passive income who want to live in Italy without working',
    link: 'https://vistoperitalia.esteri.it/home/en',
  },
  employment: {
    name: 'Work Visa (Nulla Osta)',
    icon: '👔',
    color: '#C8882A',
    tag: 'Job Offer Required',
    summary: "Italy's employment visa requires a job offer from an Italian employer. The employer applies for a Nulla Osta (work clearance) through the Italian immigration system, then you apply for the visa. Italy has an annual quota (flussi) for non-EU workers.",
    requirements: ['Job offer from Italian employer', 'Employer obtains Nulla Osta from Italian immigration authority', 'Quota availability under annual flussi decree', 'Relevant qualifications', 'Clean criminal record'],
    timeline: '3–8 months (dependent on quota availability)',
    cost: 'Visa fee + employer processing costs',
    pros: ['Full work rights in Italy', 'Employer handles most bureaucracy', 'Path to permanent residency', 'Eligible for Impatriates regime'],
    cons: ['Dependent on employer', 'Annual quotas often oversubscribed', 'Long and unpredictable timeline', 'Tied to specific employer initially'],
    bestFor: 'Professionals with a confirmed job offer from an Italian company',
    link: 'https://www.interno.gov.it/en/themes/immigration/entry-work-reasons',
  },
  highly_skilled: {
    name: 'EU Blue Card',
    icon: '🔵',
    color: '#1a5c9e',
    tag: 'Skilled Professionals',
    summary: "The EU Blue Card is designed for highly qualified non-EU workers with a job offer meeting minimum salary thresholds. Italy's version requires a minimum salary of ~€35,000 for most sectors.",
    requirements: ['Job offer from Italian employer with minimum salary (~€35,000)', 'University degree (min. 3 years) or 5 years equivalent experience', 'Relevant professional qualifications', 'Health insurance'],
    timeline: '2–4 months',
    cost: '~€200 application fee',
    pros: ['Valid for up to 4 years', 'Easier path to permanent residency (5 years)', 'EU portability (can move to other EU countries after 18 months)', 'Full work rights', 'Family reunification'],
    cons: ['Requires job offer', 'Salary threshold', 'University degree required for most applications'],
    bestFor: 'Highly qualified professionals (engineers, doctors, IT, finance) with a job offer in Italy',
    link: 'https://www.interno.gov.it/en',
  },
  investor: {
    name: 'Investor Visa (Golden Visa)',
    icon: '💰',
    color: '#C8882A',
    tag: 'High Net Worth',
    summary: "Italy's Investor Visa is aimed at non-EU nationals making qualifying investments in Italy. It's a 2-year renewable visa with a clear path to permanent residency.",
    requirements: [
      'One of: €2M in Italian govt bonds, €500k in Italian company, €250k in innovative startup, or €1M donation to public interest projects',
      'Clean criminal record', 'Valid health insurance', 'Sufficient accommodation',
    ],
    timeline: '30 days for initial clearance (fast track)',
    cost: 'Investment amount + ~€5,000 in fees',
    pros: ['Fast 30-day processing', 'Includes family members', '2-year validity, renewable to 3 years', 'Path to permanent residency after 5 years', 'No language requirement'],
    cons: ['Very high investment threshold', 'Complex compliance requirements', 'Returns on Italian government bonds currently modest'],
    bestFor: 'High net worth individuals looking to establish Italian residency through investment',
    link: 'https://investorsivisa.mise.gov.it/',
  },
  student: {
    name: 'Student Visa (Visto per Studio)',
    icon: '🎓',
    color: '#7A5A9A',
    tag: 'Students',
    summary: "For enrollment at Italian universities or language schools. Italy has excellent universities — several rank in the world top 200. Tuition fees are among the lowest in Europe (€900–3,500/year for public universities).",
    requirements: ['Acceptance letter from Italian university or institution', 'Proof of sufficient funds (€5,000–8,000/year)', 'Health insurance', 'Accommodation proof', 'Pre-enrollment through Italian Ministry of University'],
    timeline: '1–2 months',
    cost: '~€116 visa fee',
    pros: ['Low tuition fees at Italian universities', 'Can work part-time (max 20 hrs/week)', 'Pathway to post-study work permit', 'Access to Italian student healthcare'],
    cons: ['Cannot work full time', 'Must demonstrate funds annually', 'Pre-enrollment process (Universitaly) can be complex'],
    bestFor: 'Students enrolled in Italian universities, language programmes, or research programmes',
    link: 'https://www.universitaly.it/',
  },
};

// ─── QUESTIONS ────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 'nationality',
    title: 'What is your nationality?',
    sub: 'This is the single most important factor for Italian immigration.',
    options: [
      { icon: '🇪🇺', label: 'EU / EEA / Swiss', value: 'eu' },
      { icon: '🇺🇸', label: 'US / UK / CA / AU / NZ', value: 'strong' },
      { icon: '🌏', label: 'Other — strong passport (Japan, Singapore, etc.)', value: 'strong' },
      { icon: '🌐', label: 'Other nationality', value: 'other' },
    ],
  },
  {
    id: 'purpose',
    title: 'Why are you moving to Italy?',
    sub: 'Your purpose determines which visa category applies.',
    options: [
      { icon: '💻', label: 'Remote work / freelance for non-Italian clients', value: 'nomad' },
      { icon: '👔', label: 'I have / am seeking a job with an Italian employer', value: 'work' },
      { icon: '🏡', label: 'Retirement / passive income / lifestyle', value: 'passive' },
      { icon: '🎓', label: 'Study at an Italian university', value: 'study' },
      { icon: '💰', label: 'Investment / high net worth', value: 'invest' },
    ],
  },
  {
    id: 'income',
    title: 'What is your annual income or budget?',
    sub: 'Italian visas have minimum income thresholds.',
    options: [
      { icon: '💸', label: 'Under €28,000/year', value: 'low' },
      { icon: '💵', label: '€28,000 – €40,000/year', value: 'mid' },
      { icon: '💳', label: '€40,000 – €100,000/year', value: 'high' },
      { icon: '💎', label: 'Over €100,000/year or significant assets', value: 'wealthy' },
    ],
  },
  {
    id: 'duration',
    title: 'How long do you plan to stay?',
    sub: 'Short stays may have different options than permanent relocation.',
    options: [
      { icon: '🗓️', label: 'Up to 90 days', value: 'short' },
      { icon: '📅', label: '6 months – 2 years', value: 'medium' },
      { icon: '🏠', label: '2–5 years', value: 'long' },
      { icon: '♾️', label: 'Permanently / indefinitely', value: 'permanent' },
    ],
  },
];

function getRecommendations(answers) {
  const { nationality, purpose, income, duration } = answers;
  const results = [];

  if (nationality === 'eu') {
    results.push({ key: 'eu_freedom', priority: 1 });
    return results;
  }

  if (duration === 'short') {
    return [{ key: 'elective_residency', priority: 1, note: 'For stays under 90 days, most strong passports need no visa at all (Schengen 90-day rule). Check your specific country.' }];
  }

  if (purpose === 'nomad') {
    if (income !== 'low') results.push({ key: 'digital_nomad', priority: 1 });
    if (income === 'low') results.push({ key: 'digital_nomad', priority: 1, note: 'The Digital Nomad Visa requires €28,000/year minimum. You may need to increase your income or explore alternative routes.' });
    if (income === 'high' || income === 'wealthy') results.push({ key: 'highly_skilled', priority: 2 });
  }

  if (purpose === 'work') {
    results.push({ key: 'employment', priority: 1 });
    if (income === 'high' || income === 'wealthy') results.push({ key: 'highly_skilled', priority: 2 });
    results.push({ key: 'digital_nomad', priority: 3 });
  }

  if (purpose === 'passive') {
    results.push({ key: 'elective_residency', priority: 1 });
    if (income === 'wealthy') results.push({ key: 'investor', priority: 2 });
  }

  if (purpose === 'invest') {
    results.push({ key: 'investor', priority: 1 });
    results.push({ key: 'elective_residency', priority: 2 });
  }

  if (purpose === 'study') {
    results.push({ key: 'student', priority: 1 });
    results.push({ key: 'digital_nomad', priority: 2 });
  }

  if (results.length === 0) {
    results.push({ key: 'elective_residency', priority: 1 });
    results.push({ key: 'digital_nomad', priority: 2 });
  }

  return results.sort((a, b) => a.priority - b.priority);
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const S = {
  page: { minHeight: '100vh', background: 'var(--cream)', paddingTop: '62px' },
  hero: { background: 'var(--sand)', borderBottom: '1px solid var(--sand3)', padding: '60px clamp(1.25rem,5vw,4rem) 48px' },
  heroInner: { maxWidth: '900px', margin: '0 auto' },
  eyebrow: { fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.75rem' },
  h1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.05, color: 'var(--warm-dark)', marginBottom: '0.5rem' },
  wrap: { maxWidth: '800px', margin: '0 auto', padding: '3rem clamp(1.25rem,5vw,4rem) 5rem' },
  breadcrumb: { display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: 'var(--warm-muted)', marginBottom: '1.5rem' },
  breadLink: { color: 'var(--warm-muted)', textDecoration: 'none' },
};

export default function VisaGuide() {
  const [step, setStep] = useState(0); // 0 = intro, 1-4 = questions, 5 = results
  const [answers, setAnswers] = useState({});

  const totalSteps = QUESTIONS.length;

  function selectAnswer(qId, value) {
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      setStep(s => {
        const next = s + 1;
        return next; // always advance — results shown when step > totalSteps
      });
    }, 280);
  }

  function reset() {
    setAnswers({});
    setStep(0);
  }

  const q = step >= 1 && step <= totalSteps ? QUESTIONS[step - 1] : null;
  const recommendations = step > totalSteps ? getRecommendations(answers) : [];

  return (
    <>
      <Helmet>
        <title>Italy Visa Guide 2025 — Which Visa Do You Need? | Italy Relocation Calculator</title>
        <meta name="description" content="Find the right Italian visa for your situation. Interactive guide covering the Digital Nomad Visa, Elective Residency, EU Blue Card, Investor Visa and more. Updated for 2025." />
        <meta name="keywords" content="Italy visa guide 2025, Italian digital nomad visa, elective residency visa Italy, Italy work visa, move to Italy visa requirements, visto per lavoratori da remoto" />
        <link rel="canonical" href="https://italy-relocation-calculator.netlify.app/visa" />
        <meta property="og:title" content="Italy Visa Guide 2025 — Which Visa Do You Need?" />
        <meta property="og:description" content="Interactive guide to Italian visas. Find the right route for remote workers, retirees, investors and more." />
        <meta property="og:url" content="https://italy-relocation-calculator.netlify.app/visa" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Italy Visa Guide 2025: Which Visa Do You Need?",
          "description": "Complete guide to Italian visa options for expats — Digital Nomad, Elective Residency, EU Blue Card, Investor Visa and more.",
          "author": { "@type": "Organization", "name": "Italy Relocation Calculator" },
          "datePublished": "2025-03-01",
          "dateModified": "2025-04-17",
          "mainEntityOfPage": "https://italy-relocation-calculator.netlify.app/visa",
        })}</script>
      </Helmet>

      <div style={S.page}>
        <header style={S.hero}>
          <div style={S.heroInner}>
            <nav style={S.breadcrumb} aria-label="Breadcrumb">
              <Link to="/" style={S.breadLink}>Calculator</Link>
              <span>›</span>
              <span>Visa Guide</span>
            </nav>
            <div style={S.eyebrow}>🇮🇹 Italy · 2025 Visa Routes</div>
            <h1 style={S.h1}>Which Italian Visa<br /><em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>Is Right for You?</em></h1>
            <p style={{ fontSize: '1rem', color: 'var(--warm-mid)', fontWeight: 300, lineHeight: 1.75, maxWidth: '540px', marginTop: '0.75rem' }}>
              Answer 4 questions and get a personalised recommendation from 7 Italian visa categories. Updated for 2025.
            </p>
          </div>
        </header>

        <div style={S.wrap}>

          {/* INTRO */}
          {step === 0 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px', marginBottom: '2.5rem' }}>
                {Object.entries(VISAS).map(([key, visa]) => (
                  <div key={key} style={{ background: 'white', border: '1px solid var(--sand3)', borderRadius: '14px', padding: '1.25rem', borderTop: `3px solid ${visa.color}` }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{visa.icon}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--warm-dark)', marginBottom: '4px' }}>{visa.name}</div>
                    <div style={{ fontSize: '0.72rem', padding: '2px 9px', borderRadius: '100px', background: `${visa.color}15`, color: visa.color, border: `1px solid ${visa.color}30`, fontWeight: 600, display: 'inline-block', marginBottom: '6px' }}>{visa.tag}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--warm-muted)' }}>{visa.bestFor}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                style={{ display: 'block', width: '100%', padding: '16px 28px', borderRadius: '100px', border: 'none', background: 'var(--terra)', color: 'white', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", boxShadow: '0 4px 20px rgba(193,68,14,0.25)' }}>
                Find My Visa →
              </button>
            </div>
          )}

          {/* QUIZ */}
          {step >= 1 && step <= totalSteps && q && (
            <div>
              {/* Progress */}
              <div style={{ height: '3px', background: 'var(--sand3)', borderRadius: '2px', marginBottom: '2.5rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--terra)', borderRadius: '2px', width: `${((step - 1) / totalSteps) * 100}%`, transition: 'width 0.4s ease' }} />
              </div>

              <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-muted)', marginBottom: '0.75rem' }}>
                Question {step} of {totalSteps}
              </div>

              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 700, color: 'var(--warm-dark)', marginBottom: '0.5rem', lineHeight: 1.15 }}>
                {q.title}
              </h2>
              {q.sub && <p style={{ fontSize: '0.95rem', color: 'var(--warm-mid)', marginBottom: '2rem', fontWeight: 300 }}>{q.sub}</p>}

              <div style={{ display: 'grid', gridTemplateColumns: q.options.length > 3 ? '1fr 1fr' : '1fr', gap: '10px' }}>
                {q.options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => selectAnswer(q.id, opt.value)}
                    style={{ padding: '1rem 1.25rem', borderRadius: '14px', border: `1.5px solid ${answers[q.id] === opt.value ? 'var(--terra)' : 'var(--sand3)'}`, background: answers[q.id] === opt.value ? 'var(--terra-dim)' : 'white', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.15s', fontFamily: "'DM Sans', sans-serif" }}>
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{opt.icon}</span>
                    <span style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--warm-dark)' }}>{opt.label}</span>
                  </button>
                ))}
              </div>

              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} style={{ marginTop: '1.5rem', padding: '10px 22px', borderRadius: '100px', border: '1px solid var(--sand3)', background: 'transparent', color: 'var(--warm-muted)', fontSize: '0.88rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  ← Back
                </button>
              )}
            </div>
          )}

          {/* RESULTS */}
          {step > totalSteps && recommendations.length > 0 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: 'var(--warm-dark)', marginBottom: '0.5rem' }}>
                Your Recommended Visa Route{recommendations.length > 1 ? 's' : ''}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--warm-mid)', marginBottom: '2rem', fontWeight: 300 }}>
                Based on your answers, here are the most relevant Italian visa options for you.
              </p>

              {recommendations.map(({ key, note }, idx) => {
                const visa = VISAS[key];
                if (!visa) return null;
                const isPrimary = idx === 0;
                return (
                  <div key={key} style={{ background: 'white', border: `1px solid ${isPrimary ? visa.color + '50' : 'var(--sand3)'}`, borderTop: `3px solid ${visa.color}`, borderRadius: '20px', padding: '1.75rem 2rem', marginBottom: '1.25rem', boxShadow: isPrimary ? `0 4px 24px ${visa.color}15` : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '2rem', flexShrink: 0 }}>{visa.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: 'var(--warm-dark)' }}>{visa.name}</h3>
                          {isPrimary && <span style={{ fontSize: '0.7rem', padding: '2px 10px', borderRadius: '100px', background: `${visa.color}15`, color: visa.color, border: `1px solid ${visa.color}30`, fontWeight: 600 }}>Best Match</span>}
                          <span style={{ fontSize: '0.7rem', padding: '2px 10px', borderRadius: '100px', background: 'var(--sand)', color: 'var(--warm-muted)', fontWeight: 500 }}>{visa.tag}</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--warm-mid)', lineHeight: 1.7 }}>{visa.summary}</p>
                      </div>
                    </div>

                    {note && (
                      <div style={{ background: 'rgba(193,68,14,0.08)', border: '1px solid rgba(193,68,14,0.2)', borderRadius: '10px', padding: '0.875rem 1rem', marginBottom: '1rem', fontSize: '0.82rem', color: 'var(--warm-mid)', lineHeight: 1.65 }}>
                        <strong style={{ color: 'var(--terra)' }}>⚠️ Note: </strong>{note}
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1rem' }}>
                      <div style={{ background: 'var(--sand)', borderRadius: '10px', padding: '0.875rem' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--warm-muted)', marginBottom: '4px' }}>Timeline</div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--warm-dark)' }}>{visa.timeline}</div>
                      </div>
                      <div style={{ background: 'var(--sand)', borderRadius: '10px', padding: '0.875rem' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--warm-muted)', marginBottom: '4px' }}>Cost</div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--warm-dark)' }}>{visa.cost}</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.25rem' }}>
                      <div style={{ background: 'rgba(45,125,82,0.06)', border: '1px solid rgba(45,125,82,0.2)', borderRadius: '10px', padding: '0.875rem' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', color: '#2D7D52', letterSpacing: '0.08em', marginBottom: '6px' }}>✓ Pros</div>
                        <ul style={{ paddingLeft: '1rem' }}>
                          {visa.pros.map(p => <li key={p} style={{ fontSize: '0.8rem', color: 'var(--warm-mid)', lineHeight: 1.55, marginBottom: '3px' }}>{p}</li>)}
                        </ul>
                      </div>
                      <div style={{ background: 'rgba(192,57,43,0.05)', border: '1px solid rgba(192,57,43,0.15)', borderRadius: '10px', padding: '0.875rem' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', color: '#C0392B', letterSpacing: '0.08em', marginBottom: '6px' }}>✗ Cons</div>
                        <ul style={{ paddingLeft: '1rem' }}>
                          {visa.cons.map(c => <li key={c} style={{ fontSize: '0.8rem', color: 'var(--warm-mid)', lineHeight: 1.55, marginBottom: '3px' }}>{c}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--warm-muted)', letterSpacing: '0.08em', marginBottom: '8px' }}>Requirements</div>
                      {visa.requirements.map(r => (
                        <div key={r} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '6px 0', borderBottom: '1px solid var(--sand2)', fontSize: '0.82rem', color: 'var(--warm-mid)' }}>
                          <span style={{ color: 'var(--terra)', flexShrink: 0, marginTop: '1px' }}>✓</span>{r}
                        </div>
                      ))}
                    </div>

                    <a href={visa.link} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '100px', background: visa.color, color: 'white', fontSize: '0.82rem', fontWeight: 500, textDecoration: 'none', transition: 'opacity 0.2s' }}>
                      Official Information ↗
                    </a>
                  </div>
                );
              })}

              <div style={{ display: 'flex', gap: '12px', marginTop: '2rem', flexWrap: 'wrap' }}>
                <button onClick={reset} style={{ padding: '12px 24px', borderRadius: '100px', border: '1px solid var(--sand3)', background: 'transparent', color: 'var(--warm-mid)', fontSize: '0.9rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  ↺ Start Over
                </button>
                <Link to="/" style={{ padding: '12px 24px', borderRadius: '100px', background: 'var(--terra)', color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                  ← Full Relocation Calculator
                </Link>
                <Link to="/salary" style={{ padding: '12px 24px', borderRadius: '100px', border: '1px solid var(--sand3)', color: 'var(--warm-mid)', textDecoration: 'none', fontSize: '0.9rem' }}>
                  Salary Calculator →
                </Link>
              </div>
            </div>
          )}

          {/* All visas reference section (always visible below quiz) */}
          {step === 0 && (
            <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--sand3)' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--warm-dark)', marginBottom: '0.5rem' }}>
                All Italian Visa Routes
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--warm-mid)', marginBottom: '1.5rem' }}>Reference overview of every available route.</p>
              {Object.entries(VISAS).map(([key, visa]) => (
                <div key={key} style={{ borderBottom: '1px solid var(--sand2)', padding: '1.25rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1.2rem' }}>{visa.icon}</span>
                    <span style={{ fontWeight: 600, color: 'var(--warm-dark)', fontSize: '0.95rem' }}>{visa.name}</span>
                    <span style={{ fontSize: '0.7rem', padding: '2px 9px', borderRadius: '100px', background: `${visa.color}15`, color: visa.color, border: `1px solid ${visa.color}25`, fontWeight: 600 }}>{visa.tag}</span>
                  </div>
                  <p style={{ fontSize: '0.83rem', color: 'var(--warm-mid)', lineHeight: 1.65, marginLeft: '2rem' }}>{visa.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
