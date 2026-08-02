'use client';

import { Fragment, useEffect, useRef } from 'react';
import { createTimeline, stagger, utils } from 'animejs';
import { prefersReducedMotion } from '@/lib/motion';

const HEADLINE = 'Building things that work.';

function HeadlineChars() {
  const words = HEADLINE.split(' ');
  return (
    <span aria-hidden="true">
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, ci) => (
              <span key={ci} className="hero-char inline-block">
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement | null>(null);

  // Animated moments 1 + 2 — a single timeline orchestrates the page load:
  // nav fade → hero character stagger → subheading → CTAs. Runs once.
  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;

    const scopeEl = root.current;
    const nav = utils.$('[data-nav]');
    const chars = utils.$(scopeEl.querySelectorAll('.hero-char'));
    const sub = utils.$(scopeEl.querySelectorAll('.hero-sub'));
    const ctas = utils.$(scopeEl.querySelectorAll('.hero-cta'));

    const tl = createTimeline();

    if (nav.length) {
      tl.add(nav, { opacity: [0, 1], duration: 400, ease: 'outQuad' });
    }

    tl.add(
      chars,
      {
        opacity: [0, 1],
        translateY: ['1em', '0em'],
        duration: 900,
        ease: 'outExpo',
        delay: stagger(30, { from: 'center' }),
      },
      '-=200',
    )
      .add(
        sub,
        {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          ease: 'outQuad',
        },
        '-=650',
      )
      .add(
        ctas,
        {
          opacity: [0, 1],
          duration: 450,
          ease: 'outQuad',
          delay: stagger(65),
        },
        '-=450',
      );

    return () => {
      tl.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="flex min-h-[calc(100svh-73px)] scroll-mt-[73px] flex-col justify-center px-8 py-24 md:px-16 lg:px-24"
    >
      <h1
        aria-label={HEADLINE}
        className="max-w-5xl text-[clamp(64px,9.5vw,120px)] font-extrabold leading-[0.95] tracking-tight"
      >
        <HeadlineChars />
      </h1>
      <p className="hero-sub mt-8 max-w-2xl text-[17px] leading-[1.6] text-body">
        CS + Linguistics @ UCLA. Currently interning at TetraMem. Interested in
        full-stack engineering and embedded systems.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="/dustin-tran-resume.pdf"
          download
          className="hero-cta inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-canvas transition-colors duration-200 hover:bg-white/80"
        >
          View Resume
        </a>
        <a
          href="#projects"
          className="hero-cta inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:border-white hover:bg-white hover:text-canvas"
        >
          See My Work
        </a>
      </div>
    </section>
  );
}
