/** The archived articles carry `**bold**` and `*italic*` inline. Here they
 *  become real Lexical formatting once, at migration time. */
import type { BlogBlock } from "./legacy-blog";

/** Lexical's inline format bitmask. Only these two appear in the copy. */
const BOLD = 1;
const ITALIC = 2;

type TextNode = {
  detail: number;
  format: number;
  mode: "normal";
  style: string;
  text: string;
  type: "text";
  version: number;
};

type LexicalNode = {
  [key: string]: unknown;
  type: string;
  version: number;
};

function text(value: string, format = 0): TextNode {
  return {
    detail: 0,
    format,
    mode: "normal",
    style: "",
    text: value,
    type: "text",
    version: 1,
  };
}

/** Splits on `**bold**` and `*italic*`, longest marker first so that the
 *  asterisks of a bold run are never mistaken for two italic runs. */
function inline(value: string): TextNode[] {
  const nodes: TextNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let cursor = 0;

  for (const match of value.matchAll(pattern)) {
    const start = match.index;
    if (start > cursor) nodes.push(text(value.slice(cursor, start)));
    nodes.push(
      match[1] !== undefined ? text(match[1], BOLD) : text(match[2], ITALIC),
    );
    cursor = start + match[0].length;
  }

  if (cursor < value.length) nodes.push(text(value.slice(cursor)));
  return nodes.length > 0 ? nodes : [text(value)];
}

function paragraph(value: string): LexicalNode {
  return {
    children: inline(value),
    direction: "ltr",
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    type: "paragraph",
    version: 1,
  };
}

function heading(value: string, level: 2 | 3): LexicalNode {
  return {
    children: inline(value),
    direction: "ltr",
    format: "",
    indent: 0,
    tag: `h${level}`,
    type: "heading",
    version: 1,
  };
}

function list(items: string[]): LexicalNode {
  return {
    children: items.map((item, index) => ({
      checked: undefined,
      children: inline(item),
      direction: "ltr",
      format: "",
      indent: 0,
      type: "listitem",
      value: index + 1,
      version: 1,
    })),
    direction: "ltr",
    format: "",
    indent: 0,
    listType: "bullet",
    start: 1,
    tag: "ul",
    type: "list",
    version: 1,
  };
}

function root(children: LexicalNode[]) {
  return {
    root: {
      children,
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      type: "root",
      version: 1,
    },
  };
}

export function blocksToLexical(blocks: BlogBlock[]) {
  return root(
    blocks.map((block) => {
      if (block.kind === "heading") return heading(block.text, block.level);
      if (block.kind === "list") return list(block.items);
      return paragraph(block.text);
    }),
  );
}

export function paragraphsToLexical(paragraphs: string[]) {
  return root(paragraphs.map(paragraph));
}
