"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 *
 * Built on <details>, not a div and a boolean. The browser then owns the parts
 * that are easy to get wrong -- the summary is focusable, Enter and Space both
 * toggle it, the open/closed state is announced, and the answer is real text in
 * the HTML, so it survives with JavaScript off and Ctrl+F can find it. What
 * this component adds is only the animation.
 *
 * Animating to an unknown height is the whole trick: a wrapper goes from
 * `grid-template-rows: 0fr` to `1fr` with the inner row clipped, which
 * transitions to the content's natural height without measuring it in JS or
 * guessing a max-height that clips long answers.
 *
 * Closing has to be driven from here. Dropping the `open` attribute hides the
 * answer instantly, so the attribute is only removed once the shrink has
 * finished -- hence `preventDefault()` on the summary click, which hands the
 * toggle to this logic rather than the browser's. Enter and Space on a
 * <summary> dispatch a click, so the keyboard comes through the same path.
 *
 * Under prefers-reduced-motion the site's theme.css zeroes every transition
 * duration, which collapses the animation to a frame -- transitionend still
 * fires, so the close still completes.
 */

function Plus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        // 30x30 with 4px bars, flush to the column's right edge (Figma 109:205)
        "relative mt-[1px] block size-[30px] shrink-0",
        "transition-transform duration-300 ease-out",
        // the same two bars turned into a close icon -- no second asset
        open && "rotate-45",
      )}
    >
      <span className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-base-teal" />
      <span className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-base-teal" />
    </span>
  );
}

export default function FaqItem({
  id,
  question,
  children,
}: {
  id: string;
  question: string;
  children: React.ReactNode;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  /** Open the entry named by the URL fragment, on load and on later changes. */
  useEffect(() => {
    const openFromHash = () => {
      const element = details.current;
      if (!element) return;
      if (decodeURIComponent(window.location.hash.slice(1)) !== id) return;

      // Jumped to directly, so it is already open when it arrives -- animating
      // here would just be motion the reader did not ask for.
      element.open = true;
      setOpen(true);
      element.scrollIntoView({ block: "center" });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [id]);

  const toggle = (event: React.MouseEvent<HTMLElement>) => {
    const element = details.current;
    if (!element) return;
    event.preventDefault();

    // Branch on the state, not `element.open`: through a close the attribute is
    // still true (it comes off at transitionend), so reading it here would take
    // a click meant to reopen the entry and close it again. Off the state, that
    // click lands in the branch below and reverses the collapse mid-flight.
    if (open) {
      setOpen(false); // 1fr -> 0fr; the attribute comes off at transitionend
      return;
    }

    element.open = true; // the answer joins the flow at 0fr...
    // ...and grows once the browser has laid it out at that height. Two frames
    // rather than one: a single rAF can still land in the same style flush, and
    // a transition with no starting value just snaps open.
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  };

  const onTransitionEnd = (event: React.TransitionEvent) => {
    if (event.propertyName !== "grid-template-rows") return;
    const element = details.current;
    // Guard against a reopen mid-collapse: `open` is the intent, the attribute
    // is only the browser's copy of it.
    if (element && !open) element.open = false;
  };

  return (
    <details ref={details} id={id}>
      <summary
        onClick={toggle}
        className={cn(
          "flex cursor-pointer list-none items-start gap-6",
          // Safari draws its own marker and ignores list-style
          "[&::-webkit-details-marker]:hidden",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-base-teal focus-visible:ring-offset-4 focus-visible:ring-offset-base-purple",
        )}
      >
        <h3 className="flex-1 text-section-body font-medium leading-[1.3]">
          {question}
        </h3>
        <Plus open={open} />
      </summary>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        onTransitionEnd={onTransitionEnd}
      >
        <div className="overflow-hidden">
          {/* Figma puts the answer 11px under the question, full column width */}
          <p className="pt-[11px] text-section-caption leading-[1.3]">
            {children}
          </p>
        </div>
      </div>
    </details>
  );
}
