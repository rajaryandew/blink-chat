-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "chatName" TEXT NOT NULL,
    "isGroup" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatParticiapant" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "ChatParticiapant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "chatId" TEXT NOT NULL,
    "chatParticipantId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatParticiapant_chatId_profileId_key" ON "ChatParticiapant"("chatId", "profileId");

-- AddForeignKey
ALTER TABLE "ChatParticiapant" ADD CONSTRAINT "ChatParticiapant_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatParticiapant" ADD CONSTRAINT "ChatParticiapant_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatParticipantId_fkey" FOREIGN KEY ("chatParticipantId") REFERENCES "ChatParticiapant"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
