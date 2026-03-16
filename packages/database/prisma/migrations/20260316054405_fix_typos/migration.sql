/*
  Warnings:

  - You are about to drop the `ChatParticiapant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatParticiapant" DROP CONSTRAINT "ChatParticiapant_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatParticiapant" DROP CONSTRAINT "ChatParticiapant_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatParticipantId_fkey";

-- DropTable
DROP TABLE "ChatParticiapant";

-- CreateTable
CREATE TABLE "ChatParticipant" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "ChatParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatParticipant_chatId_profileId_key" ON "ChatParticipant"("chatId", "profileId");

-- AddForeignKey
ALTER TABLE "ChatParticipant" ADD CONSTRAINT "ChatParticipant_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatParticipant" ADD CONSTRAINT "ChatParticipant_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatParticipantId_fkey" FOREIGN KEY ("chatParticipantId") REFERENCES "ChatParticipant"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
