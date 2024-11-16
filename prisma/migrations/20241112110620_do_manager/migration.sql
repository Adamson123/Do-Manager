/*
  Warnings:

  - You are about to drop the column `tasksCompleted` on the `SubtaskCompletionHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubtaskCompletionHistory" DROP COLUMN "tasksCompleted",
ADD COLUMN     "subtasksCompleted" TEXT[];
