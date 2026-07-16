import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Postgres won't let a newly-added enum value be used later in the same
 * transaction (`unsafe use of new value "gold"`), and Payload runs each
 * migration's up() as one transaction. So the enum value has to be added
 * in its own migration, ahead of the one that sets it as a column default.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_cta_button_background" ADD VALUE 'gold' BEFORE 'sage';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_button_background" ADD VALUE 'gold' BEFORE 'sage';
  ALTER TYPE "public"."enum_page_templates_blocks_cta_button_background" ADD VALUE 'gold' BEFORE 'sage';`)
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // No-op — the paired homepage_redesign migration's down() drops and
  // recreates these enum types from scratch without 'gold', so there's
  // nothing left to undo here.
}
