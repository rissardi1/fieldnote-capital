"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* ---------------------------------------------------------------------------
   Lenis smooth scroll.
   Scroll-driven sections read as stepping without it; the eased scroll is what
   makes the folder read head feel continuous rather than snapped.

   Guardrails, because smooth scroll is easy to get wrong:
   · Skipped entirely under prefers-reduced-motion — Lenis never initialises,
     so native scrolling (and native anchor jumps) are untouched.
   · CSS `scroll-behavior: smooth` is disabled while Lenis runs; the two fight
     and produce a stutter on anchor jumps.
   · Destroyed on unmount so no listener survives a route change.
   ------------------------------------------------------------------------ */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      root.style.scrollBehavior = previousBehavior;
    };
  }, []);

  return null;
}
