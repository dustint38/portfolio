'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from '@/components/icons';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Works', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: "Let's Talk", href: '#contact' },
];

function MenuGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M3 8h18M3 16h18" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open]);

  return (
    <header
      data-nav
      className="anim-nav sticky top-0 z-50 border-b border-line bg-canvas"
    >
      <div className="flex h-[72px] items-center justify-between px-8 md:px-16 lg:px-24">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="text-xl font-bold tracking-tight"
        >
          dustint
        </a>
        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm font-medium transition-colors duration-200 hover:border-white hover:bg-white hover:text-canvas"
          >
            Let&apos;s Talk
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center md:hidden"
          >
            {open ? <CloseGlyph /> : <MenuGlyph />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="site-menu"
          aria-label="Site menu"
          className="fixed inset-x-0 bottom-0 top-[73px] z-40 overflow-y-auto bg-canvas px-8 md:hidden"
        >
          <ul>
            {links.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between gap-4 py-7"
                >
                  <span className="flex items-start gap-3">
                    <span className="text-[clamp(44px,11vw,80px)] font-extrabold leading-none tracking-tight">
                      {item.label}
                    </span>
                    <span className="pt-2 text-sm font-medium text-dim">
                      0{i + 1}
                    </span>
                  </span>
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors duration-200 group-hover:border-white group-hover:bg-white group-hover:text-canvas">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
