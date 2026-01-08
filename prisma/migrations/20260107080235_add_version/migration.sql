/*
  Warnings:

  - Added the required column `version` to the `BotsConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bots"."BotsConfig" ADD COLUMN     "version" TEXT NOT NULL;
