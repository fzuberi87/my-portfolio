import { getCaseStudies } from "@/lib/notion";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Faiz Zuberi — Product Designer",
  description:
    "Product designer with 12+ years of experience across brand and product, from tech to ice cream.",
};

const RESUME_URL =
  "https://drive.google.com/file/d/1AQcIBOBFekYLvCIaES_BljntPMIeLQT3/view?usp=sharing";

export default async function HomePage() {
  const studies = await getCaseStudies();

  return (
    <div className="min-h-screen bg-el-canvas dark:bg-el-dark">
      <div className="max-w-content mx-auto px-6">

        {/* ── Hero ── */}
        <section className="relative pt-36 pb-24 overflow-hidden">
          {/* Atmospheric gradient orbs */}
          <div className="orb orb-mint   w-[480px] h-[480px] -top-24  -left-32  dark:opacity-20" />
          <div className="orb orb-peach  w-[360px] h-[360px] top-8    -right-24 dark:opacity-20" />
          <div className="orb orb-lavender w-[300px] h-[300px] bottom-0 left-1/2  dark:opacity-15" />

          <AnimatedSection className="relative z-10">
            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-normal text-el-ink dark:text-el-on-dark leading-[1.08] tracking-[-0.03em] mb-6 max-w-[830px]">
              I&apos;m Faiz. A product designer with 12+ years of experience
              across brand and product, at companies large and small, from tech
              to ice cream.
            </h1>
            <p className="text-[18px] text-el-body dark:text-el-on-dark-soft leading-[1.6] tracking-[0.01em] mb-10 max-w-[560px]">
              Currently looking for my next challenge, as long as it&apos;s the
              right fit.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="mailto:faiz.zuberi@gmail.com"
                className="inline-flex items-center h-10 px-5 rounded-pill bg-el-primary dark:bg-el-on-dark text-white dark:text-el-ink text-[15px] font-medium hover:bg-el-ink dark:hover:opacity-80 transition-colors duration-200"
              >
                Email me
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-10 px-5 rounded-pill border border-el-hairline-strong dark:border-el-hairline/30 text-el-ink dark:text-el-on-dark text-[15px] font-medium hover:opacity-60 transition-opacity duration-200"
              >
                Download resume
              </a>
            </div>
          </AnimatedSection>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-el-hairline dark:border-el-hairline/20" />

        {/* ── Select work ── */}
        <section className="py-20">
          <AnimatedSection>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-normal text-el-ink dark:text-el-on-dark leading-[1.1] tracking-[-0.02em] mb-12">
              Select work
            </h2>
          </AnimatedSection>

          {studies.length === 0 ? (
            <AnimatedSection>
              <div className="py-16 text-center">
                <p className="text-[15px] text-el-muted dark:text-el-on-dark-soft">
                  No published case studies yet — set{" "}
                  <code className="text-el-ink dark:text-el-on-dark">Status = Published</code>{" "}
                  and{" "}
                  <code className="text-el-ink dark:text-el-on-dark">Category = Case Study</code>{" "}
                  in Notion.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="flex flex-col gap-16">
              {studies.map((study, i) => (
                <AnimatedSection key={study.id} delay={i * 0.06}>
                  <CaseStudyCard study={study} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-el-hairline dark:border-el-hairline/20" />

        {/* ── How I lead / Problems I solve ── */}
        <section className="py-20 grid grid-cols-1 sm:grid-cols-2 gap-12">
          <AnimatedSection>
            <h2 className="font-display text-[36px] font-normal text-el-ink dark:text-el-on-dark leading-[1.17] tracking-[-0.02em] mb-4">
              How I lead
            </h2>
            <p className="text-[16px] text-el-body dark:text-el-on-dark-soft leading-[1.6] tracking-[0.01em]">
              I lead by building trust first — with engineers, PMs, and
              stakeholders. I ask the uncomfortable questions early so we can
              make good decisions fast. I believe strong design culture is built
              through clarity, not authority.
            </p>
            <a href="/about"
              className="inline-block mt-5 text-[15px] font-medium text-el-ink dark:text-el-on-dark hover:opacity-50 transition-opacity">
              Read more ›
            </a>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <h2 className="font-display text-[36px] font-normal text-el-ink dark:text-el-on-dark leading-[1.17] tracking-[-0.02em] mb-4">
              Problems I solve
            </h2>
            <p className="text-[16px] text-el-body dark:text-el-on-dark-soft leading-[1.6] tracking-[0.01em]">
              Complex enterprise flows that feel like quicksand. Brand work that
              looks like every other brand. Products that technically work but
              nobody wants to use. I bring systems thinking and genuine craft
              to both.
            </p>
            <a href="/about"
              className="inline-block mt-5 text-[15px] font-medium text-el-ink dark:text-el-on-dark hover:opacity-50 transition-opacity">
              Read more ›
            </a>
          </AnimatedSection>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-el-hairline dark:border-el-hairline/20" />

        {/* ── Experiments ── */}
        <section className="relative py-20 pb-28 overflow-hidden">
          <div className="orb orb-sky  w-[320px] h-[320px] -right-20 top-10 dark:opacity-15" />
          <AnimatedSection className="relative z-10">
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-normal text-el-ink dark:text-el-on-dark leading-[1.1] tracking-[-0.02em] mb-4">
              Experiments
            </h2>
            <p className="text-[16px] text-el-body dark:text-el-on-dark-soft leading-[1.6] tracking-[0.01em] max-w-[520px] mb-6">
              Side projects, creative explorations, and things I built just
              because I wanted to see if I could.
            </p>
            <Link href="/experiments"
              className="text-[15px] font-medium text-el-ink dark:text-el-on-dark hover:opacity-50 transition-opacity">
              See work ›
            </Link>
          </AnimatedSection>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-el-hairline dark:border-el-hairline/20 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-el-muted dark:text-el-on-dark-soft">
            © {new Date().getFullYear()} Faiz Zuberi
          </p>
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/fzuberi87" target="_blank" rel="noopener noreferrer"
              className="text-[13px] text-el-muted dark:text-el-on-dark-soft hover:text-el-ink dark:hover:text-el-on-dark transition-colors">
              LinkedIn
            </a>
            <a href="mailto:faiz.zuberi@gmail.com"
              className="text-[13px] text-el-muted dark:text-el-on-dark-soft hover:text-el-ink dark:hover:text-el-on-dark transition-colors">
              faiz.zuberi@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
