/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `authorId` on the `books` table. All the data in the column will be lost.
  - Added the required column `author` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Author_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Author";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "reserved" BOOLEAN NOT NULL,
    "rating" INTEGER NOT NULL
);
INSERT INTO "new_books" ("category", "id", "rating", "reserved", "title") SELECT "category", "id", "rating", "reserved", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
