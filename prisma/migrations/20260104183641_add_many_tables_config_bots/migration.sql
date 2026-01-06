/*
  Warnings:

  - You are about to drop the column `proxy` on the `BotsConfig` table. All the data in the column will be lost.
  - Added the required column `proxyId` to the `BotsConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bots"."BotsConfig" DROP COLUMN "proxy",
ADD COLUMN     "busyNick" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "proxyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "bots"."Kicks" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "json" JSONB,
    "botId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bots"."Bans" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "json" JSONB,
    "botId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bots"."ChatMessages" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "json" JSONB,
    "botId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bots"."Proxy" (
    "id" SERIAL NOT NULL,
    "proxy" TEXT NOT NULL,

    CONSTRAINT "Proxy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bots"."BotsConfig" ADD CONSTRAINT "BotsConfig_proxyId_fkey" FOREIGN KEY ("proxyId") REFERENCES "bots"."Proxy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bots"."Kicks" ADD CONSTRAINT "Kicks_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bots"."BotsConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bots"."Bans" ADD CONSTRAINT "Bans_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bots"."BotsConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bots"."ChatMessages" ADD CONSTRAINT "ChatMessages_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bots"."BotsConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
