/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE UNIQUE INDEX "Branch_name_key" ON "Branch"("name");
