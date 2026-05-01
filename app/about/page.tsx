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
    <div className="min-h-screen bg-el-canvas dark:bg-el-dark">

      {/* ── Cover photo placeholder ── */}
      <div className="w-full h-[414px] bg-el-strong dark:bg-el-dark-elevated pt-[64px] overflow-hidden">
        {/* Replace with <Image src="/cover.jpg" fill className="object-cover" alt="Faiz Zuberi" /> */}
      </div>

      <div className="max-w-content mx-auto px-6">

        {/* ── Bio ── */}
        <section className="py-14">
          <AnimatedSection>
            <div className="max-w-[830px]">
              <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-normal text-el-ink dark:text-el-on-dark leading-[1.08] tracking-[-0.03em] mb-6">
                I&apos;m Faiz. A product designer with 12+ years of experience
                across brand and product, at companies large and small, from
                tech to ice cream.
              </h1>

              <div className="text-[18px] text-el-body dark:text-el-on-dark-soft leading-[1.6] tracking-[0.01em] space-y-5">
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

        {/* ── Divider ── */}
        <div className="border-t border-el-hairline dark:border-el-hairline/20" />

        {/* ── Experience ── */}
        <section className="py-14 pb-24">
          <AnimatedSection>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-normal text-el-ink dark:text-el-on-dark leading-[1.1] tracking-[-0.02em] mb-14">
              Experience
            </h2>
          </AnimatedSection>

          <div className="flex flex-col">
            {EXPERIENCE.map((job, i) => (
              <AnimatedSection key={job.company + job.title} delay={i * 0.06}>
                <div className="flex gap-8 sm:gap-14 items-start py-10 border-b border-el-hairline dark:border-el-hairline/20">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-[60px] h-[60px] rounded-lg bg-el-strong dark:bg-el-dark-elevated overflow-hidden flex items-center justify-center border border-el-hairline dark:border-el-hairline/20">
                    {job.logoUrl ? (
                      <Image
                        src={job.logoUrl}
                        width={60}
                        height={60}
                        alt={job.company}
                        className="object-contain p-2"
                      />
                    ) : (
                      <span className="text-[10px] font-semibold text-el-muted text-center leading-tight px-1">
                        {job.company}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <p className="text-[18px] font-semibold text-el-ink dark:text-el-on-dark leading-[1.2]">
                        {job.company}
                      </p>
                      <p className="text-[14px] text-el-muted dark:text-el-on-dark-soft whitespace-nowrap mt-0.5">
                        {job.period}
                      </p>
                    </div>
                    <p className="text-[15px] text-el-body dark:text-el-on-dark-soft leading-[1.4] mb-3">
                      {job.title}
                    </p>
                    <p className="text-[15px] text-el-body dark:text-el-on-dark-soft leading-[1.6]">
                      {job.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
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
