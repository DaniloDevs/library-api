/*
  Warnings:

  - Added the required column `category` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reserved` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "reserved" BOOLEAN NOT NULL
);
INSERT INTO "new_books" ("author", "id", "name") SELECT "author", "id", "name" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_name_key" ON "books"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
