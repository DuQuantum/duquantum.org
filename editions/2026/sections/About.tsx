import Image from "next/image";
import ExternalLink from "@/components/ui/ExternalLink";
import Art, { figma } from "../ui/Art";
import { Crt } from "../ui/Crt";
import RichText from "../ui/RichText";
import { stage, u } from "../ui/stage";
import { about, site } from "../content";

/**
 * Figma: about section (197:11409), plus the MLH logo (224:5) that sits in it
 * on the artboard but outside its group.
 *
 * The left frame is three layers: the dark body (drawn upside-down in Figma,
 * hence the rotation), the red header band carrying ABOUT, and the red foot.
 * The isometric chip on the right is one exported illustration.
 */
const S = stage([121, 1722, 1504, 769]);

const BODY = [124, 1728, 827, 754] as const;
const CHIP = [748, 1723, 876.5, 767.5] as const;

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="stage panel-sm mt-10 p-6 md:mt-[calc(110*var(--u))] md:p-0"
      style={S.style}
    >
      <Art
        src="about/frame-body.svg"
        style={S.at(BODY, { transform: "rotate(180deg)" })}
      />
      <Crt
        style={S.at(BODY, { transform: "rotate(180deg)" })}
        mask="masks/about-body.svg"
      />
      <Art src="about/chip.svg" style={S.at(CHIP)} />
      <Crt style={S.at(CHIP)} mask="masks/about-chip.svg" />
      <Art src="about/frame-top.svg" style={S.at([122.5, 1722, 746.5, 290.95])} />
      <Art src="about/frame-bottom.svg" style={S.at([121, 2365.8, 758.5, 119.16])} />

      <h2
        id="about-heading"
        className="at u-text text-heading font-display leading-none md:flex md:items-center md:justify-center"
        style={{ ...S.at([480, 1764, 413, 120]), ...u(96, { sm: 48 }) }}
      >
        ABOUT
      </h2>

      <div
        className="at u-text mt-6 space-y-[1.05em] md:mt-0 md:flex md:flex-col md:justify-center md:space-y-0"
        style={{
          ...S.at([215, 1958, 560, 294]),
          ...u(18, { sm: 15, min: 13, lh: 1.0547 }),
        }}
      >
        {about.map((paragraph, i) => (
          <p key={i}>
            <RichText segments={paragraph} />
          </p>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-6 md:contents">
        <ExternalLink
          href={site.mlhUrl}
          label="Major League Hacking"
          className="at max-md:w-[150px]"
          // 224:5 -- MLH's black logo, recoloured gold in the mockup
          style={S.at([215, 2301, 231, 98])}
        >
          <Image
            src={figma("about/mlh.svg")}
            alt=""
            width={231}
            height={98}
            unoptimized
            className="h-auto w-full"
          />
        </ExternalLink>

        <ExternalLink
          href={site.qiskitFallFestUrl}
          label="Qiskit Fall Fest 2026"
          className="at max-md:w-[110px]"
          style={S.at([557, 2258, 172.4, 166])}
        >
          <Image
            src={figma("about/qiskit.png")}
            alt=""
            width={400}
            height={385}
            className="h-auto w-full rotate-[-0.85deg]"
          />
        </ExternalLink>
      </div>
    </section>
  );
}
