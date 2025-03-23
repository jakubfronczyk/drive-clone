CREATE TABLE IF NOT EXISTS "drive-lite_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "drive-lite_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drive-lite_files" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"parent" integer NOT NULL,
	"size" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drive-lite_folders" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"parent" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drive-lite_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drive-lite_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drive-lite_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "drive-lite_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drive-lite_account" ADD CONSTRAINT "drive-lite_account_user_id_drive-lite_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."drive-lite_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drive-lite_session" ADD CONSTRAINT "drive-lite_session_user_id_drive-lite_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."drive-lite_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "drive-lite_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "files_parent_idx" ON "drive-lite_files" USING btree ("parent");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "folders_parent_idx" ON "drive-lite_folders" USING btree ("parent");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "drive-lite_session" USING btree ("user_id");