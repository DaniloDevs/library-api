/*
  Warnings:

  - The `status` column on the `book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `reserved` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusBook" AS ENUM ('RESERVED', 'AVAILABLE');

-- CreateEnum
CREATE TYPE "StatusReserved" AS ENUM ('ACTIVE', 'RETURNED', 'CANCELLED');

-- AlterTable
ALTER TABLE "book" DROP COLUMN "status",
ADD COLUMN     "status" "StatusBook" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "reserved" DROP COLUMN "status",
ADD COLUMN     "status" "StatusReserved" NOT NULL;
