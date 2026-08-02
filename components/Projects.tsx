'use client';

import { useRef, useState } from 'react';
import { useSectionReveal } from '@/lib/useSectionReveal';
import ArrowButton from '@/components/ArrowButton';
import { ArrowUpRight } from '@/components/icons';

type Project = {
  name: string;
  purpose: string;
  stack: string[];
  highlights: string[];
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    name: 'StudyBug',
    purpose: 'Cross-platform mobile app for real-time study session tracking',
    stack: [
      'React Native',
      'Expo',
      'TypeScript',
      'PostgreSQL',
      'Supabase',
      'REST APIs',
      'JWT Auth',
    ],
    highlights: [
      'Replaced polling-based sync with Supabase real-time subscriptions, cutting cross-device delays to sub-second',
      'Built reusable animated SVG and haptic feedback hooks, cutting UI implementation time ~30% per feature',
      'Maintained clean main branch across 50+ PRs on a 5-person team with structured Git branching and code review standards',
    ],
    github: 'https://github.com/dustint38',
  },
  {
    name: 'BruinPOV',
    purpose: 'Geo-anchored audio storytelling platform built in a 12-hour hackathon',
    stack: [
      'JavaScript',
      'HTML',
      'CSS',
      'Leaflet.js',
      'Supabase',
      'REST APIs',
      'MediaRecorder API',
    ],
    highlights: [
      'Shipped a working Leaflet.js map connected to a PostgreSQL backend in 12 hours',
      'Enabled in-browser voice recording and playback for 20+ pinned story locations via MediaRecorder API',
    ],
    github: 'https://github.com/dustint38',
  },
  {
    name: 'Recipe Manager',
    purpose:
      'User-story-driven recipe management app built with a 4-person team using Agile/Scrum',
    stack: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git'],
    highlights: [
      'Owned component architecture for navigation, save/like toggles, and collections page',
      'Reduced regressions to near zero across two sprints with typed props and mandatory code reviews',
    ],
  },
];

export default function Projects() {
  const root = useRef<HTMLElement | null>(null);
  const [openRows, setOpenRows] = useState<Set<number>>(new Set());

  useSectionReveal(root);

  const toggle = (i: number) =>
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });

  return (
    <section
      id="projects"
      ref={root}
      className="scroll-mt-[73px] border-t border-line px-8 py-24 md:px-16 md:py-28 lg:px-24"
    >
      <div className="reveal flex items-start gap-4">
        <h2 className="text-[clamp(64px,9vw,120px)] font-extrabold leading-none tracking-tight">
          Works
        </h2>
        <span className="pt-3 text-base font-medium text-dim">(03)</span>
      </div>

      <ul className="mt-14 border-t border-line md:mt-20">
        {projects.map((project, i) => {
          const isOpen = openRows.has(i);
          const panelId = `project-panel-${i}`;
          return (
            <li key={project.name} className="reveal border-b border-line">
              <div className="py-10 md:py-14">
                <div className="flex items-start justify-between gap-6">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex-1 text-left"
                  >
                    <span className="flex items-start gap-4">
                      <span className="pt-2 text-sm font-medium text-dim">
                        0{i + 1}
                      </span>
                      <span>
                        <span className="block text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-tight">
                          {project.name}
                        </span>
                        <span className="mt-3 block max-w-2xl text-[17px] leading-[1.6] text-body">
                          {project.purpose}
                        </span>
                        <span className="mt-3 block text-sm leading-[1.6] text-dim">
                          {project.stack.join(' · ')}
                        </span>
                      </span>
                    </span>
                  </button>
                  <ArrowButton
                    onClick={() => toggle(i)}
                    label={
                      isOpen
                        ? `Collapse ${project.name} details`
                        : `Expand ${project.name} details`
                    }
                    open={isOpen}
                    controls={panelId}
                    className="mt-1 shrink-0"
                  />
                </div>

                <div id={panelId} hidden={!isOpen}>
                  <ul className="mt-6 max-w-3xl space-y-3 pl-9 md:pl-10">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-[16px] leading-[1.6] text-body"
                      >
                        <span aria-hidden="true" className="text-dim">
                          —
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {(project.github || project.live) && (
                  <div className="mt-6 flex gap-6 pl-9 md:pl-10">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-muted transition-colors duration-200 hover:text-ink"
                      >
                        GITHUB
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-muted transition-colors duration-200 hover:text-ink"
                      >
                        LIVE
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
