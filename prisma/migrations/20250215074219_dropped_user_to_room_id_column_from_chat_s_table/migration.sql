/*
  Warnings:

  - You are about to drop the column `userToRoom_id` on the `Chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_userToRoom_id_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "userToRoom_id";
