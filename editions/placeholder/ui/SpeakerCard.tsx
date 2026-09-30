import Image from "next/image";
import RichText from "./RichText";
import type { Speaker } from "../content";

/**
 * Figma component `speakerHeadshot` (119:392), 877x566 -- one slide of the
 * speakers carousel.
 *
 * Two columns across the content column: a 274 left column holding the ringed
 * headshot, the name and the short blurb, a 59 gutter, then a 544 right column
 * with the session label and the bio. 274 + 59 + 544 = 877 exactly.
 *
 * The ring is OrganizerCard's, scaled: there a 150 photo carries 4px rings at
 * 158 and 166; here a 242 photo carries 6px rings at 254 and 266, over the same
 * corner-to-corner teal -> blue sweep the apply button uses. Two nested rounded
 * boxes reproduce Figma's two concentric strokes.
 *
 * Vertical offsets are Figma's: 21px from the ring's bottom to the name, 13px
 * from the name to the blurb, and the right column starting 46px below the
 * ring's top. The artboard's 566 height is slack -- content ends around 520 --
 * so nothing here reproduces it; the card is as tall as its own content.
 *
 * Below lg the columns stack and the right column goes left-aligned: the design
 * right-aligns the bio against the 544 column, which reads badly once the text
 * is the full width of a phone.
 */
export default function SpeakerCard({
  name,
  photo,
  blurb,
  session,
  bio,
}: Speaker) {
  return (
    <article className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-x-[59px]">
      {/* w-full below lg so the column cannot out-measure the gutter on a
          narrow phone; the 274 is a cap there and a fixed width from lg up. */}
      <div className="w-full max-w-[274px] shrink-0 text-center lg:w-[274px]">
        <div className="mx-auto block size-[266px] rounded-full bg-gradient-to-br from-base-teal to-base-blue p-1.5">
          <div className="size-full rounded-full bg-base-purple p-1.5">
            <Image
              src={photo}
              alt=""
              width={242}
              height={242}
              sizes="242px"
              className="size-full rounded-full object-cover"
            />
          </div>
        </div>

        <h3 className="mt-[21px] text-section-body font-semibold leading-[1.3]">
          {name}
        </h3>
        <p className="mt-[13px] text-section-caption leading-[1.3]">{blurb}</p>
      </div>

      <div className="mt-10 w-full text-left lg:mt-0 lg:pt-[46px] lg:text-right">
        <p className="text-section-body font-bold leading-[1.3]">{session}</p>
        <p className="mt-[22px] text-section-caption leading-[1.3]">
          <RichText segments={bio} />
        </p>
      </div>
    </article>
  );
}
