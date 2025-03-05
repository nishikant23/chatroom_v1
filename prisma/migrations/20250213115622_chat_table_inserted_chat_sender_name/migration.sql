/*
  Warnings:

  - Added the required column `sender_name` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "sender_name" VARCHAR(250) NOT NULL;
