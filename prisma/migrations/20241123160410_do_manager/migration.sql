-- DropForeignKey
ALTER TABLE "Subtask" DROP CONSTRAINT "Subtask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Subtask" DROP CONSTRAINT "Subtask_userId_fkey";

-- DropForeignKey
ALTER TABLE "SubtaskCompletionHistory" DROP CONSTRAINT "SubtaskCompletionHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtaskCompletionHistory" ADD CONSTRAINT "SubtaskCompletionHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
