# duquantum.org

Website for the DuQuantum quantum computing hackathon at Duke. 
Note this is entire vibecoded by Claude Opus 5.0 with its Figma MCP server.

## Features

- **Next.js 16** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Netlify Functions** - Serverless backend
- **TypeScript** - Type-safe development

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Build

```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/hello` - Test endpoint
- `POST /api/hello` - Echo endpoint

## Project Structure

The site is organised as **editions**, self-contained versions of the whole site, one per
event, plus a generic placeholder that goes live between events. `editions/active.ts` names
the one that is live; swapping is a one-line change. See
[`editions/README.md`](editions/README.md).

```
├── app/              # Shell only -- renders whichever edition is active
├── editions/
│   ├── active.ts     # ← the switch: names the live edition
│   ├── types.ts      # the Edition contract
│   └── placeholder/  # the generic fallback site (sections, ui, content, theme)
├── components/ui/    # The few primitives shared across editions
├── lib/              # Small helpers
├── netlify/          # Netlify Functions
└── public/editions/  # Per-edition assets
```

## Editions

Each edition owns its sections, primitives, content, design tokens and assets, so a new
event's design cannot break the placeholder it replaces. To swap the live site, change one
import in `editions/active.ts`:

```ts
export { edition as default } from "./placeholder";
```

Editions not named there are tree-shaken out of the bundle. To start a new one, copy
`editions/placeholder/` and edit freely. The details and the two rules that keep the
shared files safe are in [`editions/README.md`](editions/README.md).
