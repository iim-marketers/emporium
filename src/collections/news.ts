/**
 * Press releases and industry announcements. They render as an accordion on
 * the home page, so there is no slug and no route of their own.
 */
import type { CollectionConfig } from "payload";

import { isSignedIn, publishedOrSignedIn } from "./access";
import { revalidate } from "./revalidate";

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "News item", plural: "News" },
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
  /** The accordion prints these in the order they are listed here, so the
   *  admin reorders them by dragging rather than by editing dates. */
  orderable: true,
  defaultSort: "_order",
  hooks: {
    afterChange: [({ req }) => revalidate(["/"], req.payload)],
    afterDelete: [({ req }) => revalidate(["/"], req.payload)],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description:
          "Printed as the accordion heading. The existing releases are set in capitals.",
      },
    },
    {
      name: "publishedAt",
      label: "Published on",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Optional. Kept for reference; the accordion does not print it.",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" },
      },
    },
    { name: "body", type: "richText", required: true },
  ],
};
