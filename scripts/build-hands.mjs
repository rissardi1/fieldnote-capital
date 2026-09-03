import sharp from "sharp";

/* ---------------------------------------------------------------------------
   Cuts the two hand plates used by §8 CTA (components/DitherTouch.tsx).

     node scripts/build-hands.mjs

   Input  art-src/hands-master.png    2000×1125 RGBA, transparent ground
   Output public/art/hands-left.png   1000×500
          public/art/hands-right.png  1000×500

   Put TWICE the ratio it prints into the CTA band's `aspect-[…]`. Each arm is
   half the band, so the band matches both plates at every viewport width only
   when band ratio = 2 × plate ratio.

   ---------------------------------------------------------------------------
   WHY A SCRIPT AND NOT CSS

   1. THE SPLIT IS EXACT, SO THE FINGERS MEET.
      x=1000 is the master's exact centre AND lands inside the widest ink-free
      corridor (964..1008 — the gap between the fingertips), so an even split
      yields two plates of identical size. That matters more than it sounds:
      the previous pair was 525×274 and 526×274, near-identical but not equal,
      and two ratios inside two equal boxes are two `contain` scales. The
      fingertips carried the difference and broke at the join.

   2. ONE SHARED VERTICAL WINDOW, SO THEY SIT ON THE SAME LINE.
      Cropped to its own ink each arm lands differently — the left runs to row
      830, the right stops at 791. Centring them afterwards pulls the hands
      38px apart. Both halves are cut through the union window instead.

   3. THE TONE RANGE IS REMAPPED, NOT TRUSTED.
      DitherTouch keys out everything lighter than its `bgCut` (0.88). The
      artwork's own highlights reach 0.9, which would punch holes through the
      middle of a forearm. Every opaque pixel is compressed into [INK_MIN,
      INK_MAX] first, so the palest part of the drawing still sits clear of the
      key and the ground is the only thing above it. Alpha then composites that
      onto white, so antialiased edges fade into the ground and the sampler
      turns them into thinning squares rather than a cut-out.

   4. THE OUTER EDGE IS NOT TOUCHED.
      Both forearms run off the master's frame, and they are meant to: the CTA
      band is full bleed and the composition is two arms entering from outside
      the viewport. Fading the plate toward its edge and eroding it square by
      square were both tried and both were worse — DitherTouch's header records
      why. Cut it honestly and leave the edge alone.
   ------------------------------------------------------------------------ */

const SRC = "art-src/hands-master.png";
const SPLIT = 1000; // exact centre of the master, inside the clean corridor
const INK_MIN = 0.06; // darkest the remapped drawing may go
const INK_MAX = 0.8; // palest — must stay clear of DitherTouch's 0.88 key
const GROUND = 255;

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
if (C !== 4) throw new Error("master must carry an alpha channel");
console.log(`master ${W}×${H}`);
if (W !== SPLIT * 2) throw new Error(`SPLIT ${SPLIT} is not half of ${W}`);

/* 1 — flatten to a single grey plane: the drawing remapped into a band that
       cannot collide with the key, composited onto white by its own alpha. */
const lumAt = (i) => (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
let lo = 1;
let hi = 0;
for (let p = 0; p < W * H; p++) {
  if (data[p * 4 + 3] < 8) continue;
  const l = lumAt(p * 4);
  if (l < lo) lo = l;
  if (l > hi) hi = l;
}
const artSpan = Math.max(1e-6, hi - lo);
console.log(`artwork luminance ${lo.toFixed(3)}..${hi.toFixed(3)} → ${INK_MIN}..${INK_MAX}`);

const grey = new Float32Array(W * H); // 0..255, ground = 255
for (let p = 0; p < W * H; p++) {
  const a = data[p * 4 + 3] / 255;
  if (a <= 0) {
    grey[p] = GROUND;
    continue;
  }
  const t = (lumAt(p * 4) - lo) / artSpan;
  const ink = (INK_MIN + t * (INK_MAX - INK_MIN)) * 255;
  grey[p] = GROUND + a * (ink - GROUND); // composite over white
}

/* 2 — the shared vertical window, measured rather than declared */
const INK = 0.97 * 255;
let top = H;
let bot = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (grey[y * W + x] > INK) continue;
    if (y < top) top = y;
    if (y > bot) bot = y;
    break;
  }
}
const CH = bot - top + 1;
console.log(`window rows ${top}..${bot} → ${SPLIT}×${CH} per half`);

/* 3 — split */
async function half(name, x0) {
  const buf = Buffer.alloc(SPLIT * CH * 3);
  for (let y = 0; y < CH; y++) {
    for (let x = 0; x < SPLIT; x++) {
      const v = Math.round(grey[(y + top) * W + (x + x0)]);
      const di = (y * SPLIT + x) * 3;
      buf[di] = buf[di + 1] = buf[di + 2] = v;
    }
  }
  await sharp(buf, { raw: { width: SPLIT, height: CH, channels: 3 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile(`public/art/${name}`);
  console.log(`wrote public/art/${name}`);
}
await half("hands-left.png", 0);
await half("hands-right.png", SPLIT);

console.log(`\nplate ${(SPLIT / CH).toFixed(4)}:1 → CTA band aspect-[${((2 * SPLIT) / CH).toFixed(4)}/1]`);
