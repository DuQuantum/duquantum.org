import Image from "next/image";
import ExternalLink from "@/components/ui/ExternalLink";

/**
 * Figma component `emptyHeadshot` (48:732), 150x254.
 *
 * The ring is two concentric strokes on one 150px circle rather than exported
 * art: Figma's `headshotBackgroundStroke2` sits at inset -5.33% (8px out, 166
 * outer) and `headshotBackgroundStroke1` at -2.67% (4px out, 158), so nesting
 * two 4px rings reproduces it exactly. Sampling the render puts pure teal at the
 * ring's top-left and base-blue at its bottom-right -- the same corner-to-corner
 * sweep the apply button uses.
 *
 * The ring overflows the 150 card box by 8px a side, so it is pulled out with
 * `-mx-2` to keep the card's own width at Figma's 150.
 *
 * Caption lines are 18px at Figma's auto leading (1.3 -> 23.4px boxes), giving
 * Figma's 164 / 188 / 210 baselines off the photo; the gap above them is tuned
 * by eye rather than taken from the artboard.
 *
 * With a `link`, the ring itself becomes the anchor -- same external-link and
 * focus treatment as ApplyButton. The `aria-label` is load-bearing rather than
 * polish: the <img> is deliberately alt="" because the name already sits in the
 * <figcaption>, so without a label the link would announce as blank. The design
 * specifies no hover state, so the opacity shift is ours -- the photo needs some
 * hint that it is clickable.
 */
const RING =
  "-mx-2 block size-[166px] rounded-full bg-gradient-to-br from-base-teal to-base-blue p-1";

export default function OrganizerCard({
  name,
  role,
  org,
  photo,
  link,
}: {
  name: string;
  role: string;
  org: string;
  photo: string;
  link?: string;
}) {
  const headshot = (
    <div className="size-full rounded-full bg-base-purple p-1">
      <Image
        src={photo}
        alt=""
        width={150}
        height={150}
        className="size-full rounded-full object-cover"
      />
    </div>
  );

  return (
    <figure className="w-[150px]">
      {link ? (
        <ExternalLink href={link} label={name} className={RING}>
          {headshot}
        </ExternalLink>
      ) : (
        <div className={RING}>{headshot}</div>
      )}

      <figcaption className="mt-[14px] text-center text-section-caption leading-[1.3]">
        <span className="block font-semibold">{name}</span>
        <span className="block">{role}</span>
        <span className="block italic text-base-teal">{org}</span>
      </figcaption>
    </figure>
  );
}
