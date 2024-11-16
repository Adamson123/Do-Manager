-- DropForeignKey
ALTER TABLE "Subtask" DROP CONSTRAINT "Subtask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "SubtaskCompletionHistory" DROP CONSTRAINT "SubtaskCompletionHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropIndex
DROP INDEX "SubtaskCompletionHistory_userId_key";

-- DropIndex
DROP INDEX "Task_userId_key";

-- AlterTable
ALTER TABLE "Subtask" ALTER COLUMN "taskId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SubtaskCompletionHistory" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtaskCompletionHistory" ADD CONSTRAINT "SubtaskCompletionHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
