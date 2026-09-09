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

const allowedOrigins = [
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
    components: {
      graphics: {
        Icon: "/components/admin/icon#EmporiumIcon",
        Logo: "/components/admin/logo#EmporiumLogo",
      },
    },
    theme: "light",
    meta: {
      titleSuffix: " · Emporium",
      description: "Publish blog posts and news for the Emporium website.",
      /** Without these the admin tab falls back to Payload's own favicon and
       *  an "Payload App" Open Graph card. */
      icons: [
        { rel: "icon", type: "image/png", sizes: "32x32", url: "/icon.png" },
        { rel: "apple-touch-icon", type: "image/png", url: "/apple-icon.png" },
      ],
      defaultOGImageType: "off",
      openGraph: {
        siteName: "Emporium",
        title: "Content Studio",
        description: "Publish blog posts and news for the Emporium website.",
      },
    },
  },
  collections: [Posts, News, Media, Users],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    /** Local development shares the deployed database, so schema changes go
     *  through migrations rather than an implicit dev-mode push. */
    push: false,
  }),
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
        /** The store is public, so serving from the CDN directly drops a
         *  serverless hop without changing who can see the files. */
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
