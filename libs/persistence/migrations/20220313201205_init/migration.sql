/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Billing` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropIndex
DROP INDEX "Billing_userId_key";

-- DropIndex
DROP INDEX "UserProfile_accountId_key";

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Organisations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organisations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganisationMembers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT E'PENDING',
    "orgId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganisationMembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organisations_slug_key" ON "Organisations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "OrganisationMembers_orgId_userId_key" ON "OrganisationMembers"("orgId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Billing_userId_key" ON "Billing"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_accountId_key" ON "UserProfile"("accountId");

-- AddForeignKey
ALTER TABLE "OrganisationMembers" ADD CONSTRAINT "OrganisationMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganisationMembers" ADD CONSTRAINT "OrganisationMembers_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
