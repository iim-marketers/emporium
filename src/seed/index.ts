/**
 * Migrates the hard-coded content in this folder into Payload. Run with:
 *
 *   pnpm payload run src/seed/index.ts
 *
 * Matches on slug for posts, title for news and filename for artwork, updating
 * what is already there, so it is safe to run again.
 */
import path from "path";
import { fileURLToPath } from "url";

import config from "@payload-config";
import { getPayload } from "payload";

import { blogPosts } from "./legacy-blog";
import { blocksToLexical, paragraphsToLexical } from "./lexical";
import { news } from "./legacy-news";

const publicDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../public",
);

/** `Date` reads "August 22, 2025" as local midnight, which would move the day
 *  backwards east of UTC, so the calendar date is re-read as UTC. */
function toISODate(value: string) {
  const local = new Date(value);
  if (Number.isNaN(local.getTime())) {
    throw new Error(`Could not read the date "${value}"`);
  }
  return new Date(
    Date.UTC(local.getFullYear(), local.getMonth(), local.getDate()),
  ).toISOString();
}

const payload = await getPayload({ config });

async function upsertMedia(source: string, alt: string) {
  const filename = path.basename(source);
  const existing = await payload.find({
    collection: "media",
    limit: 1,
    overrideAccess: true,
    where: { filename: { equals: filename } },
  });

  if (existing.docs[0]) return existing.docs[0].id;

  const created = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.join(publicDir, source),
    overrideAccess: true,
  });
  return created.id;
}

let postsCreated = 0;
let postsUpdated = 0;

for (const post of blogPosts) {
  const image = post.image
    ? await upsertMedia(post.image, post.title)
    : undefined;

  const data = {
    _status: "published" as const,
    content: blocksToLexical(post.blocks),
    excerpt: post.excerpt,
    image,
    publishedAt: toISODate(post.date),
    slug: post.slug,
    title: post.title,
  };

  const existing = await payload.find({
    collection: "posts",
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: post.slug } },
  });

  if (existing.docs[0]) {
    await payload.update({
      collection: "posts",
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    });
    postsUpdated += 1;
  } else {
    await payload.create({ collection: "posts", data, overrideAccess: true });
    postsCreated += 1;
  }

  payload.logger.info(`Post ready: ${post.slug}`);
}

let newsCreated = 0;
let newsUpdated = 0;

/** Written in file order so the accordion keeps the order it has today. */
for (const item of news) {
  const data = {
    _status: "published" as const,
    body: paragraphsToLexical(item.body),
    publishedAt: item.date ? toISODate(item.date) : undefined,
    title: item.title,
  };

  const existing = await payload.find({
    collection: "news",
    limit: 1,
    overrideAccess: true,
    where: { title: { equals: item.title } },
  });

  if (existing.docs[0]) {
    await payload.update({
      collection: "news",
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    });
    newsUpdated += 1;
  } else {
    await payload.create({ collection: "news", data, overrideAccess: true });
    newsCreated += 1;
  }

  payload.logger.info(`News ready: ${item.title.slice(0, 60)}…`);
}

payload.logger.info(
  `Done. Posts: ${postsCreated} created, ${postsUpdated} updated. ` +
    `News: ${newsCreated} created, ${newsUpdated} updated.`,
);
process.exit(0);
