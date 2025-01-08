-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserved" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "usersId" TEXT,
    "booksId" TEXT,

    CONSTRAINT "reserved_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reserved" BOOLEAN NOT NULL DEFAULT false,
    "authorsId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "categorysId" TEXT NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "book_title_key" ON "book"("title");

-- CreateIndex
CREATE UNIQUE INDEX "book_slug_key" ON "book"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "book_ISBN_key" ON "book"("ISBN");

-- CreateIndex
CREATE UNIQUE INDEX "author_name_key" ON "author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "author_slug_key" ON "author"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");

-- AddForeignKey
ALTER TABLE "reserved" ADD CONSTRAINT "reserved_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserved" ADD CONSTRAINT "reserved_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_authorsId_fkey" FOREIGN KEY ("authorsId") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_categorysId_fkey" FOREIGN KEY ("categorysId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
