# Design System & Token-First Workflow

> A collaborative guide for building websites from scratch — section by section, token by token.

---

## Why Tokens First?

References are inspiration. Tokens are the contract.

| Without tokens | With tokens |
|---|---|
| "Make it darker" × 15 times | `#0a0a0a` is the background. Done. |
| "That heading feels too big" | `h1: 4rem / 1.1 / -0.02em` is locked. |
| Every section looks like a different website | One system, infinite sections. |

**Rule:** No code is written until the token system is approved.

---

## The Workflow

```
1. References & Mood → 2. Token Proposal → 3. Approval → 4. Build Section-by-Section
```

### Phase 1: References & Mood
User shares:
- Links, screenshots, or descriptions of reference sites
- Vibe keywords (e.g., "minimal dark like Quart", "clean typography like Mercury")
- Special requirements (ASCII assets, animations, specific frameworks)

### Phase 2: Token Proposal
AI synthesizes references into a structured token system using the template below.

### Phase 3: Approval
User reviews and tweaks tokens until they feel right. This is the single source of truth.

### Phase 4: Build Section-by-Section
- AI builds one section at a time
- User reviews, iterates, approves
- Move to next section

---

## Token Template

Copy and fill this out before every build. Even partial answers help — gaps can be inferred from references.

---

### 1. Mood & References

| Field | Value |
|---|---|
| **Vibe** | e.g., Minimal dark, editorial, brutalist, playful |
| **Reference Sites** | e.g., quart.com, mercury.com, stripe.com |
| **ASCII Assets** | Yes / No — decorative only? functional? (e.g., `▓▒░` borders, `┌─┐` boxes) |
| **Energy Level** | Silent / Confident / Chaotic |
| **Special Notes** | Anything unusual or non-negotiable |

---

### 2. Color Tokens

```
Background Primary:     #______   (page background)
Background Secondary:   #______   (cards, alternate sections)
Surface / Elevated:     #______   (hover states, modals, dropdowns)
Text Primary:           #______   (headings, body)
Text Secondary:         #______   (captions, metadata, labels)
Accent:                 #______   (links, buttons, highlights, CTAs)
Border / Divider:       #______   (subtle lines, card borders)
Success:                #______   (if applicable)
Error:                  #______   (if applicable)
Warning:                #______   (if applicable)
```

---

### 3. Typography Scale

```
Font Family Body:       ________________   (e.g., Inter, Geist, system-ui)
Font Family Headings:   ________________   (same or different? mono?)
Font Family Mono:       ________________   (for code, ASCII, or accents)

Scale:
┌──────────────┬──────────┬─────────────┬─────────┬─────────────────┐
│ Token        │ Size     │ Line Height │ Weight  │ Letter Spacing  │
├──────────────┼──────────┼─────────────┼─────────┼─────────────────┤
│ h1 (Hero)    │ ___ px   │ ___         │ ___     │ ___ em          │
│ h2 (Section) │ ___ px   │ ___         │ ___     │ ___ em          │
│ h3 (Card)    │ ___ px   │ ___         │ ___     │ ___ em          │
│ body         │ ___ px   │ ___         │ ___     │ ___ em          │
│ small        │ ___ px   │ ___         │ ___     │ ___ em          │
│ caption      │ ___ px   │ ___         │ ___     │ ___ em          │
└──────────────┴──────────┴─────────────┴─────────┴─────────────────┘
```

---

### 4. Spacing & Layout

```
Base Unit:              ___ px      (e.g., 4px, 8px — everything is a multiple)
Section Padding Y:      ___ px      (vertical breathing room)
Section Padding X:      ___ px      (horizontal gutters)
Content Max-Width:      ___ px      (e.g., 1200px, 768px for readability)
Grid Columns:           ___         (e.g., 12)
Grid Gap:               ___ px      (e.g., 24px)
Border Radius:          ___ px      (0 = brutalist, 8 = friendly, 999 = pills)
```

---

### 5. Component Primitives

| Component | Style |
|---|---|
| **Buttons** | Filled / Outlined / Ghost |
| **Button Radius** | Sharp / Rounded / Pill |
| **Cards** | Flat / Bordered / Elevated (shadow) |
| **Inputs** | Underline only / Bordered / Filled |
| **Navigation** | Sticky / Hidden / Minimal / Fullscreen |
| **Links** | Underlined / Color only / Animated underline |

---

### 6. Tech Stack

```
CSS Approach:           ________________   (Tailwind, Vanilla CSS, CSS Modules, etc.)
JS Framework:           ________________   (React, Vue, Svelte, Static HTML, etc.)
Build Tool:             ________________   (Vite, Next.js, Astro, etc.)
Animation:              ________________   (Framer Motion, GSAP, CSS only, none)
Icons:                  ________________   (Lucide, Phosphor, custom SVG, ASCII)
```

---

### 7. Section Map

List sections in order. This becomes the build checklist.

```
1. [ ] Navigation
2. [ ] Hero
3. [ ] Features / Services
4. [ ] Testimonials / Social Proof
5. [ ] Pricing / CTA
6. [ ] Footer
```

---

## Best Practices

### For the User
- **Share references generously.** Even a vague "like this site's spacing" helps.
- **Be specific about what you like.** Is it the color? The typography? The whitespace?
- **Approve tokens before asking for code.** It saves 10x revision time.
- **Review one section at a time.** Don't ask for the full page at once.

### For the AI
- **Never write code before tokens are approved.**
- **Always reference tokens by name** in code (e.g., `var(--color-accent)`, `text-h1`).
- **Build one section per response** unless explicitly asked otherwise.
- **When in doubt, ask.** Don't guess on tokens.

---

## Quick-Start Checklist

Before building, confirm:

- [ ] References shared and understood
- [ ] Color tokens defined and approved
- [ ] Typography scale defined and approved
- [ ] Spacing system defined and approved
- [ ] Component primitives agreed upon
- [ ] Tech stack confirmed
- [ ] Section map ordered and approved

---

## The Asset Layer

> Assets (imagery, illustrations, vectors, dashboards) need tokens too. Without rules, a perfect design system collapses when random visuals are dropped in.

### Why Assets Break Systems

| You have | You need | The gap |
|---|---|---|
| Color tokens, fonts, spacing | Hero image, feature illustrations, dashboard mockups | No rules for *what* visuals look like |
| A minimal dark aesthetic | A generic 3D render from Unsplash | Visual language mismatch |
| ASCII decorative assets | Product screenshots | No bridge between "vibe" and "content" |

**Rule:** Every section gets an asset type assigned *before* we build it. No "we'll figure out images later."

---

### Asset Strategy Matrix

Decide what visual language each section uses:

| Section Type | Asset Type | Best Tool/Source | When to Use |
|---|---|---|---|
| **Hero / Emotional** | AI-generated imagery, photography | Magnific, Midjourney, DALL-E, Flux | You need a mood, not literal representation |
| **Features / Explainers** | Custom illustrations, SVG icons, ASCII art | Figma, Illustrator, hand-coded SVG | You need to explain a concept |
| **Product / Dashboard** | Screenshots, mockups, UI recordings | Figma exports, CleanShot, ScreenStudio | You need to show the actual product |
| **Social Proof** | Real photos, logos, avatars | Client-provided, Brandfetch, generated avatars | You need credibility |
| **Decorative** | Patterns, textures, ASCII dividers | Code-generated, CSS patterns, ASCII art | You need rhythm without distraction |

---

### The AI Generation Workflow

When using Magnific, Midjourney, DALL-E, or Flux:

#### Step 1: Define the Visual Style Token
```
Image Style Token:
├── Mood: [Cinematic / Editorial / Abstract / Technical / Dreamy]
├── Lighting: [Soft natural / Hard studio / Neon / Volumetric / Flat]
├── Color Treatment: [Monochrome / Desaturated / Warm / Cool / Match brand accent]
├── Composition: [Centered subject / Rule of thirds / Negative space / Dense]
├── Detail Level: [Hyper-realistic / Stylized / Minimal / Pixel art]
└── Aspect Ratio: [16:9 hero / 1:1 feature / 9:16 mobile / 21:9 ultrawide]
```

#### Step 2: Write the Prompt Template
```
[Subject] + [Action/Context] + [Style modifiers] + [Technical specs] + [Vibe keywords]

Example:
"A software developer working at a minimal desk, side profile,
volumetric lighting through window, desaturated cool tones with
subtle warm accent, shallow depth of field, editorial photography,
8k, shot on medium format --ar 16:9 --style raw"
```

#### Step 3: Generate → Evaluate → Lock
1. **Generate 3-4 variations** with the same prompt
2. **Evaluate against tokens:** Does it match the color treatment? The mood?
3. **Lock the prompt:** Save it. This is now your "image component" for that section.
4. **Batch generate:** Use the locked prompt for all images in that section.

---

### Asset Tokens (Extend Your Design System)

Add this section to your token document:

```markdown
### 8. Asset Specifications

#### Global Image Rules
- All images: Desaturated ___%, slight ___ tint to match background
- No stock-photo-smiling-people unless explicitly approved
- Hero images: Always have ___% dark overlay for text readability
- Product screenshots: Rounded ___px, ___px border, no shadow

#### Asset Inventory
| Section | Asset Name | Type | Specs | Status |
|---|---|---|---|---|
| Hero | hero-bg | AI Photo | 16:9, dark cinematic | ⬜ Generate |
| Features | feature-1 | SVG Illustration | 1:1, line art, accent color | ⬜ Create |
| Features | feature-2 | ASCII Art | Inline code, decorative | ⬜ Create |
| Product | dashboard-mock | Screenshot | 16:9, Figma export, dark UI | ⬜ Export |
| Testimonials | avatar-1 | Generated Portrait | 1:1, abstract, no face | ⬜ Generate |

#### Placeholder Strategy
Until final assets are ready:
- Use CSS gradients matching brand colors
- Use ASCII patterns as temporary fills
- Use Lorem Picsum with `?grayscale` filter as last resort
```

---

### Dashboards & Complex UI Assets

| Approach | Best For | How To |
|---|---|---|
| **Figma Mockup → Export PNG/SVG** | Final marketing site | Design in Figma using your tokens, export at 2x |
| **Live Embed (iframe)** | Interactive demos | Build a real dashboard, embed it |
| **Animated GIF/MP4** | Showing workflows | Record screen, compress, autoplay muted |
| **Code-generated Charts** | Data-heavy pages | Use D3/Chart.js with your color tokens |
| **Static Screenshot + Hotspots** | Feature tours | Screenshot + CSS overlay tooltips |

**Dashboard Token Rule:** If the dashboard is a screenshot, it must use the same color tokens as the site. A dark site with a light-mode dashboard screenshot looks broken.

---

### Asset Decision Tree

```
Do you need an image?
    │
    ├── Is it decorative? → ASCII / CSS pattern / SVG shape
    │
    ├── Is it emotional/mood-setting? → AI generate (Magnific/Midjourney/Flux)
    │       └── Lock the prompt, batch generate
    │
    ├── Is it explanatory? → Custom SVG / Icon set / Illustration
    │       └── Design in Figma, export as SVG
    │
    ├── Is it the actual product? → Screenshot / Mockup / Recording
    │       └── Use real UI with your tokens, export at 2x
    │
    └── Is it a person/avatar? → Generated abstract portrait / Client photo
            └── Never random stock faces
```

---

### Updated Workflow with Assets

```
Phase 1: References & Mood
    ↓
Phase 2: Token Proposal ← Asset Strategy Matrix defined here
    ↓
Phase 2.5: Asset Inventory ← List every image needed, assign type & specs
    ↓
Phase 3: Approval (Tokens + Assets together)
    ↓
Phase 4: Build Section-by-Section
    ├── For each section: Code structure first
    ├── Insert placeholder (gradient / ASCII / gray box)
    ├── Generate/Create final asset using locked prompt
    └── Swap placeholder for final asset
```

---

## Code-Rendered Assets & Animation

> The most powerful assets aren't images at all — they're HTML/CSS/JS components that look like product screenshots, animate on scroll, and respond to interaction. Polar.sh's billing cards and Quartr's notification stacks are built in code, not exported from Figma.

### The "Fake UI" Pattern

Modern SaaS sites increasingly build realistic-looking UI components directly in code:

| What it looks like | What it actually is |
|---|---|
| A dashboard screenshot | A grid of HTML cards with CSS borders, real text, and hover states |
| A notification stack | Absolute-positioned divs with staggered entrance animations |
| An analytics chart | A code-generated SVG with animated paths |
| A mobile app preview | A CSS-styled phone frame with live-scrolling content inside |

**Why build in code instead of exporting an image?**
- **Responsive:** Scales perfectly, no retina assets needed
- **Interactive:** Hover states, click interactions, live data
- **Animated:** Entrance animations, stagger effects, continuous loops
- **Lightweight:** Often smaller than a PNG screenshot
- **Maintainable:** Change copy or data without re-exporting

---

### Asset Type Decision Matrix (Expanded)

```
Does this section need a visual?
    │
    ├── Is it decorative/abstract? → CSS pattern / SVG shape / ASCII art
    │
    ├── Is it emotional/mood-setting? → AI generate (Magnific/Midjourney/Flux)
    │       └── Lock prompt, batch generate
    │
    ├── Is it the ACTUAL product UI? → Real screenshot / Screen recording
    │       └── Export at 2x, match color tokens
    │
    ├── Is it a SIMULATED product demo? → CODE-RENDERED COMPONENT ⭐
    │       └── Build in HTML/CSS with animation tokens
    │
    ├── Is it an animated illustration? → SVG + CSS animation / Lottie / Rive
    │       └── See animation workflow below
    │
    ├── Is it data/chart visualization? → Code-generated (D3, Chart.js, SVG)
    │       └── Use color tokens for consistency
    │
    └── Is it a person/avatar? → Generated abstract portrait / Client photo
            └── Never random stock faces
```

**The key distinction:** If the visual *demonstrates* your product but doesn't need to be pixel-perfect real UI, build it in code. If it needs to be the *actual* product, screenshot it.

---

### Code-Rendered UI Components

#### When to Use
- Feature sections showing "what the product looks like"
- Hero sections with floating UI cards (Polar.sh style)
- Notification stacks, chat bubbles, activity feeds
- Dashboard previews with sample data
- Pricing cards that look like app UI

#### When NOT to Use
- Complex visual designs that would take 500+ lines of CSS
- Photorealistic imagery (use AI generation)
- Actual product screenshots that need to be exact
- Heavy data visualizations (use D3/Chart.js instead)

#### The Build Spec

For each code-rendered component, define:

```markdown
### Component: [Name]
- **Type:** Card / Notification / Chart / Phone Mock / Dashboard Grid
- **Animation:** Entrance / Hover / Continuous / Scroll-triggered / None
- **Data:** Static text / JSON mock data / Live API
- **Interaction:** None / Hover scale / Click expand / Drag
- **Responsive Behavior:** Stack / Scale / Hide on mobile
```

#### Common Patterns

**1. Floating Card Grid (Polar.sh style)**
```
Structure:
├── Container (relative, perspective for 3D)
│   ├── Card 1 (absolute, offset rotation, entrance delay 0ms)
│   ├── Card 2 (absolute, offset rotation, entrance delay 150ms)
│   ├── Card 3 (absolute, offset rotation, entrance delay 300ms)
│   └── Card 4 (absolute, offset rotation, entrance delay 450ms)

Each Card:
├── Header (icon + title)
├── Content (mock data, monospace font for numbers)
├── Footer (status badge)
└── Border (1px, token color)

Animation:
- Entrance: translateY(40px) + opacity(0→1) + slight rotateX
- Stagger: 150ms between cards
- Hover: translateY(-4px) + border-color accent
- Duration: 600ms, easing: cubic-bezier(0.16, 1, 0.3, 1)
```

**2. Notification Stack (Quartr style)**
```
Structure:
├── Stack Container (relative, fixed width)
│   ├── Notification 1 (z-index: 3, scale: 1.0, opacity: 1)
│   ├── Notification 2 (z-index: 2, scale: 0.95, opacity: 0.7, translateY: -10px)
│   └── Notification 3 (z-index: 1, scale: 0.9, opacity: 0.4, translateY: -20px)

Animation:
- New notification enters: slideIn from right + scale(0.9→1)
- Stack pushes down: existing notifications scale down and fade
- Auto-dismiss: slideOut to right after 4s
- Continuous loop for demo purposes
```

**3. Dashboard Cutout**
```
Structure:
├── Browser Chrome (rounded top, traffic light dots)
│   ├── URL Bar
│   └── Content Area
│       ├── Sidebar (narrow, icons only)
│       ├── Main Panel
│       │   ├── Header Row
│       │   ├── Data Cards (2-3 column grid)
│       │   └── Chart Area (SVG sparkline)
│       └── Floating Element (absolute, overlapping edge)

Animation:
- Scroll-triggered: elements fade in as user scrolls
- Chart path: stroke-dashoffset draw animation
- Floating element: subtle float animation (translateY oscillation)
```

---

### Animation Tokens

Motion needs a system too. Define these alongside your color and typography tokens.

```markdown
### Animation Tokens

#### Timing
| Token | Value | Use Case |
|---|---|---|
| `--duration-instant` | 100ms | Micro-interactions, hover states |
| `--duration-fast` | 200ms | Button presses, toggles |
| `--duration-normal` | 300ms | Standard transitions |
| `--duration-slow` | 500ms | Entrance animations |
| `--duration-dramatic` | 800ms | Hero reveals, major transitions |

#### Easing
| Token | Value | Character |
|---|---|---|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard, balanced |
| `--ease-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | Entering elements |
| `--ease-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | Exiting elements |
| `--ease-elastic` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Playful bounces |
| `--ease-dramatic` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero animations |

#### Stagger
| Token | Value | Use Case |
|---|---|---|
| `--stagger-tight` | 50ms | Rapid sequences |
| `--stagger-normal` | 100ms | Standard lists |
| `--stagger-relaxed` | 150ms | Card grids |
| `--stagger-dramatic` | 250ms | Hero reveals |

#### Transforms
| Token | Value | Use Case |
|---|---|---|
| `--translate-entrance` | `translateY(30px)` | Standard entrance |
| `--translate-entrance-large` | `translateY(60px)` | Hero elements |
| `--scale-hover` | `scale(1.02)` | Subtle hover lift |
| `--scale-press` | `scale(0.98)` | Button press |
| `--rotate-subtle` | `rotate(-1deg)` | Playful tilt |
```

---

### Animation Implementation Guide

#### CSS-Only (Recommended for 80% of cases)
Best for: Hover states, simple entrances, continuous loops
- Zero JS overhead
- GPU-accelerated
- Easy to maintain

```css
/* Entrance animation */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(var(--translate-entrance)); }
  to { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeInUp var(--duration-slow) var(--ease-dramatic) forwards;
  animation-delay: calc(var(--index) * var(--stagger-relaxed));
}
```

#### SVG + CSS Animation
Best for: Icon animations, simple vector motion, data viz
- Inline SVG with CSS `@keyframes`
- Most portable format in 2026
- Crisp at any size

```css
/* SVG path draw animation */
@keyframes drawPath {
  from { stroke-dashoffset: 1000; }
  to { stroke-dashoffset: 0; }
}

.chart-line {
  stroke-dasharray: 1000;
  animation: drawPath 2s var(--ease-decelerate) forwards;
}
```

#### Lottie
Best for: Complex multi-element animations, brand illustrations
- Export from After Effects / Rive / Jitter
- JSON-based, vector crispness
- ~50KB player + 30-100KB animation file

**When to use Lottie:**
- Hero section brand animation
- Icon micro-interactions
- Empty states and onboarding illustrations

**When to SKIP Lottie:**
- Simple effects a CSS animation could handle
- Pages where Core Web Vitals are under pressure
- Factual content (use real screenshots instead)

**Optimization:**
1. Flatten layers in Figma before export
2. Run through LottieFiles optimizer (30-60% size reduction)
3. Don't autoplay on hero — use scroll trigger or hover
4. Test on mid-tier Android devices

#### Rive
Best for: Interactive animations, state machines, games
- Smaller file sizes than Lottie
- Interactive state machines
- Better performance on mobile

#### GSAP / Framer Motion
Best for: Scroll-triggered sequences, complex timelines, page transitions
- Precise control over timing
- ScrollTrigger for scroll-driven animations
- Stagger utilities built-in

```javascript
// GSAP stagger example
gsap.from('.card', {
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.grid',
    start: 'top 80%',
  }
});
```

---

### Scroll-Triggered Animation Strategy

Most modern sites animate elements as they enter the viewport. Standardize your approach:

```markdown
### Scroll Animation Rules
- **Trigger point:** Element animates when top hits 80% of viewport
- **One-time:** Animate once, don't reverse on scroll up
- **Respect reduced motion:** `@media (prefers-reduced-motion: reduce)` → instant
- **Mobile:** Simpler animations, reduced stagger counts
```

**Implementation options:**
| Approach | Best For | Setup Complexity |
|---|---|---|
| Intersection Observer + CSS classes | Simple reveals | Low |
| GSAP ScrollTrigger | Complex sequences | Medium |
| AOS library | Quick standard animations | Low |
| Framer Motion (React) | Component-level control | Medium |

---

### The Complete Asset Workflow

```
Phase 1: References & Mood
    ↓
Phase 2: Token Proposal
    ├── Color, Typography, Spacing
    └── Animation Tokens (timing, easing, stagger)
    ↓
Phase 2.5: Asset Strategy Matrix
    ├── For each section: Image vs. Code-Rendered vs. Animation?
    ├── Assign asset type and tool
    └── Create Asset Inventory with specs
    ↓
Phase 3: Approval (Tokens + Assets + Animations together)
    ↓
Phase 4: Build Section-by-Section
    ├── Structure: HTML/CSS layout
    ├── Placeholders: Gray boxes / ASCII / gradients
    ├── Code-Rendered Components: Build fake UI with animation tokens
    ├── Static Assets: Generate/Export images
    ├── Animated Assets: Implement SVG/CSS/Lottie/JS animations
    └── Polish: Match timing, easing, stagger to tokens
```

---

### Asset Inventory (Updated Template)

Add these columns to your asset inventory:

```markdown
| Section | Asset Name | Type | Build Method | Animation | Specs | Status |
|---|---|---|---|---|---|---|
| Hero | billing-cards | Code-Rendered | HTML/CSS cards | Stagger entrance | 4 cards, 150ms stagger | ⬜ Build |
| Features | feature-icons | SVG | Inline SVG | Hover scale | 24x24, accent color | ⬜ Create |
| Product | dashboard-preview | Code-Rendered | Dashboard cutout | Scroll-triggered | Browser chrome, SVG chart | ⬜ Build |
| Social | notification-stack | Code-Rendered | Notification divs | Continuous loop | 3 notifications, auto-dismiss | ⬜ Build |
| Hero | hero-illustration | Lottie | After Effects | Autoplay on load | 60KB max, brand colors | ⬜ Export |
| Footer | ascii-divider | ASCII | Hand-coded | None | 80 chars wide | ⬜ Create |
```

---
## Example: Filled Template

> Below is a sample for a "Minimal Dark + ASCII" site.

### 1. Mood & References
- **Vibe:** Minimal dark like Quart, clean typography like Mercury
- **ASCII Assets:** Yes — decorative borders (`▓▒░`), section dividers (`───`)
- **Energy Level:** Confident / Editorial
- **Special Notes:** No gradients. No shadows. Flat design only.

### 2. Color Tokens
```
Background Primary:     #0a0a0a
Background Secondary:   #111111
Surface:                #1a1a1a
Text Primary:           #f5f5f5
Text Secondary:         #737373
Accent:                 #e5e5e5
Border:                 #262626
Success:                #22c55e
Error:                  #ef4444
```

### 3. Typography
```
Font Family Body:       Geist Sans, system-ui, sans-serif
Font Family Headings:   Geist Sans, system-ui, sans-serif
Font Family Mono:       Geist Mono, monospace

h1:  64px / 1.1 / 500 / -0.02em
h2:  40px / 1.2 / 500 / -0.01em
h3:  24px / 1.3 / 500 / 0em
body: 16px / 1.6 / 400 / 0em
small: 14px / 1.5 / 400 / 0em
caption: 12px / 1.5 / 400 / 0.05em
```

### 4. Spacing
```
Base Unit: 4px
Section Padding Y: 120px
Section Padding X: 24px
Content Max-Width: 1200px
Grid Columns: 12
Grid Gap: 24px
Border Radius: 0px
```

### 5. Components
- **Buttons:** Outlined, 1px border, sharp corners, hover: fill with accent
- **Cards:** Flat, 1px border, no shadow
- **Inputs:** Bordered, 1px, sharp
- **Navigation:** Sticky, minimal, border-bottom on scroll

### 6. Tech Stack
```
CSS: Vanilla CSS with CSS custom properties
JS: Static HTML + minimal vanilla JS
Animations: CSS transitions only
Icons: ASCII + custom SVG
```

### 7. Section Map
```
1. [ ] Navigation (sticky, minimal)
2. [ ] Hero (ASCII art, headline, subhead, CTA)
3. [ ] Features (3-column grid, ASCII dividers)
4. [ ] Testimonials (single column, quotes)
5. [ ] CTA (centered, bold statement)
6. [ ] Footer (minimal, links, ASCII border)
```

---

*Document version: 1.0*  
*Purpose: Single source of truth for token-first web builds.*
