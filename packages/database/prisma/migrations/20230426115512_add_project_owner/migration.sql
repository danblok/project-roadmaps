/*
  Warnings:

  - You are about to drop the `_ProjectToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,projectId]` on the table `Status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToUser" DROP CONSTRAINT "_ProjectToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToUser" DROP CONSTRAINT "_ProjectToUser_B_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "until" SET DEFAULT now() + interval '1 month';

-- DropTable
DROP TABLE "_ProjectToUser";

-- CreateTable
CREATE TABLE "_contributed_projects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_contributed_projects_AB_unique" ON "_contributed_projects"("A", "B");

-- CreateIndex
CREATE INDEX "_contributed_projects_B_index" ON "_contributed_projects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_projectId_key" ON "Status"("name", "projectId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contributed_projects" ADD CONSTRAINT "_contributed_projects_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contributed_projects" ADD CONSTRAINT "_contributed_projects_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
