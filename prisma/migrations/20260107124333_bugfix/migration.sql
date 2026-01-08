/*
  Warnings:

  - Made the column `json` on table `Kicks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bots"."Kicks" ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "json" SET NOT NULL;
