# 🇮🇹 Italy Relocation Cost Calculator

A free interactive tool for expats planning a move to Italy. Built with React + Vite.

## Features
- Monthly cost breakdown · One-time relocation costs · Italian income tax
- Dual-income support (couple/family) · Savings runway · Affordability verdict
- Side-by-side city comparison · "What city can I afford?" ranker
- Minimum salary calculator · Hidden costs checklist · 5-year projection
- Shareable URL · Neighbourhood zone pricing · Full FAQ section
- Full SEO: meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt

---

## Deploy to Netlify

### Option A — Netlify UI (recommended for beginners)

1. Push this folder to a **GitHub repository**
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select your repo — build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy site**
5. *(Optional)* Add a custom domain under **Domain settings**

### Option B — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## After Deploying — Update Your URL

Replace `https://italy-relocation-calculator.netlify.app` with your actual Netlify URL in:

| File | Fields to update |
|------|-----------------|
| `index.html` | `canonical`, all `og:url`/`og:image`, JSON-LD `@id` and `url` fields |
| `public/sitemap.xml` | All `<loc>` entries |
| `public/robots.txt` | `Sitemap:` line |

---

## OG Social Image

Add a `1200×630px` image at `public/og-image.jpg` for social sharing previews (Twitter, LinkedIn, WhatsApp).
Quick tools: [og-image.vercel.app](https://og-image.vercel.app), Figma, or Canva.

---

## Local Development

```bash
npm install
npm run dev        # starts at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

---

## Post-Deploy SEO Checklist

- [ ] Submit `sitemap.xml` to [Google Search Console](https://search.google.com/search-console)
- [ ] Submit `sitemap.xml` to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Verify OG tags: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Check Twitter card: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Test JSON-LD: [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Run Lighthouse audit in Chrome DevTools (aim for 90+ on all scores)
- [ ] Add `public/og-image.jpg` (1200×630px)
