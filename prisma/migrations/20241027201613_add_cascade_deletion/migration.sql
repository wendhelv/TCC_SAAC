-- DropForeignKey
ALTER TABLE "avaliador_areas" DROP CONSTRAINT "avaliador_areas_idAvaliador_fkey";

-- DropForeignKey
ALTER TABLE "avaliadores" DROP CONSTRAINT "avaliadores_idUsuario_fkey";

-- AddForeignKey
ALTER TABLE "avaliadores" ADD CONSTRAINT "avaliadores_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliador_areas" ADD CONSTRAINT "avaliador_areas_idAvaliador_fkey" FOREIGN KEY ("idAvaliador") REFERENCES "avaliadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
