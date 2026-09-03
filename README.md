# Fieldnote Capital

A placeholder website for a fictional seed fund, built as a design exercise.

> **The content is invented.** The portfolio logos, the track-record figures,
> the deal file and the process timings are all placeholder. The footer says so
> on every page. Do not reuse any of it as fact.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion ·
Lenis.

## Running it

```bash
npm install
npm run dev
```

## How it is put together

**Tokens first.** Everything visual resolves through `app/globals.css`, which
defines the type scale, spacing, colour and motion tokens under Tailwind v4's
`@theme static`. `docs/TOKENS.md` documents them. Sections are composed from
those tokens rather than from ad-hoc values, so a change to the scale moves the
whole page at once.

One trap worth knowing: `.section` padding is declared in plain-CSS media
queries **after** Tailwind's utility layer, so a `py-*` utility on a `.section`
element silently loses to it. Use the `.section-flush-t` / `.section-flush-b`
modifiers instead.

**The art layer** is what makes the page specific. Every plate is a dithered
engraving or fresco detail, declared in `lib/plates.ts` together with the paper
and ink colours sampled out of the file itself, so a panel's ground always
matches the image sitting on it.

The CTA's two hands are the exception: they are not rendered as an image at
all. `components/DitherTouch.tsx` samples the plate into a grid and redraws it
as squares whose size and opacity track the drawing underneath, then assembles
them on scroll and scatters them under the pointer.

**The hand plates are build output.**

```bash
node scripts/build-hands.mjs
```

It cuts `public/art/hands-left.png` and `hands-right.png` from
`art-src/hands-master.png` and prints the aspect ratio the CTA band must carry.
Editing those two PNGs by hand will be silently undone the next time it runs.
Both that script and `DitherTouch` carry long comments explaining why each
number is what it is — several of them were arrived at by measuring, and a
couple record approaches that looked obviously right and were wrong.

## Layout

```
app/          routes, the token layer, global chrome
components/   one file per section, plus PanelKit (shared UI vocabulary)
              and Rules (the ruling/grid primitives)
lib/plates.ts the plate manifest — src, alt, sampled paper and ink
scripts/      asset build steps
art-src/      masters that are NOT served; inputs to scripts/
docs/         TOKENS.md
```

## Accessibility

Every section was checked against WCAG AA for contrast and target size, the
tabs and accordions follow the ARIA patterns for their roles, and all motion —
scroll parallax, the dither assemble, the count-up figures — has a complete
static state under `prefers-reduced-motion`.
