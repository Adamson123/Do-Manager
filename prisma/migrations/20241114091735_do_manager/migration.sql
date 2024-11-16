/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `SubtaskCompletionHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `SubtaskCompletionHistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SubtaskCompletionHistory" DROP CONSTRAINT "SubtaskCompletionHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "SubtaskCompletionHistory" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SubtaskCompletionHistory_userId_key" ON "SubtaskCompletionHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_userId_key" ON "Task"("userId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtaskCompletionHistory" ADD CONSTRAINT "SubtaskCompletionHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
