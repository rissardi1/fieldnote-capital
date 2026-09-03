import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Thesis from "@/components/Thesis";
import Portfolio from "@/components/Portfolio";
import Focus from "@/components/Focus";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main id="main">
        <div id="top" className="h-16 lg:h-[72px]" />
        <Hero />
        <Thesis />
        <Portfolio />
        <Focus />
        <Process />
        <FAQ />
        <CTA />
      </main>
      {/* Outside <main>: the footer is a contentinfo landmark in its own right,
          and nesting it inside main takes that away. */}
      <Footer />
    </>
  );
}
