# Triple Vision Agency — Website

Marketing website for **Triple Vision Agency**, a fully integrated digital agency based in Heliopolis, Cairo (founded 2015).

- **Live (temporary):** https://triple-vision-cinematics.vercel.app
- **Production domain:** not decided yet — see [Deployment](#deployment).

## Source of truth for content

All company facts (stats, services, clients, contact details, mission/vision) come from the official
**Triple Vision Agency Company Profile 2026** provided by the client. Do not add company facts that are
not in the profile or confirmed by the client in writing.

The profile PDF is intentionally **not** committed (it is ~28 MB and git-ignored). Ask the project owner for a copy.

## Tech stack

- [Vite 5](https://vitejs.dev/) + React 18 + TypeScript (client-side rendered SPA)
- React Router 6
- Tailwind CSS 3 + [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- Framer Motion for animation
- Hosted on [Vercel](https://vercel.com/)

## Getting started

Requires Node.js 22 and npm.

```sh
npm ci          # install exact dependency versions from package-lock.json
npm run dev     # dev server on http://localhost:8080
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check (no emit) |
| `npm test` | Vitest (single run) |

CI (`.github/workflows/ci.yml`) runs lint, typecheck, tests and build on every pull request and on pushes to `main`.

## Project structure

```
src/
  App.tsx              routes and app-wide providers
  pages/               one file per route
  components/
    layout/            Navbar, Footer, Layout
    sections/          home page sections
    modals/            contact modal
    ui/                shadcn/ui primitives
  contexts/            ContactContext (opens the contact modal)
  hooks/
  assets/
public/                static files served as-is (robots.txt, sitemap.xml, manifest)
```

## Deployment

Vercel builds every push. Each pull request gets its own preview URL; merging to `main` deploys production.

The production domain is still to be confirmed with the client (the company email uses `triplevisionagency.com`).
Until then the site runs on the `vercel.app` URL.

## Workflow

- Work on a feature branch and open a pull request into `main`.
- Check the Vercel preview (desktop and mobile) before merging.
- This repository is no longer synced with Lovable — edit the code directly.
