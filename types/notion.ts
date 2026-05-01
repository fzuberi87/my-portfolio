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
  logoUrl: string;
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

export interface NotionBlock {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
