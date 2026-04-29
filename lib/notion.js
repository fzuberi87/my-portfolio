import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const isConfigured =
  !!process.env.NOTION_API_KEY && !!process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPublishedProjects() {
  if (!isConfigured) return [];

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Status',
        select: { equals: 'Published' },
      },
      sorts: [{ property: 'Year', direction: 'descending' }],
    });
    return response.results.map(formatProject);
  } catch (err) {
    console.error('[Notion] getPublishedProjects failed:', err?.message ?? err);
    return [];
  }
}

export async function getProjectBySlug(slug) {
  if (!isConfigured) return null;

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: { equals: slug },
      },
    });
    if (!response.results.length) return null;
    return formatProject(response.results[0]);
  } catch (err) {
    console.error('[Notion] getProjectBySlug failed:', err?.message ?? err);
    return null;
  }
}

export async function getProjectContent(pageId) {
  if (!isConfigured) return '';

  try {
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdBlocks);
    return mdString.parent ?? '';
  } catch (err) {
    console.error('[Notion] getProjectContent failed:', err?.message ?? err);
    return '';
  }
}

export async function getAllProjectSlugs() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

function formatProject(page) {
  const props = page.properties;

  return {
    id: page.id,
    title: props.Name?.title?.[0]?.plain_text ?? 'Untitled',
    slug: props.Slug?.rich_text?.[0]?.plain_text ?? page.id,
    description: props.Description?.rich_text?.[0]?.plain_text ?? '',
    cover:
      page.cover?.external?.url ??
      page.cover?.file?.url ??
      props.Cover?.url ??
      '',
    tags: props.Tags?.multi_select?.map((t) => t.name) ?? [],
    year: props.Year?.number ?? new Date().getFullYear(),
    role: props.Role?.rich_text?.[0]?.plain_text ?? '',
    featured: props.Featured?.checkbox ?? false,
  };
}
