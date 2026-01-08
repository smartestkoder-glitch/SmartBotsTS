/*
  Warnings:

  - You are about to drop the column `password` on the `BotsConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bots"."BotsConfig" DROP COLUMN "password";
