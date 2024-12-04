-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reserved" BOOLEAN NOT NULL DEFAULT false,
    "isValid" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_book" ("ISBN", "author", "category", "id", "rating", "reserved", "title") SELECT "ISBN", "author", "category", "id", "rating", "reserved", "title" FROM "book";
DROP TABLE "book";
ALTER TABLE "new_book" RENAME TO "book";
CREATE UNIQUE INDEX "book_title_key" ON "book"("title");
CREATE UNIQUE INDEX "book_ISBN_key" ON "book"("ISBN");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
