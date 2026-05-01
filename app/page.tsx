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
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-content mx-auto px-6">

        {/* ── Hero ── */}
        <section className="pt-28 pb-16">
          <AnimatedSection>
            <h1 className="text-[52px] font-medium text-black dark:text-white leading-[1.2] tracking-[-0.025em] mb-5 max-w-[830px]">
              I&apos;m Faiz. A product designer with 12+ years of experience
              across brand and product, at companies large and small, from tech
              to ice cream.
            </h1>
            <p className="text-[24px] text-[#525252] dark:text-runway-slate leading-[1.5] mb-8">
              Currently looking for my next challenge, as long as it&apos;s the
              right fit.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="mailto:faiz.zuberi@gmail.com"
                className="inline-flex items-center px-6 py-2 rounded-full bg-[#525252] dark:bg-white text-white dark:text-black text-[18px] font-medium hover:opacity-80 transition-opacity duration-200"
              >
                Email me
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2 rounded-full border border-[#525252] dark:border-runway-border text-black dark:text-white text-[18px] font-medium hover:opacity-60 transition-opacity duration-200"
              >
                Download resume
              </a>
            </div>
          </AnimatedSection>
        </section>

        {/* ── Select work ── */}
        <section className="py-10">
          <AnimatedSection>
            <h2 className="text-[52px] font-medium text-black dark:text-white leading-[1.2] tracking-[-0.025em] mb-10">
              Select work
            </h2>
          </AnimatedSection>

          {studies.length === 0 ? (
            <AnimatedSection>
              <div className="py-16 text-center">
                <p className="text-[16px] text-[#525252] dark:text-runway-slate">
                  No published case studies yet. Set Status ={" "}
                  <code className="text-black dark:text-white">Published</code>{" "}
                  in your Notion database.
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

        {/* ── How I lead / Problems I solve ── */}
        <section className="py-20 grid grid-cols-1 sm:grid-cols-2 gap-12">
          <AnimatedSection>
            <h2 className="text-[42px] font-medium text-black dark:text-white leading-[1.2] tracking-[-0.02em] mb-4">
              How I lead
            </h2>
            <p className="text-[18px] text-[#525252] dark:text-runway-slate leading-[1.6]">
              I lead by building trust first — with engineers, PMs, and
              stakeholders. I ask the uncomfortable questions early so we can
              make good decisions fast. I believe strong design culture is built
              through clarity, not authority.
            </p>
            <a
              href="/about"
              className="inline-block mt-5 text-[18px] font-medium text-black dark:text-white hover:opacity-60 transition-opacity"
            >
              Read more ›
            </a>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <h2 className="text-[42px] font-medium text-black dark:text-white leading-[1.2] tracking-[-0.02em] mb-4">
              Problems I solve
            </h2>
            <p className="text-[18px] text-[#525252] dark:text-runway-slate leading-[1.6]">
              Complex enterprise flows that feel like quicksand. Brand work that
              looks like every other brand. Products that technically work but
              nobody wants to use. I bring systems thinking and genuine
              craft to both.
            </p>
            <a
              href="/about"
              className="inline-block mt-5 text-[18px] font-medium text-black dark:text-white hover:opacity-60 transition-opacity"
            >
              Read more ›
            </a>
          </AnimatedSection>
        </section>

        {/* ── Experiments ── */}
        <section className="py-10 pb-24">
          <AnimatedSection>
            <h2 className="text-[52px] font-medium text-black dark:text-white leading-[1.2] tracking-[-0.025em] mb-4">
              Experiments
            </h2>
            <p className="text-[18px] text-[#525252] dark:text-runway-slate leading-[1.6] max-w-[830px] mb-6">
              Side projects, creative explorations, and things I built just
              because I wanted to see if I could.
            </p>
            <Link
              href="/experiments"
              className="text-[18px] font-medium text-black dark:text-white hover:opacity-60 transition-opacity"
            >
              See work ›
            </Link>
          </AnimatedSection>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-[#e5e5e5] dark:border-runway-border py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#999] dark:text-runway-footer">
            © {new Date().getFullYear()} Faiz Zuberi
          </p>
          <div className="flex items-center gap-6">
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
