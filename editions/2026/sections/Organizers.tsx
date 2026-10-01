import Image from "next/image";
import { cn } from "@/lib/cn";
import Art from "../ui/Art";
import { Crt } from "../ui/Crt";
import { stage, u, type Box } from "../ui/stage";
import { organizers, type Organizer } from "../content";

/**
 * Figma: organizers (241:231) -- a circuit board whose ten red pads
 * (`profile circles`, 242:278) are the headshots, wired together by traces and
 * a measurement gate running out under the title tab.
 *
 * `organizers` fills the pads in order, left to right, top row first. Names
 * appear on hover or focus as a terminal-style tag; below md the board drops
 * away and the photos sit in a captioned grid instead.
 */
const S = stage([118, 6128, 1530, 1415]);

/** Pad centres from 242:278, offset to the artboard. Radius 130.5. */
const PADS = [
  [130.5, 130.5],
  [434.5, 130.5],
  [738.5, 130.5],
  [564.5, 417.5],
  [868.5, 417.5],
  [1172.5, 417.5],
  [163.5, 734.5],
  [467.5, 734.5],
  [771.5, 734.5],
  [1075.5, 734.5],
].map(([cx, cy]) => [177 + cx - 130.5, 6367 + cy - 130.5, 261, 261] as Box);

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-dq-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-dq-panel";

function Pad({ person, box }: { person: Organizer; box?: Box }) {
  const photo = (
    <span className="relative block aspect-square overflow-hidden rounded-full border-[6px] border-dq-red bg-dq-red md:border-[calc(12*var(--u))]">
      <Image
        src={person.photo}
        alt=""
        fill
        sizes="(min-width: 768px) 15vw, 40vw"
        className="object-cover grayscale-[35%] sepia-[25%] transition-[filter] duration-300 group-hover:grayscale-0 group-hover:sepia-0 group-focus-visible:grayscale-0 group-focus-visible:sepia-0"
      />
    </span>
  );

  // The tag: always shown below md, revealed on hover/focus above it.
  const tag = (
    <span
      className={cn(
        "mt-2 block text-center md:pointer-events-none md:absolute md:left-1/2 md:top-[calc(100%_-_18*var(--u))] md:z-10 md:mt-0 md:-translate-x-1/2 md:whitespace-nowrap",
        "md:border-[calc(4*var(--u))] md:border-dq-yellow md:bg-dq-panel md:px-[calc(16*var(--u))] md:py-[calc(10*var(--u))] md:text-left",
        "md:opacity-0 md:transition-opacity md:duration-150 md:group-hover:opacity-100 md:group-focus-visible:opacity-100",
      )}
    >
      <span className="u-text block font-bold text-dq-yellow" style={u(22, { sm: 14, min: 12 })}>
        <span aria-hidden className="hidden text-dq-red md:inline">&gt; </span>
        {person.name}
      </span>
      <span className="u-text block font-light text-dq-amber" style={u(18, { sm: 12, min: 11 })}>
        {person.role} · {person.org}
      </span>
    </span>
  );

  const className = cn("group block max-md:relative", box && "at", FOCUS, "rounded-full");
  const style = box ? S.at(box) : undefined;

  return person.link ? (
    <a
      href={person.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${person.name}, ${person.role}, ${person.org} (opens in a new tab)`}
      className={className}
      style={style}
    >
      {photo}
      <span aria-hidden>{tag}</span>
    </a>
  ) : (
    // No link: still focusable, so a keyboard or touch user can raise the tag.
    <div tabIndex={0} className={className} style={style}>
      {photo}
      {tag}
    </div>
  );
}

export default function Organizers() {
  return (
    <section
      id="organizers"
      aria-labelledby="organizers-heading"
      className="stage panel-sm mt-16 p-5 md:mt-[calc(60*var(--u))] md:p-0"
      style={S.style}
    >
      <Art src="organizers/frame.svg" style={S.at([118, 6128, 1517.5, 1415])} />
      <Crt style={S.at([118, 6128, 1517.5, 1415])} mask="masks/organizers.svg" />
      <Art src="organizers/title-tab.svg" style={S.at([964, 6133, 672.06, 423.19])} />
      <Art src="organizers/line-2.svg" style={S.at([997.1, 6397.2, 774, 951])} />
      <Art src="organizers/trace-left.svg" style={S.at([331, 6591.7, 62, 950.8])} />
      <Art src="organizers/trace-center.svg" style={S.at([590.5, 6278, 712, 1069.5])} />
      <Art src="organizers/circles.svg" style={S.at([177, 6367, 1303, 865])} />

      <h2
        id="organizers-heading"
        className="at u-text text-heading mb-5 text-center font-display leading-none md:mb-0 md:flex md:items-center md:justify-center"
        style={{ ...S.at([1130, 6196, 403, 140]), ...u(96, { sm: 44 }) }}
      >
        Organizers
      </h2>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:contents">
        {organizers.map((person, i) => (
          <li key={person.name} className="md:contents">
            <Pad person={person} box={PADS[i]} />
          </li>
        ))}
      </ul>
    </section>
  );
}
