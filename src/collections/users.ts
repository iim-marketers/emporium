/** Payload needs an auth collection to run the admin panel at all. This holds
 *  one row, seeded from ADMIN_EMAIL and ADMIN_PASSWORD by `onInit`. */
import { APIError, type CollectionConfig } from "payload";

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
  hooks: {
    // The password comes from ADMIN_PASSWORD, so a reset would be undone on the next boot.
    beforeOperation: [
      ({ args, operation }) => {
        if (operation === "forgotPassword" || operation === "resetPassword") {
          throw new APIError("Password reset is disabled.", 403);
        }
        return args;
      },
    ],
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
