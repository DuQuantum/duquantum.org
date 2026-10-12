import Image from "next/image";
import { cn } from "@/lib/cn";
import Art, { figma } from "../ui/Art";
import { Crt } from "../ui/Crt";
import { stage, u, type Box } from "../ui/stage";
import { fermata } from "../content";

/**
 * Figma: fermata section (280:56) -- a framed panel with "Try out Fermata" on
 * a red band, the pitch below it, and two link buttons wired in by circuit
 * traces.
 *
 * Each button carries a slider: a ball that rests at the bottom of its track
 * and slides to the top on hover or focus (theme.css `.fermata-ball`), with a
 * little room left at either end.
 */
const S = stage([108, 7476, 1518, 810]);

const FRAME: Box = [108, 7476, 1518, 810];

/** Button boxes (280:24, 280:25), 487x127 with a 10px rule. */
const BUTTONS: readonly Box[] = [
  [1062, 7614, 487, 127],
  [1062, 7818, 487, 127],
];

function FermataLink({
  label,
  href,
  box,
}: {
  label: string;
  href: string;
  box: Box;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label.replace(/ Here$/, "")}: Fermata (opens in a new tab)`}
      className={cn(
        "fermata-link group at flex items-center bg-dq-panel max-md:relative",
        "border-[6px] pl-4 max-md:h-[72px] md:border-[calc(10*var(--u))] md:pl-[calc(19*var(--u))]",
        "transition-colors hover:bg-[#130a26] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-dq-panel",
      )}
      style={S.at(box)}
    >
      <span
        className="u-text whitespace-nowrap text-dq-yellow"
        style={u(36, { sm: 18, lh: 1.31 })}
      >
        {label}
      </span>

      {/* The slider (280:34/35): track, then the ball riding it. It sits
          across the button's rule top and bottom, as drawn. */}
      <span
        aria-hidden
        className="absolute bottom-[-2px] right-[34px] top-[-2px] w-[22px] md:bottom-[calc(-5*var(--u))] md:left-[calc(391*var(--u))] md:right-auto md:top-[calc(-5*var(--u))] md:w-[calc(40*var(--u))]"
      >
        <Image
          src={figma("fermata/slider-track.svg")}
          alt=""
          fill
          unoptimized
          className="object-fill"
        />
        <span className="fermata-ball absolute inset-x-0 top-[5.13%] block aspect-square">
          <Image
            src={figma("fermata/slider-ball.svg")}
            alt=""
            fill
            unoptimized
            className="object-fill"
          />
        </span>
      </span>
    </a>
  );
}

export default function Fermata() {
  return (
    <section
      id="fermata"
      aria-labelledby="fermata-heading"
      className="stage panel-sm mt-6 p-5 md:mt-[calc(55*var(--u))] md:p-0"
      style={S.style}
    >
      <Art src="fermata/frame.svg" style={S.at(FRAME)} />
      <Crt style={S.at(FRAME)} mask="masks/fermata.svg" />
      <Art src="fermata/circuit.svg" style={S.at([739, 7646.7, 326.68, 634.33])} />
      <Art src="fermata/title-band.svg" style={S.at([113, 7675, 740, 210])} />

      {/* "Try out" (280:6) stacked beside "Fermata" (280:4). */}
      <h2
        id="fermata-heading"
        className="at flex items-center gap-3 md:gap-0"
        style={S.at([174, 7705, 480, 150])}
      >
        <span
          // The gradient is clipped to the text but painted only inside the
          // element's box, and at a 0.64 line height the glyphs overhang it --
          // padding grows the box to cover them, the margin cancels it out.
          className="u-text text-heading -my-[0.3em] block w-min py-[0.3em] font-mono font-semibold md:w-[calc(178*var(--u))] md:text-center"
          style={u(48, { sm: 20, lh: 0.64 })}
        >
          Try out
        </span>{" "}
        <span
          className="u-text text-heading -my-[0.1em] block py-[0.1em] font-display md:w-[calc(359*var(--u))] md:pt-[calc(18*var(--u)_+_0.1em)] md:text-center"
          style={u(96, { sm: 48, lh: 0.978 })}
        >
          {fermata.name}
        </span>
      </h2>

      <p
        className="at u-text mt-5 text-dq-yellow md:mt-0 md:flex md:items-center"
        style={{
          ...S.at([220, 7930, 484, 248]),
          ...u(18, { sm: 15, min: 13, lh: 1.31 }),
        }}
      >
        {fermata.blurb}
      </p>

      <div className="mt-6 flex flex-col gap-4 md:contents">
        {fermata.links.map((link, i) => (
          <FermataLink key={link.href} {...link} box={BUTTONS[i]} />
        ))}
      </div>
    </section>
  );
}
