import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Craft } from "@/components/sections/Craft";
import { Problem } from "@/components/sections/Problem";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Cases } from "@/components/sections/Cases";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Objections } from "@/components/sections/Objections";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Narrative order — every chapter has a psychological job:
 *  1. Hero ........... impact: "these people are different"
 *  2. Craft .......... proof of quality before any claim
 *  3. Problem ........ make the cost of an outdated site felt
 *  4. BeforeAfter .... show the transformation, let them drive it
 *  5. Cases .......... stories with numbers
 *  6. Portfolio ...... hands-on exploration — the core
 *  7. Process ........ remove fear of the unknown
 *  8. Testimonials ... social proof
 *  9. Objections ..... answer the "yes, but…"
 * 10. FinalCTA ....... a memorable, low-friction ask
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Craft />
        <Problem />
        <BeforeAfter />
        <Cases />
        <Portfolio />
        <Process />
        <Testimonials />
        <Objections />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
