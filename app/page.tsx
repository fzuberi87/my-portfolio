import { getCaseStudies } from "@/lib/notion";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Work",
  description:
    "UX design case studies spanning product design, research, and design systems.",
};

export default async function GalleryPage() {
  const studies = await getCaseStudies();

  return (
    <div className="min-h-screen bg-runway-black">
      {/* ── Hero ── */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-label mb-6">UX Design Portfolio</p>
          <h1 className="text-display text-white mb-6 max-w-2xl">
            Selected Work
          </h1>
          <p className="text-[17px] text-runway-slate max-w-md leading-[1.5] tracking-[-0.01em]">
            End-to-end design work — research, strategy, and execution across
            product and enterprise.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-runway-border max-w-6xl mx-auto" />

      {/* ── Grid ── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        {studies.length === 0 ? (
          <AnimatedSection>
            <div className="py-24 text-center">
              <p className="text-sm text-runway-slate">
                No published case studies yet. Add entries with Status ={" "}
                <code className="text-runway-muted">Published</code> to your
                Notion database.
              </p>
            </div>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <footer className="border-t border-runway-border px-6 py-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-runway-footer">
          © {new Date().getFullYear()} Your Name
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-runway-footer hover:text-white transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-runway-footer hover:text-white transition-colors duration-200"
          >
            Twitter
          </a>
          <a
            href="mailto:hello@yourname.com"
            className="text-[13px] text-runway-footer hover:text-white transition-colors duration-200"
          >
            hello@yourname.com
          </a>
        </div>
      </footer>
    </div>
  );
}
