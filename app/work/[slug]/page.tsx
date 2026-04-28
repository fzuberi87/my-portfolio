import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProjectBySlug, getProjectContent, getAllProjectSlugs } from '@/lib/notion';
import { NotionRenderer } from '@/components/NotionRenderer';
import { AnimatedSection } from '@/components/AnimatedSection';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.cover ? [{ url: project.cover, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const content = await getProjectContent(project.id);
  const hasCover = !!project.cover;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200 group"
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
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cover image ── */}
      {hasCover && (
        <div className="relative w-full h-[55vh] min-h-[360px] pt-16">
          <Image
            src={project.cover}
            fill
            alt={project.title}
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
      )}

      {/* ── Project header ── */}
      <div
        className={`max-w-3xl mx-auto px-6 ${
          hasCover ? 'relative -mt-20' : 'pt-28'
        }`}
      >
        <AnimatedSection>
          <h1 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-5 tracking-[-0.025em] leading-tight">
            {project.title}
          </h1>

          {project.description && (
            <p className="text-xl text-gray-400 leading-relaxed mb-10 font-light max-w-xl">
              {project.description}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-8 border-y border-gray-100">
            {project.role && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-300 mb-1">
                  Role
                </p>
                <p className="text-sm font-medium text-gray-700">{project.role}</p>
              </div>
            )}
            {project.year && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-300 mb-1">
                  Year
                </p>
                <p className="text-sm font-medium text-gray-700">{project.year}</p>
              </div>
            )}
            {project.tags.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-300 mb-1">
                  Disciplines
                </p>
                <p className="text-sm font-medium text-gray-700">{project.tags.join(', ')}</p>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* ── Notion content ── */}
        <AnimatedSection delay={0.15} className="py-14">
          <NotionRenderer content={content} />
        </AnimatedSection>

        {/* ── Back CTA ── */}
        <AnimatedSection delay={0.1} className="py-16 border-t border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors duration-200 group"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-gray-100 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L5 8l5 5"
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
