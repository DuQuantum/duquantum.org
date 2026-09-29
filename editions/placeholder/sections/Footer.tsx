import Image from "next/image";
import Container from "../ui/Container";
import ExternalLink from "@/components/ui/ExternalLink";
import { site } from "../content";

/**
 * Figma: FooterSection (65:1160), 1440x900.
 *
 * The contact line (65:1158) is centred, 716 wide, and wraps to two lines --
 * "contact us at" then the address, which is deterministic at that width since
 * the two together overrun it. orgLogos (65:1258) is a centred row sharing one
 * baseline at y=301: DuQIS 214 square, the crossed circle, then HackDuke 230x136.
 *
 * The gaps either side of the crossed circle are not equal in Figma (12 left, 28
 * right), so they are set explicitly rather than with one `gap`.
 *
 * The row of four `pfpWhiteSmall` marks at the top (y=107) used to sit in the
 * FAQ section and moved here when that section was rebuilt around the
 * accordion. They are decoration, hence `aria-hidden`.
 *
 * Content now ends at y=756 of the 900 artboard, so the trailing space below is
 * 144px rather than the ~492px this footer carried when it began at y=368.
 */
export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-base-purple pb-[80px] pt-[60px] lg:pb-[144px] lg:pt-[107px]"
    >
      <Container>
        {/* pfpWhiteSmall row (y=107). The mark's stroke bleeds 9px wide and 4px
            tall past the 147 node box, so the asset is 165x155 and is nudged
            back by that much inside a box kept at Figma's 147. */}
        <div
          className="grid grid-cols-2 justify-items-center gap-y-10 sm:grid-cols-4 lg:gap-x-[95px]"
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

        <p className="mx-auto mt-[60px] max-w-[716px] text-center text-section-header font-medium leading-[1.3] tracking-[1.2px] lg:mt-[114px]">
          contact us at <span className="font-bold">{site.email}</span>
        </p>

        <div className="mt-[70px] flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-0">
          <ExternalLink
            href={site.duqisUrl}
            label="Duke Quantum Information Society"
            className="shrink-0 rounded-full"
          >
            <Image
              src="/editions/placeholder/logos/duqis-logo.png"
              alt=""
              width={214}
              height={214}
              className="size-[214px]"
            />
          </ExternalLink>

          <Image
            src="/editions/placeholder/logos/org-cross.svg"
            alt=""
            width={55}
            height={55}
            className="size-[55px] shrink-0 sm:ml-[12px] sm:mr-[28px]"
            aria-hidden
          />

          <ExternalLink href={site.hackDukeUrl} label="HackDuke" className="shrink-0">
            <Image
              src="/editions/placeholder/logos/hackduke-logo.svg"
              alt=""
              width={230}
              height={136}
              className="h-[136px] w-[230px]"
            />
          </ExternalLink>
        </div>
      </Container>
    </footer>
  );
}
