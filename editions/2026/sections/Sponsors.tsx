import Image from "next/image";
import { cn } from "@/lib/cn";
import Art from "../ui/Art";
import { Crt } from "../ui/Crt";
import { stage, u } from "../ui/stage";
import { sponsors, type Sponsor } from "../content";

/**
 * Figma: sponsor section (243:361) -- the gridded panel between two red
 * brackets, with the title. The logos are not in the mockup: they run as two
 * marquee rows in opposite directions, the first half of `sponsors` on top and
 * the second half below.
 *
 * Each row's list is rendered twice and the track slides by exactly half its
 * width (theme.css `marquee`), so the loop has no seam. The second copy is
 * presentational only -- hidden from assistive tech and out of the tab order
 * -- so each sponsor is announced and focusable once. Hover or focus pauses a
 * row, which is also what lets a keyboard user land on a moving logo.
 */
const S = stage([113, 4130, 1525, 800]);
const FRAME = [131, 4155, 1496.5, 757] as const;

function Plate({ sponsor, hidden }: { sponsor: Sponsor; hidden?: boolean }) {
  return (
    // The right margin rides along with every plate, the last one included,
    // so a copy's width is a whole number of plate pitches.
    <li
      className="mr-[20px] shrink-0 md:mr-[calc(44*var(--u))]"
      aria-hidden={hidden || undefined}
    >
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={hidden ? -1 : undefined}
        aria-label={hidden ? undefined : `${sponsor.name} (opens in a new tab)`}
        className={cn(
          "group relative flex h-[96px] w-[176px] items-center justify-center md:h-[calc(170*var(--u))] md:w-[calc(310*var(--u))]",
          // a plate set into the panel: red bezel, white face (the logos are
          // drawn for white, and several carry their own white field)
          "border-[length:max(4px,calc(8*var(--u)))] border-dq-red bg-white p-[max(10px,calc(22*var(--u)))]",
          "shadow-[inset_0_0_0_2px_rgb(var(--dq-panel)/0.35)] transition-colors hover:border-dq-yellow",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-dq-yellow",
        )}
        style={sponsor.background ? { background: sponsor.background } : undefined}
      >
        <Image
          src={sponsor.logo}
          alt=""
          width={720}
          height={360}
          sizes="(min-width: 768px) 18vw, 176px"
          className="h-full w-full object-contain"
        />
      </a>
    </li>
  );
}

function Row({
  list,
  reverse,
  period,
}: {
  list: readonly Sponsor[];
  reverse?: boolean;
  period: number;
}) {
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
      <ul
        className="marquee-track flex w-max"
        style={{
          ["--marquee-period" as string]: `${period}s`,
          ["--marquee-dir" as string]: reverse ? "reverse" : "normal",
        }}
      >
        {/* Two copies, so -50% is exactly one whole copy. */}
        {[false, true].map((hidden) =>
          list.map((sponsor) => (
            <Plate
              key={`${hidden}-${sponsor.name}`}
              sponsor={sponsor}
              hidden={hidden}
            />
          )),
        )}
      </ul>
    </div>
  );
}

export default function Sponsors() {
  const half = Math.ceil(sponsors.length / 2);
  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-heading"
      className="stage panel-sm mt-16 py-6 md:mt-[calc(140*var(--u))] md:py-0"
      style={S.style}
    >
      <Art src="sponsors/frame.svg" style={S.at(FRAME)} />
      <Art src="sponsors/frame-mask.svg" style={S.at(FRAME)} />
      <Crt style={S.at(FRAME, { zIndex: 1 })} mask="masks/sponsors.svg" />
      <Art src="sponsors/bracket-left.svg" style={S.at([113, 4130, 93, 800])} />
      <Art
        src="sponsors/bracket-right.svg"
        style={S.at([1545, 4130, 93, 800], { transform: "scaleX(-1)" })}
      />

      <h2
        id="sponsors-heading"
        className="at u-text text-heading z-[2] text-center font-display leading-none md:flex md:items-center md:justify-center"
        style={{ ...S.at([594, 4195, 600, 131]), ...u(110, { sm: 48 }) }}
      >
        Sponsors
      </h2>

      <div
        // above the scanlines, so the plates and their bezels stay clean
        className="at z-[2] mt-6 flex flex-col justify-center gap-5 md:mt-0 md:gap-[calc(64*var(--u))]"
        style={S.at([150, 4345, 1458, 520])}
      >
        <Row list={sponsors.slice(0, half)} period={38} />
        <Row list={sponsors.slice(half)} period={34} reverse />
      </div>
    </section>
  );
}
