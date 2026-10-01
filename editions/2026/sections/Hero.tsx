import Image from "next/image";
import Art, { figma } from "../ui/Art";
import { stage, u, type Box } from "../ui/stage";
import { cn } from "@/lib/cn";
import { site } from "../content";

/**
 * Figma: landing page (190:11180).
 *
 * The art is four exported layers -- the circuit traces, the BASE plate, the
 * DUQUANTUM gate logo (with the lettering already outlined, so it is exactly
 * Figma's Trek), and the three-part register plate -- with the date, place and
 * registration state set as live text on top.
 *
 * This is the one section whose reds are deliberately staggered (plate, bevel,
 * traces), so its SVGs are left exactly as exported.
 */
const S = stage([0, 0, 1748, 1000]);

/** Figma 183:11051 -- three knobs, left to right. Spin speed and direction
 *  differ a little per knob so they never move as one. */
const KNOBS = [
  { x: 1392, art: 3, period: 70, dir: "normal" },
  { x: 1516, art: 2, period: 54, dir: "reverse" },
  { x: 1640, art: 1, period: 82, dir: "normal" },
] as const;

function Knob({ x, art, period, dir }: (typeof KNOBS)[number]) {
  // The node is 85x84; the exported SVG carries its 9px drop shadow, hence
  // the larger box. Only the pointer turns -- the dial and its shadow stay put.
  const box: Box = [x, 50, 94.8, 93.8];
  return (
    <>
      <Art src={`hero/knob-${art}-body.svg`} style={S.at(box)} />
      <Art
        src={`hero/knob-${art}-pointer.svg`}
        style={S.at(box, {
          ["--knob-period" as string]: `${period}s`,
          ["--knob-dir" as string]: dir,
        })}
        className="knob-pointer"
      />
    </>
  );
}

function Register() {
  const open = site.registrationOpen;
  const lines = open ? ["register", "now open"] : ["registrations", "now closed"];

  const label = (
    <span
      className="u-text flex flex-col items-end justify-center font-display leading-none text-dq-ink"
      style={u(64, { sm: 28 })}
    >
      {lines.map((line) => (
        <span key={line} className="block whitespace-nowrap">
          {line}
        </span>
      ))}
    </span>
  );

  return (
    <div
      className={cn(
        "at mt-8 md:mt-0",
        // below md: a plain yellow plate
        "inline-block bg-dq-yellow px-5 py-3 md:bg-transparent md:p-0",
      )}
      style={S.at([1110, 590, 419, 150])}
    >
      {open ? (
        <a
          href={site.applicationUrl}
          className="flex h-full justify-end transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-dq-yellow"
        >
          {label}
        </a>
      ) : (
        <p className="flex h-full justify-end">{label}</p>
      )}
    </div>
  );
}

export default function Hero() {
  const start = new Date(site.startDate);
  const end = new Date(site.endDate);
  const month = start.toLocaleString("en-US", {
    month: "long",
    timeZone: "America/New_York",
  });
  const day = (d: Date) =>
    d.toLocaleString("en-US", { day: "numeric", timeZone: "America/New_York" });
  const dateLine = `${month} ${day(start)}-${day(end)} ${start.getFullYear()}`;

  return (
    <section
      id="hero"
      className="stage pb-12 pt-[140px] text-center md:pb-0 md:pt-0 md:text-left"
      style={S.style}
    >
      {/* Layer order is Figma's: traces, then the plate over them. */}
      <Art src="hero/circuit.svg" style={S.at([0, 0, 1001, 984])} priority />
      <Art src="hero/base.svg" style={S.at([368.7, 0, 1380, 998])} priority />

      <h1 className="at" style={S.at([621, 169, 1127, 358])}>
        <span className="block font-display text-[64px] leading-none text-dq-yellow md:sr-only">
          {site.name}
        </span>
        <Image
          src={figma("hero/logo.svg")}
          alt=""
          fill
          unoptimized
          priority
          className="hidden object-fill md:block"
        />
      </h1>

      {KNOBS.map((knob) => (
        <Knob key={knob.x} {...knob} />
      ))}

      {/* Register plate (183:11039): face, bevel, then the dark right side. */}
      <Art src="hero/reg-a.svg" style={S.at([1095, 577, 468, 214.5])} />
      <Art src="hero/reg-c.svg" style={S.at([1095.5, 578, 511, 264.5])} />
      <Art src="hero/reg-b.svg" style={S.at([1562.5, 576.5, 45, 266.5])} />
      <Register />
      <Art src="hero/reg-d.svg" style={S.at([1301, 749, 220.5, 3])} />
      <Art src="hero/reg-e.svg" style={S.at([1399, 763, 123, 3])} />

      <Art src="hero/dots.svg" style={S.at([1640, 710, 34, 129])} />

      {/* Details text (190:11179). Centred on Figma's text boxes. */}
      <p
        className="at u-text mt-6 whitespace-nowrap font-display leading-none md:mt-0 md:flex md:items-center md:justify-center"
        style={{ ...S.at([100, 529, 611, 100]), ...u(80, { sm: 32 }) }}
      >
        <time dateTime={site.startDate.slice(0, 10)}>{dateLine}</time>
      </p>
      <p
        className="at u-text mt-2 whitespace-nowrap font-display leading-none md:mt-0 md:flex md:items-center md:justify-center"
        style={{ ...S.at([146, 622, 470, 96]), ...u(80, { sm: 32 }) }}
      >
        <span className="font-condensed font-black">at</span>&nbsp;Duke
        University
      </p>
    </section>
  );
}
