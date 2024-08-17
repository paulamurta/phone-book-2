/*
  Warnings:

  - You are about to drop the column `fullName` on the `Contact` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(254)`.
  - Added the required column `firstName` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "fullName",
ADD COLUMN     "firstName" VARCHAR(100) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(200) NOT NULL,
ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(254);
