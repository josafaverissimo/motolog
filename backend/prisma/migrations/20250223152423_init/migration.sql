-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" VARCHAR(500) NOT NULL,
    "cpf" VARCHAR(50) NOT NULL,
    "hash" VARCHAR(50) NOT NULL,
    "birthdate" DATE NOT NULL,
    "phone" VARCHAR(50),
    "email" VARCHAR(500) NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "cnhImageUrl" VARCHAR(1000) NOT NULL,
    "crlvImageUrl" VARCHAR(100) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);
