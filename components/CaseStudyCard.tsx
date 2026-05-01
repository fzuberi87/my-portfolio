"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/types/notion";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const { slug, title, company, cover, logoUrl } = study;

  return (
    <Link href={`/case-studies/${slug}`} className="group block">
      <article>
        {/* Cover — full width, 2:1 ratio, xl radius, hairline border */}
        <div className="relative w-full aspect-[2/1] overflow-hidden rounded-2xl bg-el-strong dark:bg-el-dark-elevated mb-5 border border-el-hairline dark:border-el-hairline/20 transition-shadow duration-300 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)]">
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
        <div className="flex items-center gap-2.5 mb-2">
          {logoUrl ? (
            <Image src={logoUrl} width={20} height={20} alt={company}
              className="rounded-sm object-contain opacity-70" />
          ) : (
            <div className="w-5 h-5 rounded-sm bg-el-strong dark:bg-el-dark-elevated flex-shrink-0" />
          )}
          <span className="text-[13px] font-medium text-el-muted dark:text-el-on-dark-soft tracking-[0.01em]">
            {company}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-[32px] font-normal text-el-ink dark:text-el-on-dark leading-[1.15] tracking-[-0.02em] group-hover:opacity-70 transition-opacity duration-200">
          {title}
        </h2>
      </article>
    </Link>
  );
}
