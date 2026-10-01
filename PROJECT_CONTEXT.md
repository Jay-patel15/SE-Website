# Siddhi Electricals: Project Context

Single source of truth for anyone (human or AI) picking up this codebase. Read this before changing anything.

---

## 1. What this is

Marketing website + lead capture + free engineering calculators for **Siddhi Electricals**, a Government-licensed electrical contractor in Mumbai (industrial, commercial, residential; Adani / Tata Power / BEST meter passing; panels; CCTV; home automation).

Goals, in priority order:

1. **Generate enquiries:** calls, WhatsApp chats, contact-form leads.
2. **Rank locally:** "electrical contractor Mumbai", "Adani meter connection", etc.
3. **Build trust:** clean, modern, brand-consistent design; real project photos.
4. **Free calculators:** useful tools that bring in search traffic and lead to "discuss with an engineer".

Design brief from the owner: **clean, modern, sleek, simple, uncluttered, fully responsive, matching the logo colours.**

---

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | One hand-written stylesheet: `frontend/src/app/globals.css` (Tailwind v4 is imported but its utilities are only used by the admin panel) |
| Font | Manrope via `next/font/google` (CSS var `--font-sans`) |
| Icons | `lucide-react` |
| Images | `next/image`; remote images from `images.unsplash.com` and `*.supabase.co` (allow-listed in `next.config.ts`) |
| Validation | `zod` (lead API) |
| Data (optional) | Supabase; falls back to `localStorage` when env vars are absent |

npm workspace with a single package (`frontend`).

```bash
npm install            # from repo root
npm run dev            # frontend dev server (http://localhost:3000)
npm run build          # production build of frontend
```

---

## 3. Brand & design system

Colours are taken directly from the logo (`frontend/public/brand/`).

| Token | Value | Use |
|---|---|---|
| `--primary` | `#11745e` | Logo green: primary buttons, links, icons |
| `--primary-dark` | `#0b4f40` | Hover |
| `--primary-deep` | `#072f27` | Hero, footer, dark bands, calculator results |
| `--primary-soft` | `#e8f3f0` | Icon badges, tinted bands |
| `--accent` | `#ff8a00` | Logo orange: secondary CTAs, eyebrows, highlights |
| `--accent-dark` | `#e67a00` | Hover |
| `--foreground` / `--text` / `--muted` | `#0f1b18` / `#45534f` / `#7b8885` | Text hierarchy |
| `--line` | `#e3eae7` | Borders |
| `--background` | `#f7f9f8` | Page background |

Rules:

- **Orange buttons use dark text** (`--foreground`). White on `#ff8a00` fails WCAG contrast. Green buttons use white text.
- Radius `--radius: 14px`; pill-shaped buttons (`border-radius: 999px`).
- Section rhythm: alternate `.band` (off-white) and `.band-white`; use `.dark-band` sparingly (max one per page).
- Keep pages **short**. The owner asked for less clutter, so don't add sections without a reason.

### CSS building blocks (all in `globals.css`)

| Class | Purpose |
|---|---|
| `.container` | Max 1200px centred, 20px side gutters (16px on phones) |
| `.band`, `.band-white`, `.band-tint`, `.dark-band` | Section wrappers with vertical padding |
| `.grid .grid-2/3/4` | Responsive grids (collapse at 1024px and 720px) |
| `.grid-3.trio` | Use when a grid has **exactly 3 items**: stays 3-across on tablet, avoiding an orphan card |
| `.split` | Two-column text/image layout, stacks at 900px |
| `.section-head` (+ `.center`), `.eyebrow`, `.section-title`, `.lead` | Section headings |
| `.btn` + `.btn-primary / -secondary / -ghost / -light / -sm` | Buttons |
| `.card`, `.media-card`, `.media`, `.media-card-body`, `.tag` | Cards (image cards use 16:10 `.media`) |
| `.icon-badge` (+ `.orange`) | Square icon chip |
| `.check-list`, `.pill`, `.filter-btn` | Lists, chips, filter tabs |
| `.hero`, `.page-hero`, `.stats`, `.image-frame`, `.cta`, `.faq` | Page-level patterns |
| `.calc`, `.calc-results`, `.calc-table`, `.result-row`, `.note` | Calculator layout |
| `.floating-calc`, `.floating-wa` | Floating calculator + WhatsApp buttons |
| `.input`, `.select`, `.textarea`, `.field`, `.form-grid`, `.status` | Forms (also used by admin) |

Breakpoints: **1024px** (nav → hamburger, 4/3-col → 2-col, calculator stacks), **900px** (`.split` stacks), **720px** (everything single column, stats 2×2).

### Responsive notes

- The load calculator table has `min-width: 560px` and scrolls horizontally inside its card on phones (`.calc > * { min-width: 0 }` prevents it from stretching the page; don't remove that rule).
- Floating **Calculators** button: a vertical orange tab, centred on the right edge on tablet/desktop; a round orange button stacked above WhatsApp (bottom-right) on phones (≤720px). Hidden on `/calculators/*` and `/admin/*`.
- Respect `prefers-reduced-motion` (already handled globally).
- Verified at 375px, 768px, 1024px and 1440px.

---

## 4. Folder map (frontend)

```
frontend/
  public/brand/                  logo-wide.jpg (1280×401), bulb.png (favicon / mark)
  src/
    app/
      layout.tsx                 Root: font, global metadata, Electrician JSON-LD, Header/Footer/floating buttons
      globals.css                The entire design system
      page.tsx                   Home
      about/ services/ services/[slug]/ projects/ projects/[slug]/ gallery/ contact/
      calculators/page.tsx       Calculator index
      calculators/[slug]/page.tsx  One route renders all 12 calculators
      api/leads/route.ts         POST lead validation (zod)
      sitemap.ts robots.ts       SEO
      admin/                     CMS dashboard (see §8)
    components/
      layout/   Header.tsx Footer.tsx FloatingWhatsApp.tsx (also renders the floating calculator button)
      common/   PageHero (with breadcrumbs + BreadcrumbList JSON-LD), SectionHeader, CtaBand, JsonLd,
                ProjectsClient, GalleryClient (both read admin-editable data via dataClient)
      calculators/CalculatorShell.tsx   ALL calculator logic + UI
      forms/    ContactForm.tsx
      dashboard/AdminModulePage.tsx
    constants/site.ts            ALL site content (see §5)
    lib/seo.ts                   pageSeo() helper
    lib/dataClient.ts            Supabase-or-localStorage CRUD
    lib/supabase.ts              Lazy Supabase clients
```

---

## 5. Content lives in `src/constants/site.ts`

Edit content here, not in pages.

| Export | Used for |
|---|---|
| `brand` | Name, tagline, **phone, email, address, whatsapp, hours, url**, logo paths |
| `navItems` | Header + footer links + sitemap. Currently: Home, About, Services, Projects, Calculators, Contact (Gallery is footer-only) |
| `services` | 9 services: slug, title, icon, image, summary, details[] → `/services/[slug]` |
| `projects` | 4 projects → `/projects/[slug]` |
| `calculators` | 12 calculators: slug, title, **description** (used for SEO + cards), icon |
| `stats` | Home/About numbers: 10+ years, 100+ projects, **500+ meters installed**, Govt. licensed |
| `differentiators`, `industries`, `certifications` | Supporting sections |
| `faqs` | Home FAQ + FAQPage JSON-LD |
| `testimonials` | Admin seed data (not shown on public pages currently) |

**Placeholders to replace before launch:**

- `brand.phone` = `+91 99999 99999`, `brand.whatsapp` = `919999999999` (or set `NEXT_PUBLIC_WHATSAPP_NUMBER`)
- `brand.address` (only "Mumbai, Maharashtra, India"; a full address improves local SEO, and also update `geo` in `layout.tsx`)
- Stats values (confirm the real meter count, project count, years)
- Unsplash stock photos → real project photos (big trust + SEO win)

---

## 6. Calculators

All logic is in `src/components/calculators/CalculatorShell.tsx`:

- `defaults[slug]`: initial inputs per calculator
- `compute(slug, values)`: pure function returning `{ label: formattedValue }`
- `fieldLabels` / `slugLabels`: human labels with units (slug-specific overrides where a key means different things, e.g. `load` in UPS = W, in transformer = kW)
- UI: generic input grid; special appliance table for `load`; `material` key renders a Copper/Aluminium select
- Results panel: live values, "Discuss with an engineer" (opens WhatsApp prefilled with the results), "Print results" (print stylesheet hides chrome)

| Slug | Calculates |
|---|---|
| `ev-charging` | Charging time, energy, cost |
| `solar` | kW capacity, panels, monthly savings, payback |
| `consumption` | Daily/monthly units, bill |
| `load` | Appliance-wise connected/demand load (0.8 DF), main MCB (230 V, 0.9 pf), daily kWh, bill @ ₹10 |
| `power` | 1-phase & 3-phase kW |
| `cable-size` | Cu/Al size by current, voltage drop (2·I·L·ρ/A) |
| `voltage-drop` | Drop V, %, Safe/Warning/Critical (<3% / <5%) |
| `ups` | kVA, battery Ah @12 V |
| `generator` | kVA ×1.25 margin |
| `transformer` | kVA from load × DF / pf |
| `home-automation` | Budget estimate |
| `cctv` | Cameras, NVR, storage, cost |

**The calculation logic is owner-approved. Do not change `defaults` or `compute` without being asked.** To add a calculator: add an entry to `calculators` in `site.ts` + a `defaults` entry + a `compute` case (+ labels). The route, sitemap and SEO pick it up automatically.

---

## 7. SEO

- `pageSeo(title, description, path, keywords?)` in `lib/seo.ts` sets title, description, keywords, **per-page canonical**, Open Graph, Twitter. **Always pass the page `path`**; without it the canonical points to `/`.
- Title template: `"<Page> | Siddhi Electricals"`; home is `"Siddhi Electricals | Electrical Contractor in Mumbai"`.
- `metadataBase` = `NEXT_PUBLIC_SITE_URL` (default `https://siddhielectricals.com`).
- Structured data (JSON-LD):
  - Site-wide `Electrician` (LocalBusiness) with `@id` `<url>/#business`, hours, areaServed, service catalog (`layout.tsx`)
  - `BreadcrumbList` on every inner page (via `PageHero crumbs`)
  - `FAQPage` (home), `Service` (service pages), `CreativeWork` (projects), `WebApplication` (calculators)
- `sitemap.xml`: nav pages + all services, projects, calculators + `/gallery`. `robots.txt` disallows `/admin` and `/api`.
- Semantic HTML: one `<h1>` per page (in hero), descriptive `alt` text, `lang="en-IN"`, `themeColor` set.
- Hero image is `priority`; everything else lazy-loads with correct `sizes`.

---

## 8. Data flow & admin

- `lib/dataClient.ts` exposes `get/save/delete` for projects, services, gallery, testimonials, leads.
  - If `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set → Supabase tables.
  - Otherwise → browser `localStorage` (`se_projects`, `se_gallery`, …) seeded from `site.ts`. **That data exists only in that one browser.**
- Every `save*` returns `false` if the write failed, **including when localStorage is full** (~5 MB per browser). The admin shows that as an error instead of pretending it saved.
- Public pages: service/project detail pages, home, sitemap use **static** `site.ts` (SEO-friendly, prerendered). `/projects` and `/gallery` lists hydrate from `dataClient` so admin edits appear there.
  - A project added via admin appears in the `/projects` list **without** a "View project" link, because detail pages are only generated for `site.ts` projects. To give it a page, add it to `projects` in `site.ts` too.
- Contact form → `POST /api/leads` (zod validation; email optional, empty string allowed) → `saveLead()` (Supabase or localStorage). **Leads are not emailed or persisted server-side yet.** In localStorage mode a lead only reaches the admin if it was submitted from the same browser.
- Testimonials seed data has no ids; `getTestimonials()` derives `id = index + 1` on read so edit/delete work.

### Images (projects & gallery)

- `uploadImage(file, folder)` in `dataClient.ts`:
  1. Resizes in the browser (canvas) and re-encodes to **WebP** (falls back to JPEG on browsers without WebP encoding).
  2. **Supabase configured:** max 1600px @ 0.82 → uploaded to the Storage bucket named after the folder (`projects` or `gallery`, must exist and be **public**) → returns the public URL.
  3. **No Supabase:** max 1200px @ 0.75 → returned as a `data:` URL stored inline in localStorage (~30–200 KB per photo, so roughly 25–100 photos before the 5 MB browser limit).
- Tested: a 3000×2000 photo becomes a ~28 KB WebP.
- `canOptimizeImage(src)`: true only for hosts allow-listed in `next.config.ts` (`images.unsplash.com`, `*.supabase.co`). Public pages pass `unoptimized={!canOptimizeImage(src)}` to `next/image`, so uploaded `data:` images and pasted URLs from any other host render without crashing. **If you add a new image host to `next.config.ts`, add it to `canOptimizeImage` as well.**

### Admin panel (`/admin`)

| Route | What it does |
|---|---|
| `/admin/login` | Sign-in card. Redirects to dashboard |
| `/admin/dashboard` | Counts (leads, projects, gallery, services, testimonials), last 5 enquiries, quick "+ Project" / "+ Gallery photo" buttons |
| `/admin/projects` | Card grid with thumbnails. Add / edit / delete, **photo upload** |
| `/admin/gallery` | Card grid with thumbnails. Add / edit / delete, **photo upload** |
| `/admin/leads` | List, search, view details (Call / WhatsApp / Email buttons), delete, **Export CSV** |
| `/admin/services`, `/admin/testimonials` | List + editor |

- **Files:** `app/admin/layout.tsx` (shell + auth gate), `app/admin/login/page.tsx`, `app/admin/dashboard/page.tsx`, `components/dashboard/AdminModulePage.tsx` (all modules). Styles: the `/* Admin panel */` block at the end of `globals.css` (`.admin-*`, `.dropzone`, `.toast`, `.icon-btn`, `.skeleton`).
- **Config-driven modules:** `AdminModulePage.tsx` has a `modules` object. Each entry defines `load/save/remove`, `id`, `title`/`subtitle` for the list, optional `imageFolder` (switches to the photo card grid and requires a photo), and `fields`. Field `type`s: `text` (default), `textarea`, `select` (with `options`), `image` (upload field), `lines` (array edited as one item per line). `half: true` puts two fields side by side; `optional: true` drops `required`. **To add a field, add one line to `fields`. To add a module, add an entry plus a 5-line `app/admin/<name>/page.tsx` and a menu item in `layout.tsx`.**
- **Photo field:** click or drag-and-drop onto the drop zone, "Replace photo", "Remove", or paste an image URL. Shows a live preview and a spinner while compressing.
- **Shortcuts:** `?new=1` on any module URL opens the "Add" panel immediately (used by the dashboard buttons). `Esc` closes panels.
- **Responsive:** desktop has a fixed left sidebar. ≤1024px: dark top bar + slide-in drawer. ≤720px: editor is full-screen with sticky Cancel/Save, photo grid is 2 columns (1 column ≤380px), list rows wrap.
- **Speed:** the session is checked once, not on every navigation; skeleton loaders instead of spinners; admin thumbnails are plain lazy `<img>`; the dashboard no longer bundles `recharts` (its chart showed fake data). Dashboard first-load JS went from 282 kB to 175 kB. `recharts` is now unused in `package.json` and can be uninstalled.
- ⚠️ **Security:** the login is hardcoded **ID `admin` / password `admin`** (in `app/admin/login/page.tsx`), checked client-side, with a 24 h session in `localStorage` (`se_session`). Anyone who reads the JS bundle can find it, and the admin is a client-side gate only. The credentials are no longer shown on the login screen. **Replace with Supabase Auth (or server-side auth) before production.** The layout already accepts a Supabase Auth user if one is signed in.

### Environment variables (`frontend/.env.example`)

```
NEXT_PUBLIC_SITE_URL=https://siddhielectricals.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
```

---

## 9. Pages at a glance

| Route | Sections |
|---|---|
| `/` | Hero (photo bg, quote + call CTAs) → stats → 6 service cards → why-us split → 3 recent projects → FAQ → CTA |
| `/about` | Hero → who-we-are + stats + photo → 3 values → compliance & safety (dark) → CTA |
| `/services` | Hero → 9 service cards → industries → CTA |
| `/services/[slug]` | Hero (quote/call) → scope checklist + photo → related calculators + other services → CTA |
| `/projects` | Hero → filterable project grid → CTA |
| `/projects/[slug]` | Hero → photo + facts + scope + testimonial → CTA |
| `/gallery` | Hero → filterable grid + lightbox (Esc closes) → CTA |
| `/calculators` | Hero → 12 calculator cards → CTA |
| `/calculators/[slug]` | Hero → calculator (inputs + live results) → more calculators → CTA |
| `/contact` | Hero → form (prefills service from `?service=`) + contact cards + map |

---

## 10. Conventions

- Server components by default; `"use client"` only for interactivity (Header, Footer, floating buttons, calculators, forms, Projects/Gallery clients).
- Styling: use existing classes in `globals.css`; small one-off tweaks inline. No new CSS frameworks or UI libraries.
- Content → `site.ts`. SEO → `pageSeo(..., path)`. New inner page → use `PageHero` with `crumbs`, end with `<CtaBand />`.
- Keep it simple: fewer sections, less text, more whitespace.
- Verify with `npm run build` (must pass with zero errors) and check 375 / 768 / 1024 / 1440px widths.

---

## 11. Known gaps / next steps

1. Replace placeholder phone/WhatsApp/address and confirm stats.
2. Replace stock photos with real project photos (put them in `public/` or Supabase Storage).
3. Real admin authentication (see §8).
4. Persist/notify leads server-side (Supabase insert in `api/leads/route.ts` + email/WhatsApp alert).
5. Project detail pages for admin-added projects (fetch from Supabase at build/request time). Same for making the public Services pages admin-editable (they currently read `site.ts`).
5a. Connect Supabase so admin edits and uploaded photos are shared across devices: create tables `projects`, `gallery`, `services`, `testimonials`, `contact_leads` and public Storage buckets `projects`, `gallery`, and set the env vars.
6. Optional: a blog with real articles is a strong local-SEO lever (the old hidden blog was deleted 2026-10-01).
7. Add Google Search Console + Google Business Profile; link the GBP map embed on `/contact`.

## 12. Change log

- **2026-10-01:** Full redesign. New design system from logo colours; rebuilt all public pages; per-page canonicals + structured data; fixed blank-email lead bug and a broken image URL; merged 12 duplicate calculator routes into `calculators/[slug]`; calculator UI rebuilt (logic unchanged).
- **2026-10-01:** Decluttered (removed process/calculator-teaser/testimonial sections from home, milestones from About, process from service pages, phone from header, Gallery from main nav); added floating responsive Calculators button; stat "Happy clients" → "Meters installed"; fixed phone overflow on load calculator; tablet layout fixes.
- **2026-10-01:** "All calculators" back button on calculator pages.
- **2026-10-01:** Admin redesign. New responsive shell (sidebar / mobile drawer), login and dashboard; config-driven `AdminModulePage` (replaces 770 lines of per-module JSX). **Photo upload with preview, drag-and-drop, replace/remove and in-browser WebP compression** for projects and gallery. Fixes:
  - saves no longer report success when localStorage is full
  - testimonials edit/delete work
  - CSV export escapes quotes and `#`
  - public pages no longer crash on uploaded or other-host images
  - admin-only projects no longer link to a 404
  - the session is checked once instead of on every navigation
  - the credential hint was removed from the login screen
- **2026-10-01:** Cleanup. Deleted the Careers page and form, the Blog (public pages, admin module, seed data and data functions), the `backend/` Express shell, the `docs/` folder and the unused `processSteps` export. Uninstalled the unused `recharts`, `framer-motion`, `react-hook-form`, `@hookform/resolvers` and `clsx`; the remaining deps are next, react, react-dom, lucide-react, zod and @supabase/supabase-js. README corrected.
