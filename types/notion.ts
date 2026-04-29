export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  company: string;
  role: string;
  industry: string;
  skills: string[];
  year: number;
  cover: string;
}

export interface RichTextItem {
  plain_text: string;
  href: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
}

// Minimal typed shell around the Notion API's discriminated block union.
// The `[key: string]: any` index signature lets us access block-specific
// fields (e.g. block.paragraph.rich_text) after narrowing on `type`.
export interface NotionBlock {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
