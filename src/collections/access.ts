/**
 * Access helpers shared by the content collections. There is one account, so
 * the only distinction that matters is signed in or not.
 */
import type { Access } from "payload";

export const isSignedIn: Access = ({ req }) => Boolean(req.user);

/** Anonymous callers see published documents only; the admin sees drafts too. */
export const publishedOrSignedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};
