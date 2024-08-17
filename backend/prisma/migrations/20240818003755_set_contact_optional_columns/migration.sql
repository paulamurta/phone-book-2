/*
  Warnings:

  - You are about to drop the column `photoData` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "photoData",
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "groupId" DROP NOT NULL;
