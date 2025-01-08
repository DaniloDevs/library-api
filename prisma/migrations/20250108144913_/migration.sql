-- CreateTable
CREATE TABLE "reserved" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "usersId" TEXT,
    "booksId" TEXT,
    CONSTRAINT "reserved_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "book" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "reserved_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
