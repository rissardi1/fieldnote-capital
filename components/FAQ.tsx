"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PillLabel } from "@/components/Rules";

/* ---------------------------------------------------------------------------
   SECTION 7 — FAQ
   Replaces the planned Team section. Insights (08) is dropped entirely, so the
   run to the end is now FAQ → CTA → Footer.

   Layout reference: the "Your questions, answered" composition — heading and
   lede held in a narrow left column, a stack of bordered disclosure cards on
   the right, each with a plus that becomes a minus.

   Two deliberate departures from it:

   · THE HEADING IS ONE COLOUR. The reference splits it ink/grey exactly as the
     Attio headline does. That treatment was removed from §6 on instruction —
     a heading that changes colour mid-sentence reads as two thoughts — so it
     does not come back here. The ink-lead / grey-rest pattern stays at body
     scale only.
   · NO VERTICAL RULES BESIDE THE CARDS. The reference runs them the full
     height. The cards already carry their own borders, and §5 established that
     rules next to bordered cards read as a second, competing frame. The rules
     run through the lead-in above and terminate on the top rule instead.

   Content is checked against §4 Portfolio, §5 Focus and §6 Process so no answer
   restates something the page has already said. Stage, leading, board seats,
   geography, conflicts and the cap table are all new ground — the decision
   timeline, references, reasoning and reserves are not, and are absent here.

   Tokens: docs/TOKENS.md §3 type · §4 spacing · §4.6 states · §6 motion
   ------------------------------------------------------------------------ */

const EASE_DRAMATIC = [0.16, 1, 0.3, 1] as const;

const EYEBROW = "FAQ";
const HEADLINE = "Your questions, answered."; // 25 ≤ 40
const LEDE = "The things founders ask before they send the first note.";

const ITEMS = [
  {
    id: "stage",
    q: "What stage do you invest at?",
    a: "Pre-seed and seed, and we are usually the first institutional money in. Cheques run $250k to $2M, and we would rather be early and wrong than late and certain.",
  },
  {
    id: "lead",
    q: "Do you lead rounds?",
    a: "Most of the time. We are comfortable setting terms and writing the first cheque, and equally comfortable following someone we rate when they are better placed to lead.",
  },
  {
    id: "board",
    q: "Do you take a board seat?",
    a: "Only if you want one. At pre-seed a board is usually overhead dressed as governance. We would rather have the standing monthly hour and an observer seat you can revoke.",
  },
  {
    id: "where",
    q: "Where do you invest?",
    a: "Europe and the UK, with a handful of positions in North America. We will travel for a first meeting anywhere we can reach and return the same day.",
  },
  {
    id: "conflict",
    q: "Will you invest in a competitor?",
    a: "No, not while we hold a position. If a conversation starts drifting toward something we already back, we will tell you before you tell us anything you would not want repeated.",
  },
  {
    id: "cap-table",
    q: "Who else ends up on the cap table?",
    a: "Usually one other fund and a small group of angels who have actually done the job you are doing. We make those introductions ourselves, and you decide who you want.",
  },
];

export default function FAQ() {
  const reduce = useReducedMotion();
  /* Single-open, as the reference has it, and `null` is a real state — pressing
     the open item closes it rather than trapping one panel open forever. */
  const [open, setOpen] = useState<string | null>(ITEMS[0].id);

  const rise = (i: number, amount = 0.15) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: {
      duration: 0.62,
      delay: reduce ? 0 : i * 0.09,
      ease: EASE_DRAMATIC,
    },
  });

  /* No ruling in this section. A ruled lead-in and a top rule were both tried
     and removed: the disclosure cards already carry borders, and a second frame
     above them competes rather than organises. Ordinary `.section` padding, and
     the cards are the only edges.

     (A JSX comment cannot be the first thing inside `return (` before the root
     element — it parses as an object literal. TS1005. Third time.) */
  return (
    <section id="faq" className="section bg-page-alt">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ---- Left: heading ---- */}
          <div className="lg:col-span-4">
            <motion.div {...rise(0)}>
              <PillLabel>{EYEBROW}</PillLabel>
            </motion.div>
            <motion.h2 {...rise(1)} className="mt-6 max-w-[14ch] text-h1 text-ink text-balance">
              {HEADLINE}
            </motion.h2>
            <motion.p
              {...rise(2)}
              className="mt-5 max-w-[34ch] text-body text-ink-secondary text-pretty"
            >
              {LEDE}
            </motion.p>
          </div>

          {/* ---- Right: disclosure stack ---- */}
          <motion.div
            {...rise(3, 0.05)}
            className="flex flex-col gap-3 lg:col-span-7 lg:col-start-6"
          >
            {ITEMS.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={open === item.id}
                onToggle={() => setOpen(open === item.id ? null : item.id)}
                reduce={!!reduce}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  item,
  isOpen,
  onToggle,
  reduce,
}: {
  item: (typeof ITEMS)[number];
  isOpen: boolean;
  onToggle: () => void;
  reduce: boolean;
}) {
  const panelId = `faq-panel-${item.id}`;
  const buttonId = `faq-q-${item.id}`;

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      {/* The button sits INSIDE a heading: that is the ARIA accordion pattern,
          and it keeps the questions in the document outline where a screen
          reader can jump between them. */}
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-page"
        >
          <span className="text-h4 text-ink text-balance">{item.q}</span>
          <PlusMinus isOpen={isOpen} reduce={reduce} />
        </button>
      </h3>

      {/* The answer stays MOUNTED and is clipped to height 0 when closed, rather
          than being unmounted or display:none'd. Collapsed answers are still in
          the HTML, which is the whole point of putting an FAQ on the page —
          a crawler that never clicks still reads all six. aria-hidden keeps it
          out of the accessibility tree while it is shut, which is the correct
          disclosure behaviour. */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                height: { duration: 0.34, ease: EASE_DRAMATIC },
                opacity: { duration: 0.22 },
              }
        }
        className="overflow-hidden"
      >
        <div className="px-5 pb-5">
          {/* Rule inset to the text, not the card — it separates question from
              answer, it does not divide the card in two. */}
          <p className="max-w-[62ch] border-t border-line-subtle pt-4 text-body text-ink-secondary text-pretty">
            {item.a}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Plus that becomes a minus by collapsing its own vertical stroke. Two hairlines
 * in --color-line weight rather than an icon font or an SVG swap: the mark is
 * built from the same rules as everything else on the page, and there is no
 * second glyph to cross-fade against the first.
 */
function PlusMinus({ isOpen, reduce }: { isOpen: boolean; reduce: boolean }) {
  return (
    <span aria-hidden className="relative h-3.5 w-3.5 shrink-0">
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink" />
      <motion.span
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink"
        initial={false}
        animate={{ scaleY: isOpen ? 0 : 1 }}
        transition={{ duration: reduce ? 0 : 0.22, ease: EASE_DRAMATIC }}
      />
    </span>
  );
}
