/*
  Warnings:

  - You are about to alter the column `razao_social` on the `Empresa` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `nome_fantaia` on the `Empresa` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `descricao` on the `Setor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "razao_social" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "nome_fantaia" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Setor" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(255);
