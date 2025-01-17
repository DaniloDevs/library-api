/*
  Warnings:

  - Added the required column `loanCode` to the `reserved` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "StatusBook" ADD VALUE 'BORROWED';

-- AlterTable
ALTER TABLE "reserved" ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "loanCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "loan" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "booksId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "reservationsId" TEXT NOT NULL,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_reservationsId_fkey" FOREIGN KEY ("reservationsId") REFERENCES "reserved"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
