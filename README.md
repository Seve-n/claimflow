# ClaimFlow

ClaimFlow is a fictional B2C insurance claims management platform — a
portfolio project built to demonstrate front-end product engineering for a
work-study ("alternance") application. It simulates a modern insurtech SaaS
customer portal: reporting a claim, tracking its progress, exchanging
messages with a claims team, and managing documents.

> **ClaimFlow is a fictional portfolio project. All data shown is simulated.**
> It has no affiliation with any real insurance company. There is no backend,
> no real user data, and no real policies — everything runs on an in-memory
> mock data layer.

## Live demo

- **Demo login:** `demo@claimflow.app` / `Demo123!` (also available via the
  "Fill demo credentials" button on the login page)
- No sign-up flow is required to explore the app — the demo account is
  pre-seeded with sample claims, documents, and messages.

## Features

- **Public site** — landing page, login, signup, and forgot-password flows
- **Dashboard** — claim summary counts, action-required alerts, recent
  claims, recent activity, and a claims-by-status chart
- **Claims list & detail** — searchable/filterable claims table, and a
  per-claim detail page with a progress stepper, document list, and a
  messages thread with the claims team
- **5-step claim submission wizard** — claim type → incident details →
  damage-type-specific fields → optional document upload → review & submit,
  with full client-side validation
- **Documents** — a searchable, filterable table of every document across
  every claim
- **Messages** — conversation view with the claims support team
- **Settings & Help** — account settings and an FAQ/support page
- **AI risk analysis** *(optional, needs a free API key — see below)* — on a
  claim's detail page, a button-triggered card calls a real LLM (Google
  Gemini, free tier) server-side to produce an illustrative fraud-risk score,
  signals, and summary from the claim's details
- Fully responsive (390px / 768px / 1280px / 1440px), keyboard-navigable,
  and built to WCAG-conscious contrast and focus-state standards

## Tech stack

- [Next.js](https://nextjs.org) (App Router, TypeScript, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com) with CSS-variable design tokens
- [shadcn/ui](https://ui.shadcn.com) component primitives
- [Framer Motion](https://www.framer.com/motion/) for subtle transitions
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) for
  form validation
- [Recharts](https://recharts.org) for the dashboard chart
- [date-fns](https://date-fns.org) for French/European date formatting
- [Sonner](https://sonner.emilkowal.ski) for toast notifications
- [Lucide](https://lucide.dev) for icons
- No real backend — a mock data layer (`lib/mock-data/*`) and a trivial
  localStorage-backed mock auth (`lib/auth.ts`) stand in for a real API. The
  one exception is `app/api/claims/[id]/fraud-check/route.ts`, a real Next.js
  Route Handler that calls the [Gemini API](https://ai.google.dev) (free
  tier) server-side for the optional AI risk analysis feature — the API key
  never reaches the browser

## Design system

The visual style takes its color palette, typography (DM Sans), and shadow
scale from [TailGrids](https://tailgrids.com), reimplemented as CSS custom
properties in `app/globals.css` and consumed through shadcn/ui's existing
component architecture — components use semantic Tailwind tokens
(`bg-primary`, `bg-sidebar`, `text-muted-foreground`, `bg-success-bg`, …)
rather than hardcoded colors, so the whole app re-themes from one file.

Status colors are never the only signal: every status badge pairs a color
with an icon and a text label.

## Getting started

### Prerequisites

- Node.js 20+
- npm (or pnpm/yarn/bun)

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Log in with the demo
credentials above — no environment variables or external services are
required, since everything runs on mock data.

### Enabling AI risk analysis (optional)

The rest of the app works with zero configuration. To turn on the "AI risk
analysis" card on a claim's detail page:

1. Get a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
   (no credit card required)
2. Copy `.env.example` to `.env.local` and paste the key into `GEMINI_API_KEY`
3. Restart `npm run dev`

On Vercel, add `GEMINI_API_KEY` under Project Settings → Environment
Variables. Without a key, the card shows a clear "not configured" message
instead of failing silently.

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Project structure

```
app/                   Routes (App Router) — public pages + authenticated app
  claims/               Claims list, detail, and the new-claim wizard
  dashboard/            Authenticated dashboard
  documents/, messages/, settings/, help/
components/
  layout/                AppShell, Sidebar, Header, MobileNav
  shared/                StatusBadge, EmptyState, PageHeader, LoadingSkeletons
  dashboard/, claims/, documents/, messages/, ...   Feature-specific UI
  ui/                     shadcn/ui primitives
lib/
  mock-data/              Mock user, claims, documents, messages, activity, FAQ
  validations/            Zod schemas for every form
  auth.ts, utils.ts
types/                  Shared TypeScript types (User, Claim, ClaimStatus, ...)
```

## Accessibility & responsiveness

- Minimum 4.5:1 text contrast, visible focus rings, labeled form inputs,
  `aria-label`s on icon-only buttons
- Keyboard-navigable dialogs and menus (via Radix/Base UI primitives)
- Respects `prefers-reduced-motion`
- Verified at 390px, 768px, 1280px, and 1440px — no horizontal scroll;
  tables collapse to card lists or scrollable containers on mobile

## Future improvements

- Real backend (auth, persistence, file storage) behind the same UI
- Automated test coverage (unit + E2E) for the claim submission wizard
- Notification center wired to real events instead of static mock content
- Multi-language support (the app is currently English-only; mock data uses
  European date/currency formatting)

---

*ClaimFlow is a fictional portfolio project. All data shown is simulated.*
