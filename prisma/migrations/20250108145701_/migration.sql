/*
  Warnings:

  - Added the required column `status` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reserved" BOOLEAN NOT NULL DEFAULT false,
    "authorsId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "categorysId" TEXT NOT NULL,
    CONSTRAINT "book_authorsId_fkey" FOREIGN KEY ("authorsId") REFERENCES "author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "book_categorysId_fkey" FOREIGN KEY ("categorysId") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_book" ("ISBN", "authorsId", "categorysId", "id", "rating", "reserved", "slug", "title") SELECT "ISBN", "authorsId", "categorysId", "id", "rating", "reserved", "slug", "title" FROM "book";
DROP TABLE "book";
ALTER TABLE "new_book" RENAME TO "book";
CREATE UNIQUE INDEX "book_title_key" ON "book"("title");
CREATE UNIQUE INDEX "book_slug_key" ON "book"("slug");
CREATE UNIQUE INDEX "book_ISBN_key" ON "book"("ISBN");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
