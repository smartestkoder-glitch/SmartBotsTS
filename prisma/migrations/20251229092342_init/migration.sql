-- CreateTable
CREATE TABLE "Pages" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slots" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "course" INTEGER NOT NULL,
    "marketPrice" INTEGER NOT NULL,
    "purpose" TEXT NOT NULL,
    "dealer" TEXT NOT NULL,
    "pageId" INTEGER NOT NULL,

    CONSTRAINT "Slots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slots" ADD CONSTRAINT "Slots_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
