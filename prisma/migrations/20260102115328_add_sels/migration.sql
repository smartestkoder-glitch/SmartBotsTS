-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "bots";

-- CreateTable
CREATE TABLE "autosell"."Sells" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bots"."BotsConfig" (
    "id" SERIAL NOT NULL,
    "nick" TEXT NOT NULL,
    "server" TEXT NOT NULL,
    "settings" JSONB,

    CONSTRAINT "BotsConfig_pkey" PRIMARY KEY ("id")
);
