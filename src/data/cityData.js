// ─── ITALIAN CITY GUIDE DATA ─────────────────────────────────────────────────

export const CITY_GUIDES = {
  rome: {
    name: 'Rome', region: 'Lazio', flag: '🏛️',
    tagline: 'The Eternal City — history, chaos, and la dolce vita',
    budgetSingle: 2200, budgetCouple: 3400,
    stats: { rent: '€1,200–2,000', meal: '€12–20', transport: '€35/mo', climate: '15°C avg' },
    scores: { 'Quality of Life': 82, 'Expat Scene': 80, 'Affordability': 52, 'Job Market': 72, 'Safety': 68, 'Internet': 74 },
    col: { 'Rent (1-bed central)': '€1,400', 'Rent (1-bed suburban)': '€900', 'Groceries': '€350', 'Dining out': '€280', 'Transport': '€35', 'Utilities': '€150', 'Healthcare': '€80', 'Leisure': '€250', 'Est. monthly total': '€3,445' },
    tags: ['Capital city', 'History & culture', 'Expat community', 'Bureaucracy hub', 'Mediterranean climate'],
    sections: [
      {
        h2: 'Is Rome Affordable for Expats?',
        body: `Rome sits in the middle of the Italian cost-of-living spectrum — cheaper than Milan, more expensive than Naples or Palermo. A single expat living comfortably in the centre needs around €2,200–2,500/month. Go further out (Pigneto, Ostiense, Garbatella) and you can live well on €1,800.

The big variable is rent. Central areas like Prati, Parioli, and Trastevere command €1,400–2,000 for a 1-bedroom. Semi-central neighbourhoods like Testaccio and Ostiense run €900–1,300.`,
        callout: 'Watch out for condominium fees (spese condominiali) which can add €80–200/month to your rent. Always ask before signing.',
      },
      {
        h2: 'Best Neighbourhoods to Live In',
        body: `Rome's neighbourhoods (rioni) vary enormously in character, price, and practicality.

**Prati** — The most popular choice for professional expats. Elegant, safe, walkable, close to the Vatican. Expensive but very comfortable.

**Trastevere** — Beautiful medieval neighbourhood south of the Tiber. Lively and charming, but very touristy. Rents have risen sharply.

**Testaccio** — Working-class neighbourhood with excellent food market and authentic Roman character. Better value than the historic centre.

**Pigneto** — The bohemian, affordable alternative. Strong local community, good bars, emerging food scene.

**EUR** — Mussolini-era district south of the centre. Modern, spacious, affordable. Popular with families.`,
      },
      {
        h2: 'Bureaucracy: The Real Italy',
        body: `Rome is home to Italy's most complex bureaucratic infrastructure — and also its most overwhelmed. Registering residency (residenza), getting your codice fiscale, opening a bank account, and enrolling in the health system (SSN) are all doable but time-consuming.

The codice fiscale is your Italian tax code and the key to everything: renting a flat, opening a bank, buying a SIM. Get it first — it's issued by the Agenzia delle Entrate and usually takes just a few days.`,
        callout: 'The comune of Rome has a notoriously slow anagrafe (registry office). Book your appointment online as soon as you arrive — waits of 4–8 weeks for residency registration are common.',
      },
    ],
    pros: ['UNESCO World Heritage at every corner', 'Strong international and diplomatic community', 'Excellent public healthcare (SSN)', 'Good flight connections across Europe', 'Vibrant food culture and markets'],
    cons: ['Notoriously slow bureaucracy', 'Public transport unreliable outside metro lines', 'Summer heat can be brutal (35–40°C)', 'Pickpocketing in tourist areas', 'High rent in central neighbourhoods'],
    visaNote: 'EU citizens register at the local anagrafe within 3 months. Non-EU citizens need a visa before arrival (elective residency, digital nomad, or employment). The Italy Digital Nomad Visa requires demonstrating €28,000/year income.',
    verdict: 'Rome rewards patience. The bureaucracy will frustrate you, the traffic will baffle you, and the summers will bake you — but the quality of daily life, once settled, is extraordinary. Best for: culture lovers, international organisation workers, and remote workers who prioritise beauty and history over efficiency.',
    related: ['milan', 'florence', 'naples'],
  },

  milan: {
    name: 'Milan', region: 'Lombardy', flag: '🏙️',
    tagline: "Italy's financial capital — fashion, finance, and fog",
    budgetSingle: 2800, budgetCouple: 4200,
    stats: { rent: '€1,400–2,400', meal: '€14–22', transport: '€39/mo', climate: '13°C avg' },
    scores: { 'Quality of Life': 80, 'Expat Scene': 85, 'Affordability': 42, 'Job Market': 90, 'Safety': 75, 'Internet': 85 },
    col: { 'Rent (1-bed central)': '€1,700', 'Rent (1-bed suburban)': '€1,100', 'Groceries': '€380', 'Dining out': '€320', 'Transport': '€39', 'Utilities': '€160', 'Healthcare': '€80', 'Leisure': '€280', 'Est. monthly total': '€3,959' },
    tags: ['Financial hub', 'Fashion capital', 'Best job market', 'Most expensive city', 'Strong expat scene'],
    sections: [
      {
        h2: "Milan: Italy's Most International City",
        body: `Milan is a different Italy from the one tourists imagine. Efficient, ambitious, forward-looking. The metro runs on time. Business culture is closer to Frankfurt than to Naples.

For expats moving to Italy for work, Milan is the obvious choice. It has by far Italy's strongest private sector job market — finance, fashion, design, consulting, tech. KPMG, Deloitte, McKinsey, Google, Amazon — all have significant Milan offices.`,
        callout: 'Milan is the most expensive city in Italy by a significant margin. Budget at least €2,800/month as a single person to live comfortably in a decent neighbourhood.',
      },
      {
        h2: 'Best Neighbourhoods to Live In',
        body: `**Brera** — The art district. Cobbled streets, galleries, aperitivo bars, excellent restaurants. Very expensive but genuinely beautiful.

**Navigli** — Canal district, popular with young professionals. Vibrant nightlife, aperitivo culture, good transport links.

**Porta Venezia** — Diverse, cosmopolitan, well-connected. One of the best areas for value vs quality in central Milan.

**Isola** — The trendy neighbourhood that gentrified fast. Independent shops, good coffee, creative community.

**NoLo (North of Loreto)** — The frontier of gentrification. Affordable, multicultural, creative. Improving rapidly.`,
      },
      {
        h2: 'Cost of Living: The Honest Numbers',
        body: `Milan is expensive. A 1-bedroom in the city centre costs €1,600–2,400/month. Even in outer areas (Loreto, Lambrate, Famagosta), decent apartments run €1,000–1,400.

Eating out is pricier than elsewhere in Italy. A sit-down lunch at a typical osteria: €14–18. Aperitivo (usually includes food): €10–14. Groceries at Esselunga are comparable to a Western European capital.`,
      },
    ],
    pros: ["Italy's best private sector job market", 'Strong international expat community', 'Efficient public transport (Metro + tram)', 'Outstanding fashion, design and food scene', 'Best airport connections in Italy'],
    cons: ['Most expensive city in Italy', 'Notoriously grey, foggy winters', 'Summer heat + humidity can be extreme', 'Less charming than Rome or Florence', 'High competition for housing'],
    visaNote: "EU citizens register at the Ufficio Anagrafe within 3 months. The Milan commune is more efficient than Rome. Non-EU: same visa categories apply — elective residency, digital nomad (€28,000/yr), or employment visa.",
    verdict: "Milan is for people who come to Italy for work, not just lifestyle. The career opportunities are unmatched within Italy, the expat community is large and professional, and the quality of life is high — if expensive. Best for: career-focused professionals, finance/fashion/design workers, and anyone wanting Italy's best salary prospects.",
    related: ['rome', 'bologna', 'turin'],
  },

  florence: {
    name: 'Florence', region: 'Tuscany', flag: '🌺',
    tagline: 'Renaissance art, Tuscan hills, and quality over quantity',
    budgetSingle: 2000, budgetCouple: 3100,
    stats: { rent: '€1,000–1,600', meal: '€12–18', transport: '€38/mo', climate: '14°C avg' },
    scores: { 'Quality of Life': 85, 'Expat Scene': 82, 'Affordability': 58, 'Job Market': 62, 'Safety': 78, 'Internet': 72 },
    col: { 'Rent (1-bed central)': '€1,200', 'Rent (1-bed suburban)': '€800', 'Groceries': '€310', 'Dining out': '€250', 'Transport': '€38', 'Utilities': '€130', 'Healthcare': '€70', 'Leisure': '€220', 'Est. monthly total': '€3,018' },
    tags: ['Art & culture', 'Expat favourite', 'Tuscany lifestyle', 'Tourist city', 'University town'],
    sections: [
      {
        h2: 'Florence for Expats: The Real Picture',
        body: `Florence is the most popular city in Italy for American and British expats — and has been for decades. The university, the art scene, the architecture, and the proximity to the Tuscan countryside make it genuinely magnetic.

The city is relatively small (360,000 residents) which makes it feel manageable after Rome or Milan. Most things are walkable. The bureaucracy, while still Italian, is considered slightly less painful than Rome.`,
        callout: 'Florence receives 12+ million tourists per year in a city of 360,000. In summer the historic centre is barely liveable. Locals and smart expats retreat to the Oltrarno (south of the Arno) or outer neighbourhoods.',
      },
      {
        h2: 'Best Neighbourhoods to Live In',
        body: `**Oltrarno** — South of the Arno. The most popular choice for expats who want authenticity. Artisan workshops, neighbourhood bars, less tourist traffic.

**Campo di Marte** — North-east residential area. Local, affordable, good transport. Genuinely Florentine.

**Novoli** — University area to the north-west. Modern, affordable, student energy.

**Settignano / Fiesole** — Hill villages above Florence. Stunning views, quiet, slower pace. Popular with families and retirees.`,
      },
    ],
    pros: ['Unmatched art and architectural heritage', 'Strong English-speaking expat community', 'Manageable city size — very walkable', 'Close to Tuscany countryside and vineyards', 'Good universities and study programmes'],
    cons: ['Heavily touristy historic centre', 'Small job market outside tourism and art', 'Summer crowds overwhelming', 'Limited public transport beyond centre', 'Rising rents driven by Airbnb and tourism'],
    visaNote: 'Florence has a well-established expat infrastructure with immigration lawyers familiar with all visa types. The comune is considered relatively efficient by Italian standards.',
    verdict: "Florence is the romantic choice — and one that many expats make and never regret. It's not the place to build a corporate career, but as a base for remote work, study, retirement, or simply living beautifully, it's hard to beat in Italy. Best for: creatives, retirees, students, remote workers, and people who genuinely love Italian art and food.",
    related: ['rome', 'bologna', 'venice'],
  },

  bologna: {
    name: 'Bologna', region: 'Emilia-Romagna', flag: '🍝',
    tagline: "La Grassa, La Dotta, La Rossa — the best kept secret in Italy",
    budgetSingle: 1800, budgetCouple: 2800,
    stats: { rent: '€800–1,400', meal: '€12–16', transport: '€35/mo', climate: '13°C avg' },
    scores: { 'Quality of Life': 88, 'Expat Scene': 70, 'Affordability': 65, 'Job Market': 72, 'Safety': 82, 'Internet': 78 },
    col: { 'Rent (1-bed central)': '€1,000', 'Rent (1-bed suburban)': '€750', 'Groceries': '€290', 'Dining out': '€230', 'Transport': '€35', 'Utilities': '€120', 'Healthcare': '€65', 'Leisure': '€200', 'Est. monthly total': '€2,690' },
    tags: ['Best food in Italy', 'University city', 'Underrated gem', 'Affordable', 'Central location'],
    sections: [
      {
        h2: "Why Bologna is Italy's Best Kept Secret",
        body: `Bologna consistently tops quality-of-life rankings within Italy, yet rarely appears on expat lists. It has a world-class university (founded 1088 — the oldest in the world), the best food in the country, a lively student scene, and a cost of living significantly below Milan or Florence.

Its central location makes it ideal: Rome is 2h20m by high-speed train, Milan 1 hour, Florence 37 minutes. You can genuinely live in Bologna and reach any major Italian city in under 2.5 hours.`,
        callout: "Bologna's nickname La Grassa (the fat one) is earned. Tagliatelle al ragù, mortadella, tortellini in brodo, tigelle — the local food culture is extraordinary. The Mercato delle Erbe is an essential weekly stop.",
      },
      {
        h2: 'Neighbourhoods and Daily Life',
        body: `Bologna is compact and walkable. The porticoes (40km of covered arcades) mean you can walk almost anywhere in any weather.

**Centro Storico** — Vibrant, walkable, beautiful. The university is here. Most expensive but very liveable. Piazza Maggiore is one of Italy's best city squares.

**Bolognina** — North of the station. Working class, multicultural, improving fast. Affordable rents, local markets, authentic feel.

**San Vitale** — East of the centre. University-heavy, lively at night, good value.`,
      },
    ],
    pros: ['Best food in Italy — objectively', 'Extremely high quality of life', 'Affordable by Northern Italian standards', 'Perfect central location (trains everywhere)', 'Lively university city with year-round energy'],
    cons: ['Small job market outside local economy', 'Less internationally known (fewer expat resources)', 'Foggy and cold in winter', 'Housing market tightening near university'],
    visaNote: "Bologna's comune is considered one of Italy's more efficient for registration. The large university means there's good infrastructure for international residents.",
    verdict: "Bologna might be the best city in Italy to actually live in. The food, the walkability, the university energy, the central location, and the relatively affordable rents make it the insider choice. Best for: remote workers, foodies, academics, and anyone who wants the authentic Italian experience without Rome's chaos or Milan's cost.",
    related: ['florence', 'milan', 'turin'],
  },

  naples: {
    name: 'Naples', region: 'Campania', flag: '🍕',
    tagline: 'Chaotic, beautiful, misunderstood — the most Italian city in Italy',
    budgetSingle: 1500, budgetCouple: 2300,
    stats: { rent: '€600–1,100', meal: '€8–14', transport: '€30/mo', climate: '16°C avg' },
    scores: { 'Quality of Life': 70, 'Expat Scene': 60, 'Affordability': 82, 'Job Market': 52, 'Safety': 60, 'Internet': 66 },
    col: { 'Rent (1-bed central)': '€800', 'Rent (1-bed suburban)': '€550', 'Groceries': '€240', 'Dining out': '€190', 'Transport': '€30', 'Utilities': '€110', 'Healthcare': '€60', 'Leisure': '€160', 'Est. monthly total': '€2,140' },
    tags: ['Most affordable major city', 'Pizza birthplace', 'Raw authenticity', 'Vesuvius & coast', 'Remote work friendly'],
    sections: [
      {
        h2: 'Naples: Not What You Think',
        body: `Naples has a reputation problem. Crime statistics, rubbish in the streets, traffic — the clichés are not entirely invented. But they describe a fraction of the city's reality. Naples is also one of the most culturally rich, historically dense, and culinarily extraordinary cities in Europe.

For expats willing to engage with its complexity, Naples offers an extraordinary quality of life at a fraction of what you'd spend in Rome or Milan. Many who come for a few months never leave.`,
        callout: 'Naples is a city of stark contrasts. Posillipo and Chiaia are beautiful and safe. Quartieri Spagnoli and Forcella are intense. Choose your area carefully — the differences are significant.',
      },
      {
        h2: 'Best Neighbourhoods to Live In',
        body: `**Chiaia** — The upscale seafront neighbourhood. Elegant, safe, excellent restaurants and aperitivo bars. Most expensive area in Naples — but still cheap by Italian standards.

**Posillipo** — Cliff-top residential area with stunning bay views. Quiet, safe, beautiful. Requires a car.

**Vomero** — Hilltop residential neighbourhood. Bourgeois, calm, good schools, excellent views. Very popular with Neapolitan middle class.

**Centro Storico (Decumani)** — The real Naples. Overwhelming, vibrant, chaotic, beautiful. Best food and street life.`,
      },
    ],
    pros: ['Cheapest major city in Italy', 'The original pizza — nothing beats it', 'Extraordinary history and culture', 'Close to Amalfi, Pompeii, Capri, Ischia', 'Genuinely warm and welcoming people'],
    cons: ['Safety concerns in some areas', 'Bureaucracy particularly challenging', 'Fewer English-speaking services', 'Unemployment high — limited job market', 'Infrastructure can be unreliable'],
    visaNote: "Naples has a large international university presence (Federico II is one of Italy's oldest). The comune can be slower than northern cities for registration. Allow extra time.",
    verdict: "Naples is for people who want to experience Italy at its most intense and authentic. The value for money is exceptional. Best for: remote workers on a budget, people who love chaos and beauty in equal measure, and those who want Italy's most genuine urban experience.",
    related: ['palermo', 'rome', 'bari'],
  },

  turin: {
    name: 'Turin', region: 'Piedmont', flag: '🚗',
    tagline: 'Industrial elegance — Fiat, football, chocolate, and baroque boulevards',
    budgetSingle: 1800, budgetCouple: 2700,
    stats: { rent: '€700–1,300', meal: '€11–16', transport: '€38/mo', climate: '12°C avg' },
    scores: { 'Quality of Life': 80, 'Expat Scene': 65, 'Affordability': 68, 'Job Market': 74, 'Safety': 74, 'Internet': 80 },
    col: { 'Rent (1-bed central)': '€900', 'Rent (1-bed suburban)': '€650', 'Groceries': '€290', 'Dining out': '€220', 'Transport': '€38', 'Utilities': '€130', 'Healthcare': '€70', 'Leisure': '€200', 'Est. monthly total': '€2,498' },
    tags: ['Underrated', 'Automotive industry', 'Baroque architecture', 'Alps 1hr away', 'Affordable'],
    sections: [
      {
        h2: "Turin: Italy's Most Underrated City",
        body: `Turin (Torino) is consistently overlooked in expat conversations about Italy. The city has the most regular, elegant street grid in Italy (designed during the Savoy monarchy), excellent public transport, a serious food and chocolate culture, and a manufacturing/tech sector that provides real employment.

Its affordability relative to Milan (1 hour south by high-speed train) makes it increasingly attractive. You can live very well in Turin for €1,800–2,000/month as a single expat.`,
      },
      {
        h2: 'Neighbourhoods and Life in Turin',
        body: `**Crocetta** — The most prestigious residential neighbourhood. Quiet, elegant, excellent restaurants. Popular with professionals and families.

**San Salvario** — Young, lively, diverse. Best aperitivo scene in Turin. Affordable rents, good energy.

**Vanchiglia** — Up-and-coming area near the river. Artists, students, independent shops. Good value.

The Alps are visible on clear days and reachable within 1 hour. Skiing at Sestriere, Bardonecchia, and Courmayeur is a major quality-of-life bonus for winter sports lovers.`,
      },
    ],
    pros: ['Most underrated major city in Italy', 'Alps and skiing within 1 hour', 'Excellent baroque architecture', 'Strong automotive and manufacturing sector', 'More affordable than Milan with fast train connection'],
    cons: ['Cold foggy winters (worse than Milan)', 'Less internationally known', 'Smaller expat community', 'Some post-industrial areas still transitioning'],
    visaNote: "Turin's comune is considered efficient and well-organised. Large immigrant community and good infrastructure for international residents.",
    verdict: "Turin is the smart choice for expats who want a serious Italian city with career opportunities, without Milan's costs and crowds. Best for: engineers and industrial sector workers, people who love mountains and skiing, and those who value order and efficiency in an Italian setting.",
    related: ['milan', 'genoa', 'bologna'],
  },

  venice: {
    name: 'Venice', region: 'Veneto', flag: '🚤',
    tagline: 'The impossible city — living without cars on water',
    budgetSingle: 2200, budgetCouple: 3300,
    stats: { rent: '€900–1,600', meal: '€14–22', transport: '€600/yr', climate: '14°C avg' },
    scores: { 'Quality of Life': 75, 'Expat Scene': 65, 'Affordability': 50, 'Job Market': 55, 'Safety': 90, 'Internet': 70 },
    col: { 'Rent (1-bed on island)': '€1,200', 'Rent (1-bed in Mestre)': '€700', 'Groceries': '€340', 'Dining out': '€300', 'Transport (boat pass)': '€600/yr', 'Utilities': '€140', 'Healthcare': '€70', 'Leisure': '€240', 'Est. monthly total': '€3,042' },
    tags: ['Unique lifestyle', 'Ultra-safe', 'Tourism economy', 'No cars', 'Acqua alta'],
    sections: [
      {
        h2: 'Living in Venice: The Real Experience',
        body: `Venice is one of the few places in the world where living there is genuinely unlike anywhere else. No cars. Shopping on foot across bridges. Flooding in autumn and winter. 30 million tourists per year in a city of 50,000 residents.

The resident population has halved in 60 years. Most working-age Venetians have moved to the mainland (Mestre) for practical reasons. Those who remain are deeply committed to the island and its uniqueness.`,
        callout: 'Acqua alta (seasonal flooding) is part of Venetian life October–January. Ground-floor apartments flood regularly. Always check flood risk before renting, and invest in rubber boots immediately.',
      },
      {
        h2: 'Venice vs Mestre: The Practical Choice',
        body: `Most people who work in Venice or the Veneto region live in Mestre — the mainland part of the comune di Venezia. Mestre is a normal Italian city with normal rents, supermarkets, parking, and infrastructure. It's 10 minutes from Venice by train.

Living on the island proper is a romantic choice — and a financially demanding one. The reward is waking up in one of the world's most beautiful places.`,
      },
    ],
    pros: ['The most unique living experience in Europe', 'Extremely safe (no car crime, low street crime)', 'Beautiful beyond description', 'Strong cultural and artistic scene', 'Close to Dolomites, Verona, Padua'],
    cons: ['Acqua alta (flooding) in winter', 'Very expensive for basics on the island', 'Shrinking resident population', 'Tourism makes daily life frustrating', 'Limited job market beyond tourism'],
    visaNote: "Venice's comune covers both the island and the mainland. Registration is straightforward. Most expats register in Mestre for practical reasons.",
    verdict: "Venice is for people who are willing to trade practicality for beauty. The experience of living there is incomparable. Best for: remote workers with good income, artists, retirees, and people who want the most unique address in Italy.",
    related: ['bologna', 'florence', 'trieste'],
  },

  palermo: {
    name: 'Palermo', region: 'Sicily', flag: '🌊',
    tagline: 'Arab-Norman history, street food, and the real Mediterranean',
    budgetSingle: 1300, budgetCouple: 2000,
    stats: { rent: '€500–900', meal: '€8–13', transport: '€25/mo', climate: '18°C avg' },
    scores: { 'Quality of Life': 70, 'Expat Scene': 55, 'Affordability': 88, 'Job Market': 45, 'Safety': 62, 'Internet': 62 },
    col: { 'Rent (1-bed central)': '€650', 'Rent (1-bed suburban)': '€450', 'Groceries': '€210', 'Dining out': '€170', 'Transport': '€25', 'Utilities': '€100', 'Healthcare': '€55', 'Leisure': '€140', 'Est. monthly total': '€1,805' },
    tags: ['Cheapest major city', 'Sicily', 'Arab-Norman heritage', 'Street food capital', 'Warm climate'],
    sections: [
      {
        h2: "Palermo: Italy's Most Affordable Major City",
        body: `Palermo is the cheapest major city in Italy — and increasingly one of the most interesting. A wave of urban regeneration has transformed the historic centre over the last decade.

For remote workers, the value proposition is extraordinary. A comfortable 1-bedroom in a good neighbourhood costs €500–700/month. Eating at a local trattoria costs €10–12. Total monthly budget for a comfortable single expat: €1,300–1,500.`,
        callout: "Palermo has one of Italy's greatest street food cultures. Arancine, panelle, sfincione, pane e panelle — the Ballarò and Vucciria markets are unmissable daily experiences.",
      },
      {
        h2: 'Best Neighbourhoods to Live In',
        body: `**Politeama / Libertà** — The upscale residential and commercial heart. Wide boulevards, good restaurants, safer feel. Best choice for most expats.

**Kalsa** — Ancient Arab-Norman quarter. Gentrifying fast. Beautiful architecture, street art, young creative energy.

**Mondello** — Beach suburb 12km from centre. Popular with families, beautiful bay. Quiet in winter, lively in summer.`,
      },
    ],
    pros: ['Cheapest comfortable living in Italy', 'Extraordinary Arab-Norman architecture', 'Warm climate (300+ sunny days)', 'Outstanding street food culture', 'Close to beaches, mountains, and Greek temples'],
    cons: ['Very limited job market', 'Infrastructure less developed', 'Bureaucracy slow even by Italian standards', 'Language barrier (Sicilian dialect strong)'],
    visaNote: "Sicily has a special administrative status but Italian immigration law applies fully. The comune di Palermo is slower than northern cities — allow 2–3 months for the full residency process.",
    verdict: "Palermo is for people who want the most authentic, affordable, and warm Italian experience. The value for money is exceptional. Best for: remote workers on a budget, retirees, and people drawn to Arab-Norman history and Mediterranean culture at its most intense.",
    related: ['naples', 'catania', 'bari'],
  },

  bari: {
    name: 'Bari', region: 'Puglia', flag: '🐙',
    tagline: "Puglia's capital — orecchiette, Adriatic coast, and the new Southern cool",
    budgetSingle: 1400, budgetCouple: 2100,
    stats: { rent: '€550–950', meal: '€9–14', transport: '€28/mo', climate: '17°C avg' },
    scores: { 'Quality of Life': 74, 'Expat Scene': 52, 'Affordability': 84, 'Job Market': 50, 'Safety': 68, 'Internet': 68 },
    col: { 'Rent (1-bed central)': '€700', 'Rent (1-bed suburban)': '€500', 'Groceries': '€220', 'Dining out': '€180', 'Transport': '€28', 'Utilities': '€105', 'Healthcare': '€55', 'Leisure': '€150', 'Est. monthly total': '€1,938' },
    tags: ['Puglia gateway', 'Adriatic coast', 'Affordable', 'Orecchiette', 'Growing expat scene'],
    sections: [
      {
        h2: "Bari: Puglia's Rising Star",
        body: `Bari has undergone a remarkable transformation in the last decade. The historic centre (Bari Vecchia) has been regenerated, the waterfront promenade is one of Italy's best, and a growing community of young returnees and remote workers has created a lively, optimistic energy.

For remote workers choosing a base, Bari offers excellent value, a warm climate, and direct access to Puglia's extraordinary coast and countryside.`,
        callout: 'Bari has a major ferry port with connections to Greece, Albania, Montenegro, and Croatia — an underrated advantage for those who want to explore the Adriatic.',
      },
      {
        h2: "Living in Puglia's Capital",
        body: `From Bari you can reach Alberobello (trulli), Matera (sassi), Lecce (baroque), Polignano a Mare, and hundreds of kilometres of Adriatic and Ionian coastline within 1–2 hours.

The food culture is outstanding and underrated. Orecchiette alle cime di rapa, burrata from Andria, taralli, focaccia barese — the Pugliese kitchen is one of Italy's finest.`,
      },
    ],
    pros: ["Gateway to Puglia's extraordinary coast and countryside", 'Very affordable cost of living', 'Excellent Pugliese food culture', 'Ferry connections to Greece and Balkans', 'Warm Mediterranean climate'],
    cons: ['Limited English-speaking expat infrastructure', 'Small international job market', 'Less developed public transport', 'Some areas of old town require awareness'],
    visaNote: "Bari's comune has improved considerably in recent years. The city has a university which has helped build infrastructure for registration.",
    verdict: "Bari is the smart choice for people who want to be in Southern Italy without Palermo's chaos or Naples's intensity. Best for: remote workers, people who love the Adriatic, and those seeking an affordable, authentic Southern Italian base.",
    related: ['naples', 'palermo', 'catania'],
  },

  catania: {
    name: 'Catania', region: 'Sicily', flag: '🌋',
    tagline: "Under Etna's shadow — baroque, lively, and proudly Sicilian",
    budgetSingle: 1300, budgetCouple: 1950,
    stats: { rent: '€500–850', meal: '€8–13', transport: '€25/mo', climate: '19°C avg' },
    scores: { 'Quality of Life': 72, 'Expat Scene': 50, 'Affordability': 86, 'Job Market': 46, 'Safety': 64, 'Internet': 64 },
    col: { 'Rent (1-bed central)': '€620', 'Rent (1-bed suburban)': '€430', 'Groceries': '€210', 'Dining out': '€170', 'Transport': '€25', 'Utilities': '€100', 'Healthcare': '€55', 'Leisure': '€140', 'Est. monthly total': '€1,750' },
    tags: ['Mount Etna', 'Baroque architecture', 'Very affordable', 'Street food', 'Eastern Sicily'],
    sections: [
      {
        h2: "Catania: Sicily's Second City",
        body: `Catania sits in the shadow of Mount Etna — literally and figuratively. The volcano has shaped the city physically (the black basalt lava stone used in all the baroque buildings) and culturally.

Catania is often considered more dynamic than Palermo — faster, more entrepreneurial, with a stronger university presence. The cost of living is extraordinary — the cheapest in our database after Palermo.`,
        callout: "Catania's Pescheria (fish market) is one of the most spectacular in Italy. The street food — horse meat sandwiches, granita con brioche, arancini — rivals Palermo's.",
      },
      {
        h2: 'Life Under a Volcano',
        body: `Mount Etna is an active volcano and erupts regularly. Ash falls are the main inconvenience for daily life — but it's part of the landscape and consciousness of living here.

The upside: the volcanic soil makes Etna one of Sicily's best wine-producing areas. Day trips to the volcano are one of Sicily's best experiences. Taormina, Siracusa, and Agrigento are all within easy reach.`,
      },
    ],
    pros: ['One of the cheapest cities in Italy', 'Mount Etna on the doorstep', 'Excellent baroque city centre', 'Strong university energy', 'Gateway to eastern Sicily'],
    cons: ['Very limited job market', 'Infrastructure challenges', 'Bureaucracy slow', 'Hot summers (35–38°C regularly)'],
    visaNote: "Similar to Palermo — Sicilian bureaucracy is slow. Factor in 2–3 months for full residency registration.",
    verdict: "Catania is for the genuinely adventurous expat who wants extraordinary value, volcanic drama, and immersion in Sicilian culture. Best for: remote workers, writers, and people drawn to raw, authentic Southern Italy.",
    related: ['palermo', 'naples', 'bari'],
  },

  genoa: {
    name: 'Genoa', region: 'Liguria', flag: '⚓',
    tagline: 'The forgotten maritime capital — pesto, caruggi, and Riviera coast',
    budgetSingle: 1700, budgetCouple: 2600,
    stats: { rent: '€650–1,200', meal: '€11–16', transport: '€35/mo', climate: '15°C avg' },
    scores: { 'Quality of Life': 76, 'Expat Scene': 58, 'Affordability': 72, 'Job Market': 66, 'Safety': 74, 'Internet': 76 },
    col: { 'Rent (1-bed central)': '€850', 'Rent (1-bed suburban)': '€600', 'Groceries': '€270', 'Dining out': '€210', 'Transport': '€35', 'Utilities': '€125', 'Healthcare': '€65', 'Leisure': '€180', 'Est. monthly total': '€2,340' },
    tags: ['Ligurian coast', 'Pesto birthplace', 'Port city', 'Affordable', 'Underrated'],
    sections: [
      {
        h2: "Genoa: Italy's Most Overlooked City",
        body: `Genoa (Genova) is the great overlooked city of Northern Italy. Sandwiched between the Alps and the Ligurian Sea, built vertically on steep hillsides, with the largest medieval city centre in Europe — it's extraordinary, and almost no one talks about it.

The city is significantly cheaper than Milan, two hours up the coast. Christopher Columbus was Genoese.`,
        callout: "Pesto was invented in Genoa. The real thing — made with Ligurian basil, local olive oil, and pine nuts — is a completely different product from what the rest of the world calls pesto.",
      },
      {
        h2: 'Geography and Getting Around',
        body: `Genoa is one of Italy's most challenging cities geographically. Built on steep hillsides, it has funiculars, cliff lifts (cremagliere), and narrow medieval alleys (caruggi) where wheeled transport is impossible.

The reward: extraordinary views of the harbour from almost everywhere, and a sense of vertical drama that makes every walk an adventure. The caruggi of the historic centre are UNESCO-listed.`,
      },
    ],
    pros: ['Extraordinary medieval historic centre (UNESCO)', 'Ligurian Riviera immediately accessible', 'Cheaper than Milan with good train connection', 'Pesto, focaccia, and Ligurian seafood cuisine', 'Genuine, non-touristy Italian city'],
    cons: ['Hilly geography physically demanding', 'Grey, rainy winters', 'Some post-industrial areas in decline', 'Small expat community'],
    visaNote: "Genoa's comune is reasonably efficient. The city has a university and significant port-related international activity providing infrastructure for international residents.",
    verdict: "Genoa is for people who want to discover something genuinely unknown and extraordinary in Italy. Best for: maritime history enthusiasts, people who value authenticity over aesthetics, and remote workers who want Northern Italy at a Southern price.",
    related: ['milan', 'turin', 'florence'],
  },

  trieste: {
    name: 'Trieste', region: 'Friuli-Venezia Giulia', flag: '☕',
    tagline: 'Central Europe meets the Adriatic — the most literary city in Italy',
    budgetSingle: 1600, budgetCouple: 2400,
    stats: { rent: '€600–1,100', meal: '€10–15', transport: '€30/mo', climate: '13°C avg' },
    scores: { 'Quality of Life': 80, 'Expat Scene': 62, 'Affordability': 74, 'Job Market': 62, 'Safety': 84, 'Internet': 78 },
    col: { 'Rent (1-bed central)': '€800', 'Rent (1-bed suburban)': '€580', 'Groceries': '€265', 'Dining out': '€210', 'Transport': '€30', 'Utilities': '€120', 'Healthcare': '€65', 'Leisure': '€175', 'Est. monthly total': '€2,245' },
    tags: ['Central European culture', 'Most literary city', 'Coffee culture', 'Research hub', 'Quiet and safe'],
    sections: [
      {
        h2: "Trieste: Italy's Most Unique City",
        body: `Trieste is unlike any other Italian city. Sitting in the far northeast corner of Italy, wedged between Slovenia and the Adriatic, it was for centuries part of the Habsburg Empire — and the Central European influence is unmistakable in its architecture, coffee culture, and temperament.

James Joyce lived here for 11 years and wrote much of Ulysses here. Trieste also has one of Italy's highest concentrations of research institutions (ICTP, SISSA, AREA Science Park).`,
        callout: "Trieste has the highest per-capita coffee consumption in Italy. The café culture, with its grand Habsburg-era coffeehouses (Caffè San Marco, Caffè Tommaseo), is exceptional.",
      },
      {
        h2: 'Research, Science, and the International Community',
        body: `Trieste has a disproportionate concentration of international scientific and research institutions. The ICTP, SISSA, and AREA Science Park bring a significant international community to a city of 200,000.

English is widely spoken in scientific contexts, and the expat infrastructure is better than you'd expect for a small city. The location near Slovenia and Croatia also provides easy access to Central and Eastern Europe.`,
      },
    ],
    pros: ['Most unique cultural identity in Italy', 'Excellent research/academic international community', 'Very safe (consistently Italy\'s safest city)', 'Affordable by Northern Italian standards', 'Habsburg architecture and coffee culture extraordinary'],
    cons: ['The Bora wind (very strong cold wind)', 'Small city — can feel limiting long-term', 'Limited job market outside academia and research', 'Cold winters with significant wind chill'],
    visaNote: "Trieste's large international research community means there's excellent infrastructure for non-Italian residents. Many research institutions provide visa and residency support for their staff.",
    verdict: "Trieste is for intellectuals, researchers, and people who want the most Central European experience you can have while technically being in Italy. Best for: academics, researchers, writers, and people who appreciate cities with a deep and complex identity.",
    related: ['venice', 'bologna', 'milan'],
  },
};

export const CITY_LIST = Object.entries(CITY_GUIDES).map(([id, city]) => ({
  id, ...city,
}));
