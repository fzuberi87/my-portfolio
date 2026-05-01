import type { NotionBlock, RichTextItem } from "@/types/notion";

function RichText({ items }: { items: RichTextItem[] }) {
  return (
    <>
      {items.map((item, i) => {
        const { annotations, plain_text, href } = item;
        let node: React.ReactNode = plain_text;

        if (annotations.code)
          node = (
            <code className="bg-el-strong dark:bg-el-dark-elevated text-el-body-strong dark:text-el-on-dark px-1.5 py-0.5 rounded text-[13px] font-mono border border-el-hairline dark:border-el-hairline/20">
              {node}
            </code>
          );
        if (annotations.bold)
          node = <strong className="font-semibold text-el-ink dark:text-el-on-dark">{node}</strong>;
        if (annotations.italic) node = <em className="italic">{node}</em>;
        if (annotations.strikethrough) node = <s>{node}</s>;
        if (annotations.underline && !href)
          node = <span className="underline underline-offset-2">{node}</span>;
        if (href)
          node = (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-el-ink dark:text-el-on-dark underline underline-offset-2 hover:opacity-50 transition-opacity"
            >
              {node}
            </a>
          );

        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

function Block({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph": {
      const rt: RichTextItem[] = block.paragraph.rich_text;
      if (!rt.length) return <div className="mb-4" />;
      return (
        <p className="text-[16px] text-el-body dark:text-el-on-dark-soft leading-[1.7] tracking-[0.01em] mb-6">
          <RichText items={rt} />
        </p>
      );
    }

    case "heading_1":
      return (
        <h1 className="font-display text-[2rem] font-normal text-el-ink dark:text-el-on-dark mt-16 mb-5 tracking-[-0.025em] leading-[1.1]">
          <RichText items={block.heading_1.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="font-display text-[1.5rem] font-normal text-el-ink dark:text-el-on-dark mt-14 mb-4 pt-10 border-t border-el-hairline dark:border-el-hairline/20 tracking-[-0.02em] leading-[1.2]">
          <RichText items={block.heading_2.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-[17px] font-semibold text-el-ink dark:text-el-on-dark mt-8 mb-3 tracking-[-0.01em]">
          <RichText items={block.heading_3.rich_text} />
        </h3>
      );

    case "quote":
      return (
        <blockquote className="border-l-[2px] border-el-muted dark:border-el-on-dark-soft pl-6 my-10">
          <p className="font-display text-[1.25rem] font-normal text-el-ink dark:text-el-on-dark leading-[1.5] tracking-[-0.02em]">
            <RichText items={block.quote.rich_text} />
          </p>
        </blockquote>
      );

    case "callout": {
      const icon =
        block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : "→";
      return (
        <div className="flex gap-4 bg-el-strong dark:bg-el-dark-elevated border border-el-hairline dark:border-el-hairline/20 rounded-xl p-5 my-8">
          <span className="text-lg leading-none mt-0.5 flex-shrink-0">{icon}</span>
          <p className="text-[15px] text-el-body dark:text-el-on-dark-soft leading-[1.6]">
            <RichText items={block.callout.rich_text} />
          </p>
        </div>
      );
    }

    case "code":
      return (
        <pre className="bg-el-strong dark:bg-el-dark-elevated border border-el-hairline dark:border-el-hairline/20 text-el-body dark:text-el-on-dark-soft rounded-xl p-6 my-8 overflow-x-auto">
          <code className="text-sm font-mono leading-relaxed">
            <RichText items={block.code.rich_text} />
          </code>
        </pre>
      );

    case "image": {
      const url =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      const caption: RichTextItem[] = block.image.caption ?? [];
      const captionText = caption.map((c) => c.plain_text).join("");
      return (
        <figure className="my-10">
          <div className="rounded-2xl overflow-hidden bg-el-strong dark:bg-el-dark-elevated border border-el-hairline dark:border-el-hairline/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={captionText}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          {captionText && (
            <figcaption className="mt-3 text-center text-[12px] text-el-muted dark:text-el-on-dark-soft tracking-[0.01em]">
              {captionText}
            </figcaption>
          )}
        </figure>
      );
    }

    case "divider":
      return <hr className="my-14 border-el-hairline dark:border-el-hairline/20" />;

    case "video":
      if (block.video.type === "external") {
        return (
          <div className="my-10 aspect-video rounded-2xl overflow-hidden bg-el-strong dark:bg-el-dark-elevated border border-el-hairline dark:border-el-hairline/20">
            <iframe
              src={block.video.external.url}
              className="w-full h-full"
              allowFullScreen
              title="Video"
            />
          </div>
        );
      }
      return null;

    case "toggle":
      return (
        <details className="group my-4 rounded-xl border border-el-hairline dark:border-el-hairline/20 overflow-hidden">
          <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer text-[14px] font-medium text-el-ink dark:text-el-on-dark hover:bg-el-strong dark:hover:bg-el-dark-elevated transition-colors list-none">
            <RichText items={block.toggle.rich_text} />
            <span className="ml-4 text-el-muted dark:text-el-on-dark-soft group-open:rotate-180 transition-transform duration-200">
              ▾
            </span>
          </summary>
          <div className="px-5 py-4 border-t border-el-hairline dark:border-el-hairline/20 text-[14px] text-el-body dark:text-el-on-dark-soft leading-relaxed">
            {/* Nested blocks not fetched in this implementation */}
          </div>
        </details>
      );

    default:
      return null;
  }
}

export function NotionBlocks({ blocks }: { blocks: NotionBlock[] }) {
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === "bulleted_list_item") {
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
        items.push(blocks[i++]);
      }
      elements.push(
        <ul key={`ul-${items[0].id}`} className="mb-6 pl-5 space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="text-[16px] text-el-body dark:text-el-on-dark-soft leading-[1.7] list-disc marker:text-el-muted dark:marker:text-el-on-dark-soft"
            >
              <RichText items={item.bulleted_list_item.rich_text} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (block.type === "numbered_list_item") {
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === "numbered_list_item") {
        items.push(blocks[i++]);
      }
      elements.push(
        <ol
          key={`ol-${items[0].id}`}
          className="mb-6 pl-5 space-y-2 list-decimal marker:text-el-muted dark:marker:text-el-on-dark-soft marker:font-medium"
        >
          {items.map((item) => (
            <li
              key={item.id}
              className="text-[16px] text-el-body dark:text-el-on-dark-soft leading-[1.7]"
            >
              <RichText items={item.numbered_list_item.rich_text} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    elements.push(<Block key={block.id} block={block} />);
    i++;
  }

  return <div>{elements}</div>;
}
