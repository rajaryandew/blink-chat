/*
  Warnings:

  - You are about to drop the column `profileId` on the `ChatParticipant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chatId,userId]` on the table `ChatParticipant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ChatParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatParticipant" DROP CONSTRAINT "ChatParticipant_profileId_fkey";

-- DropIndex
DROP INDEX "ChatParticipant_chatId_profileId_key";

-- AlterTable
ALTER TABLE "ChatParticipant" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChatParticipant_chatId_userId_key" ON "ChatParticipant"("chatId", "userId");

-- AddForeignKey
ALTER TABLE "ChatParticipant" ADD CONSTRAINT "ChatParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
