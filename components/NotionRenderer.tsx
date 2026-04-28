'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface Props {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-gray-900 mt-14 mb-5 tracking-tight leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4 tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-[17px] text-gray-600 leading-[1.8] mb-6">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 pl-6 border-l-[3px] border-indigo-200 bg-indigo-50/40 rounded-r-2xl py-4 pr-4">
      <div className="text-gray-600 italic text-[17px] leading-relaxed">{children}</div>
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-950 text-gray-100 rounded-2xl p-6 my-8 overflow-x-auto text-sm font-mono leading-relaxed">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = !!className;
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-md text-[14px] font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
  ul: ({ children }) => (
    <ul className="space-y-2 mb-6 pl-5 list-disc marker:text-gray-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-2 mb-6 pl-5 list-decimal marker:text-gray-400">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-[17px] text-gray-600 leading-relaxed">{children}</li>
  ),
  img: ({ src, alt }) => (
    <span className="block my-10 rounded-2xl overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt ?? ''} className="w-full object-cover" loading="lazy" />
    </span>
  ),
  hr: () => <hr className="my-14 border-gray-100" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full text-sm text-left border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200 bg-gray-50">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-gray-600 border-b border-gray-100">{children}</td>
  ),
};

export function NotionRenderer({ content }: Props) {
  if (!content) {
    return (
      <p className="text-gray-400 italic text-sm">No content available for this project.</p>
    );
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
