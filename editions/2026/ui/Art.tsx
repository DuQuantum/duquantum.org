import Image from "next/image";
import { cn } from "@/lib/cn";

/** Public path of an asset exported from the Figma file. */
export const figma = (path: string) => `/editions/2026/figma/${path}`;

/**
 * A decorative layer exported from Figma, stretched over its artboard box.
 * Always `.deco`: it exists only at md and up, where the section is drawn on
 * the artboard, and is hidden from assistive tech either way.
 *
 * `fill` + `unoptimized` because these are SVGs whose box is the layout --
 * there is no intrinsic size to respect and nothing for the optimiser to do.
 */
export default function Art({
  src,
  style,
  className,
  priority,
}: {
  src: string;
  style: React.CSSProperties;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div aria-hidden className={cn("deco", className)} style={style}>
      <Image
        src={figma(src)}
        alt=""
        fill
        unoptimized
        priority={priority}
        className="object-fill"
      />
    </div>
  );
}
