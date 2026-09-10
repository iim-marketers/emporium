/** Payload needs an auth collection to run the admin panel at all. This holds
 *  one row, seeded from ADMIN_EMAIL and ADMIN_PASSWORD by `onInit`. */
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { hidden: true, useAsTitle: "email" },
  access: {
    create: () => false,
    delete: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "envPasswordDigest",
      type: "text",
      hidden: true,
      admin: { readOnly: true },
      /** Lets the boot check spot a rotated password without rehashing. */
    },
  ],
};
