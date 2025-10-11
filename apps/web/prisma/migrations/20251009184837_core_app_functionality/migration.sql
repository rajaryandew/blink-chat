-- CreateEnum
CREATE TYPE "public"."ChatType" AS ENUM ('DIRECT_MESSAGE', 'GROUP_CHAT');

-- CreateEnum
CREATE TYPE "public"."SeenStatus" AS ENUM ('SEEN', 'SENT');

-- CreateTable
CREATE TABLE "public"."Chat" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatType" "public"."ChatType" NOT NULL DEFAULT 'DIRECT_MESSAGE',
    "chatName" TEXT,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatParticipant" (
    "id" SERIAL NOT NULL,
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChatParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" SERIAL NOT NULL,
    "chatId" TEXT NOT NULL,
    "senderParticipantId" INTEGER NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seenStatus" "public"."SeenStatus" NOT NULL DEFAULT 'SENT',

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ChatParticipant" ADD CONSTRAINT "ChatParticipant_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatParticipant" ADD CONSTRAINT "ChatParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_senderParticipantId_fkey" FOREIGN KEY ("senderParticipantId") REFERENCES "public"."ChatParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
