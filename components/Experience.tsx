'use client';

import { useRef } from 'react';
import { useSectionReveal } from '@/lib/useSectionReveal';
import { RESUME_URL } from '@/lib/site';
import { ArrowRight } from '@/components/icons';

const jobs = [
  {
    company: 'TetraMem',
    role: 'Software Engineer Intern, Testing Lab',
    location: 'San Jose, CA',
    dates: 'June 2026 – Present',
    bullets: [
      'Designed and built an internal lab asset tracking app in Django and PostgreSQL, replacing a manual spreadsheet workflow used across engineering teams',
      'Modeled a self-referential asset hierarchy (chips → boards → stations → testers) with foreign key relationships and enumerated status tracking',
      'Built REST API endpoints supporting asset search, check-in/out, hierarchy management, and admin bulk registration',
    ],
  },
  {
    company: 'Handshake AI',
    role: 'AI Training Data Specialist',
    location: 'Remote – Contract',
    dates: 'Dec 2025 – May 2026',
    bullets: [
      'Evaluated LLM outputs across reasoning, coding, and instruction-following tasks, contributing written rationale that directly shaped model fine-tuning pipelines',
    ],
  },
];

const education = [
  {
    school: 'UCLA',
    degree: 'B.A. Computer Science & Linguistics',
    date: 'Expected June 2027',
  },
  {
    school: 'Irvine Valley College',
    degree: 'A.S. Liberal Studies (CS Emphasis)',
    date: 'May 2025',
  },
];

const skills = [
  {
    group: 'Languages',
    items: 'Python, JavaScript, TypeScript, Java, SQL, C, C++, HTML, CSS',
  },
  {
    group: 'Frameworks',
    items: 'React, React Native, Expo, Next.js, Django, Leaflet.js',
  },
  {
    group: 'Tools & Infra',
    items: 'PostgreSQL, Supabase, REST APIs, JWT Auth, Git, Figma',
  },
];

export default function Experience() {
  const root = useRef<HTMLElement | null>(null);

  useSectionReveal(root);

  return (
    <section
      id="experience"
      ref={root}
      className="scroll-mt-[73px] border-t border-line px-8 py-24 md:px-16 md:py-28 lg:px-24"
    >
      <div className="reveal flex items-start gap-4">
        <h2 className="text-[clamp(64px,9vw,120px)] font-extrabold leading-none tracking-tight">
          Experience
        </h2>
        <span className="pt-3 text-base font-medium text-dim">(02)</span>
      </div>

      <ol className="mt-14 space-y-14 border-l border-line md:mt-20">
        {jobs.map((job) => (
          <li key={job.company} className="reveal pl-8 md:pl-12">
            <h3 className="text-xl font-bold md:text-2xl">
              {job.company} — {job.role}
            </h3>
            <p className="mt-2 text-[15px] text-muted">
              {job.location} | {job.dates}
            </p>
            <ul className="mt-5 max-w-3xl space-y-3">
              {job.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-[17px] leading-[1.6] text-body"
                >
                  <span aria-hidden="true" className="text-dim">
                    —
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid gap-12 border-t border-line pt-12 md:mt-20 md:grid-cols-2 md:pt-16">
        <div className="reveal">
          <h3 className="text-sm font-medium uppercase tracking-widest text-dim">
            Education
          </h3>
          <div className="mt-6 space-y-8">
            {education.map((entry) => (
              <div key={entry.school}>
                <p className="text-lg font-bold">{entry.school}</p>
                <p className="mt-1 text-[17px] leading-[1.6] text-body">
                  {entry.degree}
                </p>
                <p className="mt-1 text-[15px] text-muted">{entry.date}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal">
          <h3 className="text-sm font-medium uppercase tracking-widest text-dim">
            Skills
          </h3>
          <dl className="mt-6 space-y-5">
            {skills.map((skill) => (
              <div key={skill.group}>
                <dt className="text-[15px] text-dim">{skill.group}</dt>
                <dd className="mt-1 text-[17px] leading-[1.6] text-body">
                  {skill.items}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="reveal mt-16 md:mt-20">
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-lg font-semibold transition-colors duration-200 hover:text-body"
        >
          View Resume
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
