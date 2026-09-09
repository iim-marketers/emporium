/**
 * Blog articles. Replaces the hand-written array these pages used to import,
 * so staff publish from the admin panel rather than through a deploy.
 */
import type { CollectionConfig } from "payload";

import { isSignedIn, publishedOrSignedIn } from "./access";
import { revalidate } from "./revalidate";

/** Mirrors the slugs the WordPress posts were migrated under: lowercase words
 *  joined by hyphens, with punctuation dropped. */
function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** The home page grid, the archive and the article itself all change together. */
function postPaths(slug?: string) {
  return ["/", "/blog", ...(slug ? [`/blog/${slug}`] : [])];
}

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "_status"],
  },
  access: {
    create: isSignedIn,
    delete: isSignedIn,
    read: publishedOrSignedIn,
    update: isSignedIn,
  },
  versions: { drafts: true },
  hooks: {
    afterChange: [
      ({ doc, previousDoc, req }) => {
        const slugs = new Set([doc.slug, previousDoc?.slug].filter(Boolean));
        revalidate(
          [...new Set(slugs.size ? [...slugs].flatMap(postPaths) : postPaths())],
          req.payload,
        );
      },
    ],
    afterDelete: [
      ({ doc, req }) => revalidate(postPaths(doc?.slug), req.payload),
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "The URL for this post. Changing it breaks inbound links.",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) =>
            value || (data?.title ? slugify(data.title) : value),
        ],
      },
    },
    {
      name: "publishedAt",
      label: "Published on",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" },
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
        description: "Optional. Posts without one fall back to a branded tile.",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 300,
      admin: {
        description:
          "The opening line. Doubles as the card summary and the search result description.",
      },
    },
    { name: "content", type: "richText", required: true },
  ],
};
