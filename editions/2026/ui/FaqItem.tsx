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
 * Copied from the placeholder edition and restyled as a terminal listing.
 *
 * Under prefers-reduced-motion the site's theme.css zeroes every transition
 * duration, which collapses the animation to a frame -- transitionend still
 * fires, so the close still completes.
 */

/** A terminal toggle: `[+]` closed, `[-]` open. */
function Toggle({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="shrink-0 font-bold text-dq-red transition-colors group-hover:text-dq-yellow"
    >
      [{open ? "-" : "+"}]
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
          "group flex cursor-pointer list-none items-start gap-[0.8em]",
          // Safari draws its own marker and ignores list-style
          "[&::-webkit-details-marker]:hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-dq-panel",
        )}
      >
        <span aria-hidden className="shrink-0 text-dq-red">
          &gt;
        </span>
        <h3 className="flex-1 font-medium leading-[1.3] text-dq-yellow transition-colors group-hover:text-dq-amber">
          {question}
        </h3>
        <Toggle open={open} />
      </summary>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        onTransitionEnd={onTransitionEnd}
      >
        <div className="overflow-hidden">
          <p className="pl-[1.45em] pt-[0.6em] text-[0.82em] font-light leading-[1.45] text-dq-amber">
            {children}
          </p>
        </div>
      </div>
    </details>
  );
}
