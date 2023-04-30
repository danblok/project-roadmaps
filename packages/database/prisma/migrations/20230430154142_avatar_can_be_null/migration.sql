-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "avatar" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "until" SET DEFAULT now() + interval '1 month';
