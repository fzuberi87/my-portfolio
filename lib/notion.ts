import { Client } from "@notionhq/client";
import type { CaseStudy, NotionBlock } from "@/types/notion";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

// ---------------------------------------------------------------------------
// Slug helpers
// ---------------------------------------------------------------------------

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ---------------------------------------------------------------------------
// Database queries
// ---------------------------------------------------------------------------

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: "Status", select: { equals: "Published" } },
      sorts: [{ property: "Year", direction: "descending" }],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (response.results as any[]).map(formatCaseStudy);
  } catch (err) {
    console.error("[Notion] getCaseStudies failed:", (err as Error).message);
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const all = await getCaseStudies();
  return all.find((cs) => cs.slug === slug) ?? null;
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

// ---------------------------------------------------------------------------
// Block content
// ---------------------------------------------------------------------------

export async function getCaseStudyBlocks(pageId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...(res.results as NotionBlock[]));
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}

// ---------------------------------------------------------------------------
// Formatter
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatCaseStudy(page: any): CaseStudy {
  const props = page.properties;
  const title: string = props.Name?.title?.[0]?.plain_text ?? "Untitled";

  return {
    id: page.id,
    slug: toSlug(title),
    title,
    company: props.Company?.rich_text?.[0]?.plain_text ?? "",
    role: props.Role?.rich_text?.[0]?.plain_text ?? "",
    industry: props.Industry?.select?.name ?? "",
    skills: props.Skills?.multi_select?.map((s: { name: string }) => s.name) ?? [],
    year: props.Year?.number ?? new Date().getFullYear(),
    cover: page.cover?.external?.url ?? page.cover?.file?.url ?? "",
  };
}
