import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import SpeakerCard from "../ui/SpeakerCard";
import SpeakerCarousel from "../ui/SpeakerCarousel";
import { speakers } from "../content";

/**
 * Figma: SpeakersSection (118:294), 1440x900.
 *
 * SpeakersText (118:295) mirrors the Organizers header: there the long 269 rule
 * sits left with a short 110 squared off against the right edge, here they swap
 * sides and the heading is right-aligned. The gap under the rule is 31 rather
 * than the component's default 21 (rule at y=107, text at y=144).
 *
 * The four speakers are slides rather than a column: the `speakerScroll` symbol
 * (120:458) that came with this section is a carousel control, so only one
 * speaker is on screen at a time. ui/SpeakerCarousel.tsx owns that; the cards
 * themselves stay server-rendered and are handed to it as children, so the bios
 * ship in the HTML.
 *
 * Adding a speaker is one entry in content.ts -- the slide and its dot both
 * come from the array's length.
 */
export default function Speakers() {
  return (
    <section
      id="speakers"
      className="bg-base-purple pb-[80px] pt-[107px] lg:pb-[120px]"
    >
      <Container>
        <div className="relative">
          <SectionLabel ruleWidth={269} gap={31} align="right">
            Speakers
          </SectionLabel>
          <div className="absolute left-0 top-0 h-1.5 w-[110px] bg-base-teal" />
        </div>

        <div className="mt-[40px] lg:mt-[20px]">
          <SpeakerCarousel labels={speakers.map((speaker) => speaker.name)}>
            {speakers.map((speaker) => (
              <SpeakerCard key={speaker.name} {...speaker} />
            ))}
          </SpeakerCarousel>
        </div>
      </Container>
    </section>
  );
}
