/*
  Warnings:

  - Added the required column `data` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."message" ADD COLUMN     "data" TEXT NOT NULL;
