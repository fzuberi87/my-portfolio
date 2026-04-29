import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import type { Project } from "@/types/notion";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

const n2m = new NotionToMarkdown({ notionClient: notion });

const isConfigured = !!process.env.NOTION_SECRET && !!process.env.NOTION_DATABASE_ID;

// Returns raw Notion page results for the Published database entries.
export async function getCaseStudies() {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: { property: "Status", select: { equals: "Published" } },
  });
  return response.results;
}

// Returns formatted Project objects, sorted by Year descending.
export async function getPublishedProjects(): Promise<Project[]> {
  if (!isConfigured) return [];
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: "Status", select: { equals: "Published" } },
      sorts: [{ property: "Year", direction: "descending" }],
    });
    return response.results.map(formatProject);
  } catch (err) {
    console.error("[Notion] getPublishedProjects failed:", (err as Error).message);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isConfigured) return null;
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: "Slug", rich_text: { equals: slug } },
    });
    if (!response.results.length) return null;
    return formatProject(response.results[0]);
  } catch (err) {
    console.error("[Notion] getProjectBySlug failed:", (err as Error).message);
    return null;
  }
}

export async function getProjectContent(pageId: string): Promise<string> {
  if (!isConfigured) return "";
  try {
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdBlocks);
    return mdString.parent ?? "";
  } catch (err) {
    console.error("[Notion] getProjectContent failed:", (err as Error).message);
    return "";
  }
}

export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatProject(page: any): Project {
  const props = page.properties;
  return {
    id: page.id,
    title: props.Name?.title?.[0]?.plain_text ?? "Untitled",
    slug: props.Slug?.rich_text?.[0]?.plain_text ?? page.id,
    description: props.Description?.rich_text?.[0]?.plain_text ?? "",
    cover:
      page.cover?.external?.url ??
      page.cover?.file?.url ??
      props.Cover?.url ??
      "",
    tags: props.Tags?.multi_select?.map((t: { name: string }) => t.name) ?? [],
    year: props.Year?.number ?? new Date().getFullYear(),
    role: props.Role?.rich_text?.[0]?.plain_text ?? "",
    featured: props.Featured?.checkbox ?? false,
  };
}
