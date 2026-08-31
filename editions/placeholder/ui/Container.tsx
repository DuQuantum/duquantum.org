import { cn } from "@/lib/cn";

/**
 * Horizontal content rule for the whole site. On the 1440 Figma artboard the
 * content sits between x=281.33 and x=1158.33 -- an 877px column (Figma's
 * `StandardContentWidth`) centred in the frame. `--container-max` adds the
 * gutter on top of that, so the column itself is exactly 877 once the viewport
 * clears 925px; below that the gutter keeps it off the screen edges.
 */
export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-container px-gutter", className)}>
      {children}
    </div>
  );
}
