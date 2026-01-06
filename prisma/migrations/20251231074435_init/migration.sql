-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "autosell";

-- CreateTable
CREATE TABLE "autosell"."PriceConfig" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "priceSell" INTEGER NOT NULL,
    "priceBuy" INTEGER NOT NULL,

    CONSTRAINT "PriceConfig_pkey" PRIMARY KEY ("id")
);
