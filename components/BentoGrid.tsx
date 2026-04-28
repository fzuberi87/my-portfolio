'use client';

import { AnimatedSection } from './AnimatedSection';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types/notion';

/*
  Bento rhythm (12-col grid):
    index 0 → col-span-7  (large, fullbleed)
    index 1 → col-span-5  (medium, fullbleed)
    index 2 → col-span-5  (medium, fullbleed)
    index 3 → col-span-7  (large, fullbleed)
    index 4+ → col-span-4 thirds (white card)
*/

const SIZES = [
  'col-span-12 lg:col-span-7',
  'col-span-12 lg:col-span-5',
  'col-span-12 lg:col-span-5',
  'col-span-12 lg:col-span-7',
];

function colClass(index: number) {
  if (index < 4) return SIZES[index];
  return 'col-span-12 sm:col-span-6 lg:col-span-4';
}

function variant(index: number): 'fullbleed' | 'card' {
  return index < 4 ? 'fullbleed' : 'card';
}

function delay(index: number) {
  return index < 4 ? index * 0.08 : (index % 3) * 0.06;
}

interface Props {
  projects: Project[];
}

export function BentoGrid({ projects }: Props) {
  if (!projects.length) {
    return (
      <div className="col-span-12 py-20 text-center text-gray-400 text-sm">
        No published projects yet. Add some to your Notion database.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-5">
      {projects.map((project, index) => (
        <AnimatedSection
          key={project.id}
          delay={delay(index)}
          className={colClass(index)}
        >
          <ProjectCard project={project} variant={variant(index)} />
        </AnimatedSection>
      ))}
    </div>
  );
}
