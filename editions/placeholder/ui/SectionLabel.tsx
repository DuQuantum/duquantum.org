import { cn } from "@/lib/cn";

/**
 * The repeated "teal rule above a heading" pattern (Figma: "Rectangle 14" +
 * section title). Rule width and the gap below it vary per section, so both
 * are props rather than baked in.
 *
 * `leading-[1.3]` is Figma's auto line height for IBM Plex Sans. It matters here
 * because `gap` is measured from the rule to the top of Figma's *text box*, not
 * to the cap line -- with `leading-none` the box would be 40px instead of 52 and
 * every heading would ride ~6px high.
 */
export default function SectionLabel({
  children,
  ruleWidth,
  gap = 21,
  align = "left",
  className,
}: {
  children: React.ReactNode;
  ruleWidth: number;
  gap?: number;
  align?: "left" | "right" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "right" && "items-end",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div
        className="h-1.5 max-w-full bg-base-teal"
        style={{ width: ruleWidth }}
      />
      <h2
        className="text-section-header font-semibold leading-[1.3]"
        style={{ marginTop: gap }}
      >
        {children}
      </h2>
    </div>
  );
}
