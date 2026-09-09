import type { CollectionConfig } from "payload";

import { isSignedIn } from "./access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: {
    create: isSignedIn,
    delete: isSignedIn,
    read: () => true,
    update: isSignedIn,
  },
  upload: {
    mimeTypes: ["image/*"],
    focalPoint: true,
    imageSizes: [
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "wide", width: 1600 },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Describes the image for screen readers and for when it fails to load.",
      },
    },
  ],
};
