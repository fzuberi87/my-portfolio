import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Multidisciplinary designer working at the intersection of UX, brand identity, and cultural storytelling.",
};

const EXPERIENCE = [
  {
    role: "Founder & Creative Director",
    company: "Creamwala",
    period: "2023 – Present",
    note: "Built a six-figure consumer brand from zero — no VC, no storefront, no PR.",
  },
  {
    role: "UX Lead",
    company: "Caris Life Sciences",
    period: "2025",
    note: "Redesigned cohort-analysis flows for a precision-medicine data platform used by oncology researchers and clinicians.",
  },
  {
    role: "Lead Product Designer",
    company: "Global Tax Management",
    period: "2024",
    note: "First mobile strategy for an enterprise tax platform; new components adopted into the firm's global design system.",
  },
  {
    role: "Lead Product Designer",
    company: "Redfin Home Services",
    period: "2023",
    note: "Designed a centralized Change Order system for a process that touches 73% of all renovation jobs.",
  },
  {
    role: "Author & Designer",
    company: "Riwayat House",
    period: "2024",
    note: "Wrote and designed Little Bites of Urdu — a coffee-table book celebrating Pakistani language and food culture.",
  },
];

const SKILLS = [
  "UX Research",
  "Product Design",
  "Design Systems",
  "Brand Identity",
  "Visual Design",
  "Art Direction",
  "Mobile Design",
  "Information Architecture",
  "Copywriting",
  "Packaging Design",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-runway-black">
      {/* ── Hero ── */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-label mb-6">About</p>
          <h1 className="text-display text-white mb-10 max-w-2xl">
            Design that means something.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            <p className="text-[17px] text-runway-slate leading-[1.6] tracking-[-0.01em]">
              I'm a multidisciplinary designer working across UX, brand
              identity, and cultural storytelling. My work spans enterprise
              SaaS, consumer brands, and self-initiated projects at the
              intersection of design and identity.
            </p>
            <p className="text-[17px] text-runway-slate leading-[1.6] tracking-[-0.01em]">
              I believe the best design is specific — it earns its details,
              speaks to a real person, and leaves nothing vague. Whether I'm
              redesigning a clinician's dashboard or launching an ice cream
              brand, the standard is the same.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-runway-border max-w-6xl mx-auto" />

      {/* ── Experience ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-label mb-12">Experience</p>
        </AnimatedSection>

        <div className="divide-y divide-runway-border">
          {EXPERIENCE.map((item, i) => (
            <AnimatedSection key={item.company} delay={i * 0.06}>
              <div className="py-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:gap-8 items-start">
                <div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    <h3 className="text-[15px] font-medium text-white tracking-[-0.01em]">
                      {item.role}
                    </h3>
                    <span className="text-sm text-runway-slate">{item.company}</span>
                  </div>
                  <p className="text-[14px] text-runway-midslate leading-[1.6]">
                    {item.note}
                  </p>
                </div>
                <span className="text-[13px] text-runway-footer whitespace-nowrap pt-0.5">
                  {item.period}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-runway-border max-w-6xl mx-auto" />

      {/* ── Skills ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-label mb-8">Capabilities</p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="text-[13px] font-medium text-runway-muted border border-runway-border px-4 py-2 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-runway-border max-w-6xl mx-auto" />

      {/* ── CTA ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-label mb-5">Get in touch</p>
          <h2 className="text-section text-white mb-8 max-w-lg">
            Let's build something worth showing.
          </h2>
          <a
            href="mailto:hello@yourname.com"
            className="inline-flex items-center gap-2.5 text-sm font-medium px-6 py-3 rounded bg-white text-black hover:bg-runway-muted transition-colors duration-200"
          >
            Say hello
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </AnimatedSection>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-runway-border px-6 py-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-runway-footer">
          © {new Date().getFullYear()} Your Name
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-[13px] text-runway-footer hover:text-white transition-colors duration-200"
          >
            Work
          </Link>
          <a
            href="https://linkedin.com/in/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-runway-footer hover:text-white transition-colors duration-200"
          >
            LinkedIn
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
