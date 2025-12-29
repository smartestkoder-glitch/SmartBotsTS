/*
  Warnings:

  - Added the required column `marketMy` to the `Pages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pages" ADD COLUMN     "marketMy" INTEGER NOT NULL;
