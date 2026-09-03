/* ---------------------------------------------------------------------------
   DITHER PLATE MANIFEST

   These are NOT design tokens — they are measured facts about the supplied
   asset files. Each plate is a true 1-bit duotone; `paper` is the plate's own
   ground colour, sampled from the PNG. A media frame paints `paper` behind the
   plate so the dither meets the frame with no seam, and so the frame reads
   correctly for the split second before the image decodes.

   Design tokens live in app/globals.css (`--color-art-*`). This file is asset
   metadata. Re-sample whenever a plate is replaced.

   ⚠ The supplied set is not colour-consistent: three different inks
   (#4B0F04 / #280A04 / #380D04 / #A6503C) across two papers. The trio used in
   the Thesis grid is chosen to share one paper. Standardising all plates on a
   single ink + paper pair would make the system fully coherent.
   ------------------------------------------------------------------------ */

/* NOTE — the 2026-09-02 set is NOT 1-bit. Measured: 26 distinct colour
   buckets per image against the older set's two, i.e. continuous-tone
   monochrome rather than a duotone dither. For those, `paper` is the MEAN
   colour of the plate, which is what a pre-decode placeholder wants; there is
   no flat ground to sample. `tone` is mean luminance 0-255, so a caller can
   pick a light or dark treatment without opening the file. */
export type Plate = {
  src: string;
  /** Sampled ground colour of the plate itself. */
  paper: string;
  /** Sampled ink colour, for reference. */
  ink: string;
  /** Mean luminance 0-255. Under ~90 the plate is dark enough to carry
   *  reversed type; over ~140 it needs ink. */
  tone: number;
  width: number;
  height: number;
  alt: string;
};

/* ---------------------------------------------------------------------------
   2026-09-01 set — the consistent one. All three share exactly one duotone,
   #460707 on #FFFFFF, which is what the first batch lacked (three inks across
   two papers). Paper is pure white, i.e. --color-surface, so these sit on a
   surface-coloured frame with no seam.
   Titles are NOT asserted: the source filenames did not match what the crops
   actually show, so alt text describes the image instead of naming a painting.
   ------------------------------------------------------------------------ */
export const PLATES = {
  garlands: {
    src: "/art/garlands-dither.png",
    paper: "#FFFFFF",
    ink: "#460707",
    tone: 121,
    width: 835,
    height: 624,
    alt: "Detail of a Renaissance painting — figures wearing floral garlands — rendered as a one-bit dither plate.",
  },
  assembly: {
    src: "/art/assembly-dither.png",
    paper: "#FFFFFF",
    ink: "#460707",
    tone: 115,
    width: 640,
    height: 435,
    alt: "Detail of a Renaissance painting — a crowded assembly beneath colonnades — rendered as a one-bit dither plate.",
  },
  tondo: {
    src: "/art/tondo-dither.png",
    paper: "#FFFFFF",
    ink: "#460707",
    tone: 108,
    width: 600,
    height: 512,
    alt: "Detail of a Renaissance tondo within a circular wreath, rendered as a one-bit dither plate.",
  },

  creation: {
    src: "/art/hero-dither.png",
    paper: "#EDDADA",
    ink: "#4B0F04",
    tone: 143,
    width: 1600,
    height: 700,
    alt: "Michelangelo's Creation of Adam, rendered as a one-bit dither plate.",
  },
  calumny: {
    src: "/art/calumny-dither.png",
    paper: "#FDC6C6",
    ink: "#280A04",
    tone: 121,
    width: 1600,
    height: 1083,
    alt: "Botticelli's Calumny of Apelles, rendered as a one-bit dither plate.",
  },
  /* Key was previously `nastagio` and pointed at this file — wrong painting.
     Renamed to match what the file actually is. */
  panel: {
    src: "/art/image57-dither.png",
    paper: "#FDC6C6",
    ink: "#380D04",
    tone: 86,
    width: 1200,
    height: 675,
    alt: "A Renaissance panel detail, rendered as a one-bit dither plate.",
  },
  nastagio: {
    src: "/art/nastagio-dither.png",
    paper: "#EDDADA",
    ink: "#4B0F04",
    tone: 87,
    width: 1000,
    height: 631,
    alt: "Botticelli's Nastagio degli Onesti, rendered as a one-bit dither plate.",
  },
  venus: {
    src: "/art/venus-dither.png",
    paper: "#FDC6C6",
    ink: "#A6503C",
    tone: 139,
    width: 1280,
    height: 799,
    alt: "Botticelli's Birth of Venus, rendered as a one-bit dither plate.",
  },

  /* -------------------------------------------------------------------------
     2026-09-02 set — supplied for §6 Process. Continuous-tone monochrome, not
     1-bit: 26 distinct colour buckets each, so `paper` here is the plate's MEAN
     colour and exists only as a pre-decode placeholder.

     Delivered as 4000px PNGs totalling 15.6 MB. Re-encoded to 1400px WebP —
     2.3 MB for the four — because they render at ~400px and the dither grain
     that resisted compression at full size is invisible at display scale. PNG
     was actively the wrong container for continuous tone: re-saving two of them
     at smaller pixel dimensions still produced BIGGER files than the originals.

     Ordered here by tone, which is how §6 assigns them across its four steps —
     river 166 → pastoral 99 → banquet 81 → symposium 68. A smooth ramp rather
     than an alternation, so switching tabs does not flash light/dark.

     Titles are NOT asserted: these arrived as museum-archive filenames with no
     attribution I can verify, so alt text describes what the crop shows.
     ---------------------------------------------------------------------- */
  river: {
    src: "/art/river.webp",
    paper: "#BFA1A1",
    ink: "#7A4A4A",
    tone: 166,
    width: 1400,
    height: 1065,
    alt: "A wide river landscape in oxblood monochrome — a great oak on the near bank, a boat of figures under a parasol, a turreted house on a distant hill.",
  },
  pastoral: {
    src: "/art/pastoral.webp",
    paper: "#8D5757",
    ink: "#580808",
    tone: 99,
    width: 1400,
    height: 1130,
    alt: "A flock of sheep driven along a lane past a thatched cottage, tall trees overhead and a church spire beyond, in oxblood monochrome.",
  },
  banquet: {
    src: "/art/banquet.webp",
    paper: "#8F3B3B",
    ink: "#700000",
    tone: 81,
    width: 1400,
    height: 1055,
    alt: "A laden banquet table in deep oxblood monochrome — fruit, silver and shellfish, a parrot on a perch, a small dog, a violin and sheet music in the foreground.",
  },
  symposium: {
    src: "/art/symposium.webp",
    paper: "#743232",
    ink: "#500000",
    tone: 68,
    width: 1400,
    height: 1096,
    alt: "A classical interior in deep oxblood monochrome — figures reclining and seated around a low table beneath heavy drapery and columns.",
  },
} satisfies Record<string, Plate>;

/* ---------------------------------------------------------------------------
   hands-left.png / hands-right.png — NOT in PLATES on purpose.

   §8 CTA renders them through a canvas (components/DitherTouch.tsx), not
   through next/image, so they have no `paper`, `ink` or `tone` to declare: the
   sampler derives all three at runtime and keys the ground out itself.

   They are also not hand-edited files. They are BUILD OUTPUT — cut from
   art-src/hands-master.png by `node scripts/build-hands.mjs`, which owns the
   split point, the shared vertical window, the tone remap and the edge
   dissolve, and prints the aspect ratio the CTA band must carry. Editing them
   in place will be silently undone the next time that script runs.
   ------------------------------------------------------------------------ */
