import Hero from "./sections/Hero";
import About from "./sections/About";
import Schedule from "./sections/Schedule";
import Sponsors from "./sections/Sponsors";
import Speakers from "./sections/Speakers";
import Organizers from "./sections/Organizers";
import Faq from "./sections/Faq";
import Footer from "./sections/Footer";
import MlhBadge from "./ui/MlhBadge";
import { Grain } from "./ui/Crt";

/**
 * The 2026 page, in the mockup's order (Figma 181:182).
 *
 * `.artboard` is the scaling root -- see theme.css. The gaps between sections
 * are free (only each section's inside is fixed), so they are plain margins
 * in artboard units on each section.
 */
export default function Page() {
  return (
    <>
      <MlhBadge />
      <div className="artboard overflow-x-clip">
        <main>
          <Hero />
          <About />
          <Schedule />
          <Sponsors />
          <Speakers />
          <Organizers />
          <Faq />
        </main>
        <Footer />
      </div>
      <Grain />
    </>
  );
}
