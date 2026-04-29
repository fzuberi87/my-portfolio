"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/types/notion";

const GRADIENTS = [
  "from-slate-200 to-slate-300",
  "from-stone-200 to-stone-300",
  "from-zinc-200 to-zinc-300",
  "from-neutral-200 to-neutral-300",
  "from-gray-200 to-gray-300",
];

function placeholderGradient(seed: string) {
  return GRADIENTS[seed.charCodeAt(0) % GRADIENTS.length];
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const { slug, title, company, role, industry, skills, year, cover } = study;
  const gradient = placeholderGradient(title);

  return (
    <Link href={`/case-studies/${slug}`} className="group block">
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] transition-shadow duration-300"
      >
        {/* Cover */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-50">
          {cover ? (
            <Image
              src={cover}
              fill
              alt={title}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Industry tag */}
          {industry && (
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-4">
              {industry}
            </span>
          )}

          {/* Title */}
          <h2 className="text-[18px] font-semibold text-gray-900 leading-snug tracking-tight mb-1.5 group-hover:text-indigo-600 transition-colors duration-200">
            {title}
          </h2>

          {/* Company · Role · Year */}
          <p className="text-sm text-gray-400 mb-4">
            {[company, role, year].filter(Boolean).join(" · ")}
          </p>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] font-medium text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
