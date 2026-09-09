import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news" ADD COLUMN "_order" varchar;
  ALTER TABLE "_news_v" ADD COLUMN "version__order" varchar;
  CREATE INDEX "news__order_idx" ON "news" USING btree ("_order");
  CREATE INDEX "_news_v_version_version__order_idx" ON "_news_v" USING btree ("version__order");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "news__order_idx";
  DROP INDEX "_news_v_version_version__order_idx";
  ALTER TABLE "news" DROP COLUMN "_order";
  ALTER TABLE "_news_v" DROP COLUMN "version__order";`)
}
