/**
 * Reads the content the admin panel writes. Everything here runs on the
 * server: the pages that call it are prerendered, and their saved documents
 * revalidate them through the collection hooks.
 */
import config from "@payload-config";
import { getPayload } from "payload";

import type { News, Post } from "@/payload-types";

async function cms() {
  return getPayload({ config });
}

/** Newest first, which is the order both the home page and the archive print. */
export async function getPosts(limit?: number): Promise<Post[]> {
  const payload = await cms();
  const result = await payload.find({
    collection: "posts",
    depth: 1,
    limit: limit ?? 0,
    sort: "-publishedAt",
  });
  return result.docs;
}

export async function countPosts(): Promise<number> {
  const payload = await cms();
  const { totalDocs } = await payload.count({ collection: "posts" });
  return totalDocs;
}

export async function getPostSlugs(): Promise<string[]> {
  const payload = await cms();
  const result = await payload.find({
    collection: "posts",
    depth: 0,
    limit: 0,
    pagination: false,
    select: { slug: true },
    sort: "-publishedAt",
  });
  return result.docs.map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const payload = await cms();
  const result = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  });
  return result.docs[0] ?? null;
}

/** Hand-ordered in the admin, since the accordion has no date to sort on. */
export async function getNews(): Promise<News[]> {
  const payload = await cms();
  const result = await payload.find({
    collection: "news",
    depth: 0,
    limit: 0,
    sort: "_order",
  });
  return result.docs;
}

/**
 * Dates are stored as UTC midnight, so they are printed in UTC too. Reading
 * them in the server's timezone would show the previous day anywhere west of
 * Greenwich. Matches how the posts were dated before the migration.
 */
export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(value));
}

/** Cards use the 4:3 crop where it exists and the original otherwise. */
export function postImage(post: Post) {
  const image = post.image;
  if (!image || typeof image === "number") return null;

  const src = image.sizes?.card?.url ?? image.url;
  return src ? { alt: image.alt ?? "", src } : null;
}
