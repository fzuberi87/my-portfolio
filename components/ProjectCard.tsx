'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/types/notion';

const GRADIENTS = [
  'from-indigo-400 to-violet-600',
  'from-rose-400 to-orange-400',
  'from-emerald-400 to-teal-500',
  'from-blue-400 to-sky-500',
  'from-amber-400 to-orange-500',
  'from-pink-400 to-rose-600',
];

function gradientFor(title: string) {
  return GRADIENTS[Math.abs(title.charCodeAt(0) + title.length) % GRADIENTS.length];
}

interface Props {
  project: Project;
  variant?: 'fullbleed' | 'card';
}

export function ProjectCard({ project, variant = 'card' }: Props) {
  const { title, slug, description, cover, tags, year, role } = project;
  const gradient = gradientFor(title);

  if (variant === 'fullbleed') {
    return (
      <Link href={`/work/${slug}`} className="block h-full">
        <motion.div
          className="group relative h-full min-h-[380px] lg:min-h-[460px] rounded-3xl overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {cover ? (
            <Image
              src={cover}
              fill
              alt={title}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h2 className="text-2xl lg:text-[28px] font-bold text-white mb-2 tracking-tight leading-tight">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-white/65 leading-relaxed max-w-md line-clamp-2">
                {description}
              </p>
            )}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-white/40">
                {[role, year].filter(Boolean).join(' · ')}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white group-hover:gap-3 transition-all duration-300">
                View project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  /* ── card variant ── */
  return (
    <Link href={`/work/${slug}`} className="block h-full">
      <motion.div
        className="group bg-white rounded-3xl overflow-hidden border border-gray-100/80 h-full cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
        whileHover={{
          y: -4,
          boxShadow: '0 24px 64px -12px rgba(0,0,0,0.12)',
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Image area */}
        <div className="relative h-52 overflow-hidden">
          {cover ? (
            <Image
              src={cover}
              fill
              alt={title}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          )}
        </div>

        {/* Text area */}
        <div className="p-6">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h2 className="text-[17px] font-semibold text-gray-900 mb-1.5 tracking-tight leading-snug">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{description}</p>
          )}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs text-gray-300">
              {[role, year].filter(Boolean).join(' · ')}
            </span>
            <span className="text-sm font-medium text-indigo-500 group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
