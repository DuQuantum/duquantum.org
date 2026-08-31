import Image from "next/image";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import { site } from "../content";

/**
 * Figma: FAQSection (65:1082), 1440x900.
 *
 * FAQText (65:1103) y=20..352: the `laser` drawing on the left, right-aligned
 * heading and copy on the right. Then a row of four `pfpWhiteSmall` marks at
 * y=542 on the same four-column grid the organizers use.
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
 */
export default function Faq() {
  return (
    <section
      id="faq"
      className="overflow-hidden bg-base-purple pb-[80px] pt-[60px] lg:pb-[211px] lg:pt-[20px]"
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
            <div className="w-full max-w-[459px] text-right">
              <SectionLabel ruleWidth={269} gap={20} align="right">
                FAQ
              </SectionLabel>
              <p className="mt-[20px] text-section-body font-semibold leading-[1.3]">
                Coming soon!{" "}
                <span className="font-normal">
                  For now, direct questions about the event and application to
                </span>{" "}
                {site.email}.
              </p>
            </div>
          </div>
        </div>

        {/* pfpWhiteSmall row (y=542). The mark's stroke bleeds 9px wide and 4px
            tall past the 147 node box, so the asset is 165x155 and is nudged
            back by that much inside a box kept at Figma's 147. */}
        <div
          className="mt-[60px] grid grid-cols-2 justify-items-center gap-y-10 sm:grid-cols-4 lg:mt-[190px] lg:gap-x-[95px]"
          aria-hidden
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative size-[147px]">
              <Image
                src="/editions/placeholder/logos/pfp-white-small.svg"
                alt=""
                width={165}
                height={155}
                className="absolute -left-[9px] -top-[4px] max-w-none"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
