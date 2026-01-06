/*
  Warnings:

  - Added the required column `password` to the `BotsConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bots"."BotsConfig" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "proxy" TEXT;
