'use client';

import { useEffect, useRef } from 'react';
import { createTimeline, onScroll, stagger, svg } from 'animejs';
import { prefersReducedMotion } from '@/lib/motion';

const SPOKE_COUNT = 48;
const RING_RADII = [12, 20, 28, 36, 44, 52, 60];

// Geometry is centered on (0,0) in a -50..50 viewBox so the group's CSS
// rotation origin (0,0) is the visual center — no transform-origin games.
const SPOKES = Array.from({ length: SPOKE_COUNT }, (_, i) => {
  const angle = (i * (360 / SPOKE_COUNT) * Math.PI) / 180;
  const round = (n: number) => +n.toFixed(3);
  return {
    x1: round(8 * Math.cos(angle)),
    y1: round(8 * Math.sin(angle)),
    x2: round(62 * Math.cos(angle)),
    y2: round(62 * Math.sin(angle)),
  };
});

/**
 * Animated moment 7 — background radial burst.
 * A viewport-filling compass/radar mandala assembles as the page is
 * scrolled: spokes draw outward in a sequential radar sweep, rings arc in,
 * and the whole dial slowly rotates — one timeline scrubbed by scroll
 * (sync), complete at the very bottom and fully reversible.
 * The SVG starts hidden in CSS; opacity is lifted only after the drawables
 * initialize so the finished dial never flashes before hydration.
 */
export default function BackgroundBurst() {
  const root = useRef<SVGSVGElement | null>(null);
  const dial = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current || !dial.current) return;

    const rings = svg.createDrawable(root.current.querySelectorAll('.burst-ring'));
    const spokes = svg.createDrawable(
      root.current.querySelectorAll('.burst-spoke'),
    );

    const tl = createTimeline({
      defaults: { ease: 'linear' },
      autoplay: onScroll({
        target: document.body,
        enter: 'top top',
        leave: 'bottom bottom',
        sync: true,
      }),
    });

    tl.add(dial.current, { rotate: [0, 90], duration: 2000 }, 0)
      .add(
        rings,
        { draw: ['0 0', '0 1'], duration: 900, delay: stagger(140) },
        0,
      )
      .add(
        spokes,
        { draw: ['0 0', '0 1'], duration: 400, delay: stagger(28) },
        300,
      );

    root.current.style.opacity = '1';

    return () => {
      tl.revert();
    };
  }, []);

  return (
    <svg
      ref={root}
      aria-hidden="true"
      className="bg-burst pointer-events-none fixed inset-0 z-0 h-full w-full"
      viewBox="-50 -50 100 100"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="rgba(46,125,50,0.35)"
    >
      <g ref={dial}>
        {RING_RADII.map((r) => (
          <circle
            key={r}
            className="burst-ring"
            cx={0}
            cy={0}
            r={r}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {SPOKES.map((s, i) => (
          <line
            key={i}
            className="burst-spoke"
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
