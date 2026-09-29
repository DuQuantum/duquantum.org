import { Fragment } from "react";
import Image from "next/image";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import FaqItem from "../ui/FaqItem";
import { faq, site, type AnswerSegment, type FaqEntry } from "../content";

/**
 * Figma: FAQSection (65:1082), 1440x900.
 *
 * FAQText (65:1103) y=20..349: the `laser` drawing on the left, right-aligned
 * heading and copy on the right. Then a column of `FAQentry` instances starting
 * at y=368, each spanning the full 877 column.
 *
 * The laser (65:1124) is a 261x204 drawing rotated 135deg -- which is exactly
 * why Figma reports its box as 329 square (0.7071 * (261 + 204)). It starts at
 * x=200.67, i.e. 81px left of the 877 column, so it is pinned with a negative
 * offset and the section clips the bleed rather than letting it widen the page.
 *
 * Figma right-aligns this section's text to x=1153 rather than the 1158.33 every
 * other section uses. Matching the column instead keeps the FAQ and About rules
 * flush with each other, which reads worse if it is off by 5px than being 5px
 * off Figma does.
 *
 * Entries are spaced 40px apart rather than on Figma's 174px pitch. That pitch
 * only works because the artboard draws every answer open; collapsed -- which is
 * how the page starts, and how a reader scanning a long list sees it -- the same
 * pitch would leave 143px of empty purple between one-line questions.
 *
 * Answers are segments from content.ts, assembled here rather than inside the
 * accordion: only the open/close needs to be a client component, so the text and
 * its links stay server-rendered.
 */

/** Fallback anchor when an entry does not pin its own `id`. */
function slug(question: string) {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Answer({ segments }: { segments: readonly AnswerSegment[] }) {
  return (
    <>
      {segments.map((segment, i) => {
        if (typeof segment === "string") {
          return <Fragment key={i}>{segment}</Fragment>;
        }

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
            className="underline underline-offset-2 transition-colors hover:text-base-teal focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-base-teal focus-visible:ring-offset-2 focus-visible:ring-offset-base-purple"
          >
            {segment.text}
          </a>
        );
      })}
    </>
  );
}

export default function Faq() {
  return (
    <section
      id="faq"
      className="overflow-hidden bg-base-purple pb-[80px] pt-[60px] lg:pb-[120px] lg:pt-[20px]"
    >
      <Container>
        <div className="relative lg:pt-[141px]">
          <div
            className="absolute -left-[81px] top-0 hidden size-[329px] items-center justify-center lg:flex"
            aria-hidden
          >
            <Image
              src="/editions/placeholder/logos/faq-laser.svg"
              alt=""
              width={261}
              height={204}
              className="rotate-[135deg]"
            />
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-[665px] text-right">
              <SectionLabel ruleWidth={269} gap={20} align="right">
                FAQ
              </SectionLabel>
              <p className="mt-[13px] text-section-body leading-[1.3]">
                These are general FAQs. For more specific questions, please
                email <span className="font-semibold">{site.email}</span>!
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-[40px] space-y-[40px] lg:mt-[54px]">
          {/* Widened to FaqEntry so `id` reads as optional: every entry pins
              one today, but the fallback is what lets a new one omit it. */}
          {faq.map((entry: FaqEntry) => (
            <li key={entry.question}>
              <FaqItem
                id={entry.id ?? slug(entry.question)}
                question={entry.question}
              >
                <Answer segments={entry.answer} />
              </FaqItem>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
