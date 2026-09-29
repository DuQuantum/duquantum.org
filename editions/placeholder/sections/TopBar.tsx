"use client";

import { useEffect, useRef, useState } from "react";
import ApplyButton from "../ui/ApplyButton";
import { cn } from "@/lib/cn";

/**
 * Figma: topBar component (60:897), 1440x245 -- a quantum circuit wire carrying
 * an H gate, two CNOTs and the apply button. The component has no background
 * fill, so the bar is fully transparent and the page scrolls underneath it.
 *
 * Visibility rule is `!pastHeroMid || scrollingUp`: down on entry and through the
 * hero's top half, retracts once the hero's midpoint passes the viewport top, and
 * returns on any upward scroll. "Past the midpoint" comes from an
 * IntersectionObserver on #hero-midpoint -- a 1px sentinel Hero pins at its own
 * 50% mark -- rather than a scroll offset, so there is no height to recompute on
 * resize or after fonts load. If the sentinel is missing the bar just stays down.
 *
 * Geometry: horizontal positions are percentages of the 1440 artboard so the
 * circuit scales with the viewport, while gate/dot sizes stay fixed so circles
 * stay circular. Several rects are flipped in Figma, which puts their reported
 * origin 6px off from where they render -- the values here are measured centres.
 *
 * Every decorative shape is placed by its CENTRE -- a percentage left plus a
 * -50% x-translation -- rather than by its left edge. With fixed px sizes on percentage positions the two
 * only agree at exactly 1440: a shape of width w anchored at p% has its centre at
 * p*W + w/2, which drifts from the column's true centre everywhere else. The
 * error scales with w, so the 56px rings visibly slid right of their 6px
 * crosshairs on any viewport under 1440.
 *
 * The apply button and the wire that drops into it are the one column that is
 * NOT fixed to its Figma percentage. The MLH trust badge (ui/MlhBadge.tsx) is
 * fixed to the viewport's top-right corner and hangs 175px down, straight
 * through the button's row, so the column is placed at `--apply-x`:
 * `min(83.889%, <the badge's left edge, less half a button>)`. Figma's position
 * wins wherever there is room for it -- roughly 1590px and up -- and the column
 * slides left only as far as the badge actually forces it. Everything on that
 * column reads the same variable, so the wire stays welded to the button.
 *
 * The conversion through `--bar-overhang` is because the two are anchored to
 * different things: the badge to the viewport, this column to a 1440-capped
 * centred bar. Past 1440 the bar stops growing and its right edge retreats
 * inward, which is room the button gets to keep.
 *
 * The wire is split around the H gate (Figma: 0->84 and 159->1440) rather than
 * drawn continuous behind a filled gate, since a transparent bar has no
 * background colour to mask it with. Both segments hang off `--gate-x` so the
 * seams stay welded to the gate's edges at every width, and bleed past the
 * viewport by 100vw so the wire always reaches the screen edges.
 */

const DELTA = 4; // ignore sub-pixel scroll jitter

export default function TopBar() {
  const [visible, setVisible] = useState(true);
  const pastHeroMid = useRef(false);

  useEffect(() => {
    const midpoint = document.getElementById("hero-midpoint");
    if (!midpoint) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // boundingClientRect is reported whether or not the target intersects, so
        // this one comparison covers both crossings. It also stays correct when
        // the hero is over twice the viewport height: there the midpoint starts
        // below the fold and crosses the viewport's *bottom* edge first, which
        // fires a callback too, and `top <= 0` is false, so the bar stays down.
        pastHeroMid.current = entry.boundingClientRect.top <= 0;

        // The only way to cross this line is to scroll, and the direction is
        // implied: the midpoint can only rise past the viewport top going down,
        // and only re-enter going up. So the crossing itself settles visibility
        // -- waiting for the next scroll event would leave the bar down for a
        // frame, or indefinitely if the user stops right on the line.
        setVisible(!pastHeroMid.current);
      },
      { threshold: 0 },
    );

    observer.observe(midpoint);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;

        if (Math.abs(delta) > DELTA) {
          setVisible(!pastHeroMid.current || delta < 0);
          lastY = y;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      aria-hidden={!visible}
      className={cn(
        // the bar is transparent, so let clicks through everywhere but the button
        "pointer-events-none fixed inset-x-0 top-0 z-50",
        // clips the wire's 100vw bleed to the viewport, so it can never widen the page
        "overflow-hidden",
        "transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div
        className={cn(
          "relative mx-auto h-[110px] w-full max-w-[1440px] lg:h-[245px]",
          "[--gate-x:1.5rem] lg:[--gate-x:5.833%]",
          // 117.5px is half the apply button's 235px width -- it is placed by
          // its centre, so that is how far its right edge sits past --apply-x.
          "[--apply-x:83.889%]",
          "lg:[--bar-overhang:max(0px,(100vw_-_1440px)_*_0.5)]",
          "lg:[--mlh-safe-inner:max(0px,var(--mlh-safe)_-_var(--bar-overhang))]",
          "lg:[--apply-x:min(83.889%,calc(100%_-_117.5px_-_var(--mlh-safe-inner)))]",
        )}
      >
        {/* the wire, split around the H gate and bled past both screen edges */}
        <div className="absolute -left-[100vw] top-[52px] h-1.5 w-[calc(100vw+var(--gate-x))] bg-base-teal lg:top-[42px]" />
        <div className="absolute -right-[100vw] left-[calc(var(--gate-x)+75px)] top-[52px] h-1.5 bg-base-teal lg:top-[42px]" />

        {/* H gate -- unfilled, so its 6px border picks the wire back up */}
        <div className="absolute left-[var(--gate-x)] top-[15px] flex size-[75px] items-center justify-center border-6 border-base-teal lg:top-[6px]">
          <span className="text-gate font-semibold leading-none text-base-teal">
            H
          </span>
        </div>

        {/* decorative gates -- dropped on narrow screens, where they would collide */}
        <div className="hidden lg:block" aria-hidden>
          {/* CNOT: control dot on the wire, target ring below (column centre 400) */}
          <div className="absolute left-[27.778%] top-[36px] size-[18px] -translate-x-1/2 rounded-full bg-base-white" />
          <div className="absolute left-[27.778%] top-[49px] h-[100px] w-1.5 -translate-x-1/2 bg-base-white" />
          <div className="absolute left-[27.778%] top-[93px] size-[56px] -translate-x-1/2 rounded-full border-6 border-base-white" />
          <div className="absolute left-[27.778%] top-[118px] h-1.5 w-[50px] -translate-x-1/2 bg-base-white" />

          {/* X gate straddling the wire, which doubles as its horizontal stroke (564) */}
          <div className="absolute left-[39.167%] top-[20px] h-[50px] w-1.5 -translate-x-1/2 bg-base-teal" />
          <div className="absolute left-[39.167%] top-[17px] size-[56px] -translate-x-1/2 rounded-full border-6 border-base-teal" />

          {/* wire dropping in from above (985); the header clips its bleed */}
          <div className="absolute left-[68.403%] top-[-18px] h-[67px] w-1.5 -translate-x-1/2 bg-base-white" />
          <div className="absolute left-[68.403%] top-[37px] size-[18px] -translate-x-1/2 rounded-full bg-base-white" />

          {/* wire dropping down into the apply button (1208), pinned to the
              same --apply-x as the button so the two move together */}
          <div className="absolute left-[var(--apply-x)] top-[35px] size-[18px] -translate-x-1/2 rounded-full bg-base-teal" />
          <div className="absolute left-[var(--apply-x)] top-[48px] h-[27px] w-1.5 -translate-x-1/2 bg-base-teal" />
        </div>

        {/* Centred on the same column as the stub above, so the wire always lands
            on the button's midpoint. 0.667 on narrow screens keeps the rendered
            size where it was before the component shrank 285x110 -> 235x91. */}
        <ApplyButton
          className={cn(
            "absolute right-[var(--mlh-safe)] top-1/2 origin-right -translate-y-1/2 scale-[0.667]",
            // Below ~340px the badge's band, this button and the H gate stop
            // fitting side by side: at 320 the button's left edge lands 12px
            // inside the gate. One more step down buys back 16px.
            "max-[340px]:scale-[0.55]",
            "lg:left-[var(--apply-x)] lg:right-auto lg:top-[74px] lg:-translate-x-1/2 lg:translate-y-0 lg:scale-100",
            visible ? "pointer-events-auto" : "pointer-events-none",
          )}
        />
      </div>
    </header>
  );
}
