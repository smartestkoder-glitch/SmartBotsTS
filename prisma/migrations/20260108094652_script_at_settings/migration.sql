/*
  Warnings:

  - You are about to drop the column `scriptId` on the `BotsConfig` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bots"."BotsConfig" DROP CONSTRAINT "BotsConfig_scriptId_fkey";

-- AlterTable
ALTER TABLE "bots"."BotSettings" ADD COLUMN     "scriptId" INTEGER;

-- AlterTable
ALTER TABLE "bots"."BotsConfig" DROP COLUMN "scriptId";

-- AddForeignKey
ALTER TABLE "bots"."BotSettings" ADD CONSTRAINT "BotSettings_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "bots"."Scripts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
