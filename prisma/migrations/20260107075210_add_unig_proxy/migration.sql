/*
  Warnings:

  - A unique constraint covering the columns `[proxy]` on the table `Proxy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Proxy_proxy_key" ON "bots"."Proxy"("proxy");
