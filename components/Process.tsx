"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PLATES } from "@/lib/plates";
import { ColumnRules, PillLabel } from "@/components/Rules";
import { Chip, Figure } from "@/components/PanelKit";

/* ---------------------------------------------------------------------------
   SECTION 6 — PROCESS
   Layout reference: the Attio "Platform" composition, measured live at 1440px
   and then re-read against two supplied screenshots of the full section.

   The screenshots showed three things the first pass had wrong:

   1. THE FRAME IS SQUARE AND ITS SIDE RULES ARE THE STRUCTURE. The reference
      runs one pair of verticals down the whole section; the header rule, the
      index rule and the band rules all terminate on them. A rounded card
      floating inside the column is a different object entirely. Square now,
      and the frame edges land on x=73 / x=1353 — the exact same verticals the
      Hero and Portfolio ColumnRules already draw, so the page reads as one
      continuously ruled sheet rather than three unrelated ruled things.

   2. THE ACTIVE TAB IS A BAR ON THAT RULE, NOT A FILL. The reference marks the
      selected item with a 2px accent bar sitting on the left container rule.
      The filled pill used before was our invention and it fought the ruling.

   3. THE PANEL ENDS IN TWO CELLS, NOT A THREE-UP SPEC STRIP. Divided by a
      vertical rule, each led by a short ink phrase with the rest in grey —
      the two-tone device again at body scale. Those cells carry BENEFIT, which
      is a genuinely different job from the record above them.

   Two-tone is therefore used twice, as the reference uses it: once at 44px on
   the section headline, once at 17px in the cells. At two scales that reads as
   a system rather than a tic — the earlier note in this file worried about a
   second use at the SAME scale, which is still the thing to avoid.

   Colour ladder — the recessed band and the section ground are the same beige,
   so the band reads as cut through the white frame to the page beneath:
     page #F4F3F0  →  frame #FFFFFF  →  recessed band #F4F3F0

   ART. The first pass shipped without a plate, because all eight then in the
   manifest were already spent (Thesis holds calumny/panel/venus, Focus
   nastagio, Portfolio the white trio, Hero the Creation) and any reuse here
   would have been a literal repeat of Thesis three sections up. Four new
   plates were supplied for this section, so the band now carries both: the
   painting and the record, side by side.

   They are assigned by TONE, not by subject — river 166 → pastoral 99 →
   banquet 81 → symposium 68. A ramp rather than an alternation, so pressing
   through the tabs does not flash the band light/dark/light. It happens to
   read as a narrative too: open water, then the flock, then the table set,
   then the company kept.

   Tokens: docs/TOKENS.md §3 type · §4 spacing · §4.6 states · §6 motion
   ------------------------------------------------------------------------ */

const EASE_DRAMATIC = [0.16, 1, 0.3, 1] as const;

/* Stacked variants cross-fade in place. The outgoing copy leaves in 120ms while
   the incoming waits 100ms before its 260ms entry, so the two are never both at
   half opacity — a straight cross-fade of stacked TEXT ghosts, with the old and
   new sentences legible through each other for the whole transition. The plate
   keeps a plain cross-fade: photographs dissolve cleanly, words do not. */
const stackFade = (on: boolean, reduce: boolean) => ({
  opacity: on ? 1 : 0,
  y: reduce || on ? 0 : 6,
  transition: reduce
    ? { duration: 0 }
    : { duration: on ? 0.26 : 0.12, delay: on ? 0.1 : 0, ease: EASE_DRAMATIC },
});

const EYEBROW = "Process"; // 7 ≤ 24

/* §4.7: section headline ≤ 40 chars, and the grey half carries the subhead job
   (≤ 120). Formula is Belief + Consequence — claim in ink, mechanism in grey. */
const HEAD_INK = "You will never wait on us."; // 26 ≤ 40
const HEAD_MUTED =
  "Four steps, one partner, and a decision in days rather than quarters."; // 69 ≤ 120

type Pair = [string, string];

type Step = {
  id: string;
  n: string;
  label: string;
  /* The panel's top is ONE two-tone lede, not a heading plus a paragraph. That
     is what the reference puts there, and the tab already labels the panel via
     aria-labelledby, so no heading element is lost from the outline. */
  lede: { lead: string; rest: string };
  /** Chip in the record header. */
  status: string;
  /** Tick label on the elapsed-time rail. */
  day: string;
  /* Three content jobs, deliberately kept from overlapping — an earlier pass
     had the record and the strip below it printing the same three pairs.
       list     — the QUALITATIVE material: the agenda, who we called, the
                  reasoning. What the step actually produced.
       params   — the HARD PARAMETERS, in the record's right column.
       features — the BENEFIT to the founder. The reference's bottom cells. */
  list: { head: string; items: string[] };
  params: [Pair, Pair, Pair];
  features: [{ lead: string; rest: string }, { lead: string; rest: string }];
  plate: (typeof PLATES)[keyof typeof PLATES];
};

/* Figures are reconciled against the Track Record numbers in §4 — day 11 and
   2.5x reserves appear in both places and must stay in step. */
const STEPS: Step[] = [
  {
    id: "call",
    n: "01",
    label: "First call",
    lede: {
      lead: "Forty-five minutes with the decider.",
      rest: "You talk to the partner who will make the call, and they have already read what you sent.",
    },
    status: "Call booked",
    day: "Day 0",
    list: {
      head: "Agenda",
      items: [
        "What you have built, shown live",
        "Who uses it, and why they stay",
        "What the next million buys",
      ],
    },
    params: [
      ["Length", "45 minutes"],
      ["Who you meet", "One partner"],
      ["Deck required", "No"],
    ],
    features: [
      {
        lead: "Nobody hands you on.",
        rest: "The partner on that first call stays with the position for as long as we hold it.",
      },
      {
        lead: "Come as you are.",
        rest: "No warm introduction needed and no polish expected. Cold notes get read here.",
      },
    ],
    plate: PLATES.river,
  },
  {
    id: "diligence",
    n: "02",
    label: "Diligence",
    lede: {
      lead: "We call the people who built with you.",
      rest: "Four or five references, chosen by us, and the product used properly for a week. That is the whole of it.",
    },
    status: "In diligence",
    day: "Day 4",
    list: {
      head: "Who we called",
      items: [
        "A former engineering lead",
        "The first design partner",
        "The largest customer by revenue",
      ],
    },
    params: [
      ["References", "Four of five"],
      ["Product", "In daily use"],
      ["Data room", "Not required"],
    ],
    features: [
      {
        lead: "We call the sceptics too.",
        rest: "Not only the names you offer. The useful signal is rarely on the list you send.",
      },
      {
        lead: "Nothing lands on your plate.",
        rest: "Scheduling, chasing and follow-ups are ours. Your week should look the same as it did.",
      },
    ],
    plate: PLATES.pastoral,
  },
  {
    id: "decision",
    n: "03",
    label: "Decision",
    lede: {
      lead: "A yes or a no, in writing, with reasons.",
      rest: "A maybe held open for a quarter is a no that costs you a quarter. Terms follow inside two days.",
    },
    status: "Committed",
    day: "Day 11",
    list: {
      head: "Reasoning, shared in full",
      items: [
        "Retention holds past month six",
        "Two references named the same strength",
        "The next eighteen months are where we help",
      ],
    },
    params: [
      ["Decision", "Day eleven"],
      ["Reasoning", "Always written"],
      ["Terms", "Within 48h"],
    ],
    features: [
      {
        lead: "A no is still useful.",
        rest: "You keep the write-up, and it is the same one we argued from internally.",
      },
      {
        lead: "We will not lead you on.",
        rest: "If the answer is going to be no, you hear it in the first week, not the fifth.",
      },
    ],
    plate: PLATES.banquet,
  },
  {
    id: "after",
    n: "04",
    label: "After the wire",
    lede: {
      lead: "The cheque is the opening move.",
      rest: "A standing monthly slot for as long as you want it, and reserves already held for your next round.",
    },
    status: "Held",
    day: "Ongoing",
    list: {
      head: "What that looks like",
      items: [
        "We send the update; you never chase one",
        "The intro is made, not offered",
        "Same partner in year six as in week one",
      ],
    },
    params: [
      ["Cadence", "Monthly"],
      ["Reserved", "2.5× the cheque"],
      ["Introductions", "Warm only"],
    ],
    features: [
      {
        lead: "We answer in hours.",
        rest: "Between the monthly slots the partner is reachable, and actually replies.",
      },
      {
        lead: "Down rounds included.",
        rest: "The reserve is there for the hard round, which is the only one that really needs it.",
      },
    ],
    plate: PLATES.symposium,
  },
];

export default function Process() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* The list is a horizontal scroller below lg and a vertical rail above it, so
     aria-orientation cannot be a constant — it would tell a screen-reader user
     to expect the wrong arrow keys at one of the two breakpoints. Starts
     horizontal (the ARIA default, and the small-screen truth) so the server and
     first client render agree, then corrects on mount. Both axes are handled
     regardless; this only sets the expectation. */
  const [vertical, setVertical] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setVertical(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* `reveal` only for KEYBOARD moves. Arrowing to step 04 on mobile has to pull
     it into the horizontal scroller, but a pointer click needs no scrolling at
     all — the user just clicked the thing, so it is visibly on screen — and
     calling scrollIntoView anyway walked the whole section up the viewport on
     every click. preventScroll on the focus() itself, because a bare focus()
     drags the page vertically to reach the tab. */
  const select = (i: number, reveal = false) => {
    setActive(i);
    const el = tabRefs.current[i];
    el?.focus({ preventScroll: true });
    if (reveal) el?.scrollIntoView({ inline: "nearest", block: "nearest" });
  };

  /* WAI-ARIA tabs: arrows move selection AND focus. Both axes are live. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = STEPS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  };

  const step = STEPS[active];

  /* Scroll reveal, staggered 90ms as everywhere else on the page. The frame
     itself no longer animates — one block fading in as a unit is not a reveal,
     it is a fade, and it was the only motion the section had. The rules and
     borders are page structure and stay put; the CONTENT arrives.
     `amount` drops for the taller blocks: at 0.25 a 900px panel would not
     trigger until it was a quarter of the way up the viewport. */
  const rise = (i: number, amount = 0.15) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration: 0.62, delay: reduce ? 0 : i * 0.09, ease: EASE_DRAMATIC },
  });

  return (
    <section id="process" className="section relative bg-page">
      {/* The verticals carry on through the section's own padding, above and
          below the frame, so the rules read as running the full height of the
          section rather than starting and stopping at a box. They land on the
          same x as the frame's own border-x — 73 / 1352 — which is also where
          the Hero and Portfolio rules sit. */}
      <ColumnRules />
      <div className="container-page">
        {/* SQUARE frame. Its border-x IS the pair of side rules — they land on
            the same x as the Hero and Portfolio ColumnRules, and every internal
            rule below terminates on them.
            NO background: the section's beige reads straight through, so the
            only white left in the section is the record card floating on the
            plate. It was a white sheet on beige before, which made the frame a
            slab rather than a ruled region of the page. */}
        <div className="border border-line">
          {/* ---------- Ruled header ---------- */}
          <div className="border-b border-line px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <motion.div {...rise(0)}>
              <PillLabel>{EYEBROW}</PillLabel>
            </motion.div>
            {/* ONE colour. The reference splits this heading ink/grey and the
                first pass followed it, but a heading that changes colour
                mid-sentence reads as two thoughts rather than one. The
                ink-lead / grey-rest pattern still runs at body scale in the
                blurb and the closing cells, where it works as emphasis instead
                of as a heading in two halves. */}
            <motion.h2
              {...rise(1)}
              className="mt-6 max-w-[24ch] text-h1 text-ink text-balance lg:max-w-[30ch]"
            >
              {HEAD_INK} {HEAD_MUTED}
            </motion.h2>
          </div>

          {/* ---------- Index | panel ---------- */}
          <div className="lg:grid lg:grid-cols-[264px_1fr] xl:grid-cols-[288px_1fr]">
            {/* Index. Horizontal scroller on small screens, vertical rail from
                lg — the rule flips from bottom edge to right edge with it.
                No horizontal padding at lg: the buttons must reach the frame's
                left border so the active bar can sit ON it, as in the
                reference. overscroll-contain stops a horizontal swipe from
                chaining into browser back-navigation on iOS. */}
            <motion.div
              {...rise(2, 0.1)}
              role="tablist"
              aria-label="Our process"
              aria-orientation={vertical ? "vertical" : "horizontal"}
              onKeyDown={onKeyDown}
              className="flex overflow-x-auto overscroll-x-contain border-b border-line px-2 py-2 lg:flex-col lg:overflow-x-visible lg:border-b-0 lg:border-r lg:px-0 lg:py-8"
            >
              {STEPS.map((s, i) => {
                const on = active === i;
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`process-tab-${s.id}`}
                    aria-selected={on}
                    aria-controls={`process-panel-${s.id}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    className="group relative shrink-0 px-4 py-3 text-left lg:w-full lg:py-3 lg:pl-7 lg:pr-4"
                  >
                    {/* One indicator element, not two. layoutId slides it
                        between tabs; the responsive classes turn it from an
                        underline on the mobile row into a bar on the rule at
                        lg, and motion animates between whichever geometry the
                        current breakpoint gives it. */}
                    {on && (
                      <motion.span
                        aria-hidden
                        layoutId="process-tab-bar"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-ink lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:h-auto lg:w-0.5"
                        transition={
                          reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38 }
                        }
                      />
                    )}
                    <span className="relative flex items-baseline gap-3 whitespace-nowrap">
                      <span
                        className={[
                          "font-mono text-caption uppercase tabular-nums transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                          on ? "text-ink" : "text-ink-secondary",
                        ].join(" ")}
                      >
                        {s.n}
                      </span>
                      {/* Idle labels are ink-SECONDARY. They are live controls,
                          so they need 4.5:1; tertiary measures 2.75:1 here. */}
                      <span
                        className={[
                          "text-nav transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                          on ? "text-ink" : "text-ink-secondary group-hover:text-ink",
                        ].join(" ")}
                      >
                        {s.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* ---------- Panel ----------
                No padding on the panel itself: the recessed band and the cell
                rules have to reach the frame edges, so each child owns its own
                inset instead. */}
            <motion.div
              {...rise(3, 0.05)}
              role="tabpanel"
              id={`process-panel-${step.id}`}
              aria-labelledby={`process-tab-${step.id}`}
              tabIndex={0}
            >
              {/* The blurb. Set at h3 rather than body-lg — at 18px it read as
                  caption under a 44px heading, with no step in between.
                  Every step's copy is stacked into one grid cell and
                  cross-faded, so the block is always as tall as its tallest
                  variant. That replaces the pair of hand-tuned min-heights it
                  used before, which were only ever correct at the two widths
                  they were measured at. */}
              <div className="grid px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
                {STEPS.map((s, i) => (
                  <motion.p
                    key={s.id}
                    aria-hidden={i !== active}
                    initial={false}
                    animate={stackFade(i === active, !!reduce)}
                    className={[
                      "col-start-1 row-start-1 max-w-[40ch] text-h3 text-pretty",
                      i === active ? "" : "pointer-events-none",
                    ].join(" ")}
                  >
                    <span className="text-ink">{s.lede.lead}</span>{" "}
                    <span className="text-ink-secondary">{s.lede.rest}</span>
                  </motion.p>
                ))}
              </div>

              {/* The band. The plate is now the GROUND, full bleed to the
                  frame's rules, with the record floating on it — the Hero's
                  composition, and what the reference does with its screenshot.
                  Held to 58% and pushed right so the painting keeps real
                  estate on the left rather than being reduced to a border,
                  which is the mistake the Thesis grid made first time round. */}
              <div className="relative border-y border-line bg-page">
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ backgroundColor: step.plate.paper }}
                >
                  {/* All four stay mounted and cross-fade. Unmounting would
                      re-request the image and flash the ground on every press. */}
                  {STEPS.map((s, i) => (
                    <motion.div
                      key={s.id}
                      aria-hidden={i !== active}
                      initial={false}
                      animate={{ opacity: i === active ? 1 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.34, ease: EASE_DRAMATIC }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={s.plate.src}
                        alt={i === active ? s.plate.alt : ""}
                        width={s.plate.width}
                        height={s.plate.height}
                        sizes="(min-width: 1024px) 1000px, 100vw"
                        className="h-full w-full object-cover object-center"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="relative px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[560px] lg:px-10 lg:py-20">
                  <div className="lg:mx-auto lg:w-[62%] lg:max-w-[600px]">
                    <DealFile step={step} index={active} reduce={!!reduce} />
                  </div>
                </div>
              </div>

              {/* Two cells, divided by a rule, each led by an ink phrase with
                  the rest in grey. The reference's closing move. */}
              {/* Every step's pair is rendered into the same grid cell and
                  cross-faded, so each column is always as tall as its own
                  tallest variant and the frame cannot move when a tab changes.
                  Keying a single <p> per column instead made the section jump
                  22px on step 04, whose copy wraps one line shorter — and a
                  min-height tuned to fix that is only correct at the width it
                  was measured at. This is self-tuning at every width. */}
              <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                {[0, 1].map((col) => (
                  <div key={col} className="grid items-center px-5 py-7 sm:px-8 sm:py-8 lg:px-10">
                    {STEPS.map((s, i) => (
                      <motion.p
                        key={s.id}
                        aria-hidden={i !== active}
                        initial={false}
                        animate={stackFade(i === active, !!reduce)}
                        className={[
                          "col-start-1 row-start-1 max-w-[38ch] text-body text-pretty",
                          i === active ? "" : "pointer-events-none",
                        ].join(" ")}
                      >
                        <span className="text-ink">{s.features[col].lead}</span>{" "}
                        <span className="text-ink-secondary">{s.features[col].rest}</span>
                      </motion.p>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   DEAL FILE — the panel's product view.

   One record in four states, which is how the reference works: a single
   product, four views, chrome held constant so the eye tracks the change
   rather than re-reading the frame each time.

   Deliberately a DOCUMENT, not an app screenshot — no toolbar, no traffic
   lights, no fake avatars. The page already carries a dashboard (Hero) and a
   screening stack (Focus); a third pretend interface would be a tic. A record
   sheet is also what this process genuinely produces.

   Labelled "specimen": the figures are placeholder, and a header naming an
   invented portfolio company would read as a claim.
   ------------------------------------------------------------------------ */
function DealFile({ step, index, reduce }: { step: Step; index: number; reduce: boolean }) {
  /* One equal cell per step; the dot sits at its cell's centre and the label is
     centred in the same cell, so the two align by construction at every width.
     An earlier pass placed the dots at weighted percentages (4/38/76/100) with
     the labels on justify-between — which put "Day 11" 58px from its own dot at
     1440px and clipped "Day 0" off the left edge at 375px. Geometry that has to
     be hand-tuned per breakpoint is geometry that will drift. */
  const at = (i: number) => `${((i + 0.5) / STEPS.length) * 100}%`;

  return (
    /* Fills the band rather than sitting centred inside it at 760px. The
       reference's screenshot is nearly the full width of its own band, and the
       extra 230px is most of what makes the record read as the panel's subject
       instead of an inset thumbnail.

       An earlier pass floated a "Next step" control over the bottom-right
       corner, copying the popover the reference overlaps its screenshot with.
       It landed on top of the rail — covering the last dot and the "Ongoing"
       label — and it duplicated a job the tabs already do. The reference can
       overlap because its screenshot has empty space; this record is dense, so
       the same move can only obscure something. Removed rather than padded
       around: reserving dead space inside the card to host an ornament is
       designing for the ornament. */
    <div className="relative h-full">
      {/* flex column so the rail sits on the card's bottom edge when the grid
          stretches this to match the plate beside it. */}
      <div className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface">
        {/* Header — constant across states except the status chip */}
        {/* Stacks below sm. In one row at 375px the chip squeezed the title
            until "Deal file · specimen" wrapped — and it wrapped for three of
            the four statuses but not the short one ("Held"), so the header was
            8px taller on three steps and the card moved on every press.
            Stacking is deterministic: two lines whatever the status says, and
            no overflow risk at 320px either. nowrap on the chip because
            shrink-0 stops it being squeezed but not its text being broken. */}
        <div className="flex flex-col items-start gap-2 border-b border-line px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5">
          <div className="min-w-0">
            <p className="text-caption font-mono text-ink">
              Deal file · specimen
            </p>
            {/* Subtitle, as every panel now carries: the label names the
                object, this says what you are looking at inside it. */}
            <p className="mt-0.5 truncate text-caption text-ink-secondary">
              One position, followed through all four steps
            </p>
          </div>
          <motion.span
            key={`${step.id}-chip`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
            className="shrink-0"
          >
            {/* Chip handles nowrap itself now. It mattered: at 375px "Call
                booked" and "In diligence" broke to two lines and made the
                header 8px taller on three of the four steps. */}
            <Chip tone="warm">{step.status}</Chip>
          </motion.span>
        </div>

        {/* Body: qualitative material left, hard parameters right. min-h keeps
            the rail from walking up and down between states. */}
        {/* Both blocks below stack all four steps into one grid cell and
            cross-fade, so the card is always as tall as its tallest state and
            the frame cannot move on a tab press. */}
        <div className="flex-1">
          <div className="grid px-4 py-5 sm:px-5 sm:py-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.id}
                aria-hidden={i !== index}
                initial={false}
                animate={stackFade(i === index, !!reduce)}
                className={[
                  "col-start-1 row-start-1",
                  i === index ? "" : "pointer-events-none",
                ].join(" ")}
              >
                <p className="text-caption font-mono text-ink">{s.list.head}</p>
                <ul className="mt-3.5 flex flex-col gap-2.5">
                  {s.list.items.map((item) => (
                    <li key={item} className="group/item flex gap-3.5 text-body text-ink">
                      {/* An em-rule, not a bullet or a tick: a tick would imply
                          a completed checklist, which these are not. */}
                      <span
                        aria-hidden
                        className="mt-3 h-px w-3.5 shrink-0 bg-line transition-colors duration-[220ms] group-hover/item:bg-[var(--color-accent-warm)]"
                      />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Parameters run as a horizontal strip, not the right-hand column
              they used when the record had the whole band. Sharing the band
              with the plate takes the card to ~570px, and a 220px side column
              out of that left the list wrapping every second item.
              One <dl> per cell rather than one wrapping the grid: a dl may
              contain dt/dd or a div grouping them, but not divs nested two
              deep, which is what stacking inside a single dl would need. */}
          <div className="grid grid-cols-3 divide-x divide-line-subtle border-t border-line-subtle">
            {[0, 1, 2].map((col) => (
              <div key={col} className="grid px-4 py-3 sm:px-5">
                {STEPS.map((s, i) => (
                  <motion.dl
                    key={s.id}
                    aria-hidden={i !== index}
                    initial={false}
                    animate={stackFade(i === index, !!reduce)}
                    className={[
                      "col-start-1 row-start-1",
                      i === index ? "" : "pointer-events-none",
                    ].join(" ")}
                  >
                    <dt className="text-caption font-mono text-ink">
                      {s.params[col][0]}
                    </dt>
                    <dd className="mt-1 text-small text-ink text-pretty">
                      <Figure value={s.params[col][1]} />
                    </dd>
                  </motion.dl>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Elapsed-time rail. The section's claim made visible — the headline
            says "days rather than quarters" and the rail shows it. */}
        <div className="border-t border-line px-4 py-3 sm:px-5">
          <div className="relative h-px w-full bg-line">
            <motion.div
              className="absolute inset-y-0 left-0 bg-ink"
              initial={false}
              animate={{ width: at(index) }}
              transition={reduce ? { duration: 0 } : { duration: 0.52, ease: EASE_DRAMATIC }}
            />
            {STEPS.map((s, i) => (
              <span
                key={s.id}
                aria-hidden
                className={[
                  "absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-[340ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                  i === index
                    ? "bg-[var(--color-accent-warm)] ring-2 ring-[var(--color-accent-warm-tint)]"
                    : i < index
                      ? "bg-ink"
                      : "bg-line",
                ].join(" ")}
                style={{ left: at(i) }}
              />
            ))}
          </div>
          {/* Same cell count as the dots above — that is what keeps them aligned */}
          <div className="mt-2.5 grid grid-cols-4">
            {STEPS.map((s, i) => (
              <span
                key={s.id}
                className={[
                  "text-center font-mono text-caption tabular-nums transition-colors duration-[340ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                  i === index ? "text-[var(--color-accent-warm)]" : "text-ink-secondary",
                ].join(" ")}
              >
                {s.day}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
