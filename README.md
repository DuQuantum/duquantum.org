# duquantum.org

Website for the DuQuantum quantum computing hackathon at Duke. 

## Features

- **Next.js 14** - React framework with App Router
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

## Deployment

This site is configured for Netlify deployment:

1. Push your code to a git repository
2. Connect the repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`

## API Endpoints

- `GET /api/hello` - Test endpoint
- `POST /api/hello` - Echo endpoint

## Project Structure

```
├── app/              # Next.js App Router
├── netlify/          # Netlify Functions
├── public/           # Static files
└── components/       # React components
```
