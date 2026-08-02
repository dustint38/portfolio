'use client';

import { useRef } from 'react';
import { useSectionReveal } from '@/lib/useSectionReveal';
import ArrowButton from '@/components/ArrowButton';
import { ArrowUpRight } from '@/components/icons';

const EMAIL = 'dustint3841@gmail.com';

export default function Contact() {
  const root = useRef<HTMLElement | null>(null);

  useSectionReveal(root);

  return (
    <section
      id="contact"
      ref={root}
      className="scroll-mt-[73px] border-t border-line px-8 py-24 md:px-16 md:py-32 lg:px-24"
    >
      <div className="reveal flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <h2 className="text-[clamp(64px,9vw,120px)] font-extrabold leading-none tracking-tight">
            Let&apos;s Talk
          </h2>
          <span className="pt-3 text-base font-medium text-dim">(04)</span>
        </div>
        <ArrowButton
          href={`mailto:${EMAIL}`}
          label="Email Dustin"
          size="lg"
          className="mt-2 hidden shrink-0 sm:inline-flex"
        />
      </div>

      <p className="reveal mt-8 max-w-2xl text-[17px] leading-[1.6] text-body">
        Open to SWE internships and new grad roles. Reach out anytime.
      </p>

      <div className="reveal mt-12">
        <a
          href={`mailto:${EMAIL}`}
          className="break-all text-[clamp(24px,4vw,48px)] font-bold tracking-tight underline-offset-8 transition-colors duration-200 hover:underline"
        >
          {EMAIL}
        </a>
      </div>

      <div className="reveal mt-10 flex flex-wrap gap-8">
        <a
          href="https://linkedin.com/in/dustintran38"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-muted transition-colors duration-200 hover:text-ink"
        >
          LINKEDIN
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://github.com/dustint38"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-muted transition-colors duration-200 hover:text-ink"
        >
          GITHUB
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
