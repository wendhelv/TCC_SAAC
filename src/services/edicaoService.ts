"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllEdicoes = async () => {
  const edicoes = await prisma.edicao.findMany({
    orderBy: {
      ano: "desc",
    },
  });

  return edicoes;
};

export const findEdicaoByAno = async (ano:string) => {
  try {
    const edicao = await prisma.edicao.findFirst({
      where: {
        ano
      }
    })
    return edicao
  } catch (error) {
    console.error("Erro ao localizar edição", error)
  }
}

export const createEdicao = async (ano: string, titulo: string) => {
  try {
    const edicao = await prisma.edicao.create({
      data: {
        ano,
        titulo,
      },
    });
    console.log("Edição criada:", edicao);
    return edicao;
  } catch (error) {
    console.error("Erro ao criar edição:", error);
    throw error;
  }
};

export const deleteEdicao = async (ano: string) => {
  try {
    const edicao = await prisma.edicao.delete({
      where: { ano },
    });
    console.log("Edição apagada:", edicao);
    return edicao;
  } catch (error) {
    console.error("Erro ao apagar edição:", error);
    throw error;
  }
};

export const updateEdicao = async (ano:string, titulo:string) => {

  const edicaoData: any = { titulo };
  const existingEdicao = await findEdicaoByAno(ano);

  if(!existingEdicao){
    edicaoData.ano = ano
  }

  const updatedEdicao = await prisma.edicao.update({
    where: { ano },
    data: edicaoData,
  }); 

  return updatedEdicao
}
