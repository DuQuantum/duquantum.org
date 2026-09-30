"use client";

import { Children, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Figma component `speakerScroll` (120:458), 178x61 -- a left chevron, a row of
 * dots and a right chevron. It was drawn with four dots because there are four
 * speakers; here the dots come from the list, so a fifth speaker is a fifth dot
 * and nothing else.
 *
 * The track is CSS scroll-snap rather than a JS slide swap. That buys three
 * things for free: native swipe on touch, a section that still scrolls with
 * JavaScript off, and a track that is automatically as tall as the tallest bio
 * -- so the control below it never moves between slides.
 *
 * Which slide is showing therefore has to be observed rather than owned: the
 * reader can scroll the track directly, so an `active` state driven only by the
 * buttons would drift out of sync. An IntersectionObserver rooted on the track
 * reports it instead, the same way TopBar watches #hero-midpoint rather than
 * computing scroll offsets it would have to redo on resize.
 *
 * Chevrons are drawn, not exported: a square with two 4px borders rotated 45deg
 * is the whole shape, and 4px matches the wires elsewhere in the design.
 *
 * Dots are 8px on Figma's 14px pitch, which is far too small to hit. The `before`
 * pseudo-element pushes each button's target out to 24px without touching the
 * layout; neighbouring targets overlap slightly, so a mis-tap lands on the
 * adjacent slide rather than nothing.
 */

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-base-teal focus-visible:ring-offset-4 focus-visible:ring-offset-base-purple";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block size-[25px] border-base-teal",
        direction === "left"
          ? "-rotate-45 border-l-4 border-t-4"
          : "rotate-45 border-r-4 border-t-4",
      )}
    />
  );
}

export default function SpeakerCarousel({
  labels,
  children,
}: {
  labels: readonly string[];
  children: React.ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = labels.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const slides = Array.from(el.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = slides.indexOf(entry.target as HTMLElement);
          if (index !== -1) setActive(index);
        }
      },
      // Rooted on the track, so "visible" means visible in the carousel rather
      // than in the viewport. 0.6 is past the snap point either way.
      { root: el, threshold: 0.6 },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;

    // Wrap: past the last returns to the first, and back from the first goes to
    // the last, so neither arrow is ever a dead control.
    const slide = el.children[(index + count) % count] as HTMLElement | undefined;
    if (!slide) return;

    el.scrollTo({
      left: slide.offsetLeft,
      // theme.css zeroes CSS transitions under reduced motion but cannot reach
      // a scripted scroll, so this asks separately.
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <div role="group" aria-roledescription="carousel" aria-label="Speakers">
      <div
        ref={track}
        tabIndex={0}
        aria-label="Speakers, scrollable"
        className={cn(
          "relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          FOCUS,
        )}
      >
        {Children.map(children, (child, i) => (
          <div
            className="w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${labels[i]}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Centred on the content column rather than under the card's left
          column, and clear of the track by a fixed gap -- so it holds one
          position instead of riding each blurb's two-to-four lines. */}
      <div className="mt-8 flex w-full items-center justify-center gap-[6px]">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Previous speaker"
          className={cn("flex items-center justify-center p-1", FOCUS)}
        >
          <Chevron direction="left" />
        </button>

        <div className="flex items-center gap-[6px] px-[6px]">
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${label}`}
              aria-current={i === active}
              className={cn(
                "relative size-2 rounded-full bg-base-teal transition-opacity",
                "before:absolute before:-inset-2 before:content-['']",
                i === active ? "opacity-100" : "opacity-50",
                FOCUS,
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Next speaker"
          className={cn("flex items-center justify-center p-1", FOCUS)}
        >
          <Chevron direction="right" />
        </button>
      </div>
    </div>
  );
}
