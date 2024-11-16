/*
  Warnings:

  - You are about to drop the column `dateCompleted` on the `Subtask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subtask" DROP COLUMN "dateCompleted";

-- CreateTable
CREATE TABLE "SubtaskCompletionHistory" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "tasksCompleted" TEXT[],
    "userId" TEXT,

    CONSTRAINT "SubtaskCompletionHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubtaskCompletionHistory" ADD CONSTRAINT "SubtaskCompletionHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
