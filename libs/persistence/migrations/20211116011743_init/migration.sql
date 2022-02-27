/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_accountId_key" ON "UserProfile"("accountId");
