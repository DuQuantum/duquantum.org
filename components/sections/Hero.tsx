import Image from "next/image";
import Container from "@/components/ui/Container";
import { site } from "@/content/site";

/**
 * Figma: HeroSection (2:100), 1440x900. The logo is exported as one SVG rather
 * than rebuilt from its 37 vector layers; it now carries "2026" inside the
 * artwork, so nothing here draws the year.
 *
 * Vertical run down the artboard, all from Figma and reproduced as flow margins:
 * logo y=194 (877x280.68), rule y=542, "QUANTUM..." box y=556, second rule
 * y=621, the date box y=640, and "@Duke" spanning y=608..706.
 *
 * `leading-[1.3]` is Figma's auto line height for IBM Plex Sans: it reproduces
 * every text box exactly (40 -> 52, 75 -> 98) while staying proportional to the
 * size tokens, which a hardcoded px line height would not.
 *
 * Carries `#hero-midpoint`, which TopBar observes to decide when to retract.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-base-purple pb-[95px] pt-[194px] lg:pb-[208px]"
    >
      {/*
       * Trigger line for TopBar's retraction. `top-1/2` is 50% of this section's
       * own height, so it tracks the hero however tall it renders and needs no
       * measurement in JS. 1px rather than 0 -- zero-area IntersectionObserver
       * targets are a grey area across engines.
       */}
      <div
        id="hero-midpoint"
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px"
      />

      <Container>
        <Image
          src="/logos/circuit-logo.svg"
          alt={`${site.name} 2026`}
          width={877}
          height={281}
          className="h-auto w-full"
          priority
        />

        {/* dateTime (9:353) */}
        <div className="mt-[67px]">
          <div className="h-1.5 w-full bg-base-teal" />
          <p className="mt-2 text-section-header font-semibold uppercase leading-[1.3] tracking-[1.2px]">
            Quantum Computing Hackathon
          </p>

          <div className="relative mt-[13px]">
            {/* 589 of the 877 column */}
            <div className="h-1.5 w-[67.16%] bg-base-teal" />
            {/* x=355.33, i.e. 74 into the column */}
            <p className="ml-[8.44%] mt-[13px] text-section-header font-bold italic leading-[1.3]">
              {site.dateLabel}
            </p>
            {/* box y=608, 13 above this wrapper; its glyphs end on the column edge */}
            <p className="absolute -top-[13px] right-0 text-display font-semibold leading-[1.3]">
              @Duke
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
