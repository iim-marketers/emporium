import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "jobs" ADD COLUMN "registration_closes_on" timestamp(3) with time zone;
  ALTER TABLE "jobs" ADD COLUMN "registration_closes_at" varchar;
  ALTER TABLE "_jobs_v" ADD COLUMN "version_registration_closes_on" timestamp(3) with time zone;
  ALTER TABLE "_jobs_v" ADD COLUMN "version_registration_closes_at" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "jobs" DROP COLUMN "registration_closes_on";
  ALTER TABLE "jobs" DROP COLUMN "registration_closes_at";
  ALTER TABLE "_jobs_v" DROP COLUMN "version_registration_closes_on";
  ALTER TABLE "_jobs_v" DROP COLUMN "version_registration_closes_at";`)
}
