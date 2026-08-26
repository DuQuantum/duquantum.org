import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import OrganizerCard from "@/components/ui/OrganizerCard";
import { organizers } from "@/content/organizers";

/**
 * Figma: OrganizersSection (14:382), 1440x900. Not to be confused with the
 * separate SponsorSection (60:898) that now sits above it on the artboard --
 * that one is deliberately not built yet.
 *
 * Heading block (14:563) y=107..186, with a second short rule (Rectangle 15,
 * 110 wide) squared off against the right edge of the column. Cards sit on a
 * 4-up grid: columns at x=281.33 / 523.33 / 765.33 / 1007.33 (242 pitch, 150
 * wide, 92 gutter) and rows at y=281 / 542.
 */
export default function Organizers() {
  return (
    <section
      id="organizers"
      className="bg-base-purple pb-[80px] pt-[107px] lg:pb-[125px]"
    >
      <Container>
        <div className="relative">
          <SectionLabel ruleWidth={269}>Organizers</SectionLabel>
          <div className="absolute right-0 top-0 h-1.5 w-[110px] bg-base-teal" />
        </div>

        <div className="mt-[60px] grid grid-cols-2 justify-items-center gap-x-8 gap-y-12 sm:grid-cols-3 lg:mt-[95px] lg:grid-cols-4 lg:gap-x-[92px] lg:gap-y-[28px]">
          {organizers.map((person) => (
            <OrganizerCard key={person.name} {...person} />
          ))}
        </div>
      </Container>
    </section>
  );
}
