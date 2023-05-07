/*
  Warnings:

  - You are about to drop the column `Comments` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "Comments",
ADD COLUMN     "comments" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "until" SET DEFAULT now() + interval '1 month';
