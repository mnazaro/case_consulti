-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "razao_social" TEXT NOT NULL,
    "nome_fantaia" TEXT NOT NULL,
    "cnpj" CHAR(14) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setor" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EmpresaToSetor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_razao_social_key" ON "Empresa"("razao_social");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "_EmpresaToSetor_AB_unique" ON "_EmpresaToSetor"("A", "B");

-- CreateIndex
CREATE INDEX "_EmpresaToSetor_B_index" ON "_EmpresaToSetor"("B");

-- AddForeignKey
ALTER TABLE "_EmpresaToSetor" ADD CONSTRAINT "_EmpresaToSetor_A_fkey" FOREIGN KEY ("A") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmpresaToSetor" ADD CONSTRAINT "_EmpresaToSetor_B_fkey" FOREIGN KEY ("B") REFERENCES "Setor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
