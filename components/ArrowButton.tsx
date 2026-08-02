'use client';

import { useEffect, useRef } from 'react';
import { animate, spring } from 'animejs';
import { prefersReducedMotion } from '@/lib/motion';
import { ArrowRight } from '@/components/icons';

// animejs 4.5 renamed createSpring() to spring(); params are unchanged.
const hoverSpring = spring({ mass: 1, stiffness: 180, damping: 12 });

type ArrowButtonProps = {
  label: string;
  href?: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
  size?: 'md' | 'lg';
  /** When defined, the button acts as a disclosure toggle and the
      arrow points down while open (rotated wrapper, no transition). */
  open?: boolean;
  /** Static arrow orientation; 'up' rotates the wrapper -90deg. */
  direction?: 'right' | 'up';
  controls?: string;
  className?: string;
};

export default function ArrowButton({
  label,
  href,
  external,
  download,
  onClick,
  size = 'md',
  open,
  direction = 'right',
  controls,
  className = '',
}: ArrowButtonProps) {
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    return () => {
      animRef.current?.revert();
    };
  }, []);

  // Animated moment 4 — only the icon transform runs through anime.js;
  // the background fill and color inversion are plain CSS transitions.
  const toHover = () => {
    if (prefersReducedMotion() || !iconRef.current) return;
    animRef.current?.pause();
    animRef.current = animate(iconRef.current, {
      translateX: { to: 3 },
      rotate: { to: 45 },
      ease: hoverSpring,
    });
  };

  const toRest = () => {
    if (prefersReducedMotion() || !iconRef.current) return;
    animRef.current?.pause();
    animRef.current = animate(iconRef.current, {
      translateX: { to: 0 },
      rotate: { to: 0 },
      ease: hoverSpring,
    });
  };

  const sizeClasses =
    size === 'lg' ? 'h-14 w-14 md:h-16 md:w-16' : 'h-11 w-11 md:h-12 md:w-12';
  const iconSize = size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';
  const baseClasses = `inline-flex items-center justify-center rounded-full border border-white/30 text-ink transition-colors duration-200 hover:border-white hover:bg-white hover:text-canvas ${sizeClasses} ${className}`;

  const icon = (
    <span
      className={`inline-flex ${open ? 'rotate-90' : direction === 'up' ? '-rotate-90' : ''}`}
    >
      <span ref={iconRef} className="inline-flex">
        <ArrowRight className={iconSize} />
      </span>
    </span>
  );

  const interactions = {
    onMouseEnter: toHover,
    onMouseLeave: toRest,
    onFocus: toHover,
    onBlur: toRest,
  };

  if (href) {
    return (
      <a
        href={href}
        aria-label={label}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className={baseClasses}
        {...interactions}
      >
        {icon}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={typeof open === 'boolean' ? open : undefined}
      aria-controls={controls}
      onClick={onClick}
      className={baseClasses}
      {...interactions}
    >
      {icon}
    </button>
  );
}
