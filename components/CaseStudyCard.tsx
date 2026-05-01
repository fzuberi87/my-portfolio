"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/types/notion";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const { slug, title, company, cover, logoUrl } = study;

  return (
    <Link href={`/case-studies/${slug}`} className="group block">
      <motion.article
        whileHover={{ opacity: 0.9 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Cover image — full width, tall, large radius (matches Figma 32px) */}
        <div className="relative w-full aspect-[2/1] overflow-hidden rounded-3xl bg-[#d9d9d9] dark:bg-runway-surface mb-5">
          {cover && (
            <Image
              src={cover}
              fill
              alt={title}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 850px"
            />
          )}
        </div>

        {/* Company logo + name */}
        <div className="flex items-center gap-2.5 mb-2.5">
          {logoUrl ? (
            <Image
              src={logoUrl}
              width={22}
              height={22}
              alt={company}
              className="rounded object-contain"
            />
          ) : (
            <div className="w-[22px] h-[22px] rounded bg-[#d9d9d9] dark:bg-runway-surface flex-shrink-0" />
          )}
          <span className="text-[14px] font-medium text-[#525252] dark:text-runway-slate leading-none">
            {company}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[32px] font-medium text-black dark:text-white leading-[1.2] tracking-[-0.02em] group-hover:opacity-70 transition-opacity duration-200">
          {title}
        </h2>
      </motion.article>
    </Link>
  );
}
