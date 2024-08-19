-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "groupId" DROP NOT NULL;

-- RenameForeignKey
ALTER TABLE "Contact" RENAME CONSTRAINT "Contact_groupId_fkey" TO "groupId";
