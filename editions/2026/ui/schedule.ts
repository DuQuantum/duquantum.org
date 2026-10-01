import type { ScheduleDay, ScheduleEvent } from "../content";

/**
 * Turns the flat `schedule` list into grid placements for one day. Pure, so
 * the grid component only renders what this returns.
 *
 * The grid is quarter-hour rows. Every block's top and bottom land on a row
 * line, which is what keeps the column visually even no matter how irregular
 * the times are -- nothing is positioned by pixel.
 */

export const SLOT = 15; // minutes per grid row
const MILESTONE = 30; // a milestone ("Hacking starts!") is drawn half an hour tall
const OPEN_TAIL = 60; // an open-ended block gets at least an hour of grid

export function minutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function clock(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = ((h + 11) % 12) + 1;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12}:00 ${suffix}`;
}

export type Placed = {
  event: ScheduleEvent;
  /** 1-based CSS grid row lines. */
  rowStart: number;
  rowEnd: number;
  lane: number;
  /** No `end` and not a milestone: runs off the bottom of the grid. */
  openEnded: boolean;
  /** Human time range for the details popover. */
  when: string;
};

export function layoutDay(events: readonly ScheduleEvent[], day: ScheduleDay) {
  const today = events.filter((e) => e.day === day);

  const span = (e: ScheduleEvent) => {
    const start = minutes(e.start);
    if (e.end) return [start, minutes(e.end)] as const;
    if (e.kind === "milestone") return [start, start + MILESTONE] as const;
    return [start, start + OPEN_TAIL] as const;
  };

  // Whole hours either side, so hour labels sit on the first and last lines.
  const first = Math.floor(Math.min(...today.map((e) => span(e)[0])) / 60) * 60;
  const last = Math.ceil(Math.max(...today.map((e) => span(e)[1])) / 60) * 60;

  // Lanes: greedy first-fit by start time. At a tie a milestone goes last, so
  // a full block keeps the left lane and the milestone stacks beside it --
  // which is how the mockup draws "Hacking starts!" against lunch.
  const order = [...today].sort((a, b) => {
    const d = minutes(a.start) - minutes(b.start);
    if (d) return d;
    return Number(a.kind === "milestone") - Number(b.kind === "milestone");
  });

  const laneEnds: number[] = [];
  const placed: Placed[] = order.map((event) => {
    const [start, end] = span(event);
    const openEnded = !event.end && event.kind !== "milestone";
    const stop = openEnded ? last : end;

    let lane = event.lane ?? laneEnds.findIndex((free) => free <= start);
    if (lane === -1) lane = laneEnds.length;
    laneEnds[lane] = Math.max(laneEnds[lane] ?? 0, stop);

    return {
      event,
      rowStart: (start - first) / SLOT + 1,
      rowEnd: (stop - first) / SLOT + 1,
      lane,
      openEnded,
      when: event.end
        ? `${clock(start)} – ${clock(end)}`
        : openEnded
          ? `from ${clock(start)}`
          : clock(start),
    };
  });

  const hours: number[] = [];
  for (let t = first; t <= last - 60; t += 60) hours.push(t);

  return {
    first,
    last,
    rows: (last - first) / SLOT,
    hours,
    lanes: laneEnds.length,
    placed,
  };
}
