"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import Art from "../ui/Art";
import { Crt } from "../ui/Crt";
import RichText from "../ui/RichText";
import { stage, u, type Box } from "../ui/stage";
import { clock, layoutDay, type Placed } from "../ui/schedule";
import {
  schedule,
  scheduleDays,
  type ScheduleDay,
} from "../content";

/**
 * Figma: schedule section (193:11292).
 *
 * The frame, tabs, corner plate and lights are the mockup's; the grid inside
 * is not a copy of its hand-placed boxes but a real quarter-hour CSS grid fed
 * from content.ts (layout in ui/schedule.ts). Columns follow the mockup's
 * faint grid: a time column, then six equal columns, with each block two
 * columns wide -- three lanes for overlapping events.
 *
 * Below md the frame drops away and the grid keeps a fixed minimum width
 * inside a horizontal scroller, with the time column sticky on the left so
 * the hours stay readable while the lanes slide under them.
 */
const S = stage([85, 2649, 1563, 1338]);

const FRAME: Box = [85, 2768, 1558, 1214];
/** The grid: 9:00 (or the day's first hour) at y=2866, as in the mockup;
 *  ending clear of the corner plate. */
const GRID: Box = [238, 2866, 1387, 1034];
/** The grid's box as a fraction of the frame's, for placing it inside the
 *  frame-sized panel (md and up -- below that the grid is in normal flow). */
const pct = (n: number) => `${n * 100}%`;
const GRID_IN_FRAME = {
  ["--gl" as string]: pct((GRID[0] - FRAME[0]) / FRAME[2]),
  ["--gt" as string]: pct((GRID[1] - FRAME[1]) / FRAME[3]),
  ["--gw" as string]: pct(GRID[2] / FRAME[2]),
  ["--gh" as string]: pct(GRID[3] / FRAME[3]),
};

/** Column widths in artboard px: time, then six lanes-halves. */
const TIME_COL = 247;
/** Every block's title and location, in artboard px. */
const BLOCK_TEXT = 19;
const LANE_COL = 190;

/** Tab slots (193:11373-75). The day tabs swap between the filled and the
 *  outline drawing. Figma draws the outline ~5% narrower, which made the
 *  spacing shift when the active day changed, so here both share one tab
 *  footprint (474 wide at the base, the filled tab's) and the slots sit on
 *  one pitch: each tab overlaps the one before it by the same 78px. */
const TAB_W = 474;
const TAB_OVERLAP = 78;
const TAB_X: Record<ScheduleDay, number> = {
  sat: 471.5,
  sun: 471.5 + TAB_W - TAB_OVERLAP,
};
/** The filled drawing carries its drop shadow, hence the larger box. */
const filled = (x: number): Box => [x, 2649, 489.1, 132];
const outline = (x: number): Box => [x, 2649, TAB_W, 124];

/** Cap-centred tab text. The display face sets its capitals ~0.1em above the
 *  middle of the line box, and the frame's top edge covers the tabs' bottom
 *  ~13px, so the text drops 0.1em and rises 6px to sit in the visible middle. */
const TAB_TEXT =
  "inline-block translate-y-[0.1em] md:translate-y-[calc(0.1em_-_6*var(--u))]";

/** Top-right lights (241:217): yellow ones flicker, red ones hold. */
const LIGHTS = [
  { x: 1432, y: 2828, on: true, period: 3.7, delay: 0 },
  { x: 1488.25, y: 2828, on: false },
  { x: 1544.5, y: 2828, on: true, period: 4.9, delay: -1.3 },
  { x: 1432, y: 2884.25, on: false },
  { x: 1488.25, y: 2856.13, on: true, period: 3.1, delay: -2.2 },
  { x: 1544.5, y: 2856.13, on: false },
] as const;

function Tab({
  day,
  label,
  active,
  onSelect,
  onKey,
  panelId,
}: {
  day: ScheduleDay;
  label: string;
  active: boolean;
  onSelect: () => void;
  onKey: (e: React.KeyboardEvent) => void;
  panelId: string;
}) {
  const x = TAB_X[day];
  return (
    <>
      <Art
        src={active ? "schedule/tab-filled.svg" : "schedule/tab-outline.svg"}
        style={S.at(active ? filled(x) : outline(x), { zIndex: active ? 1 : 0 })}
      />
      <button
        type="button"
        role="tab"
        id={`tab-${day}`}
        aria-selected={active}
        aria-controls={panelId}
        tabIndex={active ? 0 : -1}
        onClick={onSelect}
        onKeyDown={onKey}
        className={cn(
          "at u-text font-display leading-none transition-colors",
          "px-4 py-2 md:flex md:items-center md:justify-center md:p-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow",
          active
            ? "bg-dq-yellow text-dq-ink md:bg-transparent"
            : "border-2 border-dq-red text-dq-red hover:text-dq-amber md:border-0",
        )}
        style={{ ...S.at(outline(x), { zIndex: 3 }), ...u(80, { sm: 26 }) }}
      >
        <span className={TAB_TEXT}>{label.toUpperCase()}</span>
      </button>
    </>
  );
}

function Block({
  item,
  open,
  onToggle,
  detailsId,
}: {
  item: Placed;
  open: boolean;
  onToggle: () => void;
  detailsId: string;
}) {
  const { event, rowStart, rowEnd, lane, openEnded } = item;
  const milestone = event.kind === "milestone";
  const rows = rowEnd - rowStart;
  // Only blocks with details open a card (and wear the +). A location cut
  // short on a narrow screen is still readable in the tooltip.
  const interactive = Boolean(event.details);

  // One text size for every block. With 5px borders, a one-hour block has
  // room for two lines of title and one of location (3 x 19 x 1.25 = 71 of
  // its ~76px inside), and a half-hour milestone for one line -- so text fits by construction, and the titles
  // and locations are capped at those line counts so it stays that way.
  const text = u(BLOCK_TEXT, { sm: 13, lh: 1.25 });

  const body = (
    <>
      <span
        className={cn(
          "u-text relative font-medium",
          milestone ? "block tracking-wide" : "line-clamp-2",
        )}
        style={text}
      >
        {event.title}
      </span>
      {event.location && rows >= 3 && (
        <span
          className="u-text relative mt-[0.15em] block w-full truncate font-light"
          title={event.location}
          style={text}
        >
          {event.location}
        </span>
      )}
      {interactive && (
        <span
          aria-hidden
          className="u-text absolute bottom-[0.1em] right-[0.35em] font-bold opacity-70"
          style={u(16, { sm: 11 })}
        >
          {open ? "−" : "+"}
        </span>
      )}
    </>
  );

  const edge = "border-[length:max(2px,calc(5*var(--u)))]";
  const skin = milestone
    ? "bg-[rgb(224_178_109/0.69)] border-dq-yellow"
    : "bg-dq-event/[0.58] border-dq-event-edge";

  const className = cn(
    "relative z-[1] flex flex-col items-center overflow-hidden px-[0.5em] text-center",
    !openEnded && edge,
    milestone ? "text-dq-panel" : "text-dq-amber",
    // Open-ended: the box fades out down the grid, the text does not -- so
    // the fill and border live on a masked layer behind it instead.
    openEnded
      ? "justify-start pt-[0.6em]"
      : skin,
    interactive &&
      "cursor-pointer transition-colors hover:border-dq-yellow/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow",
    open && !openEnded && "border-dq-yellow/80",
  );

  const fade = openEnded && (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_40%,transparent)]",
        edge,
        skin,
        open && "border-dq-yellow/80",
      )}
    />
  );

  const style = {
    gridRow: `${rowStart} / ${rowEnd}`,
    gridColumn: `${lane * 2 + 2} / span 2`,
    // `safe`: if text ever overflows, it is trimmed at the bottom and never
    // pushed up past the top edge. (Set here: Tailwind will not emit it.)
    ...(openEnded ? {} : { justifyContent: "safe center" }),
  };

  return interactive ? (
    <button
      type="button"
      className={className}
      style={style}
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={detailsId}
    >
      {fade}
      {body}
    </button>
  ) : (
    <div className={className} style={style}>
      {fade}
      {body}
    </div>
  );
}

/** The terminal-style card that opens beside a block. */
function Details({
  item,
  rows,
  id,
  onClose,
}: {
  item: Placed;
  rows: number;
  id: string;
  onClose: () => void;
}) {
  const { event, rowStart, lane } = item;
  // Beside the block: to the right of the first lane, to the left of any
  // other, so it never reaches the frame's right edge. In the lower half of
  // the day it hangs upward from the block's top instead, clear of the
  // bottom edge and the corner plate.
  const col = lane === 0 ? 4 : lane * 2;
  const low = rowStart > rows / 2;

  return (
    <div
      id={id}
      role="region"
      aria-label={`${event.title} details`}
      className="relative z-10 border-[length:max(2px,calc(5*var(--u)))] border-dq-yellow bg-dq-panel p-[1em] text-left text-dq-amber shadow-[0_0_0_4px_rgb(var(--dq-panel)),0_12px_40px_rgb(0_0_0/0.6)]"
      style={{
        gridRow: low ? `${rowStart - 1} / ${rowStart}` : `${rowStart} / span 1`,
        alignSelf: low ? "end" : "start",
        gridColumn: `${col} / span 2`,
        ...u(19, { sm: 12, min: 12, lh: 1.35 }),
      }}
    >
      <p className="u-text font-bold text-dq-yellow" style={u(19, { sm: 12, min: 12 })}>
        <span aria-hidden className="text-dq-red">&gt; </span>
        {event.title}
      </p>
      <p className="u-text mt-[0.35em] font-light opacity-90" style={u(19, { sm: 12, min: 12 })}>
        {item.when}
        {event.location ? ` · ${event.location}` : ""}
      </p>
      {event.details && (
        <p className="u-text mt-[0.7em]" style={u(19, { sm: 12, min: 12, lh: 1.35 })}>
          <RichText segments={event.details} />
        </p>
      )}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close details"
        className="u-text absolute right-[0.4em] top-[0.2em] font-bold text-dq-red hover:text-dq-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-yellow"
        style={u(26, { sm: 16, min: 14 })}
      >
        ×
      </button>
    </div>
  );
}

export default function Schedule() {
  const [day, setDay] = useState<ScheduleDay>("sat");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const panelId = useId();
  const gridRef = useRef<HTMLDivElement>(null);

  const layout = layoutDay(schedule, day);
  const keyOf = (p: Placed) => `${p.event.day}-${p.event.start}-${p.event.title}`;
  const openItem = layout.placed.find((p) => keyOf(p) === openKey);

  // Escape or a click elsewhere closes the open card.
  useEffect(() => {
    if (!openKey) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenKey(null);
    const onDown = (e: PointerEvent) => {
      if (!gridRef.current?.contains(e.target as Node)) setOpenKey(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openKey]);

  const select = (next: ScheduleDay) => {
    setDay(next);
    setOpenKey(null);
  };

  // Arrow keys move between the day tabs (WAI-ARIA tabs pattern).
  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const i = scheduleDays.findIndex((d) => d.id === day);
    const next = scheduleDays[(i + (e.key === "ArrowRight" ? 1 : -1) + scheduleDays.length) % scheduleDays.length];
    select(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  const columns = `${TIME_COL}fr repeat(6, ${LANE_COL}fr)`;

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="stage mt-16 md:mt-[calc(160*var(--u))]"
      style={S.style}
    >
      {/* The label tab (always lit) and the two day tabs, as drawn: day tabs
          tuck under the label tab, the active one over the inactive one. */}
      <Art src="schedule/tab-label.svg" style={S.at([115.6, 2649, 448.4, 132], { zIndex: 2 })} />
      <h2
        id="schedule-heading"
        className="at u-text mb-4 font-display leading-none text-dq-yellow md:mb-0 md:flex md:items-center md:justify-center md:text-dq-ink"
        style={{ ...S.at([110, 2649, 444, 124], { zIndex: 3 }), ...u(80, { sm: 40 }) }}
      >
        <span className={TAB_TEXT}>SCHEDULE</span>
      </h2>
      <div
        role="tablist"
        aria-label="Schedule day"
        className="flex gap-3 md:contents"
      >
        {scheduleDays.map((d) => (
          <Tab
            key={d.id}
            day={d.id}
            label={d.label}
            active={day === d.id}
            onSelect={() => select(d.id)}
            onKey={onTabKey}
            panelId={panelId}
          />
        ))}
      </div>

      {/* The frame sits over the tabs, so their feet tuck under its top edge. */}
      <Art src="schedule/frame.svg" style={S.at(FRAME, { zIndex: 4 })} />
      <Crt style={S.at(FRAME, { zIndex: 5 })} mask="masks/schedule.svg" />

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`tab-${day}`}
        // The panel spans the whole frame and is clipped to its dark interior;
        // the grid sits inside it at its own artboard box. Everything that
        // reaches past the grid -- the first hour label, lines running out to
        // the frame, the details card -- is still inside the clipped box.
        className="at panel-sm schedule-clip z-[6] mt-4 overflow-x-auto max-md:relative md:mt-0 md:overflow-visible"
        style={S.at(FRAME)}
      >
        <div
          ref={gridRef}
          className="relative grid h-[calc(var(--rows)*16px)] min-w-[720px] md:absolute md:left-[var(--gl)] md:top-[var(--gt)] md:h-[var(--gh)] md:w-[var(--gw)] md:min-w-0"
          style={{
            ...GRID_IN_FRAME,
            gridTemplateColumns: columns,
            gridTemplateRows: `repeat(${layout.rows}, minmax(0, 1fr))`,
            ["--rows" as string]: layout.rows,
          }}
        >
          {/* Faint grid: hour lines across, lane lines down (#3E1D23, the
              mockup's grid colour). The hour lines run out to the frame. */}
          {layout.hours.map((t, i) => (
            <div
              key={t}
              aria-hidden
              className="pointer-events-none relative"
              style={{ gridRow: `${i * 4 + 1} / span 4`, gridColumn: "1 / -1" }}
            >
              <span className="absolute inset-x-0 top-0 h-px bg-dq-ink md:-left-[calc(143*var(--u))] md:-right-[calc(15*var(--u))]" />
            </div>
          ))}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-dq-ink md:-left-[calc(143*var(--u))] md:-right-[calc(15*var(--u))]"
          />
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              aria-hidden
              className="pointer-events-none border-l border-dq-ink md:-mb-[calc(80*var(--u))] md:-mt-[calc(88*var(--u))]"
              style={{ gridRow: "1 / -1", gridColumn: i + 2 }}
            />
          ))}

          {/* Hour labels, centred on their line. Sticky on mobile. */}
          {layout.hours.map((t, i) => (
            <div
              key={`label-${t}`}
              className="sticky left-0 z-[3] bg-dq-panel md:static md:bg-transparent"
              style={{ gridRow: `${i * 4 + 1} / span 4`, gridColumn: 1 }}
            >
              <span
                className="u-text block -translate-y-1/2 whitespace-nowrap pr-3 text-right font-display leading-none text-dq-red md:pr-[calc(45*var(--u))]"
                style={u(40, { sm: 16 })}
              >
                {clock(t)}
              </span>
            </div>
          ))}

          {layout.placed.map((item) => {
            const key = keyOf(item);
            return (
              <Block
                key={key}
                item={item}
                open={openKey === key}
                onToggle={() => setOpenKey(openKey === key ? null : key)}
                detailsId={`${panelId}-details`}
              />
            );
          })}

          {openItem && (
            <Details
              item={openItem}
              rows={layout.rows}
              id={`${panelId}-details`}
              onClose={() => setOpenKey(null)}
            />
          )}
        </div>
      </div>

      <Art src="schedule/frame-over.svg" style={S.at(FRAME, { zIndex: 7 })} />
      <Art src="schedule/corner.svg" style={S.at([999.5, 3556, 640.5, 426], { zIndex: 8 })} />

      {LIGHTS.map((l) => (
        <div
          key={`${l.x}-${l.y}`}
          aria-hidden
          className={cn("deco", l.on ? "light-flicker bg-dq-yellow" : "bg-dq-red")}
          style={S.at([l.x, l.y, 37.5, 18.75], {
            zIndex: 8,
            ...(l.on
              ? {
                  ["--flicker-period" as string]: `${l.period}s`,
                  ["--flicker-delay" as string]: `${l.delay}s`,
                }
              : {}),
          })}
        />
      ))}
    </section>
  );
}
