import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getCaseStudyBySlug,
  getCaseStudyBlocks,
  getAllSlugs,
} from "@/lib/notion";
import { NotionBlocks } from "@/components/NotionBlocks";
import { AnimatedSection } from "@/components/AnimatedSection";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Not found" };
  return {
    title: study.title,
    description: `${study.role} at ${study.company} · ${study.year}`,
    openGraph: {
      title: study.title,
      images: study.cover ? [{ url: study.cover, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const blocks = await getCaseStudyBlocks(study.id);

  const meta = [
    { label: "Company", value: study.company },
    { label: "Role", value: study.role },
    { label: "Industry", value: study.industry },
    { label: "Year", value: study.year ? String(study.year) : "" },
  ].filter((m) => m.value);

  return (
    <div className="min-h-screen bg-runway-black">
      {/* ── Top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-runway-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-runway-slate hover:text-white transition-colors duration-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
            >
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All work
          </Link>

          {study.industry && (
            <p className="text-label">{study.industry}</p>
          )}
        </div>
      </div>

      {/* ── Cover image — full-bleed cinematic ── */}
      {study.cover ? (
        <div className="relative w-full h-[55vh] min-h-[360px] pt-16">
          <Image
            src={study.cover}
            fill
            alt={study.title}
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
      ) : (
        <div className="pt-16 h-24" />
      )}

      {/* ── Header ── */}
      <div
        className={`max-w-3xl mx-auto px-6 ${
          study.cover ? "relative -mt-20" : "pt-16"
        }`}
      >
        <AnimatedSection>
          <h1 className="text-section text-white leading-tight tracking-[-0.03em] mb-7">
            {study.title}
          </h1>

          {/* Meta grid */}
          {meta.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-5 py-7 border-y border-runway-border mb-0">
              {meta.map(({ label, value }) => (
                <div key={label}>
                  <p className="text-label mb-1.5">{label}</p>
                  <p className="text-[14px] font-medium text-white">{value}</p>
                </div>
              ))}
              {study.skills.length > 0 && (
                <div>
                  <p className="text-label mb-1.5">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {study.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium text-runway-muted border border-runway-border px-2.5 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </AnimatedSection>

        {/* ── Block content ── */}
        <AnimatedSection delay={0.12} className="pt-10 pb-20">
          <NotionBlocks blocks={blocks} />
        </AnimatedSection>

        {/* ── Back CTA ── */}
        <AnimatedSection className="pb-20 border-t border-runway-border pt-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm text-runway-slate hover:text-white transition-colors duration-200"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded border border-runway-border group-hover:border-runway-muted transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9 2L4 7l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Back to all work
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
