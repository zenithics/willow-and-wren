import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_cta_button_background" ADD VALUE 'gold' BEFORE 'sage';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_button_background" ADD VALUE 'gold' BEFORE 'sage';
  ALTER TYPE "public"."enum_page_templates_blocks_cta_button_background" ADD VALUE 'gold' BEFORE 'sage';
  CREATE TABLE "pages_blocks_intro_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar DEFAULT 'From save-the-dates to on-the-day details, we create stationery suites that capture the spirit of your celebration — crafted on beautiful textured papers with hand-finished touches.',
  	"monogram_text" varchar DEFAULT 'W & W',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_finishing_touches_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_finishing_touches" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'The Finishing Touches',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_instagram_feed_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_instagram_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Follow Our Journey',
  	"handle" varchar DEFAULT '@willowandwren',
  	"profile_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_intro_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar DEFAULT 'From save-the-dates to on-the-day details, we create stationery suites that capture the spirit of your celebration — crafted on beautiful textured papers with hand-finished touches.',
  	"monogram_text" varchar DEFAULT 'W & W',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_finishing_touches_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_finishing_touches" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'The Finishing Touches',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_instagram_feed_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_instagram_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Follow Our Journey',
  	"handle" varchar DEFAULT '@willowandwren',
  	"profile_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'fullwidth'::text;
  DROP TYPE "public"."enum_pages_blocks_home_hero_style";
  CREATE TYPE "public"."enum_pages_blocks_home_hero_style" AS ENUM('fullwidth', 'split', 'centred');
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'fullwidth'::"public"."enum_pages_blocks_home_hero_style";
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_home_hero_style" USING "style"::"public"."enum_pages_blocks_home_hero_style";
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'light'::text;
  DROP TYPE "public"."enum_pages_blocks_home_hero_theme";
  CREATE TYPE "public"."enum_pages_blocks_home_hero_theme" AS ENUM('light', 'dark', 'pink');
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'light'::"public"."enum_pages_blocks_home_hero_theme";
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE "public"."enum_pages_blocks_home_hero_theme" USING "theme"::"public"."enum_pages_blocks_home_hero_theme";
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'fullwidth'::text;
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_style";
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_style" AS ENUM('fullwidth', 'split', 'centred');
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'fullwidth'::"public"."enum__pages_v_blocks_home_hero_style";
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE "public"."enum__pages_v_blocks_home_hero_style" USING "style"::"public"."enum__pages_v_blocks_home_hero_style";
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'light'::text;
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_theme";
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_theme" AS ENUM('light', 'dark', 'pink');
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'light'::"public"."enum__pages_v_blocks_home_hero_theme";
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE "public"."enum__pages_v_blocks_home_hero_theme" USING "theme"::"public"."enum__pages_v_blocks_home_hero_theme";
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'fullwidth'::text;
  DROP TYPE "public"."enum_page_templates_blocks_home_hero_style";
  CREATE TYPE "public"."enum_page_templates_blocks_home_hero_style" AS ENUM('fullwidth', 'split', 'centred');
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'fullwidth'::"public"."enum_page_templates_blocks_home_hero_style";
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE "public"."enum_page_templates_blocks_home_hero_style" USING "style"::"public"."enum_page_templates_blocks_home_hero_style";
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE text;
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'light'::text;
  DROP TYPE "public"."enum_page_templates_blocks_home_hero_theme";
  CREATE TYPE "public"."enum_page_templates_blocks_home_hero_theme" AS ENUM('light', 'dark', 'pink');
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'light'::"public"."enum_page_templates_blocks_home_hero_theme";
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE "public"."enum_page_templates_blocks_home_hero_theme" USING "theme"::"public"."enum_page_templates_blocks_home_hero_theme";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "button_background" SET DEFAULT 'gold';
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "headline" SET DEFAULT 'Bespoke Wedding Stationery';
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "subheadline" SET DEFAULT 'Where every detail tells your story';
  ALTER TABLE "pages_blocks_brand_story" ALTER COLUMN "heading" SET DEFAULT 'Bespoke Stationery';
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "button_background" SET DEFAULT 'gold';
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "headline" SET DEFAULT 'Bespoke Wedding Stationery';
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "subheadline" SET DEFAULT 'Where every detail tells your story';
  ALTER TABLE "_pages_v_blocks_brand_story" ALTER COLUMN "heading" SET DEFAULT 'Bespoke Stationery';
  ALTER TABLE "page_templates_blocks_cta" ALTER COLUMN "button_background" SET DEFAULT 'gold';
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "headline" SET DEFAULT 'Bespoke Wedding Stationery';
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "subheadline" SET DEFAULT 'Where every detail tells your story';
  ALTER TABLE "pages_blocks_brand_story" ADD COLUMN "subheading" varchar DEFAULT 'Designed around your story';
  ALTER TABLE "_pages_v_blocks_brand_story" ADD COLUMN "subheading" varchar DEFAULT 'Designed around your story';
  ALTER TABLE "pages_blocks_intro_statement" ADD CONSTRAINT "pages_blocks_intro_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_finishing_touches_items" ADD CONSTRAINT "pages_blocks_finishing_touches_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_finishing_touches_items" ADD CONSTRAINT "pages_blocks_finishing_touches_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_finishing_touches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_finishing_touches" ADD CONSTRAINT "pages_blocks_finishing_touches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_instagram_feed_images" ADD CONSTRAINT "pages_blocks_instagram_feed_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_instagram_feed_images" ADD CONSTRAINT "pages_blocks_instagram_feed_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_instagram_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_instagram_feed" ADD CONSTRAINT "pages_blocks_instagram_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_statement" ADD CONSTRAINT "_pages_v_blocks_intro_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_finishing_touches_items" ADD CONSTRAINT "_pages_v_blocks_finishing_touches_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_finishing_touches_items" ADD CONSTRAINT "_pages_v_blocks_finishing_touches_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_finishing_touches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_finishing_touches" ADD CONSTRAINT "_pages_v_blocks_finishing_touches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_instagram_feed_images" ADD CONSTRAINT "_pages_v_blocks_instagram_feed_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_instagram_feed_images" ADD CONSTRAINT "_pages_v_blocks_instagram_feed_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_instagram_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_instagram_feed" ADD CONSTRAINT "_pages_v_blocks_instagram_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_intro_statement_order_idx" ON "pages_blocks_intro_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_intro_statement_parent_id_idx" ON "pages_blocks_intro_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intro_statement_path_idx" ON "pages_blocks_intro_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_finishing_touches_items_order_idx" ON "pages_blocks_finishing_touches_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_finishing_touches_items_parent_id_idx" ON "pages_blocks_finishing_touches_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_finishing_touches_items_image_idx" ON "pages_blocks_finishing_touches_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_finishing_touches_order_idx" ON "pages_blocks_finishing_touches" USING btree ("_order");
  CREATE INDEX "pages_blocks_finishing_touches_parent_id_idx" ON "pages_blocks_finishing_touches" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_finishing_touches_path_idx" ON "pages_blocks_finishing_touches" USING btree ("_path");
  CREATE INDEX "pages_blocks_instagram_feed_images_order_idx" ON "pages_blocks_instagram_feed_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_instagram_feed_images_parent_id_idx" ON "pages_blocks_instagram_feed_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_instagram_feed_images_image_idx" ON "pages_blocks_instagram_feed_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_instagram_feed_order_idx" ON "pages_blocks_instagram_feed" USING btree ("_order");
  CREATE INDEX "pages_blocks_instagram_feed_parent_id_idx" ON "pages_blocks_instagram_feed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_instagram_feed_path_idx" ON "pages_blocks_instagram_feed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_intro_statement_order_idx" ON "_pages_v_blocks_intro_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_intro_statement_parent_id_idx" ON "_pages_v_blocks_intro_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_intro_statement_path_idx" ON "_pages_v_blocks_intro_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_finishing_touches_items_order_idx" ON "_pages_v_blocks_finishing_touches_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_finishing_touches_items_parent_id_idx" ON "_pages_v_blocks_finishing_touches_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_finishing_touches_items_image_idx" ON "_pages_v_blocks_finishing_touches_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_finishing_touches_order_idx" ON "_pages_v_blocks_finishing_touches" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_finishing_touches_parent_id_idx" ON "_pages_v_blocks_finishing_touches" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_finishing_touches_path_idx" ON "_pages_v_blocks_finishing_touches" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_instagram_feed_images_order_idx" ON "_pages_v_blocks_instagram_feed_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_instagram_feed_images_parent_id_idx" ON "_pages_v_blocks_instagram_feed_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_instagram_feed_images_image_idx" ON "_pages_v_blocks_instagram_feed_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_instagram_feed_order_idx" ON "_pages_v_blocks_instagram_feed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_instagram_feed_parent_id_idx" ON "_pages_v_blocks_instagram_feed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_instagram_feed_path_idx" ON "_pages_v_blocks_instagram_feed" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_intro_statement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_finishing_touches_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_finishing_touches" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_instagram_feed_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_instagram_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_intro_statement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_finishing_touches_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_finishing_touches" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_instagram_feed_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_instagram_feed" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_intro_statement" CASCADE;
  DROP TABLE "pages_blocks_finishing_touches_items" CASCADE;
  DROP TABLE "pages_blocks_finishing_touches" CASCADE;
  DROP TABLE "pages_blocks_instagram_feed_images" CASCADE;
  DROP TABLE "pages_blocks_instagram_feed" CASCADE;
  DROP TABLE "_pages_v_blocks_intro_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_finishing_touches_items" CASCADE;
  DROP TABLE "_pages_v_blocks_finishing_touches" CASCADE;
  DROP TABLE "_pages_v_blocks_instagram_feed_images" CASCADE;
  DROP TABLE "_pages_v_blocks_instagram_feed" CASCADE;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "button_background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "button_background" SET DEFAULT 'sage'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_button_background";
  CREATE TYPE "public"."enum_pages_blocks_cta_button_background" AS ENUM('sage', 'charcoal');
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "button_background" SET DEFAULT 'sage'::"public"."enum_pages_blocks_cta_button_background";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "button_background" SET DATA TYPE "public"."enum_pages_blocks_cta_button_background" USING "button_background"::"public"."enum_pages_blocks_cta_button_background";
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'split'::text;
  DROP TYPE "public"."enum_pages_blocks_home_hero_style";
  CREATE TYPE "public"."enum_pages_blocks_home_hero_style" AS ENUM('split', 'fullwidth', 'centred');
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'split'::"public"."enum_pages_blocks_home_hero_style";
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_home_hero_style" USING "style"::"public"."enum_pages_blocks_home_hero_style";
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'dark'::text;
  DROP TYPE "public"."enum_pages_blocks_home_hero_theme";
  CREATE TYPE "public"."enum_pages_blocks_home_hero_theme" AS ENUM('dark', 'light', 'pink');
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'dark'::"public"."enum_pages_blocks_home_hero_theme";
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE "public"."enum_pages_blocks_home_hero_theme" USING "theme"::"public"."enum_pages_blocks_home_hero_theme";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "button_background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "button_background" SET DEFAULT 'sage'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_button_background";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_button_background" AS ENUM('sage', 'charcoal');
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "button_background" SET DEFAULT 'sage'::"public"."enum__pages_v_blocks_cta_button_background";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "button_background" SET DATA TYPE "public"."enum__pages_v_blocks_cta_button_background" USING "button_background"::"public"."enum__pages_v_blocks_cta_button_background";
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'split'::text;
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_style";
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_style" AS ENUM('split', 'fullwidth', 'centred');
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'split'::"public"."enum__pages_v_blocks_home_hero_style";
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE "public"."enum__pages_v_blocks_home_hero_style" USING "style"::"public"."enum__pages_v_blocks_home_hero_style";
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'dark'::text;
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_theme";
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_theme" AS ENUM('dark', 'light', 'pink');
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'dark'::"public"."enum__pages_v_blocks_home_hero_theme";
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE "public"."enum__pages_v_blocks_home_hero_theme" USING "theme"::"public"."enum__pages_v_blocks_home_hero_theme";
  ALTER TABLE "page_templates_blocks_cta" ALTER COLUMN "button_background" SET DATA TYPE text;
  ALTER TABLE "page_templates_blocks_cta" ALTER COLUMN "button_background" SET DEFAULT 'sage'::text;
  DROP TYPE "public"."enum_page_templates_blocks_cta_button_background";
  CREATE TYPE "public"."enum_page_templates_blocks_cta_button_background" AS ENUM('sage', 'charcoal');
  ALTER TABLE "page_templates_blocks_cta" ALTER COLUMN "button_background" SET DEFAULT 'sage'::"public"."enum_page_templates_blocks_cta_button_background";
  ALTER TABLE "page_templates_blocks_cta" ALTER COLUMN "button_background" SET DATA TYPE "public"."enum_page_templates_blocks_cta_button_background" USING "button_background"::"public"."enum_page_templates_blocks_cta_button_background";
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'split'::text;
  DROP TYPE "public"."enum_page_templates_blocks_home_hero_style";
  CREATE TYPE "public"."enum_page_templates_blocks_home_hero_style" AS ENUM('split', 'fullwidth', 'centred');
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "style" SET DEFAULT 'split'::"public"."enum_page_templates_blocks_home_hero_style";
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "style" SET DATA TYPE "public"."enum_page_templates_blocks_home_hero_style" USING "style"::"public"."enum_page_templates_blocks_home_hero_style";
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE text;
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'dark'::text;
  DROP TYPE "public"."enum_page_templates_blocks_home_hero_theme";
  CREATE TYPE "public"."enum_page_templates_blocks_home_hero_theme" AS ENUM('dark', 'light', 'pink');
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "theme" SET DEFAULT 'dark'::"public"."enum_page_templates_blocks_home_hero_theme";
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "theme" SET DATA TYPE "public"."enum_page_templates_blocks_home_hero_theme" USING "theme"::"public"."enum_page_templates_blocks_home_hero_theme";
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "headline" SET DEFAULT 'Press-On Perfection.';
  ALTER TABLE "pages_blocks_home_hero" ALTER COLUMN "subheadline" SET DEFAULT 'Welcome to your new site. Configure your content in the admin panel.';
  ALTER TABLE "pages_blocks_brand_story" ALTER COLUMN "heading" SET DEFAULT 'Our Story';
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "headline" SET DEFAULT 'Press-On Perfection.';
  ALTER TABLE "_pages_v_blocks_home_hero" ALTER COLUMN "subheadline" SET DEFAULT 'Welcome to your new site. Configure your content in the admin panel.';
  ALTER TABLE "_pages_v_blocks_brand_story" ALTER COLUMN "heading" SET DEFAULT 'Our Story';
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "headline" SET DEFAULT 'Press-On Perfection.';
  ALTER TABLE "page_templates_blocks_home_hero" ALTER COLUMN "subheadline" SET DEFAULT 'Welcome to your new site. Configure your content in the admin panel.';
  ALTER TABLE "pages_blocks_brand_story" DROP COLUMN "subheading";
  ALTER TABLE "_pages_v_blocks_brand_story" DROP COLUMN "subheading";`)
}
