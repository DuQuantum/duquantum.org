# duquantum.org

Website for the DuQuantum quantum computing hackathon at Duke. 

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

```
├── app/              # Next.js App Router
├── components/
│   ├── ui/           # Primitives (Container, Section, Button)
│   └── sections/     # Page sections, one per Figma frame
├── content/          # Typed content + event config
├── lib/              # Small helpers
├── netlify/          # Netlify Functions
├── public/           # Static files
└── styles/           # Design tokens + Tailwind entrypoint
```
