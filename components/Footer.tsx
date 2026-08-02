import { ArrowUpRight } from '@/components/icons';

const EMAIL = 'dustint3841@gmail.com';

export default function Footer() {
  return (
    <footer className="border-t border-line px-8 py-12 md:px-16 lg:px-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-8">
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
        <a
          href={`mailto:${EMAIL}`}
          className="text-sm text-body transition-colors duration-200 hover:text-ink"
        >
          {EMAIL}
        </a>
      </div>
      <p className="mt-10 text-xs text-dim">© 2026 Dustin Tran</p>
    </footer>
  );
}
