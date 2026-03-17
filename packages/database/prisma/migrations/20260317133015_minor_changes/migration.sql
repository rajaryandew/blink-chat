-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "chatName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ChatParticipant" ALTER COLUMN "nickname" DROP NOT NULL;
