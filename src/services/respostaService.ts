"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRespostas = async (
  respostas: { idAvaliacao: number; idPergunta: number; nota: number }[]
) => {
  const newRespostas = await prisma.resposta.createMany({
    data: respostas,
  });

  return newRespostas;
};
