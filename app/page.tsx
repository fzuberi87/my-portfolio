import { getCaseStudies } from "@/lib/notion";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "UX design case studies spanning product design, research, and design systems.",
};

export default async function GalleryPage() {
  const studies = await getCaseStudies();

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-36 pb-16 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-5">
            UX Design Portfolio
          </p>
          <h1 className="text-[clamp(2.75rem,6vw,4.5rem)] font-bold text-gray-900 leading-[1.06] tracking-[-0.03em] mb-6">
            Case Studies
          </h1>
          <p className="text-lg text-gray-400 max-w-lg leading-relaxed font-light">
            A collection of end-to-end design work — research, strategy, and
            execution across product and enterprise.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Grid ── */}
      <section className="pb-32 px-6 max-w-6xl mx-auto">
        {studies.length === 0 ? (
          <AnimatedSection>
            <div className="py-24 text-center">
              <p className="text-sm text-gray-300">
                No published case studies yet. Add entries with Status ={" "}
                <code className="text-gray-400">Published</code> to your Notion
                database.
              </p>
            </div>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((study, index) => (
              <AnimatedSection
                key={study.id}
                delay={Math.min(index * 0.07, 0.35)}
              >
                <CaseStudyCard study={study} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 px-6 py-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
