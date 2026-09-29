import Image from "next/image";
import ExternalLink from "@/components/ui/ExternalLink";
import { site } from "../content";

/**
 * The MLH trust badge -- a sponsorship obligation, not a design element. MLH
 * supplies it as a fixed-position anchor in the top-right corner, and the
 * geometry here is theirs: `width: 10%` bounded to 60..100px, inset from the
 * right edge, `z-index: 10000` (it has to clear TopBar's z-50, and MLH pick a
 * number that clears anything).
 *
 * The artwork is a hanging banner, 392.79x688, so it is 1.75x as tall as it is
 * wide -- 175px down the page at full width. That is what runs it into the
 * apply button, and why TopBar positions its right-hand column off --mlh-safe
 * (theme.css) instead of Figma's fixed percentage. Changing the size or inset
 * here therefore moves the apply button too; both read the same tokens.
 *
 * Served from public/ rather than MLH's S3 bucket: it is a 21KB SVG, Next skips
 * optimisation for SVG sources anyway, and a self-hosted copy costs the page no
 * third-party request. Re-download it when the season rolls over -- the URL
 * carries the year (trust-badge/2027/mlh-trust-badge-2027-white.svg).
 *
 * `alt=""` with the name on the link is the pattern the footer logos use: the
 * link already announces itself, so a filled alt would say it twice.
 */
export default function MlhBadge() {
  return (
    <ExternalLink
      href={site.mlhUrl}
      label="Major League Hacking 2027 Hackathon Season"
      className="fixed right-[var(--mlh-badge-right)] top-0 z-[10000] w-[var(--mlh-badge-width)]"
    >
      <Image
        src="/editions/placeholder/logos/mlh-trust-badge-2027.svg"
        alt=""
        width={393}
        height={688}
        className="h-auto w-full"
        // Above the fold, so not lazy -- but `eager` rather than `priority`,
        // which would preload it in competition with the hero logo.
        loading="eager"
      />
    </ExternalLink>
  );
}
