/*
  Warnings:

  - A unique constraint covering the columns `[userId,chatId]` on the table `chat_participant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chat_participant_userId_chatId_key" ON "public"."chat_participant"("userId", "chatId");
