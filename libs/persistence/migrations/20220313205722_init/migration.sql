/*
  Warnings:

  - A unique constraint covering the columns `[orgId,userId]` on the table `OrganisationMembers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Organisations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Billings` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OrganisationMembers_orgId_userId_key";

-- DropIndex
DROP INDEX "Organisations_slug_key";

-- DropIndex
DROP INDEX "UserProfile_accountId_key";

-- AlterTable
ALTER TABLE "Billings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrganisationMembers_orgId_userId_key" ON "OrganisationMembers"("orgId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Organisations_slug_key" ON "Organisations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_accountId_key" ON "UserProfile"("accountId");
