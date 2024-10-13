-- CreateTable
CREATE TABLE "Registry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT,
    "userId" TEXT,
    CONSTRAINT "Registry_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Registry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
