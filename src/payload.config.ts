/**
 * Payload runs inside this Next.js app and serves the admin panel at /admin.
 * Content that used to live in `src/lib/blog.ts` and the `news` array in
 * `src/lib/content.ts` is now stored in Postgres and edited from there.
 */
import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./collections/media";
import { News } from "./collections/news";
import { Posts } from "./collections/posts";
import { Users } from "./collections/users";
import { seedAdmin } from "./seed-admin";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Origins the admin panel is opened from. Payload only honours its session
 * cookie when the request's Origin appears in `csrf`, so a URL missing here
 * logs in fine and then fails every save with "not allowed to perform this
 * action". Preview deployments answer on their own generated hostname, and
 * local development on none of the Vercel ones at all.
 */
const origins = [
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  !process.env.VERCEL && `http://localhost:${process.env.PORT ?? 3000}`,
].filter((origin): origin is string => Boolean(origin));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " · Emporium",
      description: "Publish blog posts and news for the Emporium website.",
    },
  },
  collections: [Posts, News, Media, Users],
  cors: origins,
  csrf: origins,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    /** Local development shares the deployed database, so schema changes go
     *  through migrations rather than an implicit dev-mode push. */
    push: false,
  }),
  /** The article page renders only these, so the toolbar offers only these. */
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
      FixedToolbarFeature(),
    ],
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        /** Serves artwork from the blob CDN directly, rather than streaming
         *  every request through a serverless function. The store is public,
         *  so this removes a hop without changing who can see the files. */
        media: { disablePayloadAccessControl: true },
      },
      /** Keeps the database schema identical whether or not the token is set. */
      alwaysInsertFields: true,
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  onInit: seedAdmin,
  secret: process.env.PAYLOAD_SECRET ?? "",
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
