import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const S = {
  page: { minHeight: '100vh', background: 'var(--cream)', paddingTop: '62px' },
  hero: { background: 'var(--sand)', borderBottom: '1px solid var(--sand3)', padding: '60px clamp(1.25rem,5vw,4rem) 48px' },
  heroInner: { maxWidth: '860px', margin: '0 auto' },
  wrap: { maxWidth: '860px', margin: '0 auto', padding: '3rem clamp(1.25rem,5vw,4rem) 5rem' },
  eyebrow: { fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.75rem' },
  h1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.05, color: 'var(--warm-dark)', marginBottom: '0.75rem' },
  sub: { fontSize: '1rem', color: 'var(--warm-mid)', fontWeight: 300, lineHeight: 1.75, maxWidth: '580px' },
  h2: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.35rem,2.5vw,1.9rem)', fontWeight: 700, color: 'var(--warm-dark)', margin: '2.5rem 0 0.875rem', lineHeight: 1.2 },
  h3: { fontSize: '1rem', fontWeight: 600, color: 'var(--warm-dark)', margin: '1.25rem 0 0.5rem' },
  p: { fontSize: '0.92rem', color: 'var(--warm-mid)', lineHeight: 1.85, marginBottom: '0.875rem' },
  callout: { background: 'var(--sand)', border: '1px solid var(--sand3)', borderLeft: '3px solid var(--terra)', borderRadius: '0 12px 12px 0', padding: '1rem 1.25rem', margin: '1.5rem 0', fontSize: '0.875rem', color: 'var(--warm-mid)', lineHeight: 1.7 },
  infoBox: { background: 'rgba(26,92,158,0.06)', border: '1px solid rgba(26,92,158,0.18)', borderRadius: '12px', padding: '1rem 1.25rem', margin: '1.5rem 0', fontSize: '0.875rem', color: 'var(--warm-mid)', lineHeight: 1.7 },
  breadcrumb: { display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: 'var(--warm-muted)', marginBottom: '1.5rem' },
  breadLink: { color: 'var(--warm-muted)', textDecoration: 'none' },
  ctas: { display: 'flex', gap: '12px', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--sand3)', flexWrap: 'wrap' },
  ctaPrimary: { padding: '12px 24px', borderRadius: '100px', background: 'var(--terra)', color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 },
  ctaSecondary: { padding: '12px 24px', borderRadius: '100px', border: '1px solid var(--sand3)', color: 'var(--warm-mid)', textDecoration: 'none', fontSize: '0.9rem' },
  faqItem: { borderBottom: '1px solid var(--sand2)', padding: '1.25rem 0' },
  faqQ: { fontWeight: 600, color: 'var(--warm-dark)', fontSize: '0.95rem', marginBottom: '0.5rem' },
  faqA: { fontSize: '0.88rem', color: 'var(--warm-mid)', lineHeight: 1.75 },
};

function GuideLayout({ title, description, canonical, eyebrow, h1Em, sub, children, ctaLinks }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div style={S.page}>
        <header style={S.hero}>
          <div style={S.heroInner}>
            <nav style={S.breadcrumb} aria-label="Breadcrumb">
              <Link to="/" style={S.breadLink}>Calculator</Link>
              <span>›</span>
              <Link to="/guide" style={S.breadLink}>Guides</Link>
              <span>›</span>
              <span style={{ color: 'var(--warm-dark)' }}>{eyebrow}</span>
            </nav>
            <div style={S.eyebrow}>{eyebrow}</div>
            <h1 style={S.h1}>{h1Em}</h1>
            <p style={S.sub}>{sub}</p>
          </div>
        </header>
        <div style={S.wrap}>
          {children}
          <div style={S.ctas}>
            <Link to="/" style={S.ctaPrimary}>← Relocation Calculator</Link>
            {ctaLinks?.map(({ to, label }) => <Link key={to} to={to} style={S.ctaSecondary}>{label}</Link>)}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── MOVING TO ITALY 2025 ─────────────────────────────────────────────────────
export function MovingToItaly() {
  return (
    <GuideLayout
      title="Moving to Italy in 2025: The Complete Expat Guide | Italy Relocation Calculator"
      description="Everything you need to know about moving to Italy in 2025. Visas, cost of living, healthcare, finding an apartment, banking, bureaucracy and more. The honest guide."
      canonical="https://italy-relocation-calculator.netlify.app/guide/moving-to-italy-2025"
      eyebrow="🇮🇹 Complete Guide · Updated April 2025"
      h1Em={<>Moving to Italy<br /><em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>in 2025</em></>}
      sub="The honest guide to relocating to Italy. What works, what doesn't, and what nobody tells you before you go."
      ctaLinks={[{ to: '/visa', label: 'Visa Guide →' }, { to: '/salary', label: 'Salary Calculator →' }, { to: '/cities', label: 'City Guides →' }]}
    >
      <h2 style={S.h2}>Is 2025 a Good Time to Move to Italy?</h2>
      <p style={S.p}>Yes — with caveats. Italy has made significant improvements to its expat visa infrastructure in recent years. The Digital Nomad Visa launched in 2024 and is now operational. The Impatriates tax regime remains one of Europe's most generous. Remote work normalisation means you no longer need to find an Italian employer to build a life here.</p>
      <p style={S.p}>The challenges haven't disappeared. Italian bureaucracy is genuinely difficult. Housing markets in Rome, Milan, and Florence are competitive. The language barrier is real for anyone settling outside the major cities. But millions of expats navigate these successfully every year.</p>
      <div style={S.callout}><strong>The honest summary:</strong> Italy rewards patience and preparation. Those who arrive with clear plans for housing, income, and legal status tend to thrive. Those who arrive expecting things to "just work out" tend to struggle.</div>

      <h2 style={S.h2}>Step 1: Choose Your Visa Route</h2>
      <p style={S.p}>Your visa situation should be the first thing you resolve, not the last. The main routes for 2025:</p>
      <h3 style={S.h3}>EU Citizens — Freedom of Movement</h3>
      <p style={S.p}>Register at the local anagrafe within 3 months. No income requirement. Can work immediately. Straightforward, if bureaucratically tedious.</p>
      <h3 style={S.h3}>Non-EU Remote Workers — Digital Nomad Visa</h3>
      <p style={S.p}>Requires €28,000/year gross income from remote work or freelance with non-Italian clients. Applied for at the Italian consulate in your home country. Processing: 1–3 months. Valid 1 year, renewable.</p>
      <h3 style={S.h3}>Non-EU Retirees / Passive Income — Elective Residency</h3>
      <p style={S.p}>Requires €31,000/year passive income (pension, investments, rental income). Cannot work in Italy. Apply at your Italian consulate. Most popular route for retirees.</p>
      <div style={S.infoBox}><strong>💡 Tax tip:</strong> Many new residents qualify for the Impatriates Regime — a 50% income exemption (90% in southern regions) for 5 years. This can save tens of thousands of euros per year. Check eligibility before you move. <Link to="/salary" style={{ color: 'var(--blue)' }}>Use our salary calculator</Link> to model the difference.</div>

      <h2 style={S.h2}>Step 2: Choose Your City</h2>
      <p style={S.p}>Italy is not homogeneous. The city you choose will define your experience more than almost any other decision. Key considerations:</p>
      <p style={S.p}><strong>Rome</strong> — Capital, culture, international community. Best for diplomats, NGO workers, and people who want la dolce vita at its most iconic. Budget: €2,200–2,800/month single.</p>
      <p style={S.p}><strong>Milan</strong> — Finance, fashion, career. Best job market in Italy. More expensive, less charming. Budget: €2,800–3,500/month single.</p>
      <p style={S.p}><strong>Bologna</strong> — Best quality of life in Italy, arguably. Best food, affordable, central location. Underrated. Budget: €1,800–2,400/month single.</p>
      <p style={S.p}><strong>Naples</strong> — Cheapest major city, most authentic, most challenging. Budget: €1,500–2,000/month single.</p>
      <p style={S.p}><strong>Sicily (Palermo/Catania)</strong> — Extraordinary affordability and culture. Limited job market. Budget: €1,300–1,700/month single.</p>
      <div style={S.callout}><strong>Use our tools:</strong> <Link to="/cities" style={{ color: 'var(--terra)' }}>Browse all 12 Italian city guides →</Link></div>

      <h2 style={S.h2}>Step 3: Sort Your Codice Fiscale</h2>
      <p style={S.p}>The codice fiscale (CF) is your Italian tax identification number and the key to everything: signing a lease, opening a bank account, getting a SIM card, enrolling in healthcare. Get it first.</p>
      <p style={S.p}>EU citizens can get the CF at the local Agenzia delle Entrate office. Non-EU citizens can sometimes get it via the Italian consulate before arrival. It's usually issued within a few days and is free of charge.</p>

      <h2 style={S.h2}>Step 4: Find an Apartment</h2>
      <p style={S.p}>The Italian rental market is tighter than it was 5 years ago, particularly in Rome, Milan, and Florence. Airbnb has reduced long-term supply in tourist areas. Plan for 2–4 weeks of serious searching.</p>
      <p style={S.p}>Best resources: Idealista.it, Immobiliare.it, Subito.it. Facebook groups in your target city (search "Expats in [city]" or "[city] apartments expats"). Word of mouth remains highly effective in Italy — announce your search in local groups before you arrive.</p>
      <p style={S.p}>Standard leases: Contratto transitorio (1–18 months), Contratto 4+4 (standard 4-year with 4-year renewal), Contratto 3+2 (for use of property as primary residence). Most landlords require 2–3 months deposit, proof of income, and sometimes a guarantor.</p>
      <div style={S.callout}><strong>Common trap:</strong> Never sign a lease without verifying the landlord owns the property (check the visura catastale). Subletting scams exist, particularly in tourist cities and university towns.</div>

      <h2 style={S.h2}>Step 5: Register Your Residency (Residenza)</h2>
      <p style={S.p}>Registering your residenza at the local comune is not optional — it's legally required. It's also what activates your access to the Italian national health service (SSN) and anchors your legal presence in Italy.</p>
      <p style={S.p}>Bring to your appointment: passport, lease or deed of property ownership, codice fiscale, and in some cases proof of income. Processing times vary enormously: Milan and Bologna are relatively fast (2–4 weeks); Rome can take 6–10 weeks.</p>

      <h2 style={S.h2}>Step 6: Enrol in Italian Healthcare (SSN)</h2>
      <p style={S.p}>Once you have residenza, you're entitled to enrol in the Sistema Sanitario Nazionale (SSN) — Italy's public health system. EU citizens and legal non-EU residents can register at the local ASL (Azienda Sanitaria Locale) office.</p>
      <p style={S.p}>You'll be assigned a medico di base (GP). Specialist visits require a referral (impegnativa). Waiting times for non-urgent specialist care can be long — many expats supplement with private insurance for faster access.</p>

      <h2 style={S.h2}>Common Mistakes to Avoid</h2>
      {[
        { q: 'Arriving without a lease', a: 'Many expats arrive in temporary accommodation expecting to find a long-term flat quickly. In competitive markets, this can take weeks. Arrive with at least 4–6 weeks of temporary accommodation booked.' },
        { q: 'Underestimating bureaucracy', a: "Italian bureaucracy is not malicious, but it is slow and requires specific documentation. Every step takes longer than expected. Build in extra time for everything." },
        { q: 'Assuming English is enough', a: 'In Rome and Milan, English is workable in professional contexts. Outside these cities, and in any interaction with Italian government offices, a basic level of Italian makes life significantly easier.' },
        { q: 'Not setting up Italian banking early', a: "You'll need an Italian bank account for direct debits (utilities, rent). Set it up as soon as you have your codice fiscale and residenza. Fintech options (N26, Wise) work as temporary solutions." },
        { q: 'Ignoring the Impatriates regime', a: "Thousands of eligible expats move to Italy each year without applying for the Impatriates tax exemption. This can represent a saving of €5,000–30,000+ per year. Check eligibility before you move." },
      ].map(({ q, a }) => (
        <div key={q} style={S.faqItem}>
          <div style={S.faqQ}>⚠️ {q}</div>
          <div style={S.faqA}>{a}</div>
        </div>
      ))}
    </GuideLayout>
  );
}

// ─── FIND APARTMENT IN ITALY ──────────────────────────────────────────────────
export function FindApartmentItaly() {
  return (
    <GuideLayout
      title="How to Find an Apartment in Italy as an Expat 2025 | Italy Relocation Calculator"
      description="A practical guide to finding and renting an apartment in Italy as a foreigner. Platforms, lease types, what to watch out for, and how to avoid scams. Updated 2025."
      canonical="https://italy-relocation-calculator.netlify.app/guide/find-apartment-italy"
      eyebrow="🏠 Housing Guide · 2025"
      h1Em={<>Finding an Apartment<br /><em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>in Italy</em></>}
      sub="The practical guide to renting in Italy as a foreigner — platforms, lease types, deposits, and the traps to avoid."
      ctaLinks={[{ to: '/guide/moving-to-italy-2025', label: 'Complete Relocation Guide →' }, { to: '/cities', label: 'City Guides →' }]}
    >
      <h2 style={S.h2}>The Italian Rental Market in 2025</h2>
      <p style={S.p}>Italy's rental market has tightened significantly since 2019. The rise of short-term tourism rentals (Airbnb) has reduced long-term housing supply in the most popular cities. Rome, Milan, Florence, and Bologna are the most competitive markets.</p>
      <p style={S.p}>Naples, Palermo, Catania, and Trieste remain relatively accessible. Budget 2–4 weeks for serious searching in a competitive market, and arrive with at least 4–6 weeks of temporary accommodation sorted.</p>

      <h2 style={S.h2}>Where to Search</h2>
      <h3 style={S.h3}>Idealista.it</h3>
      <p style={S.p}>The most comprehensive Italian property portal. Good filtering, high-quality listings, available in English. Best for the full market picture.</p>
      <h3 style={S.h3}>Immobiliare.it</h3>
      <p style={S.p}>Second largest portal. Many agencies list exclusively here. Worth checking both.</p>
      <h3 style={S.h3}>Facebook Groups</h3>
      <p style={S.p}>Search "Expats in Rome / Milan / Florence apartments" and city-specific expat groups. Some of the best off-market listings circulate here. Announce your search — landlords and previous tenants often post in these groups.</p>
      <h3 style={S.h3}>Agencies (Agenzie Immobiliari)</h3>
      <p style={S.p}>Italian estate agents charge both landlord and tenant a commission — typically 1 month's rent + VAT. This is negotiable. They do add value in a competitive market by vetting applications and facilitating contracts.</p>

      <h2 style={S.h2}>Lease Types</h2>
      {[
        { type: 'Contratto 4+4', desc: 'Standard residential lease. 4 years, automatically renewable for another 4. Most secure option for long-term residents. Requires 6-month notice to terminate by either party at the end of each 4-year period.' },
        { type: 'Contratto 3+2 (Canone Concordato)', desc: 'Agreed rent contract at below-market rates set by local municipality. Lower rent in exchange for regulated conditions. Tax benefits for landlord. Good for primary residence.' },
        { type: 'Contratto Transitorio', desc: '1–18 months. For temporary needs. Higher rents than 4+4. Landlord must demonstrate a temporary need (work, study). Widely used despite restrictions.' },
        { type: 'Affitto per Studenti', desc: '6–36 months, for university students. Common in university cities. Requires enrollment documentation.' },
      ].map(({ type, desc }) => (
        <div key={type} style={{ background: 'white', border: '1px solid var(--sand3)', borderRadius: '12px', padding: '1.1rem 1.25rem', marginBottom: '10px' }}>
          <div style={{ fontWeight: 600, color: 'var(--warm-dark)', marginBottom: '4px', fontSize: '0.92rem' }}>{type}</div>
          <div style={{ fontSize: '0.83rem', color: 'var(--warm-mid)', lineHeight: 1.65 }}>{desc}</div>
        </div>
      ))}

      <h2 style={S.h2}>What Landlords Ask For</h2>
      <p style={S.p}>Italian landlords are cautious. Expect to provide:</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {['Passport and codice fiscale', 'Last 3 months payslips or income documentation', 'Employment contract or freelance contract', 'Bank statements (2–3 months)', '2–3 months deposit (sometimes more)', 'Sometimes a guarantor (garante) — an Italian resident who co-signs'].map(item => (
          <li key={item} style={{ fontSize: '0.88rem', color: 'var(--warm-mid)', lineHeight: 1.7, marginBottom: '5px' }}>{item}</li>
        ))}
      </ul>
      <div style={S.callout}><strong>Remote workers:</strong> Provide a detailed letter explaining your work situation, evidence of consistent income, and possibly 3–4 months upfront. Many Italian landlords are unfamiliar with remote work arrangements — clear documentation helps enormously.</div>

      <h2 style={S.h2}>Costs to Budget For</h2>
      {[
        { item: 'Security deposit', cost: '2–3 months rent (sometimes up to 6)' },
        { item: 'First month rent', cost: '1 month upfront at signing' },
        { item: 'Agency commission', cost: '1 month rent + 22% VAT (if using an agent)' },
        { item: 'Contract registration (imposta di registro)', cost: '~2% annual rent, split landlord/tenant' },
        { item: 'Utilities setup', cost: '€100–300 for gas/electricity connection' },
        { item: 'Initial move-in costs', cost: 'Budget €500–1,000 for small furniture/essentials' },
      ].map(({ item, cost }) => (
        <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--sand2)', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--warm-mid)' }}>{item}</span>
          <span style={{ fontWeight: 500, color: 'var(--warm-dark)' }}>{cost}</span>
        </div>
      ))}

      <h2 style={S.h2}>Scams and Red Flags</h2>
      {[
        { flag: 'Price too good to be true', desc: 'If a central Rome apartment is listed at €500/month, it\'s a scam or has a major undisclosed problem.' },
        { flag: 'Landlord is "abroad" and wants deposit before viewing', desc: 'Classic scam. Never transfer money before physically viewing and verifying the property.' },
        { flag: 'No written contract', desc: 'All rental agreements in Italy must be registered with the Agenzia delle Entrate. Verbal agreements have no legal protection.' },
        { flag: 'Landlord refuses registration of residency', desc: 'Some landlords rent unregistered to avoid taxes. This means you cannot register your residenza, which blocks healthcare and other services.' },
      ].map(({ flag, desc }) => (
        <div key={flag} style={{ ...S.faqItem }}>
          <div style={{ ...S.faqQ, color: '#C0392B' }}>⛔ {flag}</div>
          <div style={S.faqA}>{desc}</div>
        </div>
      ))}
    </GuideLayout>
  );
}

// ─── HEALTHCARE IN ITALY ──────────────────────────────────────────────────────
export function HealthcareItaly() {
  return (
    <GuideLayout
      title="Italian Healthcare for Expats 2025 — SSN Guide | Italy Relocation Calculator"
      description="How to access Italian public healthcare (SSN) as an expat. How to register, find a GP, use the system, and what to do about waiting times. Complete guide for 2025."
      canonical="https://italy-relocation-calculator.netlify.app/guide/healthcare-italy-expat"
      eyebrow="🏥 Healthcare Guide · 2025"
      h1Em={<>Italian Healthcare<br /><em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>for Expats</em></>}
      sub="How Italy's public health system (SSN) works, how to access it as a foreigner, and what to expect in practice."
      ctaLinks={[{ to: '/guide/moving-to-italy-2025', label: 'Complete Relocation Guide →' }, { to: '/guide/open-bank-account-italy', label: 'Banking Guide →' }]}
    >
      <h2 style={S.h2}>Italy's Public Health System (SSN)</h2>
      <p style={S.p}>Italy's Sistema Sanitario Nazionale (SSN) is a public, universal healthcare system funded through taxation. It covers all Italian citizens and legal residents. Quality varies significantly by region — the north (Lombardy, Emilia-Romagna, Tuscany, Veneto) has some of Europe's best public healthcare. The south is more variable.</p>
      <p style={S.p}>Once you establish legal residency (residenza) and register with the SSN, you're entitled to:</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {['A primary care GP (medico di base)', 'Emergency care (Pronto Soccorso)', 'Specialist consultations with referral', 'Hospital care', 'Prescription medications at subsidised rates', 'Preventive care and screenings'].map(item => (
          <li key={item} style={{ fontSize: '0.88rem', color: 'var(--warm-mid)', lineHeight: 1.7, marginBottom: '5px' }}>{item}</li>
        ))}
      </ul>

      <h2 style={S.h2}>How to Register with the SSN</h2>
      <p style={S.p}>Registration happens at your local ASL (Azienda Sanitaria Locale) office — the regional health authority. Go in person with:</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {['Passport', 'Codice fiscale', 'Proof of residenza (or at least an address registration receipt)', 'For non-EU: valid residence permit (permesso di soggiorno)', 'EU citizens: valid EU identity card or passport'].map(item => (
          <li key={item} style={{ fontSize: '0.88rem', color: 'var(--warm-mid)', lineHeight: 1.7, marginBottom: '5px' }}>{item}</li>
        ))}
      </ul>
      <p style={S.p}>You'll be given a tesserino sanitario (health card) and can choose your medico di base from the available list in your area.</p>
      <div style={S.callout}><strong>Important:</strong> In some regions (particularly in the north), SSN registration for EU citizens is immediate upon residenza. For non-EU citizens it typically requires the permesso di soggiorno first. Private insurance is advisable while you wait.</div>

      <h2 style={S.h2}>The Medico di Base (GP)</h2>
      <p style={S.p}>Your medico di base is your gateway to the Italian health system. All specialist referrals (impegnativa) flow through them. Finding a GP who speaks English can require effort outside major cities — ask in expat Facebook groups for recommendations.</p>
      <p style={S.p}>GP visits are free. Specialist visits via SSN require a ticket (ticket sanitario) — a co-payment that varies by region, typically €20–50, with exemptions for chronic conditions, low income, and pregnancy.</p>

      <h2 style={S.h2}>Waiting Times: The Honest Picture</h2>
      <p style={S.p}>Public sector waiting times in Italy are significant — particularly for non-urgent specialist care and certain diagnostics. An MRI scan via the SSN might have a 6–18 month wait in some regions. Cancer screenings and urgent cases are prioritised.</p>
      <p style={S.p}>Most expats and many Italians use a combination of SSN for primary care and private healthcare (intramoenia or fully private) for faster specialist access. Private specialist visits typically cost €80–250. Many doctors who work in the SSN also have private practices.</p>

      <h2 style={S.h2}>Private Health Insurance</h2>
      <p style={S.p}>Even with SSN access, many expats maintain private health insurance for faster access and English-speaking doctors. Options:</p>
      {[
        { name: 'International health insurance', desc: 'Companies like AXA, Cigna, Allianz Care, and BUPA offer expat health plans. Typically €100–250/month depending on age and coverage. Covers private hospitals globally.' },
        { name: 'Italian private insurance', desc: 'Local Italian insurers (Unisalute, Generali, Poste Assicura) offer plans from €30–100/month. More limited coverage but adequate for most routine needs.' },
        { name: 'ASL supplementary', desc: 'Some regions offer supplementary coverage through the ASL system at modest cost.' },
      ].map(({ name, desc }) => (
        <div key={name} style={{ background: 'white', border: '1px solid var(--sand3)', borderRadius: '12px', padding: '1.1rem 1.25rem', marginBottom: '10px' }}>
          <div style={{ fontWeight: 600, color: 'var(--warm-dark)', marginBottom: '4px', fontSize: '0.92rem' }}>{name}</div>
          <div style={{ fontSize: '0.83rem', color: 'var(--warm-mid)', lineHeight: 1.65 }}>{desc}</div>
        </div>
      ))}

      <h2 style={S.h2}>Emergency Care</h2>
      <p style={S.p}>Italy's emergency services (Pronto Soccorso) are available to everyone regardless of insurance or residency status. Emergency number: <strong>118</strong> (medical), <strong>112</strong> (general emergency). The Pronto Soccorso in major Italian hospitals is generally good quality — particularly in the north. Treatment is free for genuine emergencies.</p>
    </GuideLayout>
  );
}

// ─── OPEN BANK ACCOUNT ────────────────────────────────────────────────────────
export function BankAccountItaly() {
  return (
    <GuideLayout
      title="How to Open a Bank Account in Italy as a Foreigner 2025 | Italy Relocation Calculator"
      description="A practical guide to opening an Italian bank account as an expat or foreigner. Traditional banks, online options, requirements and tips for non-residents. Updated 2025."
      canonical="https://italy-relocation-calculator.netlify.app/guide/open-bank-account-italy"
      eyebrow="🏦 Banking Guide · 2025"
      h1Em={<>Banking in Italy<br /><em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>as an Expat</em></>}
      sub="How to open an Italian bank account, which banks are best for expats, and your options if you're not yet a resident."
      ctaLinks={[{ to: '/guide/moving-to-italy-2025', label: 'Complete Relocation Guide →' }, { to: '/guide/healthcare-italy-expat', label: 'Healthcare Guide →' }]}
    >
      <h2 style={S.h2}>Do You Need an Italian Bank Account?</h2>
      <p style={S.p}>For short visits: no. For anyone living in Italy long-term: yes, eventually. An Italian IBAN is required for paying rent via direct debit, utility bills, Italian payroll, and many subscription services. Many landlords will only accept SEPA transfers from an Italian account.</p>

      <h2 style={S.h2}>Requirements for Opening an Account</h2>
      <p style={S.p}>Italian banks require:</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {['Valid passport', 'Codice fiscale (mandatory)', 'Proof of address in Italy (utility bill, lease, or residency certificate)', 'For non-residents: some banks require an Italian address even before formal residency — a lease works', 'Sometimes: proof of income or employment'].map(item => (
          <li key={item} style={{ fontSize: '0.88rem', color: 'var(--warm-mid)', lineHeight: 1.7, marginBottom: '5px' }}>{item}</li>
        ))}
      </ul>
      <div style={S.callout}><strong>Get your codice fiscale first.</strong> It's impossible to open an Italian bank account without one. This should be your very first administrative step on arrival.</div>

      <h2 style={S.h2}>Traditional Italian Banks</h2>
      {[
        { name: 'Intesa Sanpaolo', pros: 'Largest Italian bank, branches everywhere, English-speaking staff at major branches', cons: 'Monthly fees €10–15, variable English service' },
        { name: 'UniCredit', pros: 'International, English online banking, widely accepted', cons: 'Fees similar to Intesa, some bureaucracy' },
        { name: 'BancoPosta (Poste Italiane)', pros: 'Present in every small town, basic services reliable, lower fees', cons: 'Less sophisticated services, slower international transfers' },
        { name: 'FinecoBank', pros: 'Best Italian digital bank, excellent online/app, investment services, lower fees', cons: 'Less physical presence, required minimum activity' },
      ].map(({ name, pros, cons }) => (
        <div key={name} style={{ background: 'white', border: '1px solid var(--sand3)', borderRadius: '12px', padding: '1.1rem 1.25rem', marginBottom: '10px' }}>
          <div style={{ fontWeight: 600, color: 'var(--warm-dark)', marginBottom: '8px', fontSize: '0.92rem' }}>{name}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ fontSize: '0.8rem', color: '#2D7D52' }}>✓ {pros}</div>
            <div style={{ fontSize: '0.8rem', color: '#C0392B' }}>✗ {cons}</div>
          </div>
        </div>
      ))}

      <h2 style={S.h2}>Fintech & International Options</h2>
      <p style={S.p}>For new arrivals who haven't yet established residency, international fintechs can bridge the gap:</p>
      {[
        { name: 'Wise (formerly TransferWise)', desc: 'Get an Italian IBAN immediately. Excellent exchange rates. Not a full bank but works for most expat needs before you establish Italian banking. No monthly fees for basic account.' },
        { name: 'N26', desc: 'German digital bank with Italian IBAN. Full current account, free basic tier, excellent app. Widely accepted by Italian landlords and utilities.' },
        { name: 'Revolut', desc: 'Not Italian banking per se, but a Lithuanian IBAN (SEPA compatible). Works for most payments. Good for managing multiple currencies.' },
      ].map(({ name, desc }) => (
        <div key={name} style={{ background: 'var(--sand)', border: '1px solid var(--sand3)', borderRadius: '12px', padding: '1.1rem 1.25rem', marginBottom: '10px' }}>
          <div style={{ fontWeight: 600, color: 'var(--warm-dark)', marginBottom: '4px', fontSize: '0.92rem' }}>{name}</div>
          <div style={{ fontSize: '0.83rem', color: 'var(--warm-mid)', lineHeight: 1.65 }}>{desc}</div>
        </div>
      ))}
      <div style={S.infoBox}><strong>Recommended approach:</strong> Open a Wise or N26 account before you arrive in Italy. Use it for the first 2–3 months while establishing residenza and codice fiscale. Then open a proper Italian account (FinecoBank is highly regarded) for long-term use.</div>

      <h2 style={S.h2}>Sending Money to Italy</h2>
      <p style={S.p}>For transferring savings or regular income from abroad, Wise offers the best exchange rates and lowest fees for most currency pairs. For large transfers (€50,000+), specialist FX brokers (Currencies Direct, Moneycorp) typically offer better rates than Wise.</p>
      <p style={S.p}>Avoid using traditional bank international transfers where possible — the spread on exchange rates is typically 2–3% higher than specialist services. On a €50,000 transfer, that's €1,000–1,500 lost unnecessarily.</p>
    </GuideLayout>
  );
}

// ─── GUIDES INDEX ─────────────────────────────────────────────────────────────
export function GuidesIndex() {
  const guides = [
    { to: '/guide/moving-to-italy-2025', icon: '🇮🇹', title: 'Moving to Italy in 2025', desc: 'The complete guide to relocating to Italy — visas, housing, bureaucracy, healthcare and more.', tag: 'Complete Guide' },
    { to: '/guide/find-apartment-italy', icon: '🏠', title: 'Finding an Apartment in Italy', desc: 'Platforms, lease types, what landlords require, costs, and scams to avoid.', tag: 'Housing' },
    { to: '/guide/healthcare-italy-expat', icon: '🏥', title: 'Italian Healthcare for Expats', desc: 'How the SSN works, how to register, GP selection, waiting times, and private insurance.', tag: 'Healthcare' },
    { to: '/guide/open-bank-account-italy', icon: '🏦', title: 'Banking in Italy as an Expat', desc: 'How to open an Italian bank account, best banks for expats, and fintech alternatives.', tag: 'Finance' },
  ];

  return (
    <>
      <Helmet>
        <title>Italy Expat Guides 2025 | Italy Relocation Calculator</title>
        <meta name="description" content="Practical guides for moving to Italy as an expat — housing, healthcare, banking, visas, taxes and more. Updated 2025." />
        <link rel="canonical" href="https://italy-relocation-calculator.netlify.app/guide" />
      </Helmet>
      <div style={S.page}>
        <header style={S.hero}>
          <div style={S.heroInner}>
            <nav style={S.breadcrumb} aria-label="Breadcrumb">
              <Link to="/" style={S.breadLink}>Calculator</Link>
              <span>›</span>
              <span>Expat Guides</span>
            </nav>
            <div style={S.eyebrow}>🇮🇹 Italy Expat Guides · 2025</div>
            <h1 style={S.h1}>Everything You Need<br /><em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>to Move to Italy</em></h1>
            <p style={S.sub}>Practical, honest guides covering every aspect of relocating to Italy — from finding an apartment to accessing healthcare.</p>
          </div>
        </header>
        <div style={S.wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {guides.map(({ to, icon, title, desc, tag }) => (
              <Link key={to} to={to}
                style={{ background: 'white', border: '1px solid var(--sand3)', borderRadius: '16px', padding: '1.5rem', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--terra)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--sand3)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
                <div style={{ fontSize: '0.7rem', padding: '2px 9px', borderRadius: '100px', background: 'var(--terra-dim)', color: 'var(--terra)', border: '1px solid rgba(193,68,14,0.2)', fontWeight: 600, display: 'inline-block', marginBottom: '8px' }}>{tag}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--warm-dark)', marginBottom: '6px' }}>{title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--warm-mid)', lineHeight: 1.6 }}>{desc}</div>
              </Link>
            ))}
          </div>
          <div style={S.ctas}>
            <Link to="/" style={S.ctaPrimary}>← Relocation Calculator</Link>
            <Link to="/cities" style={S.ctaSecondary}>City Guides →</Link>
            <Link to="/visa" style={S.ctaSecondary}>Visa Guide →</Link>
            <Link to="/salary" style={S.ctaSecondary}>Salary Calculator →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
