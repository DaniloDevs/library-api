-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "classRoom" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,
    "favoriteBooksId" TEXT,
    "registration" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    CONSTRAINT "student_favoriteBooksId_fkey" FOREIGN KEY ("favoriteBooksId") REFERENCES "favorite_book" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "student_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "favorite_book" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacherType" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    CONSTRAINT "teacher_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "favoriteBooksId" TEXT,
    CONSTRAINT "book_favoriteBooksId_fkey" FOREIGN KEY ("favoriteBooksId") REFERENCES "favorite_book" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_registration_key" ON "student"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_cpf_key" ON "teacher"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "book_title_key" ON "book"("title");

-- CreateIndex
CREATE UNIQUE INDEX "book_ISBN_key" ON "book"("ISBN");
