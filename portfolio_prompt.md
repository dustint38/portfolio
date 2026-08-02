# Portfolio Build Prompt — Dustin Tran

Paste this entire prompt into Claude Code to scaffold the full portfolio.

---

Build me a complete personal portfolio website. Here is everything you need — design direction, tech stack, content, and structure. Follow all of it precisely.

---

## Goal

A dark, typographic portfolio site for a CS + Linguistics student (UCLA, Class of 2027) targeting software engineering internship and new grad roles. The site must look intentional and handcrafted — not like a template. The primary job of every design decision is to get a recruiter or hiring manager to reach out.

---

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS — no component libraries (shadcn for form elements only if needed)
- **Fonts:** Load via next/font — use a single grotesque sans-serif (Inter or Geist)
- **Animation:** anime.js v4 (`npm i animejs`) — see the Animation section below for exact usage
- **Deployment target:** Vercel

---

## Design Direction

### Reference
The visual north star is showcasy.co's navigation overlay — a full-bleed near-black canvas with massive bold stacked section names, muted index numbers, and circular outlined arrow buttons flush right. Replicate this aesthetic language throughout the entire site.

### Rules — follow every one of these strictly

**Color**
- Background: `#0D0D0D` (near-black), never pure `#000000`
- Primary text: `#FFFFFF`
- Secondary / muted text: `#888888`
- Accent (use sparingly — hover states and links only): `#FFFFFF` or a very subtle warm off-white, no bright colors
- No gradients. No colored backgrounds. No frosted glass. No shadows.
- Dividers: 1px `rgba(255,255,255,0.12)` horizontal rules

**Typography**
- One typeface only
- Section/nav titles: very large (clamp 64px–120px), bold (font-weight 700–900), flush left
- Muted index numbers (01, 02...) sit inline next to section names, small size (~16px), color `#555555`
- Body text: 16–18px, line-height 1.6, color `#AAAAAA`
- No decorative fonts, no serif, no italic as personality

**Layout**
- Full-width canvas, no max-width centering on the outer shell
- Internal content padding: `px-8 md:px-16 lg:px-24`
- Sections separated by horizontal rules
- Header: name/logo flush left, CTA button + nav toggle flush right
- Footer: two-column — social links with diagonal arrow icons (left), email address (right)
- Arrow buttons: circular, outlined (`border border-white/30`), hover fills to white with dark icon

**Motion**
Motion is handled with anime.js v4. There are exactly four animated moments on this site and no others. Full spec in the Animation section below. Governing principle: motion is restrained and orchestrated, never ambient or decorative. Nothing moves while the user is reading.

**What to never do**
- No gradients
- No colorful sections or panels
- No tech-stack badge/icon grids
- No hero illustrations or stock photos
- No star/bar ratings for skills
- No carousels
- No glassmorphism
- No looping or ambient animation
- No parallax, scroll-jacking, or cursor followers
- No morphing SVG blobs or particle fields
- No animation beyond the four moments specified in the Animation section

---

## Animation (anime.js v4)

Install with `npm i animejs`. This project uses **v4**, whose API differs significantly from v3. Follow the v4 syntax rules below exactly.

### v4 API rules — do not get these wrong

- v4 uses **named exports**, not a default `anime` object. Never write `import anime from 'animejs'`.
- Correct: `import { animate, stagger, createTimeline, createSpring, onScroll, utils } from 'animejs'`
- The function is `animate(targets, params)`, not `anime({ targets, ... })`
- Inside a property object, the key is `to:`, not `value:` — e.g. `rotate: { to: 360 }`
- The easing key is `ease:`, not `easing:`, and easing names drop the `ease` prefix — use `'inOutQuint'`, not `'easeInOutQuint'`
- Spring easing is not built in. Create it with `createSpring({ mass, stiffness, damping })`
- `anime.path()` and `anime.setDashoffset()` no longer exist

### React / Next.js integration rules

- Every component that animates must have `'use client'` at the top
- Run all animations inside `useEffect` with an empty dependency array
- Scope every animation to a component-level `ref` using `utils.$()` rather than global CSS selectors, so animations never leak across components
- Always return a cleanup function from `useEffect` that reverts the animation
- Guard every animation behind a `prefers-reduced-motion` check. If reduced motion is requested, skip the animation entirely and render elements in their final visible state
- Set the initial hidden state in CSS (not JS) so there is no flash of unstyled content before hydration

### Reduced-motion helper

Create `/lib/motion.ts`:

```ts
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

Every animation must early-return if this is true.

### The four animated moments

Build these four and nothing else.

---

**1. Hero character stagger (the signature moment)**

This is the one showpiece. On page load, the hero display heading animates in character by character.

- Split the heading text into individual `<span>` elements per character, preserving spaces
- Animate `opacity` from 0 to 1 and `translateY` from `1em` to 0
- `delay: stagger(30, { from: 'center' })`
- `duration: 900`, `ease: 'outExpo'`
- Runs once on mount, never repeats

---

**2. Page-load orchestration**

A single `createTimeline()` that sequences the initial reveal so elements arrive in a deliberate order rather than all at once.

Order:
1. Nav bar fades in (`opacity` 0 to 1, 400ms)
2. Hero heading characters stagger in (moment 1 above)
3. Hero subheading fades and slides up (`translateY` 20px to 0, 600ms)
4. CTA buttons fade in with a 65ms stagger

Use timeline position offsets so steps overlap slightly instead of running strictly sequentially. Total sequence should complete in under 1.6s.

---

**3. Section reveal on scroll**

Each section title and its content reveal once as the section enters the viewport.

- Use anime.js v4's `onScroll()` with `{ enter: 'bottom top+=20%', once: true }`
- Animate `opacity` 0 to 1 and `translateY` 24px to 0
- `duration: 700`, `ease: 'outQuad'`
- `delay: stagger(80)` across the direct children of the section
- Must only fire once per section, never re-trigger on scroll back up

Apply to: Projects rows, Experience timeline entries, Contact block.

---

**4. Arrow button micro-interaction**

On hover of any circular arrow button:

- The arrow icon translates 3px on X and rotates 45deg
- `ease: createSpring({ mass: 1, stiffness: 180, damping: 12 })`
- On mouse leave, animate back to origin with the same spring
- The button background fill (white) and icon color inversion stay as plain CSS transitions, not anime.js — only the icon transform is animated

---

### Reference implementation pattern

Use this structure for every animated component:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, utils } from 'animejs';
import { prefersReducedMotion } from '@/lib/motion';

export default function Example() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;

    const targets = utils.$('.reveal-item');

    const animation = animate(targets, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      delay: stagger(80),
      ease: 'outQuad',
    });

    return () => {
      animation.revert();
    };
  }, []);

  return <div ref={root}>{/* ... */}</div>;
}
```

---

## Site Structure

Four sections, all on one scrollable page with smooth-scroll anchor links from the nav.

### Navigation (sticky top bar)
- Left: `dustint` wordmark in bold white, links to `#home`
- Right: `Let's Talk →` outlined pill button (links to `#contact`), hamburger/close toggle for mobile
- Underline entire nav with a 1px divider rule

### 1. Hero (`#home`)
Full-height or near-full-height section.

- Large display heading: `"Software Engineer"` or `"Building things that work."`
- Subheading: `"CS + Linguistics @ UCLA. Currently interning at TetraMem. Interested in full-stack engineering and embedded systems."`
- Two CTA buttons: `View Resume` (downloads PDF) and `See My Work` (scrolls to #projects)
- No photo, no avatar, no hero image

### 2. Projects (`#projects`)
Section title: `Works` with index `(03)` muted beside it.

Display these 3 projects as stacked rows (not cards with colored backgrounds). Each row is separated by a 1px rule, expands on click or links to detail, and shows: project name (large), one-line purpose, tech stack inline as plain text, and two links (GitHub + Live if available).

**StudyBug**
- Purpose: Cross-platform mobile app for real-time study session tracking
- Stack: React Native, Expo, TypeScript, PostgreSQL, Supabase, REST APIs, JWT Auth
- Highlights:
  - Replaced polling-based sync with Supabase real-time subscriptions, cutting cross-device delays to sub-second
  - Built reusable animated SVG and haptic feedback hooks, cutting UI implementation time ~30% per feature
  - Maintained clean main branch across 50+ PRs on a 5-person team with structured Git branching and code review standards
- GitHub: github.com/dustint38 (link to repo if available)
- Note: mobile app only, not a web app

**BruinPOV**
- Purpose: Geo-anchored audio storytelling platform built in a 12-hour hackathon
- Stack: JavaScript, HTML, CSS, Leaflet.js, Supabase, REST APIs, MediaRecorder API
- Highlights:
  - Shipped a working Leaflet.js map connected to a PostgreSQL backend in 12 hours
  - Enabled in-browser voice recording and playback for 20+ pinned story locations via MediaRecorder API
- GitHub: github.com/dustint38

**Recipe Manager**
- Purpose: User-story-driven recipe management app built with a 4-person team using Agile/Scrum
- Stack: React, TypeScript, JavaScript, HTML, CSS, Git
- Highlights:
  - Owned component architecture for navigation, save/like toggles, and collections page
  - Reduced regressions to near zero across two sprints with typed props and mandatory code reviews

### 3. Experience (`#experience`)
Section title: `Experience` with index `(02)` muted.

Render as a vertical timeline with 1px left border rule. Each entry: role, company, location, dates, and 2–3 bullet points. No star ratings, no skill bars.

**TetraMem — Software Engineer Intern, Testing Lab**
San Jose, CA | June 2026 – Present
- Designed and built an internal lab asset tracking app in Django and PostgreSQL, replacing a manual spreadsheet workflow used across engineering teams
- Modeled a self-referential asset hierarchy (chips → boards → stations → testers) with foreign key relationships and enumerated status tracking
- Built REST API endpoints supporting asset search, check-in/out, hierarchy management, and admin bulk registration

**Handshake AI — AI Training Data Specialist**
Remote – Contract | Dec 2025 – May 2026
- Evaluated LLM outputs across reasoning, coding, and instruction-following tasks, contributing written rationale that directly shaped model fine-tuning pipelines

Also include an Education block in the same section:

**UCLA — B.A. Computer Science & Linguistics**
Expected June 2027

**Irvine Valley College — A.S. Liberal Studies (CS Emphasis)**
May 2025

Skills block (plain text, grouped — no icons, no ratings):
- Languages: Python, JavaScript, TypeScript, Java, SQL, C, C++, HTML, CSS
- Frameworks: React, React Native, Expo, Next.js, Django, Leaflet.js
- Tools & Infra: PostgreSQL, Supabase, REST APIs, JWT Auth, Git, Figma

At the bottom of the section: a `Download Resume →` link that downloads a PDF named `dustin-tran-resume.pdf` from `/public/`.

### 4. Contact (`#contact`)
Section title: `Let's Talk` with index `(04)` muted.

Keep this minimal — no form. Just:
- A one-line prompt: `"Open to SWE internships and new grad roles. Reach out anytime."`
- Email displayed plainly: `dustint3841@gmail.com`
- LinkedIn: `linkedin.com/in/dustintran38`
- GitHub: `github.com/dustint38`

### Footer
Two-column layout separated by a top 1px rule:
- Left: social links in all-caps small text with diagonal arrow — `LINKEDIN ↗  GITHUB ↗`
- Right: `dustint3841@gmail.com`
- Below both: `© 2026 Dustin Tran` centered or flush left, very small muted text

---

## File Structure

Set up the project like this:

```
/app
  layout.tsx        (global font, metadata, dark background)
  page.tsx          (imports all section components)
/components
  Nav.tsx
  Hero.tsx           ('use client' — character stagger + load timeline)
  Projects.tsx       ('use client' — scroll reveal)
  Experience.tsx     ('use client' — scroll reveal)
  Contact.tsx        ('use client' — scroll reveal)
  Footer.tsx
  ArrowButton.tsx    ('use client' — spring hover micro-interaction)
/lib
  motion.ts          (prefersReducedMotion helper)
/public
  dustin-tran-resume.pdf   (placeholder — I will replace)
```

---

## Metadata (layout.tsx)

```ts
export const metadata = {
  title: "Dustin Tran — Software Engineer",
  description: "CS + Linguistics student at UCLA. Full-stack engineer. Currently at TetraMem.",
  openGraph: {
    title: "Dustin Tran — Software Engineer",
    description: "CS + Linguistics student at UCLA. Full-stack engineer.",
    url: "https://dustint.dev",
    siteName: "dustint.dev",
  },
}
```

---

## CLAUDE.md (create this in project root)

```md
# Portfolio — dustint.dev

## Stack
Next.js 14 App Router, TypeScript, Tailwind CSS, anime.js v4

## Design rules
- Background: #0D0D0D
- No gradients, no colored sections, no component library UI
- Typography-first, dark, brutalist-minimal — reference: showcasy.co
- One font (Inter or Geist), one accent color max

## Animation rules
- anime.js **v4** only. Named exports: `import { animate, stagger } from 'animejs'`
- Never `import anime from 'animejs'` (that is v3)
- `animate(targets, params)` — use `to:` not `value:`, `ease:` not `easing:`
- Easing names drop the prefix: `'inOutQuint'` not `'easeInOutQuint'`
- All animation lives in `useEffect` in `'use client'` components, scoped to a ref
- Always `return () => animation.revert()` for cleanup
- Always guard with `prefersReducedMotion()` from `/lib/motion.ts`
- Exactly four animated moments exist: hero char stagger, page-load timeline,
  scroll section reveals, arrow button spring hover. Do not add more.

## Sections
Hero → Projects → Experience → Contact

## Owner
Dustin Tran — dustint3841@gmail.com
```

---

Build the full site. Do not use placeholder lorem ipsum — use the real content provided above throughout. Do not add any design elements not described here.
