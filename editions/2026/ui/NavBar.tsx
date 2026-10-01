"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import Scope from "./Scope";

/**
 * A terminal-prompt nav bar, pinned to the top. It stays folded away while
 * the page sits at the very top, so the hero opens clean, and prints itself
 * open as soon as the reader starts scrolling -- theme.css `.nav-fold`.
 *
 * The current section is highlighted, observed rather than computed from
 * offsets, so it stays right through resizes and the FAQ opening and closing.
 *
 * The bar starts past the MLH badge's band on the left (the badge hangs over
 * the top-left corner, above everything), so the two never overlap.
 */
const LINKS = [
  { id: "about", label: "about" },
  { id: "schedule", label: "schedule" },
  { id: "sponsors", label: "sponsors" },
  { id: "speakers", label: "speakers" },
  { id: "organizers", label: "organizers" },
  { id: "faq", label: "faq" },
  { id: "contact", label: "contact" },
] as const;

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Fold out as soon as scrolling starts (a few px of slack, so a trackpad
  // nudge at the top does not flicker it).
  useEffect(() => {
    const onScroll = () => setOpen(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // The section crossing the middle of the viewport is the current one.
  useEffect(() => {
    const targets = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      data-open={open}
      className="nav-fold fixed inset-x-0 top-0 z-[9500] border-b-[3px] border-dq-red bg-dq-panel/95 backdrop-blur-[2px]"
    >
      <div aria-hidden className="crt absolute inset-0" />
      <div className="relative flex items-center gap-4 py-2.5 pl-[calc(var(--mlh-badge-inset)+var(--mlh-badge-width)+1rem)] pr-4 font-mono text-[13px] md:gap-6 md:pr-8 md:text-[15px]">
        <a
          href="#hero"
          className="hidden shrink-0 text-dq-amber transition-colors hover:text-dq-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow sm:block"
        >
          <span className="text-dq-red">duquantum@duke</span>:~$
        </a>

        <ul className="flex min-w-0 flex-1 items-center gap-x-4 overflow-x-auto min-[1400px]:flex-none [scrollbar-width:none] md:gap-x-6 [&::-webkit-scrollbar]:hidden">
          {LINKS.map(({ id, label }) => {
            const current = active === id;
            return (
              <li key={id} className="shrink-0">
                <a
                  href={`#${id}`}
                  aria-current={current ? "location" : undefined}
                  className={cn(
                    "whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow",
                    current
                      ? "text-dq-yellow"
                      : "text-dq-amber/70 hover:text-dq-yellow",
                  )}
                >
                  <span aria-hidden className={current ? "text-dq-red" : "opacity-0"}>
                    &gt;
                  </span>
                  ./{label}
                  {current && <span aria-hidden className="caret" />}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Fills the bar's empty right end, taking whatever the links leave
            (120-260px); below 1400px wide the links need the whole bar. */}
        <Scope className="ml-auto hidden min-w-[120px] max-w-[260px] flex-1 min-[1400px]:flex" />
      </div>
    </nav>
  );
}
