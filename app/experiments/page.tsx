import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Experiments",
  description:
    "Side projects, creative explorations, and things I built just because I wanted to see if I could.",
};

/*
  To add experiments to Notion later:
  1. Open your Notion "Case Studies" database
  2. Add a new "Select" property called "Category" with options: "Case Study", "Experiment"
  3. Set existing entries to Category = "Case Study"
  4. Add new entries with Category = "Experiment" and Status = "Published"
  5. Update lib/notion.ts to add a getExperiments() function that filters
     by Status = "Published" AND Category = "Experiment"
*/

const EXPERIMENTS = [
  {
    slug: "creaamos",
    title: "CreamOS",
    company: "Creamwala",
    logoUrl: "",
    cover: "",
    description:
      "An experimental internal operating system for managing Creamwala's brand, flavors, and drop schedule — built as a single-page design exploration.",
  },
];

export default function ExperimentsPage() {
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
        <section className="py-10 pb-24 flex flex-col gap-16">
          {EXPERIMENTS.map((exp, i) => (
            <AnimatedSection key={exp.slug} delay={i * 0.06}>
              <article>
                {/* Cover */}
                <div className="relative w-full aspect-[2/1] overflow-hidden rounded-3xl bg-[#d9d9d9] dark:bg-runway-surface mb-5">
                  {exp.cover && (
                    <Image
                      src={exp.cover}
                      fill
                      alt={exp.title}
                      className="object-cover"
                      sizes="850px"
                    />
                  )}
                </div>

                {/* Company */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  {exp.logoUrl ? (
                    <Image
                      src={exp.logoUrl}
                      width={22}
                      height={22}
                      alt={exp.company}
                      className="rounded object-contain"
                    />
                  ) : (
                    <div className="w-[22px] h-[22px] rounded bg-[#d9d9d9] dark:bg-runway-surface flex-shrink-0" />
                  )}
                  <span className="text-[14px] font-medium text-[#525252] dark:text-runway-slate">
                    {exp.company}
                  </span>
                </div>

                {/* Title + description */}
                <h2 className="text-[32px] font-medium text-black dark:text-white leading-[1.2] tracking-[-0.02em] mb-3">
                  {exp.title}
                </h2>
                <p className="text-[18px] text-[#525252] dark:text-runway-slate leading-[1.6] max-w-[600px]">
                  {exp.description}
                </p>
              </article>
            </AnimatedSection>
          ))}
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
