-- DropForeignKey
ALTER TABLE "_contributed_projects" DROP CONSTRAINT "_contributed_projects_A_fkey";

-- DropForeignKey
ALTER TABLE "_contributed_projects" DROP CONSTRAINT "_contributed_projects_B_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "name" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "Comments" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "until" SET DEFAULT now() + interval '1 month';

-- AddForeignKey
ALTER TABLE "_contributed_projects" ADD CONSTRAINT "_contributed_projects_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contributed_projects" ADD CONSTRAINT "_contributed_projects_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
