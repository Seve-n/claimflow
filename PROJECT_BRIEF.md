# ClaimFlow — Project Brief (source of truth)

Fictional B2C insurance claims management platform. Portfolio project for an
"alternance" (work-study) application. Must look like a real, polished
insurtech/fintech SaaS product — not a generic admin template or CRUD demo.

**Never use AG Insurance branding, logos, or claims of affiliation.** Footer
must include: "ClaimFlow is a fictional portfolio project. All data shown is
simulated."

## Tech stack (already installed — do not change)

- Next.js (App Router, TypeScript, `next@latest`), no `src/` dir — routes live in `app/`
- Tailwind CSS v4 (via `@theme inline` tokens in `app/globals.css` — already themed, see below)
- shadcn/ui components already generated in `components/ui/*` (button, card, badge,
  input, label, textarea, select, checkbox, dialog, dropdown-menu, avatar, tabs,
  table, separator, sheet, skeleton, sonner, progress, tooltip, popover, alert,
  switch, radio-group, calendar). Add more with `npx shadcn@latest add <name>` if needed.
- `framer-motion` for subtle transitions (150–300ms, fade/slide/hover elevation only — no heavy animation)
- `lucide-react` for ALL icons (never emojis)
- `recharts` for any charts
- `react-hook-form` + `zod` + `@hookform/resolvers` for all forms
- `sonner` for toasts (already wired via `components/ui/sonner.tsx`, mount `<Toaster />` in root layout)
- `date-fns` for date formatting (European format, e.g. `12 septembre 2026` or `12/09/2026`; EUR currency via `Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR' })`)

## Design system (decided — follow exactly, do not re-invent)

Style: clean, calm, professional insurtech SaaS. Generous whitespace, subtle
borders, soft shadows used sparingly, rounded-lg corners (not playful), strong
hierarchy. NOT glassmorphism, NOT dark-mode-by-default, NOT colorful/startup-y,
NOT neumorphism. No gradients except very subtle ones on the landing hero at most.

Font: Inter (load via `next/font/google`, weights 400/500/600/700), applied once
in `app/layout.tsx` as the sans font. Use it consistently everywhere.

Colors are already defined as CSS variables in `app/globals.css` under `:root`
and `.dark`, and exposed as Tailwind utilities via `@theme inline`. Use them by
name, never hardcode hex in components:

- `bg-background` / `text-foreground` — page background (slate-50) / near-navy text
- `bg-card` / `text-card-foreground` — white cards
- `bg-primary` / `text-primary-foreground` — deep navy (#0F172A), for primary buttons, active nav
- `bg-secondary` / `text-secondary-foreground` — light slate, secondary buttons/pills
- `bg-muted` / `text-muted-foreground` — muted backgrounds / secondary text (never gray-400, always `muted-foreground` which is contrast-checked)
- `bg-accent` / `text-accent-foreground` — light sky tint, for subtle highlights/hover
- `border-border` — default border color everywhere
- Status colors — **always pair with an icon or text label, never color alone**:
  - `bg-success-bg text-success border-success-border` — resolved / success states (green)
  - `bg-warning-bg text-warning border-warning-border` — pending / awaiting action (amber)
  - `bg-critical-bg text-critical border-critical-border` — critical / rejected only (red) — use sparingly
  - `bg-info-bg text-info border-info-border` — informational / in-progress (sky blue)
- Sidebar tokens (`bg-sidebar`, `text-sidebar-foreground`, `bg-sidebar-accent`,
  `text-sidebar-primary`, `border-sidebar-border`) — the app sidebar is a deep
  navy surface, distinct from the light main content area. Use these tokens for
  the sidebar only, never `bg-primary` for the sidebar shell.

Status → color mapping (`ClaimStatus`):
- `submitted`, `under_review`, `assessment`, `decision_pending` → info (sky)
- `awaiting_documents` → warning (amber)
- `resolved` → success (green)
- `closed` → muted (slate, neutral — not a "success", just archived)
- any rejected/critical case → critical (red), used sparingly

Icons: `lucide-react` only, consistent size (`w-4 h-4` inline, `w-5 h-5` nav,
`w-6 h-6` feature/empty-state), never emoji.

Motion: use `framer-motion` for page/section fade-slide-in and card hover
elevation only. Respect `prefers-reduced-motion`. Keep everything 150–300ms.

Accessibility: 4.5:1 text contrast minimum, visible focus rings (already
themed via `--ring`), all inputs have associated `<Label>`, all icon-only
buttons have `aria-label`, keyboard-navigable dialogs/menus (shadcn/Radix
handles most of this — don't fight it).

Responsive breakpoints to verify: 390px (mobile), 768px (tablet), 1280px
(laptop), 1440px (desktop). No horizontal scroll. Tables become card lists or
horizontally-scrollable containers on mobile — never break the layout.

## Shared foundation (built by the orchestrating agent first — DO NOT recreate, only import)

- `types/index.ts` — `User`, `Claim`, `ClaimStatus`, `ClaimType`, `Document`,
  `Message`, `Activity` types
- `lib/mock-data/*` — mock user (Thomas Martin), 3 claims (see brief data below),
  documents, messages, activity log, FAQ content
- `lib/auth.ts` — trivial client-side mock auth (localStorage-backed session,
  demo credentials `demo@claimflow.app` / `Demo123!`), `useAuth()` hook
- `lib/utils.ts` — `cn()` (shadcn default) + `formatEUR()`, `formatDateFR()`,
  `getStatusMeta(status)` (returns label + color classes + icon for a `ClaimStatus`)
- `lib/validations/*` — zod schemas for claim submission steps, login, signup,
  settings forms
- `components/layout/AppShell.tsx`, `Sidebar.tsx`, `MobileNav.tsx`, `Header.tsx`
  — the authenticated app shell (sidebar nav: Dashboard, My claims, Documents,
  Messages, Help & support, Settings; user mini-card + logout at sidebar
  bottom; header has page title, notification bell, avatar menu)
- `components/shared/StatusBadge.tsx`, `EmptyState.tsx`, `PageHeader.tsx`,
  `LoadingSkeletons.tsx` — reusable across every page, use these instead of
  building ad hoc badges/empty states

**Any page-building agent must import and reuse these rather than duplicating
logic.** If something is missing from this foundation, add it narrowly in your
own scope rather than editing the shared files (to avoid merge conflicts with
other agents working in parallel) — if you must touch a shared file, keep the
change additive and minimal.

## Routes to build (see full brief below for per-page detail)

Public: `/` (landing), `/login`, `/signup`, `/forgot-password`
Authenticated (wrapped in the AppShell): `/dashboard`, `/claims`,
`/claims/[id]`, `/claims/new` (5-step wizard), `/documents`, `/messages`,
`/settings`, `/help`

## Mock data (use exactly this, keep it consistent across all pages)

User: Thomas Martin, demo@claimflow.app, Brussels-based (fictional).

Claims:
1. `CLM-2026-00124` — Water damage — `under_review` — incident 10 Sept 2026,
   reported 12 Sept 2026 — €2,450 estimated
2. `CLM-2026-00118` — Home burglary — `awaiting_documents` — incident 3 Sept
   2026, reported 5 Sept 2026 — €4,800 estimated — needs a repair estimate upload
3. `CLM-2026-00097` — Vehicle damage — `resolved` — incident 18 Aug 2026,
   reported 21 Aug 2026 — €1,200 estimated

Claims team contact: Sophie Laurent ("Claims Support Team"). No real AG
Insurance staff names.

---

## Full original brief (verbatim, for detail on every page/section)

See `PROJECT_BRIEF_FULL.md` in this repo for the complete, unabridged
specification (auth flows, dashboard sections, claims list, claim detail page
with stepper/timeline, 5-step new-claim wizard, documents, messages, settings,
help, landing page, data model, execution rules). Read it before building your
assigned pages — this file is the condensed index, that file is the contract.
