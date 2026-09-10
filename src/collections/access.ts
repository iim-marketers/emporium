import type { Access } from "payload";

export const isSignedIn: Access = ({ req }) => Boolean(req.user);

export const publishedOrSignedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};
