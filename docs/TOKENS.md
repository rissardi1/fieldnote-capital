# Fieldnote Capital — Locked Token Contract

**Status:** LOCKED (Phase 3 approved) · Build pass 1 = hi-fi greyscale wireframe
**Version:** 1.3 — see change log
**Primary reference:** quartr.com (values below are measured from live computed styles, not estimated)
**Secondary references:** Forja Framer template, vestris.ai, griffin.com, getcluster.ai

> This document is the single source of truth. Code references tokens by name — never raw values.
> Changing anything here after lock requires an explicit token-change flag and a rebuild of affected sections.

---

## 1. Mood & References

| Field | Value |
|---|---|
| Vibe | Quiet editorial · warm neutral · confident restraint |
| Primary reference | Quartr — typography math, palette, spacing rhythm |
| Imagery direction | **Renaissance paintings + fantasy** |
| ASCII assets | No |
| Energy level | **Silent** |
| Dark mode | **None.** Dark section *bands* only. |
| Non-negotiables | No pure #FFF page bg. No chromatic accent. No drop shadows. No bounce easing. |

---

## 2. Color Tokens

No chromatic accent — the accent is near-black. Palette is Quartr-native throughout.

### Art layer — the one exception to "no chroma"

The supplied dither plates are a true 1-bit duotone. Sampled from
`hero-dither.png`: exactly **2 colours**, no alpha.

| Token | Value | Role |
|---|---|---|
| `--color-art-ink` | `#4B0F04` | oxblood — the dithered dots |
| `--color-art-paper` | `#EDDADA` | pale pink — the plate ground |

Namespaced `art-` deliberately. **This chroma belongs to imagery alone** — never
to buttons, text, borders, or state. The UI palette below stays achromatic.
A media frame's background is set to `--color-art-paper` so the plate meets the
frame with no seam. Precedent: the Answerr reference does exactly this in blue.

---

| Token | Value | Role |
|---|---|---|
| `--color-bg-primary` | `#F4F3F0` | Page background (warm beige) |
| `--color-bg-secondary` | `#FBFCFC` | Alternate band (near-white) |
| `--color-surface` | `#FFFFFF` | Cards, elevated panels |
| `--color-text-primary` | `#101214` | Headings, body |
| `--color-text-secondary` | `#485259` | Lede, captions, nav |
| `--color-text-tertiary` | `#949DA5` | Metadata, disabled |
| `--color-accent` | `#090A0C` | Primary buttons, action |
| `--color-accent-hover` | `#101214` | Primary hover |
| `--color-border` | `#D2D5D7` | Hairlines, card borders |
| `--color-border-subtle` | `#E8E9EA` | Interior dividers |
| `--color-on-dark` | `#EEF0F1` | Text on dark bands |
| `--color-error` | `#A6503C` | Terracotta |
| `--color-success` | `#4A6B4F` | |

**Dark band treatment** (section-level, not a theme):
`background: #090A0C` · `color: #EEF0F1` · borders `rgba(238,240,241,0.12)` · max 2 sections.

---

## 3. Typography

**Families:** Geist Sans (all UI + display) · Geist Mono (eyebrows, figures, data)

Geist Sans must be loaded as a **variable font** — weights 450 and 550 are required and are not
standard static cuts. Default 400/1.2/0em renders this system inert.

Desktop values (1024px and above — the scale caps here, see §4.5).

| Token | Size | Line height | Weight | Tracking | Family |
|---|---|---|---|---|---|
| `display` | 68px | 0.95 | 550 | −0.05em | Sans |
| `h1` | 44px | 1.1 | 550 | −0.04em | Sans |
| `h2` | 32px | 1.2 | 550 | −0.04em | Sans |
| `h3` | 22px | 1.3 | 550 | −0.03em | Sans |
| `h4` | 18px | 1.4 | 550 | −0.02em | Sans |
| `body-lg` | 18px | 1.5 | 450 | 0 | Sans |
| `body` | 17px | 1.4 | 450 | +0.0025em | Sans |
| `nav` | **16px** | 1.4 | 450 | 0 | Sans — **chrome only, constant, never scales** |
| `label` | 15px | 1.4 | 550 | +0.06em | Sans, UPPERCASE — content labels / column titles |
| `small` | 14px | 1.5 | 450 | 0 | Sans |
| `eyebrow` | 12px | 1.4 | 500 | +0.12em | **Mono, UPPERCASE** |
| `caption` | 12px | 1.5 | 450 | 0 | Sans |

**Rule:** every heading is weight 550. Every body-tier element is 450. Never 400, never 600+.

**Measured Quartr ladder for reference** — `68 · 38 (rare) · 28 · 21 · 17`.
Our ladder sits deliberately close to it. `display` and `body` are Quartr-exact.

---

## 4. Spacing & Layout

```
--space-unit          4px      base — all values are multiples
--container-page      1280px
--container-wide      1328px
--container-reading   1024px
--section-pad-x       24px
--section-pad-y       160px
--section-pad-y-lg    192px    hero, major moments
--section-pad-y-sm    96px     tight sections
--grid-columns        12
--grid-gap            24px
```

Stack gap scale: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`

### Radius — Option B (Quartr-exact)

```
--radius-xs      3px      badges, tags
--radius-sm      4px      inputs, small controls
--radius-md      6px      cards               ← Quartr dominant
--radius-lg      8px      panels, media frames
--radius-full    9999px   buttons, pills, avatars
```

---

## 4.5 Responsive

Mobile-first. Breakpoints: **640 / 768 / 1024 / 1280**

### ⚠ The type scale CAPS at 1024px. There is no wide-breakpoint scale-up.

Measured on 2026-09-01: Quartr renders its `h1` at **68px on an 800px viewport and
68px on a 1512px viewport** — identical. It does not grow on wide screens. That cap
is exactly why it reads clean and composed at full screen rather than shouty.
Vestris is not a counter-example: its 96px hero is Instrument Serif at weight 400,
a far lighter instrument than a 550-weight grotesque.

**Never add a 1280+ type step.** Wide screens gain margin, not type size.

| Token | Mobile | Tablet | Desktop 1024+ (capped) |
|---|---|---|---|
| `display` | 36px | 48px | **68px** |
| `h1` | 30px | 36px | 44px |
| `h2` | 24px | 28px | 32px |
| `h3` | 19px | 20px | 22px |
| `h4` | 17px | 17px | 18px |
| `body-lg` | 17px | 17px | 18px |
| `body` | 16px | 16px | 17px |
| `small` / `eyebrow` / `caption` | 14 / 12 / 12 | 14 / 12 / 12 | 14 / 12 / 12 |

Layout still steps at 1280 — only type is capped.

| Token | Mobile | Tablet | Desktop | Wide |
|---|---|---|---|---|
| Section pad Y | 80px | 112px | 160px | 192px |
| Section pad X | 20px | 24px | 24px | 32px |
| Grid gap | 16px | 20px | 24px | 24px |
| Content column | 100% | 100% | 1280px | 1280px |

Grid columns: **1 → 2 → 3 → 3**
Touch targets: **≥ 44×44px**
Tracking note: at mobile `display` sizes, relax tracking to −0.035em — −0.05em collapses at small sizes.

---

## 4.6 State Tokens

### Button — Primary
| State | Background | Text | Border | Transform | Opacity |
|---|---|---|---|---|---|
| Default | `#090A0C` | `#EEF0F1` | none | none | 1 |
| Hover | `#101214` | `#EEF0F1` | none | `translateY(-1px)` | 1 |
| Active | `#090A0C` | `#EEF0F1` | none | `scale(0.98)` | 1 |
| Focus | `#090A0C` | `#EEF0F1` | ring 2px `#101214`/20%, offset 2px | none | 1 |
| Disabled | `#090A0C` | `#EEF0F1` | none | none | 0.45 |
| Loading | `#090A0C` | spinner | none | none | 0.8 |

### Button — Secondary
| State | Background | Text | Border |
|---|---|---|---|
| Default | transparent | `#101214` | 1px `#D2D5D7` |
| Hover | `#FBFCFC` | `#101214` | 1px `#949DA5` |
| Active | `#F4F3F0` | `#101214` | 1px `#949DA5` |
| Focus | transparent | `#101214` | ring 2px `#101214`/20% |
| Disabled | transparent | `#949DA5` | 1px `#E8E9EA` |

Both variants: `--radius-full`, 17px / 450, padding `12px 24px`.

### Input
| State | Background | Border | Ring |
|---|---|---|---|
| Default | `#FFFFFF` | 1px `#D2D5D7` | none |
| Focus | `#FFFFFF` | 1px `#101214` | 2px `#101214`/15% |
| Error | `#FFFFFF` | 1px `#A6503C` | 2px `#A6503C`/15% |
| Disabled | `#F4F3F0` | 1px `#E8E9EA` | none |

Radius `--radius-sm`.

### Card
| State | Background | Border | Shadow | Transform |
|---|---|---|---|---|
| Default | `#FFFFFF` | 1px `#E8E9EA` | **none** | none |
| Hover | `#FFFFFF` | 1px `#D2D5D7` | **none** | `translateY(-2px)` |
| Active | `#FBFCFC` | 1px `#D2D5D7` | none | `translateY(0)` |

**No drop shadows anywhere in this system.** Elevation is communicated by border + lift only.

---

## 4.7 Content Strategy

Placeholder identity — global find-and-replace to swap.

```
Fund name    Fieldnote Capital
Stage        Pre-seed and seed
Cheque       $250k – $2M, first cheque
Personality  Editorial · restrained · plainspoken
Style        Short declaratives. Fragments for emphasis.
Pronouns     "We" = the firm · "you" = the founder
Humor        Dry, rare
```

| Element | Max length | Rule |
|---|---|---|
| Hero headline | 48 chars | Belief statement, not a service description |
| Hero subhead | 120 chars | Concrete — stage, cheque, sector |
| Section headline | 40 chars | Scannable |
| Body paragraph | 3 lines | One idea per paragraph |
| CTA button | 3 words | Verb + noun, low friction |
| Portfolio blurb | 90 chars | What they do, plainly |
| Link text | 4 words | Descriptive, never "click here" |
| Eyebrow | 24 chars | Uppercase, mono |

**Headline formula:** Belief + Consequence
**CTA formula:** Low-friction action verb ("Send us a note", never "Submit application")
**Social proof:** Number + Noun + Timeframe

---

### Navigation metrics (Quartr-measured, 1512px)

| Property | Value | Source |
|---|---|---|
| Bar height | **56px**, flat at every breakpoint | Quartr exact |
| Link | `text-nav` 16px / 450 / `#485259` | Quartr exact |
| Link hit area | 42px tall, 12px horizontal padding | Quartr 40px / 12px |
| Wordmark | 18px / 550 + mono `eyebrow` lockup | — |
| CTA pill | `text-nav`, padding `20px / 10px` | — |
| Mobile toggle | 44×44 (fits inside the 56px bar) | WCAG target |

**Nav is furniture, not content.** It uses `text-nav`, which is deliberately *not*
derived from `--text-body` and deliberately constant across breakpoints. Do not
swap it back to `body`, and do not let it grow on wide screens.

---

## 5. Component Primitives

| Component | Style |
|---|---|
| Buttons | Filled near-black (primary) / Outlined (secondary) — **pill** |
| Cards | Flat, 1px border, no shadow, `--radius-md` |
| Inputs | Bordered, `--radius-sm` |
| Navigation | Sticky, transparent → `#F4F3F0` @85% + blur + bottom hairline on scroll |
| Links | Animated underline, wipe left→right, `--duration-fast` |
| Eyebrows | Mono, uppercase, `+0.12em`, often preceded by a 4px dot |

---

## 6. Animation Tokens

Tuned for **Silent**. Elastic/bounce deliberately excluded.

```
--duration-instant    120ms    hovers, micro
--duration-fast       220ms    buttons, links, toggles
--duration-normal     340ms    standard transitions
--duration-slow       620ms    entrances
--duration-dramatic   900ms    hero reveal

--ease-default        cubic-bezier(0.4, 0, 0.2, 1)
--ease-decelerate     cubic-bezier(0, 0, 0.2, 1)
--ease-accelerate     cubic-bezier(0.4, 0, 1, 1)
--ease-dramatic       cubic-bezier(0.16, 1, 0.3, 1)     ← workhorse

--stagger-tight       60ms
--stagger-normal      90ms
--stagger-relaxed     140ms

--translate-entrance     translateY(24px)
--translate-entrance-lg  translateY(40px)
--scale-hover            scale(1.015)
--scale-press            scale(0.98)
```

**Scroll rules**
- Trigger when element top hits 80% of viewport
- Animate **once** — never reverse on scroll up
- `prefers-reduced-motion: reduce` → instant, no transform
- Mobile: halve stagger counts, drop parallax

---

## 7. Asset Layer

### Image Style Token — Dithered Renaissance / Fantasy

**Source: user-provided.** Claude does not generate these. No prompt template required.

```
Subject matter    Renaissance / Baroque painting, mythic and fantasy scenes
Treatment         DITHERED — halftone / ordered-dither / error-diffusion
Tonality          Monochrome. Black #101214 on transparent or on the band colour.
                  No colour survives dithering — this is intentional and is what
                  lets the art live inside the no-chromatic-accent palette.
Dot structure     Fine grain. Dot pitch should not read as a visible pattern at
                  100% width on desktop, but may become legible on zoom.
Contrast          High — chiaroscuro source material dithers best. Preserve deep
                  blacks and blown highlights; mid-tone-heavy sources turn to mush.
Composition       Rule of thirds, subject off-centre.
                  Reserved negative space for type and UI overlay.
Aspect ratios     16:9 hero · 3:2 band · 21:9 CTA · 1:1 portrait
Format            PNG with alpha preferred (lets the band colour show through),
                  or 1-bit/greyscale PNG. Never JPG — dither + JPG = artefacts.
```

**Never:** colour, gradients, soft focus, photoreal render, modern objects,
legible text inside the art, smiling stock people.

### Global image rules

- All art is **monochrome dithered**; it inherits the band's background colour through alpha
- On `#F4F3F0` / `#FBFCFC` bands: art in `#101214`
- On `#090A0C` dark bands: art inverted to `#EEF0F1`, 55–65% opacity
- Media frames: `--radius-lg` (8px), 1px `#D2D5D7` border, no shadow
- **Never full-bleed behind body copy** — art stays contained
- Art appears in **hero + at most two bands**. Quartr is imagery-light; the paintings
  are the loudest element on the page and must stay rationed.
- Serve at 2× for retina. Dither degrades badly when browser-scaled — supply at the
  exact rendered dimensions where possible.

### Asset Inventory

Status: ⬜ Not started · 🟡 Draft · 🟠 In review · 🟢 Approved · 🔵 Implemented · ⚫ Archived

| # | Section | Asset | Source | Build method | Animation | Specs | Status |
|---|---|---|---|---|---|---|---|
| 1 | Hero | `hero-dither` | **User-provided** | Dithered PNG (1-bit duotone) | Slow parallax ±4% | 1600×700 (21:9), Creation of Adam | 🔵 |
| 2 | Hero | `hero-card` | Claude | Code-rendered React + Motion | Scroll-in stagger 90ms | Portfolio panel, 880px, mono figures | 🔵 |
| 3 | Thesis | `calumny` / `image57` / `venus` plates | **User-provided** | Dithered PNG grounds | Stagger 90ms | 3 × 320px panels, 78%/71% UI coverage | 🟠 |
| 3b | Thesis | 3 × mini-UI | Claude | Code-rendered React + SVG radar | Stagger 90ms | Max 300px, floats on plate | 🔵 |
| 4 | Portfolio | `logo-grid` | Claude (placeholder) | Inline SVG | Grid stagger 90ms | Monochrome `#EEF0F1` on dark | ⬜ |
| 5 | Focus | `focus-icons` | Claude | Inline SVG, 1.5px stroke | Hover draw | 24×24 | ⬜ |
| 6 | Process | `process-line` | Claude | Code-rendered SVG path | Scroll-scrubbed draw | Hairline `#D2D5D7` | ⬜ |
| 7 | Team | `partner-portraits` | **User-provided** | Dithered PNG + alpha | Fade + lift | 1:1, 3 partners | ⬜ |
| 8 | Insights | `insight-cards` | Claude | Code-rendered React | Stagger | No image | ⬜ |
| 9 | CTA | `cta-dither` | **User-provided** | Dithered PNG, inverted | Fade | 21:9, dark band, 60% opacity | ⬜ |

Drop provided art into `public/art/` using the asset name above as the filename.

---

### BUILD MODE — Hi-fi greyscale wireframe (current pass)

Sections are built in two passes.

**Pass 1 — Hi-fi wireframe (now).** Real type, real spacing, real tokens, real copy,
real motion. Every image slot is a flat `#E8E9EA` block with a 1px `#D2D5D7` border,
`--radius-lg`, at the exact final aspect ratio, labelled in Geist Mono `eyebrow` style
with the asset name and dimensions. No Lorem Picsum. No gradients standing in for art.

Because the final art is **monochrome dithered**, these grey blocks are a close tonal
proxy for the finished page — the wireframe pass should read within ~90% of final.

**Pass 2 — Asset swap.** Replace each placeholder with the provided dithered PNG.
Layout must not shift: placeholders are locked to final aspect ratios.

---

## 8. Tech Stack

```
Framework     Next.js (App Router) + React + TypeScript
CSS           Tailwind v4 — @theme maps 1:1 to the tokens above
Animation     Motion (framer-motion) + Lenis smooth scroll
Scroll reveal Motion's useInView (80% threshold, once: true)
Icons         Lucide, 1.5px stroke
Fonts         next/font — Geist Sans (variable) + Geist Mono
Location      E:\BMAD\fieldnote-capital
```

---

## 9. Section Map

| # | Section | Background | Notes |
|---|---|---|---|
| 1 | Navigation | transparent → `#F4F3F0` | Sticky, hairline on scroll |
| 2 | Hero | `#F4F3F0` | Display type + painting + floating card |
| 3 | Thesis | `#FBFCFC` | Type-only statement, word reveal |
| 4 | Portfolio | `#090A0C` | **Dark band 1** — logo grid |
| 5 | Focus Areas | `#F4F3F0` | 3-col, line icons |
| 6 | Process | `#FBFCFC` | Numbered, scrubbed hairline |
| 7 | Team | `#F4F3F0` | Painterly portraits |
| 8 | Insights | `#FBFCFC` | Editorial cards |
| 9 | CTA | `#090A0C` | **Dark band 2** — art at 60% |
| 10 | Footer | `#090A0C` | Minimal, continues band 2 |

---

## Change log

| Date | Change |
|---|---|
| 2026-09-01 | v1.0 drafted. Geist-only (serif rejected). Quartr promoted to primary. Radius Option B. Dark mode removed. Imagery: Renaissance + fantasy. |
| 2026-09-01 | v1.1 — Type scale recalibrated to Quartr's measured ladder; **1280+ type step removed** (Quartr caps at 68px). |
| 2026-09-01 | v1.2 — Added `--text-nav` (16px, constant). Nav is chrome, not content. Bar 64/72px. |
| 2026-09-01 | v1.3 — Added art-layer duotone tokens. Media respects `--container-page`; art is never full-bleed. |
| 2026-09-01 | v1.4 — Renamed `--container-max` → `--container-page`. See naming trap below. |

---

## Gotchas learned in build (do not regress)

### Tailwind v4 token-namespace collisions
`@theme` keys are not inert names — they generate utilities.

| Namespace | Generates | Collision risk |
|---|---|---|
| `--container-*` | `w-*`, `max-w-*`, `min-w-*`, `basis-*` | **High** |
| `--color-*` | `bg-*`, `text-*`, `border-*`, `fill-*` | Low |
| `--text-*` | `text-*` (size) | Medium |

`--container-max` redefined the built-in **`w-max`** from `max-content` to `1280px`,
silently clamping the marquee track. Renamed to `--container-page`.
**Never name a `--container-*` key** `max`, `min`, `fit`, `full`, `auto`, `screen`, `px`.

### `@theme static` is required
Tailwind v4 tree-shakes theme variables no component references. The responsive
overrides in this file are plain CSS and assume the variables always exist, so a
tree-shaken `--text-display` is defined above 768px and undefined below it.
`static` forces every token to emit.

### Container max-width must track the gutter
`max-width` is `--container-page + 2×padding`, redeclared at each breakpoint.
A single fixed max-width narrows the content column at wider gutters.

### Dev vs production
- `next dev` and `next start` share `.next` — running both corrupts production chunks.
- `Cannot read properties of undefined (reading 'call')` preceded by
  `[Fast Refresh] performing full reload` is an HMR stale-chunk artifact, not an
  app bug. Confirm with a production build before chasing it.

---

## Plate consistency — open issue

The supplied plates do not share a duotone. Measured 2026-09-01:

| Plate | Ink | Paper |
|---|---|---|
| `hero-dither` (Creation of Adam) | `#4B0F04` oxblood | `#EDDADA` |
| `nastagio-dither` | `#4B0F04` oxblood | `#EDDADA` |
| `calumny-dither` | `#280A04` near-black | `#FDC6C6` |
| `image57-dither` | `#380D04` umber | `#FDC6C6` |
| `venus-dither` | `#A6503C` terracotta | `#FDC6C6` |

Three inks across two papers. The Thesis trio is chosen to share `#FDC6C6`, but
their inks still differ, and `venus` is visibly lighter than the other two.
Answerr's equivalent panels are identical in treatment.

**Recommendation:** re-export every plate on one ink + paper pair. `#4B0F04` on
`#EDDADA` (the hero pair) is the strongest — the darkest ink holds the most
detail after dithering. Until then `lib/plates.ts` carries per-file grounds so
nothing mismatches its frame.

---

## Anti-slop gate

`no-ai-design-slop` runs at the end of **every** section, before the section is
presented for approval. Findings and fixes are recorded here.

### Pass 1 — Sections 1–3 (2026-09-01)

| # | Finding | Verdict | Action |
|---|---|---|---|
| 1 | Marquee animated a list that already fit (1058px content in a 1280px frame) — motion with nothing to signal, contradicting the Silent energy token | Fixed | Roster 6 → 12 so it genuinely overflows (2072px). Comment added: if trimmed below overflow, drop the marquee |
| 2 | Hero eyebrow "First cheques since 2019" restated the headline "We write first cheques" — a decorative label adding only a year | Fixed | → "Fund III · Now investing" |
| 3 | Two 1px `--color-line-subtle` "technical margin rules" in Hero only — invisible on `#F4F3F0` and a one-off, so they read as accident not grid | Removed | A rule layer must be page-level and deliberate, or absent |
| 4 | Thesis column titles used `text-nav` (documented chrome-only) plus arbitrary `tracking-[0.06em]` | Fixed | New `--text-label` content token (15/550/+0.06em) |
| 5 | `bg-page/60` — undeclared opacity variant in PortfolioPanel | Fixed | Solid `bg-page` |

**Flagged, not fixed — product truth.** Portfolio companies, metrics, deal
figures and the "Backed at first cheque" roster are all invented. Placeholder
copy is authorised for this build, but this is manufactured proof and must be
replaced with real data — or explicitly labelled illustrative — before launch.
The Hero panel also frames a VC firm as having a live product dashboard, which
is a positioning claim, not just a visual.

### Pass 2 — deeper catalog review, Sections 1–3 (2026-09-01)

| # | Catalog ref | Finding | Action |
|---|---|---|---|
| 1 | §8 / §10 | **31 elements shipped at inline `opacity:0` in the server HTML** — nav included. With scripting off, or if hydration fails, the page renders blank. Not theoretical: a hydration error occurred during this build | Fixed — `<noscript>` override in `<head>` forces the resting state (verified: the selector matches all 31 SSR nodes) |
| 2 | §8 | `PortfolioPanel` used a hand-rolled `animate: inView ? {…} : undefined`. If the observer never fires, `animate` stays undefined and the panel is invisible forever | Fixed — motion-managed `whileInView` + `viewport.once`, which always resolves. Same for the sparkline `pathLength` |
| 3 | §3 | Border nesting reached **4 levels** in Thesis (grid cell → art panel → mini-UI → chip). The Answerr inner panel has no border | Fixed — dropped the art panel border; radius + plate paper define the edge |
| 4 | §7 / §9 | A **"LIVE" status pill with a dot** sat on entirely static mock data — a false real-time claim | Removed. Header still reads Portfolio · Q3 2026, so nothing was lost |
| 5 | §2 / §4 | Hero "technical margin rules" restored **with a job** after user pushback: they now frame the logo band (horizontals bound it, vertical end-ticks mark the column edges), drawn in `--color-line` not `--color-line-subtle` | Reinstated, corrected |

**Reviewed, judged acceptable — not changed:**
- **67 uppercase mono labels.** Only ~6 are page chrome; the rest are inside the
  code-rendered data panels, where mono labels are what real data UI looks like.
  Not the "fake sophistication" cluster.
- **Uniform entrance motion** (opacity + 24px rise, 620ms, one easing). The
  catalog warns about reflexive sameness, but here it is the locked §6 motion
  language. Consistency is the system working, not slop.
- **Double uppercase in Thesis columns** (mono tag + sans title). Reference-
  faithful — Answerr does exactly this.

**Still open — product truth.** Invented companies, metrics, deal figures and the
"Backed at first cheque" roster. Authorised as placeholder; must become real or
be labelled illustrative before launch.

---

## Section 5 — Focus Areas (built 2026-09-01)

Layout reference: the "Engineered for Business Growth" composition — split
header, then `2 cards | centre visual | 2 cards`, each card led by a bracketed
index. **Translated, not copied:** light band instead of dark, Geist instead of
the reference serif, dither plate instead of a mesh gradient, our radius,
border, and motion language throughout.

- Centre visual: `nastagio` plate + a code-rendered screening stack
  (three memos at three verdicts — the section's actual subject)
- Mobile order: visual → 01 → 02 → 03 → 04, so the numbered count stays unbroken
- Stack is entrance-only, never looping: a perpetual animation beside body copy
  buys nothing and costs reading attention

### Section map change

Portfolio (4) is **deferred**, and Focus was built light, not dark. The section
map's two dark bands were Portfolio and CTA. With Portfolio deferred the only
dark band currently planned is the CTA — decide whether Portfolio returns as the
second dark band, or the rhythm stays light until the CTA.

Dark-band tokens were drafted and then **removed** — nothing uses them yet, and
speculative tokens rot. Re-add them when the CTA band is actually built:
`dark-bg #090A0C · dark-surface #141618 · dark-line #22262A · on-dark #EEF0F1`.

### Plate manifest correction

The `nastagio` key pointed at `image57-dither.png` — the wrong painting. Split
into `panel` (image57, unknown subject, honest alt) and `nastagio` (the actual
Botticelli plate, `#4B0F04` on `#EDDADA`). Thesis now references `PLATES.panel`.

### Anti-slop gate — Pass 3, Section 5

| Catalog ref | Finding | Action |
|---|---|---|
| §7 | Cards had `hover:-translate-y-0.5` + border change but are `<article>`, not links — hover feedback promising a click target that does not exist | Removed. They are content, not controls |
| §2 | Code comment claimed mobile stacked `01, 02, visual, 03, 04`; `order-first` actually renders visual first | Comment corrected to match verified behaviour |

**Checked, clean:** bracketed `[01]`–`[04]` earn their place (the lede promises
"four things"); no new colours, radii, or easings; heading levels h2 → h3 with no
skip; alt text present; 4 equal-height cards match the visual's height exactly
(440px), so no dead column; no horizontal overflow at 390 or 1440.

---

## Section 4 — Portfolio (built 2026-09-01)

Reference: Edoardo Lunardi's stacked file-folder drawer.

**Kept:** the folder metaphor, tabs staggered across the top edge, the receding
lapped stack, the drawer front, the filled-tab accent.

**Changed:** the reference fans folders open *on scroll*. Scroll-driven opening
traps the reader and cannot be operated by keyboard, so opening is an explicit
control — which also gives the filled black tab a real job it did not have in the
reference: it is now the **active state**.

- Accordion: `<h3><button aria-expanded aria-controls>` + `role="region"`
  `aria-labelledby`. One folder open at a time, like a real drawer.
- Below `sm` the stage and cheque move from the header row into the open panel,
  rather than being dropped.
- Six items reuse the logo-strip roster — one placeholder identity set, not two.

### Band alternation corrected

Adding Portfolio put two identical backgrounds side by side. Focus moved to
`page-alt` so the page now alternates cleanly:

`Hero #F4F3F0 · Thesis #FBFCFC · Portfolio #F4F3F0 · Focus #FBFCFC`

### Hero column rules — reinstated

Restored at `--color-line` after user pushback. The original objection stands
against the *old* version only: drawn in `--color-line-subtle` they were
invisible on `#F4F3F0`. At `--color-line` they mark where the content column
begins and ends, and pair with the horizontals framing the logo band.

### Anti-slop gate — Pass 4, Section 4

| Catalog ref | Finding | Action |
|---|---|---|
| §4 / §10 | Every tab label was clipped ("INDUSTRIAL …", "DEVELOPER T…") by a fixed 132px tab. A clipped label is worse than no label | Intrinsic width; 0 truncated |
| §3 | The folder body's top border drew a hairline across each tab's base, so tabs read as stickers rather than part of the folder | Tab laps the border by 1px (`bottom:-1px`) |
| §2 / §10 | At 390px the widest tab cleared the column edge by **3px** — passing, but one longer sector name from overflowing | Tab step scaled below `sm` + `max-width:100%` so overflow is structurally impossible. Clearance now 122px |

**Known, not a defect:** `#insights` and `#cta` are dead anchors until Sections
8 and 9 exist. Nav "Notes" is the same. They resolve when those sections land.

### Stale-HMR postscript

The React "unique key prop" warning that persisted across several reloads was
**stale HMR state**, not a live error — the fix (key before the props spread)
had worked immediately. A clean `.next` wipe and dev restart cleared it: console
is now silent. Same root cause as the earlier `Cannot read properties of
undefined` episode: running `next build` while `next dev` holds `.next`.

---

## Section 4 — Portfolio, rebuilt as scroll-driven (2026-09-01)

The accordion version was wrong. I had substituted click-to-open for the
reference's scroll-driven motion and justified it on accessibility grounds —
but the motion *is* the design, and the accessibility concern was solvable
rather than disqualifying.

Mechanic, read frame-by-frame off the reference recording:

- Folders recede upward, each wider than the one above (70% → 92%), tabs
  stepping left/right, every third tab solid.
- A dark record card occupies the space **directly above the active folder**,
  covering every folder above it — that is what makes the stack read as a
  drawer being worked through rather than a list.
- Scroll advances a read head down the stack; the card slides one row per item
  and swaps contents. Counter tracks `REC n / total`.

**Geometry:** `stage = HEADROOM + N·ROW + DRAWER`. Folder *i* sits at
`HEADROOM + i·ROW`, so a card of height `HEADROOM` translated to `y = i·ROW`
lands its bottom edge exactly on the active folder's top edge.

**Lenis** added (`components/SmoothScroll.tsx`) — the eased scroll is what makes
the read head feel continuous. Skipped entirely under `prefers-reduced-motion`,
and it disables the native `scroll-behavior: smooth` while running, because the
two fight on anchor jumps.

### Anti-slop gate — Pass 5, Section 4 rebuild

| Catalog ref | Finding | Action |
|---|---|---|
| §8 / correctness | Card animated `top` from a computed `auto`, which motion cannot interpolate. It stuck at the last row's offset and never returned when scrolling back up | Animate `y` (transform) instead — correct in both directions, and off the layout path |
| §7 / §10 | `aria-live="polite"` on the card announced **all six records** to anyone scrolling past | Removed. The card is not a live region |
| §10 | The sr-only fallback list contained `<a>` elements — invisible focus targets that trap keyboard users in dead space | Text only. The visible card keeps the real, focusable link |
| §8 | Pinned run length | 6 files × 62vh + 100vh ≈ 4.7 screens. Proportionate to the content; a pinned run that outlasts its content is a trap |

**Reduced motion:** renders `StaticList` — the same six records as plain cards,
no pinning, no read head, no Lenis.

### ⚠ Verification limit in this environment

The Browser pane throttles `requestAnimationFrame` to **1 fps** despite
reporting `visibilityState: "visible"`. Animation *correctness* was verified by
settling and measuring end states (read head maps `progress → index` exactly;
card `y` matches `index × ROW` in both directions). Animation **feel** — timing,
easing, whether the run is paced well — could not be judged here and needs a
real browser. This also explains the stale screenshots seen throughout the
build.

---

## Portfolio — HIDDEN (2026-09-01)

Hidden at request, not deleted. `components/Portfolio.tsx` is untouched and the
scroll-driven build is intact.

**To restore, uncomment all three together:**
1. the `Portfolio` import in `app/page.tsx`
2. `<Portfolio />` in the page body
3. the `Portfolio` entry in `LINKS` in `components/Nav.tsx`

**Knock-on handled:** the hero's secondary CTA was `See portfolio → #portfolio`,
which became a dead anchor. Repointed to `How we work → #thesis` (3 words, still
inside the §4.7 CTA cap). Revert with the three above.

`#insights` and `#cta` remain dead until Sections 8 and 9 land — unrelated.

### Dev/prod build collision — fixed structurally

`next dev` and `next build` shared `.next`, so building while dev ran corrupted
it and the server returned 500s. It happened three times. `next.config.ts` now
reads `distDir` from `NEXT_DIST_DIR`:

| Script | Dir | Port |
|---|---|---|
| `npm run dev` | `.next` | 3210 |
| `npm run build:prod` / `start:prod` | `.next-prod` | 3211 |

They can now run at the same time without touching each other.

---

## Section 4 — Portfolio, rebuilt as TRACK RECORD (2026-09-01)

The folder-drawer build is replaced. New reference: the "working capital fire
drills" composition — pill eyebrow, centred headline + lede, segmented tab bar,
then alternating text / visual rows with a floating card in each panel.

**Content reframed at request:** not product features. A fund's proof is its
numbers, so each row is anchored by one figure — **pace** (11 days to decision),
**conviction** (68% follow-on), **longevity** (47 companies, 7 years). One card
shape, three sets of figures.

**Translated, not copied:**

| Reference | Ours |
|---|---|
| Green + lime accent | Achromatic near-black — no chroma outside the art layer (§2) |
| Flat grey panels | Dither plates, as everywhere else |
| Decorative segmented control | **Real anchors + IntersectionObserver scroll-spy** |

The tab bar is the notable change. In the reference it highlights but does
nothing — a segmented control that looks operable and isn't is a fake affordance
(§7). Ours are anchors to each row with a genuine active state.

Verified: spy tracks (pace→Pace, conviction→Conviction, longevity→Longevity) ·
rows alternate `true, false, true` · mobile 390 tab bar 293px, no overflow ·
`aria-current="location"` (canonical for scroll-spy, not `"true"`).

Dead anchor `#cta` remains until Section 9 lands.

---

## Ruling layer + logo grid (2026-09-01)

### `components/Rules.tsx`
- **`<ColumnRules />`** — the two verticals, extracted from the Hero so they are
  a shared device rather than a one-off. Applied to **Hero and Portfolio only**
  (by request); Thesis and Focus stay unruled.
- **`<PatternBand />`** — hatched measure strip (repeating-linear-gradient, one
  element, exact pitch at any width). Above and below the hero plate.

**Portfolio gutter:** rows carry `lg:px-10 xl:px-12` so content clears the rules
by 48px. Text or media butting the rule line reads as collision, not alignment.

### Marquee → `LogoGrid`
Twelve lockups, `6 × 2` at lg (exactly two rows), `4 × 3` and `3 × 4` below.
Internal hairlines only — last column and last row suppressed — so the grid
rules read as dividers, not a box inside the band's own frame. Entrance stagger
only, no perpetual loop. `LogoMarquee.tsx` deleted.

**Rule-weight bug caught in review:** grid cells were drawn in
`--color-line-subtle` while every other rule on the page uses `--color-line`.
Two rule weights in one band read as a mistake. Unified to `--color-line`.

Also: the hero logo band lost its top border (`border-y` → `border-b`) — the
pattern band above already supplies that line, so the two were doubling.

### New plate set — the consistent one
`garlands` · `assembly` · `tondo`, all **`#460707` on `#FFFFFF`**. One ink, one
paper, unlike the first batch (three inks, two papers). Now used across the
Portfolio rows. Titles are not asserted in alt text — the source filenames did
not match the crops, so alt describes the image instead.

### Text balance
`text-balance` on all display/h1/h2/h3 except the hero `h1`, which carries an
explicit `<br>` (balance and a hard break fight each other). `text-pretty` on
body paragraphs.

---

## Logomark + nav ruling (2026-09-01)

`components/Logo.tsx` — **only the `logomark` group** from the supplied SVG.
That file's `logotype` group is placeholder lettering ("Logoipsum"), so shipping
it whole would have put lorem where the brand name goes. The mark pairs with our
own Fieldnote / CAPITAL text lockup.

Source fills `#FF2121` and `#540000` replaced with `currentColor`; the mark
inherits `--color-ink` and can never carry an off-palette value. Verified: zero
non-`currentColor` fills in the header.

**Nav column rules** added at the same x as the hero's — measured `[73, 1352]`
in both, so the bar and the sheet below read as one ruled grid. `lg` and up only.

## Portfolio row dividers

The gutter moved from the rows' parent onto the inner grid. With it on the
parent, the divider was inset too and floated short of the verticals. Now the
row carries `border-t` at full width (**spans 73 → 1353, rule to rule**) while
content stays inset by 48px.

---

## Refinements (2026-09-01, later)

- **Logo:** `Fieldnote` only — `CAPITAL` removed from the nav lockup. The link's
  `aria-label` still reads "Fieldnote Capital — home", which keeps the full name
  available to assistive tech and satisfies WCAG 2.5.3 (visible text is a subset).
- **Nav gutter:** `lg:px-8 xl:px-10` so the lockup and CTA clear the column
  rules by 40px, matching the Portfolio treatment.
- **Hero plate:** radius removed (`rounded-lg` → square) and the pattern bands
  sit flush. `PatternBand` no longer draws its own `border-y`; the caller passes
  the single edge it needs, so a band against a framed element never doubles the
  rule to 2px. Verified: gap 0, frame radius 0, band and frame both 1280px, edges
  aligned.
- **Focus lede:** `max-w-[46ch]` → `[34ch]`.

### Another plain-CSS-beats-utility trap

`pb-0` on the Portfolio section reported **160px**. The `.section` padding lives
in plain-CSS media queries that sit *after* Tailwind's utility layer, so a
single-class utility loses. Fixed with two-class modifiers rather than
`!important`:

```css
.section.section-flush-b { padding-bottom: 0 }
.section.section-flush-t { padding-top: 0 }
```

`(0,2,0)` outranks `.section` `(0,1,0)` at every breakpoint. Same family as the
`--container-max` / `w-max` collision — **when a rule is authored in plain CSS
in this file, Tailwind utilities cannot override it by ordering alone.**

---

## Section 6 — Process (built 2026-09-02)

Reference: the Attio "Platform" composition, measured live at 1440px rather
than read off a screenshot.

### What the measurement produced

| Property | Reference (measured) | Ours |
|---|---|---|
| Section headline | 40px / 44px / 500 / -0.4px | `text-h1` 44px / 48.4 / 550 / -1.76px |
| Two-tone split | same size+weight, **colour only** | same — ink + ink-secondary |
| Index label | 15px, padding 16/20 | `text-nav` 16px, padding 16/12 |
| Index rail | 344px, `border-r` | 264px lg / 288px xl, `border-r` |
| Panel slot | product view, changes per tab | deal-file record, changes per tab |

The **two-tone headline** is the transferable idea: both halves identical in
size, weight and tracking, separated by colour alone. Claim in ink, mechanism
in grey. Costs no new tokens. Used **once** — the reference uses it twice, and
at our smaller composition a second use is a tic, not a signature.

### Deviations, and why

- **Tabs, not scroll.** Instructed. The reference drives its index from a
  sticky nav over a pinned column. A real control means the real ARIA pattern:
  roving tabindex, Home/End, arrows on **both** axes (horizontal scroller below
  lg, vertical rail above), and `aria-orientation` switched on a matchMedia so
  it never tells a screen-reader user the wrong arrow keys.
- **No dither plate.** All eight plates were already spent — Thesis holds
  calumny/panel/venus, Focus holds nastagio, Portfolio the white trio, Hero the
  Creation. Any plate here is a literal repeat. The reference's slot is a
  product view anyway, so the panel holds a **deal-file record** instead.
- **Background `bg-page`, not `#FBFCFC`** as §9 specifies. §9 assumed Portfolio
  was a dark band; it is now light, so the alternation shifted one section.
  Focus is already page-alt — two page-alt bands in a row separate nothing.

### Colour ladder

    page #F4F3F0  →  frame #FFFFFF  →  active tab #F4F3F0

The active tab cuts through the frame to the page colour beneath. This is why
the frame is `--color-surface` and not `--color-page-alt`: on `#FBFCFC` a white
active fill is invisible.

### Elapsed-time rail

One equal cell per step; the dot sits at its cell centre and the label is
centred in the same cell, so they align **by construction** at any width.

A first pass placed dots at weighted percentages (4/38/76/100) with labels on
`justify-between`. Measured result: "Day 11" sat **58px** from its own dot at
1440px, and "Day 0" **clipped off the left edge** at 375px. Geometry that needs
hand-tuning per breakpoint will drift — let the grid do it.

### Anti-slop gate — Pass 6, Section 6

| Check | Result |
|---|---|
| System | Pass — no new tokens, no new radius, no new easing |
| Hierarchy | Pass — 44 → 22 → 17, one focal point |
| Composition | Pass — 0px dot/label misalignment, no collision at 375 |
| Typography | Pass — roles distinct, no forced tracking |
| Colour/material | Pass — every rule and fill has a state or structural job |
| **Product truth** | **Corrected** — see below |
| Interaction | Pass — hover, focus-visible, selected, keyboard |
| Motion/access | Pass — reduced-motion path, no decorative motion |

**Material correction — duplicated content strips.** The deal file rendered
three label/value rows and the facts strip rendered three more, 24px apart,
saying the same thing. Step 04 repeated all three verbatim:

| Deal file row | Facts strip |
|---|---|
| Cadence — First Tuesday, monthly | Partner time — Monthly slot |
| Reserved — 2.5× the first cheque | Reserved per deal — 2.5× |
| Introductions — Warm only, never a list | Introductions — Warm only |

A repeated component expressing a convenient template, not a real second
content type. Fixed by splitting the jobs: the **record** carries the
qualitative material (the agenda, who we called, the reasoning), the **strip**
carries the hard parameters. Step 04's list was rewritten so it no longer
paraphrases its own facts. Deal file **400px → 279px**.

Labelled `Deal file · specimen` on purpose. The figures are placeholder, and a
header naming an invented portfolio company would read as a claim.

### Verified by measurement

- Frame height **identical across all four tabs** (0px jump)
- Rail fill lands exactly on the active dot, 0px misalign, every step
- Keyboard: ArrowDown/Up/Left/Right, Home, End, wrap — all correct
- Mobile: tab row scrolls horizontally on arrow-key nav **without** dragging
  the page vertically (`focus({preventScroll:true})` + manual `scrollIntoView`)
- 375px: no page overflow, no label collision, no text clipped
- `tsc` clean · production build clean

---

## OPEN — site-wide contrast failure on micro-labels

Measured during Pass 6. **Not fixed: changing it touches all five approved
sections, so it needs sign-off.**

`--color-ink-tertiary` `#949DA5` is used for every 12px mono uppercase label on
the site — StatCard terms, eyebrows, facts strips, column labels.

| Foreground | Ground | Ratio | WCAG AA needs |
|---|---|---|---|
| `#949DA5` | `#FFFFFF` surface | **2.75** | 4.5 |
| `#949DA5` | `#FBFCFC` page-alt | **2.68** | 4.5 |
| `#949DA5` | `#F4F3F0` page | **2.48** | 4.5 |

It fails everywhere, and it fails the 3.0 large-text floor too.

Proposed one-line change: `--color-ink-tertiary: #696F75`, which clears 4.5:1
on all three grounds while staying a light grey. Reverts in one line.

Two uses **were** fixed inside Section 6, because they were that section's own
new choices rather than inherited ones:
- the grey half of the two-tone headline → `ink-secondary` (2.75 → **7.99**)
- idle tab labels, which are live controls → `ink-secondary` (2.75 → **7.99**)

---

## Section 6 — Process, revised against supplied screenshots (2026-09-02)

Two full-section screenshots of the reference corrected three structural
readings, and four new plates arrived for the band.

### Structure now

    ┌─ side rules run the WHOLE section, through its padding ───────┐
    │  eyebrow + headline                                           │
    ├───────────────────────────────────────────────────────────────┤
    │  tabs   │  blurb                                              │
    │         ├─────────────────────────────────────────────────────┤
    │         │  plate as ground, record floating on it             │
    │         ├─────────────────────────────────────────────────────┤
    │         │  cell        │  cell                                │
    └───────────────────────────────────────────────────────────────┘

- **Square frame.** Its `border-x` lands on x=73 / 1352 — measured identical to
  the Hero and Focus `ColumnRules`. `ColumnRules` is now on the section too, so
  the verticals carry through the section padding above and below the frame
  instead of starting and stopping at a box.
- **Active tab is a 2px bar on the left rule**, not a filled pill. Measured at
  x=74, i.e. sitting on the frame border. One `layoutId` element: an underline
  on the mobile row, a bar on the rail at lg.
- **Panel closes on two cells** divided by a rule, not a three-up spec strip.
- **Blurb at `text-h3`** (22px), not `text-body-lg` (18px) — at 18px under a
  44px headline there was no step between them.
- **Headline is ONE colour.** The reference splits it ink/grey and the first
  pass copied that; a heading that changes colour mid-sentence reads as two
  thoughts. The ink-lead / grey-rest pattern still runs at body scale in the
  blurb and the closing cells, where it works as emphasis.

### The plate set

Four continuous-tone plates supplied. Assigned by TONE, not subject:

| Step | Plate | Mean luminance |
|---|---|---|
| 01 First call | river | 166 |
| 02 Diligence | pastoral | 99 |
| 03 Decision | banquet | 81 |
| 04 After the wire | symposium | 68 |

A ramp, not an alternation — pressing through the tabs must not flash the band
light/dark/light. It reads as a narrative too: open water, the flock, the table
set, the company kept.

Re-encoded 4000px PNG → 1400px WebP, **15.6 MB → 2.3 MB**. PNG was the wrong
container for continuous tone: re-saving two of them at *smaller* pixel
dimensions produced *bigger* files than the originals.

### Anti-slop gate — Pass 7

**Duplication returned and was caught again.** Reinstating the parameter strip
inside the record put it back-to-back with the closing cells, and the cells
were restating it almost verbatim:

| Param | Cell lead |
|---|---|
| Who you meet — One partner | "One partner." |
| Deck required — No | "No deck required." |
| Decision — Day eleven | "Day eleven, median." |
| Reserved — 2.5× the cheque | "2.5× held back." |
| Introductions — Warm only | "Warm only." |

All eight cells rewritten to carry consequence rather than echo the figure, and
each checked against that step's blurb, list AND params. The three blocks now
hold three jobs: the record's list is qualitative, its strip is the figures,
the cells are what it means for the founder.

**Floating "Next step" control removed.** It copied the popover the reference
overlaps its screenshot with, but it landed on the rail — covering the last dot
and the "Ongoing" label — and duplicated what the tabs already do. The
reference can overlap because its screenshot has empty space; a dense record
cannot. Reserving dead space to host it would have been designing for the
ornament.

### Layout stability — every variant is stacked, not keyed

Seven blocks per step (blurb, 3 params, list, 2 cells) render into one grid cell
and cross-fade, so each is always as tall as its own tallest variant. Verified:
28 stacked elements, exactly 7 at full opacity, **0px frame jump at 320 / 375 /
768 / 1440**.

This replaced four hand-tuned `min-height` values that were each only correct at
the width they were measured at. Bugs it fixed along the way:

| Symptom | Cause |
|---|---|
| 5px jump | blurb outgrew its own 188px floor on steps 02–03 |
| 22px jump | step 04's cells wrap one line shorter |
| 8px jump | status chip squeezed the record title until it wrapped — on three statuses but not the short one |
| 58px misalignment | rail dots on weighted percentages, labels on `justify-between` |

**Cross-fade is staggered, not simultaneous.** Outgoing leaves in 120ms, incoming
waits 100ms then takes 260ms. A straight cross-fade of stacked TEXT ghosts — both
sentences legible through each other for the whole transition. The plate keeps a
plain cross-fade: photographs dissolve cleanly, words do not.

**Click no longer scrolls the page.** `scrollIntoView` now runs only for keyboard
moves. On a pointer click the tab is by definition visible, and calling it anyway
walked the whole section up the viewport every time.

---

## Section 5 — Focus, ruled header (2026-09-02)

`ColumnRules` added, and the heading / lede / CTA row rebuilt as a ruled band —
the Hero logo-strip device: `border-y` plus vertical end-ticks at the column
edges. The ticks are drawn locally rather than left to `ColumnRules` because
`ColumnRules` is lg-only and the band needs its edges at every width.

Right-hand block moved from `justify-self-start` to `justify-self-end`. It began
at column 8 and stopped short of the column edge, leaving it hanging mid-row
with no edge to sit against. Now flush at x=1312, 40px inside the band's rule.

---

## Section 6 + 5 — refinements (2026-09-02, later)

### Process

- **Scroll reveal, staggered 90ms** on pill → headline → index → panel. The
  section previously had one `whileInView` on the frame, which faded the whole
  block in as a unit — that is a fade, not a reveal, and it was the only motion
  the section had. The frame no longer animates: rules and borders are page
  structure and stay put, the CONTENT arrives.
  `amount` drops to 0.05 for the 900px panel; at 0.25 it would not trigger until
  a quarter of it had cleared the fold.
- **Frame background removed.** It was `bg-surface` on a beige section, which
  made it a white slab rather than a ruled region of the page. The only white
  left in the section is now the record card floating on the plate.
- **Record centred in the band** (measured 213px of plate either side), not
  pinned right.
- **Feature cells vertically centred.** Each cell is as tall as its tallest
  variant across the four steps, so a short one sat top-aligned in a tall box.

### Focus

- **Ruled lead-in above the band.** Section-wide `ColumnRules` carried the
  verticals down alongside the card grid, where the cards already have their own
  borders and the rules read as a second, competing frame. The section now uses
  `section-flush-t` plus a spacer whose heights mirror `.section` exactly
  (80 / 112 / 160), with the rules inside it — so they run through the space
  above the band and terminate on its top rule. Verified: lead-in bottom 190,
  band top 190.
- The band keeps its own end-ticks. `ColumnRules` is lg-only; the band needs
  edges at every width.

### Gotcha, hit twice now

A JSX comment cannot be the first thing inside `return (` before the root
element — it parses as an object literal and throws TS1005. Put it above the
`return`.

---

## Section map — revised (2026-09-02)

Team is replaced by a FAQ, and Insights is dropped. The run to the end is
shorter by one section.

| # | Section | Background | State |
|---|---|---|---|
| 1 | Navigation | transparent → `#F4F3F0` | built |
| 2 | Hero | `#F4F3F0` | built |
| 3 | Thesis | `#FBFCFC` | built |
| 4 | Portfolio / Track record | `#F4F3F0` | built |
| 5 | Focus | `#FBFCFC` | built |
| 6 | Process | `#F4F3F0` | built |
| 7 | **FAQ** | `#FBFCFC` | **built** |
| 8 | CTA | `#090A0C` | pending — the only dark band |
| 9 | Footer | `#090A0C` | pending — continues the band |

~~Team~~ and ~~Insights~~ are cut. Nav's "Notes → #insights" became
"FAQ → #faq"; that anchor had pointed at nothing since the map was written.

---

## Section 7 — FAQ (built 2026-09-02)

Reference: the "Your questions, answered" composition — heading and lede in a
narrow left column, bordered disclosure cards on the right, plus becoming minus.

### Two deliberate departures

- **The heading is one colour.** The reference splits it ink/grey, exactly as
  the Attio headline does. That treatment was removed from §6 on instruction, so
  it does not come back here. Ink-lead / grey-rest stays at body scale only.
- **No vertical rules beside the cards.** The reference runs them full height.
  §5 established that rules next to bordered cards read as a second, competing
  frame — the cards already have borders. The rules run through the lead-in and
  terminate on the top rule.

### Content, checked against the rest of the page

Stage, leading, board seats, geography, conflicts and the cap table are all new
ground. The decision timeline, references, written reasoning and reserves are
already covered in §4 and §6 and are deliberately **absent** here — this is the
third time that check has caught a restatement before it shipped.

The one overlap kept on purpose: the stage/cheque answer restates the hero
subhead. A FAQ is a lookup surface; answering "what stage do you invest at?"
without stating the stage would be perverse. It adds "first institutional money
in", which the hero does not say.

### Implementation notes

- **Answers stay in the DOM when collapsed** — clipped to `height: 0`, not
  unmounted and not `display: none`. A crawler that never clicks still reads all
  six, which is most of the point of putting an FAQ on the page. `aria-hidden`
  tracks the open state so the accessibility tree stays correct.
- **Each question is a `<button>` inside an `<h3>`** — the ARIA accordion
  pattern, and it keeps the six questions in the document outline.
- **Single-open, and `null` is a real state.** Pressing the open item closes it
  rather than trapping one panel open forever.
- **The plus/minus is two hairlines**, not an icon swap: the vertical stroke
  animates `scaleY` to 0. Built from the same rules as the rest of the page,
  and there is no second glyph to cross-fade against the first.
- **No FAQPage JSON-LD.** Google restricted FAQ rich results to authoritative
  government and health sites in 2023, so on a fund site the markup is weight
  without benefit. Revisit only if the answers become real and a specific
  consumer needs it.

### Anti-slop gate — Pass 8

| Check | Result |
|---|---|
| System | Pass — no new tokens; `PillLabel` promoted to `Rules.tsx` on its third use |
| Hierarchy | Pass — 44 → 18 → 17, one focal point |
| Composition | Pass — no overflow at 375, tap targets 64px against a 44px floor |
| Typography | Pass — single-colour heading, roles distinct |
| Colour/material | Pass — cards read as outlined, not filled; `#FFFFFF` on `#FBFCFC` is 4/255 apart, so the border does the work, as it already does in §5 |
| Product truth | Placeholder answers, no invented metrics |
| Interaction | Pass — hover, focus-visible, expanded, keyboard, close-on-repress |
| Motion | Pass — height and the plus/minus both encode state; nothing decorative |

`PillLabel` was duplicated in Portfolio and Process. The note in both files said
two uses is not a pattern and a third makes it one — the FAQ was the third, so
it moved to `Rules.tsx` and both copies were deleted.

---

## Ruling, settled (2026-09-02)

Vertical rules were tried in Focus and FAQ and removed from both. The rule that
came out of it:

> **Verticals never run beside bordered cards.** They frame regions that have no
> edges of their own — the Hero's type block and logo band, the Process frame.
> Where the content already carries borders (Focus's card grid, the FAQ's
> disclosure stack), a second set of rules reads as a competing frame.

Focus keeps its header band (`border-y` + end-ticks). The FAQ has no ruling at
all — the cards are the only edges. Both are back on ordinary `.section`
padding; the `section-flush-t` + spacer lead-in is gone from both.

Focus's right-hand block also gained `lg:text-right`. `justify-self-end` put the
block against the column edge but left its copy ragged-right inside, which reads
as an accident rather than a decision. Measured: paragraph and button both end
at x=1312, the column edge.

---

## Section 9 — Footer (built 2026-09-02)

Reference: shadcnblocks footer51 — brand block and tagline left, link columns
right, a rule, then a bottom bar with a diagonal stripe pattern, all bounded by
verticals at the container edges.

### Two new tokens

The dark band needs its own pair. `--color-line` `#D2D5D7` on `#090A0C` is a
glaring white wire, and `--color-ink-secondary` disappears into it — neither
inverts usefully.

```css
--color-on-dark-muted: #98A0A7;  /* secondary text on dark bands */
--color-line-on-dark:  #262A2E;  /* hairline on dark bands       */
```

Measured 7.47:1 for every piece of text in the footer. §8 CTA uses the same
pair when it lands.

### Dark, from the contract rather than the reference

The reference is light. §9's section map has always had exactly one dark moment
at the end of the page, and the CTA will sit directly above this on the same
band. Everything above is light, so this is the close. **This is the one
decision here taken from the contract rather than the reference — worth a
sanity check.**

### What was dropped from the reference

footer51 carries five social icons and a Legal column (Terms, Privacy). Every
one would have been a link to nothing — the same defect `Notes → #insights` was,
which sat dead in the nav for six sections. Verified: **eight links, zero dead
hrefs**, five in-page anchors that all resolve plus one mailto. `#cta` is the
only unresolved anchor and it is the last pending section.

Terms and Privacy come back the day those routes exist.

### Anti-slop gate — Pass 9

| Check | Result |
|---|---|
| System | Pass — two new tokens, both required and documented |
| Hierarchy | Pass — brand dominant, columns secondary, bottom bar quiet |
| Composition | Pass — framed at 73 / 1353, the same verticals as every section above |
| Colour | Pass — 7.47:1 throughout |
| Product truth | Pass — no dead links, and the bottom bar says "Placeholder identity · not a real fund" out loud |
| Interaction | Pass — link targets 34px, up from 21px |
| Motion | **None, deliberately.** Every other section reveals on scroll; a footer that fades in as you reach the bottom of the page is a tic. It is the terminus, it should already be there |

Link targets were 21px, which cleared WCAG 2.5.8 only through the spacing
exception. `gap-3` on the list became `gap-1` plus `py-1.5` on the link: same
optical rhythm, target grows to 34px.

The bottom-right line — "Placeholder identity · not a real fund" — is the
standing product-truth flag made visible on the page itself. Remove it when the
copy and the Track Record figures become real.

---

## Section 8 — CTA (built 2026-09-02) · page complete

The last section. Every row of the §9 map is now built.

Layout reference: heading and a button pair left, large artwork right. Taken:
the split, the pairing, the artwork at half width. **Not** taken: the faint
blueprint grid behind the type and the corner crosshairs. Rules were added to
three sections this week and removed from all three — a decorative grid would
have been the fourth.

Sits on the same dark band as the footer, sharing its `border-x` and separated
by a single `border-t`, so the two read as one closing block.

### Dark-band buttons

§4.6 defines the light-ground pair; these invert it. Same radius, same 220ms,
same 1px lift.

| | Background | Text | Border |
|---|---|---|---|
| Primary | `--color-on-dark` | `--color-ink` | none |
| Primary hover | `--color-surface` | `--color-ink` | none |
| Secondary | transparent | `--color-on-dark` | `--color-line-on-dark` |
| Secondary hover | `white/5` | `--color-on-dark` | `--color-on-dark-muted` |

### The artwork — `DitherTouch`

No new asset. `hero-dither.png` **is** the Creation of Adam; the hands were
extracted from it at `left:430 top:168 440×293` on the native 1600×700 plate,
after locating the touch point at roughly (650, 315). The one detail the art
direction has been circling since the start was already in the repo.

It is not rendered as an image. A canvas samples the plate into a 7px grid and
redraws it as squares whose size and alpha track ink density — the page's dither
language taken apart and made live. Two behaviours:

- **Assemble** on first view, staggered by each cell's distance from the centre,
  so the picture gathers toward the touch instead of fading up as a block.
- **Scatter** under the pointer, cells pushed apart and falling back as it
  leaves. Verified by pixel count: 1191 painted in a sample region → 925 with
  the pointer inside → 1159 after it leaves.

**Thresholds were measured, not guessed.** Sampled at 83×55 the crop's luminance
histogram is bimodal: 66% of cells fall between 0.70 and 0.90 — the pale fresco
ground — and the drawing lives below 0.60. A first pass cut ink density at 0.22
and painted **93%** of the grid, which rendered as a lit slab rather than a
picture. Cutting at 0.40 and stretching 0.40–0.85 back across the full range
brought it to **15.3%**: the drawing, and nothing else.

Because the band is near-black the render is a negative — ink becomes light.
Brightness polarity was tried the other way first and fails, because the pale
skin and the pale sky are the same tone; only the ink separates them.

### Guards

- rAF runs only while something moves. **Measured 0 calls per second when
  idle** — the loop stops itself and restarts on pointer or on view.
- Pointer handlers attach only on `(pointer: fine)`. `pointermove` also fires
  for a touch drag, so on a phone the scatter would trigger on the very gesture
  used to scroll past it. Touch gets the assemble and nothing else.
- `prefers-reduced-motion` draws once, statically, and never binds a pointer.
- `role="img"` plus `aria-label`; a `<noscript>` `<img>` stands in when the
  canvas cannot run.
- Per-cell jitter is a deterministic hash, not `Math.random`, so the scatter is
  identical on every reload rather than reshuffling on hot reload.

### Anti-slop gate — Pass 10

| Check | Result |
|---|---|
| System | Pass — no new tokens; dark-band pair reused from §9 |
| Hierarchy | Pass — `text-h1`, not `text-display`: the Hero keeps that scale to itself |
| Composition | Pass — frame at 73 / 1353, continuous with the footer |
| Colour | Pass — 7.47:1 on the sub, far higher on the heading |
| Product truth | Pass — mailto is placeholder, and the footer says so on the page |
| Interaction | Pass — buttons 46/48px on mobile, hover/active/focus present |
| Motion | Pass — both behaviours are bound to the section's meaning: an image of two hands not quite touching, on the section that asks you to reach out, answering your cursor. The page's one authored flourish |

**Caveat worth recording:** the motion reference was a video I could not play.
The behaviour here was built from the written description — assemble plus
pointer scatter — and may differ from what that video actually shows.

---

## Page status

All nine sections built. Every in-page anchor resolves; `#cta` was the last
outstanding one and this section closes it. Remaining work is content, not
construction:

1. **Product truth.** The Track Record figures (11 days, 68%, 47 companies,
   2.5×) are invented and now appear across §4, §6 and §7. Real or labelled
   before publication. The footer currently says so out loud.
2. **`--color-ink-tertiary` fails WCAG AA** on every ground — 2.75 / 2.68 /
   2.48 against a 4.5 floor. `#696F75` clears all three. One line, but it
   touches every built section, so it is still waiting on a decision.
3. **Terms and Privacy** have no routes, which is why the footer has no legal
   column.

---

## §8 CTA — reverted to light, artwork replaced (2026-09-02, later)

**Light, on instruction.** The first pass built it dark, following the §9 map's
single-dark-band plan. Reverted. The footer stays dark, so the page closes on
one dark block rather than two. The dark-band tokens added for it
(`--color-on-dark-muted`, `--color-line-on-dark`) are still in use by the
footer, so both stay.

Buttons went back to the §4.6 light pair. The dark-band button variants
documented above are now used nowhere — kept in the doc because the footer band
still exists and anything added there will need them.

### The artwork is the background now

Not a panel in a column: the hands sit behind the content, anchored right, copy
held to the left and clear of them by a measured 63px. Anchored to
`container-page`, not the viewport — art on this page respects the 1280 column,
which is why the Hero plate was pulled back into it.

Below lg it drops into flow underneath the copy. One element, two positions:
`relative` by default, `absolute` from lg.

`lg:min-h-[460px]` on the container is load-bearing. The artwork is absolute
inside it, so the box's height came from the copy alone — 255px, against which
`contain` shrank the plate to a third of the available width and painted 5.7% of
the canvas. At 460px against the 62% width the box is 1.73 to the plate's 1.78.

### Getting the plate out of an EPS

Supplied as an Illustrator EPS with no Ghostscript, ImageMagick or Inkscape
available. Illustrator writes a DOS-header EPS: bytes 20..27 are the offset and
length of a TIFF preview, and here that preview is the full 1200×675 artwork
rather than a thumbnail. Extracted from those bytes and decoded with
`failOn: "none"` — its TIFF directory tags are unsorted and libvips treats that
warning as fatal.

**Its alpha is fully opaque.** The "transparent" background is a flat pale
ground at luminance 0.93, so there was nothing to mask against. The sampler
keys by luminance instead: anything lighter than `bgCut` is never painted, which
isolates the hands and lets the section's own colour through. Measured, the
drawing is 19% of the frame at luminance 0.22–0.90.

### Sampler changes

- **Self-calibrating density.** Two passes: the first keeps everything darker
  than the ground and records the darkest value present, the second normalises
  against it. The mapping fits whatever plate it is given instead of constants
  tuned once against one image.
- **Squares in `--color-art-ink`.** First use of the oxblood for art the page
  renders itself rather than art it loads — which is what §2 reserved it for.
- **Weight floors raised** from 0.35/0.30 to 0.50/0.45. With the ground keyed
  out every surviving square IS the drawing, so the palest parts of a hand still
  need to read; at the lower floors the hands dissolved at their edges. Painted
  coverage 10.7% → 12.9%.

### Verified

Copy clears the artwork by 63px · art box 833×460 at aspect 1.81 · mobile drops
to flow below the copy with no overlap and no page overflow · buttons 46/48px ·
rAF idle at 0 calls/sec · `tsc` and production build clean.

---

## §8 CTA — two stacks (2026-09-02, final)

Four changes on annotation:

| Ask | Result |
|---|---|
| Less top/bottom padding | `section` → `section-sm`: 56 / 72 / 96 instead of 80 / 112 / 160 |
| Side borders | `ColumnRules` at 73 / 1352, carried through the remaining padding above and below the frame, meeting the frame's own `border-x` |
| Split into two stacks | Vertical rule at **exactly 34%** — copy left, plate right |
| More height | `lg:min-h-[600px]`, was 460 |

The split removed the need for the alpha ramp built in the previous pass, so the
ramp was **deleted** rather than left in place: `fadeFloor` / `fadeFrom` /
`fadeTo`, the `--dither-ramp` CSS-var read, and the per-cell fade. An effect
whose only job was to undo the damage of a full-bleed plate behind live copy is
a sign the layout was wrong; a column each means the plate runs at full strength
and the copy sits on clean ground with nothing to tune.

The rule between the stacks flips with the layout: `border-t` when they stack
below lg, `lg:border-l` as the second column's left edge from lg.

---

## Trap — a canvas that sizes its own container

Found on the mobile pass and worth recording, because nothing looked wrong.

`DitherTouch` writes a pixel width onto its `<canvas>` in `resize()` to match
the backing store to the device pixel ratio. The canvas was `position: static`,
so that inline width **fed back into layout**: it propped the host open at
whatever the widest measurement had been, the ResizeObserver never saw the box
shrink, and the size latched at its maximum.

Measured at 375px: the frame was **335px wide with 842px columns inside it** —
842 being the desktop column width from before the resize. The frame's
`overflow-hidden` clipped the excess and `document.scrollWidth` stayed at 375,
so every "is there horizontal overflow?" check passed while the artwork was
being rendered at 2.5× the visible width and cropped.

Three linked faults, all mine:

1. **`class="relative absolute inset-0 …"`** — the component hardcodes
   `relative` on its host and the caller passed `absolute`. Equal specificity,
   so source order decides, and Tailwind emits `.relative` after `.absolute`.
   The override silently did nothing. *Never pass a positioning utility to a
   component that already sets one.*
2. **The canvas was in flow.** Now `absolute inset-0`, so the host sizes the
   canvas and never the reverse.
3. **No base `grid-cols-1`.** `grid` with only `lg:grid-cols-[…]` falls back to
   one *auto* implicit column at mobile, which sizes to content. `minmax(0,1fr)`
   cannot be blown out; `auto` can.

Verified after: columns 333px inside a 335px frame, canvas absolute at 333px,
children fit parent, desktop unchanged at 435 / 843 with the divider still at
34%.

**Check to reuse:** comparing a child's width against its parent's catches this;
comparing `document.scrollWidth` against `clientWidth` does not, because a
clipping ancestor hides it.
