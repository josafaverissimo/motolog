/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Driver_hash_key" ON "Driver"("hash");
