import { cn } from "@/lib/cn";
import { figma } from "./Art";

/**
 * Screen effects for a panel interior: scanlines (theme.css `.crt`). Lay it
 * over a panel at the frame's own box and pass that frame's mask from
 * figma/masks/ -- derived from the frame's SVG, white only where the dark
 * panel fill shows -- so the lines stay off borders, strokes and artwork.
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
