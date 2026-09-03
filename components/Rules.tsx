/* ---------------------------------------------------------------------------
   RULES — the page's technical ruling layer.

   Previously this lived inline in the Hero only, which is exactly why an
   earlier anti-slop pass called it decoration: a grid that appears in one
   section reads as an accident. Extracted here so every section can carry the
   same two verticals and the page reads as one ruled sheet.

   Both are purely decorative and marked aria-hidden.
   ------------------------------------------------------------------------ */

/**
 * Section eyebrow: mono label in a hairline pill with a leading dot.
 *
 * Promoted here from Portfolio on its third use (Portfolio, Process, FAQ) —
 * the note left in those files said two uses is not yet a pattern and a third
 * makes it one. Three copies of the same markup is the point at which they
 * start drifting apart.
 */
export function PillLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1">
      <span aria-hidden className="h-1 w-1 rounded-full bg-ink" />
      <span className="text-eyebrow uppercase font-mono text-ink-secondary">{children}</span>
    </span>
  );
}

/** Verticals marking where the content column begins and ends. */
export function ColumnRules() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="container-page relative h-full">
        <div className="absolute inset-y-0 left-5 w-px bg-line xl:left-8" />
        <div className="absolute inset-y-0 right-5 w-px bg-line xl:right-8" />
      </div>
    </div>
  );
}

/**
 * A hatched measure strip — fine vertical ticks between two hairlines, the
 * Lumen/Answerr margin device. Used above and below the hero plate so the art
 * reads as mounted on a ruled sheet rather than dropped onto the page.
 *
 * Drawn with a repeating-linear-gradient rather than markup: one element, no
 * DOM cost per tick, and the pitch stays exact at any width.
 */
export function PatternBand({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      /* No border of its own: the caller supplies the single edge it needs, so
         a band sitting flush against a framed element never doubles the rule. */
      className={`h-6 w-full ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--color-line) 0 1px, transparent 1px 8px)",
        backgroundPosition: "center",
      }}
    />
  );
}
