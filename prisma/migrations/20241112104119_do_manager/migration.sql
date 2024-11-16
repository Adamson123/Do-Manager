/*
  Warnings:

  - A unique constraint covering the columns `[day]` on the table `SubtaskCompletionHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SubtaskCompletionHistory_day_key" ON "SubtaskCompletionHistory"("day");
