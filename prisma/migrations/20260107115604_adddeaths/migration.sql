-- CreateTable
CREATE TABLE "bots"."Deaths" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "json" JSONB,
    "botId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deaths_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bots"."Deaths" ADD CONSTRAINT "Deaths_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bots"."BotsConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
