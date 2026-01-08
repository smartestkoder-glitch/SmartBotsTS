/*
  Warnings:

  - Made the column `json` on table `Bans` required. This step will fail if there are existing NULL values in that column.
  - Made the column `json` on table `ChatMessages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `json` on table `Deaths` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bots"."Bans" ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "json" SET NOT NULL;

-- AlterTable
ALTER TABLE "bots"."ChatMessages" ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "json" SET NOT NULL;

-- AlterTable
ALTER TABLE "bots"."Deaths" ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "json" SET NOT NULL;
