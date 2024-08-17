/*
  Warnings:

  - You are about to drop the column `favorit` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "favorit",
ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false;
