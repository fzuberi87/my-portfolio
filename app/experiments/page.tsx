import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { getExperiments } from "@/lib/notion";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Experiments",
  description:
    "Side projects, creative explorations, and things I built just because I wanted to see if I could.",
};

export default async function ExperimentsPage() {
  const experiments = await getExperiments();

  return (
    <div className="min-h-screen bg-el-canvas dark:bg-el-dark">
      <div className="max-w-content mx-auto px-6">

        {/* ── Hero ── */}
        <section className="relative pt-36 pb-16 overflow-hidden">
          <div className="orb orb-rose w-[360px] h-[360px] -top-16 -right-24 dark:opacity-15" />
          <div className="orb orb-lavender w-[280px] h-[280px] top-20 -left-20 dark:opacity-15" />
          <AnimatedSection className="relative z-10">
            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-normal text-el-ink dark:text-el-on-dark leading-[1.08] tracking-[-0.03em] mb-5">
              Experiments
            </h1>
            <p className="text-[18px] text-el-body dark:text-el-on-dark-soft leading-[1.6] tracking-[0.01em] max-w-[560px]">
              Side projects, creative explorations, and things I built just
              because I wanted to see if I could.
            </p>
          </AnimatedSection>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-el-hairline dark:border-el-hairline/20" />

        {/* ── Cards ── */}
        <section className="py-16 pb-24">
          {experiments.length === 0 ? (
            <AnimatedSection>
              <div className="py-16 text-center">
                <p className="text-[15px] text-el-muted dark:text-el-on-dark-soft">
                  No experiments published yet. In Notion, set{" "}
                  <code className="text-el-ink dark:text-el-on-dark">Category = Experiment</code>{" "}
                  and{" "}
                  <code className="text-el-ink dark:text-el-on-dark">Status = Published</code>.
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
        <footer className="border-t border-el-hairline dark:border-el-hairline/20 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-el-muted dark:text-el-on-dark-soft">
            © {new Date().getFullYear()} Faiz Zuberi
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/fzuberi87"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-el-muted dark:text-el-on-dark-soft hover:text-el-ink dark:hover:text-el-on-dark transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:faiz.zuberi@gmail.com"
              className="text-[13px] text-el-muted dark:text-el-on-dark-soft hover:text-el-ink dark:hover:text-el-on-dark transition-colors"
            >
              faiz.zuberi@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
