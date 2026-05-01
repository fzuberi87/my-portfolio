import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dallas-based senior product designer with 12+ years of cross-disciplinary experience.",
};

const EXPERIENCE = [
  {
    company: "Allata",
    logoUrl: "https://logo.clearbit.com/allata.com",
    title: "Manager, Experience Design",
    period: "2022 – Present",
    description:
      "Leading experience design for B2B enterprise tools across healthcare, global tax, and other complex industries. Managing a team of designers and embedding design as a strategic partner across product and engineering.",
  },
  {
    company: "Creamwala",
    logoUrl: "",
    title: "Cofounder, Head of Design + Flavor Development",
    period: "2022 – Present",
    description:
      "Built a six-figure premium ice cream brand from zero — brand identity, packaging, flavor development, copywriting, and social. No VC, no storefront, purely organic growth across North Texas.",
  },
  {
    company: "Redfin",
    logoUrl: "https://logo.clearbit.com/redfin.com",
    title: "UX Designer II",
    period: "2021 – 2022",
    description:
      "Designed a centralized Change Order system for Redfin Home Services, bringing end-to-end visibility to a process that touches 73% of all renovation jobs.",
  },
  {
    company: "Intuit",
    logoUrl: "https://logo.clearbit.com/intuit.com",
    title: "Product Designer, Visual Design",
    period: "2019 – 2021",
    description:
      "Visual and product design across QuickBooks and TurboTax, contributing to design system components and consumer-facing tax flows.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">

      {/* ── Cover photo placeholder ── */}
      <div className="w-full h-[414px] bg-[#d9d9d9] dark:bg-runway-surface pt-[60px] overflow-hidden">
        {/* Replace this div with an <Image> once you have a hero photo */}
      </div>

      <div className="max-w-content mx-auto px-6">

        {/* ── Bio ── */}
        <section className="py-14">
          <AnimatedSection>
            <div className="max-w-[830px]">
              <h1 className="text-[52px] font-medium text-black dark:text-white leading-[1.2] tracking-[-0.025em] mb-6">
                I&apos;m Faiz. A product designer with 12+ years of experience
                across brand and product, at companies large and small, from
                tech to ice cream.
              </h1>

              <div className="text-[18px] text-[#525252] dark:text-runway-slate leading-[1.6] space-y-5">
                <p>
                  I&apos;m a Dallas-based senior product designer with 12+ years
                  of cross-disciplinary design experience. Currently, I&apos;m
                  an Experience Design Manager at Allata, where I design B2B
                  enterprise tools for healthcare, global tax firms, and other
                  hella complex industries.
                </p>
                <p>
                  My design sensibility is shaped by tastes in art, interiors,
                  film, music, and food. I care a lot about making sure my
                  designs have a soul (even if they&apos;re internal
                  dashboards). Especially in the era of AI.
                </p>
                <p>
                  On nights and weekends, I&apos;m the co-founder and creative
                  lead at Creamwala, a premium ice cream brand that weaves
                  together design, unique ice cream flavors, and cultural
                  storytelling. I built the brand from the ground up: flavors,
                  punny flavor names, brand voice, packaging, and aesthetic. I
                  drew from the experience of growing up as a
                  Pakistani-American and wanting to build something that finally
                  felt like it was made for me.
                </p>
                <p>
                  I studied advertising at DePaul University in Chicago, then
                  completed a UX certification at SMU after moving to Texas.
                </p>
                <p>
                  Outside of work, I&apos;m a proud dad of two, and fatherhood
                  has completely redefined my purpose in life. I&apos;ve also
                  written and illustrated a coffee table book called{" "}
                  <em>Little Bites of Urdu</em> — combining my love for food,
                  art, and the Urdu language.
                </p>
                <p>
                  Thanks for being here. If you want to chat, feel free to
                  reach out! I&apos;m always down for good coffee, virtual or
                  in person.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* ── Experience ── */}
        <section className="py-10 pb-24">
          <AnimatedSection>
            <h2 className="text-[52px] font-medium text-black dark:text-white leading-[1.2] tracking-[-0.025em] mb-16">
              Experience
            </h2>
          </AnimatedSection>

          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((job, i) => (
              <AnimatedSection key={job.company + job.title} delay={i * 0.06}>
                <div className="flex gap-[55px] items-start pb-12 border-b border-[#e5e5e5] dark:border-runway-border">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-[60px] h-[60px] rounded-lg bg-[#d9d9d9] dark:bg-runway-surface overflow-hidden flex items-center justify-center">
                    {job.logoUrl ? (
                      <Image
                        src={job.logoUrl}
                        width={60}
                        height={60}
                        alt={job.company}
                        className="object-contain p-2"
                      />
                    ) : (
                      <span className="text-[10px] font-semibold text-[#525252] dark:text-runway-slate text-center leading-tight px-1">
                        {job.company}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[20px] font-semibold text-black dark:text-white leading-[1.2] mb-3">
                      {job.company}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[20px] font-medium text-[#525252] dark:text-runway-slate leading-[1.2]">
                        {job.title}
                      </p>
                      <p className="text-[20px] font-medium text-[#525252] dark:text-runway-slate leading-[1.2] whitespace-nowrap ml-4">
                        {job.period}
                      </p>
                    </div>
                    <p className="text-[16px] text-[#525252] dark:text-runway-midslate leading-[1.6]">
                      {job.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
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
