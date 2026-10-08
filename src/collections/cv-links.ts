import { createHmac, timingSafeEqual } from "crypto";

import type { Access } from "payload";

import type { Cv } from "../payload-types";

// Spreadsheet links open outside the admin session, so they carry their own signature.
function sign(filename: string) {
  return createHmac("sha256", process.env.PAYLOAD_SECRET ?? "")
    .update(`cvs:${filename}`)
    .digest("hex");
}

export function signedCvUrl(cv: Cv | number | null | undefined) {
  if (typeof cv !== "object" || !cv?.url || !cv.filename) return null;
  const url = new URL(cv.url, "http://x");
  url.searchParams.set("token", sign(cv.filename));
  return url.pathname + url.search;
}

export const signedInOrSignedLink: Access = ({ req, data, isReadingStaticFile }) => {
  if (req.user) return true;
  if (!isReadingStaticFile || !data?.filename || !process.env.PAYLOAD_SECRET) return false;

  const token = req.searchParams?.get("token");
  if (!token) return false;

  const expected = Buffer.from(sign(data.filename));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
};
