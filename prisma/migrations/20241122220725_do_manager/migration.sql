-- AlterTable
ALTER TABLE "Subtask" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
