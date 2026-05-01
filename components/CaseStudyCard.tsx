"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/types/notion";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const { slug, title, company, role, industry, skills, year, cover } = study;

  return (
    <Link href={`/case-studies/${slug}`} className="group block">
      <motion.article
        whileHover={{ opacity: 0.85 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-runway-surface rounded overflow-hidden border border-runway-border"
      >
        {/* Cover — image IS the card */}
        <div className="relative aspect-[16/9] overflow-hidden bg-runway-surface">
          {cover ? (
            <Image
              src={cover}
              fill
              alt={title}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-runway-deepblack" />
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Industry tag — Runway uppercase label style */}
          {industry && (
            <p className="text-label text-runway-slate mb-3">{industry}</p>
          )}

          {/* Title */}
          <h2 className="text-[17px] font-normal text-white leading-[1.2] tracking-[-0.02em] mb-1.5 group-hover:text-runway-muted transition-colors duration-200">
            {title}
          </h2>

          {/* Company · Role · Year */}
          <p className="text-sm text-runway-slate mb-4 leading-snug">
            {[company, role, year].filter(Boolean).join(" · ")}
          </p>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] font-medium text-runway-muted border border-runway-border px-2.5 py-1 rounded"
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
