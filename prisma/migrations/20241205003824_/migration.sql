/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "book_slug_key" ON "book"("slug");
