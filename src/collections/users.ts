/**
 * The single admin account. Payload needs an auth collection to run the admin
 * panel at all, so this stays, but it is hidden from the navigation and holds
 * one row seeded from ADMIN_EMAIL and ADMIN_PASSWORD. Nobody signs up, and
 * nobody adds accounts from the panel.
 */
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { hidden: true, useAsTitle: "email" },
  access: {
    /** The account is created by `onInit` from the environment, never here. */
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
      /** Lets the boot check tell an unchanged password from a rotated one
       *  without rehashing on every cold start. */
    },
  ],
};
