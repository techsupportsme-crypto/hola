# Dependencies

All runtime and development dependencies for the Hola Paje website.

## Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | 19.x | UI component framework |
| `react-dom` | 19.x | DOM renderer |
| `wouter` | 3.x | Lightweight client-side routing |
| `framer-motion` | 12.x | Animation library (scroll reveals, modal transitions) |
| `lucide-react` | 0.453.x | Icon set (close, chevron, WhatsApp) |
| `@radix-ui/react-dialog` | 1.x | Accessible modal primitive (VillaModal) |
| `@radix-ui/react-tabs` | 1.x | Accessible tab switcher (villa type selector) |
| `tailwindcss` | 4.x | Utility-first CSS framework |
| `tw-animate-css` | 1.x | CSS animation utilities for Tailwind |
| `react-hook-form` | 7.x | Enquiry form state management |
| `zod` | 4.x | Form validation schema |
| `sonner` | 2.x | Toast notifications (form submission feedback) |
| `next-themes` | 0.4.x | Theme provider (light default) |
| `clsx` | 2.x | Conditional class name utility |
| `tailwind-merge` | 3.x | Tailwind class conflict resolution |

## Development Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | 7.x | Build tool and dev server |
| `@vitejs/plugin-react` | 5.x | React Fast Refresh |
| `typescript` | 5.6.x | Static type checking |
| `@tailwindcss/vite` | 4.x | Tailwind CSS Vite integration |
| `prettier` | 3.x | Code formatting |
| `vitest` | 2.x | Unit test runner |
| `esbuild` | 0.25.x | Server bundle compilation |

## Node / Package Manager

- **Node.js:** 22.x (LTS)
- **Package manager:** pnpm 10.x

## Fonts (External CDN)

Loaded from Google Fonts in `client/index.html`:

- **Cormorant Garamond** — weights 300, 400, 500 (italic and regular) — display headings
- **Montserrat** — weights 100, 200, 300, 400, 500 — navigation, labels, body copy
