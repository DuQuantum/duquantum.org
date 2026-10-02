import Art from "../ui/Art";
import FaqItem from "../ui/FaqItem";
import RichText from "../ui/RichText";
import { stage, u } from "../ui/stage";
import { faq, site, type FaqEntry } from "../content";

/**
 * Figma: faq section (243:360) -- only the gradient tab carrying "FAQ" is
 * drawn. The questions hang below it in a panel in the house style: the
 * panel purple inside a red rule, as a terminal listing (ui/FaqItem.tsx).
 *
 * The tab is a fixed artboard box; the list is flow content, so its height is
 * whatever the open answers need.
 */
const TAB = stage([929.5, 7542.5, 701.5, 217]);

/** Fallback anchor when an entry does not pin its own `id`. */
function slug(question: string) {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mt-16 md:mt-[calc(10*var(--u))]"
    >
      <div className="stage" style={TAB.style}>
        <Art src="faq/tab.svg" style={TAB.at([929.5, 7542.5, 701.5, 217])} />
        <h2
          id="faq-heading"
          className="at u-text font-display leading-none text-dq-yellow md:flex md:items-center md:justify-center md:pl-[calc(270*var(--u))] md:pt-[calc(40*var(--u))] md:text-dq-night"
          style={{ ...TAB.at([929.5, 7542.5, 701.5, 217]), ...u(110, { sm: 48 }) }}
        >
          FAQ
        </h2>
      </div>

      {/* 123..1631, the organizers board's width; the red rule meets the
          tab's foot. */}
      <div
        className="relative mx-4 mt-4 border-[6px] border-dq-red bg-dq-panel px-5 py-8 md:mx-0 md:ml-[calc(123*var(--u))] md:mt-[calc(-4*var(--u))] md:w-[calc(1508*var(--u))] md:border-[calc(10*var(--u))] md:px-[calc(90*var(--u))] md:py-[calc(70*var(--u))]"
      >
        <div aria-hidden className="crt absolute inset-0" />

        <p
          className="u-text relative font-light text-dq-amber"
          style={u(22, { sm: 14, min: 13, lh: 1.4 })}
        >
          <span aria-hidden className="text-dq-red">
            ${" "}
          </span>
          These are general FAQs. For more specific questions, email{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-bold text-dq-yellow underline decoration-dq-red decoration-2 underline-offset-4 hover:text-dq-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow"
          >
            {site.email}
          </a>
          !
        </p>

        <ul
          className="u-text relative mt-8 divide-y-2 divide-dashed divide-dq-red/70 md:mt-[calc(50*var(--u))]"
          style={u(26, { sm: 15, min: 14 })}
        >
          {faq.map((entry: FaqEntry) => (
            <li key={entry.question} className="py-4 md:py-[calc(26*var(--u))]">
              <FaqItem id={entry.id ?? slug(entry.question)} question={entry.question}>
                <RichText segments={entry.answer} />
              </FaqItem>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
