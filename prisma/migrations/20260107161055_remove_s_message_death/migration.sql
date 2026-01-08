/*
  Warnings:

  - You are about to drop the column `json` on the `Deaths` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Deaths` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bots"."Deaths" DROP COLUMN "json",
DROP COLUMN "text";
