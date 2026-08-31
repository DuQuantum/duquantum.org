# Editions

Each **edition** is a complete, self-contained version of the site, with
 its own sections primitives, content, and assets. `active.ts` names the one that is live.

The point is the placeholder. It is the generic, year-agnostic site that goes live between
events, while the next event's real design is still being built.

```
editions/
  types.ts        the Edition contract (small on purpose)
  active.ts       ← the switch: one line names the live edition
  placeholder/    the generic fallback site
    index.ts      exports `edition` — the Page, metadata, font, and theme import
    Page.tsx      the composition: which sections exist, in what order
    content.ts    event facts + organizer list
    theme.css     Tailwind directives, design tokens, body styling
    sections/     Hero, About, Organizers, Faq, Footer, TopBar
    ui/           Container, SectionLabel, OrganizerCard, ApplyButton
```

Assets live under `public/editions/<id>/`, referenced as
`/editions/<id>/logos/thing.svg`.

## Swapping the live edition

Change the one import in `active.ts`:

```ts
export { edition as default } from "./duquantum-2027";
```

That is the whole operation. Because it is a static re-export, editions not named there are
never imported and get tree-shaken out of the bundle — an archived edition costs nothing at
runtime. Committing that line is what ships; reverting it is what rolls back.

To preview an edition without shipping it, point `active.ts` at it locally and
`npm run dev`. There is no `/preview/<id>` route by design: it would need a registry
importing every edition, which is exactly the coupling this layout avoids.

## Starting a new edition

1. `cp -r editions/placeholder editions/duquantum-2027` — a starting point, not a base
   class. Delete sections, add sections, rewrite `content.ts`, retune `theme.css`. Nothing
   here is inherited and nothing you do can affect the placeholder.
2. `mkdir public/editions/duquantum-2027` and put its assets there, then fix the `src`
   strings you copied.
3. Set `id` in its `index.ts`, and give it its own `metadata` (including `icons`, which
   points at that folder's own favicon).
4. Build it. When it is ready, change `active.ts`.

An edition can also start from an empty folder. All it must export is an `Edition`
(`types.ts`) — a `Page`, `metadata`, a `fontClassName`, and an import of whatever
stylesheet it wants. It does not have to use Tailwind, or any of the shared files below.

## What is shared, and the rules that keep it safe

Four things are shared by every edition. They are deliberately either trivial or additive:

| Shared | Why it is safe to share |
| --- | --- |
| `lib/cn.ts` | A three-line string join. No design opinion. |
| `components/ui/ExternalLink.tsx` | Anchor + `target="_blank"` + `aria-label`. No layout. |
| `tailwind.config.ts` | Declares token **names**; editions supply the **values**. |
| `app/layout.tsx`, `app/page.tsx` | ~20 lines of plumbing that read the active edition. |

Two rules follow, and they are the only ones:

- **`tailwind.config.ts` is append-only.** It maps `bg-base-purple` to
  `rgb(var(--base-purple))`; the *value* of `--base-purple` lives in each edition's
  `theme.css`. That is what lets two editions both use `bg-base-purple` and get different
  purples. Adding entries is fine. Changing or repurposing an existing name reaches back
  into every frozen edition that uses it — don't.
- **An edition imports only from itself, `@/lib/cn`, and `@/components/ui/ExternalLink`.**
  Inside an edition, use relative paths (`./sections/Hero`, `../content`). Any other `@/`
  import crossing out of the folder is the thing to catch in review — it is a hole in the
  freeze. `grep -rn 'from "@/' editions/` lists every one.

Note that `theme.css` carries its own `@tailwind` directives rather than sharing a
`globals.css`. Tailwind resolves `@layer` per file, so base-layer rules have to sit
alongside the directives that declare the layers — and the upshot is that an edition owns
its stylesheet completely.

## Two consequences worth knowing

**Archived editions still have to compile.** `tsconfig.json` covers the whole tree, so a
React or Next upgrade that breaks the frozen placeholder fails `npm run build` even though
it is not live. That is intended — you want to find out then, not on the day you need the
fallback. If an old edition ever becomes genuinely obstructive, exclude that folder in
`tsconfig.json` rather than deleting it.

**Tailwind scans every edition.** The `content` glob is `./editions/**`, so classes used
only by an archived edition still get generated into the live stylesheet. It is dead CSS —
a few KB, inert because the matching tokens aren't defined — not a correctness problem. If
it ever grows to matter, narrow the glob to the active edition.
