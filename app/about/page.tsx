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
    company: "Global Tax Management (Confidential)",
    period: "2024",
    note: "First mobile strategy for an enterprise tax platform; new components adopted into the firm's global design system.",
  },
  {
    role: "Lead Product Designer",
    company: "Redfin Home Services",
    period: "2023",
    note: "Designed a centralized Change Order system that brought full lifecycle visibility to a process spanning 73 % of renovation jobs.",
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
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-36 pb-20 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-5">
            About
          </p>
          <h1 className="text-[clamp(2.75rem,6vw,4.5rem)] font-bold text-gray-900 leading-[1.06] tracking-[-0.03em] mb-8 max-w-2xl">
            Design that means something.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            <p className="text-lg text-gray-500 leading-relaxed font-light">
              I'm a multidisciplinary designer working across UX, brand
              identity, and cultural storytelling. My work spans enterprise
              SaaS, consumer brands, and self-initiated projects that sit at the
              intersection of design and identity.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed font-light">
              I believe the best design is specific — it earns its details,
              speaks to a real person, and leaves nothing vague. Whether I'm
              redesigning a clinician's dashboard or launching an ice cream
              brand, the standard is the same.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-gray-100 max-w-6xl mx-auto" />

      {/* ── Experience ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-10">
            Experience
          </p>
        </AnimatedSection>

        <div className="space-y-0 divide-y divide-gray-100">
          {EXPERIENCE.map((item, i) => (
            <AnimatedSection key={item.company} delay={i * 0.06}>
              <div className="py-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-8 items-start">
                <div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    <h3 className="text-[16px] font-semibold text-gray-900">
                      {item.role}
                    </h3>
                    <span className="text-sm text-gray-400">{item.company}</span>
                  </div>
                  <p className="text-[15px] text-gray-500 leading-relaxed">
                    {item.note}
                  </p>
                </div>
                <span className="text-sm text-gray-300 whitespace-nowrap pt-0.5">
                  {item.period}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-gray-100 max-w-6xl mx-auto" />

      {/* ── Skills ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-8">
            Capabilities
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="text-sm font-medium text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-gray-100 max-w-6xl mx-auto" />

      {/* ── Contact CTA ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-4">
              Get in touch
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Let's build something worth showing.
            </h2>
            <a
              href="mailto:hello@yourname.com"
              className="inline-flex items-center gap-2.5 text-sm font-medium px-6 py-3.5 rounded-full bg-gray-950 text-white hover:bg-gray-700 transition-colors duration-200"
            >
              Say hello
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="opacity-70"
              >
                <path
                  d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 px-6 py-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-300">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-xs text-gray-300 hover:text-gray-600 transition-colors"
          >
            Case Studies
          </Link>
          <a
            href="https://linkedin.com/in/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-300 hover:text-gray-600 transition-colors"
          >
            LinkedIn
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
