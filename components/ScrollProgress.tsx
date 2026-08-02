'use client';

import { useEffect, useRef } from 'react';
import { animate, onScroll } from 'animejs';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Animated moment 5 — scroll progress hairline.
 * The nav's bottom rule fills white as the page is scrolled; progress is
 * scrubbed directly by scroll position (sync), never time-based.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !bar.current) return;

    const animation = animate(bar.current, {
      scaleX: [0, 1],
      ease: 'linear',
      autoplay: onScroll({
        target: document.body,
        enter: 'top top',
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
      ref={bar}
      aria-hidden="true"
      className="scroll-progress absolute -bottom-px left-0 h-px w-full origin-left bg-accent"
    />
  );
}
