import { Fragment } from "react";
import type { Segment } from "../content";

/**
 * Renders the `Segment` lists in content.ts -- prose that needs a link or an
 * emphasised phrase inside it, without content.ts having to hold markup.
 *
 * Deliberately a server component with no state, so the sections that use it can
 * be client components (the FAQ accordion, the speaker carousel) while their
 * text still renders on the server and ships in the HTML.
 *
 * Emits no wrapper of its own -- the caller owns the <p>, its size and its
 * alignment, which is why the same component serves an 18px centred answer and
 * a right-aligned bio.
 */
export default function RichText({
  segments,
}: {
  segments: readonly Segment[];
}) {
  return (
    <>
      {segments.map((segment, i) => {
        if (typeof segment === "string") {
          return <Fragment key={i}>{segment}</Fragment>;
        }

        const body = segment.bold ? (
          <strong className="font-bold">{segment.text}</strong>
        ) : (
          segment.text
        );

        if (!segment.href) return <Fragment key={i}>{body}</Fragment>;

        // Same test as ApplyButton: a mailto: should not spawn a tab, and
        // saying "opens in a new tab" about one would be a lie.
        const external = /^https?:/.test(segment.href);
        // `label` covers link text that is meaningless out of context -- a
        // screen reader listing the page's links reads "here" as just "here".
        const name = segment.label ?? segment.text;

        return (
          <a
            key={i}
            href={segment.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={
              external ? `${name} (opens in a new tab)` : segment.label
            }
            className="underline underline-offset-2 transition-colors decoration-dq-red decoration-2 hover:text-dq-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow"
          >
            {body}
          </a>
        );
      })}
    </>
  );
}
