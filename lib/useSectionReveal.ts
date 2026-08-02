'use client';

import { useEffect, type RefObject } from 'react';
import { animate, onScroll, stagger, utils } from 'animejs';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Animated moment 3 — section reveal on scroll.
 * Reveals every `.reveal` child of the section once, as the section
 * enters the viewport. `repeat: false` keeps it from re-triggering
 * on scroll back up (the observer reverts itself after completing).
 */
export function useSectionReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;

    const targets = utils.$(root.current.querySelectorAll('.reveal'));
    if (!targets.length) return;

    const animation = animate(targets, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      ease: 'outQuad',
      delay: stagger(80),
      autoplay: onScroll({
        target: root.current,
        enter: 'bottom top+=20%',
        repeat: false,
      }),
    });

    return () => {
      animation.revert();
    };
  }, [root]);
}
