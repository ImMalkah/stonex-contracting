# Stonex Contracting — Heavy Equipment & Construction GTA

Professional heavy equipment rentals, excavation, concrete, and landscaping services across the Greater Toronto Area including Hamilton, Mississauga, and Toronto.

## Tech Stack

- **React 19** — UI framework
- **Vite 6** — Build tool & dev server
- **Tailwind CSS v4** — Utility-first styling
- **Motion (Framer Motion)** — Animations & transitions
- **Lucide React** — Icon library
- **TypeScript** — Type safety

## Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Button.tsx       — Reusable CTA button with variants
│   ├── FAQ.tsx          — Accordion-style FAQ section
│   ├── Footer.tsx       — Contact form & company info
│   ├── Header.tsx       — Fixed navigation with mobile menu
│   ├── Hero.tsx         — Landing hero with service badges
│   ├── Packages.tsx     — Rental pricing tiers
│   ├── Process.tsx      — How-it-works steps
│   └── Testimonials.tsx — Client video testimonial cards
├── App.tsx              — Root layout
├── index.css            — Tailwind config & custom styles
└── main.tsx             — React entry point
```
