"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import DitherTouch from "@/components/DitherTouch";
import { ColumnRules } from "@/components/Rules";

/* ---------------------------------------------------------------------------
   SECTION 8 — CTA

   Centred copy in a ruled band, dithered sky behind, and the two hands running
   full width beneath — flush into the footer with no gap. This is the one place
   on the page that breaks the 1280 column, deliberately: the last thing the
   page does is stop being a document and become an image.

   THE HANDS ARE TWO PLATES, NOT ONE, cut by scripts/build-hands.mjs. Each takes
   exactly half the band and on scroll they slide in from their own edges and
   meet. See that script for how the split is chosen and why every number here
   is derived rather than tuned.

   MOTION, THREE LAYERS, EACH SLOWER THAN THE ONE IN FRONT:
     hands   ±18px vertical, plus the horizontal entrance
     sky     ±8px vertical
   The entrance is sprung rather than linear so it settles instead of stopping.

   The scroll offset ends at "end end", not "end start". This section is the last
   thing before the footer and never scrolls off the TOP of the viewport — the
   document runs out first. With "end start" the range was unreachable past
   about a fifth of its span and the plate moved 6px out of 36.

   Tokens: docs/TOKENS.md §2 art layer · §3 type · §4 spacing · §4.6 states
   ------------------------------------------------------------------------ */

const EASE_DRAMATIC = [0.16, 1, 0.3, 1] as const;

const HEADLINE = "Tell us what you are building."; // 30 ≤ 40

/* Every clause carries something the page has not already said: who receives
   it, that nothing is triaged, and that silence is not an outcome. Checked
   against §6 Process and §7 FAQ — "no warm introduction needed" and "reasoning
   always written" live there and are deliberately not repeated. */
const SUB =
  "It goes to a partner, not a shared inbox. One of us reads every one, and you will get an answer either way."; // 106 ≤ 120

/* Each arm takes exactly half the band, edge to centre.

   `contain` is what makes that work. Under `cover` the plate had to be scaled
   up until it bled past both sides, so the arm hit the viewport border as a
   slice through the forearm. Inset to 7% that stopped, but then the arms
   floated 100px short of the edge. Contained at the full half-width they do
   both: the arm reaches the border and ends on its OWN edge.

   Everything that used to be corrected here now holds by construction, because
   build-hands.mjs cuts for it:

   · SAME SCALE. The master splits at x=1000 — its exact centre, which also
     falls inside the widest ink-free corridor (964..1008), the gap between the
     fingertips. Two 1000×500 plates in two equal boxes cannot scale
     differently, so the fingers meet instead of breaking at the join.
   · SAME LINE. One shared vertical window (rows 331..830). Cropped to their own
     ink the two arms sit 38px apart vertically.
   · FULL BLEED. Both forearms run off the master's frame, as they do in the
     fresco, and they are MEANT to reach the viewport border — the composition
     is two arms entering from off-screen. Softening that edge was tried twice
     and both attempts were worse; DitherTouch's header records what and why.
     Leave the arms touching the edge. */
const ARM_WIDTH = "50%";
const ARM_INSET = "0%";

export default function CTA() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  /* Sprung so the halves settle into the join rather than arriving and
     stopping dead — "suave" is the whole point of the gesture. */
  const spring = { stiffness: 90, damping: 22, mass: 0.6 };
  const closing = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const leftX = useSpring(useTransform(closing, (v) => `${-100 * v}%`), spring);
  const rightX = useSpring(useTransform(closing, (v) => `${100 * v}%`), spring);

  const handsY = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const skyY = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  const rise = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.62, delay: reduce ? 0 : i * 0.09, ease: EASE_DRAMATIC },
  });

  /* Padding is 72 / 80 / 88 on BOTH edges. The plate ran flush into the footer
     for a while and the two read as one welded block; the section is meant to
     float — full bleed left and right, but held off the footer, with air
     between the copy and the hands and again between the hands and the dark.

     (Comments about the root element live HERE, above the return. A JSX comment
     placed inside `return (` before the root parses as an object literal and
     throws TS1005 — hit six times in this file, so it is not attempted again.) */
  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden bg-page py-18 md:py-20 lg:py-22"
    >
      {/* ---- Sky ----
          The plate enters from BOTH edges: once as supplied on the left, once
          mirrored on the right, so the cloud mass frames the copy instead of
          drifting across it. The middle is left empty on purpose.

          Each panel is `calc(50% - 340px)` wide. That is not a round number
          picked by eye — the copy is capped at 640px and centred, so its half
          width is 320px, and 340 stops each panel 20px short of it at EVERY
          viewport rather than at the one it was checked on. `max(0px, …)` folds
          them away below ~680px, where there is no room to frame anything.

          Held far back so it reads as air, not as a picture: 13% opacity, a
          horizontal fade into the clear centre, and the parent's vertical fade
          keeping its darks off the hands' band. A plain <img>, not a second
          DitherTouch — the file is already a dither. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          ...(reduce ? {} : { y: skyY }),
          maskImage: "linear-gradient(to bottom, #000 0%, #000 45%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 45%, transparent 92%)",
        }}
      >
        {/* Left, as supplied */}
        <div
          className="absolute inset-y-0 left-0 w-[max(0px,calc(50%-340px))] opacity-[0.13]"
          style={{
            maskImage: "linear-gradient(to right, #000 0%, #000 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, #000 0%, #000 55%, transparent 100%)",
          }}
        >
          <Image src="/art/sky-warm.png" alt="" fill sizes="40vw" className="object-cover object-left" />
        </div>

        {/* Right, mirrored. -scale-x-100 flips the panel whole, so the same
            mask now fades toward the centre and object-left anchors to the
            outer edge — one gradient, both sides, no second declaration. */}
        <div
          className="absolute inset-y-0 right-0 w-[max(0px,calc(50%-340px))] opacity-[0.13]"
          style={{
            /* scaleX inline, not `-scale-x-100`: that utility resolved to
               `transform: none` here and the panel shipped unmirrored. */
            transform: "scaleX(-1)",
            maskImage: "linear-gradient(to right, #000 0%, #000 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, #000 0%, #000 55%, transparent 100%)",
          }}
        >
          <Image src="/art/sky-warm.png" alt="" fill sizes="40vw" className="object-cover object-left" />
        </div>
      </motion.div>

      <ColumnRules />

      {/* ---- Copy, centred in a ruled band ---- */}
      <div className="container-page relative">
        <div className="border-y border-line py-14 lg:py-16">
          <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
            <motion.h2 {...rise(0)} className="max-w-[18ch] text-h1 text-ink text-balance">
              {HEADLINE}
            </motion.h2>

            <motion.p
              {...rise(1)}
              className="mt-5 max-w-[52ch] text-body-lg text-ink-secondary text-balance"
            >
              {SUB}
            </motion.p>

            <motion.div
              {...rise(2)}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="mailto:hello@fieldnote.capital"
                className="rounded-full bg-accent px-6 py-3 text-center text-nav text-on-dark transition-[background-color,transform] duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-px hover:bg-accent-hover active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none"
              >
                Send a note
              </a>
              <a
                href="#faq"
                className="rounded-full border border-line bg-transparent px-6 py-3 text-center text-nav text-ink transition-[background-color,border-color] duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-ink-tertiary hover:bg-page-alt"
              >
                Read the FAQ
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---- Hands, full bleed ----
          No container-page. The section is a block child of <main>, which sets
          no width of its own, so a plain w-full spans the viewport without a
          negative-margin or 100vw trick.

          The clip is the real height; the parallax layer inside overhangs it by
          24px top and bottom so the vertical drift happens INSIDE the frame.
          Without the overhang, lifting the plate would open a gap at the footer
          and undo the flush join. */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease: EASE_DRAMATIC }}
        /* aspect-locked, not a fixed height. Each arm is half the band and each
           plate is 2:1, so the band has to be 4:1 for the two boxes to match
           their plates at EVERY width. With a fixed 420px they only matched at
           one: past ~1613px the box grew proportionally taller than the plate
           and `contain` started fitting by height, leaving a gap at each outer
           edge; below that it fitted by width and left the gap above and below
           the arm instead. Locking the ratio removes both, permanently, and the
           composition scales instead of drifting.
           RE-DERIVE THIS whenever the plates are re-cut — it is twice the plate
           ratio that build-hands.mjs prints, and nothing else. */
        className="relative mt-14 aspect-[4/1] w-full overflow-hidden lg:mt-16"
      >
        <motion.div
          className="absolute inset-x-0 -inset-y-6"
          style={reduce ? undefined : { y: handsY }}
        >
          <motion.div
            className="absolute inset-y-0"
            style={{ width: ARM_WIDTH, left: ARM_INSET, ...(reduce ? {} : { x: leftX }) }}
          >
            <DitherTouch
              src="/art/hands-left.png"
              label="The reaching hand from Michelangelo's Creation of Adam, redrawn as a grid of dither squares."
              fit="contain"
              inkVar="--color-art-ink"
              className="h-full w-full"
            />
          </motion.div>

          <motion.div
            className="absolute inset-y-0"
            style={{ width: ARM_WIDTH, right: ARM_INSET, ...(reduce ? {} : { x: rightX }) }}
          >
            <DitherTouch
              src="/art/hands-right.png"
              label="The answering hand from Michelangelo's Creation of Adam, redrawn as a grid of dither squares."
              fit="contain"
              inkVar="--color-art-ink"
              className="h-full w-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
