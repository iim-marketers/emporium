/**
 * Renders the Lexical documents the admin panel writes. The converters below
 * reproduce the markup the articles were published with, so a post edited in
 * the panel prints exactly like one migrated from the old content files.
 */
import {
  type JSXConvertersFunction,
  RichText as LexicalRichText,
} from "@payloadcms/richtext-lexical/react";

import type { News, Post } from "@/payload-types";
import {
  checklist,
  checklistItem,
  checklistTick,
  proseBody,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

/** `strong` and `em` come from the default text converter, which carries no
 *  classes of its own, so the emphasis is styled from the container. */
const emphasis = "[&_strong]:font-semibold [&_strong]:text-ink [&_em]:text-ink";

const articleConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });

    /** Only h2 and h3 are offered in the editor; anything else reads as h3. */
    return node.tag === "h2" ? (
      <h2 className="mt-6 text-[26px] leading-[1.2] text-ink max-phablet:mt-9 max-phablet:text-[22px]">
        {children}
      </h2>
    ) : (
      <h3 className="mt-8 text-[19px] leading-tight text-royal">{children}</h3>
    );
  },
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });

    if (node.listType === "number") {
      return (
        <ol className={cn(proseBody, "mt-5 list-decimal pl-6")}>{children}</ol>
      );
    }

    return <ul className={cn(checklist, "mt-5")}>{children}</ul>;
  },
  listitem: ({ node, nodesToJSX, parent }) => {
    const children = nodesToJSX({ nodes: node.children });

    if ("listType" in parent && parent.listType === "number") {
      return <li>{children}</li>;
    }

    return (
      <li className={checklistItem}>
        <span className={checklistTick}>✓</span> {children}
      </li>
    );
  },
  paragraph: ({ node, nodesToJSX }) => (
    <p className={cn(proseBody, "mt-3")}>
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),
});

/** Blog articles: headings, prose and the ticked checklists. */
export function ArticleBody({ data }: { data: Post["content"] }) {
  return (
    <LexicalRichText
      className={emphasis}
      converters={articleConverters}
      data={data}
    />
  );
}

const newsConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => (
    <p className="text-justify font-medium">
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),
});

/** Press releases inside the accordion, which are runs of plain paragraphs. */
export function NewsBody({ data }: { data: News["body"] }) {
  return (
    <LexicalRichText
      className={emphasis}
      converters={newsConverters}
      data={data}
    />
  );
}
