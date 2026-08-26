import TopBar from "@/components/sections/TopBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Organizers from "@/components/sections/Organizers";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Home() {
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
