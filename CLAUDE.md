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
- Exactly six animated moments exist: hero char stagger, page-load timeline
  (includes the "Dustin Tran" eyebrow), scroll section reveals, arrow button
  spring hover, scroll-progress hairline (scroll-scrubbed via `onScroll` +
  `sync: true`), and the ghost name marquee above the footer (scroll-scrubbed,
  rows move opposite directions). Do not add more.
- Scroll-scrubbed animations are allowed only for the hairline and the
  marquee; everything else stays trigger-once. No looping/ambient motion.

## Sections
Hero → Projects → Experience → Contact

## Owner
Dustin Tran — dustint3841@gmail.com
