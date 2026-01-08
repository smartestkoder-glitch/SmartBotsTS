-- AlterTable
ALTER TABLE "bots"."Bans" ALTER COLUMN "json" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "bots"."ChatMessages" ALTER COLUMN "json" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "bots"."Kicks" ALTER COLUMN "json" SET DATA TYPE TEXT;
