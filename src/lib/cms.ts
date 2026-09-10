import config from "@payload-config";
import { getPayload } from "payload";

import { toJob, type Job } from "@/lib/jobs";
import type { News, Post } from "@/payload-types";

async function cms() {
  return getPayload({ config });
}

/** Every read below passes `overrideAccess: false`. The Local API skips access
 *  control otherwise, which would put unpublished drafts on the live site. */

export async function getPosts(limit?: number): Promise<Post[]> {
  const payload = await cms();
  const result = await payload.find({
    collection: "posts",
    depth: 1,
    limit: limit ?? 0,
    overrideAccess: false,
    sort: "-publishedAt",
  });
  return result.docs;
}

export async function getPostSlugs(): Promise<string[]> {
  const payload = await cms();
  const result = await payload.find({
    collection: "posts",
    depth: 0,
    limit: 0,
    overrideAccess: false,
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
    overrideAccess: false,
    where: { slug: { equals: slug } },
  });
  return result.docs[0] ?? null;
}

export async function getNews(): Promise<News[]> {
  const payload = await cms();
  const result = await payload.find({
    collection: "news",
    depth: 0,
    limit: 0,
    overrideAccess: false,
    sort: "_order",
  });
  return result.docs;
}

export async function getJobs(): Promise<Job[]> {
  const payload = await cms();
  const result = await payload.find({
    collection: "jobs",
    depth: 0,
    limit: 0,
    overrideAccess: false,
    sort: "-driveOn",
  });
  return result.docs.map(toJob);
}

/** Stored as UTC midnight, so printed in UTC too. Reading them in the server's
 *  timezone shows the previous day anywhere west of Greenwich. */
export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(value));
}

export function postImage(post: Post) {
  const image = post.image;
  if (!image || typeof image === "number") return null;

  const src = image.sizes?.card?.url ?? image.url;
  return src ? { alt: image.alt ?? "", src } : null;
}
