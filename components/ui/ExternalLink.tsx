import { cn } from "@/lib/cn";

/**
 * An anchor to somewhere off-site, styled the way the organizer headshots are:
 * a small opacity shift on hover (the design specifies no hover state, but an
 * image that is secretly clickable needs some hint) and the site's teal focus
 * ring.
 *
 * `label` is required rather than optional because every use so far wraps an
 * image carrying `alt=""` -- the name always sits in adjacent text, so without a
 * label here the link would announce as blank. It also spells out the new tab,
 * which is otherwise an unannounced context switch.
 *
 * Note this deliberately sets no `position`: `cn` is a plain join, so a
 * `relative` here would silently beat any `absolute` a caller passes (Tailwind
 * emits `.relative` after `.absolute`). See ApplyButton for that bug in the wild.
 */
export default function ExternalLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className={cn(
        "block transition-opacity hover:opacity-80",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-base-teal focus-visible:ring-offset-4 focus-visible:ring-offset-base-purple",
        className,
      )}
    >
      {children}
    </a>
  );
}
