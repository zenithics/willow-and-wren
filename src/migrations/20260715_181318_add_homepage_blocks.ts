import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_style" AS ENUM('card', 'band');
  CREATE TYPE "public"."enum_pages_blocks_cta_button_background" AS ENUM('sage', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_layout" AS ENUM('grid', 'stacked');
  CREATE TYPE "public"."enum_pages_blocks_brand_story_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_brand_story_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_brand_story_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_style" AS ENUM('card', 'band');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_button_background" AS ENUM('sage', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_layout" AS ENUM('grid', 'stacked');
  CREATE TYPE "public"."enum__pages_v_blocks_brand_story_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_brand_story_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_brand_story_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_page_templates_blocks_cta_style" AS ENUM('card', 'band');
  CREATE TYPE "public"."enum_page_templates_blocks_cta_button_background" AS ENUM('sage', 'charcoal');
  CREATE TYPE "public"."enum_page_templates_blocks_testimonials_layout" AS ENUM('grid', 'stacked');
  CREATE TABLE "pages_blocks_collections_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Collections',
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_category_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Shop by Category',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_brand_story_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_brand_story_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_brand_story_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_brand_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Story',
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_brand_story_image_position" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Featured Products',
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_collections_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Collections',
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_category_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Shop by Category',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_brand_story_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_brand_story_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_brand_story_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_brand_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Story',
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_brand_story_image_position" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Featured Products',
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "site_appearance" ALTER COLUMN "primary_colour" SET DEFAULT '#A6B09A';
  ALTER TABLE "site_appearance" ALTER COLUMN "secondary_colour" SET DEFAULT '#D8D2C8';
  ALTER TABLE "site_appearance" ALTER COLUMN "accent_colour" SET DEFAULT '#C6A86A';
  ALTER TABLE "site_appearance" ALTER COLUMN "background_colour" SET DEFAULT '#F7F4EE';
  ALTER TABLE "site_appearance" ALTER COLUMN "text_colour" SET DEFAULT '#494844';
  ALTER TABLE "site_appearance" ALTER COLUMN "header_bg_colour" SET DEFAULT '#FFFFFF';
  ALTER TABLE "site_appearance" ALTER COLUMN "footer_bg_colour" SET DEFAULT '#494844';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "style" "enum_pages_blocks_cta_style" DEFAULT 'card';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "button_background" "enum_pages_blocks_cta_button_background" DEFAULT 'sage';
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD COLUMN "event_date" varchar;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "layout" "enum_pages_blocks_testimonials_layout" DEFAULT 'grid';
  ALTER TABLE "pages_blocks_home_hero" ADD COLUMN "botanical_overlay" boolean DEFAULT false;
  ALTER TABLE "pages_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "style" "enum__pages_v_blocks_cta_style" DEFAULT 'card';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "button_background" "enum__pages_v_blocks_cta_button_background" DEFAULT 'sage';
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD COLUMN "event_date" varchar;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "layout" "enum__pages_v_blocks_testimonials_layout" DEFAULT 'grid';
  ALTER TABLE "_pages_v_blocks_home_hero" ADD COLUMN "botanical_overlay" boolean DEFAULT false;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "page_templates_blocks_cta" ADD COLUMN "style" "enum_page_templates_blocks_cta_style" DEFAULT 'card';
  ALTER TABLE "page_templates_blocks_cta" ADD COLUMN "button_background" "enum_page_templates_blocks_cta_button_background" DEFAULT 'sage';
  ALTER TABLE "page_templates_blocks_testimonials_testimonials" ADD COLUMN "event_date" varchar;
  ALTER TABLE "page_templates_blocks_testimonials" ADD COLUMN "layout" "enum_page_templates_blocks_testimonials_layout" DEFAULT 'grid';
  ALTER TABLE "page_templates_blocks_home_hero" ADD COLUMN "botanical_overlay" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_collections_showcase" ADD CONSTRAINT "pages_blocks_collections_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_strip" ADD CONSTRAINT "pages_blocks_category_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_story_links" ADD CONSTRAINT "pages_blocks_brand_story_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brand_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_story" ADD CONSTRAINT "pages_blocks_brand_story_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_story" ADD CONSTRAINT "pages_blocks_brand_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_products" ADD CONSTRAINT "pages_blocks_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_collections_showcase" ADD CONSTRAINT "_pages_v_blocks_collections_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_category_strip" ADD CONSTRAINT "_pages_v_blocks_category_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_story_links" ADD CONSTRAINT "_pages_v_blocks_brand_story_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_brand_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_story" ADD CONSTRAINT "_pages_v_blocks_brand_story_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_story" ADD CONSTRAINT "_pages_v_blocks_brand_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_products" ADD CONSTRAINT "_pages_v_blocks_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_collections_showcase_order_idx" ON "pages_blocks_collections_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_collections_showcase_parent_id_idx" ON "pages_blocks_collections_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_collections_showcase_path_idx" ON "pages_blocks_collections_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_category_strip_order_idx" ON "pages_blocks_category_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_category_strip_parent_id_idx" ON "pages_blocks_category_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_category_strip_path_idx" ON "pages_blocks_category_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_brand_story_links_order_idx" ON "pages_blocks_brand_story_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_brand_story_links_parent_id_idx" ON "pages_blocks_brand_story_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brand_story_order_idx" ON "pages_blocks_brand_story" USING btree ("_order");
  CREATE INDEX "pages_blocks_brand_story_parent_id_idx" ON "pages_blocks_brand_story" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brand_story_path_idx" ON "pages_blocks_brand_story" USING btree ("_path");
  CREATE INDEX "pages_blocks_brand_story_image_idx" ON "pages_blocks_brand_story" USING btree ("image_id");
  CREATE INDEX "pages_blocks_featured_products_order_idx" ON "pages_blocks_featured_products" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_products_parent_id_idx" ON "pages_blocks_featured_products" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_products_path_idx" ON "pages_blocks_featured_products" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_collections_showcase_order_idx" ON "_pages_v_blocks_collections_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_collections_showcase_parent_id_idx" ON "_pages_v_blocks_collections_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_collections_showcase_path_idx" ON "_pages_v_blocks_collections_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_category_strip_order_idx" ON "_pages_v_blocks_category_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_category_strip_parent_id_idx" ON "_pages_v_blocks_category_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_category_strip_path_idx" ON "_pages_v_blocks_category_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_brand_story_links_order_idx" ON "_pages_v_blocks_brand_story_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_brand_story_links_parent_id_idx" ON "_pages_v_blocks_brand_story_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_story_order_idx" ON "_pages_v_blocks_brand_story" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_brand_story_parent_id_idx" ON "_pages_v_blocks_brand_story" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_story_path_idx" ON "_pages_v_blocks_brand_story" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_brand_story_image_idx" ON "_pages_v_blocks_brand_story" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_featured_products_order_idx" ON "_pages_v_blocks_featured_products" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_products_parent_id_idx" ON "_pages_v_blocks_featured_products" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_products_path_idx" ON "_pages_v_blocks_featured_products" USING btree ("_path");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX "_pages_v_rels_products_id_idx" ON "_pages_v_rels" USING btree ("products_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_collections_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_category_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_brand_story_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_brand_story" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_featured_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_collections_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_category_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_brand_story_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_brand_story" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_featured_products" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_collections_showcase" CASCADE;
  DROP TABLE "pages_blocks_category_strip" CASCADE;
  DROP TABLE "pages_blocks_brand_story_links" CASCADE;
  DROP TABLE "pages_blocks_brand_story" CASCADE;
  DROP TABLE "pages_blocks_featured_products" CASCADE;
  DROP TABLE "_pages_v_blocks_collections_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_category_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_story_links" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_story" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_products" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_products_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_products_fk";
  
  DROP INDEX "pages_rels_products_id_idx";
  DROP INDEX "_pages_v_rels_products_id_idx";
  ALTER TABLE "site_appearance" ALTER COLUMN "primary_colour" SET DEFAULT '#E8177A';
  ALTER TABLE "site_appearance" ALTER COLUMN "secondary_colour" SET DEFAULT '#2D1B3D';
  ALTER TABLE "site_appearance" ALTER COLUMN "accent_colour" SET DEFAULT '#B76E79';
  ALTER TABLE "site_appearance" ALTER COLUMN "background_colour" SET DEFAULT '#FFFFFF';
  ALTER TABLE "site_appearance" ALTER COLUMN "text_colour" SET DEFAULT '#1A1A1A';
  ALTER TABLE "site_appearance" ALTER COLUMN "header_bg_colour" SET DEFAULT '#f8fafc';
  ALTER TABLE "site_appearance" ALTER COLUMN "footer_bg_colour" SET DEFAULT '#2D1B3D';
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "style";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "button_background";
  ALTER TABLE "pages_blocks_testimonials_testimonials" DROP COLUMN "event_date";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "layout";
  ALTER TABLE "pages_blocks_home_hero" DROP COLUMN "botanical_overlay";
  ALTER TABLE "pages_rels" DROP COLUMN "products_id";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "style";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "button_background";
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" DROP COLUMN "event_date";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "layout";
  ALTER TABLE "_pages_v_blocks_home_hero" DROP COLUMN "botanical_overlay";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "products_id";
  ALTER TABLE "page_templates_blocks_cta" DROP COLUMN "style";
  ALTER TABLE "page_templates_blocks_cta" DROP COLUMN "button_background";
  ALTER TABLE "page_templates_blocks_testimonials_testimonials" DROP COLUMN "event_date";
  ALTER TABLE "page_templates_blocks_testimonials" DROP COLUMN "layout";
  ALTER TABLE "page_templates_blocks_home_hero" DROP COLUMN "botanical_overlay";
  DROP TYPE "public"."enum_pages_blocks_cta_style";
  DROP TYPE "public"."enum_pages_blocks_cta_button_background";
  DROP TYPE "public"."enum_pages_blocks_testimonials_layout";
  DROP TYPE "public"."enum_pages_blocks_brand_story_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_brand_story_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_brand_story_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_cta_style";
  DROP TYPE "public"."enum__pages_v_blocks_cta_button_background";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_layout";
  DROP TYPE "public"."enum__pages_v_blocks_brand_story_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_brand_story_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_brand_story_image_position";
  DROP TYPE "public"."enum_page_templates_blocks_cta_style";
  DROP TYPE "public"."enum_page_templates_blocks_cta_button_background";
  DROP TYPE "public"."enum_page_templates_blocks_testimonials_layout";`)
}
