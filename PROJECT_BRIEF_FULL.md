# ClaimFlow — Full Original Brief (verbatim from user)

> This is the unabridged spec supplied by the user for the ClaimFlow portfolio
> project. `PROJECT_BRIEF.md` is the condensed index with the tech/design
> decisions already made — read that first, then come here for per-page detail.

🚀 PROJECT BRIEF — CLAIMFLOW
You are a senior full-stack engineer, product designer, UX specialist, and software architect.
Your task is to build a polished, production-quality fictional insurance claims management platform called ClaimFlow.
This project is a personal portfolio project designed to demonstrate strong skills in:

* Full-stack web development
* Product design and UX
* Business workflow implementation
* Dashboard design
* Data visualization
* Form handling
* File management
* Responsive design
* Clean architecture

The application should feel like a real modern insurance digital product, not a generic admin dashboard or a basic CRUD tutorial.

## 1. PRODUCT CONTEXT
Product name: ClaimFlow
Tagline: Insurance claims, made simple.
Alternative tagline: A clearer way to manage your claims.
Product type: Fictional B2C insurance customer portal.

Target users — individuals who want to:
* Report an insurance claim
* Track an existing claim
* Upload supporting documents
* Understand the current status of their claim
* Communicate with the claims team
* View their insurance-related information

Important branding constraint — this is a fictional portfolio project. Do NOT use:
* AG Insurance logos
* AG Insurance brand assets
* AG Insurance proprietary UI
* AG Insurance trademarks as if this were an official product
* Real customer data
* Real insurance policy information

The product may be inspired by common insurance customer experiences, but it must be presented as an independent fictional product.
Add a small footer note: "ClaimFlow is a fictional portfolio project. All data shown is simulated."

## 2. CORE PRODUCT VISION
ClaimFlow should make insurance claims feel: Clear, Reassuring, Transparent, Organized, Easy to understand.

The main user should immediately understand:
1. What claims they have
2. What is happening with each claim
3. What action is required from them
4. What the next step is
5. Where to find their documents and messages

Avoid overwhelming users with technical insurance terminology.
The product should feel like a premium modern digital service used by a serious European insurance company.

## 3. DESIGN DIRECTION
Overall visual style: refined, modern, trustworthy SaaS / fintech / insurtech interface.
Design references: modern European financial applications, premium B2B SaaS dashboards, modern customer portals, clean enterprise software, calm trustworthy insurance experiences.

Do NOT make it look like: a generic Bootstrap dashboard, a crypto trading app, a gaming interface, a flashy startup landing page, an overly colorful student project, a basic shadcn component demo.

Design principles: strong visual hierarchy, generous whitespace, excellent typography, clear navigation, consistent spacing, accessible contrast, subtle borders, soft shadows used sparingly, rounded corners but not excessively playful, clear status indicators, calm and reassuring visual language, professional empty states, consistent loading states, consistent error states.

Suggested color direction — sophisticated insurance/financial palette.
Primary: deep navy/dark blue, blue or teal accent.
Supporting: neutral gray backgrounds, white cards, muted text, soft green for success, amber for pending/attention, red only for critical issues.
Avoid excessive gradients. Avoid using too many colors simultaneously.

Typography: modern, highly readable sans-serif. Suggested: Inter, Geist, Plus Jakarta Sans. Choose one and use it consistently.

UI framework: Tailwind CSS, shadcn/ui, Lucide icons. Do not mix multiple unrelated UI libraries.

## 4. TECH STACK
Frontend: Next.js, TypeScript, App Router, React, Tailwind CSS, shadcn/ui, Lucide React, Recharts for charts where useful.

Backend/data — prefer Supabase, PostgreSQL, Supabase Auth, Supabase Storage. However the application MUST be easy to run locally. If Supabase credentials are not available: implement a realistic mock data layer, use local mock data or a local persistence strategy, keep the architecture ready for Supabase integration, do not block the project because of missing external credentials.

Forms: React Hook Form + Zod validation.
Notifications: clean toast system such as Sonner.
Icons: Lucide icons consistently.
Deployment readiness: structured for deployment on Vercel + Supabase.

## 5. APPLICATION STRUCTURE
1. Authentication
2. Dashboard
3. Claims
4. Claim details
5. New claim submission
6. Documents
7. Messages
8. Profile / settings
9. Help / support

Coherent navigation system across the app.

## 6. AUTHENTICATION EXPERIENCE
Polished fictional authentication flow.

### Login page — `/login`
Elements: ClaimFlow logo/wordmark, welcome message, email input, password input,
show/hide password, remember me checkbox, login button, forgot password link,
link to create an account, small fictional project disclaimer.

Realistic demo authentication. Provide a clearly visible demo access option:
Demo account — Email: `demo@claimflow.app`, Password: `Demo123!`.
The demo login should work locally. No real email verification required.

### Signup page — `/signup`
Fields: first name, last name, email, password, confirm password, terms checkbox.
Implement proper validation.

### Forgot password — `/forgot-password`
Can be a simulated flow. Show a success state after submission.

## 7. GLOBAL APPLICATION LAYOUT
After login, use a consistent application shell.

### Desktop layout
Left sidebar: ClaimFlow logo; Dashboard; My claims; Documents; Messages; Help &
support; Settings. Bottom of sidebar: user profile mini-card; Logout.
Top header: page title or breadcrumb; search if relevant; notification bell;
user avatar/menu.
Main content: responsive max-width container, clean spacing, consistent card system.

### Mobile layout
Responsive layout, collapsible sidebar or mobile navigation, sticky mobile
header if useful, no horizontal overflow, cards stack elegantly, tables become
mobile-friendly lists or scroll containers.

## 8. DASHBOARD PAGE — `/dashboard`
Main landing page after login.

Header: "Good morning, Thomas" (fictional user Thomas Martin). Subtitle:
"Here's an overview of your insurance claims." Primary CTA: "Report a claim".

Summary cards (4, polished):
1. Active claims — value `2` — icon, value, label, optional contextual text
2. Awaiting action — value `1`
3. Documents — value `8` (Uploaded documents)
4. Resolved claims — value `5`

Recent claims section — list/table with: claim reference, claim type, date
reported, status, last update, action. Example claims:
- CLM-2026-00124 — Water damage — Sept 12, 2026 — Under review
- CLM-2026-00118 — Home burglary — Sept 5, 2026 — Awaiting documents
- CLM-2026-00097 — Vehicle damage — Aug 21, 2026 — Resolved
Clicking a claim opens its details.

Action required section — visually distinct card, title "Action required",
example: "Please upload the repair estimate for claim CLM-2026-00118.", CTA
"Upload document". Only appears when relevant.

Recent activity — timeline/activity list: claim submitted, document uploaded,
claim assigned to an expert, message received, claim status updated.

## 9. CLAIMS LIST PAGE — `/claims`
Title "My claims", subtitle "Track and manage your insurance claims."

Header actions: search claims, filter by status, filter by claim type, sort by
date, primary button "Report a claim".

Status filters: All, Open, Under review, Awaiting documents, In progress,
Resolved, Closed.

Claims display — polished table on desktop, responsive cards on mobile. Each
row/card: claim reference, claim category, short description, date submitted,
current status, last updated, view details button.

Empty state when filters return no results — helpful message, explain no
claims match the filters, provide a clear reset filters button.

## 10. CLAIM DETAIL PAGE — `/claims/[id]`
One of the most important pages. Feels like a real customer-facing case
management experience.

Header: back to claims, claim reference, claim category, current status
badge, date submitted. Example: `CLM-2026-00124`, `Water damage`, Status:
`Under review`.

Two-column layout on desktop.
Main column: claim progress timeline, claim overview, documents,
messages/communication, activity history.
Side column: claim summary card, assigned claims handler, contact support,
important dates, required actions.

### Claim progress timeline (visual stepper)
Steps: 1. Claim submitted, 2. Initial review, 3. Assessment, 4. Decision, 5.
Payment/closure. Each step: status, date if completed, description, visual
indicator. Example:
- Claim submitted — Sept 12, 2026 — "Your claim was successfully submitted."
- Initial review — Sept 13, 2026 — "Our claims team is reviewing the information provided."
- Assessment — In progress — "An assessment may be required before the claim can proceed."
Future steps visually muted.

### Claim overview card
Claim type, incident date, reported date, location, policy reference
(fictional), estimated damage amount if applicable, description.

### Documents section
Clean list of uploaded documents, e.g.: Incident_photos.zip,
Repair_estimate.pdf, Police_report.pdf, Purchase_invoice.pdf. Each shows: file
name, file type, upload date, status, view/download action. Add button:
"Upload document".

Required documents — if the claim needs more info, highlighted card:
"Documents requested" / "Please provide a repair estimate to help us continue
reviewing your claim." Button: "Upload requested document".

### Messages section
Conversation-like interface between customer and fictional claims team.
Example messages:
- Claims team: "Hello Thomas, we have received your claim and are currently reviewing the submitted information."
- Thomas Martin: "Thank you. Please let me know if you need anything else."
Includes: message list, text input, send button, timestamp, sender indicator.
Simulated locally.

### Claim activity
Chronological activity timeline: claim created, document uploaded, status
changed, message sent, review started.

## 11. NEW CLAIM SUBMISSION FLOW — `/claims/new`
Polished multi-step form. Major feature of the product.

### Step 1 — Select claim type
Title: "What happened?" Cards: Water damage, Fire damage, Theft/burglary,
Glass breakage, Vehicle damage, Personal injury, Other. Each card: icon,
label, short description, hover state, selected state.

### Step 2 — Incident details
Fields: date of incident, approximate time, location, claim category,
description of what happened.
Validation: required fields, date cannot be in the future, description
minimum length, clear error messages.

### Step 3 — Damage information
Fields: what was damaged, estimated damage amount, is the property currently
safe, has emergency action been taken, additional comments.
Conditional fields — e.g. if "Vehicle damage" selected, show: vehicle make,
vehicle model, registration placeholder (fictional), was another vehicle
involved.

### Step 4 — Upload documents
Allow uploads: photos, PDFs, receipts, repair estimates, other supporting
files. Functional local/mock upload experience: file previews where
possible, upload progress, remove files, validate file type/size, success
and error states. Suggested limits: max 10 MB/file, accepted JPG/PNG/PDF/DOCX.

### Step 5 — Review and submit
Summary: claim type, incident date, location, description, files attached.
Checkbox: "I confirm that the information provided is accurate." Button:
"Submit claim".

### Success page
Title: "Your claim has been submitted". Message: "We've received your claim.
You can follow its progress from your claims dashboard." Display: generated
claim reference, current status "Submitted", estimated next step, button
"View claim", button "Back to dashboard". No real claim-processing promises
or legal guarantees.

## 12. DOCUMENTS PAGE — `/documents`
Title "Documents", subtitle "Access the documents related to your claims."
Features: search documents, filter by claim, filter by document type, sort by
upload date, upload document, view document details, download mock document.
Fields shown: file name, type, related claim, uploaded date, size, status,
actions. Professional empty state if no documents exist.

## 13. MESSAGES PAGE — `/messages`
Title "Messages". Simple inbox experience.
Features: list of conversations, unread indicator, search messages,
conversation detail, message composer, timestamps, read/unread states.
Example conversations: Claim CLM-2026-00124, Claim CLM-2026-00118, General
support. Fictional claims team names: Sophie Laurent, "Claims Support Team".
No real employee names.

## 14. PROFILE / SETTINGS PAGE — `/settings`
Sections:
- Personal information: first name, last name, email, phone, address (fictional values)
- Notification preferences: email notifications, claim updates, document reminders, marketing communications
- Security: change password, two-factor authentication (visual mock only if not implemented), active sessions (mock data)
- Preferences: language selector, theme selector if implemented
Make the page feel complete but do not overbuild unnecessary functionality.

## 15. HELP & SUPPORT PAGE — `/help`
Include: search help articles, FAQ categories, contact support card, emergency
information disclaimer, frequently asked questions.
Example FAQs: How do I report a claim? What documents should I provide? How
can I track my claim? How long does a claim review take? How do I update my
contact information?
Do not provide real insurance legal advice — generic fictional help content only.

## 16. DATA MODEL
**User** — id, firstName, lastName, email, avatar, phone, address, createdAt

**Claim** — id, reference, userId, type, title, description, incidentDate,
reportedDate, location, status, estimatedAmount, policyReference,
assignedHandler, createdAt, updatedAt

**ClaimStatus** — submitted | under_review | awaiting_documents | assessment |
decision_pending | resolved | closed

**Document** — id, claimId, name, type, size, uploadedAt, status, url

**Message** — id, claimId, sender, content, timestamp, read

**Activity** — id, claimId, type, title, description, timestamp

## 17. MOCK DATA REQUIREMENTS
Realistic mock data. Do NOT use lorem ipsum, "Test claim", generic "John Doe"
everywhere, or random meaningless numbers. Use coherent fictional data.

User: Thomas Martin, demo@claimflow.app.

Claims:
- Claim 1: CLM-2026-00124, Water damage, under_review, incident Sept 10 2026, reported Sept 12 2026, €2,450 estimated
- Claim 2: CLM-2026-00118, Home burglary, awaiting_documents, incident Sept 3 2026, reported Sept 5 2026, €4,800 estimated
- Claim 3: CLM-2026-00097, Vehicle damage, resolved, incident Aug 18 2026, reported Aug 21 2026, €1,200 estimated

Use European date formatting and EUR currency formatting. All data must be
clearly fictional.

## 18. INTERACTIONS & UX DETAILS
Must not feel static. Meaningful interactions: sidebar navigation, active nav
states, search, filters, sorting, modal dialogs, form validation, multi-step
form navigation, upload interactions, toast notifications, status changes in
mock mode, expandable sections, tabs where useful, confirmation dialogs,
loading skeletons, empty states, error states, success states.

Do not add animations everywhere. Subtle transitions only: 150–250ms, fade,
slide, hover elevation, button feedback. Interface should feel fast and
professional.

## 19. ACCESSIBILITY
Semantic HTML, labels for form inputs, keyboard navigation, visible focus
states, accessible buttons, accessible dialogs, good color contrast, don't
rely only on color for status, meaningful aria-labels, error messages
associated with fields.

## 20. RESPONSIVE DESIGN
Must work well at: Desktop 1440px, Laptop 1280px, Tablet 768px, Mobile 390px.
Test all major pages at mobile width. Avoid: broken layouts, overflowing
tables, tiny text, overcrowded cards, unusable forms.

## 21. LANDING PAGE — `/`
Public page introducing ClaimFlow before login.

Hero: headline "Insurance claims, made simple.", subtitle "Report, track and
manage your claims from one clear, secure workspace." Buttons: "Get started",
"Explore demo".

Feature sections: simple claim reporting, transparent claim tracking, secure
document management, clear communication.

Product preview: polished dashboard preview or mock interface.

Trust section: generic wording "Designed for clarity, built for confidence."
Do not claim real certifications, partnerships, customers, or security
compliance.

Footer: Product, Features, Help, Privacy, Terms, fictional project disclaimer.

## 22. SECURITY & PRIVACY CONSIDERATIONS
Even fictional: no secrets in frontend code, use environment variables, no
hardcoded real credentials, validate user inputs, avoid storing sensitive
real-world data, mock data only, basic privacy notice. Do not claim GDPR
compliance unless actually implemented/audited. Do not claim bank-level
security. Do not claim production readiness for real insurance data.

## 23. CODE QUALITY
Clean, maintainable code. TypeScript types, reusable components, clear folder
structure, avoid massive components, avoid duplicated UI code, meaningful
variable names, business logic separate from presentation where practical,
reusable status badge/form/layout components, organized mock data, comments
only when useful.

Suggested structure:
```
app/
  (auth)/
    login/
    signup/
    forgot-password/
  (dashboard)/
    dashboard/
    claims/
    claims/new/
    claims/[id]/
    documents/
    messages/
    settings/
    help/
  page.tsx

components/
  layout/
  dashboard/
  claims/
  documents/
  messages/
  ui/

lib/
  mock-data/
  utils/
  validations/

types/
```
Adapt as needed, but maintain good organization.

## 24. README REQUIREMENTS
Professional README.md: project overview, features, screenshots
(placeholders/instructions), tech stack, getting started (install, run
locally, env vars, demo credentials), project structure, design decisions,
disclaimer (fictional, not affiliated with AG Insurance or any real insurer),
future improvements (real auth, real file storage, RBAC, claims back-office,
email notifications, audit logs, external integrations).

## 25. DEVELOPMENT PROCESS (phases)
1. Foundation — init project, TS, Tailwind, deps, base layout, design system, mock data layer
2. Authentication — login, demo account, signup, forgot password, auth state
3. Core dashboard — sidebar, header, dashboard cards, recent claims, activity, action required
4. Claims — list, search, filters, detail, timeline, documents, messages
5. Claim submission — multi-step form, validation, file upload mock, review, success page
6. Secondary pages — documents, messages, settings, help
7. Polish — responsive, loading/empty/error states, accessibility, animations, visual consistency
8. Documentation — README, env example, demo instructions, screenshots guidance

## 26. IMPORTANT EXECUTION RULES
1. Do not build a basic prototype with unfinished pages.
2. Do not leave buttons that do absolutely nothing unless clearly decorative.
3. Do not use placeholder lorem ipsum.
4. Do not use random inconsistent colors.
5. Do not overcomplicate the backend.
6. Prioritize a polished working MVP.
7. Make the demo account work immediately.
8. Use realistic mock data.
9. Make the app visually impressive but credible.
10. Ensure the entire navigation works.
11. Ensure forms have validation.
12. Ensure the application can run locally without requiring paid services.
13. Do not use AG Insurance branding.
14. Do not claim the app is affiliated with AG Insurance.
15. Do not stop after generating only a landing page.
16. Do not ask the user to manually create every component unless absolutely necessary.
17. Make sensible decisions autonomously.
18. If a feature is too complex, implement a clean mock version rather than leaving it broken.
19. Prioritize the user experience over unnecessary technical complexity.
20. At the end, provide clear instructions to run and test the application.

## 27. FINAL DELIVERABLE
A complete, polished, fictional insurance claims management platform that can
be: run locally, pushed to GitHub, deployed on Vercel, shown during an
interview, included as a personal project on a CV.

Before finishing: check for TypeScript errors, check for build errors, check
all routes, check responsive behavior, check demo login, check the claim
submission flow, check that no major buttons or links are broken, ensure the
README is complete.
