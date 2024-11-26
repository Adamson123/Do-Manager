/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `DailyAiQuota` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `DailyAiQuota` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DailyAiQuota" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dailyAiQuotaId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "DailyAiQuota_userId_key" ON "DailyAiQuota"("userId");
