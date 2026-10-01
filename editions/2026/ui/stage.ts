import type { CSSProperties } from "react";

/**
 * Figma-coordinate placement for the 2026 artboard (181:182, 1748 wide).
 *
 * Sections are positioned by pasting numbers straight out of Figma -- absolute
 * artboard x/y/width/height -- rather than by converting them by hand. A
 * section declares its own box once with `stage()`; everything inside it is
 * placed with that stage's `at()` in the same artboard coordinates, and comes
 * out as percentages of the section, so it scales with the section and can
 * never drift against its neighbours.
 *
 * theme.css owns what the numbers do: `.stage` and `.at`/`.deco` only become
 * absolute at md and up. Below that, the same elements fall back into normal
 * flow (or vanish, for `.deco`), which is how one DOM serves both layouts.
 */

/** Artboard-space rectangle: [x, y, width, height]. */
export type Box = readonly [x: number, y: number, w: number, h: number];

type Vars = CSSProperties & Record<`--${string}`, string | number>;

export function stage(box: Box) {
  const [sx, sy, sw, sh] = box;

  /** The section element's own style -- its slot on the artboard. */
  const style: Vars = { "--sx": sx, "--sw": sw, "--sh": sh };

  /** Place a child by its artboard rectangle. */
  const at = ([x, y, w, h]: Box, extra?: CSSProperties): Vars => ({
    "--l": `${((x - sx) / sw) * 100}%`,
    "--t": `${((y - sy) / sh) * 100}%`,
    "--w": `${(w / sw) * 100}%`,
    "--h": `${(h / sh) * 100}%`,
    ...extra,
  });

  return { style, at, box: [sx, sy, sw, sh] as const };
}

/**
 * Type sized in artboard pixels: pair with the `.u-text` class. `sm` is the
 * size used below md, where the artboard scale is not in effect; `min` floors
 * the scaled size so prose never shrinks past legible on a small laptop.
 */
export function u(
  size: number,
  opts: { sm?: number; min?: number; lh?: number | string } = {},
): Vars {
  const style: Vars = { "--fs": size };
  if (opts.sm !== undefined) style["--fs-sm"] = `${opts.sm}px`;
  if (opts.min !== undefined) style["--fs-min"] = `${opts.min}px`;
  if (opts.lh !== undefined) style["--lh"] = opts.lh;
  return style;
}
