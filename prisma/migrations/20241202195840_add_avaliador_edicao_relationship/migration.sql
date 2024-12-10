-- CreateTable
CREATE TABLE "avaliador_edicoes" (
    "id" SERIAL NOT NULL,
    "idAvaliador" INTEGER NOT NULL,
    "idEdicao" TEXT NOT NULL,

    CONSTRAINT "avaliador_edicoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "avaliador_edicoes_idAvaliador_idEdicao_key" ON "avaliador_edicoes"("idAvaliador", "idEdicao");

-- AddForeignKey
ALTER TABLE "avaliador_edicoes" ADD CONSTRAINT "avaliador_edicoes_idAvaliador_fkey" FOREIGN KEY ("idAvaliador") REFERENCES "avaliadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliador_edicoes" ADD CONSTRAINT "avaliador_edicoes_idEdicao_fkey" FOREIGN KEY ("idEdicao") REFERENCES "edicoes"("ano") ON DELETE CASCADE ON UPDATE CASCADE;
