/*
  Warnings:

  - You are about to drop the column `nome_fantaia` on the `Empresa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "nome_fantaia",
ADD COLUMN     "nome_fantasia" VARCHAR(255);
