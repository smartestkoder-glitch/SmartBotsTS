/*
  Warnings:

  - You are about to drop the column `settings` on the `BotsConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bots"."BotsConfig" DROP COLUMN "settings";

-- CreateTable
CREATE TABLE "bots"."BotSettings" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "password" TEXT,
    "anarchy" TEXT,
    "script" TEXT,

    CONSTRAINT "BotSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BotSettings_botId_key" ON "bots"."BotSettings"("botId");

-- AddForeignKey
ALTER TABLE "bots"."BotSettings" ADD CONSTRAINT "BotSettings_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bots"."BotsConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
