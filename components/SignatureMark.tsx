'use client';

import { useEffect, useRef } from 'react';
import { animate, onScroll, stagger, svg } from 'animejs';
import { prefersReducedMotion } from '@/lib/motion';
import ArrowButton from '@/components/ArrowButton';

/**
 * Animated moment 6 — closing signature.
 * An angular "DT" monogram draws itself stroke by stroke while the band
 * passes through the viewport, scrubbed by scroll (sync) so it assembles
 * on the way down and unwinds on the way up. The thresholds end at
 * 'bottom bottom' so the mark is fully drawn before max scroll.
 * The back-to-top arrow reuses the moment-4 spring hover.
 */
export default function SignatureMark() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;

    const strokes = svg.createDrawable(
      root.current.querySelectorAll('.mark-stroke'),
    );
    const animation = animate(strokes, {
      draw: ['0 0', '0 1'],
      duration: 600,
      delay: stagger(140),
      ease: 'inOutQuad',
      autoplay: onScroll({
        target: root.current,
        enter: 'bottom top',
        leave: 'bottom bottom',
        sync: true,
      }),
    });

    return () => {
      animation.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      className="flex items-center justify-between gap-6 border-t border-line px-8 py-14 md:px-16 md:py-16 lg:px-24"
    >
      <svg
        aria-hidden="true"
        className="h-24 w-auto text-accent md:h-32"
        viewBox="0 0 66 44"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="miter"
      >
        <path
          className="mark-stroke"
          d="M 2 2 H 16 L 26 12 V 32 L 16 42 H 2 Z"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="mark-stroke"
          d="M 36 2 H 64"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="mark-stroke"
          d="M 50 2 V 42"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="flex items-center gap-5">
        <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-dim">
          Back to top
        </span>
        <ArrowButton
          onClick={() => window.scrollTo({ top: 0 })}
          label="Back to top"
          size="lg"
          direction="up"
        />
      </div>
    </div>
  );
}
