import Image from "next/image";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import SponsorPlate from "../ui/SponsorPlate";
import { sponsors } from "../content";

/**
 * Figma: SponsorSection (60:898), 1440x900.
 *
 * SponsorText (60:899) is final and reproduced exactly: a 269 rule centred on
 * the column (it sits at x=587, i.e. (877-269)/2 into the 877), the heading
 * centred under it, and circuitSponsors (60:964) -- one 878x79 SVG carrying
 * both arms with a gap in the middle for the label. Figma renders that frame
 * flipped, hence `-scale-y-100`; the export is the unflipped artwork.
 *
 * The plates are NOT Figma's arrangement. The artboard has them dropped by hand
 * in a loose diagonal (x=282/362/604/684/845/926/1006, six different y values)
 * at two plate sizes, which is a sketch of "some logos go here" rather than a
 * layout. They are laid out on an even 3-up grid instead: 269 plates on 35
 * gutters, which is 877 exactly.
 *
 * `flex flex-wrap` rather than `grid`, for the last row. Eleven plates leave a
 * row of two, and flex centres that remainder under the rows above it; a grid
 * would pin both to the left and leave a hole. Wrapping also does the
 * responsive work by itself -- 3-up at the full column, 2-up in the middle,
 * 1-up on phones -- with no breakpoints to keep in sync.
 *
 * Offsets are Figma's own px: header at y=107.8, first plate row at y=281.4,
 * last row ending at y=812 of the 900 artboard.
 */
export default function Sponsors() {
  return (
    <section
      id="sponsors"
      className="bg-base-purple pb-[80px] pt-[80px] lg:pb-[88px] lg:pt-[107px]"
    >
      <Container>
        <div className="relative">
          {/* circuitSponsors (60:964) -- decorative, and dropped on narrow
              screens where it would run into the heading */}
          <Image
            src="/editions/placeholder/logos/sponsors-circuit.svg"
            alt=""
            width={878}
            height={79}
            className="absolute left-1/2 top-0 hidden w-full -translate-x-1/2 -scale-y-100 lg:block"
            aria-hidden
          />

          <SectionLabel ruleWidth={269} gap={22} align="center" className="relative">
            Sponsors
          </SectionLabel>
        </div>

        <div className="mt-[60px] flex flex-wrap justify-center gap-[35px] lg:mt-[94px]">
          {sponsors.map((sponsor) => (
            <SponsorPlate key={sponsor.name} {...sponsor} />
          ))}
        </div>
      </Container>
    </section>
  );
}
