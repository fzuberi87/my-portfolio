import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { getExperiments } from "@/lib/notion";
import Link from "next/link";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Experiments",
  description:
    "Side projects, creative explorations, and things I built just because I wanted to see if I could.",
};

export default async function ExperimentsPage() {
  const experiments = await getExperiments();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-content mx-auto px-6">

        {/* ── Hero ── */}
        <section className="pt-28 pb-10">
          <AnimatedSection>
            <h1 className="text-[52px] font-medium text-black dark:text-white leading-[1.2] tracking-[-0.025em] mb-5">
              Experiments
            </h1>
            <p className="text-[18px] text-[#525252] dark:text-runway-slate leading-[1.6] max-w-[600px]">
              Side projects, creative explorations, and things I built just
              because I wanted to see if I could.
            </p>
          </AnimatedSection>
        </section>

        {/* ── Cards ── */}
        <section className="py-10 pb-24">
          {experiments.length === 0 ? (
            <AnimatedSection>
              <div className="py-16 text-center">
                <p className="text-[16px] text-[#525252] dark:text-runway-slate">
                  No experiments published yet. In Notion, set{" "}
                  <code className="text-black dark:text-white">Category = Experiment</code>{" "}
                  and{" "}
                  <code className="text-black dark:text-white">Status = Published</code>.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="flex flex-col gap-16">
              {experiments.map((exp, i) => (
                <AnimatedSection key={exp.id} delay={i * 0.06}>
                  <CaseStudyCard study={exp} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-[#e5e5e5] dark:border-runway-border py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#999] dark:text-runway-footer">
            © {new Date().getFullYear()} Faiz Zuberi
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-[13px] text-[#999] dark:text-runway-footer hover:text-black dark:hover:text-white transition-colors"
            >
              Work
            </Link>
            <a
              href="https://www.linkedin.com/in/fzuberi87"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#999] dark:text-runway-footer hover:text-black dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:faiz.zuberi@gmail.com"
              className="text-[13px] text-[#999] dark:text-runway-footer hover:text-black dark:hover:text-white transition-colors"
            >
              faiz.zuberi@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
