"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import Art, { figma } from "../ui/Art";
import { Crt } from "../ui/Crt";
import RichText from "../ui/RichText";
import { stage, u, type Box } from "../ui/stage";
import { speakers, type Speaker } from "../content";

/**
 * Figma: speakers (241:188) -- a stack of four computer windows beside a
 * folder-shaped frame, under the "Keynote Speakers" tab.
 *
 * The windows are a deck, one card per speaker. The front card shows its
 * speaker in the gradient frame; the cards behind are the red frames, empty.
 * The arrow sends the front card out and round to the back of the deck while
 * every other card steps forward one slot -- so the next speaker arrives at
 * the front, and each card's frame colour changes as it changes position. The
 * folder beside the deck shows the front speaker's bio.
 *
 * Below md there is no stack: only the front card shows, and Next swaps it.
 */
const S = stage([119, 5062, 1524, 1014]);

const FRONT: Box = [259.71, 5376.25, 694.92, 694.92];
const BIO_FRAME: Box = [783.1, 5303.9, 859.9, 628.4];

/** Window positions from 241:169/170/177/194, front first. */
const SLOTS: readonly (readonly [number, number])[] = [
  [259.71, 5376.25],
  [206.77, 5325.24],
  [162.5, 5274.23],
  [124, 5232.36],
];

/** A slot as a translate from the front window, in % of the card's size. */
function offset(slot: number) {
  const [x, y] = SLOTS[Math.min(slot, SLOTS.length - 1)];
  return [((x - FRONT[0]) / FRONT[2]) * 100, ((y - FRONT[1]) / FRONT[3]) * 100];
}

/** Where the front card goes on its way to the back: out to the lower right. */
const OUT = [45, 8] as const;

/** Must match `.deck-card` / `.deck-fade` in theme.css. */
const STEP_MS = 380;

/** One card of the deck. Lengths are artboard px inside the window. */
function Card({
  speaker,
  number,
  slot,
  out,
}: {
  speaker: Speaker;
  number: number;
  /** 0 is the front. */
  slot: number;
  /** On its way from the front to the back. */
  out: boolean;
}) {
  const front = slot === 0 && !out;
  const [tx, ty] = out ? OUT : offset(slot);
  const label = `speaker_${String(number).padStart(2, "0")}.exe`;

  return (
    <div
      aria-hidden={!front || undefined}
      className={cn(
        "deck-card md:absolute md:inset-0 md:[transform:translate(var(--tx),var(--ty))]",
        // below md only the front slot shows; it holds through the slide-out
        // (which is md-only) so the page does not jump
        slot === 0 ? "panel-sm relative" : "max-md:hidden",
        // a card beyond the four drawn slots waits, invisible, at the back
        slot >= SLOTS.length && "md:opacity-0",
      )}
      style={{
        ["--tx" as string]: `${tx}%`,
        ["--ty" as string]: `${ty}%`,
        // leaving keeps it on top until it is clear of the deck
        zIndex: out ? 20 : 10 - slot,
      }}
    >
      {/* Both frames, cross-faded: gradient at the front, red behind. */}
      <Image
        src={figma("speakers/window-1.svg")}
        alt=""
        fill
        unoptimized
        className="hidden object-fill md:block"
      />
      <Image
        src={figma("speakers/window-4.svg")}
        alt=""
        fill
        unoptimized
        className={cn(
          "deck-fade hidden object-fill md:block",
          slot === 0 ? "opacity-100" : "opacity-0",
        )}
      />

      <div className={cn("deck-fade", slot === 0 ? "opacity-100" : "opacity-0")}>
        {/* Title bar label, right of the three dots. */}
        <p
          aria-hidden
          className="u-text absolute right-[calc(30*var(--u))] top-[calc(30*var(--u))] hidden font-medium text-dq-panel md:block"
          style={u(24)}
        >
          {label}
        </p>

        <div className="relative flex flex-col gap-4 p-5 md:absolute md:inset-x-[calc(42*var(--u))] md:bottom-[calc(90*var(--u))] md:top-[calc(128*var(--u))] md:gap-[calc(28*var(--u))] md:p-0">
          <div className="flex items-start gap-4 md:gap-[calc(30*var(--u))]">
            <div className="relative size-[110px] shrink-0 border-4 border-dq-red md:size-[calc(250*var(--u))] md:border-[calc(7*var(--u))]">
              <Image
                src={speaker.photo}
                alt={front ? speaker.name : ""}
                fill
                sizes="(min-width: 768px) 15vw, 110px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h3
                className="u-text font-display leading-[0.95] text-dq-yellow"
                style={u(60, { sm: 30 })}
              >
                {speaker.link && front ? (
                  <a
                    href={speaker.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${speaker.name} (opens in a new tab)`}
                    className="hover:text-dq-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow"
                  >
                    {speaker.name}
                  </a>
                ) : (
                  speaker.name
                )}
              </h3>
              <p
                className="u-text mt-2 font-medium uppercase tracking-wide text-dq-amber md:mt-[calc(18*var(--u))]"
                style={u(20, { sm: 12, min: 11 })}
              >
                <span aria-hidden className="text-dq-red">&gt; </span>
                {speaker.session}
              </p>
            </div>
          </div>
          <p
            className="u-text font-light text-dq-amber"
            style={u(22, { sm: 14, min: 12, lh: 1.3 })}
          >
            {speaker.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Speakers() {
  const [index, setIndex] = useState(0);
  /** The speaker whose card is on its way to the back, during step one. */
  const [leaving, setLeaving] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  const count = speakers.length;
  const current = speakers[index];
  const upcoming = speakers[(index + 1) % count];

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  // Two steps, on timers rather than transitionend (which never arrives in a
  // background tab or with motion reduced): the front card slides out, then
  // the deck advances -- it drops in at the back as the rest step forward.
  const next = () => {
    if (leaving !== null) return; // mid-move: let it land first
    setLeaving(index);
    timers.current = [
      window.setTimeout(() => {
        setLeaving(null);
        setIndex((i) => (i + 1) % count);
      }, STEP_MS),
    ];
  };

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-heading"
      aria-roledescription="carousel"
      className="stage mt-16 md:mt-[calc(130*var(--u))]"
      style={S.style}
    >
      <Art src="speakers/bio-frame.svg" style={S.at(BIO_FRAME)} />
      <Crt style={S.at(BIO_FRAME)} mask="speakers/bio-frame.svg" />

      <Art src="speakers/title-tab.svg" style={S.at([917.57, 5065.5, 698.74, 257.81])} />
      <h2
        id="speakers-heading"
        className="at u-text mb-5 whitespace-nowrap text-center font-display leading-[0.978] text-dq-yellow md:mb-0 md:flex md:flex-col md:items-center md:justify-center md:text-black"
        style={{ ...S.at([960, 5147, 302, 150]), ...u(66, { sm: 44 }) }}
      >
        <span>Keynote</span> <span>Speakers</span>
      </h2>

      {/* The deck, anchored on the front window; the other slots are
          offsets from it. */}
      <div className="at z-[2]" style={S.at(FRONT)}>
        {speakers.map((speaker, k) => (
          <Card
            key={speaker.name}
            speaker={speaker}
            number={k + 1}
            slot={(k - index + count) % count}
            out={leaving === k}
          />
        ))}
        <Crt
          style={{ inset: 0, width: "auto", height: "auto", zIndex: 15 }}
          mask="speakers/window-4.svg"
        />
      </div>

      <p className="sr-only" aria-live="polite">
        Speaker {index + 1} of {count}: {current.name}
      </p>

      {/* The bio, in the folder. */}
      <div
        key={index}
        className="at panel-sm mt-4 flex animate-[bio-in_450ms_steps(9)] flex-col p-5 md:mt-0 md:p-0"
        style={S.at([985, 5445, 625, 465])}
      >
        <p
          className="u-text font-medium text-dq-yellow"
          style={u(22, { sm: 13, min: 12 })}
        >
          <span aria-hidden className="text-dq-red">$ </span>
          cat {current.name.split(" ").at(-1)?.toLowerCase()}.bio
          <span className="caret" aria-hidden />
        </p>
        <p
          className="u-text mt-3 overflow-y-auto pr-2 font-light text-dq-amber [scrollbar-color:rgb(var(--dq-red))_transparent] [scrollbar-width:thin] md:mt-[calc(20*var(--u))] md:min-h-0 md:flex-1"
          style={u(19, { sm: 13, min: 12, lh: 1.4 })}
        >
          <RichText segments={current.bio} />
        </p>
      </div>

      {/* Folder tab: which session this is. */}
      <p
        className="deco u-text flex items-center justify-center font-medium uppercase tracking-wide text-dq-yellow"
        style={{ ...S.at([1318, 5318, 262, 80]), ...u(20) }}
      >
        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </p>

      <button
        type="button"
        onClick={next}
        aria-label={`Next speaker: ${upcoming.name}`}
        className="at z-[30] mt-4 flex items-center gap-2 border-2 border-dq-red px-4 py-2 font-display text-xl text-dq-yellow transition-transform hover:translate-x-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow md:mt-0 md:border-0 md:p-0"
        style={S.at([848.5, 5963, 48.5, 53.5])}
      >
        <span className="md:hidden">Next</span>
        <Image
          src={figma("speakers/arrow.svg")}
          alt=""
          width={49}
          height={54}
          unoptimized
          className="h-[22px] w-auto md:h-full md:w-full"
        />
      </button>
    </section>
  );
}
