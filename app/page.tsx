import { getPublishedProjects } from '@/lib/notion';
import { BentoGrid } from '@/components/BentoGrid';
import { AnimatedSection } from '@/components/AnimatedSection';

export const revalidate = 3600;

export default async function HomePage() {
  const projects = await getPublishedProjects();

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
        <AnimatedSection>
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 mb-10 px-3.5 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-gray-500 tracking-wide">
              Available for new projects
            </span>
          </div>

          <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold text-gray-900 leading-[1.04] tracking-[-0.03em] mb-8">
            Design that
            <br />
            <span className="text-gray-300">moves people.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed font-light">
            Senior UX Designer crafting intuitive products and experiences that
            bridge the gap between user needs and business goals.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Work grid ── */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <AnimatedSection delay={0.12}>
          <div className="flex items-center justify-between mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-300">
              Selected Work
            </p>
            <p className="text-[11px] font-medium text-gray-300">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
        </AnimatedSection>

        <BentoGrid projects={projects} />
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 px-6 py-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-300">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-300 hover:text-gray-600 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-300 hover:text-gray-600 transition-colors"
          >
            Twitter
          </a>
          <a
            href="mailto:hello@yourname.com"
            className="text-xs text-gray-300 hover:text-gray-600 transition-colors"
          >
            hello@yourname.com
          </a>
        </div>
      </footer>
    </div>
  );
}
