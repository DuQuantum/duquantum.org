import { cn } from "@/lib/cn";
import { site } from "../content";

/**
 * Figma component `applyButton` (235x91): a gradient plate, a purple inset, then
 * a white face with purple text. Figma paints the outer plate with a heavily
 * squashed conic gradient; sampling the render shows pure teal at the top-left
 * corner, base-blue at the bottom-right, and the same mid colour at both of the
 * other two -- i.e. a corner-to-corner sweep, which `to bottom right` reproduces.
 * Two stops are enough: base-cyan, the mid colour Figma paints, is exactly the
 * 50% interpolation of teal and blue, so the gradient produces it on its own.
 *
 * Defaults to the live application form. `target="_blank"` is conditional so an
 * overridden in-page href (e.g. "#apply") doesn't spawn a tab, and the label is
 * spelled out because a link that opens a new tab unannounced is a screen-reader
 * trap -- the visible "APPLY!" glyphs are unchanged.
 *
 * The containing block for the plate lives on an inner span, not on the <a>.
 * `cn` is a plain join, so a class passed in never wins on specificity -- it wins
 * or loses on Tailwind's own source order, and `.relative` is emitted after
 * `.absolute`. A `relative` root would therefore have silently defeated every
 * caller's `absolute`, which is exactly how both call sites position this.
 */
export default function ApplyButton({
  href = site.applicationUrl,
  className,
}: {
  href?: string;
  className?: string;
}) {
  const external = /^https?:/.test(href);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={external ? "Apply (opens in a new tab)" : undefined}
      className={cn(
        "group block h-[91px] w-[235px] shrink-0",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-base-teal focus-visible:ring-offset-4 focus-visible:ring-offset-base-purple",
        className,
      )}
    >
      <span className="relative block size-full">
        <span className="absolute bottom-[2px] left-[2px] right-[2px] top-[1px] block bg-gradient-to-br from-base-teal to-base-blue p-[6px]">
          <span className="block size-full bg-base-purple p-[6px]">
            <span className="flex size-full items-center justify-center bg-base-white transition-colors group-hover:bg-base-teal">
              <span className="text-gate font-semibold leading-none text-base-purple">
                APPLY!
              </span>
            </span>
          </span>
        </span>
      </span>
    </a>
  );
}
