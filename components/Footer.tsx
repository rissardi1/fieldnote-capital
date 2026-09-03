import Link from "next/link";
import { Logomark } from "@/components/Logo";

/* ---------------------------------------------------------------------------
   SECTION 9 — FOOTER
   Layout reference: shadcnblocks footer51 — brand block with tagline on the
   left, link columns on the right, a rule, then a bottom bar carrying the
   copyright with a diagonal stripe pattern behind it, the whole thing bounded
   by vertical rules at the container edges.

   DARK, per the locked §9 section map. The reference is light, but the map has
   always had exactly one dark moment at the end of the page and the CTA (§8)
   will sit directly above this on the same band. Everything above is light, so
   this is the close.

   That is the one thing to sanity-check: it is a colour decision from the
   contract rather than from the reference.

   WHAT WAS DROPPED FROM THE REFERENCE, AND WHY
   footer51 carries a row of five social icons and a Legal column (Terms,
   Privacy). Every one of those would be a link to nothing — the same defect
   that "Notes → #insights" was, which sat dead in the nav until the FAQ landed.
   A footer whose job is navigation should not be the place the page starts
   lying about where it goes. Every href below resolves: five in-page anchors
   and one mailto. Terms and Privacy come back the day those routes exist.

   Tokens: docs/TOKENS.md §2 colour (dark band pair) · §3 type · §4 spacing
   ------------------------------------------------------------------------ */

const SECTIONS = [
  { label: "About", href: "#thesis" },
  { label: "Track record", href: "#portfolio" },
  { label: "What we look for", href: "#focus" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const CONTACT = [
  { label: "Send a note", href: "#cta" },
  { label: "hello@fieldnote.capital", href: "mailto:hello@fieldnote.capital" },
];

const TAGLINE = "First cheques for technical founders, and a decade of staying close after.";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-accent text-on-dark">
      <div className="container-page">
        {/* Vertical rules at the column edges, as the reference has them. They
            land on the same x as the Hero and Process rules, so the ruled sheet
            carries all the way to the bottom of the page. */}
        {/* border-t separates this from the CTA directly above it; the verticals
            carry straight through from that band into this one, so the two read
            as one closing block rather than two stacked panels. */}
        <div className="relative border-x border-t border-line-on-dark">
          <div className="grid gap-12 px-6 py-14 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-20">
            {/* ---- Brand ---- */}
            <div className="lg:col-span-5">
              <Link
                href="#top"
                aria-label="Fieldnote Capital — back to top"
                className="inline-flex items-center gap-2.5 rounded-xs text-on-dark"
              >
                <Logomark className="h-6 w-6 shrink-0" />
                <span className="text-h4">Fieldnote</span>
              </Link>
              <p className="mt-5 max-w-[38ch] text-body text-on-dark-muted text-pretty">
                {TAGLINE}
              </p>
            </div>

            {/* ---- Link columns ---- */}
            <div className="grid grid-cols-2 gap-8 lg:col-span-6 lg:col-start-7">
              <FooterColumn title="Sections" links={SECTIONS} />
              <FooterColumn title="Get in touch" links={CONTACT} />
            </div>
          </div>

          {/* ---- Bottom bar ----
              Plain. The reference fills this with a 45° hatch; it was built and
              removed. The rule above it already separates the meta line from the
              navigation, so the pattern was carrying texture and nothing else. */}
          <div className="border-t border-line-on-dark px-6 py-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-caption font-mono text-on-dark-muted">
                © {year} Fieldnote Capital. All rights reserved.
              </p>
              <p className="text-caption font-mono text-on-dark-muted">
                Placeholder identity · not a real fund
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-eyebrow uppercase font-mono text-on-dark-muted">{title}</h2>
      {/* gap-1 plus py-1.5 on the link rather than gap-3 on the list: the
          optical rhythm is the same, but the target grows from 21px to 33px.
          At 21px these cleared WCAG 2.5.8 only through the spacing exception,
          which is a technicality to lean on for a list people actually tap. */}
      <ul className="mt-5 flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-block py-1.5 text-body text-on-dark-muted transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-on-dark"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
