-- CreateTable
CREATE TABLE "DailyAiQuota" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "remainingChance" INTEGER NOT NULL DEFAULT 7,
    "userId" TEXT,

    CONSTRAINT "DailyAiQuota_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyAiQuota" ADD CONSTRAINT "DailyAiQuota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
