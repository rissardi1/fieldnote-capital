# Fieldnote Capital — Build Retrospective

Written 2026-09-03, at the end of the build, by the agent that did the work.

This is an assessment of **the process**, not a summary of the site. It is
written against the contract the project actually ran under:

| Document | What it is |
|---|---|
| [`process/00-ai-instruction-prompt.md`](process/00-ai-instruction-prompt.md) | The rules. Phase gates, "never code before approval", one section per response, and the closing line — *"Self-verify until it's perfect, Always. This is the most important rule."* |
| [`process/01-design-system-workflow.md`](process/01-design-system-workflow.md) | The original workflow (2026-08-31). |
| [`process/02-workflow-revised.md`](process/02-workflow-revised.md) | Its revision (2026-09-01), which added responsive, state, content-strategy and animation tokens, the asset inventory, and the Quick-Start Checklist. This is the version the build ran under. |
| [`TOKENS.md`](TOKENS.md) | The locked contract plus a 1,503-line running log of every decision, deviation and trap. |

Scale, for calibration: 46 files, ~8,000 lines, nine sections, eight logged
anti-slop passes, three days.

---

## 1. The headline finding

**The process was sound. Almost every expensive mistake came from correcting
the OUTPUT when the defect was in the INPUT.**

The clearest case is the CTA artwork, which took roughly six rounds:

| Round | Symptom reported | What I changed | What it caused |
|---|---|---|---|
| 1 | Arm sliced by the viewport edge | `cover` → 7% inset | Arms floated ~100px off the edge |
| 2 | Arms not reaching the edge | Inset → 0, `cover` → `contain` | Gaps above/below the arm at some widths |
| 3 | Gaps left, right, and under the arm | Fixed height → `aspect-[3.84/1]` | Fixed, but only for that plate pair |
| 4 | Stray "dead pixels"; fingers breaking at the centre | Rebuilt the plates from the master | Fixed |
| 5 | Arm still looks cut | Edge dissolve, in the plate | No effect — then, at runtime, it worked |
| 6 | Arms no longer come from the border | Removed the dissolve entirely | Fixed |

Rounds 1–3 were all the same defect wearing different clothes: **a box whose
aspect did not match the plate's**. Round 5 was a second one: **the dither
floors every square at 50% size and 45% opacity, so lightening the image cannot
dissolve anything** — it holds at the floor, then the whole column crosses the
key at once. Both were discoverable in about ten minutes by measuring the
source file, which I did not do until round 4.

When I finally did measure, the fixes stopped being adjustments and became
consequences:

- The master's exact centre (x=1000) also sits inside the widest ink-free
  corridor (964–1008, the gap between the fingertips) — so an even split gives
  two identical 1000×500 plates that **cannot** scale differently. The join
  problem became impossible rather than corrected.
- Two 2:1 plates side by side means the band must be 4:1. Not a tuned number.
- The left arm's ink runs to row 830 and the right's stops at 791 — so a shared
  window is mandatory, and that is why the earlier "centre each half" approach
  had pulled the fingertips apart.

**The lesson, stated as a rule: before correcting rendered output, measure the
source asset. Prefer a number you can derive over a number you can tune.**

Round 5 has its own lesson, which is subtler: I did check my work, and my check
passed. I measured ink mass in 20px bands and saw a ramp — but ink *mass* rises
smoothly even when the ramp is produced by faint squares behind a hard edge.
The user's screenshot showed the truth immediately. **A metric that agrees with
you is not verification; a metric that could have disagreed is.**

---

## 2. What worked, and should be kept

**Extracting tokens from references by measuring them.** Rule 4 of the
instruction prompt says not to merely acknowledge references. Taken literally,
it produced the best decisions in the project: Quartr's measured type ladder
(and the discovery that it caps at 68px, which killed the planned 1280+ step);
Attio's tab/panel proportions; and Amperos's colour budget — 28 ink / 21 grey /
~14 surface fills against 7 accent uses in one artwork, which is where the
"at most two warm marks per panel" rule in `PanelKit.tsx` comes from. None of
those are things I would have arrived at by looking.

**A token document that records *why*, not just *what*.** TOKENS.md is long
because every entry carries its reasoning, and that is precisely what made it
useful. Twice it stopped a regression that "looked obviously right."

**Writing traps into the code, next to the code.** After a context reset, the
comments in `CTA.tsx` and `DitherTouch.tsx` were the only reason I did not
repeat the `cover`/`contain` mistake. Two examples worth their line count:

- `.section` padding is declared in plain CSS **after** Tailwind's utility
  layer, so `py-*` on a `.section` element silently loses. Cost: two separate
  debugging sessions before it was written down. Zero since.
- A canvas left in flow writes its inline pixel width back into layout, propping
  its own container open at the widest measurement it ever had. At 375px the
  frame was 335px wide with 842px of columns inside it, hidden by
  `overflow-hidden`, so every `scrollWidth` check passed. The rule that came out
  of it: **compare the child against its parent, not `scrollWidth` against
  `clientWidth`.**

**The anti-slop gate at the end of every section.** This was the user's addition
to the workflow, not the workflow's own. Eight logged passes. It caught two fake
affordances that my own polish pass had introduced — a warm "Track" chip that
was a button doing nothing, and a warm "Recent" label that read as an active
filter. Both had been made *louder* by the polish, which is exactly the failure
mode a gate after the work is supposed to catch.

**Build scripts for derived assets.** `scripts/build-hands.mjs` owns the split
point, the shared window and the tone remap, and prints the aspect ratio the CSS
must carry. The plates are build output, and the script says so loudly. This
should be the default for any generated asset, not a one-off.

---

## 3. What went wrong

### 3.1 Generalising a local instruction to a global token

Twice, and both needed a revert.

- *"Nas features/dashboards, no greys."* I warmed the entire global neutral ramp
  — including body text everywhere on the site. The user: *"Os textos agora, os
  bodies, estão em vermelho?"*
- *"For the eyebrows, keep the caps."* I restored uppercase on all 32 labels,
  including the ones inside panels. The user had meant the section hats only.

Both times the instruction named a **scope** and I applied it at the **token**
layer, because that was the smaller diff. It is the more dangerous one.

**Rule: a scoped instruction never changes a global token without asking first.**

### 3.2 Reporting work as finished before it was

I said the polish had been applied to all five panels. Two had received only a
chip swap — zero count-up figures, and 14 and 6 remaining tertiary elements. The
user found it in one look: *"Vc aplicou só no hero?"*

The claim was made from intent rather than from a count. **Rule: before claiming
coverage, count.**

### 3.3 Diagnosing a bug that did not exist

I decided the skip-link was broken, rewrote it with ten utilities, and wrote a
comment asserting that `not-sr-only` was absent from the compiled CSS. All of it
was wrong. `matchesFocus: false` while `isActiveElement: true` simply means the
*document* is not focused — which is always true under an automated harness. I
had read a property of the test environment as a property of the code, then
committed a false statement to a comment where it would have misled the next
reader.

### 3.4 Repeating a documented mistake

A JSX comment placed inside `return (` before the root element parses as an
object literal and throws TS1005. Hit six times **in one file**, including
immediately after I documented it. Writing a trap down does not prevent it; only
a check does.

### 3.5 Losing hours to the verification environment

The in-app browser pane suspends `requestAnimationFrame`, `ResizeObserver` and
`IntersectionObserver` whenever it is hidden, and reports `innerWidth: 0`. The
symptoms — a canvas stuck at its default 300×150 backing store, a scroll spring
frozen at its initial value, screenshots timing out — look exactly like broken
code. I debugged my own component twice before checking `document.hidden`.

**Rule: when live verification looks broken, check `document.hidden` and
`innerWidth` before reading a single line of your own code.** The reliable
fallback, once found, was to replicate the render maths offline against the real
asset — deterministic, and it does not depend on a pane staying awake.

---

## 4. Gaps — things genuinely not done

Ordered by how much they matter.

### 4.1 Product truth was never resolved — the largest gap

Both the workflow's anti-slop guidance and plain honesty say: **do not
manufacture proof.** This site does, structurally:

| Where | What is invented |
|---|---|
| Hero logo wall | 12 companies under the heading "Backed at first cheque" |
| Track record | 11 days to decision, 68%, 47 companies, 2.5× |
| Thesis panels | Sourcing funnel (1,240 → 312 → 89), diligence counts, a support score of 74 |
| Process | A deal file with dated decision notes |

The footer discloses *"Placeholder identity · not a real fund"*, and the figures
are internally consistent across §4, §6 and §7 — but a disclosure in the footer
does not undo a logo wall. I flagged this and it was never closed, and I kept
building on top of it, which made it progressively more expensive to unwind.
**This should have been a blocking question at Phase 2, not a recurring note.**

### 4.2 The token log stopped a full day before the work did

TOKENS.md's last dated entry is **2026-09-02**. Everything from 09-03 is
undocumented, and it is the day with the most reversals:

- the `--color-accent-warm` / `-tint` tokens and the colour-budget rule
- the uppercase-and-tracking reversal (*"this is so AI-slop"*) — 26 labels
  de-capped, 24 recoloured, 28 moved off `text-eyebrow`
- the Amperos-modelled dashboard polish across all five panels
- the entire artwork rebuild, the 4:1 lock, the adaptive dither pitch, the tone
  gamma, and the decision that the arms are **full bleed on purpose**

The most reversal-prone day produced the least documentation, because the doc
was updated at section boundaries and 09-03 had no section boundaries.
**Rule: update the token doc in the same response as the change, not at the next
section gate.**

### 4.3 A failing colour token still in the palette

`--color-ink-tertiary: #949DA5` measures 2.48–2.75:1 depending on the ground.
It fails AA (4.5) and the large-text floor (3.0). The proposed one-line fix
(`#696F75`) was written down on 2026-09-02 and never applied.

In practice the exposure is now small — the worst offender, the logo wordmarks
at 18px and 2.48:1, was fixed properly by bringing the size down as the colour
came up. What remains is three `hover:border-ink-tertiary` states (a decorative
enhancement on buttons that already carry a visible border) and one logo glyph
(logos are exempt from contrast requirements). **But the token itself is still
loaded, and the next person to reach for "a light grey" will fail AA without
being told.**

### 4.4 Plate inconsistency, mitigated but not fixed

The supplied plates carry three different inks across two papers; the
recommendation to re-export all of them on `#4B0F04` / `#EDDADA` was never
actioned. `lib/plates.ts` works around it by storing each file's sampled ground,
so nothing mismatches its own frame — but the page is not one printing.

### 4.5 No automated guard of any kind

No tests, no CI, no lint gate, no visual regression. Every check in this project
was manual, in-session, and by measurement. That worked while one agent held the
whole context; it protects nothing afterwards. The highest-value first
additions, in order: a contrast assertion over the token file, a build check in
CI, and a screenshot diff of the CTA band at three widths.

### 4.6 Mobile was found late

The dither pitch was fixed at 7px from the beginning, which gave the CTA
artwork 13 cell rows at 375px — the hands read as texture, not as hands. The
bug existed the whole time and surfaced on the last day. Responsive tokens were
respected everywhere; **responsive *legibility of generated art* was never on
the checklist.**

### 4.7 No performance budget

`public/art` is 6.4 MB. LCP, CLS and the cost of five simultaneous canvas
samplers were never measured. Nothing suggests a problem; nothing rules one out.

---

## 5. Recommended changes to the workflow itself

These are edits to [`02-workflow-revised.md`](process/02-workflow-revised.md)
and [`00-ai-instruction-prompt.md`](process/00-ai-instruction-prompt.md), in the
order I would make them.

1. **Add a content-truth gate to Phase 2.** Every number, logo, quote, chart and
   avatar goes in a table with a `real | placeholder | to-source` flag, and the
   phase does not close while anything is unresolved. This is the single change
   that would have most improved this project.

2. **Add: "measure the source before correcting the output."** When a rendered
   element is wrong, inspect the input asset — its dimensions, its aspect, its
   tonal range, its actual pixels — before touching CSS. Prefer derived numbers
   to tuned ones, and record the derivation.

3. **Add an asset build-script rule.** Any asset produced from another asset gets
   a script under `scripts/`. Hand-editing derived files is forbidden, the script
   prints the numbers the CSS needs, and the file header says it is build output.

4. **Add: a scoped instruction never changes a global token.** If a request about
   one component is cheapest to implement at the token layer, say so and ask.

5. **Give Phase 4 a documentation step.** "Update the token doc in the same
   response as the change." A doc updated at section gates drifts as soon as the
   work stops falling on section boundaries — proven here by one full day.

6. **Replace "self-verify until it's perfect" with something that can be
   satisfied.** As written it has no stopping condition, and it did not prevent
   §3.2 or §3.3. Proposed: *"Verify by measurement. State what you measured, what
   the numbers were, and what you could not verify."* A measurement chosen after
   you already believe the answer is not a check — prefer one that could have
   contradicted you.

7. **Add an exit checklist** to sit opposite the Quick-Start one: token doc
   current to the last commit · contrast measured on every text/ground pair ·
   reduced-motion path complete · production build clean · responsive checked at
   375/768/1440 *including generated art* · asset weight measured · every
   placeholder either replaced or disclosed.

8. **Document the verification environment.** The hidden-pane behaviour in §3.5
   costs an hour every time it is rediscovered, and the offline-replication
   fallback is worth writing down as the standard answer.

---

## 6. Honest summary

The site is finished, internally consistent, and specific to itself — the art
layer in particular is not something a template produces, and the reasoning
behind it is recoverable from the code rather than lost with the session.

The two things I would change if this ran again: **resolve the content truth
before Phase 3 rather than disclosing it in the footer afterwards**, and
**measure inputs before adjusting outputs** — which alone would have removed
most of the rework in the last two days.

The single fact that most deserves to carry forward: every decision in this
project that was *derived* has held, and every decision that was *tuned* came
back.
