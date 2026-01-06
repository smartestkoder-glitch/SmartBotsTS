/*
  Warnings:

  - Added the required column `botId` to the `Sells` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scriptId` to the `BotsConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "autosell"."Sells" ADD COLUMN     "botId" INTEGER NOT NULL,
ADD COLUMN     "count" INTEGER,
ADD COLUMN     "item" TEXT,
ADD COLUMN     "price" INTEGER;

-- AlterTable
ALTER TABLE "bots"."BotsConfig" ADD COLUMN     "donate" TEXT,
ADD COLUMN     "money" INTEGER,
ADD COLUMN     "online" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "scriptId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "parsedm"."DMBuys" (
    "id" SERIAL NOT NULL,
    "dealer" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "course" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "success" BOOLEAN,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "botId" INTEGER NOT NULL,

    CONSTRAINT "DMBuys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "autosell"."Buys" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "price" INTEGER,
    "item" TEXT,
    "count" INTEGER,
    "dealer" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "botId" INTEGER NOT NULL,

    CONSTRAINT "Buys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bots"."Scripts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "creatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Scripts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parsedm"."DMBuys" ADD CONSTRAINT "DMBuys_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bots"."BotsConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autosell"."Sells" ADD CONSTRAINT "Sells_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bots"."BotsConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autosell"."Buys" ADD CONSTRAINT "Buys_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bots"."BotsConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bots"."BotsConfig" ADD CONSTRAINT "BotsConfig_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "bots"."Scripts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
