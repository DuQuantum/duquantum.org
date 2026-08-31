import TopBar from "./sections/TopBar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Organizers from "./sections/Organizers";
import Faq from "./sections/Faq";
import Footer from "./sections/Footer";

/**
 * The placeholder's whole page. Which sections exist is this edition's own
 * decision -- a later edition composes a different list in its own folder, and
 * nothing it does reaches back into this one.
 */
export default function Page() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <About />
        <Organizers />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
