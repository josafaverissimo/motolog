/*
  Warnings:

  - Added the required column `hash` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "hash" VARCHAR(50) NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;
