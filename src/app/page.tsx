import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Craft } from "@/components/sections/Craft";
import { Problem } from "@/components/sections/Problem";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { FoundingClients } from "@/components/sections/FoundingClients";
import { Objections } from "@/components/sections/Objections";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Narrative order — every chapter has a job, and none of them relies on invented proof:
 *  1. Hero ............. impact: "these people are different"
 *  2. Craft ............ proof of quality through live micro-demos
 *  3. Problem .......... make the cost of an outdated site felt (sourced research)
 *  4. BeforeAfter ...... show the transformation on a concept project
 *  5. Portfolio ........ hands-on concept projects — the core
 *  6. Process .......... remove fear of the unknown
 *  7. About ............ who is behind the studio
 *  8. FoundingClients .. honest "we're starting" offer + verifiable commitments
 *  9. Objections ....... answer the "yes, but…"
 * 10. FinalCTA ......... a memorable, low-friction ask
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
        <Portfolio />
        <Process />
        <About />
        <FoundingClients />
        <Objections />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
