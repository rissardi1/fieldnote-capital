"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* ---------------------------------------------------------------------------
   Lenis smooth scroll, plus the in-page anchor navigation.

   Wheel scrolling and anchor jumps are two separate problems and Lenis only
   solves the first. It takes over the wheel, and to do that it sets
   `scroll-behavior: auto !important` on the document — which also kills the
   native smooth scroll that `html { scroll-behavior: smooth }` would have given
   a `<a href="#faq">`. The result was a hard cut on every button on the page:
   eighteen anchors across the nav, the hero, the footer and two CTAs.

   So every same-page anchor is routed through `lenis.scrollTo` here. One
   delegated listener rather than a handler per link, because the links are
   spread over six components and any new one should behave the same without
   being wired up.

   Three things the handler has to get right beyond the easing:

   · THE STICKY HEADER. Scrolling a section to y=0 parks its first 73px behind
     the header. Measured, not assumed — `#faq` landed at exactly 0 with 73px
     covered. The offset is read from the header's live height, so it follows
     the 64 → 72px breakpoint without a second constant to keep in sync.
     `section[id] { scroll-margin-top }` in globals.css covers the paths that do
     NOT come through here: a shared link opened at /#faq, and reduced motion.

   · FOCUS. A native anchor jump moves the focus starting point; a scripted
     scroll does not, so a keyboard user lands visually at the FAQ and tabs from
     the top of the document. That also makes the skip link a decoration rather
     than a skip link. Focus moves on completion, with `preventScroll` so it
     cannot fight the animation it is following.

   · THE ORDINARY BROWSER CONTRACT. Modified clicks (⌘, ctrl, shift, alt,
     middle) still open a new tab, `target` is respected, and the hash is pushed
     so the URL and the back button behave as they did before.

   Guardrails:
   · Under prefers-reduced-motion Lenis never initialises AND this handler is
     never installed, so anchors fall back to the native jump.
   · Destroyed on unmount so no listener survives a route change.
   ------------------------------------------------------------------------ */

/** Distance the header covers, plus a little air so the heading is not welded
    to the chrome. Read live — the header is 64px under `lg` and 72px over it. */
function anchorOffset() {
  const header = document.querySelector("header");
  return (header?.getBoundingClientRect().height ?? 0) + 12;
}

/** Long trips should not blur past and short hops should not feel sluggish, so
    the duration tracks distance — but clamped, because an unclamped ratio makes
    a full-page scroll take four seconds. */
function travelDuration(distance: number) {
  return Math.min(1.5, Math.max(0.75, Math.abs(distance) / 2600));
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

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

    /* Section elements are not focusable, so they get a temporary tabindex that
       is removed on blur. Left in place it would be harmless for tab order but
       would litter the markup with state that outlives its reason. */
    const focusTarget = (el: HTMLElement) => {
      if (!el.hasAttribute("tabindex")) {
        el.setAttribute("tabindex", "-1");
        el.addEventListener("blur", () => el.removeAttribute("tabindex"), { once: true });
      }
      el.focus({ preventScroll: true });
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      /* A hidden document gets no animation frames, so Lenis cannot move and an
         intercepted click would navigate nowhere at all — strictly worse than
         the hard jump this replaces. Observed, not theorised: clicking the nav
         with the preview pane hidden left scrollY at 0 with the hash set and
         `onComplete` never firing. Hand it back to the browser; nobody needs an
         eased scroll in a tab they cannot see. */
      if (document.hidden) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#" || !href.startsWith("#")) return;

      const id = decodeURIComponent(href.slice(1));
      const target = document.getElementById(id);
      if (!target) return; // a broken anchor stays broken visibly, not silently

      event.preventDefault();

      /* #top and #main both sit at the very start of the document, so the
         header offset would ask for a negative position. Lenis clamps it to 0,
         which is exactly right for "back to top". */
      const distance = target.getBoundingClientRect().top - anchorOffset();

      lenis.scrollTo(target, {
        offset: -anchorOffset(),
        duration: travelDuration(distance),
        easing: easeInOutCubic,
        onComplete: () => focusTarget(target),
      });

      if (`#${id}` !== window.location.hash) {
        window.history.pushState(null, "", `#${id}`);
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      root.style.scrollBehavior = previousBehavior;
    };
  }, []);

  return null;
}
