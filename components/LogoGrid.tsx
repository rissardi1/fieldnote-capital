"use client";

import { motion, useReducedMotion } from "motion/react";

/* ---------------------------------------------------------------------------
   LOGO GRID — replaces the marquee.
   Twelve lockups in a ruled grid: 6 × 2 at lg (exactly two rows), stepping down
   to 4 × 3 and 3 × 4 on smaller widths. Cell hairlines carry the same ruling
   language as the column rules, so the strip reads as part of the sheet.

   Marks are code-rendered SVG in currentColor, so they inherit
   --color-ink-tertiary and can never drift off-palette.
   Motion: a one-time stagger on enter. No perpetual loop — the marquee's
   constant movement asked for attention it had no information to repay.
   ------------------------------------------------------------------------ */

type Mark = (p: { className?: string }) => React.ReactElement;

const Ring: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3.25" fill="currentColor" />
  </svg>
);
const Prism: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <path d="M12 3 21 19H3L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 3v16" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const Grid: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <rect x="3.5" y="3.5" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" fill="currentColor" />
  </svg>
);
const Helix: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <path d="M6 3c0 6 12 6 12 9s-12 3-12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 3c0 6-12 6-12 9s12 3 12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const Bars: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <rect x="4" y="13" width="3.5" height="8" fill="currentColor" />
    <rect x="10.25" y="8" width="3.5" height="13" fill="currentColor" />
    <rect x="16.5" y="3" width="3.5" height="18" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const Tessera: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <rect x="12" y="2.5" width="13.4" height="13.4" transform="rotate(45 12 2.5)" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
  </svg>
);
const Arc: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <path d="M4 19a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8.5 19a3.5 3.5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const Ridge: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <path d="M2 18 9 7l4 6 3-4 6 9H2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const Node: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <circle cx="5" cy="12" r="2.25" fill="currentColor" />
    <circle cx="19" cy="6" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="19" cy="18" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 11l10-4M7 13l10 4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const Nest: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <rect x="3.5" y="3.5" width="17" height="17" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="8.5" y="8.5" width="7" height="7" fill="currentColor" />
  </svg>
);
const Crescent: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <path d="M15.5 3a9 9 0 1 0 0 18 10.5 10.5 0 0 1 0-18Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const Slash: Mark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <path d="M15.5 3 8.5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 9h5M15 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const COMPANIES: { name: string; Mark: Mark }[] = [
  { name: "Halden", Mark: Ring },
  { name: "Orrery", Mark: Prism },
  { name: "Weft", Mark: Grid },
  { name: "Cadence", Mark: Helix },
  { name: "Northbank", Mark: Bars },
  { name: "Tessellate", Mark: Tessera },
  { name: "Fathom", Mark: Arc },
  { name: "Ridgeline", Mark: Ridge },
  { name: "Kelvin", Mark: Node },
  { name: "Marrow", Mark: Nest },
  { name: "Sable", Mark: Crescent },
  { name: "Quillon", Mark: Slash },
];

export default function LogoGrid() {
  const reduce = useReducedMotion();

  return (
    <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
      {COMPANIES.map((c, i) => (
        <motion.li
          key={c.name}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            delay: reduce ? 0 : (i % 6) * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          /* Right and bottom hairlines only, suppressed on the last column and
             last row, so the grid rules read as internal dividers rather than
             a box drawn inside the band's own frame. */
          className={[
            "flex items-center justify-center gap-3 border-line px-3 py-7",
            "border-b border-r",
            "[&:nth-child(3n)]:border-r-0 sm:[&:nth-child(3n)]:border-r",
            "sm:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(4n)]:border-r",
            "lg:[&:nth-child(6n)]:border-r-0",
            "[&:nth-last-child(-n+3)]:border-b-0 sm:[&:nth-last-child(-n+3)]:border-b",
            "sm:[&:nth-last-child(-n+4)]:border-b-0 lg:[&:nth-last-child(-n+4)]:border-b",
            "lg:[&:nth-last-child(-n+6)]:border-b-0",
          ].join(" ")}
        >
          <span className="text-ink-tertiary transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-ink-secondary">
            <c.Mark className="h-6 w-6" />
          </span>
          {/* text-small + secondary, not h4 + tertiary. At 18px tertiary the
              wordmarks measured 2.48:1 — the worst contrast anywhere on the
              page, and 12 of the 14 failures in the whole document. Raising the
              colour alone would have made a quiet band shout, so the size comes
              down as the contrast comes up: the band stays subordinate to the
              headline and the names become readable, which is the entire point
              of printing them. */}
          <span className="truncate text-body text-ink-secondary">{c.name}</span>
        </motion.li>
      ))}
    </ul>
  );
}
