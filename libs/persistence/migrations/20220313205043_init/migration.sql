/*
  Warnings:

  - You are about to drop the column `userId` on the `Billings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orgId,userId]` on the table `OrganisationMembers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Organisations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Billings_userId_key";

-- DropIndex
DROP INDEX "OrganisationMembers_orgId_userId_key";

-- DropIndex
DROP INDEX "Organisations_slug_key";

-- DropIndex
DROP INDEX "UserProfile_accountId_key";

-- AlterTable
ALTER TABLE "Billings" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "OrganisationMembers_orgId_userId_key" ON "OrganisationMembers"("orgId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Organisations_slug_key" ON "Organisations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_accountId_key" ON "UserProfile"("accountId");
