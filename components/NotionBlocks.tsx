import type { NotionBlock, RichTextItem } from "@/types/notion";

// ---------------------------------------------------------------------------
// Rich text — annotated inline spans
// ---------------------------------------------------------------------------

function RichText({ items }: { items: RichTextItem[] }) {
  return (
    <>
      {items.map((item, i) => {
        const { annotations, plain_text, href } = item;
        let node: React.ReactNode = plain_text;

        if (annotations.code)
          node = (
            <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-md text-[13px] font-mono">
              {node}
            </code>
          );
        if (annotations.bold)
          node = <strong className="font-semibold text-gray-900">{node}</strong>;
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
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 transition-colors"
            >
              {node}
            </a>
          );

        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Individual block
// ---------------------------------------------------------------------------

function Block({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph": {
      const rt: RichTextItem[] = block.paragraph.rich_text;
      if (!rt.length) return <div className="mb-4" />; // blank line
      return (
        <p className="text-[17px] text-gray-600 leading-[1.85] mb-6">
          <RichText items={rt} />
        </p>
      );
    }

    case "heading_1":
      return (
        <h1 className="text-[28px] font-bold text-gray-900 mt-16 mb-5 tracking-tight leading-tight">
          <RichText items={block.heading_1.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="text-[22px] font-semibold text-gray-900 mt-14 mb-4 pt-10 border-t border-gray-100 tracking-tight">
          <RichText items={block.heading_2.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-[18px] font-semibold text-gray-900 mt-8 mb-3 tracking-tight">
          <RichText items={block.heading_3.rich_text} />
        </h3>
      );

    case "quote":
      return (
        <blockquote className="border-l-[3px] border-gray-900 pl-6 my-10">
          <p className="text-xl text-gray-700 italic leading-relaxed">
            <RichText items={block.quote.rich_text} />
          </p>
        </blockquote>
      );

    case "callout": {
      const icon =
        block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : "💡";
      return (
        <div className="flex gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5 my-8">
          <span className="text-xl leading-none mt-0.5 flex-shrink-0">{icon}</span>
          <p className="text-[15px] text-gray-700 leading-relaxed">
            <RichText items={block.callout.rich_text} />
          </p>
        </div>
      );
    }

    case "code":
      return (
        <pre className="bg-gray-950 text-gray-100 rounded-2xl p-6 my-8 overflow-x-auto">
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
          <div className="rounded-2xl overflow-hidden bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={captionText}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          {captionText && (
            <figcaption className="mt-3 text-center text-[13px] text-gray-400">
              {captionText}
            </figcaption>
          )}
        </figure>
      );
    }

    case "divider":
      return <hr className="my-14 border-gray-100" />;

    case "video":
      if (block.video.type === "external") {
        return (
          <div className="my-10 aspect-video rounded-2xl overflow-hidden bg-gray-100">
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
        <details className="group my-4 rounded-xl border border-gray-100 overflow-hidden">
          <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer text-[15px] font-medium text-gray-800 hover:bg-gray-50 transition-colors list-none">
            <RichText items={block.toggle.rich_text} />
            <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform duration-200">
              ▾
            </span>
          </summary>
          <div className="px-5 py-4 border-t border-gray-100 text-[15px] text-gray-600 leading-relaxed">
            {/* Nested blocks not fetched in this implementation */}
          </div>
        </details>
      );

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Main export — groups consecutive list items into <ul> / <ol>
// ---------------------------------------------------------------------------

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
              className="text-[17px] text-gray-600 leading-[1.85] list-disc marker:text-gray-300"
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
        <ol key={`ol-${items[0].id}`} className="mb-6 pl-5 space-y-2 list-decimal marker:text-gray-400 marker:font-medium">
          {items.map((item) => (
            <li
              key={item.id}
              className="text-[17px] text-gray-600 leading-[1.85]"
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
