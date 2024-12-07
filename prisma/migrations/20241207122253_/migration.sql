-- CreateTable
CREATE TABLE "registry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usersId" TEXT NOT NULL,
    "booksId" TEXT NOT NULL,
    CONSTRAINT "registry_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registry_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
