import Image from "next/image";
import ExternalLink from "@/components/ui/ExternalLink";
import type { Sponsor } from "../content";

/**
 * Figma components `sponsorLogo` (60:1013) and `sponsorLogoFlat` (65:1033) --
 * two plate sizes on the artboard, one component here.
 *
 * The plate is this edition's nested-ring idiom for the third time: a 4px
 * gradient outer, a purple 4px inset, then the field. It is the same
 * corner-to-corner teal -> blue sweep ApplyButton paints, and OrganizerCard
 * rings a headshot with it; 4px is the width of the wires in this section's own
 * circuit, so the plates and the artwork around them share a stroke.
 *
 * The outer ring is padding over a gradient rather than a border, because a
 * border cannot carry one. Nesting boxes this way also keeps the corners square,
 * which is what Figma draws.
 *
 * 269x110 for every plate, whatever shape the logo is. 269 is the width the
 * design already uses for every section rule, and three of them plus two 35px
 * gutters is 877 -- the content column exactly. `max-w-full` with the aspect
 * ratio (rather than a fixed height) means the plate shrinks intact below
 * ~317px instead of pushing the page wider.
 *
 * `object-contain`, never cover: these logos run from 1.3:1 to 4.8:1 against a
 * 2.4:1 field, so cover would crop the tall ones to a stripe. Contain letterboxes
 * instead, which is invisible because the field is painted the artwork's own
 * background colour -- white for almost all of them, `background` for the rest.
 *
 * The padding sits on the <img> itself. `fill` positions against the padding
 * box, so padding on the wrapper would not inset the image, but `object-fit`
 * resolves inside the image's own content box and does.
 *
 * `alt=""` is deliberate: the link already carries the sponsor's name, so a
 * filled alt would announce it twice. Same reasoning as OrganizerCard.
 */
export default function SponsorPlate({
  name,
  logo,
  url,
  background,
}: Sponsor) {
  return (
    <ExternalLink href={url} label={name} className="w-[269px] max-w-full">
      <span className="block aspect-[269/110] bg-gradient-to-br from-base-teal to-base-blue p-1">
        <span className="block size-full border-4 border-base-purple bg-base-white">
          <span className="relative block size-full" style={{ background }}>
            <Image
              src={logo}
              alt=""
              fill
              sizes="269px"
              className="object-contain p-[6px]"
            />
          </span>
        </span>
      </span>
    </ExternalLink>
  );
}
