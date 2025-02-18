/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber,firstName,lastName,userId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Member_phoneNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "Member_phoneNumber_firstName_lastName_userId_key" ON "Member"("phoneNumber", "firstName", "lastName", "userId");
