import Image from "next/image";
import Container from "@/components/ui/Container";
import ExternalLink from "@/components/ui/ExternalLink";
import { site } from "@/content/site";

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
 * Content ends at y=408 but the artboard runs to 900, leaving ~492px of empty
 * purple below. That is reproduced here because it is what the design says, but
 * it is very likely just the artboard height carried over from the other
 * sections -- drop `lg:pb-[492px]` to something smaller if so.
 */
export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-base-purple pb-[80px] pt-[20px] lg:pb-[492px]"
    >
      <Container>
        <p className="mx-auto max-w-[716px] text-center text-section-header font-medium leading-[1.3] tracking-[1.2px]">
          contact us at <span className="font-bold">{site.email}</span>
        </p>

        <div className="mt-[70px] flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-0">
          <ExternalLink
            href={site.duqisUrl}
            label="Duke Quantum Information Society"
            className="shrink-0 rounded-full"
          >
            <Image
              src="/logos/duqis-logo.png"
              alt=""
              width={214}
              height={214}
              className="size-[214px]"
            />
          </ExternalLink>

          <Image
            src="/logos/org-cross.svg"
            alt=""
            width={55}
            height={55}
            className="size-[55px] shrink-0 sm:ml-[12px] sm:mr-[28px]"
            aria-hidden
          />

          <ExternalLink href={site.hackDukeUrl} label="HackDuke" className="shrink-0">
            <Image
              src="/logos/hackduke-logo.svg"
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
