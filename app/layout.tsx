import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* Geist MUST load as a variable font — the type system depends on weights
   450 and 550, which are not standard static cuts. See docs/TOKENS.md §3. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fieldnote Capital — First cheques for first-time founders",
  description:
    "Pre-seed and seed. $250k to $2M. We write the first cheque and stay close for the decade that follows.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Entrance animations ship their resting state as inline `opacity:0`,
            so with scripting off the page renders blank — every heading, the
            nav included. The content is in the DOM (crawlers are fine); it is
            purely visually hidden. This forces the final state when JS never
            runs. Targets the inline style motion writes, so it needs no
            cooperation from the components. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>[style*="opacity:0"]{opacity:1!important;transform:none!important}</style>`,
          }}
        />
      </head>
      <body>
        {/* `.not-sr-only` is present in the built stylesheet and carries higher
            specificity than `.sr-only` through its `:focus`, so this is correct
            as written.
            Recorded because it cost a detour: this link cannot be verified from
            an automated harness. `el.focus()` sets `document.activeElement` but
            the element still fails `matches(':focus')` while the browser window
            itself is unfocused — which it always is when a script drives it. The
            link therefore measures as 1×1px and clipped no matter what, and that
            reading is an artefact, not a defect. Check it by hand with Tab. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-small focus:text-on-dark"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
