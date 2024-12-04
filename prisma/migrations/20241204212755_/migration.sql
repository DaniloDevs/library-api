-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reserved" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "book_title_key" ON "book"("title");

-- CreateIndex
CREATE UNIQUE INDEX "book_ISBN_key" ON "book"("ISBN");
