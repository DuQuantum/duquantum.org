import Image from "next/image";
import ExternalLink from "@/components/ui/ExternalLink";
import Art from "../ui/Art";
import { Crt } from "../ui/Crt";
import { stage, u } from "../ui/stage";
import { site } from "../content";

/**
 * Figma: footer container (243:366) -- a full-width rail with a bevelled
 * plate in the middle, holding DuQuantum × HackDuke and the contact address.
 * The plate's inner edge runs x=170..1573, y=8194..8492 on the artboard.
 */
const S = stage([-7, 8189, 1762.5, 313]);
const FRAME = [-7, 8189, 1762.5, 313] as const;

export default function Footer() {
  return (
    <footer
      id="contact"
      className="stage panel-sm mb-10 mt-16 px-5 py-8 md:mb-[calc(80*var(--u))] md:mt-[calc(180*var(--u))] md:p-0"
      style={S.style}
    >
      <Art src="footer/frame.svg" style={S.at(FRAME)} />
      <Crt style={S.at(FRAME)} mask="masks/footer.svg" />

      <div
        className="at flex flex-col items-center justify-center gap-6 text-center md:flex-row md:gap-[calc(70*var(--u))]"
        style={S.at([250, 8214, 1250, 258])}
      >
        <ExternalLink
          href={site.duqisUrl}
          label="Duke Quantum Information Society"
          className="hidden shrink-0 rounded-full md:block"
        >
          <Image
            src="/editions/2026/logos/duqis-logo.png"
            alt=""
            width={214}
            height={214}
            className="size-[calc(150*var(--u))]"
          />
        </ExternalLink>

        <div>
          <p
            className="u-text whitespace-nowrap font-display leading-none text-dq-yellow"
            style={u(72, { sm: 34 })}
          >
            DuQuantum{" "}
            {/* the display face has no multiplication sign */}
            <span className="font-mono text-[0.8em] text-dq-red">×</span> HackDuke
          </p>
          <p
            className="u-text mt-3 font-light text-dq-amber md:mt-[calc(22*var(--u))]"
            style={u(26, { sm: 14, min: 13 })}
          >
            contact us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-bold text-dq-yellow underline decoration-dq-red decoration-2 underline-offset-4 hover:text-dq-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow"
            >
              {site.email}
            </a>
          </p>
        </div>

        <ExternalLink
          href={site.hackDukeUrl}
          label="HackDuke"
          className="hidden shrink-0 md:block"
        >
          <Image
            src="/editions/2026/logos/hackduke-logo.svg"
            alt=""
            width={230}
            height={136}
            className="h-auto w-[calc(200*var(--u))]"
          />
        </ExternalLink>
      </div>
    </footer>
  );
}
