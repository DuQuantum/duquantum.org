import Image from "next/image";
import ExternalLink from "@/components/ui/ExternalLink";
import { site } from "../content";

/**
 * The MLH trust badge -- a sponsorship obligation, not a design element. MLH
 * supplies it as a fixed-position anchor hanging from the top edge, and the
 * geometry is theirs: `width: 10%` bounded to 60..100px, a 50px inset, and a
 * z-index that clears everything (here including the page grain).
 *
 * MLH allow either top corner. This edition hangs it top-left: the hero's
 * top-right corner is where the three knobs sit, and a 175px banner there
 * would cover the last one.
 *
 * `alt=""` with the name on the link: the link already announces itself, so a
 * filled alt would say it twice.
 */
export default function MlhBadge() {
  return (
    <ExternalLink
      href={site.mlhUrl}
      label="Major League Hacking 2027 Hackathon Season"
      className="fixed left-[var(--mlh-badge-inset)] top-0 z-[10000] w-[var(--mlh-badge-width)]"
    >
      <Image
        src="/editions/2026/logos/mlh-trust-badge-2027.svg"
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
