'use client';

import { Fragment, useEffect, useRef } from 'react';
import { animate, createTimeline, onScroll, stagger, utils } from 'animejs';
import { prefersReducedMotion } from '@/lib/motion';
import { RESUME_URL } from '@/lib/site';

const HEADLINE = 'Building things that work.';

function HeadlineChars() {
  const words = HEADLINE.split(' ');
  return (
    <span aria-hidden="true">
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, ci) => (
              <span
                key={ci}
                className="hero-char-outer inline-block will-change-transform"
              >
                <span className="hero-char inline-block">{char}</span>
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
    const name = utils.$(scopeEl.querySelectorAll('.hero-name'));
    const chars = utils.$(scopeEl.querySelectorAll('.hero-char'));
    const sub = utils.$(scopeEl.querySelectorAll('.hero-sub'));
    const ctas = utils.$(scopeEl.querySelectorAll('.hero-cta'));

    const tl = createTimeline();

    if (nav.length) {
      tl.add(nav, { opacity: [0, 1], duration: 400, ease: 'outQuad' });
    }

    tl.add(
      name,
      {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 500,
        ease: 'outQuad',
      },
      '-=250',
    )
      .add(
      chars,
      {
        opacity: [0, 1],
        translateY: ['1em', '0em'],
        duration: 900,
        ease: 'outExpo',
        delay: stagger(30, { from: 'center' }),
      },
      '-=350',
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

    // Animated moment 8 — hero scatter. Each character's outer wrapper
    // drifts up, spreads, rotates, and tints volt as the hero scrolls out;
    // scrubbed by scroll position (sync), so scrolling back reassembles it.
    // The wrappers keep this fully independent of the load timeline, which
    // animates the inner .hero-char spans.
    const outers = utils.$(scopeEl.querySelectorAll('.hero-char-outer'));
    const mid = (outers.length - 1) / 2;
    // anime.js v4 supports (target, index) function values at runtime, but
    // its TS types only cover (self) callbacks — hence the cast.
    const perChar = (f: (i: number) => number) =>
      ((_: unknown, i: number) => f(i)) as unknown as number;
    const scatter = animate(outers, {
      translateY: perChar(
        (i) => -(100 + ((i * 37) % 5) * 30 + Math.abs(i - mid) * 10),
      ),
      translateX: perChar((i) => (i - mid) * 7),
      rotate: perChar((i) => (i % 2 ? 1 : -1) * (5 + ((i * 29) % 4) * 4)),
      color: '#2E7D32',
      opacity: 0,
      duration: 1000,
      delay: stagger(26, { from: 'center' }),
      ease: 'inOutQuad',
      autoplay: onScroll({
        target: scopeEl,
        enter: 'top top',
        leave: 'top bottom',
        sync: true,
      }),
    });

    return () => {
      tl.revert();
      scatter.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="flex min-h-[calc(100svh-73px)] scroll-mt-[73px] flex-col justify-center px-8 py-24 md:px-16 lg:px-24"
    >
      <p className="hero-name text-[28px] font-medium uppercase tracking-[0.2em] text-accent">
        Dustin Tran
      </p>
      <h1
        aria-label={HEADLINE}
        className="mt-6 max-w-5xl text-[clamp(64px,9.5vw,120px)] font-extrabold leading-[0.95] tracking-tight"
      >
        <HeadlineChars />
      </h1>
      <p className="hero-sub mt-8 max-w-2xl text-[18px] leading-[1.6] text-body">
        CS + Linguistics @ UCLA. Currently interning at TetraMem. Interested in
        full-stack engineering and embedded systems.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
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
