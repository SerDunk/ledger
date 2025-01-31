/*
  Warnings:

  - You are about to drop the column `memberId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_memberId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "memberId";
