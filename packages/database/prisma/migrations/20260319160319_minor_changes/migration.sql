/*
  Warnings:

  - Made the column `nickname` on table `ChatParticipant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ChatParticipant" ALTER COLUMN "nickname" SET NOT NULL;
