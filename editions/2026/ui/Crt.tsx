import { cn } from "@/lib/cn";
import { figma } from "./Art";

/**
 * Screen effects for a panel interior: static scanlines (theme.css `.crt`).
 * Lay it over a panel at the frame's own box and pass the frame's SVG as
 * `mask`, and the effect follows the frame's real outline.
 */
export function Crt({
  style,
  mask,
  className,
}: {
  style: React.CSSProperties;
  mask?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("deco crt", className)}
      style={{
        ...style,
        ["--crt-mask" as string]: mask ? `url("${figma(mask)}")` : undefined,
      }}
    />
  );
}

/** The page-wide grain: Figma's noise effect, fixed over everything. */
export function Grain() {
  return <div aria-hidden className="grain" />;
}
