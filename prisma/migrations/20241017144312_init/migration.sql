-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "superuser" BOOLEAN NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edicoes" (
    "ano" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,

    CONSTRAINT "edicoes_pkey" PRIMARY KEY ("ano")
);

-- CreateTable
CREATE TABLE "areas_conhecimento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "areas_conhecimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artigos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autores" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "linkPdf" TEXT NOT NULL,
    "anoPublicacao" TEXT NOT NULL,
    "idArea" INTEGER NOT NULL,
    "idEdicao" TEXT NOT NULL,

    CONSTRAINT "artigos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliadores" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "avaliadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliador_areas" (
    "id" SERIAL NOT NULL,
    "idAvaliador" INTEGER NOT NULL,
    "idArea" INTEGER NOT NULL,

    CONSTRAINT "avaliador_areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliacoes" (
    "id" SERIAL NOT NULL,
    "notaFinal" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "idAvaliador" INTEGER NOT NULL,
    "idArtigo" INTEGER NOT NULL,
    "idEdicao" TEXT NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perguntas" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "idArea" INTEGER NOT NULL,
    "idEdicao" TEXT NOT NULL,

    CONSTRAINT "perguntas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respostas" (
    "id" SERIAL NOT NULL,
    "idAvaliacao" INTEGER NOT NULL,
    "idPergunta" INTEGER NOT NULL,
    "nota" DECIMAL(65,30) NOT NULL DEFAULT 0.0,

    CONSTRAINT "respostas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "avaliadores_idUsuario_key" ON "avaliadores"("idUsuario");

-- AddForeignKey
ALTER TABLE "artigos" ADD CONSTRAINT "artigos_idArea_fkey" FOREIGN KEY ("idArea") REFERENCES "areas_conhecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artigos" ADD CONSTRAINT "artigos_idEdicao_fkey" FOREIGN KEY ("idEdicao") REFERENCES "edicoes"("ano") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliadores" ADD CONSTRAINT "avaliadores_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliador_areas" ADD CONSTRAINT "avaliador_areas_idAvaliador_fkey" FOREIGN KEY ("idAvaliador") REFERENCES "avaliadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliador_areas" ADD CONSTRAINT "avaliador_areas_idArea_fkey" FOREIGN KEY ("idArea") REFERENCES "areas_conhecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_idAvaliador_fkey" FOREIGN KEY ("idAvaliador") REFERENCES "avaliadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_idArtigo_fkey" FOREIGN KEY ("idArtigo") REFERENCES "artigos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_idEdicao_fkey" FOREIGN KEY ("idEdicao") REFERENCES "edicoes"("ano") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perguntas" ADD CONSTRAINT "perguntas_idArea_fkey" FOREIGN KEY ("idArea") REFERENCES "areas_conhecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perguntas" ADD CONSTRAINT "perguntas_idEdicao_fkey" FOREIGN KEY ("idEdicao") REFERENCES "edicoes"("ano") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_idAvaliacao_fkey" FOREIGN KEY ("idAvaliacao") REFERENCES "avaliacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_idPergunta_fkey" FOREIGN KEY ("idPergunta") REFERENCES "perguntas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
