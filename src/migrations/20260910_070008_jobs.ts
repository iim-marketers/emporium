import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_jobs_board_status" AS ENUM('OPEN ALL', 'INVITE');
  CREATE TYPE "public"."enum_jobs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__jobs_v_version_board_status" AS ENUM('OPEN ALL', 'INVITE');
  CREATE TYPE "public"."enum__jobs_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"location" varchar,
  	"position" varchar,
  	"employer" varchar,
  	"drive_on" timestamp(3) with time zone,
  	"time" varchar DEFAULT '8:00 am onwards',
  	"venue" varchar,
  	"register_with" varchar DEFAULT 'Apply via WhatsApp your Name, Age, Qualification',
  	"whatsapp" varchar,
  	"board_flight" varchar,
  	"board_destination" varchar,
  	"board_status" "enum_jobs_board_status" DEFAULT 'OPEN ALL',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_jobs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_jobs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_location" varchar,
  	"version_position" varchar,
  	"version_employer" varchar,
  	"version_drive_on" timestamp(3) with time zone,
  	"version_time" varchar DEFAULT '8:00 am onwards',
  	"version_venue" varchar,
  	"version_register_with" varchar DEFAULT 'Apply via WhatsApp your Name, Age, Qualification',
  	"version_whatsapp" varchar,
  	"version_board_flight" varchar,
  	"version_board_destination" varchar,
  	"version_board_status" "enum__jobs_v_version_board_status" DEFAULT 'OPEN ALL',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__jobs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "jobs_id" integer;
  ALTER TABLE "_jobs_v" ADD CONSTRAINT "_jobs_v_parent_id_jobs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX "jobs__status_idx" ON "jobs" USING btree ("_status");
  CREATE INDEX "_jobs_v_parent_idx" ON "_jobs_v" USING btree ("parent_id");
  CREATE INDEX "_jobs_v_version_version_updated_at_idx" ON "_jobs_v" USING btree ("version_updated_at");
  CREATE INDEX "_jobs_v_version_version_created_at_idx" ON "_jobs_v" USING btree ("version_created_at");
  CREATE INDEX "_jobs_v_version_version__status_idx" ON "_jobs_v" USING btree ("version__status");
  CREATE INDEX "_jobs_v_created_at_idx" ON "_jobs_v" USING btree ("created_at");
  CREATE INDEX "_jobs_v_updated_at_idx" ON "_jobs_v" USING btree ("updated_at");
  CREATE INDEX "_jobs_v_latest_idx" ON "_jobs_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "jobs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_jobs_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "_jobs_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_jobs_fk";
  
  DROP INDEX "payload_locked_documents_rels_jobs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "jobs_id";
  DROP TYPE "public"."enum_jobs_board_status";
  DROP TYPE "public"."enum_jobs_status";
  DROP TYPE "public"."enum__jobs_v_version_board_status";
  DROP TYPE "public"."enum__jobs_v_version_status";`)
}
