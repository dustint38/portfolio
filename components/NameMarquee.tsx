'use client';

import { useEffect, useRef } from 'react';
import { animate, onScroll, utils } from 'animejs';
import { prefersReducedMotion } from '@/lib/motion';

const LINE = 'DUSTIN TRAN — SOFTWARE ENGINEER — ';

/**
 * Animated moment 6 — ghost name marquee.
 * Two oversized rows slide in opposite directions, scrubbed by scroll
 * position while the band passes through the viewport (sync, no loop).
 */
export default function NameMarquee() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;

    const rows = utils.$(root.current.querySelectorAll('.marquee-row'));
    if (rows.length < 2) return;

    const scrub = (target: (typeof rows)[number], from: string, to: string) =>
      animate(target, {
        translateX: [from, to],
        ease: 'linear',
        autoplay: onScroll({
          target: root.current!,
          enter: 'bottom top',
          leave: 'top bottom',
          sync: true,
        }),
      });

    const first = scrub(rows[0], '0vw', '-14vw');
    const second = scrub(rows[1], '-14vw', '0vw');

    return () => {
      first.revert();
      second.revert();
    };
  }, []);

  const rowClasses =
    'whitespace-nowrap text-[clamp(56px,8vw,110px)] font-extrabold uppercase leading-[0.95] tracking-tight text-white/10';

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="select-none overflow-hidden border-t border-line py-10 md:py-14"
    >
      <div className={`marquee-row ${rowClasses}`}>{LINE.repeat(4)}</div>
      <div className={`marquee-row marquee-row-alt ${rowClasses}`}>
        {LINE.repeat(4)}
      </div>
    </div>
  );
}
