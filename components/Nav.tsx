"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logomark } from "@/components/Logo";

/* ---------------------------------------------------------------------------
   SECTION 1 — NAVIGATION
   Tokens: docs/TOKENS.md §5 (Navigation), §4.6 (button states), §6 (motion)
   Behaviour: sticky · transparent → page bg + bottom hairline on scroll
   ------------------------------------------------------------------------ */

const LINKS = [
  { label: "About", href: "#thesis" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Focus", href: "#focus" },
  /* Was "Notes" → #insights. Insights is cut from the section map, and that
     anchor pointed at nothing. */
  { label: "FAQ", href: "#faq" },
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={[
          "transition-[background-color,border-color,backdrop-filter]",
          "duration-[340ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          /* Persistent hairline — same --color-line the hero media frame uses,
             so the nav rule and the art frame read as one system. Only the
             background and blur respond to scroll. */
          "border-b border-line",
          scrolled || open ? "bg-page/85 backdrop-blur-md" : "bg-transparent",
        ].join(" ")}
      >
        <div className="container-page">
          {/* 64/72px bar. Deliberately taller than Quartr's 56px: our wordmark is
              a two-part text lockup, not a compact SVG, so 56px crowded it.
              Type stays at 16px `text-nav` — small type, generous bar. */}
          {/* Inner gutter so the lockup and CTA clear the column rules, the
              same treatment the Portfolio rows use. */}
          <div className="relative flex h-16 items-center justify-between lg:h-[72px] lg:px-8 xl:px-10">
            {/* Column rules, at the same x as the hero's — the bar and the
                sheet below it read as one ruled grid rather than two systems. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-line lg:block"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-line lg:block"
            />

            {/* Wordmark */}
            <a
              href="#top"
              className="group flex items-center gap-2.5 rounded-xs"
              aria-label="Fieldnote Capital — home"
            >
              <Logomark className="h-6 w-6 shrink-0 text-ink" />
              <span className="text-h4 text-ink">Fieldnote</span>
            </a>

            {/* Desktop links */}
            <nav
              aria-label="Primary"
              className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex"
            >
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-nav text-ink-secondary transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-2 lg:flex">
              <a
                href="#cta"
                className="rounded-full px-5 py-2.5 text-nav text-on-dark bg-accent transition-[background-color,transform] duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-accent-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none"
              >
                Send a note
              </a>
            </div>

            {/* Mobile toggle — 44×44 minimum touch target */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-sm lg:hidden"
            >
              <span className="relative block h-[10px] w-[18px]">
                <span
                  className={[
                    "absolute left-0 block h-px w-full bg-ink",
                    "transition-transform duration-[340ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                    open ? "top-[5px] rotate-45" : "top-0 rotate-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 block h-px w-full bg-ink",
                    "transition-transform duration-[340ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                    open ? "top-[5px] -rotate-45" : "top-[9px] rotate-0",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="container-page pb-6 pt-2">
                <nav aria-label="Mobile" className="flex flex-col">
                  {LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="border-b border-line-subtle py-4 text-body text-ink-secondary transition-colors duration-[220ms] hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="mt-6 block rounded-full bg-accent px-5 py-3 text-center text-nav text-on-dark transition-colors duration-[220ms] hover:bg-accent-hover"
                >
                  Send a note
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
