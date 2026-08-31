import Image from "next/image";
import ExternalLink from "@/components/ui/ExternalLink";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import ApplyButton from "../ui/ApplyButton";
import { site } from "../content";

/**
 * Figma: AboutSection (5:18), 1440x900 -- two blocks on one artboard.
 *
 * ApplicationText (14:389) y=20..282: heading + deadlines on the left, with a
 * circuit that now runs *through* the apply button -- a control/target pair at
 * x=759 feeding in from the left and a mirrored pair at x=1099 carrying on to
 * the column edge. The wire passes behind the button, so the whole circuit stays
 * one SVG and the button is layered over it; that works here (unlike the top
 * bar's transparent H gate) because the button is opaque.
 *
 * AboutText (14:388) y=368..802: the colorCode graphic on the left, right-aligned
 * copy on the right. The Qiskit Fall Fest badge (60:1007) is a 143px circle at
 * y=716 -- a sibling of AboutText on the artboard, but positioned inside it here
 * since it shares the column's left edge. It overflows the frame by 57px, which
 * the section's bottom padding absorbs.
 *
 * The badge is real content rather than decoration, so unlike colorCode it stays
 * visible on narrow screens: static in flow there, absolute from `lg` up. That
 * relies on `.absolute` being emitted before `.relative` in Tailwind's output, so
 * the `lg:` variant inside its media query wins -- see ApplyButton for the same
 * trap biting the other way.
 *
 * Offsets below are Figma's own px, measured from each frame's top-left. That is
 * exact rather than fragile because --container-max reserves the gutter *outside*
 * the 877 column, so from `lg` up the column is always exactly 877 wide. Both
 * decorations are lg-only; below that they would collide with the text.
 */
export default function About() {
  return (
    <section id="about" className="bg-base-purple pb-[80px] pt-[60px] lg:pb-[98px] lg:pt-[20px]">
      <Container>
        {/* ApplicationText (14:389) */}
        <div className="relative">
          <Image
            src="/editions/placeholder/logos/about-circuit.svg"
            alt=""
            width={583}
            height={141}
            className="absolute left-[294px] top-[33px] hidden lg:block"
            aria-hidden
          />
          <ApplyButton className="absolute left-[522px] top-0 hidden lg:block" />

          <div className="lg:pt-[87px]">
            <SectionLabel ruleWidth={269}>Application</SectionLabel>
            <ul className="mt-[34px] list-disc space-y-0 pl-[39px] text-section-body font-semibold leading-[1.3] marker:text-base-white">
              {site.deadlines.map((deadline) => (
                <li key={deadline.label}>
                  {deadline.label}:{" "}
                  <span className="font-normal">{deadline.date}</span>
                </li>
              ))}
            </ul>
          </div>

          <ApplyButton className="mt-10 lg:hidden" />
        </div>

        {/* AboutText (14:388) */}
        <div className="relative mt-[86px]">
          <Image
            src="/editions/placeholder/logos/color-code.svg"
            alt=""
            width={223}
            height={217}
            className="absolute left-0 top-0 hidden lg:block"
            aria-hidden
          />

          <div className="flex justify-end lg:pt-[57px]">
            <div className="w-full max-w-[677px] text-right">
              <SectionLabel ruleWidth={269} gap={20} align="right">
                About
              </SectionLabel>
              <div className="mt-[20px] space-y-[31px] text-section-body leading-[1.3]">
                <p>
                  <strong className="font-semibold">DuQuantum</strong> is the
                  first annual,{" "}
                  <strong className="font-semibold">in-person</strong> quantum
                  computing hackathon at{" "}
                  <strong className="font-semibold">Duke</strong>. For 24 hours,
                  we invite quantum enthusiasts to tackle challenges designed by
                  industry leaders and gain experience with state-of-the-art
                  quantum tools. All{" "}
                  <strong className="font-semibold">
                    undergrads, Master&rsquo;s
                  </strong>{" "}
                  and <strong className="font-semibold">PhD students</strong> are
                  eligible.
                </p>
                <p>
                  The event is jointly hosted by the{" "}
                  <strong className="font-semibold">
                    Duke Quantum Information Society (DuQIS)
                  </strong>{" "}
                  and <strong className="font-semibold">HackDuke.</strong> We are
                  also pleased to be recognized as a{" "}
                  <strong className="font-semibold">
                    2026 Qiskit Fall Fest Event
                  </strong>
                  !
                </p>
              </div>
            </div>
          </div>

          <ExternalLink
            href={site.qiskitFallFestUrl}
            label="2026 Qiskit Fall Fest event"
            className="mt-10 size-[143px] rounded-full lg:absolute lg:left-0 lg:top-[348px] lg:mt-0"
          >
            <Image
              src="/editions/placeholder/logos/qiskit-fall-fest.png"
              alt=""
              width={143}
              height={143}
              className="size-full"
            />
          </ExternalLink>
        </div>
      </Container>
    </section>
  );
}
