import type { CollectionConfig } from "payload";

import { isSignedIn } from "./access";

export const Cvs: CollectionConfig = {
  slug: "cvs",
  labels: { singular: "CV", plural: "CVs" },
  admin: { group: "Submissions", hidden: true },
  access: {
    create: () => false,
    delete: isSignedIn,
    read: isSignedIn,
    update: () => false,
  },
  upload: {
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/x-cfb",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/avif",
      "image/heic",
      "image/heif",
      "image/heic-sequence",
      "image/heif-sequence",
    ],
    crop: false,
    focalPoint: false,
  },
  fields: [],
};
